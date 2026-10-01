---
title: Module sui::balance
sidebar_label: balance
---

A storable handler for Balances in general. Is used in the <span class="code-inline">Coin</span>
module to allow balance operations and can be used to implement
custom coins with <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Supply">Supply</a></span> and <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span>s.

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
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator">sui::funds_accumulator</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_balance_Supply">Struct <span class="code-inline">Supply</span></h2>

A Supply of T. Used for minting and burning.<br/>
Wrapped into a <span class="code-inline">TreasuryCap</span> in the <span class="code-inline">Coin</span> module.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/balance#sui_balance_Supply">Supply</a>&lt;<b>phantom</b> T&gt; <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/balance#sui_balance_value">value</a>: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_balance_Balance">Struct <span class="code-inline">Balance</span></h2>

Storable balance - an inner struct of a Coin type.<br/>
Can be used to store coins which don't need the key ability.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/balance#sui_balance_Balance">Balance</a>&lt;<b>phantom</b> T&gt; <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/balance#sui_balance_value">value</a>: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

For when trying to destroy a non-zero balance.


<pre><code><b>const</b> <a href="../sui_sui/balance#sui_balance_ENonZero">ENonZero</a>: u64 = 0;
</code></pre>

For when an overflow is happening on Supply operations.


<pre><code><b>const</b> <a href="../sui_sui/balance#sui_balance_EOverflow">EOverflow</a>: u64 = 1;
</code></pre>

For when trying to withdraw more than there is.


<pre><code><b>const</b> <a href="../sui_sui/balance#sui_balance_ENotEnough">ENotEnough</a>: u64 = 2;
</code></pre>

Sender is not @0x0 the system address.


<pre><code><b>const</b> <a href="../sui_sui/balance#sui_balance_ENotSystemAddress">ENotSystemAddress</a>: u64 = 3;
</code></pre>

System operation performed for a coin other than SUI


<pre><code><b>const</b> <a href="../sui_sui/balance#sui_balance_ENotSUI">ENotSUI</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/balance#sui_balance_SUI_TYPE_NAME">SUI_TYPE_NAME</a>: vector&lt;u8&gt; = vector[48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 50, 58, 58, 115, 117, 105, 58, 58, 83, 85, 73];
</code></pre>


<h2 id="sui_balance_value">Function <span class="code-inline">value</span></h2>

Get the amount stored in a <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_value">value</a>&lt;T&gt;(self: &<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_balance_supply_value">Function <span class="code-inline">supply_value</span></h2>

Get the <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Supply">Supply</a></span> value.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_supply_value">supply_value</a>&lt;T&gt;(supply: &<a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_balance_create_supply">Function <span class="code-inline">create_supply</span></h2>

Create a new supply for type T.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_create_supply">create_supply</a>&lt;T: drop&gt;(_: T): <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_increase_supply">Function <span class="code-inline">increase_supply</span></h2>

Increase supply by <span class="code-inline"><a href="../sui_sui/balance#sui_balance_value">value</a></span> and create a new <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a>&lt;T&gt;</span> with this value.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_increase_supply">increase_supply</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;, <a href="../sui_sui/balance#sui_balance_value">value</a>: u64): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_decrease_supply">Function <span class="code-inline">decrease_supply</span></h2>

Burn a Balance<T> and decrease Supply<T>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_decrease_supply">decrease_supply</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;, <a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_balance_zero">Function <span class="code-inline">zero</span></h2>

Create a zero <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span> for type <span class="code-inline">T</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_zero">zero</a>&lt;T&gt;(): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_join">Function <span class="code-inline">join</span></h2>

Join two balances together.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_join">join</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;, <a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_balance_split">Function <span class="code-inline">split</span></h2>

Split a <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span> and take a sub balance from it.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_split">split</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;, <a href="../sui_sui/balance#sui_balance_value">value</a>: u64): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_withdraw_all">Function <span class="code-inline">withdraw_all</span></h2>

Withdraw all balance. After this the remaining balance must be 0.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_withdraw_all">withdraw_all</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_destroy_zero">Function <span class="code-inline">destroy_zero</span></h2>

Destroy a zero <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_destroy_zero">destroy_zero</a>&lt;T&gt;(<a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_balance_send_funds">Function <span class="code-inline">send_funds</span></h2>

Send a <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span> to an address's funds accumulator.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_send_funds">send_funds</a>&lt;T&gt;(<a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;, recipient: <b>address</b>)
</code></pre>




<h2 id="sui_balance_redeem_funds">Function <span class="code-inline">redeem_funds</span></h2>

Redeem a <span class="code-inline">Withdrawal&lt;<a href="../sui_sui/balance#sui_balance_Balance">Balance</a>&lt;T&gt;&gt;</span> to get the underlying <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a>&lt;T&gt;</span> from an address's funds
accumulator.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_redeem_funds">redeem_funds</a>&lt;T&gt;(withdrawal: <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;&gt;): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_withdraw_funds_from_object">Function <span class="code-inline">withdraw_funds_from_object</span></h2>

Create a <span class="code-inline">Withdrawal&lt;<a href="../sui_sui/balance#sui_balance_Balance">Balance</a>&lt;T&gt;&gt;</span> from an object to withdraw funds from it.<br/>
Aborts if <span class="code-inline"><a href="../sui_sui/balance#sui_balance_value">value</a></span> exceeds the funds currently available to <span class="code-inline">obj</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_withdraw_funds_from_object">withdraw_funds_from_object</a>&lt;T&gt;(obj: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, <a href="../sui_sui/balance#sui_balance_value">value</a>: u64): <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;&gt;
</code></pre>




<h2 id="sui_balance_settled_funds_value">Function <span class="code-inline">settled_funds_value</span></h2>

Read the value of the funds of type T owned by <span class="code-inline"><b>address</b></span> as of the beginning of
the current consensus commit. Can read either address-owned or object-owned balances.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance_settled_funds_value">settled_funds_value</a>&lt;T&gt;(root: &<a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, <b>address</b>: <b>address</b>): u64
</code></pre>




<h2 id="sui_balance_create_supply_internal">Function <span class="code-inline">create_supply_internal</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/balance#sui_balance_create_supply_internal">create_supply_internal</a>&lt;T&gt;(): <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_create_staking_rewards">Function <span class="code-inline">create_staking_rewards</span></h2>

CAUTION: this function creates a <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span> without increasing the supply.<br/>
It should only be called by the epoch change system txn to create staking rewards,
and nowhere else.


<pre><code><b>fun</b> <a href="../sui_sui/balance#sui_balance_create_staking_rewards">create_staking_rewards</a>&lt;T&gt;(<a href="../sui_sui/balance#sui_balance_value">value</a>: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_balance_destroy_storage_rebates">Function <span class="code-inline">destroy_storage_rebates</span></h2>

CAUTION: this function destroys a <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Balance">Balance</a></span> without decreasing the supply.<br/>
It should only be called by the epoch change system txn to destroy storage rebates,
and nowhere else.


<pre><code><b>fun</b> <a href="../sui_sui/balance#sui_balance_destroy_storage_rebates">destroy_storage_rebates</a>&lt;T&gt;(self: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_balance_destroy_supply">Function <span class="code-inline">destroy_supply</span></h2>

Destroy a <span class="code-inline"><a href="../sui_sui/balance#sui_balance_Supply">Supply</a></span> preventing any further minting and burning.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/balance#sui_balance_destroy_supply">destroy_supply</a>&lt;T&gt;(self: <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;): u64
</code></pre>



