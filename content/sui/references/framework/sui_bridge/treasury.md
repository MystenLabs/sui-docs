---
title: Module bridge::treasury
sidebar_label: treasury
---

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/internal#std_internal">std::internal</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/u128#std_u128">std::u128</a>;
<b>use</b> <a href="../sui_std/u64#std_u64">std::u64</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement">sui::accumulator_settlement</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bag#sui_bag">sui::bag</a>;
<b>use</b> <a href="../sui_sui/balance#sui_balance">sui::balance</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/coin#sui_coin">sui::coin</a>;
<b>use</b> <a href="../sui_sui/config#sui_config">sui::config</a>;
<b>use</b> <a href="../sui_sui/deny_list#sui_deny_list">sui::deny_list</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field">sui::dynamic_object_field</a>;
<b>use</b> <a href="../sui_sui/event#sui_event">sui::event</a>;
<b>use</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator">sui::funds_accumulator</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/object_bag#sui_object_bag">sui::object_bag</a>;
<b>use</b> <a href="../sui_sui/package#sui_package">sui::package</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>

<h2 id="bridge_treasury_BridgeTreasury">Struct <span class="code-inline">BridgeTreasury</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">BridgeTreasury</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">treasuries: <a href="../sui_sui/object_bag#sui_object_bag_ObjectBag">sui::object_bag::ObjectBag</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">supported_tokens: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>, <a href="../sui_bridge/treasury#bridge_treasury_BridgeTokenMetadata">bridge::treasury::BridgeTokenMetadata</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">id_token_type_map: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;u8, <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">waiting_room: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_treasury_BridgeTokenMetadata">Struct <span class="code-inline">BridgeTokenMetadata</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/treasury#bridge_treasury_BridgeTokenMetadata">BridgeTokenMetadata</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/treasury#bridge_treasury_decimal_multiplier">decimal_multiplier</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/treasury#bridge_treasury_notional_value">notional_value</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">native_token: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_treasury_ForeignTokenRegistration">Struct <span class="code-inline">ForeignTokenRegistration</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/treasury#bridge_treasury_ForeignTokenRegistration">ForeignTokenRegistration</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">type_name: <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">uc: <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">decimal: u8</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_treasury_UpdateTokenPriceEvent">Struct <span class="code-inline">UpdateTokenPriceEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/treasury#bridge_treasury_UpdateTokenPriceEvent">UpdateTokenPriceEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_bridge/treasury#bridge_treasury_token_id">token_id</a>: u8</span>
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

<h2 id="bridge_treasury_NewTokenEvent">Struct <span class="code-inline">NewTokenEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/treasury#bridge_treasury_NewTokenEvent">NewTokenEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_bridge/treasury#bridge_treasury_token_id">token_id</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">type_name: <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">native_token: bool</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/treasury#bridge_treasury_decimal_multiplier">decimal_multiplier</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/treasury#bridge_treasury_notional_value">notional_value</a>: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_treasury_TokenRegistrationEvent">Struct <span class="code-inline">TokenRegistrationEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/treasury#bridge_treasury_TokenRegistrationEvent">TokenRegistrationEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">type_name: <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">decimal: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">native_token: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_bridge/treasury#bridge_treasury_EUnsupportedTokenType">EUnsupportedTokenType</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/treasury#bridge_treasury_EInvalidUpgradeCap">EInvalidUpgradeCap</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/treasury#bridge_treasury_ETokenSupplyNonZero">ETokenSupplyNonZero</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/treasury#bridge_treasury_EInvalidNotionalValue">EInvalidNotionalValue</a>: u64 = 4;
</code></pre>


<h2 id="bridge_treasury_token_id">Function <span class="code-inline">token_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_token_id">token_id</a>&lt;T&gt;(self: &<a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>): u8
</code></pre>




<h2 id="bridge_treasury_decimal_multiplier">Function <span class="code-inline">decimal_multiplier</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_decimal_multiplier">decimal_multiplier</a>&lt;T&gt;(self: &<a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>): u64
</code></pre>




<h2 id="bridge_treasury_notional_value">Function <span class="code-inline">notional_value</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_notional_value">notional_value</a>&lt;T&gt;(self: &<a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>): u64
</code></pre>




<h2 id="bridge_treasury_register_foreign_token">Function <span class="code-inline">register_foreign_token</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_register_foreign_token">register_foreign_token</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>, tc: <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, uc: <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>, metadata: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="bridge_treasury_add_new_token">Function <span class="code-inline">add_new_token</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_add_new_token">add_new_token</a>(self: &<b>mut</b> <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>, token_name: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, <a href="../sui_bridge/treasury#bridge_treasury_token_id">token_id</a>: u8, native_token: bool, <a href="../sui_bridge/treasury#bridge_treasury_notional_value">notional_value</a>: u64)
</code></pre>




<h2 id="bridge_treasury_create">Function <span class="code-inline">create</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_create">create</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>
</code></pre>




<h2 id="bridge_treasury_burn">Function <span class="code-inline">burn</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_burn">burn</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>, token: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;)
</code></pre>




<h2 id="bridge_treasury_mint">Function <span class="code-inline">mint</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_mint">mint</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>, amount: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="bridge_treasury_update_asset_notional_price">Function <span class="code-inline">update_asset_notional_price</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_update_asset_notional_price">update_asset_notional_price</a>(self: &<b>mut</b> <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>, <a href="../sui_bridge/treasury#bridge_treasury_token_id">token_id</a>: u8, new_usd_price: u64)
</code></pre>




<h2 id="bridge_treasury_get_token_metadata">Function <span class="code-inline">get_token_metadata</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/treasury#bridge_treasury_get_token_metadata">get_token_metadata</a>&lt;T&gt;(self: &<a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>): <a href="../sui_bridge/treasury#bridge_treasury_BridgeTokenMetadata">bridge::treasury::BridgeTokenMetadata</a>
</code></pre>



