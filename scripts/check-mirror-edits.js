#!/usr/bin/env node
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Fails a pull request that hand-edits a mirrored path.
//
//   node scripts/check-mirror-edits.js --base <sha> --head <sha> [--json out.json]
//
// A mirrored file is a copy. Editing it here looks like it works, renders
// correctly in preview, and is silently reverted by the next mirror run. The
// generated header on each file warns a reader; CODEOWNERS makes a reviewer
// look; only this check actually stops it.
//
// It reads sources.json through the same loader the mirror uses, so the set of
// protected paths cannot drift from the set of mirrored paths.
//
// --json writes the offending paths and their upstream repos, which is what
// the forward-port workflow consumes to open the pull request in the right
// place instead of simply rejecting the author's work.

const { execFileSync, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const { mirrored, mirroredOwnerOf } = require("./lib/sources");

const argv = process.argv.slice(2);
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 || i === argv.length - 1 ? null : argv[i + 1];
};

const BASE = arg("base");
const HEAD = arg("head");
const JSON_OUT = arg("json");

if (!BASE || !HEAD) {
  console.error("usage: check-mirror-edits.js --base <sha> --head <sha> [--json out.json]");
  process.exit(2);
}

const git = (args) => execFileSync("git", args, { encoding: "utf8" });

function main() {
  const sources = mirrored();

  let changed;
  try {
    changed = git(["diff", "--name-only", `${BASE}...${HEAD}`])
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  } catch (e) {
    console.error(`could not diff ${BASE}...${HEAD}: ${e.message}`);
    process.exit(2);
  }

  const offending = [];
  for (const file of changed) {
    const owner = mirroredOwnerOf(file, sources);
    if (owner) {
      offending.push({
        file,
        source: owner.name,
        repo: owner.repo,
        ref: owner.ref,
        upstreamPath: `${owner.sourcePath}/${file.slice(owner.targetPath.length + 1)}`,
      });
    }
  }

  if (JSON_OUT) {
    fs.writeFileSync(JSON_OUT, `${JSON.stringify({ offending }, null, 2)}\n`);
  }

  if (offending.length === 0) {
    console.log(`No mirrored paths touched (${changed.length} file(s) changed).`);
    return;
  }

  // A mirrored path changing is not the same as somebody editing it. A pull
  // request carrying mirror output -- a re-mirror, or a merge that brings one
  // in -- changes these files legitimately, and the first version of this guard
  // failed such a pull request with 470 "hand edits" that were nothing of the
  // sort. The question worth asking is whether the tree is what the mirror would
  // produce, so ask the mirror.
  const check = spawnSync(process.execPath, [path.join(__dirname, "mirror.js"), "--check"], {
    encoding: "utf8",
  });
  if (check.status === 0) {
    console.log(
      `${offending.length} mirrored file(s) changed, and all of them match what the ` +
        `mirror produces from the pinned upstream commits. Nothing was hand-edited.`,
    );
    return;
  }
  if (check.status === null) {
    console.log(
      "Could not run the mirror to tell its output apart from a hand edit " +
        `(${check.error ? check.error.message : "unknown"}). Treating the changes as edits.`,
    );
  }

  console.log(`${offending.length} mirrored file(s) edited. These are read-only here.\n`);
  for (const o of offending) {
    console.log(`::error file=${o.file}::Mirrored from ${o.repo}. Edit ${o.upstreamPath} there instead; this copy is overwritten by the next mirror run.`);
    console.log(`  ${o.file}`);
    console.log(`    -> https://github.com/${o.repo}/blob/${o.ref}/${o.upstreamPath}`);
  }
  console.log(
    `\nThe forward-port workflow can open these as pull requests against the source ` +
      `repositories. If it did not run, open them by hand at the links above.`,
  );
  process.exit(1);
}

if (require.main === module) main();
