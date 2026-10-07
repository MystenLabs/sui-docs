// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
import roots from "./lib/roots.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// awesome-sui and awesome-sui-gaming are fetched straight from the repositories
// that own them, as codeSources in sources.json. They used to arrive inside the
// MystenLabs/sui checkout, as a git subtree under docs/subtree, which meant the
// page was generated from whatever snapshot that subtree last took: at the point
// this changed, nine months behind upstream.
const { CONTENT_ROOT, codeSource } = roots;

const readmePath = path.join(codeSource("awesome-sui-gaming"), "README.md");
const readmeTargetPath = path.join(CONTENT_ROOT, "references/awesome-sui-gaming.mdx");

// Process the content for the awesome-sui-gaming README structure:
// - Remove everything up to and including the # Contents section
// - Keep all # section headings and their tables intact
function processContent(content) {
  // Remove everything from the start up to and including the Contents section + its trailing ---
  // The Contents section ends before the first # I. heading
  // Strip everything before the first # [Roman numeral] heading
  const firstSectionMatch = content.search(/^# [IVX]+\./m);
  let processedContent;
  if (firstSectionMatch !== -1) {
    processedContent = content.slice(firstSectionMatch);
  } else {
    console.log("Warning: Could not find first section heading, using full content");
    processedContent = content;
  }

  // Convert # headings (h1) to ## headings (h2) for proper doc hierarchy
  processedContent = processedContent.replace(/^# /gm, "## ");

  return processedContent.trim();
}

// Convert README.md
console.log("Reading README file:", readmePath);
const readmeContent = fs.readFileSync(readmePath, "utf8");
const processedReadmeContent = processContent(readmeContent);

const readmeMdxContent = `---
title: Awesome Sui Gaming
description: A curated list of awesome gaming projects and developer tools within the Sui ecosystem.
---

:::info

Visit the [Awesome Sui Gaming repo](https://github.com/becky-sui/awesome-sui-gaming/tree/main) on GitHub for the source content of these pages.

:::

${processedReadmeContent}`;

// Ensure target directories exist
const readmeTargetDir = path.dirname(readmeTargetPath);
if (!fs.existsSync(readmeTargetDir)) {
  fs.mkdirSync(readmeTargetDir, { recursive: true });
}

// Write the main README MDX file
console.log("Writing README target file:", readmeTargetPath);
fs.writeFileSync(readmeTargetPath, readmeMdxContent, "utf8");

console.log("✅ Successfully converted README.md");
