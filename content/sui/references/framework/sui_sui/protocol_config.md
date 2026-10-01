---
title: Module sui::protocol_config
sidebar_label: protocol_config
---

This module provides access to protocol configuration feature flags.<br/>
Feature flags control the availability of various protocol features and
are enabled/disabled at specific protocol versions during epoch changes.

<h2 id="sui_protocol_config_is_feature_enabled">Function <span class="code-inline">is_feature_enabled</span></h2>

Checks if a specific protocol feature flag is enabled.

Restricted to internal use within the sui-framework package only.<br/>
If we need to use it in sui-system, we can add friend declarations.<br/>
We should never need to expose this to user packages.

### Arguments

* <span class="code-inline">feature_flag_name</span> - The name of the feature flag as bytes (e.g., b"enable_vdf")
  - It is expected to be a valid UTF-8 string
  - The flag should exist in the protocol config

### Returns

* <span class="code-inline"><b>true</b></span> if the feature is enabled in the current protocol version
* <span class="code-inline"><b>false</b></span> if the feature is disabled

### Example (for framework use only)

```move
use sui::protocol_config;

if (protocol_config::is_feature_enabled(b"enable_accumulators")) \{
    // Accumulators are available
\};
```


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/protocol_config#sui_protocol_config_is_feature_enabled">is_feature_enabled</a>(feature_flag_name: vector&lt;u8&gt;): bool
</code></pre>



