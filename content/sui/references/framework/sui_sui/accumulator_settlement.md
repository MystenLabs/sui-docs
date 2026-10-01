---
title: Module sui::accumulator_settlement
sidebar_label: accumulator_settlement
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_accumulator_settlement_EventStreamHead">Struct <span class="code-inline">EventStreamHead</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_EventStreamHead">EventStreamHead</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">mmr: vector&lt;u256&gt;</span>
</dt>
<dd>
 Merkle Mountain Range of all events in the stream.
</dd>
<dt>
<span class="code-inline">checkpoint_seq: u64</span>
</dt>
<dd>
 Checkpoint sequence number at which the event stream was written.
</dd>
<dt>
<span class="code-inline">num_events: u64</span>
</dt>
<dd>
 Number of events in the stream.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_EInvalidSplitAmount">EInvalidSplitAmount</a>: u64 = 1;
</code></pre>


<h2 id="sui_accumulator_settlement_settlement_prologue">Function <span class="code-inline">settlement_prologue</span></h2>

Called by settlement transactions to ensure that the settlement transaction has a unique
digest.


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_settlement_prologue">settlement_prologue</a>(_accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, _epoch: u64, _checkpoint_height: u64, _idx: u64, input_sui: u64, output_sui: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_accumulator_settlement_settle_u128">Function <span class="code-inline">settle_u128</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_settle_u128">settle_u128</a>&lt;T&gt;(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, owner: <b>address</b>, merge: u128, split: u128, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_accumulator_settlement_record_settlement_sui_conservation">Function <span class="code-inline">record_settlement_sui_conservation</span></h2>

Called by the settlement transaction to track conservation of SUI.


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_record_settlement_sui_conservation">record_settlement_sui_conservation</a>(input_sui: u64, output_sui: u64)
</code></pre>




<h2 id="sui_accumulator_settlement_add_to_mmr">Function <span class="code-inline">add_to_mmr</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_add_to_mmr">add_to_mmr</a>(new_val: u256, mmr: &<b>mut</b> vector&lt;u256&gt;)
</code></pre>




<h2 id="sui_accumulator_settlement_u256_from_bytes">Function <span class="code-inline">u256_from_bytes</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_u256_from_bytes">u256_from_bytes</a>(bytes: vector&lt;u8&gt;): u256
</code></pre>




<h2 id="sui_accumulator_settlement_hash_two_to_one_u256">Function <span class="code-inline">hash_two_to_one_u256</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_hash_two_to_one_u256">hash_two_to_one_u256</a>(left: u256, right: u256): u256
</code></pre>




<h2 id="sui_accumulator_settlement_new_stream_head">Function <span class="code-inline">new_stream_head</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_new_stream_head">new_stream_head</a>(new_root: u256, event_count_delta: u64, checkpoint_seq: u64): <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_EventStreamHead">sui::accumulator_settlement::EventStreamHead</a>
</code></pre>




<h2 id="sui_accumulator_settlement_settle_events">Function <span class="code-inline">settle_events</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_settle_events">settle_events</a>(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, stream_id: <b>address</b>, new_root: u256, event_count_delta: u64, checkpoint_seq: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



