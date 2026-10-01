/*
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
*/

// One place that answers "where is the content" and "where is the source".
//
// In MystenLabs/sui these were eight separate `../../` calculations, and they
// all assumed one thing: that the site, the pages, and the Rust and Move source
// the pages quote live in a single checkout. That assumption is what made the
// docs hard to move. Here it is false by construction, and the two roots are
// named separately:
//
//   CONTENT_ROOT  the pages. content/sui in this repo.
//   SOURCE_ROOT   the code those pages quote. A fetched checkout of
//                 MystenLabs/sui, because `crates/` and `examples/` are not
//                 here and never will be.
//
// SOURCE_ROOT matters more than it looks. 382 ImportContent tags name a path
// with no org or repo, like `crates/sui-framework/...`, and resolve against
// whatever checkout is on disk at build time. Pointing this at a fetched sui
// keeps every one of them working without editing a single page.
//
// Populate it with:  node scripts/fetch-sources.js --code
// Override either root with DOCS_CONTENT_ROOT or DOCS_SOURCE_ROOT.

const fs = require("fs");
const path = require("path");

// lib/ -> scripts/ -> sui/ -> sites/ -> repo
const SITE_ROOT = path.resolve(__dirname, "../../");
const REPO_ROOT = path.resolve(SITE_ROOT, "../../");

const fromEnv = (name, fallback) => {
  const raw = process.env[name];
  if (!raw) return fallback;
  const resolved = path.resolve(raw);
  if (!fs.existsSync(resolved)) {
    throw new Error(`${name}=${raw} resolves to ${resolved}, which does not exist`);
  }
  return resolved;
};

/** The pages this site renders. */
const CONTENT_ROOT = fromEnv("DOCS_CONTENT_ROOT", path.join(REPO_ROOT, "content/sui"));

/**
 * A checkout of MystenLabs/sui, for the code the pages quote. Not validated
 * here: a script that needs it should call requireSource() and fail with
 * something a reader can act on, rather than reporting every import missing.
 */
const SOURCE_ROOT = fromEnv("DOCS_SOURCE_ROOT", path.join(REPO_ROOT, ".cache/code/sui"));

function requireSource() {
  if (!fs.existsSync(SOURCE_ROOT)) {
    throw new Error(
      `No source checkout at ${SOURCE_ROOT}.\n` +
        `ImportContent paths like "crates/..." resolve against a checkout of ` +
        `MystenLabs/sui, which this repo does not contain.\n` +
        `Run: node scripts/fetch-sources.js --code`,
    );
  }
  return SOURCE_ROOT;
}

const sourceFile = (relPath) =>
  path.join(SOURCE_ROOT, String(relPath).replace(/^\.?\//, ""));

const contentFile = (relPath) =>
  path.join(CONTENT_ROOT, String(relPath).replace(/^\.?\//, ""));

function describe() {
  return [
    `  SITE_ROOT     ${SITE_ROOT}`,
    `  REPO_ROOT     ${REPO_ROOT}`,
    `  CONTENT_ROOT  ${CONTENT_ROOT}${process.env.DOCS_CONTENT_ROOT ? "  (from DOCS_CONTENT_ROOT)" : ""}`,
    `  SOURCE_ROOT   ${SOURCE_ROOT}${process.env.DOCS_SOURCE_ROOT ? "  (from DOCS_SOURCE_ROOT)" : ""}` +
      `${fs.existsSync(SOURCE_ROOT) ? "" : "  [MISSING: run fetch-sources.js --code]"}`,
  ].join("\n");
}

module.exports = {
  SITE_ROOT,
  REPO_ROOT,
  // Kept so scripts carried over from MystenLabs/sui keep working: there, this
  // was the monorepo root and meant "the code". Here that is SOURCE_ROOT.
  MONOREPO_ROOT: REPO_ROOT,
  CONTENT_ROOT,
  SOURCE_ROOT,
  requireSource,
  sourceFile,
  contentFile,
  describe,
};
