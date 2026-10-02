#!/usr/bin/env node
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Sparse-clones every source in sources.json into a local cache.
//
//   node scripts/fetch-sources.js [name ...] [--force]
//
// This replaces three separate implementations of the same thing:
// fetch-external-docs.js in MystenLabs/sui, and fetch-oyster-docs.js and
// fetch-walrus-memory-docs.js in MystenLabs/walrus. They were written
// independently, do the same git incantation, and have drifted. One copy here.
//
// Nothing is transformed or placed; that is mirror.js. This only gets bytes
// onto disk and records which commit they came from.

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const { load, REPO_ROOT } = require("./lib/sources");

const CACHE = process.env.SOURCES_CACHE || path.join(REPO_ROOT, ".cache/sources");

const args = process.argv.slice(2);
const force = args.includes("--force");
const codeOnly = args.includes("--code");
const only = new Set(args.filter((a) => !a.startsWith("--")));

const CODE_CACHE = process.env.CODE_CACHE || path.join(REPO_ROOT, ".cache/code");

const run = (cmd, cmdArgs, cwd) =>
  execFileSync(cmd, cmdArgs, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

/** Files under dir, ignoring .git. Used to catch a fetch that produced nothing. */
function countFiles(dir) {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    n += e.isDirectory() ? countFiles(path.join(dir, e.name)) : 1;
  }
  return n;
}

/**
 * Sparse-clone one source at its pinned ref. Returns the commit actually
 * fetched, which is what the lockfile records: a ref like "main" moves, and a
 * mirror that cannot say which commit it came from cannot be audited.
 */
function fetchOne(source) {
  const dir = path.join(CACHE, source.name);

  if (fs.existsSync(dir) && !force) {
    const head = run("git", ["-C", dir, "rev-parse", "HEAD"]);
    console.log(`  ${source.name}: cached at ${head.slice(0, 12)} (--force to refetch)`);
    return head;
  }

  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  // blob:none keeps this to tree metadata plus the one directory we check out.
  // depth 1 because history is irrelevant to a mirror of current content.
  run("git", [
    "clone", "--quiet", "--depth", "1", "--filter=blob:none", "--sparse",
    "--branch", source.ref,
    `https://github.com/${source.repo}.git`,
    dir,
  ]);
  // "." as a sparse pattern matches nothing, so a whole-repo source has to turn
  // sparse checkout off instead. Setting it to "." fetches an empty tree and,
  // because path.join(dir, ".") is dir itself, the check below used to pass.
  if (source.sourcePath === ".") {
    run("git", ["-C", dir, "sparse-checkout", "disable"]);
  } else {
    run("git", ["-C", dir, "sparse-checkout", "set", "--no-cone", source.sourcePath]);
  }

  const head = run("git", ["-C", dir, "rev-parse", "HEAD"]);
  const content = path.join(dir, source.sourcePath);
  if (!fs.existsSync(content) || countFiles(content) === 0) {
    throw new Error(
      `${source.name}: ${source.repo}@${source.ref} fetched no files from ${source.sourcePath}. ` +
        `The path moved, or sources.json is wrong.`,
    );
  }
  console.log(`  ${source.name}: ${source.repo}@${source.ref} -> ${head.slice(0, 12)}`);
  return head;
}

/**
 * Fetch a code source: the repositories the pages quote but do not render.
 * Sparse, because an ImportContent path only ever needs a few directories and
 * MystenLabs/sui is large.
 */
function fetchCode(name, cfg) {
  const dir = path.join(CODE_CACHE, name);
  if (fs.existsSync(dir) && !force) {
    const head = run("git", ["-C", dir, "rev-parse", "HEAD"]);
    console.log(`  ${name}: cached at ${head.slice(0, 12)}`);
    return head;
  }
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  run("git", [
    "clone", "--quiet", "--depth", "1", "--filter=blob:none", "--sparse",
    "--branch", cfg.ref,
    `https://github.com/${cfg.repo}.git`,
    dir,
  ]);
  const paths = (cfg.paths || []).filter((p) => p !== ".");
  if (paths.length) {
    run("git", ["-C", dir, "sparse-checkout", "set", "--no-cone", ...paths]);
  } else {
    run("git", ["-C", dir, "sparse-checkout", "disable"]);
  }
  const head = run("git", ["-C", dir, "rev-parse", "HEAD"]);
  console.log(`  ${name}: ${cfg.repo}@${cfg.ref} -> ${head.slice(0, 12)} [${(cfg.paths || []).join(", ")}]`);
  return head;
}

function main() {
  const { sources, codeSources } = load();

  if (codeOnly) {
    fs.mkdirSync(CODE_CACHE, { recursive: true });
    const entries = Object.entries(codeSources).filter(([k]) => k !== "$comment");
    console.log(`Fetching ${entries.length} code source(s) into ${CODE_CACHE}`);
    const failed = [];
    for (const [name, cfg] of entries) {
      if (only.size && !only.has(name)) continue;
      try {
        fetchCode(name, cfg);
      } catch (e) {
        console.error(`  ${name}: FAILED ${e.message.split("\n")[0]}`);
        failed.push(name);
      }
    }
    if (failed.length) process.exit(1);
    return;
  }

  const wanted = sources.filter((s) => s.ownership === "mirrored" && (!only.size || only.has(s.name)));

  if (only.size) {
    const unknown = [...only].filter((n) => !sources.some((s) => s.name === n));
    if (unknown.length) {
      console.error(`unknown source(s): ${unknown.join(", ")}`);
      process.exit(2);
    }
  }

  fs.mkdirSync(CACHE, { recursive: true });
  console.log(`Fetching ${wanted.length} source(s) into ${CACHE}`);

  const heads = {};
  const failed = [];
  for (const source of wanted) {
    try {
      heads[source.name] = fetchOne(source);
    } catch (e) {
      // One unreachable source should not stop the rest: a partial mirror is
      // visible and fixable, a failed build is not.
      console.error(`  ${source.name}: FAILED ${e.message.split("\n")[0]}`);
      failed.push(source.name);
    }
  }

  fs.writeFileSync(
    path.join(CACHE, "heads.json"),
    `${JSON.stringify(heads, null, 2)}\n`,
  );

  if (failed.length) {
    console.error(`\n${failed.length} source(s) failed: ${failed.join(", ")}`);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = { fetchOne, CACHE };
