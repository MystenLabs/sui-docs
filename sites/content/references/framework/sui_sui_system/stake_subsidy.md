---
title: Module sui_system::stake_subsidy
sidebar_label: stake_subsidy
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
</code></pre>

<h2 id="sui_system_stake_subsidy_StakeSubsidy">Struct <span class="code-inline">StakeSubsidy</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">StakeSubsidy</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">balance: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
 Balance of SUI set aside for stake subsidies that will be drawn down over time.
</dd>
<dt>
<span class="code-inline">distribution_counter: u64</span>
</dt>
<dd>
 Count of the number of times stake subsidies have been distributed.
</dd>
<dt>
<span class="code-inline">current_distribution_amount: u64</span>
</dt>
<dd>
 The amount of stake subsidy to be drawn down per distribution.<br/>
 This amount decays and decreases over time.
</dd>
<dt>
<span class="code-inline">stake_subsidy_period_length: u64</span>
</dt>
<dd>
 Number of distributions to occur before the distribution amount decays.
</dd>
<dt>
<span class="code-inline">stake_subsidy_decrease_rate: u16</span>
</dt>
<dd>
 The rate at which the distribution amount decays at the end of each
 period. Expressed in basis points.
</dd>
<dt>
<span class="code-inline">extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_ESubsidyDecreaseRateTooLarge">ESubsidyDecreaseRateTooLarge</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_BASIS_POINT_DENOMINATOR">BASIS_POINT_DENOMINATOR</a>: u128 = 10000;
</code></pre>


<h2 id="sui_system_stake_subsidy_create">Function <span class="code-inline">create</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_create">create</a>(balance: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, initial_distribution_amount: u64, stake_subsidy_period_length: u64, stake_subsidy_decrease_rate: u16, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>
</code></pre>




<h2 id="sui_system_stake_subsidy_advance_epoch">Function <span class="code-inline">advance_epoch</span></h2>

Advance the epoch counter and draw down the subsidy for the epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_advance_epoch">advance_epoch</a>(self: &<b>mut</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_stake_subsidy_current_epoch_subsidy_amount">Function <span class="code-inline">current_epoch_subsidy_amount</span></h2>

Returns the amount of stake subsidy to be added at the end of the current epoch.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_current_epoch_subsidy_amount">current_epoch_subsidy_amount</a>(self: &<a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>): u64
</code></pre>




<h2 id="sui_system_stake_subsidy_get_distribution_counter">Function <span class="code-inline">get_distribution_counter</span></h2>

Returns the number of distributions that have occurred.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_get_distribution_counter">get_distribution_counter</a>(self: &<a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>): u64
</code></pre>



