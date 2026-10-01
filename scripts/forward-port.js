#!/usr/bin/env node
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Turns an edit to a mirrored page into a pull request against the repository
// that owns it.
//
//   node scripts/forward-port.js --json guard.json --base <sha> [--pr <n>] [--dry-run]
//
// The guard rejects these edits because the next mirror run reverts them. On its
// own that just moves the work: the author still has to find the upstream repo,
// clone it, and redo the edit by hand. This closes that gap.
//
// The hard part is that a mirrored file is not a copy of the upstream file. It
// has a generated header, and its relative links have been rewritten. Sending
// it back verbatim would push this repo's presentation choices into the source
// repo. So the edit is isolated first, by a three-way merge:
//
//   base    what the mirror produced from the upstream commit in the lockfile
//   other   the author's version of that same file
//   current the upstream file as it stands now
//
// base -> other is the author's edit and nothing else, because base is
// reproduced by replaying the same transforms over the same input. Merging that
// into current lands the edit on upstream's own text, in upstream's own link
// style, and absorbs any upstream drift since the mirror ran.
//
// If the edit touches a line the transforms rewrote, the merge conflicts. That
// is reported per file rather than guessed at: a wrong guess here writes a
// plausible, wrong change into someone else's repository.
//
// Needs a token with write access to the source repositories in FORWARD_PORT_TOKEN.
// The repo-scoped GITHUB_TOKEN of an Actions run cannot push to another repo.

const { execFileSync, execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { mirrored, readLock } = require("./lib/sources");
const { applyTransforms, targetRelPath } = require("./lib/transform");

const argv = process.argv.slice(2);
const arg = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i === -1 || i === argv.length - 1 ? null : argv[i + 1];
};
const JSON_IN = arg("json");
const BASE = arg("base");
const PR = arg("pr");
const DRY = argv.includes("--dry-run");

if (!JSON_IN || !BASE) {
  console.error("usage: forward-port.js --json <file> --base <sha> [--pr <n>] [--dry-run]");
  process.exit(2);
}

const git = (args, opts = {}) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts }).trimEnd();

// File contents must not be trimmed: a trailing newline is part of the bytes,
// and losing it makes every reconstruction comparison fail for the wrong reason.
const gitRaw = (args) =>
  execFileSync("git", args, {
    encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024,
  });

/** Basenames of every file in the source directory, which rewriteLinks needs. */
function sourceNames(repoDir, commit, sourcePath) {
  const out = git(["-C", repoDir, "ls-tree", "-r", "--name-only", commit, "--", sourcePath]);
  return out ? out.split("\n").map((f) => path.basename(f)) : [];
}

function fileAt(repoDir, commit, relPath) {
  try {
    return gitRaw(["-C", repoDir, "show", `${commit}:${relPath}`]);
  } catch {
    return null;
  }
}

/**
 * Reproduce what the mirror wrote for one file, from the upstream commit the
 * lockfile names. If this does not match what is committed here, something has
 * moved underneath us and no forward port should be attempted.
 */
function reconstruct(repoDir, commit, source, upstreamRel, names) {
  const body = fileAt(repoDir, commit, upstreamRel);
  if (body === null) return null;
  const rel = upstreamRel.slice(source.sourcePath.length + 1);
  const outRel = targetRelPath(source, rel);
  if (!outRel) return null;
  return applyTransforms(body, source, names, outRel);
}

function mergeThreeWay(current, base, other) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "fp-merge-"));
  const f = (n, c) => {
    const p = path.join(dir, n);
    fs.writeFileSync(p, c);
    return p;
  };
  const cur = f("current", current);
  const bas = f("base", base);
  const oth = f("other", other);
  try {
    const merged = execFileSync("git", ["merge-file", "-p", "--diff3", cur, bas, oth], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    return { merged, conflicts: 0 };
  } catch (e) {
    // Exit status is the conflict count; anything negative is a real failure.
    const n = typeof e.status === "number" ? e.status : -1;
    if (n > 0) return { merged: e.stdout, conflicts: n };
    return { merged: null, conflicts: -1, error: e.message };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function main() {
  const { offending } = JSON.parse(fs.readFileSync(JSON_IN, "utf8"));
  if (!offending || offending.length === 0) {
    console.log("Nothing to forward-port.");
    return;
  }

  const sources = mirrored();
  const lock = readLock();

  const bySource = new Map();
  for (const o of offending) {
    if (!bySource.has(o.source)) bySource.set(o.source, []);
    bySource.get(o.source).push(o);
  }

  const results = [];
  const workRoot = fs.mkdtempSync(path.join(os.tmpdir(), "forward-port-"));

  for (const [name, files] of bySource) {
    const source = sources.find((s) => s.name === name);
    const locked = lock[name];
    if (!source) {
      results.push({ name, status: "skipped", reason: `${name} is no longer a mirrored source` });
      continue;
    }
    if (!locked || !locked.commit) {
      results.push({
        name,
        status: "skipped",
        reason: `no lockfile entry for ${name}, so the mirrored baseline cannot be reproduced`,
      });
      continue;
    }

    const repoDir = path.join(workRoot, name);
    try {
      // Blobless: this needs trees for ls-tree and a handful of blobs for the
      // files being ported, not the repository's history. A full clone of a repo
      // the size of walrus takes minutes and gets thrown away.
      git(["clone", "--quiet", "--filter=blob:none", "--no-checkout",
           `https://github.com/${source.repo}.git`, repoDir]);
      git(["-C", repoDir, "fetch", "--quiet", "--filter=blob:none", "origin", locked.commit]);
    } catch (e) {
      results.push({ name, status: "failed", reason: `clone ${source.repo}: ${e.message.split("\n")[0]}` });
      continue;
    }

    const names = sourceNames(repoDir, locked.commit, source.sourcePath);
    const head = git(["-C", repoDir, "rev-parse", `origin/${source.ref}`]);

    const applied = [];
    const problems = [];

    for (const o of files) {
      const expectedBase = reconstruct(repoDir, locked.commit, source, o.upstreamPath, names);
      if (expectedBase === null) {
        problems.push({ file: o.file, why: `${o.upstreamPath} not present at ${locked.commit.slice(0, 9)}` });
        continue;
      }

      // The file as it was here before the author touched it.
      let hereBefore;
      try {
        hereBefore = gitRaw(["show", `${BASE}:${o.file}`]);
      } catch {
        problems.push({ file: o.file, why: "new file here, so there is no mirrored baseline to diff against" });
        continue;
      }

      if (hereBefore !== expectedBase) {
        problems.push({
          file: o.file,
          why: `the committed copy does not match a replay of the transforms over ${source.repo}@${locked.commit.slice(0, 9)}, ` +
               `so an edit cannot be told apart from transform drift`,
        });
        continue;
      }

      const hereNow = fs.readFileSync(o.file, "utf8");
      const upstreamNow = fileAt(repoDir, head, o.upstreamPath);
      if (upstreamNow === null) {
        problems.push({ file: o.file, why: `${o.upstreamPath} was deleted upstream` });
        continue;
      }

      const { merged, conflicts, error } = mergeThreeWay(upstreamNow, expectedBase, hereNow);
      if (conflicts !== 0) {
        problems.push({
          file: o.file,
          why: conflicts > 0
            ? `${conflicts} conflict(s): the edit overlaps text the mirror rewrote, or upstream changed the same lines`
            : `merge failed: ${error}`,
        });
        continue;
      }
      applied.push({ upstreamPath: o.upstreamPath, body: merged, from: o.file });
    }

    if (applied.length === 0) {
      results.push({ name, repo: source.repo, status: "nothing-applied", problems });
      continue;
    }

    const branch = `docs/forward-port${PR ? `-sui-docs-${PR}` : ""}-${Date.now().toString(36)}`;

    // Built with plumbing so no worktree is ever materialised. Checking out a
    // branch in a blobless clone would fetch every blob in the tree just to
    // rewrite two files.
    git(["-C", repoDir, "read-tree", head]);
    for (const a of applied) {
      const blob = execFileSync("git", ["-C", repoDir, "hash-object", "-w", "--stdin"], {
        input: a.body, encoding: "utf8",
      }).trim();
      git(["-C", repoDir, "update-index", "--add", "--cacheinfo", `100644,${blob},${a.upstreamPath}`]);
    }
    const tree = git(["-C", repoDir, "write-tree"]);

    const body = [
      `Forward-ported from MystenLabs/sui-docs${PR ? `#${PR}` : ""}.`,
      "",
      `These pages are mirrored into sui-docs and rendered on docs.sui.io. They were`,
      `edited there, where the change would be reverted by the next mirror run, so it`,
      `is sent here instead.`,
      "",
      "| this repo | edited as |",
      "| --- | --- |",
      ...applied.map((a) => `| \`${a.upstreamPath}\` | \`${a.from}\` |`),
      "",
      `Isolated by a three-way merge against a replay of the mirror transforms over`,
      `${locked.commit.slice(0, 9)}, so the generated header and the rewritten links`,
      `are not part of this diff. Nothing is merged without your review.`,
      ...(problems.length
        ? ["", "Not included, and still needing a hand-written change here:", "",
           ...problems.map((p) => `- \`${p.file}\`: ${p.why}`)]
        : []),
    ].join("\n");

    const title = `docs: forward-port ${applied.length} page(s) edited in sui-docs`;

    const commit = execFileSync("git", ["-C", repoDir, "commit-tree", tree, "-p", head], {
      input: title, encoding: "utf8",
      env: { ...process.env, GIT_AUTHOR_NAME: "sui-docs forward-port",
             GIT_AUTHOR_EMAIL: "noreply@mystenlabs.com",
             GIT_COMMITTER_NAME: "sui-docs forward-port",
             GIT_COMMITTER_EMAIL: "noreply@mystenlabs.com" },
    }).trim();
    git(["-C", repoDir, "update-ref", `refs/heads/${branch}`, commit]);

    if (DRY) {
      results.push({
        name, repo: source.repo, status: "dry-run", branch,
        files: applied.map((a) => a.upstreamPath), problems,
        diff: git(["-C", repoDir, "diff", "--stat", `${head}..${commit}`]),
        patch: git(["-C", repoDir, "diff", `${head}..${commit}`]),
        body,
      });
      continue;
    }

    const token = process.env.FORWARD_PORT_TOKEN;
    if (!token) {
      results.push({ name, repo: source.repo, status: "failed", problems,
        reason: "FORWARD_PORT_TOKEN is not set, so the branch cannot be pushed to another repository" });
      continue;
    }

    try {
      execSync(
        `git -C ${JSON.stringify(repoDir)} push --quiet ` +
          `https://x-access-token:${token}@github.com/${source.repo}.git ${branch}:${branch}`,
        { stdio: ["ignore", "pipe", "pipe"] },
      );
      const url = execFileSync("gh", [
        "pr", "create", "--repo", source.repo, "--base", source.ref, "--head", branch,
        "--title", title, "--body", body,
      ], { encoding: "utf8", env: { ...process.env, GH_TOKEN: token } }).trim();
      results.push({ name, repo: source.repo, status: "opened", url, files: applied.map((a) => a.upstreamPath), problems });
    } catch (e) {
      results.push({ name, repo: source.repo, status: "failed", problems,
        reason: (e.stderr || e.message || "").split("\n")[0] });
    }
  }

  for (const r of results) {
    const head = `${r.name}${r.repo ? ` (${r.repo})` : ""}`;
    if (r.status === "opened") console.log(`  ${head}: ${r.url}`);
    else if (r.status === "dry-run") {
      console.log(`  ${head}: would open on ${r.branch}`);
      for (const f of r.files) console.log(`      ${f}`);
      if (r.diff) console.log(r.diff.split("\n").map((l) => `      ${l}`).join("\n"));
      if (r.patch) console.log(r.patch.split("\n").map((l) => `      | ${l}`).join("\n"));
    } else console.log(`  ${head}: ${r.status}${r.reason ? ` — ${r.reason}` : ""}`);
    for (const p of r.problems || []) console.log(`      not ported: ${p.file} — ${p.why}`);
  }

  fs.rmSync(workRoot, { recursive: true, force: true });

  const any = results.some((r) => r.status === "opened" || r.status === "dry-run");
  if (!any) process.exit(1);
}

if (require.main === module) main();
