/*
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
*/

import React from "react";

/**
 * Glob-imports every MDX file under the consuming site's snippets directory at
 * build time via Webpack's require.context.
 *
 * Resolved through the @docs alias, not a relative path. This file is shared by
 * every Sui Stack docs site and they do not agree on where their pages live: the
 * relative form here pointed at <site>/docs/snippets, which exists in no
 * consumer, while the copy in ML-shared-docusaurus pointed at
 * <site>/content/snippets. Each site maps @docs to its own content root, so the
 * alias is the only form that can be shared. ImportContent already does this.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const req = (require as any).context("@docs/snippets", true, /\.mdx$/);

type SnippetModule = { default: React.ComponentType<any> };
const SNIPPETS: Record<string, React.ComponentType<any>> = {};
req.keys().forEach((k: string) => {
  const mod = req(k) as SnippetModule;
  const keyWithExt = k.replace(/^\.\//, "");
  const keyNoExt = keyWithExt.replace(/\.mdx$/, "");
  SNIPPETS[keyWithExt] = mod.default;
  SNIPPETS[keyNoExt] = mod.default;
});

type Props = {
  source: string;
} & Record<string, any>;

export default function Snippet({ source, ...rest }: Props) {
  const Comp =
    SNIPPETS[source] ||
    SNIPPETS[`${source}.mdx`] ||
    SNIPPETS[source.replace(/^\.\//, "")];

  if (!Comp) {
    return (
      <div className="alert alert--warning" role="alert">
        Missing snippet: <code>{source}</code>
      </div>
    );
  }
  return <Comp {...rest} />;
}
