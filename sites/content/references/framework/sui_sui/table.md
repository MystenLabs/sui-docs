---
title: Module sui::table
sidebar_label: table
---

A table is a map-like collection. But unlike a traditional collection, it's keys and values are
not stored within the <span class="code-inline"><a href="../sui_sui/table#sui_table_Table">Table</a></span> value, but instead are stored using Sui's object system. The
<span class="code-inline"><a href="../sui_sui/table#sui_table_Table">Table</a></span> struct acts only as a handle into the object system to retrieve those keys and values.
Note that this means that <span class="code-inline"><a href="../sui_sui/table#sui_table_Table">Table</a></span> values with exactly the same key-value mapping will not be
equal, with <span class="code-inline">==</span>, at runtime. For example
```
let table1 = table::new<u64, bool>();
let table2 = table::new<u64, bool>();
table::add(&mut table1, 0, false);
table::add(&mut table1, 1, true);
table::add(&mut table2, 0, false);
table::add(&mut table2, 1, true);
// table1 does not equal table2, despite having the same entries
assert!(&table1 != &table2);
```

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

<h2 id="sui_table_Table">Struct <span class="code-inline">Table</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/table#sui_table_Table">Table</a>&lt;<b>phantom</b> K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, <b>phantom</b> V: store&gt; <b>has</b> key, store
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

<pre><code><b>const</b> <a href="../sui_sui/table#sui_table_ETableNotEmpty">ETableNotEmpty</a>: u64 = 0;
</code></pre>


<h2 id="sui_table_new">Function <span class="code-inline">new</span></h2>

Creates a new, empty table


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_new">new</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;
</code></pre>




<h2 id="sui_table_add">Function <span class="code-inline">add</span></h2>

Adds a key-value pair to the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/table#sui_table_Table">Table</a>&lt;K, V&gt;</span><br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">sui::dynamic_field::EFieldAlreadyExists</a></span> if the table already has an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_add">add</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;, k: K, v: V)
</code></pre>




<h2 id="sui_table_borrow">Function <span class="code-inline">borrow</span></h2>

Immutable borrows the value associated with the key in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/table#sui_table_Table">Table</a>&lt;K, V&gt;</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;, k: K): &V
</code></pre>




<h2 id="sui_table_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Mutably borrows the value associated with the key in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/table#sui_table_Table">Table</a>&lt;K, V&gt;</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_borrow_mut">borrow_mut</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;, k: K): &<b>mut</b> V
</code></pre>




<h2 id="sui_table_remove">Function <span class="code-inline">remove</span></h2>

Removes the key-value pair in the table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/table#sui_table_Table">Table</a>&lt;K, V&gt;</span> and returns the value.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the table does not have an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_remove">remove</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<b>mut</b> <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;, k: K): V
</code></pre>




<h2 id="sui_table_contains">Function <span class="code-inline">contains</span></h2>

Returns true if there is a value associated with the key <span class="code-inline">k: K</span> in table <span class="code-inline"><a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/table#sui_table_Table">Table</a>&lt;K, V&gt;</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_contains">contains</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;, k: K): bool
</code></pre>




<h2 id="sui_table_length">Function <span class="code-inline">length</span></h2>

Returns the size of the table, the number of key-value pairs


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_length">length</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;): u64
</code></pre>




<h2 id="sui_table_is_empty">Function <span class="code-inline">is_empty</span></h2>

Returns true if the table is empty (if <span class="code-inline"><a href="../sui_sui/table#sui_table_length">length</a></span> returns <span class="code-inline">0</span>)


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_is_empty">is_empty</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;): bool
</code></pre>




<h2 id="sui_table_destroy_empty">Function <span class="code-inline">destroy_empty</span></h2>

Destroys an empty table.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/table#sui_table_ETableNotEmpty">ETableNotEmpty</a></span> if the table still contains values


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_destroy_empty">destroy_empty</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: store&gt;(<a href="../sui_sui/table#sui_table">table</a>: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;)
</code></pre>




<h2 id="sui_table_drop">Function <span class="code-inline">drop</span></h2>

Drop a possibly non-empty table.<br/>
Usable only if the value type <span class="code-inline">V</span> has the <span class="code-inline"><a href="../sui_sui/table#sui_table_drop">drop</a></span> ability


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table#sui_table_drop">drop</a>&lt;K: <b>copy</b>, <a href="../sui_sui/table#sui_table_drop">drop</a>, store, V: <a href="../sui_sui/table#sui_table_drop">drop</a>, store&gt;(<a href="../sui_sui/table#sui_table">table</a>: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;K, V&gt;)
</code></pre>



