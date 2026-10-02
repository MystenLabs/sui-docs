#!/usr/bin/env node
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Publishes the shared Docusaurus components to MystenLabs/ML-shared-docusaurus.
//
//   node scripts/publish-shared.js [--dry-run] [--branch <name>]
//
// Direction matters here, and it is the opposite of every other script in this
// repo. mirror.js pulls pages in from the repositories that own them. This
// pushes code out, because for the shared components this repo is the one that
// owns them.
//
// That is a conclusion from the trees rather than a preference. At the time of
// writing ML-shared-docusaurus held 32 files and this repo held 45, including
// every one of those 32. Nothing upstream was absent here, upstream's last
// commit was seven weeks old, and the files that differed differed by being
// older there: `var` for `let`, a path pointing at a directory no consumer has,
// and the plugin name mismatch that left six cards blank on the Sui onboarding
// page. Mirroring from upstream would have deleted thirteen components that ~71
// pages import and reintroduced the bugs.
//
// So upstream becomes a published artifact rather than a source. Other sites
// keep consuming it exactly as they do today; it simply gets its contents from
// here, on purpose, instead of drifting.
//
// Needs a token with write access to ML-shared-docusaurus in SHARED_PUBLISH_TOKEN.
// Opens a pull request; it never pushes to master directly.

const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { REPO_ROOT } = require("./lib/sources");

const TARGET = "MystenLabs/ML-shared-docusaurus";
const TARGET_BRANCH = "master";
const SOURCE = path.join(REPO_ROOT, "sites/sui/src/shared");

const argv = process.argv.slice(2);
const dry = argv.includes("--dry-run");
const branchArg = argv.indexOf("--branch");
const branch =
  branchArg !== -1 && argv[branchArg + 1]
    ? argv[branchArg + 1]
    : `publish/from-sui-docs-${Date.now().toString(36)}`;

const git = (args, opts = {}) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts }).trimEnd();

function listFiles(dir, base = dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) listFiles(full, base, out);
    else out.push(path.relative(base, full));
  }
  return out;
}

function main() {
  if (!fs.existsSync(SOURCE)) throw new Error(`no shared tree at ${SOURCE}`);

  const work = fs.mkdtempSync(path.join(os.tmpdir(), "publish-shared-"));
  const repo = path.join(work, "target");
  git(["clone", "--quiet", "--depth", "1", "--branch", TARGET_BRANCH,
       `https://github.com/${TARGET}.git`, repo]);

  const ours = listFiles(SOURCE);
  const theirs = listFiles(repo);

  const added = ours.filter((f) => !theirs.includes(f));
  const removed = theirs.filter((f) => !ours.includes(f));
  const changed = ours.filter(
    (f) => theirs.includes(f) &&
      fs.readFileSync(path.join(SOURCE, f)).compare(fs.readFileSync(path.join(repo, f))) !== 0,
  );

  console.log(`  ${TARGET}@${TARGET_BRANCH}: ${theirs.length} files`);
  console.log(`  here: ${ours.length} files`);
  console.log(`  added ${added.length}, changed ${changed.length}, removed ${removed.length}`);
  for (const f of [...added.map((f) => `+ ${f}`), ...changed.map((f) => `~ ${f}`),
                   ...removed.map((f) => `- ${f}`)].slice(0, 40)) {
    console.log(`    ${f}`);
  }

  if (!added.length && !changed.length && !removed.length) {
    console.log("\n  Up to date; nothing to publish.");
    fs.rmSync(work, { recursive: true, force: true });
    return;
  }

  if (dry) {
    console.log(`\n  Dry run. Would open ${branch} on ${TARGET}.`);
    fs.rmSync(work, { recursive: true, force: true });
    return;
  }

  const token = process.env.SHARED_PUBLISH_TOKEN;
  if (!token) {
    console.error("\n  SHARED_PUBLISH_TOKEN is not set, so the branch cannot be pushed.");
    process.exit(1);
  }

  for (const f of removed) fs.rmSync(path.join(repo, f), { force: true });
  for (const f of [...added, ...changed]) {
    const dest = path.join(repo, f);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(SOURCE, f), dest);
  }

  git(["-C", repo, "checkout", "--quiet", "-b", branch]);
  git(["-C", repo, "add", "-A"]);
  const title = "Publish shared components from MystenLabs/sui-docs";
  execFileSync("git", ["-C", repo, "commit", "--quiet", "-m", title], {
    env: { ...process.env, GIT_AUTHOR_NAME: "sui-docs publish",
           GIT_AUTHOR_EMAIL: "noreply@mystenlabs.com",
           GIT_COMMITTER_NAME: "sui-docs publish",
           GIT_COMMITTER_EMAIL: "noreply@mystenlabs.com" },
  });
  execFileSync("bash", ["-c",
    `git -C ${JSON.stringify(repo)} push --quiet ` +
    `https://x-access-token:${token}@github.com/${TARGET}.git ${branch}:${branch}`]);

  const body = [
    "Published from MystenLabs/sui-docs, which holds the copy these components are maintained in.",
    "",
    `added ${added.length}, changed ${changed.length}, removed ${removed.length}.`,
    "",
    "Nothing here was hand-written: the tree is copied wholesale from",
    "`sites/sui/src/shared` in sui-docs. Review it as a release rather than a diff.",
  ].join("\n");
  const url = execFileSync("gh", ["pr", "create", "--repo", TARGET, "--base", TARGET_BRANCH,
    "--head", branch, "--title", title, "--body", body],
    { encoding: "utf8", env: { ...process.env, GH_TOKEN: token } }).trim();
  console.log(`\n  ${url}`);
  fs.rmSync(work, { recursive: true, force: true });
}

if (require.main === module) main();
