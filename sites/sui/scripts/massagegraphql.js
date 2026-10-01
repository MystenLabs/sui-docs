// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const path = require("path");
const { CONTENT_ROOT } = require("./lib/roots.cjs");
const CONTENT_REL = (p) => require("path").join(CONTENT_ROOT, p);

const filePath = path.resolve(
  __dirname,
  CONTENT_REL("references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint.mdx"),
);

let content = fs.readFileSync(filePath, "utf8");

content = content.replace(
  /\[([^\]]*)\]\([^)]*query\.mdx\)/g,
  '$1',
);

fs.writeFileSync(filePath, content, "utf8");

console.log("✅ Patched query link in checkpoint.mdx");
