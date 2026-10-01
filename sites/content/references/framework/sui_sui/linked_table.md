---
title: Module sui::linked_table
sidebar_label: linked_table
---

Similar to <span class="code-inline"><a href="../sui_sui/table#sui_table">sui::table</a></span> but the values are linked together, allowing for ordered insertion and
removal

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_linked_table_LinkedTable">Struct <span class="code-inline">LinkedTable</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, <b>phantom</b> V: store&gt; <b>has</b> key, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
 the ID of this table
</dd>
<dt>
<span class="code-inline">size: u64</span>
</dt>
<dd>
 the number of key-value pairs in the table
</dd>
<dt>
<span class="code-inline">head: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;</span>
</dt>
<dd>
 the front of the table, i.e. the key of the first entry
</dd>
<dt>
<span class="code-inline">tail: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;</span>
</dt>
<dd>
 the back of the table, i.e. the key of the last entry
</dd>
</dl>


</details>

<h2 id="sui_linked_table_Node">Struct <span class="code-inline">Node</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/linked_table#sui_linked_table_Node">Node</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt; <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/linked_table#sui_linked_table_prev">prev</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;</span>
</dt>
<dd>
 the previous key
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/linked_table#sui_linked_table_next">next</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;</span>
</dt>
<dd>
 the next key
</dd>
<dt>
<span class="code-inline">value: V</span>
</dt>
<dd>
 the value being stored
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/linked_table#sui_linked_table_ETableNotEmpty">ETableNotEmpty</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/linked_table#sui_linked_table_ETableIsEmpty">ETableIsEmpty</a>: u64 = 1;
</code></pre>


<h2 id="sui_linked_table_new">Function <span class="code-inline">new</span></h2>

Creates a new, empty table


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_new">new</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;
</code></pre>




<h2 id="sui_linked_table_front">Function <span class="code-inline">front</span></h2>

Returns the key for the first element in the table, or None if the table is empty


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_front">front</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;
</code></pre>




<h2 id="sui_linked_table_back">Function <span class="code-inline">back</span></h2>

Returns the key for the last element in the table, or None if the table is empty


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_back">back</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;
</code></pre>




<h2 id="sui_linked_table_push_front">Function <span class="code-inline">push_front</span></h2>

Inserts a key-value pair at the front of the table, i.e. the newly inserted pair will be
the first element in the table.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">sui::dynamic_field::EFieldAlreadyExists</a></span> if the table already has an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_push_front">push_front</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K, value: V)
</code></pre>




<h2 id="sui_linked_table_push_back">Function <span class="code-inline">push_back</span></h2>

Inserts a key-value pair at the back of the table, i.e. the newly inserted pair will be
the last element in the table.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">sui::dynamic_field::EFieldAlreadyExists</a></span> if the table already has an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_push_back">push_back</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K, value: V)
</code></pre>




<h2 id="sui_linked_table_insert_before">Function <span class="code-inline">insert_before</span></h2>

Inserts a key-value pair immediately before the entry with key <span class="code-inline">anchor: K</span>.<br/>
If <span class="code-inline">anchor</span> is the front of the table, the newly inserted pair becomes the new front.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry
with the key <span class="code-inline">anchor: K</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">sui::dynamic_field::EFieldAlreadyExists</a></span> if the table already has an entry
with the key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_insert_before">insert_before</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, anchor: K, k: K, value: V)
</code></pre>




<h2 id="sui_linked_table_insert_after">Function <span class="code-inline">insert_after</span></h2>

Inserts a key-value pair immediately after the entry with key <span class="code-inline">anchor: K</span>.<br/>
If <span class="code-inline">anchor</span> is the back of the table, the newly inserted pair becomes the new back.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry
with the key <span class="code-inline">anchor: K</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">sui::dynamic_field::EFieldAlreadyExists</a></span> if the table already has an entry
with the key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_insert_after">insert_after</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, anchor: K, k: K, value: V)
</code></pre>




<h2 id="sui_linked_table_borrow">Function <span class="code-inline">borrow</span></h2>

Immutable borrows the value associated with the key in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K): &V
</code></pre>




<h2 id="sui_linked_table_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Mutably borrows the value associated with the key in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_borrow_mut">borrow_mut</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K): &<b>mut</b> V
</code></pre>




<h2 id="sui_linked_table_prev">Function <span class="code-inline">prev</span></h2>

Borrows the key for the previous entry of the specified key <span class="code-inline">k: K</span> in the table
<span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span>. Returns None if the entry does not have a predecessor.
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_prev">prev</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;
</code></pre>




<h2 id="sui_linked_table_next">Function <span class="code-inline">next</span></h2>

Borrows the key for the next entry of the specified key <span class="code-inline">k: K</span> in the table
<span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span>. Returns None if the entry does not have a successor.
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_next">next</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;K&gt;
</code></pre>




<h2 id="sui_linked_table_remove">Function <span class="code-inline">remove</span></h2>

Removes the key-value pair in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span> and returns the value.<br/>
This splices the element out of the ordering.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>. Note: this is also what happens when the table is empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_remove">remove</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K): V
</code></pre>




<h2 id="sui_linked_table_pop_front">Function <span class="code-inline">pop_front</span></h2>

Removes the front of the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span>, returns the key and value.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/linked_table#sui_linked_table_ETableIsEmpty">ETableIsEmpty</a></span> if the table is empty


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_pop_front">pop_front</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;): (K, V)
</code></pre>




<h2 id="sui_linked_table_pop_back">Function <span class="code-inline">pop_back</span></h2>

Removes the back of the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span>, returns the key and value.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/linked_table#sui_linked_table_ETableIsEmpty">ETableIsEmpty</a></span> if the table is empty


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_pop_back">pop_back</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;): (K, V)
</code></pre>




<h2 id="sui_linked_table_contains">Function <span class="code-inline">contains</span></h2>

Returns true iff there is a value associated with the key <span class="code-inline">k: K</span> in table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">LinkedTable</a>&lt;K, V&gt;</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_contains">contains</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;, k: K): bool
</code></pre>




<h2 id="sui_linked_table_length">Function <span class="code-inline">length</span></h2>

Returns the size of the table, the number of key-value pairs


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_length">length</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;): u64
</code></pre>




<h2 id="sui_linked_table_is_empty">Function <span class="code-inline">is_empty</span></h2>

Returns true iff the table is empty (if <span class="code-inline"><a href="../sui_sui/linked_table#sui_linked_table_length">length</a></span> returns <span class="code-inline">0</span>)


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_is_empty">is_empty</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;): bool
</code></pre>




<h2 id="sui_linked_table_destroy_empty">Function <span class="code-inline">destroy_empty</span></h2>

Destroys an empty table.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/linked_table#sui_linked_table_ETableNotEmpty">ETableNotEmpty</a></span> if the table still contains values


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_destroy_empty">destroy_empty</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;)
</code></pre>




<h2 id="sui_linked_table_drop">Function <span class="code-inline">drop</span></h2>

Drop a possibly non-empty table.<br/>
Usable only if the value type <span class="code-inline">V</span> has the <span class="code-inline"><a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a></span> ability


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>&lt;K: <b>copy</b>, <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store, V: <a href="../sui_sui/linked_table#sui_linked_table_drop">drop</a>, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;K, V&gt;)
</code></pre>



