// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Vercel Edge Middleware: content negotiation for Markdown for Agents.
// When a request includes Accept: text/markdown, rewrite to the pre-built
// markdown version of the page. Browsers get HTML as usual.
// See:
// https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/

export const config = {
  // Doc pages, plus the markdown, llms.txt, robots.txt and sitemap files that
  // agents fetch, so those requests are counted. Not static assets or API routes.
  matcher: [
    '/((?!_next|api|static|img|fonts|doc|paper|display-preview|favicon).*)',
  ],
};

// --- Agent traffic log -------------------------------------------------------
// Each request from an AI agent writes one `agent-hit {...}` line to the Vercel
// runtime log. The docs data dashboard collects those lines every few hours
// (Vercel keeps runtime logs for about a day) and charts them. This block is
// shared word for word by the Sui and Walrus docs middleware.

// First match wins, so the specific agents come before the catch-alls.
// purpose: "user" fetches a page because a person asked an assistant something;
// "coding" is a coding tool; "search" builds an AI search index; "training"
// collects training data.
export const AGENTS = [
  { name: 'Claude Code', purpose: 'coding', pattern: /claude[-_]?code/i },
  { name: 'Cursor', purpose: 'coding', pattern: /\bcursor\b/i },
  { name: 'GitHub Copilot', purpose: 'coding', pattern: /copilot/i },
  { name: 'Windsurf', purpose: 'coding', pattern: /windsurf|codeium/i },
  { name: 'Codex', purpose: 'coding', pattern: /\bcodex\b/i },
  { name: 'Cline', purpose: 'coding', pattern: /\bcline\b/i },
  { name: 'Tabnine', purpose: 'coding', pattern: /tabnine/i },
  { name: 'Sourcegraph Cody', purpose: 'coding', pattern: /sourcegraph|\bcody\b/i },
  { name: 'ChatGPT-User', purpose: 'user', pattern: /ChatGPT-User/i },
  { name: 'Claude-User', purpose: 'user', pattern: /Claude-User/i },
  { name: 'Perplexity-User', purpose: 'user', pattern: /Perplexity-User/i },
  { name: 'MistralAI-User', purpose: 'user', pattern: /MistralAI-User/i },
  { name: 'DuckAssistBot', purpose: 'user', pattern: /DuckAssistBot/i },
  { name: 'Meta-ExternalFetcher', purpose: 'user', pattern: /meta-externalfetcher/i },
  { name: 'Google-CloudVertexBot', purpose: 'user', pattern: /Google-CloudVertexBot/i },
  { name: 'OAI-SearchBot', purpose: 'search', pattern: /OAI-SearchBot/i },
  { name: 'Claude-SearchBot', purpose: 'search', pattern: /Claude-SearchBot/i },
  { name: 'PerplexityBot', purpose: 'search', pattern: /PerplexityBot/i },
  { name: 'GPTBot', purpose: 'training', pattern: /GPTBot/i },
  { name: 'ClaudeBot', purpose: 'training', pattern: /ClaudeBot|anthropic-ai/i },
  { name: 'Meta-ExternalAgent', purpose: 'training', pattern: /meta-externalagent/i },
  { name: 'CCBot', purpose: 'training', pattern: /CCBot/ },
  { name: 'Bytespider', purpose: 'training', pattern: /Bytespider/i },
  { name: 'Amazonbot', purpose: 'training', pattern: /Amazonbot/i },
  { name: 'Applebot', purpose: 'search', pattern: /Applebot/i },
  { name: 'cohere-ai', purpose: 'training', pattern: /cohere/i },
  { name: 'AI2Bot', purpose: 'training', pattern: /AI2Bot/i },
  { name: 'Other Anthropic', purpose: 'other', pattern: /anthropic/i },
  { name: 'Other OpenAI', purpose: 'other', pattern: /openai|chatgpt/i },
  { name: 'Other Perplexity', purpose: 'other', pattern: /perplexity/i },
];

/** The agent behind a request, or null for a browser or an unknown client. */
export function classifyAgent(userAgent, accept) {
  const ua = userAgent || '';
  for (const a of AGENTS) {
    if (a.pattern.test(ua)) return { agent: a.name, purpose: a.purpose };
  }
  // Clients that ask for markdown are agents even when their user agent is a
  // plain HTTP library.
  if ((accept || '').includes('text/markdown')) return { agent: 'Other markdown client', purpose: 'coding' };
  return null;
}

/** What kind of file a path is, or null for an asset that isn't worth counting. */
export function pathFormat(path) {
  if (/\/llms(-full)?\.txt$/.test(path)) return 'llms';
  if (/\/(robots\.txt|sitemap[^/]*\.xml)$/.test(path)) return 'meta';
  if (path.endsWith('.md') || path.startsWith('/markdown/')) return 'md';
  if (path.startsWith('/assets/') || /\.[a-z0-9]{1,5}$/i.test(path)) return null;
  return 'html';
}

// The markdown rewrite fetches its file through the middleware again; this
// header marks that request so it isn't counted twice.
export const SUBREQUEST_HEADER = 'x-agent-subrequest';

export function logAgentHit(request, hit, format) {
  if (!hit || !format || request.headers.get(SUBREQUEST_HEADER)) return;
  const path = new URL(request.url).pathname;
  console.log(`agent-hit ${JSON.stringify({ agent: hit.agent, purpose: hit.purpose, format, path: path.slice(0, 300) })}`);
}
// -----------------------------------------------------------------------------

const AI_AGENT_PATTERN =
  /claude[-_]?code|anthropic|cursor|copilot|chatgpt|openai|gptbot|perplexity|cohere|codeium|windsurf|tabnine|sourcegraph|cody/i;

function detectServerVisitorType(request) {
  const ua = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  if (AI_AGENT_PATTERN.test(ua)) return 'agent';
  if (accept.includes('text/markdown')) return 'agent';
  return null;
}

function trackPlausibleEvent(request, visitorType) {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';

  fetch('https://plausible.io/api/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': ua,
      'X-Forwarded-For': ip,
    },
    body: JSON.stringify({
      name: 'pageview',
      domain: 'docs.sui.io',
      url: url.toString(),
      referrer: request.headers.get('referer') || '',
      props: { visitor_type: visitorType },
    }),
  }).catch(() => {});
}

export default async function middleware(request) {
  const accept = request.headers.get('accept') || '';
  const url = new URL(request.url);
  let path = url.pathname;
  const hit = classifyAgent(request.headers.get('user-agent'), accept);
  const format = pathFormat(path);

  // The matcher used to skip these paths. Leave them out of the Plausible event
  // so the weekly report's agent numbers mean what they meant before.
  const newlyMatched = /^\/(markdown|llms\.txt|robots\.txt|sitemap\.xml)/.test(path);
  const visitorType = detectServerVisitorType(request);
  if (visitorType === 'agent' && !newlyMatched) {
    trackPlausibleEvent(request, visitorType);
  }

  // Check if the client prefers markdown over HTML
  if (!accept.includes('text/markdown')) {
    logAgentHit(request, hit, format);
    return; // Let the default HTML response through
  }

  // Skip paths that are already markdown, static files, or non-page routes
  if (
    path.endsWith('.md') ||
    path.endsWith('.json') ||
    path.endsWith('.xml') ||
    path.endsWith('.txt') ||
    path.endsWith('.js') ||
    path.endsWith('.css') ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.svg') ||
    path.endsWith('.ico') ||
    path.endsWith('.woff2') ||
    path.endsWith('.pdf')
  ) {
    logAgentHit(request, hit, format);
    return;
  }

  // Strip trailing slash for consistency
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Root path maps to the index
  if (path === '' || path === '/') {
    path = '/index';
  }

  // Try the markdown version — first as a direct file, then as an index.
  const candidates = [
    new URL(`/markdown${path}.md`, request.url),
    new URL(`/markdown${path}/index.md`, request.url),
  ];

  const fetchOpts = {
    headers: {
      ...Object.fromEntries(request.headers),
      // Override accept so the downstream doesn't loop
      accept: '*/*',
      [SUBREQUEST_HEADER]: '1',
    },
  };

  for (const markdownUrl of candidates) {
    const response = await fetch(markdownUrl, fetchOpts);
    if (response.ok) {
      const headers = new Headers(response.headers);
      headers.set('content-type', 'text/markdown; charset=utf-8');
      headers.set('vary', 'Accept');

      const contentLength = headers.get('content-length');
      if (contentLength) {
        const tokens = Math.ceil(parseInt(contentLength) / 4);
        headers.set('x-markdown-tokens', String(tokens));
      }

      logAgentHit(request, hit, 'md');
      return new Response(response.body, {
        status: 200,
        headers,
      });
    }
  }

  // Markdown version doesn't exist for this path, fall through to HTML
  logAgentHit(request, hit, format);
  return;
}
