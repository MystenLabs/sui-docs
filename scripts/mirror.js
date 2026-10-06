#!/usr/bin/env node
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Places fetched sources into content/ and records what came from where.
//
//   node scripts/mirror.js [name ...] [--check]
//
// --check writes nothing and exits non-zero if the tree would change. The
// mirror workflow uses it to decide whether there is anything to commit.
//
// The target directory is cleaned before writing, except for `preserve`
// entries, so a file deleted upstream disappears here too. That is the whole
// reason deletions propagate without anybody tracking them.

const fs = require("fs");
const path = require("path");

const { load, readLock, writeLock, REPO_ROOT } = require("./lib/sources");
const { applyTransforms, targetRelPath } = require("./lib/transform");
const { CACHE } = require("./fetch-sources");

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const only = new Set(args.filter((a) => !a.startsWith("--")));

function listFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, base));
    else out.push(path.relative(base, full));
  }
  return out;
}

function mirrorOne(source, head) {
  const from = path.join(CACHE, source.name, source.sourcePath);
  const to = path.join(REPO_ROOT, source.targetPath);

  if (!fs.existsSync(from)) {
    throw new Error(`${source.name}: nothing fetched. Run scripts/fetch-sources.js first.`);
  }

  const incoming = listFiles(from).filter((f) => !source.exclude.has(path.basename(f)));
  const names = incoming.map((f) => path.basename(f));
  const planned = new Map();

  for (const rel of incoming) {
    const outRel = targetRelPath(source, rel);
    if (!outRel) continue; // fileMap is an allowlist when present
    const body = fs.readFileSync(path.join(from, rel), "utf8");
    planned.set(outRel, applyTransforms(body, source, names, outRel));
  }

  // What is here now, minus the files this repo authors.
  const existing = listFiles(to).filter((f) => !source.preserve.has(f));

  let changed = 0;
  const removals = existing.filter((f) => !planned.has(f));
  for (const [rel, body] of planned) {
    const full = path.join(to, rel);
    const before = fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
    if (before === body) continue;
    changed++;
    if (!checkOnly) {
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, body);
    }
  }
  if (!checkOnly) {
    for (const rel of removals) fs.rmSync(path.join(to, rel), { force: true });
  }

  console.log(
    `  ${source.name}: ${planned.size} file(s), ${changed} changed, ${removals.length} removed` +
      (source.preserve.size ? `, ${source.preserve.size} preserved` : ""),
  );
  return { changed: changed + removals.length, head, files: planned.size };
}

function main() {
  const { sources } = load();
  const heads = JSON.parse(fs.readFileSync(path.join(CACHE, "heads.json"), "utf8"));
  const wanted = sources.filter((s) => s.ownership === "mirrored" && (!only.size || only.has(s.name)));

  console.log(checkOnly ? "Checking mirror (no writes)" : "Mirroring");

  const lock = readLock();
  let totalChanged = 0;
  for (const source of wanted) {
    const head = heads[source.name];
    if (!head) {
      console.log(`  ${source.name}: not fetched, skipping`);
      continue;
    }
    const result = mirrorOne(source, head);
    totalChanged += result.changed;

    // Only rewrite the entry when the mirrored files actually changed.
    //
    // This used to stamp a fresh `mirroredAt` on every source on every run, so
    // the lockfile differed even when nothing else did, the commit step's
    // `git diff --cached --quiet` was never true, and the job committed and
    // pushed every run: 24 of the first 30 mirror commits changed nothing but
    // those timestamps. Bumping `commit` unconditionally does the same thing for
    // a different reason, since an upstream HEAD moves for reasons that never
    // touch docs, like a Rust commit in walrus.
    //
    // So `commit` is the revision this content came from, not the last revision
    // anyone looked at. It stays true until the content changes, and the commit
    // date records when that was.
    if (result.changed > 0 || !lock[source.name]) {
      lock[source.name] = {
        repo: source.repo,
        ref: source.ref,
        commit: head,
        sourcePath: source.sourcePath,
        targetPath: source.targetPath,
        files: result.files,
      };
    }
  }

  // Drop entries for sources that are no longer mirrored. A stale entry still
  // names a targetPath, and forward-port.js reads the lockfile to find the
  // commit a file was mirrored from, so leaving one behind lets it treat a path
  // this repo now owns as somebody else's.
  if (!only.size) {
    const live = new Set(sources.map((s) => s.name));
    for (const name of Object.keys(lock)) {
      if (!live.has(name)) {
        delete lock[name];
        console.log(`  ${name}: removed from the lockfile, no longer a mirrored source`);
      }
    }
  }

  if (!checkOnly) writeLock(lock);

  if (checkOnly && totalChanged > 0) {
    console.log(`\n${totalChanged} change(s) pending.`);
    process.exit(1);
  }
  console.log(totalChanged ? `\n${totalChanged} change(s) written.` : "\nUp to date.");
}

if (require.main === module) main();
module.exports = { mirrorOne };
