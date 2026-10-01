---
title: Module sui::scratch
sidebar_label: scratch
---

<span class="code-inline"><a href="../sui_sui/scratch#sui_scratch">sui::scratch</a></span> is an ephemeral, per-transaction key-value store. Unlike <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a></span>,
scratch entries are not attached to any object, and are instead dropped at the end of the
transaction.

Each entry is identified by the pair of its key type and key value, hashed together in the same
way as a dynamic field name (see <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_hash_type_and_key">sui::dynamic_field::hash_type_and_key</a></span>).

All access (mutable and immutable) is controlled through the module that defines the key type
<span class="code-inline">K</span>. The functions are gated by a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span>, which can be granted via an <span class="code-inline">internal::Permit&lt;K&gt;</span>.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/internal#std_internal">std::internal</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_scratch_Permit">Struct <span class="code-inline">Permit</span></h2>

A <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span> gates access to all entries keyed by values of type <span class="code-inline">K</span>.<br/>
It is issued from an <span class="code-inline">internal::Permit&lt;K&gt;</span>, allowing the module that defines <span class="code-inline">K</span> to control
all access to scratch entries.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;<b>phantom</b> K: <b>copy</b>, drop&gt; <b>has</b> <b>copy</b>, drop
</code></pre>




<h2 id="sui_scratch_BorrowMarker">Struct <span class="code-inline">BorrowMarker</span></h2>

Occupies a key's slot while <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_do">get_do</a></span>, <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_fold">get_fold</a></span>, or their mutable variants have the value of
type <span class="code-inline">V</span> removed, so nothing can add to or read the slot while the value is being "borrowed".<br/>
Each one carries a transaction-unique id, so a marker cannot be forged to match one in use.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/scratch#sui_scratch_BorrowMarker">BorrowMarker</a>&lt;<b>phantom</b> V: drop&gt; <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_scratch_BorrowMarkerKey">Struct <span class="code-inline">BorrowMarkerKey</span></h2>

Key for the scratch entry that holds the monotonic counter backing <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_borrow_marker">borrow_marker</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/scratch#sui_scratch_BorrowMarkerKey">BorrowMarkerKey</a> <b>has</b> <b>copy</b>, drop
</code></pre>




<h2 id="@Constants_0">Constants</h2>

Stand-in parent address used when hashing scratch keys.


<pre><code><b>const</b> <a href="../sui_sui/scratch#sui_scratch_DUMMY_ROOT">DUMMY_ROOT</a>: <b>address</b> = 0x0;
</code></pre>

The scratch store already has an entry for this key.


<pre><code><b>const</b> <a href="../sui_sui/scratch#sui_scratch_EEntryAlreadyExists">EEntryAlreadyExists</a>: u64 = 0;
</code></pre>

The scratch store does not have an entry for this key.


<pre><code><b>const</b> <a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a>: u64 = 1;
</code></pre>

The scratch store has an entry for this key, but the value type does not match.


<pre><code><b>const</b> <a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a>: u64 = 2;
</code></pre>

A borrow-style macro found a different <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_BorrowMarker">BorrowMarker</a></span> than it left in the slot.


<pre><code><b>const</b> <a href="../sui_sui/scratch#sui_scratch_EBorrowMarkerMismatch">EBorrowMarkerMismatch</a>: u64 = 3;
</code></pre>


<h2 id="sui_scratch_permit">Function <span class="code-inline">permit</span></h2>

Issues a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span> from the privileged <span class="code-inline">internal::Permit&lt;K&gt;</span>, granting access to the
scratch entries keyed by values of type <span class="code-inline">K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_permit">permit</a>&lt;K: <b>copy</b>, drop&gt;(_: <a href="../sui_std/internal#std_internal_Permit">std::internal::Permit</a>&lt;K&gt;): <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;
</code></pre>




<h2 id="sui_scratch_add">Function <span class="code-inline">add</span></h2>

Adds the <span class="code-inline">key</span>-<span class="code-inline">value</span> pair to the scratch store. Requires a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span> for the key type.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryAlreadyExists">EEntryAlreadyExists</a></span> if there is already an entry for <span class="code-inline">key</span>, regardless of its
value type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_add">add</a>&lt;K: <b>copy</b>, drop, V: drop&gt;(_: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, _: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K, value: V)
</code></pre>




<h2 id="sui_scratch_read">Function <span class="code-inline">read</span></h2>

Returns a copy of the value bound to <span class="code-inline">key</span>. Requires a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span> for the key type.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if there is no entry for <span class="code-inline">key</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">V</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_read">read</a>&lt;K: <b>copy</b>, drop, V: <b>copy</b>, drop&gt;(_: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, _: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K): V
</code></pre>




<h2 id="sui_scratch_remove">Function <span class="code-inline">remove</span></h2>

Removes the entry bound to <span class="code-inline">key</span> and returns its value. Requires a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span> for the key type.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if there is no entry for <span class="code-inline">key</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">V</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_remove">remove</a>&lt;K: <b>copy</b>, drop, V: drop&gt;(_: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, _: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K): V
</code></pre>




<h2 id="sui_scratch_exists">Function <span class="code-inline">exists</span></h2>

Returns true if and only if the scratch store has an entry for <span class="code-inline">key</span>, without regard to the
value type. Requires a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span> for the key type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_exists">exists</a>&lt;K: <b>copy</b>, drop&gt;(_: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, _: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K): bool
</code></pre>




<h2 id="sui_scratch_exists_with_type">Function <span class="code-inline">exists_with_type</span></h2>

Returns true if and only if the scratch store has an entry for <span class="code-inline">key</span> whose value is of type <span class="code-inline">V</span>.<br/>
Requires a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;K&gt;</span> for the key type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_exists_with_type">exists_with_type</a>&lt;K: <b>copy</b>, drop, V: drop&gt;(_: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, _: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K): bool
</code></pre>




<h2 id="sui_scratch_read_opt">Function <span class="code-inline">read_opt</span></h2>

Returns a copy of the value bound to <span class="code-inline">key</span> as <span class="code-inline">some(value)</span> if it exists, or <span class="code-inline">none</span> otherwise.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">V</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_read_opt">read_opt</a>&lt;K: <b>copy</b>, drop, V: <b>copy</b>, drop&gt;(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, <a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;V&gt;
</code></pre>




<h2 id="sui_scratch_remove_opt">Function <span class="code-inline">remove_opt</span></h2>

Removes the entry bound to <span class="code-inline">key</span> if it exists, returning <span class="code-inline">some(value)</span>, or <span class="code-inline">none</span> otherwise.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">V</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_remove_opt">remove_opt</a>&lt;K: <b>copy</b>, drop, V: drop&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, <a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;V&gt;
</code></pre>




<h2 id="sui_scratch_replace">Function <span class="code-inline">replace</span></h2>

Removes the existing value at <span class="code-inline">key</span> (if any) and adds <span class="code-inline">value</span> in its place.<br/>
Returns the old value if it existed, or <span class="code-inline">none</span> otherwise.<br/>
Note: the old and new value types may differ.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">VOld</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_replace">replace</a>&lt;K: <b>copy</b>, drop, VNew: drop, VOld: drop&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, <a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K, value: VNew): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;VOld&gt;
</code></pre>




<h2 id="sui_scratch_begin_borrow">Function <span class="code-inline">begin_borrow</span></h2>

Not intended for direct usage. Instead, call <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_do">get_do</a></span>, <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_fold">get_fold</a></span>, or their mutable variants,
which handle the borrow-style usage of the value.<br/>
Begins a "borrow" of <span class="code-inline">key</span>: removes and returns its value, leaving a unique <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_BorrowMarker">BorrowMarker</a></span> in
the slot so nothing can add to or read it until <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_end_borrow">end_borrow</a></span> restores the value. Returns the
value and the marker, which must be passed to <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_end_borrow">end_borrow</a></span>.<br/>
While it is not verified that the same value is restored, the intended usage is guaranteed
by the borrow-style macros (<span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_do">get_do</a></span>, <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_fold">get_fold</a></span>, and their mutable variants).<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if there is no entry for <span class="code-inline">key</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">V</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_begin_borrow">begin_borrow</a>&lt;K: <b>copy</b>, drop, V: drop&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, <a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K): (V, <a href="../sui_sui/scratch#sui_scratch_BorrowMarker">sui::scratch::BorrowMarker</a>&lt;V&gt;)
</code></pre>




<h2 id="sui_scratch_end_borrow">Function <span class="code-inline">end_borrow</span></h2>

Not intended for direct usage. Instead, call <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_do">get_do</a></span>, <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_fold">get_fold</a></span>, or their mutable variants,
which handle the borrow-style usage of the value.<br/>
Ends a "borrow" begun by <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_begin_borrow">begin_borrow</a></span>: removes the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_BorrowMarker">BorrowMarker</a></span> from <span class="code-inline">key</span>'s slot and
restores <span class="code-inline">value</span>.<br/>
While it is not verified that the same value is restored, the intended usage is guaranteed
by the borrow-style macros (<span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_do">get_do</a></span>, <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_fold">get_fold</a></span>, and their mutable variants).<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if the borrow was already ended.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not a <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_BorrowMarker">BorrowMarker</a>&lt;V&gt;</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EBorrowMarkerMismatch">EBorrowMarkerMismatch</a></span> unless the slot still holds <span class="code-inline">marker</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_end_borrow">end_borrow</a>&lt;K: <b>copy</b>, drop, V: drop&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, <a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;K&gt;, key: K, value: V, marker: <a href="../sui_sui/scratch#sui_scratch_BorrowMarker">sui::scratch::BorrowMarker</a>&lt;V&gt;)
</code></pre>




<h2 id="sui_scratch_get_do">Macro function <span class="code-inline">get_do</span></h2>

If an entry exists for <span class="code-inline">key</span>, calls <span class="code-inline">&#36;f</span> on an immutable reference to its value; otherwise does
nothing.<br/>
Note that the value is not actually borrowed, but a placeholder is used while value is
temporarily removed for the duration of the <span class="code-inline">&#36;f</span> operation. As such, the function may abort
if the <span class="code-inline">&#36;key</span> is accessed during the <span class="code-inline">&#36;f</span> operation.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_get_do">get_do</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $<a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;$K&gt;, $key: $K, $f: |&$V| -&gt; $R)
</code></pre>




<h2 id="sui_scratch_get_mut_do">Macro function <span class="code-inline">get_mut_do</span></h2>

If an entry exists for <span class="code-inline">key</span>, calls <span class="code-inline">&#36;f</span> on a mutable reference to its value; otherwise does
nothing.<br/>
Note that the value is not actually borrowed, but a placeholder is used while value is
temporarily removed for the duration of the <span class="code-inline">&#36;f</span> operation. As such, the function may abort
if the <span class="code-inline">&#36;key</span> is accessed during the <span class="code-inline">&#36;f</span> operation.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_get_mut_do">get_mut_do</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $<a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;$K&gt;, $key: $K, $f: |&<b>mut</b> $V| -&gt; $R)
</code></pre>




<h2 id="sui_scratch_get_fold">Macro function <span class="code-inline">get_fold</span></h2>

If an entry exists for <span class="code-inline">key</span>, applies <span class="code-inline">&#36;some</span> to an immutable reference to its value and returns
the result; otherwise returns <span class="code-inline">&#36;none</span>.<br/>
Note that the value is not actually borrowed, but a placeholder is used while value is
temporarily removed for the duration of the <span class="code-inline">&#36;some</span> operation. As such, the function may abort
if the <span class="code-inline">&#36;key</span> is accessed during the <span class="code-inline">&#36;some</span> operation.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_get_fold">get_fold</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $<a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;$K&gt;, $key: $K, $none: $R, $some: |&$V| -&gt; $R): $R
</code></pre>




<h2 id="sui_scratch_get_mut_fold">Macro function <span class="code-inline">get_mut_fold</span></h2>

If an entry exists for <span class="code-inline">key</span>, applies <span class="code-inline">&#36;some</span> to a mutable reference to its value and returns
the result; otherwise returns <span class="code-inline">&#36;none</span>.<br/>
Note that the value is not actually borrowed, but a placeholder is used while value is
temporarily removed for the duration of the <span class="code-inline">&#36;some</span> operation. As such, the function may abort
if the <span class="code-inline">&#36;key</span> is accessed during the <span class="code-inline">&#36;some</span> operation.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_get_mut_fold">get_mut_fold</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $<a href="../sui_sui/scratch#sui_scratch_permit">permit</a>: <a href="../sui_sui/scratch#sui_scratch_Permit">sui::scratch::Permit</a>&lt;$K&gt;, $key: $K, $none: $R, $some: |&<b>mut</b> $V| -&gt; $R): $R
</code></pre>




<h2 id="sui_scratch_internal_add">Macro function <span class="code-inline">internal_add</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_add">add</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryAlreadyExists">EEntryAlreadyExists</a></span> if there is already an entry for <span class="code-inline">&#36;key</span>, regardless of its
value type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_add">internal_add</a>&lt;$K: <b>copy</b>, drop, $V: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K, $value: $V)
</code></pre>




<h2 id="sui_scratch_internal_read">Macro function <span class="code-inline">internal_read</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_read">read</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if there is no entry for <span class="code-inline">&#36;key</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_read">internal_read</a>&lt;$K: <b>copy</b>, drop, $V: <b>copy</b>, drop&gt;($ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K): $V
</code></pre>




<h2 id="sui_scratch_internal_remove">Macro function <span class="code-inline">internal_remove</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_remove">remove</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if there is no entry for <span class="code-inline">&#36;key</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_remove">internal_remove</a>&lt;$K: <b>copy</b>, drop, $V: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K): $V
</code></pre>




<h2 id="sui_scratch_internal_exists">Macro function <span class="code-inline">internal_exists</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_exists">exists</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_exists">internal_exists</a>&lt;$K: <b>copy</b>, drop&gt;($ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K): bool
</code></pre>




<h2 id="sui_scratch_internal_exists_with_type">Macro function <span class="code-inline">internal_exists_with_type</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_exists_with_type">exists_with_type</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_exists_with_type">internal_exists_with_type</a>&lt;$K: <b>copy</b>, drop, $V: drop&gt;($ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K): bool
</code></pre>




<h2 id="sui_scratch_internal_read_opt">Macro function <span class="code-inline">internal_read_opt</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_read_opt">read_opt</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_read_opt">internal_read_opt</a>&lt;$K: <b>copy</b>, drop, $V: <b>copy</b>, drop&gt;($ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$V&gt;
</code></pre>




<h2 id="sui_scratch_internal_remove_opt">Macro function <span class="code-inline">internal_remove_opt</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_remove_opt">remove_opt</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_remove_opt">internal_remove_opt</a>&lt;$K: <b>copy</b>, drop, $V: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$V&gt;
</code></pre>




<h2 id="sui_scratch_internal_replace">Macro function <span class="code-inline">internal_replace</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_replace">replace</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;VOld</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_replace">internal_replace</a>&lt;$K: <b>copy</b>, drop, $VNew: drop, $VOld: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K, $value: $VNew): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$VOld&gt;
</code></pre>




<h2 id="sui_scratch_internal_get_do">Macro function <span class="code-inline">internal_get_do</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_do">get_do</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_get_do">internal_get_do</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K, $f: |&$V| -&gt; $R)
</code></pre>




<h2 id="sui_scratch_internal_get_mut_do">Macro function <span class="code-inline">internal_get_mut_do</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_mut_do">get_mut_do</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_get_mut_do">internal_get_mut_do</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R: drop&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K, $f: |&<b>mut</b> $V| -&gt; $R)
</code></pre>




<h2 id="sui_scratch_internal_get_fold">Macro function <span class="code-inline">internal_get_fold</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_fold">get_fold</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_get_fold">internal_get_fold</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K, $none: $R, $some: |&$V| -&gt; $R): $R
</code></pre>




<h2 id="sui_scratch_internal_get_mut_fold">Macro function <span class="code-inline">internal_get_mut_fold</span></h2>

A wrapper for <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_get_mut_fold">get_mut_fold</a></span> that constructs the <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_Permit">Permit</a>&lt;&#36;K&gt;</span> directly.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if the entry exists, but its value is not of type <span class="code-inline">&#36;V</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/scratch#sui_scratch_internal_get_mut_fold">internal_get_mut_fold</a>&lt;$K: <b>copy</b>, drop, $V: drop, $R&gt;($ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>, $key: $K, $none: $R, $some: |&<b>mut</b> $V| -&gt; $R): $R
</code></pre>




<h2 id="sui_scratch_borrow_marker">Function <span class="code-inline">borrow_marker</span></h2>

Returns a fresh <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_BorrowMarker">BorrowMarker</a>&lt;V&gt;</span>, unique within the transaction, from a monotonic counter kept
in its own scratch entry.


<pre><code><b>fun</b> <a href="../sui_sui/scratch#sui_scratch_borrow_marker">borrow_marker</a>&lt;V: drop&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/scratch#sui_scratch_BorrowMarker">sui::scratch::BorrowMarker</a>&lt;V&gt;
</code></pre>




<h2 id="sui_scratch_hash_type_and_key">Function <span class="code-inline">hash_type_and_key</span></h2>

Hashes the type and value of <span class="code-inline">k</span> against <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_DUMMY_ROOT">DUMMY_ROOT</a></span> to produce the address identifying its
scratch entry.


<pre><code><b>fun</b> <a href="../sui_sui/scratch#sui_scratch_hash_type_and_key">hash_type_and_key</a>&lt;K: <b>copy</b>, drop&gt;(k: K): <b>address</b>
</code></pre>




<h2 id="sui_scratch_add_impl">Function <span class="code-inline">add_impl</span></h2>

Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryAlreadyExists">EEntryAlreadyExists</a></span> if there is an entry already for <span class="code-inline">key</span>, regardless of the
type of <span class="code-inline">V</span>


<pre><code><b>fun</b> <a href="../sui_sui/scratch#sui_scratch_add_impl">add_impl</a>&lt;V: drop&gt;(key: <b>address</b>, value: V)
</code></pre>




<h2 id="sui_scratch_read_impl">Function <span class="code-inline">read_impl</span></h2>

Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if there is no entry for <span class="code-inline">key</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if there is an entry for <span class="code-inline">key</span> but it is not of type <span class="code-inline">V</span>.


<pre><code><b>fun</b> <a href="../sui_sui/scratch#sui_scratch_read_impl">read_impl</a>&lt;V: <b>copy</b>, drop&gt;(key: <b>address</b>): V
</code></pre>




<h2 id="sui_scratch_remove_impl">Function <span class="code-inline">remove_impl</span></h2>

Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryDoesNotExist">EEntryDoesNotExist</a></span> if there is no entry for <span class="code-inline">key</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/scratch#sui_scratch_EEntryTypeMismatch">EEntryTypeMismatch</a></span> if there is an entry for <span class="code-inline">key</span> but it is not of type <span class="code-inline">V</span>.


<pre><code><b>fun</b> <a href="../sui_sui/scratch#sui_scratch_remove_impl">remove_impl</a>&lt;V: drop&gt;(key: <b>address</b>): V
</code></pre>




<h2 id="sui_scratch_exists_impl">Function <span class="code-inline">exists_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/scratch#sui_scratch_exists_impl">exists_impl</a>(key: <b>address</b>): bool
</code></pre>




<h2 id="sui_scratch_exists_with_type_impl">Function <span class="code-inline">exists_with_type_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/scratch#sui_scratch_exists_with_type_impl">exists_with_type_impl</a>&lt;V: drop&gt;(key: <b>address</b>): bool
</code></pre>



