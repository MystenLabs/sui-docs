---
title: Module sui::bag
sidebar_label: bag
---

A bag is a heterogeneous map-like collection. The collection is similar to <span class="code-inline"><a href="../sui_sui/table#sui_table">sui::table</a></span> in that
its keys and values are not stored within the <span class="code-inline"><a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span> value, but instead are stored using Sui's
object system. The <span class="code-inline"><a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span> struct acts only as a handle into the object system to retrieve those
keys and values.<br/>
Note that this means that <span class="code-inline"><a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span> values with exactly the same key-value mapping will not be
equal, with <span class="code-inline">==</span>, at runtime. For example
```
let bag1 = bag::new();
let bag2 = bag::new();
bag::add(&mut bag1, 0, false);
bag::add(&mut bag1, 1, true);
bag::add(&mut bag2, 0, false);
bag::add(&mut bag2, 1, true);
// bag1 does not equal bag2, despite having the same entries
assert!(&bag1 != &bag2);
```
At it's core, <span class="code-inline"><a href="../sui_sui/bag#sui_bag">sui::bag</a></span> is a wrapper around <span class="code-inline">UID</span> that allows for access to
<span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a></span> while preventing accidentally stranding field values. A <span class="code-inline">UID</span> can be
deleted, even if it has dynamic fields associated with it, but a bag, on the other hand, must be
empty to be destroyed.

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

<h2 id="sui_bag_Bag">Struct <span class="code-inline">Bag</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/bag#sui_bag_Bag">Bag</a> <b>has</b> key, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
 the ID of this bag
</dd>
<dt>
<span class="code-inline">size: u64</span>
</dt>
<dd>
 the number of key-value pairs in the bag
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/bag#sui_bag_EBagNotEmpty">EBagNotEmpty</a>: u64 = 0;
</code></pre>


<h2 id="sui_bag_new">Function <span class="code-inline">new</span></h2>

Creates a new, empty bag


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_new">new</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>
</code></pre>




<h2 id="sui_bag_add">Function <span class="code-inline">add</span></h2>

Adds a key-value pair to the bag <span class="code-inline"><a href="../sui_sui/bag#sui_bag">bag</a>: &<b>mut</b> <a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">sui::dynamic_field::EFieldAlreadyExists</a></span> if the bag already has an entry with
that key <span class="code-inline">k: K</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_add">add</a>&lt;K: <b>copy</b>, drop, store, V: store&gt;(<a href="../sui_sui/bag#sui_bag">bag</a>: &<b>mut</b> <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>, k: K, v: V)
</code></pre>




<h2 id="sui_bag_borrow">Function <span class="code-inline">borrow</span></h2>

Immutable borrows the value associated with the key in the bag <span class="code-inline"><a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the bag does not have an entry with
that key <span class="code-inline">k: K</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">sui::dynamic_field::EFieldTypeMismatch</a></span> if the bag has an entry for the key, but
the value does not have the specified type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;K: <b>copy</b>, drop, store, V: store&gt;(<a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>, k: K): &V
</code></pre>




<h2 id="sui_bag_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Mutably borrows the value associated with the key in the bag <span class="code-inline"><a href="../sui_sui/bag#sui_bag">bag</a>: &<b>mut</b> <a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the bag does not have an entry with
that key <span class="code-inline">k: K</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">sui::dynamic_field::EFieldTypeMismatch</a></span> if the bag has an entry for the key, but
the value does not have the specified type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_borrow_mut">borrow_mut</a>&lt;K: <b>copy</b>, drop, store, V: store&gt;(<a href="../sui_sui/bag#sui_bag">bag</a>: &<b>mut</b> <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>, k: K): &<b>mut</b> V
</code></pre>




<h2 id="sui_bag_remove">Function <span class="code-inline">remove</span></h2>

Mutably borrows the key-value pair in the bag <span class="code-inline"><a href="../sui_sui/bag#sui_bag">bag</a>: &<b>mut</b> <a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span> and returns the value.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">sui::dynamic_field::EFieldDoesNotExist</a></span> if the bag does not have an entry with
that key <span class="code-inline">k: K</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">sui::dynamic_field::EFieldTypeMismatch</a></span> if the bag has an entry for the key, but
the value does not have the specified type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_remove">remove</a>&lt;K: <b>copy</b>, drop, store, V: store&gt;(<a href="../sui_sui/bag#sui_bag">bag</a>: &<b>mut</b> <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>, k: K): V
</code></pre>




<h2 id="sui_bag_contains">Function <span class="code-inline">contains</span></h2>

Returns true iff there is an value associated with the key <span class="code-inline">k: K</span> in the bag <span class="code-inline"><a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_contains">contains</a>&lt;K: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>, k: K): bool
</code></pre>




<h2 id="sui_bag_contains_with_type">Function <span class="code-inline">contains_with_type</span></h2>

Returns true iff there is an value associated with the key <span class="code-inline">k: K</span> in the bag <span class="code-inline"><a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">Bag</a></span>
with an assigned value of type <span class="code-inline">V</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_contains_with_type">contains_with_type</a>&lt;K: <b>copy</b>, drop, store, V: store&gt;(<a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>, k: K): bool
</code></pre>




<h2 id="sui_bag_length">Function <span class="code-inline">length</span></h2>

Returns the size of the bag, the number of key-value pairs


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_length">length</a>(<a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>): u64
</code></pre>




<h2 id="sui_bag_is_empty">Function <span class="code-inline">is_empty</span></h2>

Returns true iff the bag is empty (if <span class="code-inline"><a href="../sui_sui/bag#sui_bag_length">length</a></span> returns <span class="code-inline">0</span>)


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_is_empty">is_empty</a>(<a href="../sui_sui/bag#sui_bag">bag</a>: &<a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>): bool
</code></pre>




<h2 id="sui_bag_destroy_empty">Function <span class="code-inline">destroy_empty</span></h2>

Destroys an empty bag.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/bag#sui_bag_EBagNotEmpty">EBagNotEmpty</a></span> if the bag still contains values


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bag#sui_bag_destroy_empty">destroy_empty</a>(<a href="../sui_sui/bag#sui_bag">bag</a>: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>)
</code></pre>



