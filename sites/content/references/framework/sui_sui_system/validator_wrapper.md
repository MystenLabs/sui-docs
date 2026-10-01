---
title: Module sui_system::validator_wrapper
sidebar_label: validator_wrapper
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
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/sui#sui_sui">sui::sui</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
<b>use</b> <a href="../sui_sui/versioned#sui_versioned">sui::versioned</a>;
<b>use</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool">sui_system::staking_pool</a>;
<b>use</b> <a href="../sui_sui_system/validator#sui_system_validator">sui_system::validator</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
</code></pre>

<h2 id="sui_system_validator_wrapper_ValidatorWrapper">Struct <span class="code-inline">ValidatorWrapper</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">inner: <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_EInvalidVersion">EInvalidVersion</a>: u64 = 0;
</code></pre>


<h2 id="sui_system_validator_wrapper_create_v1">Function <span class="code-inline">create_v1</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_create_v1">create_v1</a>(<a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>
</code></pre>




<h2 id="sui_system_validator_wrapper_load_validator_maybe_upgrade">Function <span class="code-inline">load_validator_maybe_upgrade</span></h2>

This function should always return the latest supported version.<br/>
If the inner version is old, we upgrade it lazily in-place.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_load_validator_maybe_upgrade">load_validator_maybe_upgrade</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>): &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_wrapper_destroy">Function <span class="code-inline">destroy</span></h2>

Destroy the wrapper and retrieve the inner validator object.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_destroy">destroy</a>(self: <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>): <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_wrapper_upgrade_to_latest">Function <span class="code-inline">upgrade_to_latest</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_upgrade_to_latest">upgrade_to_latest</a>(self: &<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>)
</code></pre>




<h2 id="sui_system_validator_wrapper_version">Function <span class="code-inline">version</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version">version</a>(self: &<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>): u64
</code></pre>



