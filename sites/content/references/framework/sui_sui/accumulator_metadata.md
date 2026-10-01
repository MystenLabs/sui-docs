---
title: Module sui::accumulator_metadata
sidebar_label: accumulator_metadata
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bag#sui_bag">sui::bag</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_accumulator_metadata_OwnerKey">Struct <span class="code-inline">OwnerKey</span></h2>

=== Accumulator metadata ===

Metadata system has been removed, but structs must remain for backwards compatibility.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_OwnerKey">OwnerKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">owner: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_accumulator_metadata_Owner">Struct <span class="code-inline">Owner</span></h2>

An owner field, to which all AccumulatorMetadata fields for the owner are
attached.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_Owner">Owner</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">balances: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 The individual balances owned by the owner.
</dd>
<dt>
<span class="code-inline">owner: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_accumulator_metadata_MetadataKey">Struct <span class="code-inline">MetadataKey</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_MetadataKey">MetadataKey</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="sui_accumulator_metadata_Metadata">Struct <span class="code-inline">Metadata</span></h2>

A metadata field for a balance field with type T.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_Metadata">Metadata</a>&lt;<b>phantom</b> T&gt; <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any per-balance fields we wish to add in the future.
</dd>
</dl>


</details>

<h2 id="sui_accumulator_metadata_AccumulatorObjectCountKey">Struct <span class="code-inline">AccumulatorObjectCountKey</span></h2>

=== Accumulator object count storage ===.<br/>
Key for storing the net count of accumulator objects as a dynamic field on the accumulator root.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_AccumulatorObjectCountKey">AccumulatorObjectCountKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_EInvariantViolation">EInvariantViolation</a>: u64 = 0;
</code></pre>


<h2 id="sui_accumulator_metadata_record_accumulator_object_changes">Function <span class="code-inline">record_accumulator_object_changes</span></h2>

Records changes in the net count of accumulator objects. Called by the barrier transaction
as part of accumulator settlement.

This value is copied to the Sui system state object at end-of-epoch by the.<br/>
WriteAccumulatorStorageCost transaction, for use in storage fund accounting. Copying once
at end-of-epoch lets us avoid depending on the Sui system state object in the settlement
barrier transaction.


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_record_accumulator_object_changes">record_accumulator_object_changes</a>(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, objects_created: u64, objects_destroyed: u64)
</code></pre>




<h2 id="sui_accumulator_metadata_get_accumulator_object_count">Function <span class="code-inline">get_accumulator_object_count</span></h2>

Returns the current count of accumulator objects stored as a dynamic field.


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata_get_accumulator_object_count">get_accumulator_object_count</a>(accumulator_root: &<a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>): u64
</code></pre>



