// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// The specs are served at /open-spec/<network>/openrpc.json: that is the
// path the API catalog (static/.well-known/api-catalog) and the web client
// publish, and the JSON-RPC reference reads. They used to be served at
// /<network>/openrpc.json from a second static directory, but vercel.json
// redirects every /testnet/* and /devnet/* path to the root, so only the
// mainnet spec ever loaded and the catalog links were dead.
const topdir = path.join(__dirname, "../static/open-spec");

if (!fs.existsSync(topdir)){
    fs.mkdirSync(topdir);
}

// The spec moved when the fullnode JSON-RPC server was removed; release
// branches cut before that still carry it at the legacy path. A branch cut
// after sui-indexer-alt-jsonrpc itself was removed (14 October 2026) has no
// spec at all: devnet lost it first, and testnet and mainnet follow as their
// release branches move past that commit. The reference serves whatever is
// still published, so a missing branch is reported here and recorded in
// networks.json, which the network switch reads.
const NETWORKS = ["mainnet", "testnet", "devnet"];
const SPEC_PATHS = [
  "crates/sui-indexer-alt-jsonrpc/openrpc.json",
  "crates/sui-open-rpc/spec/openrpc.json",
];

const fetchSpec = async (branch) => {
  let lastError;
  for (const specPath of SPEC_PATHS) {
    try {
      return await axios.get(
        `https://raw.githubusercontent.com/MystenLabs/sui/${branch}/${specPath}`
      );
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
};

const downloadFile = async (branch) => {
  const branchDir = path.join(topdir, branch);
  const specDir = path.join(topdir, branch);
  const specFile = path.join(specDir, "openrpc.json");
  const backupFile = path.join(specDir, "openrpc_backup.json");

  if (!fs.existsSync(branchDir)) {
    fs.mkdirSync(branchDir, { recursive: true });
  }

  if (!fs.existsSync(specDir)) {
    fs.mkdirSync(specDir, { recursive: true });
  }

  try {
    const res = await fetchSpec(branch);

    if (fs.existsSync(backupFile)) {
      fs.unlinkSync(backupFile);
      console.log(`Deleted ${branch} backup spec.`);
    }

    if (fs.existsSync(specFile)) {
      fs.renameSync(specFile, backupFile);
      console.log(`Moved ${branch} spec to backup.`);
    }

    fs.writeFileSync(specFile, JSON.stringify(res.data, null, 2), "utf8");
    console.log(`Downloaded ${branch} spec.`);
    return true;
  } catch (err) {
    const status = err.response?.status;
    if (status === 404) {
      console.warn(
        `No OpenRPC spec on the ${branch} branch of MystenLabs/sui (404 at every known path): ` +
          `that network no longer publishes a JSON-RPC spec, so the reference will not offer it.`,
      );
    } else {
      console.error(`Error downloading ${branch} openrpc spec.`, err.message);
    }
    return false;
  }
};

(async () => {
  const available = [];
  for (const network of NETWORKS) {
    if (await downloadFile(network)) available.push(network);
  }
  // Served at /open-spec/networks.json next to the specs. The network switch
  // lists only these.
  fs.writeFileSync(path.join(topdir, "networks.json"), JSON.stringify(available, null, 2) + "\n", "utf8");
  console.log(`OpenRPC specs available: ${available.join(", ") || "none"}.`);
})();