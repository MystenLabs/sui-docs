---
title: Module sui::accumulator
sidebar_label: accumulator
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_accumulator_AccumulatorRoot">Struct <span class="code-inline">AccumulatorRoot</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">AccumulatorRoot</a> <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_accumulator_U128">Struct <span class="code-inline">U128</span></h2>

Storage for 128-bit accumulator values.

Currently only used to represent the sum of 64 bit values (such as <span class="code-inline">Balance&lt;T&gt;</span>).<br/>
The additional bits are necessary to prevent overflow, as it would take 2^64 deposits of U64_MAX
to cause an overflow.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator#sui_accumulator_U128">U128</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">value: u128</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_accumulator_Key">Struct <span class="code-inline">Key</span></h2>

<span class="code-inline"><a href="../sui_sui/accumulator#sui_accumulator_Key">Key</a></span> is used only for computing the field id of accumulator objects.
<span class="code-inline">T</span> is the type of the accumulated value, e.g. <span class="code-inline">Balance&lt;SUI&gt;</span>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator#sui_accumulator_Key">Key</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><b>address</b>: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/accumulator#sui_accumulator_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>


<h2 id="sui_accumulator_create">Function <span class="code-inline">create</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_create">create</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_accumulator_root_id">Function <span class="code-inline">root_id</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_root_id">root_id</a>(accumulator_root: &<a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>): &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_accumulator_root_id_mut">Function <span class="code-inline">root_id_mut</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_root_id_mut">root_id_mut</a>(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>): &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_accumulator_accumulator_u128_exists">Function <span class="code-inline">accumulator_u128_exists</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_accumulator_u128_exists">accumulator_u128_exists</a>&lt;T&gt;(root: &<a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, <b>address</b>: <b>address</b>): bool
</code></pre>




<h2 id="sui_accumulator_accumulator_u128_read">Function <span class="code-inline">accumulator_u128_read</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_accumulator_u128_read">accumulator_u128_read</a>&lt;T&gt;(root: &<a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, <b>address</b>: <b>address</b>): u128
</code></pre>




<h2 id="sui_accumulator_create_u128">Function <span class="code-inline">create_u128</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_create_u128">create_u128</a>(value: u128): <a href="../sui_sui/accumulator#sui_accumulator_U128">sui::accumulator::U128</a>
</code></pre>




<h2 id="sui_accumulator_destroy_u128">Function <span class="code-inline">destroy_u128</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_destroy_u128">destroy_u128</a>(u128: <a href="../sui_sui/accumulator#sui_accumulator_U128">sui::accumulator::U128</a>)
</code></pre>




<h2 id="sui_accumulator_update_u128">Function <span class="code-inline">update_u128</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_update_u128">update_u128</a>(u128: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_U128">sui::accumulator::U128</a>, merge: u128, split: u128)
</code></pre>




<h2 id="sui_accumulator_is_zero_u128">Function <span class="code-inline">is_zero_u128</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_is_zero_u128">is_zero_u128</a>(u128: &<a href="../sui_sui/accumulator#sui_accumulator_U128">sui::accumulator::U128</a>): bool
</code></pre>




<h2 id="sui_accumulator_accumulator_key">Function <span class="code-inline">accumulator_key</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_accumulator_key">accumulator_key</a>&lt;T&gt;(<b>address</b>: <b>address</b>): <a href="../sui_sui/accumulator#sui_accumulator_Key">sui::accumulator::Key</a>&lt;T&gt;
</code></pre>




<h2 id="sui_accumulator_accumulator_address">Function <span class="code-inline">accumulator_address</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_accumulator_address">accumulator_address</a>&lt;T&gt;(<b>address</b>: <b>address</b>): <b>address</b>
</code></pre>




<h2 id="sui_accumulator_root_has_accumulator">Function <span class="code-inline">root_has_accumulator</span></h2>

Balance object methods


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_root_has_accumulator">root_has_accumulator</a>&lt;K, V: store&gt;(accumulator_root: &<a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, name: <a href="../sui_sui/accumulator#sui_accumulator_Key">sui::accumulator::Key</a>&lt;K&gt;): bool
</code></pre>




<h2 id="sui_accumulator_root_add_accumulator">Function <span class="code-inline">root_add_accumulator</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_root_add_accumulator">root_add_accumulator</a>&lt;K, V: store&gt;(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, name: <a href="../sui_sui/accumulator#sui_accumulator_Key">sui::accumulator::Key</a>&lt;K&gt;, value: V)
</code></pre>




<h2 id="sui_accumulator_root_borrow_accumulator_mut">Function <span class="code-inline">root_borrow_accumulator_mut</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_root_borrow_accumulator_mut">root_borrow_accumulator_mut</a>&lt;K, V: store&gt;(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, name: <a href="../sui_sui/accumulator#sui_accumulator_Key">sui::accumulator::Key</a>&lt;K&gt;): &<b>mut</b> V
</code></pre>




<h2 id="sui_accumulator_root_borrow_accumulator">Function <span class="code-inline">root_borrow_accumulator</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_root_borrow_accumulator">root_borrow_accumulator</a>&lt;K, V: store&gt;(accumulator_root: &<a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, name: <a href="../sui_sui/accumulator#sui_accumulator_Key">sui::accumulator::Key</a>&lt;K&gt;): &V
</code></pre>




<h2 id="sui_accumulator_root_remove_accumulator">Function <span class="code-inline">root_remove_accumulator</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_root_remove_accumulator">root_remove_accumulator</a>&lt;K, V: store&gt;(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, name: <a href="../sui_sui/accumulator#sui_accumulator_Key">sui::accumulator::Key</a>&lt;K&gt;): V
</code></pre>




<h2 id="sui_accumulator_emit_deposit_event">Function <span class="code-inline">emit_deposit_event</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_emit_deposit_event">emit_deposit_event</a>&lt;T&gt;(<a href="../sui_sui/accumulator#sui_accumulator">accumulator</a>: <b>address</b>, recipient: <b>address</b>, amount: u64)
</code></pre>




<h2 id="sui_accumulator_emit_withdraw_event">Function <span class="code-inline">emit_withdraw_event</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/accumulator#sui_accumulator_emit_withdraw_event">emit_withdraw_event</a>&lt;T&gt;(<a href="../sui_sui/accumulator#sui_accumulator">accumulator</a>: <b>address</b>, owner: <b>address</b>, amount: u64)
</code></pre>



