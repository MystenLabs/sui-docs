---
title: Module sui::vec_map
sidebar_label: vec_map
---

<pre><code><b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="sui_vec_map_VecMap">Struct <span class="code-inline">VecMap</span></h2>

A map data structure backed by a vector. The map is guaranteed not to contain duplicate keys, but entries
are *not* sorted by key--entries are included in insertion order.<br/>
All operations are O(N) in the size of the map--the intention of this data structure is only to provide
the convenience of programming against a map API.<br/>
Large maps should use handwritten parent/child relationships instead.<br/>
Maps that need sorted iteration rather than insertion order iteration should also be handwritten.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">VecMap</a>&lt;K: <b>copy</b>, V&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">contents: vector&lt;<a href="../sui_sui/vec_map#sui_vec_map_Entry">sui::vec_map::Entry</a>&lt;K, V&gt;&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_vec_map_Entry">Struct <span class="code-inline">Entry</span></h2>

An entry in the map


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/vec_map#sui_vec_map_Entry">Entry</a>&lt;K: <b>copy</b>, V&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">key: K</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">value: V</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

This key already exists in the map


<pre><code><b>const</b> <a href="../sui_sui/vec_map#sui_vec_map_EKeyAlreadyExists">EKeyAlreadyExists</a>: u64 = 0;
</code></pre>

This key does not exist in the map


<pre><code><b>const</b> <a href="../sui_sui/vec_map#sui_vec_map_EKeyDoesNotExist">EKeyDoesNotExist</a>: u64 = 1;
</code></pre>

Trying to destroy a map that is not empty


<pre><code><b>const</b> <a href="../sui_sui/vec_map#sui_vec_map_EMapNotEmpty">EMapNotEmpty</a>: u64 = 2;
</code></pre>

Trying to access an element of the map at an invalid index


<pre><code><b>const</b> <a href="../sui_sui/vec_map#sui_vec_map_EIndexOutOfBounds">EIndexOutOfBounds</a>: u64 = 3;
</code></pre>

Trying to pop from a map that is empty


<pre><code><b>const</b> <a href="../sui_sui/vec_map#sui_vec_map_EMapEmpty">EMapEmpty</a>: u64 = 4;
</code></pre>

Trying to construct a map from keys and values of different lengths


<pre><code><b>const</b> <a href="../sui_sui/vec_map#sui_vec_map_EUnequalLengths">EUnequalLengths</a>: u64 = 5;
</code></pre>


<h2 id="sui_vec_map_empty">Function <span class="code-inline">empty</span></h2>

Create an empty <span class="code-inline"><a href="../sui_sui/vec_map#sui_vec_map_VecMap">VecMap</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_empty">empty</a>&lt;K: <b>copy</b>, V&gt;(): <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;
</code></pre>




<h2 id="sui_vec_map_insert">Function <span class="code-inline">insert</span></h2>

Insert the entry <span class="code-inline">key</span> |-> <span class="code-inline">value</span> into <span class="code-inline">self</span>.<br/>
Aborts if <span class="code-inline">key</span> is already bound in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_insert">insert</a>&lt;K: <b>copy</b>, V&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: K, value: V)
</code></pre>




<h2 id="sui_vec_map_remove">Function <span class="code-inline">remove</span></h2>

Remove the entry <span class="code-inline">key</span> |-> <span class="code-inline">value</span> from self. Aborts if <span class="code-inline">key</span> is not bound in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_remove">remove</a>&lt;K: <b>copy</b>, V&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: &K): (K, V)
</code></pre>




<h2 id="sui_vec_map_pop">Function <span class="code-inline">pop</span></h2>

Pop the most recently inserted entry from the map. Aborts if the map is empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_pop">pop</a>&lt;K: <b>copy</b>, V&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;): (K, V)
</code></pre>




<h2 id="sui_vec_map_get_mut">Function <span class="code-inline">get_mut</span></h2>

Get a mutable reference to the value bound to <span class="code-inline">key</span> in <span class="code-inline">self</span>.<br/>
Aborts if <span class="code-inline">key</span> is not bound in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_get_mut">get_mut</a>&lt;K: <b>copy</b>, V&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: &K): &<b>mut</b> V
</code></pre>




<h2 id="sui_vec_map_get">Function <span class="code-inline">get</span></h2>

Get a reference to the value bound to <span class="code-inline">key</span> in <span class="code-inline">self</span>.<br/>
Aborts if <span class="code-inline">key</span> is not bound in <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_get">get</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: &K): &V
</code></pre>




<h2 id="sui_vec_map_try_get">Function <span class="code-inline">try_get</span></h2>

Safely try borrow a value bound to <span class="code-inline">key</span> in <span class="code-inline">self</span>.<br/>
Return Some(V) if the value exists, None otherwise.<br/>
Only works for a "copyable" value as references cannot be stored in <span class="code-inline">vector</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_try_get">try_get</a>&lt;K: <b>copy</b>, V: <b>copy</b>&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: &K): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;V&gt;
</code></pre>




<h2 id="sui_vec_map_contains">Function <span class="code-inline">contains</span></h2>

Return true if <span class="code-inline">self</span> contains an entry for <span class="code-inline">key</span>, false otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_contains">contains</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: &K): bool
</code></pre>




<h2 id="sui_vec_map_length">Function <span class="code-inline">length</span></h2>

Return the number of entries in <span class="code-inline">self</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_length">length</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;): u64
</code></pre>




<h2 id="sui_vec_map_is_empty">Function <span class="code-inline">is_empty</span></h2>

Return true if <span class="code-inline">self</span> has 0 elements, false otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_is_empty">is_empty</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;): bool
</code></pre>




<h2 id="sui_vec_map_destroy_empty">Function <span class="code-inline">destroy_empty</span></h2>

Destroy an empty map. Aborts if <span class="code-inline">self</span> is not empty


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_destroy_empty">destroy_empty</a>&lt;K: <b>copy</b>, V&gt;(self: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;)
</code></pre>




<h2 id="sui_vec_map_into_keys_values">Function <span class="code-inline">into_keys_values</span></h2>

Unpack <span class="code-inline">self</span> into vectors of its keys and values.<br/>
The output keys and values are stored in insertion order, *not* sorted by key.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_into_keys_values">into_keys_values</a>&lt;K: <b>copy</b>, V&gt;(self: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;): (vector&lt;K&gt;, vector&lt;V&gt;)
</code></pre>




<h2 id="sui_vec_map_from_keys_values">Function <span class="code-inline">from_keys_values</span></h2>

Construct a new <span class="code-inline"><a href="../sui_sui/vec_map#sui_vec_map_VecMap">VecMap</a></span> from two vectors, one for keys and one for values.<br/>
The key value pairs are associated via their indices in the vectors, e.g. the key at index i
in <span class="code-inline"><a href="../sui_sui/vec_map#sui_vec_map_keys">keys</a></span> is associated with the value at index i in <span class="code-inline">values</span>.<br/>
The key value pairs are stored in insertion order (the original vectors ordering)
and are *not* sorted.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_from_keys_values">from_keys_values</a>&lt;K: <b>copy</b>, V&gt;(<a href="../sui_sui/vec_map#sui_vec_map_keys">keys</a>: vector&lt;K&gt;, values: vector&lt;V&gt;): <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;
</code></pre>




<h2 id="sui_vec_map_keys">Function <span class="code-inline">keys</span></h2>

Returns a list of keys in the map.<br/>
Do not assume any particular ordering.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_keys">keys</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;): vector&lt;K&gt;
</code></pre>




<h2 id="sui_vec_map_get_idx_opt">Function <span class="code-inline">get_idx_opt</span></h2>

Find the index of <span class="code-inline">key</span> in <span class="code-inline">self</span>. Return <span class="code-inline">None</span> if <span class="code-inline">key</span> is not in <span class="code-inline">self</span>.<br/>
Note that map entries are stored in insertion order, *not* sorted by key.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_get_idx_opt">get_idx_opt</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: &K): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;
</code></pre>




<h2 id="sui_vec_map_get_idx">Function <span class="code-inline">get_idx</span></h2>

Find the index of <span class="code-inline">key</span> in <span class="code-inline">self</span>. Aborts if <span class="code-inline">key</span> is not in <span class="code-inline">self</span>.<br/>
Note that map entries are stored in insertion order, *not* sorted by key.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_get_idx">get_idx</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, key: &K): u64
</code></pre>




<h2 id="sui_vec_map_get_entry_by_idx">Function <span class="code-inline">get_entry_by_idx</span></h2>

Return a reference to the <span class="code-inline">idx</span>th entry of <span class="code-inline">self</span>. This gives direct access into the backing array of the map--use with caution.<br/>
Note that map entries are stored in insertion order, *not* sorted by key.<br/>
Aborts if <span class="code-inline">idx</span> is greater than or equal to <span class="code-inline">self.<a href="../sui_sui/vec_map#sui_vec_map_length">length</a>()</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_get_entry_by_idx">get_entry_by_idx</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, idx: u64): (&K, &V)
</code></pre>




<h2 id="sui_vec_map_get_entry_by_idx_mut">Function <span class="code-inline">get_entry_by_idx_mut</span></h2>

Return a mutable reference to the <span class="code-inline">idx</span>th entry of <span class="code-inline">self</span>. This gives direct access into the backing array of the map--use with caution.<br/>
Note that map entries are stored in insertion order, *not* sorted by key.<br/>
Aborts if <span class="code-inline">idx</span> is greater than or equal to <span class="code-inline">self.<a href="../sui_sui/vec_map#sui_vec_map_length">length</a>()</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_get_entry_by_idx_mut">get_entry_by_idx_mut</a>&lt;K: <b>copy</b>, V&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, idx: u64): (&K, &<b>mut</b> V)
</code></pre>




<h2 id="sui_vec_map_remove_entry_by_idx">Function <span class="code-inline">remove_entry_by_idx</span></h2>

Remove the entry at index <span class="code-inline">idx</span> from self.<br/>
Aborts if <span class="code-inline">idx</span> is greater than or equal to <span class="code-inline">self.<a href="../sui_sui/vec_map#sui_vec_map_length">length</a>()</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_remove_entry_by_idx">remove_entry_by_idx</a>&lt;K: <b>copy</b>, V&gt;(self: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;, idx: u64): (K, V)
</code></pre>




<h2 id="sui_vec_map_size">Function <span class="code-inline">size</span></h2>

Return the number of entries in <span class="code-inline">self</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vec_map#sui_vec_map_size">size</a>&lt;K: <b>copy</b>, V&gt;(self: &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;K, V&gt;): u64
</code></pre>



