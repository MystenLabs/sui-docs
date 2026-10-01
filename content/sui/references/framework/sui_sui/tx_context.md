---
title: Module sui::tx_context
sidebar_label: tx_context
---

<pre><code><b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="sui_tx_context_TxContext">Struct <span class="code-inline">TxContext</span></h2>

Information about the transaction currently being executed.<br/>
This cannot be constructed by a transaction--it is a privileged object created by
the VM and passed in to the entrypoint of the transaction as <span class="code-inline">&<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">TxContext</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">TxContext</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/tx_context#sui_tx_context_sender">sender</a>: <b>address</b></span>
</dt>
<dd>
 The address of the user that signed the current transaction
</dd>
<dt>
<span class="code-inline">tx_hash: vector&lt;u8&gt;</span>
</dt>
<dd>
 Hash of the current transaction
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/tx_context#sui_tx_context_epoch">epoch</a>: u64</span>
</dt>
<dd>
 The current epoch number
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/tx_context#sui_tx_context_epoch_timestamp_ms">epoch_timestamp_ms</a>: u64</span>
</dt>
<dd>
 Timestamp that the epoch started at
</dd>
<dt>
<span class="code-inline">ids_created: u64</span>
</dt>
<dd>
 Counter recording the number of fresh id's created while executing
 this transaction. Always 0 at the start of a transaction
</dd>
</dl>


</details>

<h2 id="sui_tx_context_sender">Function <span class="code-inline">sender</span></h2>

Return the address of the user that signed the current
transaction


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_sender">sender</a>(_self: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <b>address</b>
</code></pre>




<h2 id="sui_tx_context_native_sender">Function <span class="code-inline">native_sender</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_sender">native_sender</a>(): <b>address</b>
</code></pre>




<h2 id="sui_tx_context_digest">Function <span class="code-inline">digest</span></h2>

Return the transaction digest (hash of transaction inputs).<br/>
Please do not use as a source of randomness.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_digest">digest</a>(self: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_tx_context_epoch">Function <span class="code-inline">epoch</span></h2>

Return the current epoch


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_epoch">epoch</a>(_self: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): u64
</code></pre>




<h2 id="sui_tx_context_native_epoch">Function <span class="code-inline">native_epoch</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_epoch">native_epoch</a>(): u64
</code></pre>




<h2 id="sui_tx_context_epoch_timestamp_ms">Function <span class="code-inline">epoch_timestamp_ms</span></h2>

Return the epoch start time as a unix timestamp in milliseconds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_epoch_timestamp_ms">epoch_timestamp_ms</a>(_self: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): u64
</code></pre>




<h2 id="sui_tx_context_native_epoch_timestamp_ms">Function <span class="code-inline">native_epoch_timestamp_ms</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_epoch_timestamp_ms">native_epoch_timestamp_ms</a>(): u64
</code></pre>




<h2 id="sui_tx_context_sponsor">Function <span class="code-inline">sponsor</span></h2>

Return the adress of the transaction sponsor or <span class="code-inline">None</span> if there was no sponsor.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_sponsor">sponsor</a>(_self: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_tx_context_fresh_object_address">Function <span class="code-inline">fresh_object_address</span></h2>

Create an <span class="code-inline"><b>address</b></span> that has not been used. As it is an object address, it will never
occur as the address for a user.<br/>
In other words, the generated address is a globally unique object ID.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_fresh_object_address">fresh_object_address</a>(_ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <b>address</b>
</code></pre>




<h2 id="sui_tx_context_fresh_id">Function <span class="code-inline">fresh_id</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_fresh_id">fresh_id</a>(): <b>address</b>
</code></pre>




<h2 id="sui_tx_context_reference_gas_price">Function <span class="code-inline">reference_gas_price</span></h2>

Return the reference gas price in effect for the epoch the transaction
is being executed in.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_reference_gas_price">reference_gas_price</a>(_self: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): u64
</code></pre>




<h2 id="sui_tx_context_native_rgp">Function <span class="code-inline">native_rgp</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_rgp">native_rgp</a>(): u64
</code></pre>




<h2 id="sui_tx_context_gas_price">Function <span class="code-inline">gas_price</span></h2>

Return the gas price submitted for the current transaction.<br/>
That is the value the user submitted with the transaction data.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_gas_price">gas_price</a>(_self: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): u64
</code></pre>




<h2 id="sui_tx_context_native_gas_price">Function <span class="code-inline">native_gas_price</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_gas_price">native_gas_price</a>(): u64
</code></pre>




<h2 id="sui_tx_context_native_ids_created">Function <span class="code-inline">native_ids_created</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_ids_created">native_ids_created</a>(): u64
</code></pre>




<h2 id="sui_tx_context_native_gas_budget">Function <span class="code-inline">native_gas_budget</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_gas_budget">native_gas_budget</a>(): u64
</code></pre>




<h2 id="sui_tx_context_option_sponsor">Function <span class="code-inline">option_sponsor</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_option_sponsor">option_sponsor</a>(): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_tx_context_native_sponsor">Function <span class="code-inline">native_sponsor</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_native_sponsor">native_sponsor</a>(): vector&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_tx_context_derive_id">Function <span class="code-inline">derive_id</span></h2>

Native function for deriving an ID via hash(tx_hash || ids_created)


<pre><code><b>fun</b> <a href="../sui_sui/tx_context#sui_tx_context_derive_id">derive_id</a>(tx_hash: vector&lt;u8&gt;, ids_created: u64): <b>address</b>
</code></pre>



