# sui-docs

One repository for Mysten Labs documentation. Content for every docs site lives
here, whether it is authored here or mirrored from the repository that owns it.

Status: **scaffold**. The manifest and the fetcher work, and the Sui pages are
here. The other sites have not moved. See `Migration` below.

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
| Committed here | yes | no, gitignored and materialised on demand |
| Deletions propagate | n/a | yes, the mirror cleans before writing |
| Hand edits here | normal | there is nothing here to edit |

A source changes category by changing one line. Nothing else moves.

## Layout

```
content/          pages. One directory per source, named in sources.json
sites/            one Docusaurus site per product (not yet moved)
shared/           components, theme, frontmatter schema (not yet moved)
sources.json      every external source, its path and its pinned ref
sources.lock.json which commit each mirror last came from. Written by the mirror
scripts/          one fetcher, one mirror
```

## Scripts

```bash
node scripts/fetch-sources.js [name ...] [--force]   # sparse-clone into .cache
node scripts/fetch-sources.js --code                 # the repos the pages quote
node scripts/mirror.js        [name ...] [--check]   # place into content/
node scripts/publish-shared.js [--dry-run]           # shared components, outward
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

Mirrored pages are **not committed here**. `content/<source>` is gitignored, and
you materialise the tree when you want it:

```bash
node scripts/fetch-sources.js && node scripts/mirror.js
```

That is enough for an audit, a cross-product search, or a link check over every
Mysten doc at once, and it is more current than a commit would be, because it
fetches rather than reading whatever the last sync left behind.

### Why not commit them

It was tried. A committed copy needs a guard to stop anyone editing it, and then
a forward-port to let them edit it anyway and send the patch upstream. That came
to roughly 620 lines, a bot writing to `main` several times a day, and 38MB in
git, to maintain a tree that nothing in this repo read: no site rendered it, and
no script referenced it.

The five code sources under `.cache/` have always worked the other way. They are
fetched at build time, never committed, and have needed none of that machinery.
The asymmetry had no justification, so it is gone.

What `ownership: mirrored` means is that the pages belong to the repository that
owns them: authored there, reviewed by its reviewers, published from its own
site. A copy here was never authoritative, so keeping one in git bought nothing
and cost a guard.

### Editing a mirrored page

Edit it upstream, in the repository that owns it. There is no copy here to edit.

### When a source should be committed

When its site actually moves here. At that point it becomes `ownership: moved`,
this repo is its source of truth and deploys it, and its pages are tracked,
edited and reviewed here exactly like `content/sui`. That is the distinction
`ownership` exists to express.

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
where other sites consume them from.

**This repo is the source of truth, and publishes to that one.** That is the
opposite of every other direction here, and it is a reading of the trees rather
than a preference:

- It holds every file upstream holds, and fourteen more. Nothing upstream is
  absent here, so there is nothing to pull.
- Upstream's last commit is seven weeks old.
- Where the two differ, upstream is the older one. `var` for `let`, a
  `require.context` path pointing at a directory no consumer has, and a plugin
  name that no longer matched the plugin.

That last one was not cosmetic. `Cards` asked for `hashi-description-plugin`
while the plugin registered as `sui-description-plugin`, so `usePluginData`
returned undefined and every `<Card />` written without children rendered as a
title with nothing under it. Six of those are on the onboarding page. Mirroring
from upstream would have reintroduced it, and deleted thirteen components that
around seventy pages import.

The underlying problem was that the components carried the name of whichever
consumer they were last copied from. Those names now live once, in
`src/shared/plugin-names.js`, and the paths that used to be consumer-specific go
through the `@docs` alias and `roots.cjs` instead.

Publish with the **Publish shared components** workflow, or:

```bash
node scripts/publish-shared.js --dry-run   # list what would change
node scripts/publish-shared.js             # open a pull request upstream
```

It opens a pull request and never pushes to `master`. It needs
`SHARED_PUBLISH_TOKEN` with write access to that repository.

Two things it does not solve. Other sites still vendor their copy rather than
depending on a version, so nothing stops one of them editing in place and
drifting again; a published package would. And `sites/sui/src/shared` is still
inside one site, so promoting it to the empty `shared/` at the root is still
the right move once a second site lands here.

## Sources outside the organisation

`sui-foundation/awesome-sui`, `becky-sui/awesome-sui-gaming` and
`playtron-os/playtron-sdk` are fetched at build but governed by nobody here.
Pin them to a SHA rather than tracking a branch someone else controls.
