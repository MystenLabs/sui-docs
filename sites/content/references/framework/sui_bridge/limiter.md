---
title: Module bridge::limiter
sidebar_label: limiter
---

<pre><code><b>use</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids">bridge::chain_ids</a>;
<b>use</b> <a href="../sui_bridge/treasury#bridge_treasury">bridge::treasury</a>;
<b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
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
<b>use</b> <a href="../sui_sui/clock#sui_clock">sui::clock</a>;
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

<h2 id="bridge_limiter_TransferLimiter">Struct <span class="code-inline">TransferLimiter</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/limiter#bridge_limiter_TransferLimiter">TransferLimiter</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">transfer_limits: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>, u64&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">transfer_records: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>, <a href="../sui_bridge/limiter#bridge_limiter_TransferRecord">bridge::limiter::TransferRecord</a>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_limiter_TransferRecord">Struct <span class="code-inline">TransferRecord</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/limiter#bridge_limiter_TransferRecord">TransferRecord</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">hour_head: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">hour_tail: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">per_hour_amounts: vector&lt;u64&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">total_amount: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_limiter_UpdateRouteLimitEvent">Struct <span class="code-inline">UpdateRouteLimitEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/limiter#bridge_limiter_UpdateRouteLimitEvent">UpdateRouteLimitEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">sending_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">receiving_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">new_limit: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_bridge/limiter#bridge_limiter_ELimitNotFoundForRoute">ELimitNotFoundForRoute</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/limiter#bridge_limiter_MAX_TRANSFER_LIMIT">MAX_TRANSFER_LIMIT</a>: u64 = 18446744073709551615;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/limiter#bridge_limiter_USD_VALUE_MULTIPLIER">USD_VALUE_MULTIPLIER</a>: u64 = 100000000;
</code></pre>


<h2 id="bridge_limiter_get_route_limit">Function <span class="code-inline">get_route_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/limiter#bridge_limiter_get_route_limit">get_route_limit</a>(self: &<a href="../sui_bridge/limiter#bridge_limiter_TransferLimiter">bridge::limiter::TransferLimiter</a>, route: &<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>): u64
</code></pre>




<h2 id="bridge_limiter_new">Function <span class="code-inline">new</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/limiter#bridge_limiter_new">new</a>(): <a href="../sui_bridge/limiter#bridge_limiter_TransferLimiter">bridge::limiter::TransferLimiter</a>
</code></pre>




<h2 id="bridge_limiter_check_and_record_sending_transfer">Function <span class="code-inline">check_and_record_sending_transfer</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/limiter#bridge_limiter_check_and_record_sending_transfer">check_and_record_sending_transfer</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_bridge/limiter#bridge_limiter_TransferLimiter">bridge::limiter::TransferLimiter</a>, <a href="../sui_bridge/treasury#bridge_treasury">treasury</a>: &<a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a>, clock: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, route: <a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>, amount: u64): bool
</code></pre>




<h2 id="bridge_limiter_update_route_limit">Function <span class="code-inline">update_route_limit</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/limiter#bridge_limiter_update_route_limit">update_route_limit</a>(self: &<b>mut</b> <a href="../sui_bridge/limiter#bridge_limiter_TransferLimiter">bridge::limiter::TransferLimiter</a>, route: &<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>, new_usd_limit: u64)
</code></pre>




<h2 id="bridge_limiter_current_hour_since_epoch">Function <span class="code-inline">current_hour_since_epoch</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/limiter#bridge_limiter_current_hour_since_epoch">current_hour_since_epoch</a>(clock: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>): u64
</code></pre>




<h2 id="bridge_limiter_adjust_transfer_records">Function <span class="code-inline">adjust_transfer_records</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/limiter#bridge_limiter_adjust_transfer_records">adjust_transfer_records</a>(self: &<b>mut</b> <a href="../sui_bridge/limiter#bridge_limiter_TransferRecord">bridge::limiter::TransferRecord</a>, <a href="../sui_bridge/limiter#bridge_limiter_current_hour_since_epoch">current_hour_since_epoch</a>: u64)
</code></pre>




<h2 id="bridge_limiter_initial_transfer_limits">Function <span class="code-inline">initial_transfer_limits</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/limiter#bridge_limiter_initial_transfer_limits">initial_transfer_limits</a>(): <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>, u64&gt;
</code></pre>



