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
node scripts/mirror.js        [name ...] [--check]   # place into content/
node scripts/check-mirror-edits.js --base <sha> --head <sha>
```

`mirror.js --check` writes nothing and exits non-zero if the tree would change,
which is how the workflow decides whether there is anything to commit.

All three read `sources.json` through `scripts/lib/sources.js`, so the guard
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

The forward-port workflow is not built yet. When it is, it will take the diff,
reverse the transform, and open the pull request in the source repository for
you, so an edit costs one action instead of two. Until then the guard's links
are the shortcut.

## Migration

| Phase | What | State |
| --- | --- | --- |
| 1 | Unpin the eight `REPO_ROOT` scripts in `sui` so the build stops caring where it runs | not started |
| 2 | Move `docs/content` and `docs/site` here, build to a preview, compare against production | not started |
| 3 | Cut `docs.sui.io` over, leave redirects, move CODEOWNERS | not started |
| 4 | Other sites, one at a time, each retiring a forked fetcher and schema | not started |

Phase 1 is the whole technical risk and it happens in `sui` under normal review.
The rest is mechanical once it lands.

## Sources outside the organisation

`sui-foundation/awesome-sui`, `becky-sui/awesome-sui-gaming` and
`playtron-os/playtron-sdk` are fetched at build but governed by nobody here.
Pin them to a SHA rather than tracking a branch someone else controls.
