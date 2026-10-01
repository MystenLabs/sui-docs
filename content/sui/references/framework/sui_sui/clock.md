---
title: Module sui::clock
sidebar_label: clock
---

APIs for accessing time from move calls, via the <span class="code-inline"><a href="../sui_sui/clock#sui_clock_Clock">Clock</a></span>: a unique
shared object that is created at 0x6 during genesis.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_clock_Clock">Struct <span class="code-inline">Clock</span></h2>

Singleton shared object that exposes time to Move calls.  This
object is found at address 0x6, and can only be read (accessed
via an immutable reference) by entry functions.

Entry Functions that attempt to accept <span class="code-inline"><a href="../sui_sui/clock#sui_clock_Clock">Clock</a></span> by mutable
reference or value will fail to verify, and honest validators
will not sign or execute transactions that use <span class="code-inline"><a href="../sui_sui/clock#sui_clock_Clock">Clock</a></span> as an
input parameter, unless it is passed by immutable reference.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/clock#sui_clock_Clock">Clock</a> <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>: u64</span>
</dt>
<dd>
 The clock's timestamp, which is set automatically by a
 system transaction every time consensus commits a
 schedule, or by <span class="code-inline">sui::clock::increment_for_testing</span> during
 testing.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Sender is not @0x0 the system address.


<pre><code><b>const</b> <a href="../sui_sui/clock#sui_clock_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>


<h2 id="sui_clock_timestamp_ms">Function <span class="code-inline">timestamp_ms</span></h2>

The <span class="code-inline"><a href="../sui_sui/clock#sui_clock">clock</a></span>'s current timestamp as a running total of
milliseconds since an arbitrary point in the past.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>(<a href="../sui_sui/clock#sui_clock">clock</a>: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>): u64
</code></pre>




<h2 id="sui_clock_create">Function <span class="code-inline">create</span></h2>

Create and share the singleton Clock -- this function is
called exactly once, during genesis.


<pre><code><b>fun</b> <a href="../sui_sui/clock#sui_clock_create">create</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_clock_consensus_commit_prologue">Function <span class="code-inline">consensus_commit_prologue</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/clock#sui_clock_consensus_commit_prologue">consensus_commit_prologue</a>(<a href="../sui_sui/clock#sui_clock">clock</a>: &<b>mut</b> <a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



