---
title: Module sui::funds_accumulator
sidebar_label: funds_accumulator
---

A module for accumulating funds, i.e. Balance-like types.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/internal#std_internal">std::internal</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_funds_accumulator_Withdrawal">Struct <span class="code-inline">Withdrawal</span></h2>

Allows for withdrawing funds from a given address. The <span class="code-inline"><a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">Withdrawal</a></span> can be created in PTBs for
the transaction sender, or dynamically from an object via <span class="code-inline"><a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_from_object">withdraw_from_object</a></span>.<br/>
The redemption of the funds must be initiated from the module that defines <span class="code-inline">T</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">Withdrawal</a>&lt;<b>phantom</b> T: store&gt; <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">owner: <b>address</b></span>
</dt>
<dd>
 The owner of the funds, either an object or a transaction sender
</dd>
<dt>
<span class="code-inline">limit: u256</span>
</dt>
<dd>
 At signing we check the limit <= balance when taking this as a call arg.<br/>
 If this was generated from an object, we cannot check this until redemption.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Attempted to withdraw more than the maximum value of the underlying integer type.


<pre><code><b>const</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EOverflow">EOverflow</a>: u64 = 0;
</code></pre>

Attempt to split more than the current limit of a <span class="code-inline"><a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">Withdrawal</a></span>.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EInvalidSubLimit">EInvalidSubLimit</a>: vector&lt;u8&gt; = b"Sub-limit exceeds current withdrawal limit";
</code></pre>

Attempted to join two withdrawals with different owners.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EOwnerMismatch">EOwnerMismatch</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">Withdrawal</a> owners do not match";
</code></pre>

Attempted to withdraw funds from an object when the feature flag is not enabled.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EObjectFundsWithdrawNotEnabled">EObjectFundsWithdrawNotEnabled</a>: vector&lt;u8&gt; = b"Object funds withdraw is not enabled";
</code></pre>

The accumulator type is too large to be used with the funds accumulator.


<pre><code><b>const</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EAccumulatorTypeTooLarge">EAccumulatorTypeTooLarge</a>: u64 = 4;
</code></pre>

Attempted to withdraw more funds than are currently available to an object.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EObjectFundsInsufficient">EObjectFundsInsufficient</a>: vector&lt;u8&gt; = b"Object <b>has</b> insufficient funds";
</code></pre>


<h2 id="sui_funds_accumulator_withdrawal_owner">Function <span class="code-inline">withdrawal_owner</span></h2>

Returns the owner, either a sender's address or an object, of the withdrawal.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_owner">withdrawal_owner</a>&lt;T: store&gt;(withdrawal: &<a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;): <b>address</b>
</code></pre>




<h2 id="sui_funds_accumulator_withdrawal_limit">Function <span class="code-inline">withdrawal_limit</span></h2>

Returns the remaining limit of the withdrawal.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_limit">withdrawal_limit</a>&lt;T: store&gt;(withdrawal: &<a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;): u256
</code></pre>




<h2 id="sui_funds_accumulator_withdrawal_split">Function <span class="code-inline">withdrawal_split</span></h2>

Split a <span class="code-inline"><a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">Withdrawal</a></span> and take a sub-withdrawal from it with the specified sub-limit.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_split">withdrawal_split</a>&lt;T: store&gt;(withdrawal: &<b>mut</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;, sub_limit: u256): <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;
</code></pre>




<h2 id="sui_funds_accumulator_withdrawal_join">Function <span class="code-inline">withdrawal_join</span></h2>

Join two withdrawals together, increasing the limit of <span class="code-inline">self</span> by the limit of <span class="code-inline">other</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EOwnerMismatch">EOwnerMismatch</a></span> if the owners are not equal.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/funds_accumulator#sui_funds_accumulator_EOverflow">EOverflow</a></span> if the resulting limit would overflow <span class="code-inline">u256</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_join">withdrawal_join</a>&lt;T: store&gt;(withdrawal: &<b>mut</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;, other: <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_funds_accumulator_redeem">Function <span class="code-inline">redeem</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_redeem">redeem</a>&lt;T: store&gt;(withdrawal: <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;, _: <a href="../sui_std/internal#std_internal_Permit">std::internal::Permit</a>&lt;T&gt;): T
</code></pre>




<h2 id="sui_funds_accumulator_withdraw_from_object">Function <span class="code-inline">withdraw_from_object</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_from_object">withdraw_from_object</a>&lt;T: store&gt;(obj: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, limit: u256): <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;
</code></pre>




<h2 id="sui_funds_accumulator_add_impl">Function <span class="code-inline">add_impl</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_add_impl">add_impl</a>&lt;T: store&gt;(value: T, recipient: <b>address</b>)
</code></pre>




<h2 id="sui_funds_accumulator_withdraw_impl">Function <span class="code-inline">withdraw_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_impl">withdraw_impl</a>&lt;T: store&gt;(owner: <b>address</b>, value: u256): T
</code></pre>




<h2 id="sui_funds_accumulator_add_to_accumulator_address">Function <span class="code-inline">add_to_accumulator_address</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_add_to_accumulator_address">add_to_accumulator_address</a>&lt;T: store&gt;(<a href="../sui_sui/accumulator#sui_accumulator">accumulator</a>: <b>address</b>, recipient: <b>address</b>, value: T)
</code></pre>




<h2 id="sui_funds_accumulator_withdraw_from_accumulator_address">Function <span class="code-inline">withdraw_from_accumulator_address</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_from_accumulator_address">withdraw_from_accumulator_address</a>&lt;T: store&gt;(<a href="../sui_sui/accumulator#sui_accumulator">accumulator</a>: <b>address</b>, owner: <b>address</b>, value: u256): T
</code></pre>




<h2 id="sui_funds_accumulator_reserve_object_funds_for_withdrawal">Function <span class="code-inline">reserve_object_funds_for_withdrawal</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_reserve_object_funds_for_withdrawal">reserve_object_funds_for_withdrawal</a>&lt;T: store&gt;(owner: <b>address</b>, limit: u256)
</code></pre>




<h2 id="sui_funds_accumulator_create_withdrawal">Function <span class="code-inline">create_withdrawal</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_create_withdrawal">create_withdrawal</a>&lt;T: store&gt;(owner: <b>address</b>, limit: u256): <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;
</code></pre>



