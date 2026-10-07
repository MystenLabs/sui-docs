# sui-docs

One repository for Mysten Labs documentation. Pages authored here are committed
here; pages owned by another repository are fetched on demand.

Status: **scaffold**. The manifest, the fetcher and the Sui site are here. The
other sites have not moved.

## Layout

```
content/sui/      the Sui pages. Authored, reviewed and published from here
content/<other>/  mirrored pages. Gitignored, materialised on demand
sites/sui/        the Sui Docusaurus site, and the shared components
sources.json      every external source, its path and its ref
sources.lock.json the commit each mirrored tree last came from
scripts/          the fetcher, the mirror and the shared-component publisher
.cache/           fetched sources and quoted code. Gitignored
```

## Ownership

`sources.json` gives every source an `ownership`, which determines how it is
handled.

| | `moved` | `mirrored` |
| --- | --- | --- |
| Pages live in | this repo | the source repo |
| Edited in | this repo | the source repo, beside its code |
| Reviewed by | the docs team | the source repo's reviewers |
| Committed here | yes | no, gitignored and materialised on demand |
| Deletions propagate | n/a | yes, the mirror cleans before writing |

A source changes category by changing that one field.

## Scripts

```bash
node scripts/fetch-sources.js [name ...] [--force]  # sparse-clone into .cache
node scripts/fetch-sources.js --code                # the repos the pages quote
node scripts/mirror.js [name ...] [--check] [--write-lock]
node scripts/publish-shared.js [--dry-run]          # shared components, outward
```

`mirror.js --check` writes nothing and exits non-zero if the tree would change.
`--write-lock` updates `sources.lock.json`; without it a local run leaves the
tree clean.

Both read `sources.json` through `scripts/lib/sources.js`, which rejects a
manifest whose target paths overlap.

## Mirrored content

`content/<source>` is gitignored for every `mirrored` source. To materialise the
full corpus, for an audit or a cross-product search:

```bash
node scripts/fetch-sources.js && node scripts/mirror.js
```

The mirror places each source's pages under its `targetPath`, applies the
transforms in `scripts/lib/transform.js`, and cleans the target directory first,
so a file deleted upstream disappears here too.

To change a mirrored page, edit it in the repository that owns it. There is no
copy here to edit.

When a site moves here, its source becomes `ownership: moved` and its pages are
tracked, edited and reviewed here like `content/sui`.

## Quoted code

Pages quote source that lives in other repositories: Rust crates, Move packages,
TypeScript SDK sources, example apps. `sources.json` lists these under
`codeSources`, and `fetch-sources.js --code` sparse-clones them into
`.cache/code`. `ImportContent` paths resolve against that checkout.

`sites/sui/scripts/lib/roots.cjs` holds the two roots this depends on:
`CONTENT_ROOT` for the pages, `SOURCE_ROOT` for the code they quote. Override
either with `DOCS_CONTENT_ROOT` or `DOCS_SOURCE_ROOT`.

## Generated pages

Several trees under `content/sui` are produced at build time and gitignored:
the framework reference, the GraphQL schema pages, release notes, and the
awesome-sui lists. The generators run from `prebuild` in
`sites/sui/package.json`. Do not edit the output; change the generator or its
source.

## Migration

| Phase | What | State |
| --- | --- | --- |
| 1 | Unpin the scripts that assumed the site, the pages and the quoted source share one checkout | done |
| 2 | Move `docs/content` and `docs/site` here and get the build green | done |
| 3 | Cut `docs.sui.io` over, leave redirects, move CODEOWNERS | not started |
| 4 | Other sites, one at a time | blocked, see Shared components |

The split roots live in `sites/sui/scripts/lib/roots.cjs` here; `sui`'s own
`docs/site` is untouched and still builds.

## Shared components

`sites/sui/src/shared` holds the Docusaurus components, plugins and build
scripts the Sui Stack docs sites have in common.
`MystenLabs/ML-shared-docusaurus` is where other sites consume them from, and
this repo is the source of truth that publishes to it.

Component and plugin names live once, in `src/shared/plugin-names.js`. Paths go
through the `@docs` alias and `roots.cjs` rather than being consumer-specific.

Publish with the **Publish shared components** workflow, or:

```bash
node scripts/publish-shared.js --dry-run   # list what would change
node scripts/publish-shared.js             # open a pull request upstream
```

It opens a pull request and never pushes to `master`. It needs
`SHARED_PUBLISH_TOKEN` with write access to that repository.

`sites/sui/src/shared` sits inside one site. A top-level `shared/` is where it
belongs once a second site lands here; that directory does not exist yet.

## Sources outside the organisation

`playtron-os/playtron-sdk` is a `codeSource` fetched at build and governed by
nobody here. It tracks `main`; pin it to a SHA instead if that matters.

`sui-foundation/awesome-sui` and `becky-sui/awesome-sui-gaming` are not fetched
directly. They arrive inside the `sui` checkout, as subtrees under
`docs/subtree`, which `codeSources.sui` lists among its paths.
