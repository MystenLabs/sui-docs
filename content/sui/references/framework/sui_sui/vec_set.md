---
title: Module sui::vec_set
sidebar_label: vec_set
---

<pre><code><b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="sui_vec_set_VecSet">Struct <span class="code-inline">VecSet</span></h2>

A set data structure backed by a vector. The set is guaranteed not to
contain duplicate keys. All operations are O(N) in the size of the set
- the intention of this data structure is only to provide the convenience
of programming against a set API. Sets that need sorted iteration rather
than insertion order iteration should be handwritten.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/vec_set#sui_vec_set_VecSet">VecSet</a>&lt;K: <b>copy</b>, drop&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">contents: vector&lt;K&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

This key already exists in the map


<pre><code><b>const</b> <a href="../sui_sui/vec_set#sui_vec_set_EKeyAlreadyExists">EKeyAlreadyExists</a>: u64 = 0;
</code></pre>

This key does not exist in the map


<pre><code><b>const</b> <a href="../sui_sui/vec_set#sui_vec_set_EKeyDoesNotExist">EKeyDoesNotExist</a>: u64 = 1;
</code></pre>


<h2 id="sui_vec_set_empty">Function <span class="code-inline">empty</span></h2>

Create an empty <span class="code-inline"><a href="../sui_sui/vec_set#sui_vec_set_VecSet">VecSet</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_empty">empty</a>&lt;K: <b>copy</b>, drop&gt;(): <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;
</code></pre>




<h2 id="sui_vec_set_singleton">Function <span class="code-inline">singleton</span></h2>

Create a singleton <span class="code-inline"><a href="../sui_sui/vec_set#sui_vec_set_VecSet">VecSet</a></span> that only contains one element.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_singleton">singleton</a>&lt;K: <b>copy</b>, drop&gt;(key: K): <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;
</code></pre>




<h2 id="sui_vec_set_insert">Function <span class="code-inline">insert</span></h2>

Insert a <span class="code-inline">key</span> into self.<br/>
Aborts if <span class="code-inline">key</span> is already present in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_insert">insert</a>&lt;K: <b>copy</b>, drop&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;, key: K)
</code></pre>




<h2 id="sui_vec_set_remove">Function <span class="code-inline">remove</span></h2>

Remove the entry <span class="code-inline">key</span> from self. Aborts if <span class="code-inline">key</span> is not present in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_remove">remove</a>&lt;K: <b>copy</b>, drop&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;, key: &K)
</code></pre>




<h2 id="sui_vec_set_contains">Function <span class="code-inline">contains</span></h2>

Return true if <span class="code-inline">self</span> contains an entry for <span class="code-inline">key</span>, false otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_contains">contains</a>&lt;K: <b>copy</b>, drop&gt;(self: &<a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;, key: &K): bool
</code></pre>




<h2 id="sui_vec_set_length">Function <span class="code-inline">length</span></h2>

Return the number of entries in <span class="code-inline">self</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_length">length</a>&lt;K: <b>copy</b>, drop&gt;(self: &<a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;): u64
</code></pre>




<h2 id="sui_vec_set_is_empty">Function <span class="code-inline">is_empty</span></h2>

Return true if <span class="code-inline">self</span> has 0 elements, false otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_is_empty">is_empty</a>&lt;K: <b>copy</b>, drop&gt;(self: &<a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;): bool
</code></pre>




<h2 id="sui_vec_set_into_keys">Function <span class="code-inline">into_keys</span></h2>

Unpack <span class="code-inline">self</span> into vectors of keys.<br/>
The output keys are stored in insertion order, *not* sorted.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_into_keys">into_keys</a>&lt;K: <b>copy</b>, drop&gt;(self: <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;): vector&lt;K&gt;
</code></pre>




<h2 id="sui_vec_set_from_keys">Function <span class="code-inline">from_keys</span></h2>

Construct a new <span class="code-inline"><a href="../sui_sui/vec_set#sui_vec_set_VecSet">VecSet</a></span> from a vector of keys.<br/>
The keys are stored in insertion order (the original <span class="code-inline"><a href="../sui_sui/vec_set#sui_vec_set_keys">keys</a></span> ordering)
and are *not* sorted.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_from_keys">from_keys</a>&lt;K: <b>copy</b>, drop&gt;(<a href="../sui_sui/vec_set#sui_vec_set_keys">keys</a>: vector&lt;K&gt;): <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;
</code></pre>




<h2 id="sui_vec_set_keys">Function <span class="code-inline">keys</span></h2>

Borrow the <span class="code-inline">contents</span> of the <span class="code-inline"><a href="../sui_sui/vec_set#sui_vec_set_VecSet">VecSet</a></span> to access content by index
without unpacking. The contents are stored in insertion order,
*not* sorted.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_keys">keys</a>&lt;K: <b>copy</b>, drop&gt;(self: &<a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;): &vector&lt;K&gt;
</code></pre>




<h2 id="sui_vec_set_size">Function <span class="code-inline">size</span></h2>

Return the number of entries in <span class="code-inline">self</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_set#sui_vec_set_size">size</a>&lt;K: <b>copy</b>, drop&gt;(self: &<a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;K&gt;): u64
</code></pre>



