/*
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
*/

// Names the shared Docusaurus plugins register under, and that shared
// components look them up by.
//
// These were string literals repeated in two files, which is how the Cards
// component came to ask Docusaurus for "hashi-description-plugin" while the
// plugin registered itself as "sui-description-plugin". usePluginData returned
// undefined, every card description fell back to the empty string, and six
// self-closing <Card /> elements on the onboarding page rendered as a title with
// nothing under it -- live, for as long as the two copies disagreed.
//
// A component and the plugin it reads cannot disagree if they import the same
// constant, so the names live here and nowhere else. CommonJS, because the
// plugins are required by Docusaurus at build time while the components are
// bundled by webpack; this format is the one both understand.

const DESCRIPTION_PLUGIN = "mysten-description-plugin";
const INJECT_CODE_PLUGIN = "mysten-inject-code-plugin";

module.exports = { DESCRIPTION_PLUGIN, INJECT_CODE_PLUGIN };
