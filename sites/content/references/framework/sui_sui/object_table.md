---
title: Module sui::object_table
sidebar_label: object_table
---

Similar to <span class="code-inline"><a href="../sui_sui/table#sui_table">sui::table</a></span>, an <span class="code-inline"><a href="../sui_sui/object_table#sui_object_table_ObjectTable">ObjectTable</a>&lt;K, V&gt;</span> is a map-like collection. But unlike
<span class="code-inline"><a href="../sui_sui/table#sui_table">sui::table</a></span>, the values bound to these dynamic fields _must_ be objects themselves. This allows
for the objects to still exist within in storage, which may be important for external tools.<br/>
The difference is otherwise not observable from within Move.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field">sui::dynamic_object_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_object_table_ObjectTable">Struct <span class="code-inline">ObjectTable</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/object_table#sui_object_table_ObjectTable">ObjectTable</a>&lt;<b>phantom</b> K: <b>copy</b>, drop, store, <b>phantom</b> V: key, store&gt; <b>has</b> key, store
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
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/object_table#sui_object_table_ETableNotEmpty">ETableNotEmpty</a>: u64 = 0;
</code></pre>


<h2 id="sui_object_table_new">Function <span class="code-inline">new</span></h2>

Creates a new, empty table


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_new">new</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;
</code></pre>




<h2 id="sui_object_table_add">Function <span class="code-inline">add</span></h2>

Adds a key-value pair to the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/object_table#sui_object_table_ObjectTable">ObjectTable</a>&lt;K, V&gt;</span><br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">sui::dynamic_field::EFieldAlreadyExists</a></span> if the table already has an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_add">add</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;, k: K, v: V)
</code></pre>




<h2 id="sui_object_table_borrow">Function <span class="code-inline">borrow</span></h2>

Immutable borrows the value associated with the key in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/object_table#sui_object_table_ObjectTable">ObjectTable</a>&lt;K, V&gt;</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;, k: K): &V
</code></pre>




<h2 id="sui_object_table_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Mutably borrows the value associated with the key in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/object_table#sui_object_table_ObjectTable">ObjectTable</a>&lt;K, V&gt;</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_borrow_mut">borrow_mut</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;, k: K): &<b>mut</b> V
</code></pre>




<h2 id="sui_object_table_remove">Function <span class="code-inline">remove</span></h2>

Removes the key-value pair in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/object_table#sui_object_table_ObjectTable">ObjectTable</a>&lt;K, V&gt;</span> and returns the value.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_remove">remove</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;, k: K): V
</code></pre>




<h2 id="sui_object_table_contains">Function <span class="code-inline">contains</span></h2>

Returns true if there is a value associated with the key <span class="code-inline">k: K</span> in table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/object_table#sui_object_table_ObjectTable">ObjectTable</a>&lt;K, V&gt;</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_contains">contains</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;, k: K): bool
</code></pre>




<h2 id="sui_object_table_length">Function <span class="code-inline">length</span></h2>

Returns the size of the table, the number of key-value pairs


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_length">length</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;): u64
</code></pre>




<h2 id="sui_object_table_is_empty">Function <span class="code-inline">is_empty</span></h2>

Returns true if the table is empty (if <span class="code-inline"><a href="../sui_sui/object_table#sui_object_table_length">length</a></span> returns <span class="code-inline">0</span>)


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_is_empty">is_empty</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;): bool
</code></pre>




<h2 id="sui_object_table_destroy_empty">Function <span class="code-inline">destroy_empty</span></h2>

Destroys an empty table.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/object_table#sui_object_table_ETableNotEmpty">ETableNotEmpty</a></span> if the table still contains values


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_destroy_empty">destroy_empty</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: <a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;)
</code></pre>




<h2 id="sui_object_table_value_id">Function <span class="code-inline">value_id</span></h2>

Returns the ID of the object associated with the key if the table has an entry with key <span class="code-inline">k: K</span>.<br/>
Returns none otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object_table#sui_object_table_value_id">value_id</a>&lt;K: <b>copy</b>, drop, store, V: key, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/object_table#sui_object_table_ObjectTable">sui::object_table::ObjectTable</a>&lt;K, V&gt;, k: K): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>&gt;
</code></pre>



