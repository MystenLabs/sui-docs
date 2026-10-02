# sui-docs

One repository for Mysten Labs documentation. Content for every docs site lives
here, whether it is authored here or mirrored from the repository that owns it.

Status: **scaffold**. The mirror, the manifest and the guard work. The sites
have not moved yet. See `Migration` below for what is still ahead.

## Why this exists

Seven documentation sites are published today, and the machinery underneath them
has been copied rather than shared:

- The sparse-clone fetcher was written three times, in `sui` and twice in
  `walrus`, and the copies have drifted.
- `frontmatter.schema.json` exists in three repositories, all declaring the same
  custom `questions`, `answer` and `goal` keys, already out of step.
- Shared Docusaurus components live in `ML-Shared-Docusaurus` and are kept
  aligned across four repositories by a bidirectional sync bot, a per-repo
  license-header rewriter, a portability blocklist and a divergence checker.

A convention needs a shared home or it stops being shared. The work being done
to simulate a monorepo is larger than the work of having one.

## Ownership, and what it decides

`sources.json` gives every source an `ownership`, and that one field decides
everything else about how it behaves.

| | `moved` | `mirrored` |
| --- | --- | --- |
| Pages live in | this repo | the source repo |
| Edited in | this repo | the source repo, beside its code |
| Reviewed by | the docs team | the source repo's reviewers |
| Deletions propagate | n/a | yes, the mirror cleans before writing |
| Hand edits here | normal | blocked by `scripts/check-mirror-edits.js` |

A source changes category by changing one line. Nothing else moves.

## Layout

```
content/          pages. One directory per source, named in sources.json
sites/            one Docusaurus site per product (not yet moved)
shared/           components, theme, frontmatter schema (not yet moved)
sources.json      every external source, its path and its pinned ref
sources.lock.json which commit each mirror last came from. Written by the mirror
scripts/          one fetcher, one mirror, one guard
```

## Scripts

```bash
node scripts/fetch-sources.js [name ...] [--force]   # sparse-clone into .cache
node scripts/fetch-sources.js --code                 # the repos the pages quote
node scripts/mirror.js        [name ...] [--check]   # place into content/
node scripts/check-mirror-edits.js --base <sha> --head <sha> [--json out.json]
node scripts/forward-port.js  --json out.json --base <sha> [--pr n] [--dry-run]
```

`mirror.js --check` writes nothing and exits non-zero if the tree would change,
which is how the workflow decides whether there is anything to commit.

`forward-port.js` consumes the guard's `--json` and needs the lockfile entry for
each source, because it replays the transforms over the commit recorded there to
work out what the mirror produced. `mirror.js` and `forward-port.js` share one
copy of those transforms in `scripts/lib/transform.js`; two copies would mean the
forward-port blaming a transform difference on the author.

All of them read `sources.json` through `scripts/lib/sources.js`, so the guard
cannot disagree with the mirror about which paths are mirrored. That loader also
rejects a manifest whose targets overlap, which is not a theoretical check: the
first draft nested `oyster` inside `walrus`, where the walrus mirror's clean step
would have deleted it on every run.

## How mirroring works

A source repo fires `repository_dispatch` when its docs change. The mirror job
fetches that source at its pinned ref, places it, and commits. That commit is
what the sites build from. The build does not fetch.

Three things follow, and they are the reason it is built this way:

- The repository always shows exactly what the sites last published.
- A broken or mid-merge upstream state cannot reach a build.
- If the mirror fails, the sites freeze on the last good content rather than
  publishing something half-fetched.

A schedule every four hours catches anything a dispatch missed.

## Editing a mirrored page

Don't edit it here; the next mirror run overwrites it. The guard fails the pull
request and prints the upstream path and a link for each file.

The forward-port workflow sends it for you. Run **Forward-port mirrored edits**
from the Actions tab with the pull request number; it defaults to a dry run that
prints the patches without pushing.

It does not send the file. A mirrored file carries a generated header and has had
its relative links rewritten, so pushing it back would put this repo's
presentation into someone else's. Instead the edit is isolated by a three-way
merge whose base is a replay of the transforms over the upstream commit in
`sources.lock.json`, which makes `base -> yours` the edit and nothing else. That
lands on upstream's own text and absorbs any upstream drift since the mirror ran.

An edit to a line the mirror rewrote cannot be separated this way. Those are
reported per file and left out, because guessing writes a plausible, wrong change
into another team's repository. Make those by hand upstream.

Needs `FORWARD_PORT_TOKEN` with write access to the source repos: a run's
`GITHUB_TOKEN` cannot push to another repository. The workflow opens pull
requests and never merges or approves one.

## Migration

| Phase | What | State |
| --- | --- | --- |
| 1 | Unpin the scripts that assumed the site, the pages and the quoted source share one checkout | done, here, not in `sui` |
| 2 | Move `docs/content` and `docs/site` here and get the build green | done |
| 3 | Cut `docs.sui.io` over, leave redirects, move CODEOWNERS | not started |
| 4 | Other sites, one at a time, each retiring a forked fetcher and schema | blocked, see Shared components |

Phase 1 was meant to land in `sui` first, to de-risk the move. It did not: the
split roots live in `sites/sui/scripts/lib/roots.cjs` here and `sui`'s own
`docs/site` is untouched and still builds. That is a workable outcome rather
than the planned one, and worth knowing before anyone looks for the change in
`sui`.

Phase 2 turned out to be where the risk actually was. The paths that broke were
not the eight that name `REPO_ROOT`; they were relative ones built from
`__dirname`, which resolve to a valid directory in the new layout and therefore
fail silently. The framework plugin wrote 113 pages outside the content root and
reported success.

## Shared components

`sites/sui/src/shared` is the Docusaurus components, plugins and build scripts
the Sui Stack docs sites have in common. `MystenLabs/ML-shared-docusaurus` is
its nominal origin, and this repo does **not** mirror from it. Three reasons,
each checked rather than assumed:

- It is stale. Its last commit is 2026-08-10; `sui`'s copy has changes after it.
- The drift is two-way. Of the 45 files, 19 are identical, 13 differ, and 13
  exist only in `sui`. Some of the 13 differing files are larger upstream, so
  neither side is simply ahead.
- The files are not actually portable. `components/Snippet/index.tsx` resolves
  `require.context("../../../../docs/snippets")` in `sui` and
  `"../../../../content/snippets"` upstream: the same shared file, hardcoding
  two different repo layouts. A mirror would overwrite one with the other and
  break whichever consumer lost.

So the tree is tracked here, which also fixes a smaller problem: `sui` ignores
`src/shared` in `.gitignore` while committing all 45 files anyway, so the rule
only hid them from a fresh checkout, and they did not come across in the move at
all. Without them the build cannot run.

What would make it mirrorable is removing the consumer-specific paths — a
`@snippets`-style alias each site defines, the same pattern as the `@repo` and
`@docs` aliases already in `sites/sui/docusaurus.config.js`. That is upstream
work plus one alias per site, and it is the real prerequisite for Phase 4.

Unrelated to the drift, two things in that tree are unreachable from this site
and were already so in `sui`: `components/Snippet` is registered in no
`MDXComponents`, imported nowhere, used by no page, and its `require.context`
target directory does not exist; the three `rehype/*` files have no references
by name. Unreachable here does not mean deletable — a shared tree exists so
another site can use them.

## Sources outside the organisation

`sui-foundation/awesome-sui`, `becky-sui/awesome-sui-gaming` and
`playtron-os/playtron-sdk` are fetched at build but governed by nobody here.
Pin them to a SHA rather than tracking a branch someone else controls.
