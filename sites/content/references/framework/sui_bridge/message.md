---
title: Module bridge::message
sidebar_label: message
---

<pre><code><b>use</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids">bridge::chain_ids</a>;
<b>use</b> <a href="../sui_bridge/message_types#bridge_message_types">bridge::message_types</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
</code></pre>

<h2 id="bridge_message_BridgeMessage">Struct <span class="code-inline">BridgeMessage</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_BridgeMessage">BridgeMessage</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_message_type">message_type</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_message_version">message_version</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_payload">payload</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_BridgeMessageKey">Struct <span class="code-inline">BridgeMessageKey</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">BridgeMessageKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_message_type">message_type</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">bridge_seq_num: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_TokenTransferPayload">Struct <span class="code-inline">TokenTransferPayload</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_TokenTransferPayload">TokenTransferPayload</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">sender_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_token_type">token_type</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">amount: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_TokenTransferPayloadV2">Struct <span class="code-inline">TokenTransferPayloadV2</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_TokenTransferPayloadV2">TokenTransferPayloadV2</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">sender_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_token_type">token_type</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">amount: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_timestamp_ms">timestamp_ms</a>: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_EmergencyOp">Struct <span class="code-inline">EmergencyOp</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_EmergencyOp">EmergencyOp</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">op_type: u8</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_Blocklist">Struct <span class="code-inline">Blocklist</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_Blocklist">Blocklist</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_blocklist_type">blocklist_type</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_eth_addresses: vector&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_UpdateBridgeLimit">Struct <span class="code-inline">UpdateBridgeLimit</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_UpdateBridgeLimit">UpdateBridgeLimit</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">receiving_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">sending_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">limit: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_UpdateAssetPrice">Struct <span class="code-inline">UpdateAssetPrice</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_UpdateAssetPrice">UpdateAssetPrice</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">token_id: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">new_price: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_AddTokenOnSui">Struct <span class="code-inline">AddTokenOnSui</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_AddTokenOnSui">AddTokenOnSui</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">native_token: bool</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_token_ids">token_ids</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_token_type_names">token_type_names</a>: vector&lt;<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_token_prices">token_prices</a>: vector&lt;u64&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_message_ParsedTokenTransferMessage">Struct <span class="code-inline">ParsedTokenTransferMessage</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/message#bridge_message_ParsedTokenTransferMessage">ParsedTokenTransferMessage</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_message_version">message_version</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message_payload">payload</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">parsed_payload: <a href="../sui_bridge/message#bridge_message_TokenTransferPayload">bridge::message::TokenTransferPayload</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_CURRENT_MESSAGE_VERSION">CURRENT_MESSAGE_VERSION</a>: u8 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_TOKEN_TRANSFER_MESSAGE_VERSION_V2">TOKEN_TRANSFER_MESSAGE_VERSION_V2</a>: u8 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_ECDSA_ADDRESS_LENGTH">ECDSA_ADDRESS_LENGTH</a>: u64 = 20;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_ETrailingBytes">ETrailingBytes</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_EInvalidAddressLength">EInvalidAddressLength</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_EEmptyList">EEmptyList</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_EInvalidMessageType">EInvalidMessageType</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_EInvalidEmergencyOpType">EInvalidEmergencyOpType</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_EInvalidPayloadLength">EInvalidPayloadLength</a>: u64 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_EMustBeTokenMessage">EMustBeTokenMessage</a>: u64 = 6;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_EInvalidMessageVersion">EInvalidMessageVersion</a>: u64 = 7;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_PAUSE">PAUSE</a>: u8 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message#bridge_message_UNPAUSE">UNPAUSE</a>: u8 = 1;
</code></pre>


<h2 id="bridge_message_extract_token_bridge_payload">Function <span class="code-inline">extract_token_bridge_payload</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_extract_token_bridge_payload">extract_token_bridge_payload</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_TokenTransferPayload">bridge::message::TokenTransferPayload</a>
</code></pre>




<h2 id="bridge_message_extract_token_bridge_payload_v2">Function <span class="code-inline">extract_token_bridge_payload_v2</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_extract_token_bridge_payload_v2">extract_token_bridge_payload_v2</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_TokenTransferPayloadV2">bridge::message::TokenTransferPayloadV2</a>
</code></pre>




<h2 id="bridge_message_to_token_payload_v1">Function <span class="code-inline">to_token_payload_v1</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/message#bridge_message_to_token_payload_v1">to_token_payload_v1</a>(self: &<a href="../sui_bridge/message#bridge_message_TokenTransferPayloadV2">bridge::message::TokenTransferPayloadV2</a>): <a href="../sui_bridge/message#bridge_message_TokenTransferPayload">bridge::message::TokenTransferPayload</a>
</code></pre>




<h2 id="bridge_message_extract_emergency_op_payload">Function <span class="code-inline">extract_emergency_op_payload</span></h2>

Emergency op payload is just a single byte


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_extract_emergency_op_payload">extract_emergency_op_payload</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_EmergencyOp">bridge::message::EmergencyOp</a>
</code></pre>




<h2 id="bridge_message_extract_blocklist_payload">Function <span class="code-inline">extract_blocklist_payload</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_extract_blocklist_payload">extract_blocklist_payload</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_Blocklist">bridge::message::Blocklist</a>
</code></pre>




<h2 id="bridge_message_extract_update_bridge_limit">Function <span class="code-inline">extract_update_bridge_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_extract_update_bridge_limit">extract_update_bridge_limit</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_UpdateBridgeLimit">bridge::message::UpdateBridgeLimit</a>
</code></pre>




<h2 id="bridge_message_extract_update_asset_price">Function <span class="code-inline">extract_update_asset_price</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_extract_update_asset_price">extract_update_asset_price</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_UpdateAssetPrice">bridge::message::UpdateAssetPrice</a>
</code></pre>




<h2 id="bridge_message_extract_add_tokens_on_sui">Function <span class="code-inline">extract_add_tokens_on_sui</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_extract_add_tokens_on_sui">extract_add_tokens_on_sui</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_AddTokenOnSui">bridge::message::AddTokenOnSui</a>
</code></pre>




<h2 id="bridge_message_serialize_message">Function <span class="code-inline">serialize_message</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_serialize_message">serialize_message</a>(<a href="../sui_bridge/message#bridge_message">message</a>: <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="bridge_message_create_token_bridge_message">Function <span class="code-inline">create_token_bridge_message</span></h2>

Token Transfer Message Format:
[message_type: u8]
[version:u8]
[nonce:u64]
[source_chain: u8]
[sender_address_length:u8]
[sender_address: byte[]]
[target_chain:u8]
[target_address_length:u8]
[target_address: byte[]]
[token_type:u8]
[amount:u64]


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_token_bridge_message">create_token_bridge_message</a>(<a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8, <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64, sender_address: vector&lt;u8&gt;, target_chain: u8, target_address: vector&lt;u8&gt;, <a href="../sui_bridge/message#bridge_message_token_type">token_type</a>: u8, amount: u64): <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>
</code></pre>




<h2 id="bridge_message_create_token_bridge_message_v2">Function <span class="code-inline">create_token_bridge_message_v2</span></h2>

Token Transfer Message Format:
[message_type: u8]
[version:u8]
[nonce:u64]
[source_chain: u8]
[sender_address_length:u8]
[sender_address: byte[]]
[target_chain:u8]
[target_address_length:u8]
[target_address: byte[]]
[token_type:u8]
[amount:u64]
[timestamp:u64]


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_token_bridge_message_v2">create_token_bridge_message_v2</a>(<a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8, <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64, sender_address: vector&lt;u8&gt;, target_chain: u8, target_address: vector&lt;u8&gt;, <a href="../sui_bridge/message#bridge_message_token_type">token_type</a>: u8, amount: u64, timestamp: u64): <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>
</code></pre>




<h2 id="bridge_message_create_emergency_op_message">Function <span class="code-inline">create_emergency_op_message</span></h2>

Emergency Op Message Format:
[message_type: u8]
[version:u8]
[nonce:u64]
[chain_id: u8]
[op_type: u8]


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_emergency_op_message">create_emergency_op_message</a>(<a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8, <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64, op_type: u8): <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>
</code></pre>




<h2 id="bridge_message_create_blocklist_message">Function <span class="code-inline">create_blocklist_message</span></h2>

Blocklist Message Format:
[message_type: u8]
[version:u8]
[nonce:u64]
[chain_id: u8]
[blocklist_type: u8]
[validator_length: u8]
[validator_ecdsa_addresses: byte[][]]


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_blocklist_message">create_blocklist_message</a>(<a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8, <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64, <a href="../sui_bridge/message#bridge_message_blocklist_type">blocklist_type</a>: u8, validator_ecdsa_addresses: vector&lt;vector&lt;u8&gt;&gt;): <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>
</code></pre>




<h2 id="bridge_message_create_update_bridge_limit_message">Function <span class="code-inline">create_update_bridge_limit_message</span></h2>

Update bridge limit Message Format:
[message_type: u8]
[version:u8]
[nonce:u64]
[receiving_chain_id: u8]
[sending_chain_id: u8]
[new_limit: u64]


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_update_bridge_limit_message">create_update_bridge_limit_message</a>(receiving_chain: u8, <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64, sending_chain: u8, new_limit: u64): <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>
</code></pre>




<h2 id="bridge_message_create_update_asset_price_message">Function <span class="code-inline">create_update_asset_price_message</span></h2>

Update asset price message
[message_type: u8]
[version:u8]
[nonce:u64]
[chain_id: u8]
[token_id: u8]
[new_price:u64]


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_update_asset_price_message">create_update_asset_price_message</a>(token_id: u8, <a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8, <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64, new_price: u64): <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>
</code></pre>




<h2 id="bridge_message_create_add_tokens_on_sui_message">Function <span class="code-inline">create_add_tokens_on_sui_message</span></h2>

Update Sui token message
[message_type:u8]
[version:u8]
[nonce:u64]
[chain_id: u8]
[native_token:bool]
[token_ids:vector<u8>]
[token_type_name:vector<String>]
[token_prices:vector<u64>]


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_add_tokens_on_sui_message">create_add_tokens_on_sui_message</a>(<a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8, <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>: u64, native_token: bool, <a href="../sui_bridge/message#bridge_message_token_ids">token_ids</a>: vector&lt;u8&gt;, type_names: vector&lt;<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>&gt;, <a href="../sui_bridge/message#bridge_message_token_prices">token_prices</a>: vector&lt;u64&gt;): <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>
</code></pre>




<h2 id="bridge_message_create_key">Function <span class="code-inline">create_key</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_create_key">create_key</a>(<a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>: u8, <a href="../sui_bridge/message#bridge_message_message_type">message_type</a>: u8, bridge_seq_num: u64): <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a>
</code></pre>




<h2 id="bridge_message_key">Function <span class="code-inline">key</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_key">key</a>(self: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a>
</code></pre>




<h2 id="bridge_message_message_version">Function <span class="code-inline">message_version</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_message_version">message_version</a>(self: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): u8
</code></pre>




<h2 id="bridge_message_message_type">Function <span class="code-inline">message_type</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_message_type">message_type</a>(self: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): u8
</code></pre>




<h2 id="bridge_message_seq_num">Function <span class="code-inline">seq_num</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_seq_num">seq_num</a>(self: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): u64
</code></pre>




<h2 id="bridge_message_source_chain">Function <span class="code-inline">source_chain</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_source_chain">source_chain</a>(self: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): u8
</code></pre>




<h2 id="bridge_message_payload">Function <span class="code-inline">payload</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_payload">payload</a>(self: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="bridge_message_token_target_chain">Function <span class="code-inline">token_target_chain</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_target_chain">token_target_chain</a>(self: &<a href="../sui_bridge/message#bridge_message_TokenTransferPayload">bridge::message::TokenTransferPayload</a>): u8
</code></pre>




<h2 id="bridge_message_token_target_address">Function <span class="code-inline">token_target_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_target_address">token_target_address</a>(self: &<a href="../sui_bridge/message#bridge_message_TokenTransferPayload">bridge::message::TokenTransferPayload</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="bridge_message_token_type">Function <span class="code-inline">token_type</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_type">token_type</a>(self: &<a href="../sui_bridge/message#bridge_message_TokenTransferPayload">bridge::message::TokenTransferPayload</a>): u8
</code></pre>




<h2 id="bridge_message_token_amount">Function <span class="code-inline">token_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_amount">token_amount</a>(self: &<a href="../sui_bridge/message#bridge_message_TokenTransferPayload">bridge::message::TokenTransferPayload</a>): u64
</code></pre>




<h2 id="bridge_message_timestamp_ms">Function <span class="code-inline">timestamp_ms</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_timestamp_ms">timestamp_ms</a>(self: &<a href="../sui_bridge/message#bridge_message_TokenTransferPayloadV2">bridge::message::TokenTransferPayloadV2</a>): u64
</code></pre>




<h2 id="bridge_message_emergency_op_type">Function <span class="code-inline">emergency_op_type</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_emergency_op_type">emergency_op_type</a>(self: &<a href="../sui_bridge/message#bridge_message_EmergencyOp">bridge::message::EmergencyOp</a>): u8
</code></pre>




<h2 id="bridge_message_blocklist_type">Function <span class="code-inline">blocklist_type</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_blocklist_type">blocklist_type</a>(self: &<a href="../sui_bridge/message#bridge_message_Blocklist">bridge::message::Blocklist</a>): u8
</code></pre>




<h2 id="bridge_message_blocklist_validator_addresses">Function <span class="code-inline">blocklist_validator_addresses</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_blocklist_validator_addresses">blocklist_validator_addresses</a>(self: &<a href="../sui_bridge/message#bridge_message_Blocklist">bridge::message::Blocklist</a>): &vector&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="bridge_message_update_bridge_limit_payload_sending_chain">Function <span class="code-inline">update_bridge_limit_payload_sending_chain</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_update_bridge_limit_payload_sending_chain">update_bridge_limit_payload_sending_chain</a>(self: &<a href="../sui_bridge/message#bridge_message_UpdateBridgeLimit">bridge::message::UpdateBridgeLimit</a>): u8
</code></pre>




<h2 id="bridge_message_update_bridge_limit_payload_receiving_chain">Function <span class="code-inline">update_bridge_limit_payload_receiving_chain</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_update_bridge_limit_payload_receiving_chain">update_bridge_limit_payload_receiving_chain</a>(self: &<a href="../sui_bridge/message#bridge_message_UpdateBridgeLimit">bridge::message::UpdateBridgeLimit</a>): u8
</code></pre>




<h2 id="bridge_message_update_bridge_limit_payload_limit">Function <span class="code-inline">update_bridge_limit_payload_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_update_bridge_limit_payload_limit">update_bridge_limit_payload_limit</a>(self: &<a href="../sui_bridge/message#bridge_message_UpdateBridgeLimit">bridge::message::UpdateBridgeLimit</a>): u64
</code></pre>




<h2 id="bridge_message_update_asset_price_payload_token_id">Function <span class="code-inline">update_asset_price_payload_token_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_update_asset_price_payload_token_id">update_asset_price_payload_token_id</a>(self: &<a href="../sui_bridge/message#bridge_message_UpdateAssetPrice">bridge::message::UpdateAssetPrice</a>): u8
</code></pre>




<h2 id="bridge_message_update_asset_price_payload_new_price">Function <span class="code-inline">update_asset_price_payload_new_price</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_update_asset_price_payload_new_price">update_asset_price_payload_new_price</a>(self: &<a href="../sui_bridge/message#bridge_message_UpdateAssetPrice">bridge::message::UpdateAssetPrice</a>): u64
</code></pre>




<h2 id="bridge_message_is_native">Function <span class="code-inline">is_native</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_is_native">is_native</a>(self: &<a href="../sui_bridge/message#bridge_message_AddTokenOnSui">bridge::message::AddTokenOnSui</a>): bool
</code></pre>




<h2 id="bridge_message_token_ids">Function <span class="code-inline">token_ids</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_ids">token_ids</a>(self: &<a href="../sui_bridge/message#bridge_message_AddTokenOnSui">bridge::message::AddTokenOnSui</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="bridge_message_token_type_names">Function <span class="code-inline">token_type_names</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_type_names">token_type_names</a>(self: &<a href="../sui_bridge/message#bridge_message_AddTokenOnSui">bridge::message::AddTokenOnSui</a>): vector&lt;<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>&gt;
</code></pre>




<h2 id="bridge_message_token_prices">Function <span class="code-inline">token_prices</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_prices">token_prices</a>(self: &<a href="../sui_bridge/message#bridge_message_AddTokenOnSui">bridge::message::AddTokenOnSui</a>): vector&lt;u64&gt;
</code></pre>




<h2 id="bridge_message_emergency_op_pause">Function <span class="code-inline">emergency_op_pause</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_emergency_op_pause">emergency_op_pause</a>(): u8
</code></pre>




<h2 id="bridge_message_emergency_op_unpause">Function <span class="code-inline">emergency_op_unpause</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_emergency_op_unpause">emergency_op_unpause</a>(): u8
</code></pre>




<h2 id="bridge_message_required_voting_power">Function <span class="code-inline">required_voting_power</span></h2>

Return the required signature threshold for the message, values are voting power in the scale of 10000


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_required_voting_power">required_voting_power</a>(self: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): u64
</code></pre>




<h2 id="bridge_message_to_parsed_token_transfer_message">Function <span class="code-inline">to_parsed_token_transfer_message</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_to_parsed_token_transfer_message">to_parsed_token_transfer_message</a>(<a href="../sui_bridge/message#bridge_message">message</a>: &<a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>): <a href="../sui_bridge/message#bridge_message_ParsedTokenTransferMessage">bridge::message::ParsedTokenTransferMessage</a>
</code></pre>




<h2 id="bridge_message_token_transfer_message_version">Function <span class="code-inline">token_transfer_message_version</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message#bridge_message_token_transfer_message_version">token_transfer_message_version</a>(): u8
</code></pre>




<h2 id="bridge_message_reverse_bytes">Function <span class="code-inline">reverse_bytes</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/message#bridge_message_reverse_bytes">reverse_bytes</a>(bytes: vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="bridge_message_peel_u64_be">Function <span class="code-inline">peel_u64_be</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/message#bridge_message_peel_u64_be">peel_u64_be</a>(bcs: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u64
</code></pre>



