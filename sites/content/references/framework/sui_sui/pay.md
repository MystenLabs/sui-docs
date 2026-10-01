---
title: Module sui::pay
sidebar_label: pay
---

This module provides handy functionality for wallets and <span class="code-inline">sui::Coin</span> management.

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
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>

<h2 id="@Constants_0">Constants</h2>

For when empty vector is supplied into join function.


<pre><code><b>const</b> <a href="../sui_sui/pay#sui_pay_ENoCoins">ENoCoins</a>: u64 = 0;
</code></pre>


<h2 id="sui_pay_keep">Function <span class="code-inline">keep</span></h2>

Transfer <span class="code-inline">c</span> to the sender of the current transaction


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_keep">keep</a>&lt;T&gt;(c: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_pay_split">Function <span class="code-inline">split</span></h2>

Split <span class="code-inline"><a href="../sui_sui/coin#sui_coin">coin</a></span> to two coins, one with balance <span class="code-inline">split_amount</span>,
and the remaining balance is left in <span class="code-inline"><a href="../sui_sui/coin#sui_coin">coin</a></span>.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_split">split</a>&lt;T&gt;(<a href="../sui_sui/coin#sui_coin">coin</a>: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, split_amount: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_pay_split_vec">Function <span class="code-inline">split_vec</span></h2>

Split coin <span class="code-inline">self</span> into multiple coins, each with balance specified
in <span class="code-inline">split_amounts</span>. Remaining balance is left in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_split_vec">split_vec</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, split_amounts: vector&lt;u64&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_pay_split_and_transfer">Function <span class="code-inline">split_and_transfer</span></h2>

Send <span class="code-inline">amount</span> units of <span class="code-inline">c</span> to <span class="code-inline">recipient</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/balance#sui_balance_ENotEnough">sui::balance::ENotEnough</a></span> if <span class="code-inline">amount</span> is greater than the balance in <span class="code-inline">c</span>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_split_and_transfer">split_and_transfer</a>&lt;T&gt;(c: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, amount: u64, recipient: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_pay_divide_and_keep">Function <span class="code-inline">divide_and_keep</span></h2>

Divide coin <span class="code-inline">self</span> into <span class="code-inline">n - 1</span> coins with equal balances. If the balance is
not evenly divisible by <span class="code-inline">n</span>, the remainder is left in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_divide_and_keep">divide_and_keep</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, n: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_pay_join">Function <span class="code-inline">join</span></h2>

Join <span class="code-inline"><a href="../sui_sui/coin#sui_coin">coin</a></span> into <span class="code-inline">self</span>. Re-exports <span class="code-inline"><a href="../sui_sui/coin#sui_coin_join">coin::join</a></span> function.<br/>
Deprecated: you should call <span class="code-inline"><a href="../sui_sui/coin#sui_coin">coin</a>.<a href="../sui_sui/pay#sui_pay_join">join</a>(other)</span> directly.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_join">join</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin">coin</a>: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_pay_join_vec">Function <span class="code-inline">join_vec</span></h2>

Join everything in <span class="code-inline">coins</span> with <span class="code-inline">self</span>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_join_vec">join_vec</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, coins: vector&lt;<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;&gt;)
</code></pre>




<h2 id="sui_pay_join_vec_and_transfer">Function <span class="code-inline">join_vec_and_transfer</span></h2>

Join a vector of <span class="code-inline">Coin</span> into a single object and transfer it to <span class="code-inline">receiver</span>.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/pay#sui_pay_join_vec_and_transfer">join_vec_and_transfer</a>&lt;T&gt;(coins: vector&lt;<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;&gt;, receiver: <b>address</b>)
</code></pre>



