/*
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import TOC from "@theme/TOC";
import {
  CLAUDE_PATH,
  CHATGPT_PATH,
  GEMINI_PATH,
} from "@site/src/shared/components/OpenInAgentButton";
import styles from "./explore.module.css";
import docsSites from "../data/docs-sites.json";
import hubProducts from "../data/hub-products.json";
import hubIndex from "../data/hub-index.json";

// The documentation index: one entry point across every Mysten Labs docs site.
//
// The route is /explore. Not /documentation, which is redundant on a
// documentation site, and not /products, because the navbar already has "Sui
// Stack" for the products and two items for one referent is worse than a vague
// one. /explore is a reclaimed legacy path: it used to 308 to /getting-started
// and nothing in the current docs linked to it, so the redirect was dropped and
// old inbound links now land on this index instead, which contains getting
// started among everything else. The data files and their generator keep the
// shorter internal "hub" name.
//
// Deliberately not the Sui home page. That page introduces Sui to a reader who
// has already decided to read about Sui; this one answers "which of these has
// the thing I need", which is a different question.
//
// Order is the argument the page makes. The machine-readable entry points come
// first because they are the only things here that are otherwise undiscoverable
// and because an agent reading top-down should find them without parsing the
// rest. Then destinations, then a flat index of every section.
//
// Three data files, deliberately: docs-sites.json is the sites, maintained
// alongside the search tabs and the llms.txt federation; hub-products.json is
// editorial, because what counts as a product is a judgement; hub-index.json is
// generated from page frontmatter by scripts/generate-hub-index.mjs.

const hostOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
const isExternal = (url) => /^https?:\/\//.test(url);

// The TOC highlights by looking up heading elements by id, so the id a section
// renders with and the id its TOC entry points at have to come from one place.
const slug = (heading) =>
  heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Site-relative links go through Docusaurus's Link so the strict build checks
 * them, which is how a link to a draft page got caught. Absolute links point at
 * another site and cannot be checked here, so they are verified by hand.
 */
function Anchor({ to, className, children }) {
  return isExternal(to) ? (
    <a className={className} href={to}>{children}</a>
  ) : (
    <Link className={className} to={to}>{children}</Link>
  );
}

function SectionHead({ heading }) {
  return (
    <div className={styles.sectionHead}>
      <h2 className={styles.sectionHeading} id={slug(heading)}>
        {heading}
      </h2>
    </div>
  );
}

function Card({ name, description, url }) {
  // The host is shown only when the link leaves this site, so a reader knows
  // before clicking. Internal links get nothing rather than a redundant
  // docs.sui.io on two thirds of the grid.
  return (
    <li>
      <Anchor to={url} className={styles.card}>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardDesc}>{description}</p>
        {isExternal(url) ? <span className={styles.cardHost}>{hostOf(url)}</span> : null}
      </Anchor>
    </li>
  );
}

// What an agent gets told when someone opens this page in one. It points at
// llms.txt rather than pasting the page, because the index is what makes the
// rest of the docs reachable, and names the .md convention so the agent can
// fetch any page it finds there.
const AGENT_PROMPT = [
  "I am building on Sui. Use the Sui documentation index at",
  "https://docs.sui.io/llms.txt to find the right pages, and fetch any page as",
  "markdown by appending .md to its URL (for example",
  "https://docs.sui.io/develop.md). Start by telling me what is covered.",
].join(" ");

const launchers = [
  { name: "Claude", icon: CLAUDE_PATH, href: `https://claude.ai/new?q=${encodeURIComponent(AGENT_PROMPT)}`, event: "claude" },
  { name: "ChatGPT", icon: CHATGPT_PATH, href: `https://chatgpt.com/?q=${encodeURIComponent(AGENT_PROMPT)}`, event: "chatgpt" },
  { name: "Gemini", icon: GEMINI_PATH, href: `https://gemini.google.com/app?q=${encodeURIComponent(AGENT_PROMPT)}`, event: "gemini" },
];

function AgentBar() {
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.agentBar}>
      {launchers.map((l) => (
        <a
          key={l.event}
          className={`${styles.launch} plausible-event-name=hub+open+agent plausible-event-agent=${l.event}`}
          href={l.href}
          target="_blank"
          rel="noreferrer"
        >
          <svg className={styles.launchIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path d={l.icon} fill="currentColor" />
          </svg>
          {l.name}
        </a>
      ))}
      <button
        type="button"
        className={`${styles.launch} plausible-event-name=hub+copy+prompt`}
        onClick={() => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(AGENT_PROMPT);
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Prompt copied" : "Copy prompt"}
      </button>
    </div>
  );
}

// Things to do, not things to read about. Each one is a command that can be
// copied and run, because the audience for this section is someone wiring an
// agent up right now. The commands are the ones the pages themselves document:
// the MCP transport comes from getting-started/sui-mcp-server and the skills
// command from the skills page, so there is one source for each.
const agentActions = [
  {
    label: "Point an agent at the docs",
    detail: "An index of every page, built for language models.",
    command: "curl https://docs.sui.io/llms.txt",
    event: "llmstxt",
  },
  {
    label: "Read any page as markdown",
    detail: "Append .md to any docs.sui.io URL and skip the HTML.",
    command: "curl https://docs.sui.io/develop.md",
    event: "markdown",
  },
  {
    label: "Install the Sui agent skills",
    detail: "Sui-specific context for a coding agent.",
    command: "npx skills add mystenlabs/skills --all",
    event: "skills",
  },
  {
    // The endpoint rather than a client command. There is no universal MCP CLI:
    // Claude Code has `claude mcp add`, Cursor and VS Code take JSON, and those
    // two do not even agree on the key (mcpServers vs servers). Every client
    // needs this URL, so this is the portable half. The per-client setup is one
    // link away in the secondary row.
    label: "Connect over MCP",
    detail: "Streamable HTTP endpoint. Works in any MCP client.",
    command: "https://sui.mcp.kapa.ai",
    event: "mcp",
  },
];

// Secondary: worth knowing about, but not a command.
const agentLinks = [
  { name: "llms-full.txt", url: "https://docs.sui.io/llms-full.txt" },
  { name: "Browse the skills", url: "/skills" },
  { name: "MCP setup guide", url: "/getting-started/sui-mcp-server" },
  { name: "Search across sites", url: "/search" },
];

/**
 * A command with a copy button. Deliberately not @theme/CodeBlock, matching
 * src/pages/skills.js, so the hub does not depend on the site's CodeBlock
 * swizzle. The Plausible class names follow the convention that page set.
 */
function CopyCommand({ command, event }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.command}>
      <code className={styles.commandText}>{command}</code>
      <button
        type="button"
        aria-label={`Copy command: ${command}`}
        className={`${styles.copyBtn} plausible-event-name=hub+copy+command plausible-event-command=${event}`}
        onClick={() => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(command);
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Explore() {
  // browsable:false means the site's own HTML redirects into the Sui docs, so
  // it is a section for a reader and belongs in the index, not in a card.
  // One grid. Whether something has its own domain or lives inside another
  // site is an implementation detail of how the docs are hosted, and not a
  // distinction a reader looking for Seal or DeepBook has any reason to care
  // about. browsable:false marks the ones whose own HTML redirects into the Sui
  // docs, so they appear once, as products, rather than twice.
  const destinations = [
    ...docsSites.sites.filter((s) => s.browsable !== false),
    ...hubProducts.products,
  ];

  // Derived from the rendered headings rather than written out separately, so
  // a new category cannot appear on the page and be missing from the contents.
  const headings = [
    "For agents and LLMs",
    "Products and solutions",
    ...hubIndex.categories.map((c) => c.name),
  ];
  const toc = headings.map((value) => ({ value, id: slug(value), level: 2 }));

  // The site title is "Sui Documentation" and Docusaurus appends it, so the
  // page title stays short to avoid "Documentation | Sui Documentation". The
  // description names real products rather than describing the page, because it
  // is what search results and AI answers quote back.
  return (
    <Layout
      title="Developer documentation"
      description="Guides, references and SDKs for Sui, Walrus, Seal, SuiNS, DeepBook, the Move language and the TypeScript SDKs, with llms.txt, MCP and installable skills for coding agents."
    >
      <Head>
        <meta property="og:title" content="Sui developer documentation" />
      </Head>

      <div className={styles.page}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <header className={styles.lede}>
              <h1>Developer documentation</h1>
              <p className={styles.ledeText}>
                Guides, references and SDKs for Sui, Walrus, Seal, the Move
                language, and the products built on them. Set up an agent, pick
                a product, or go straight to a section.
              </p>
            </header>

            <section className={styles.agentLane}>
              <SectionHead heading="For agents and LLMs" />

              <div className={styles.agentTop}>
                <p className={styles.agentIntro}>
                  Open these docs in an agent, primed with the index and the
                  markdown convention.
                </p>
                <AgentBar />
              </div>

              <p className={styles.agentDivider}>Or set it up yourself</p>

              <div className={styles.actions}>
                {agentActions.map((a) => (
                  <div key={a.event} className={styles.action}>
                    <div className={styles.actionText}>
                      <p className={styles.actionLabel}>{a.label}</p>
                      <p className={styles.actionDetail}>{a.detail}</p>
                    </div>
                    <CopyCommand command={a.command} event={a.event} />
                  </div>
                ))}
              </div>
              <p className={styles.agentLinks}>
                {agentLinks.map((l) => (
                  <Anchor key={l.url} to={l.url} className={styles.agentLink}>
                    {l.name}
                  </Anchor>
                ))}
              </p>
            </section>

            <section className={styles.section}>
              <SectionHead heading="Products and solutions" />
              <ul className={styles.cards}>
                {destinations.map((d) => (
                  <Card key={d.url} name={d.name} description={d.description} url={d.url} />
                ))}
              </ul>
            </section>

            {hubIndex.categories.map((category) => (
              <section key={category.name} className={styles.section}>
                <SectionHead heading={category.name} />
                <ul className={styles.items}>
                  {category.items.map((item) => (
                    <li key={item.url} className={styles.item}>
                      <Anchor to={item.url} className={styles.itemLink}>
                        {item.name}
                      </Anchor>
                      {item.descriptor ? (
                        <span className={styles.itemDesc}>{item.descriptor}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside className={styles.rail}>
            <TOC toc={toc} minHeadingLevel={2} maxHeadingLevel={2} />
          </aside>
        </div>
      </div>
    </Layout>
  );
}
