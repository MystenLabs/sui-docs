// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const path = require("path");

// The specs the site serves: scripts/getopenrpcspecs.js downloads one per
// network from that network's release branch into static/open-spec/<network>/,
// served at /open-spec/<network>/openrpc.json. These are what the JSON-RPC
// reference renders and what the API catalog links, so they are what is
// validated.
//
// This used to read one file out of the fetched MystenLabs/sui checkout at
// `main`, crates/sui-indexer-alt-jsonrpc/openrpc.json. That crate was removed
// from main on 23 September 2026 (the last JSON-RPC server); the build kept
// passing only while Vercel's build cache held an older checkout, and failed
// the first time the cache was cold.
//
// The release branches carried a spec for a while longer, and lose it one by
// one as they move past that removal: devnet had none from 21 October 2026,
// and every preview build failed on the missing file. So only mainnet, the
// last branch to move, is required. A network whose spec is present is
// validated; one whose spec is absent is reported, and the downloader leaves
// it out of networks.json so the reference does not offer it.
const SPEC_DIR = path.resolve(__dirname, "../static/open-spec");

const SPECS = [
  { network: "mainnet", relPath: "mainnet/openrpc.json", strictJson: true },
  { network: "testnet", relPath: "testnet/openrpc.json", strictJson: false },
  { network: "devnet", relPath: "devnet/openrpc.json", strictJson: false },
];

// Treat these as "expected non-JSON stubs".
// Add/remove patterns to match how your repo represents redirects.
function isAllowedNonJsonStub(raw) {
  const s = String(raw || "").trim();

  // Examples this permits:
  // "../tests/..." or "../../something"
  // "/some/path"
  // "https://example.com/openrpc.json"
  if (s.startsWith("../") || s.startsWith("./") || s.startsWith("/")) return true;
  if (/^https?:\/\/\S+$/i.test(s)) return true;

  // If your stub sometimes is a single relative filename, you can allow this:
  // if (/^[\w./-]+\.json$/i.test(s)) return true;

  return false;
}

function fail(msg) {
  const banner = "\n🛑 OpenRPC spec validation failed\n";
  throw new Error(`${banner}${msg}\n`);
}

function validateOpenRpcShape(doc, absPath) {
  const problems = [];

  if (!doc || typeof doc !== "object") problems.push("Root must be an object.");
  if (!doc.openrpc || typeof doc.openrpc !== "string")
    problems.push("Missing/invalid `openrpc` (string).");
  if (!doc.info || typeof doc.info !== "object")
    problems.push("Missing/invalid `info` (object).");
  if (!doc.info?.version || typeof doc.info.version !== "string")
    problems.push("Missing/invalid `info.version` (string).");
  if (!Array.isArray(doc.methods))
    problems.push("Missing/invalid `methods` (array).");

  // Your nav groups by tags[0].name — catch obvious breaks early
  const methods = Array.isArray(doc.methods) ? doc.methods : [];
  const badTags = [];
  for (const m of methods) {
    if (!m || typeof m !== "object") continue;
    if (!Array.isArray(m.tags) || !m.tags[0] || typeof m.tags[0].name !== "string") {
      badTags.push(m.name || "(unnamed method)");
      if (badTags.length >= 8) break;
    }
  }
  if (badTags.length) {
    problems.push(
      `Some methods are missing tags[0].name (used for nav grouping). Examples:\n` +
        badTags.map((x) => `  - ${x}`).join("\n"),
    );
  }

  // UI expects components.schemas to exist for schema nav + ref rendering
  const schemas = doc.components?.schemas;
  if (!schemas || typeof schemas !== "object") {
    problems.push("Missing/invalid `components.schemas` (object).");
  }

  if (problems.length) {
    fail(
      `File:\n  - ${absPath}\n\nProblems:\n` +
        problems.map((p) => `  • ${p}`).join("\n"),
    );
  }
}

function main() {
  let validCount = 0;
  const warnings = [];

  for (const spec of SPECS) {
    const abs = path.join(SPEC_DIR, spec.relPath);

    let raw;
    try {
      raw = fs.readFileSync(abs, "utf8");
    } catch (e) {
      if (spec.strictJson) {
        fail(
          `Missing required file for ${spec.network}:\n  - ${abs}\n\n${e.message}\n\n` +
            `scripts/getopenrpcspecs.js downloads it from the ${spec.network} branch of MystenLabs/sui ` +
            `before the build (scripts/build-and-check.sh); run it, or check that branch still carries a spec.`,
        );
      } else {
        warnings.push(
          `⚠️ No ${spec.network} spec at ${abs}: the ${spec.network} branch of MystenLabs/sui ` +
            `no longer publishes one, so the reference does not offer ${spec.network}.`,
        );
        continue;
      }
    }

    // Strict networks must be real JSON.
    if (spec.strictJson) {
      let doc;
      try {
        doc = JSON.parse(raw);
      } catch (e) {
        fail(
          `Invalid JSON in REQUIRED ${spec.network} spec:\n  - ${abs}\n\n` +
            `JSON parse error: ${e.message}\n\n` +
            `First 120 chars:\n${raw.trim().slice(0, 120)}`,
        );
      }
      validateOpenRpcShape(doc, abs);
      validCount++;
      continue;
    }

    // Non-strict: try JSON; if it fails, allow certain stub formats.
    try {
      const doc = JSON.parse(raw);
      validateOpenRpcShape(doc, abs);
      validCount++;
    } catch (e) {
      if (isAllowedNonJsonStub(raw)) {
        warnings.push(
          `⚠️ ${spec.network} spec is a non-JSON stub (allowed): ${abs}\n` +
            `    Content: ${raw.trim().slice(0, 120)}`,
        );
      } else {
        // Not JSON and not an allowed stub → fail.
        fail(
          `Invalid ${spec.network} spec (not JSON and not an allowed stub):\n  - ${abs}\n\n` +
            `JSON parse error: ${e.message}\n\n` +
            `First 120 chars:\n${raw.trim().slice(0, 120)}\n\n` +
            `If this is an intentional stub, update isAllowedNonJsonStub() to match it.`,
        );
      }
    }
  }

  // Safety: ensure at least one real spec validated
  if (validCount < 1) {
    fail(
      "No valid OpenRPC specs were validated. At least one network must provide a real OpenRPC JSON spec.",
    );
  }

  if (warnings.length) {
    console.warn(warnings.join("\n"));
  }

  console.log("✅ OpenRPC spec validation passed.");
}

if (require.main === module) main();

module.exports = { main };
