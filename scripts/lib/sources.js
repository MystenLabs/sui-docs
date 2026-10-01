// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Loads and validates sources.json. Every script that needs to know about an
// external source reads it through here, so the manifest has exactly one
// parser and the guard can never disagree with the mirror about which paths
// are mirrored.

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(REPO_ROOT, "sources.json");
const LOCKFILE = path.join(REPO_ROOT, "sources.lock.json");

const OWNERSHIP = new Set(["moved", "mirrored"]);

function load() {
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch (e) {
    throw new Error(`could not read ${MANIFEST}: ${e.message}`);
  }

  const sources = [];
  for (const [name, cfg] of Object.entries(raw.sources || {})) {
    const where = `sources.${name}`;
    if (!OWNERSHIP.has(cfg.ownership)) {
      throw new Error(`${where}.ownership must be "moved" or "mirrored", got ${JSON.stringify(cfg.ownership)}`);
    }
    for (const field of ["repo", "ref", "sourcePath", "targetPath"]) {
      if (!cfg[field]) throw new Error(`${where}.${field} is required`);
    }
    if (!/^[^/]+\/[^/]+$/.test(cfg.repo)) {
      throw new Error(`${where}.repo must be "owner/name", got ${JSON.stringify(cfg.repo)}`);
    }
    // A target outside content/ would put mirrored files somewhere the guard
    // does not watch, which is how a read-only tree quietly becomes writable.
    if (!cfg.targetPath.startsWith("content/")) {
      throw new Error(`${where}.targetPath must be under content/, got ${JSON.stringify(cfg.targetPath)}`);
    }
    sources.push({
      name,
      ownership: cfg.ownership,
      repo: cfg.repo,
      ref: cfg.ref,
      sourcePath: cfg.sourcePath.replace(/\/+$/, ""),
      targetPath: cfg.targetPath.replace(/\/+$/, ""),
      transforms: cfg.transforms || [],
      linkPrefix: cfg.linkPrefix || "",
      preserve: new Set(cfg.preserve || []),
      exclude: new Set(cfg.exclude || []),
      fileMap: cfg.fileMap || null,
      note: cfg.note || null,
    });
  }

  // Two sources writing into the same tree would race, and whichever ran last
  // would delete the other's files during its clean step.
  const seen = new Map();
  for (const s of sources) {
    for (const other of seen.keys()) {
      if (s.targetPath === other || s.targetPath.startsWith(`${other}/`) || other.startsWith(`${s.targetPath}/`)) {
        throw new Error(`targetPath overlap: ${s.name} (${s.targetPath}) and ${seen.get(other)} (${other})`);
      }
    }
    seen.set(s.targetPath, s.name);
  }

  return { sources, codeSources: raw.codeSources || {} };
}

const mirrored = () => load().sources.filter((s) => s.ownership === "mirrored");

/**
 * Is this repo-relative path owned by a mirror, and therefore read-only here?
 * `preserve` entries are authored in this repo and stay editable.
 */
function mirroredOwnerOf(filePath, sources = mirrored()) {
  const p = filePath.replace(/^\.\//, "");
  for (const s of sources) {
    if (p === s.targetPath || p.startsWith(`${s.targetPath}/`)) {
      const rel = p.slice(s.targetPath.length + 1);
      if (s.preserve.has(rel)) return null;
      return s;
    }
  }
  return null;
}

const readLock = () => {
  try {
    return JSON.parse(fs.readFileSync(LOCKFILE, "utf8"));
  } catch {
    return {};
  }
};

const writeLock = (data) =>
  fs.writeFileSync(LOCKFILE, `${JSON.stringify(data, null, 2)}\n`);

module.exports = { load, mirrored, mirroredOwnerOf, readLock, writeLock, REPO_ROOT, MANIFEST, LOCKFILE };
