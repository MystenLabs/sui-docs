---
title: Module sui_system::storage_fund
sidebar_label: storage_fund
---

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/internal#std_internal">std::internal</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/u128#std_u128">std::u128</a>;
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

<h2 id="sui_system_storage_fund_StorageFund">Struct <span class="code-inline">StorageFund</span></h2>

Struct representing the storage fund, containing two <span class="code-inline">Balance</span>s:
- <span class="code-inline"><a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a></span> has the invariant that it's the sum of <span class="code-inline">storage_rebate</span> of
   all objects currently stored on-chain. To maintain this invariant, the only inflow of this
   balance is storage charges collected from transactions, and the only outflow is storage rebates
   of transactions, including both the portion refunded to the transaction senders as well as
   the non-refundable portion taken out and put into <span class="code-inline">non_refundable_balance</span>.
- <span class="code-inline">non_refundable_balance</span> contains any remaining inflow of the storage fund that should not
   be taken out of the fund.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">StorageFund</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">non_refundable_balance: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_storage_fund_new">Function <span class="code-inline">new</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span> at genesis time.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_new">new</a>(initial_fund: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;): <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>
</code></pre>




<h2 id="sui_system_storage_fund_advance_epoch">Function <span class="code-inline">advance_epoch</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span> at epoch change times to process the inflows and outflows of storage fund.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_advance_epoch">advance_epoch</a>(self: &<b>mut</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>, storage_charges: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, storage_fund_reinvestment: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, leftover_staking_rewards: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, storage_rebate_amount: u64, non_refundable_storage_fee_amount: u64): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_storage_fund_total_object_storage_rebates">Function <span class="code-inline">total_object_storage_rebates</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>(self: &<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>): u64
</code></pre>




<h2 id="sui_system_storage_fund_total_balance">Function <span class="code-inline">total_balance</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_balance">total_balance</a>(self: &<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>): u64
</code></pre>



