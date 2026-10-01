---
title: Module std::vector
sidebar_label: vector
---

A variable-sized container that can hold any type. Indexing is 0-based, and
vectors are growable. This module has many native functions.

<h2 id="@Constants_0">Constants</h2>

The index into the vector is out of bounds


<pre><code><b>const</b> <a href="../sui_std/vector#std_vector_EINDEX_OUT_OF_BOUNDS">EINDEX_OUT_OF_BOUNDS</a>: <a href="../sui_std/u64#std_u64">u64</a> = 131072;
</code></pre>


<h2 id="std_vector_length">Function <span class="code-inline">length</span></h2>

Return the length of the vector.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_length">length</a>&lt;Element&gt;(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_vector_borrow">Function <span class="code-inline">borrow</span></h2>

Acquire an immutable reference to the <span class="code-inline">i</span>th element of the vector <span class="code-inline">v</span>.<br/>
Aborts if <span class="code-inline">i</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_borrow">borrow</a>&lt;Element&gt;(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, i: <a href="../sui_std/u64#std_u64">u64</a>): &Element
</code></pre>




<h2 id="std_vector_push_back">Function <span class="code-inline">push_back</span></h2>

Add element <span class="code-inline">e</span> to the end of the vector <span class="code-inline">v</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_push_back">push_back</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, e: Element)
</code></pre>




<h2 id="std_vector_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Return a mutable reference to the <span class="code-inline">i</span>th element in the vector <span class="code-inline">v</span>.<br/>
Aborts if <span class="code-inline">i</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_borrow_mut">borrow_mut</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, i: <a href="../sui_std/u64#std_u64">u64</a>): &<b>mut</b> Element
</code></pre>




<h2 id="std_vector_pop_back">Function <span class="code-inline">pop_back</span></h2>

Pop an element from the end of vector <span class="code-inline">v</span>.<br/>
Aborts if <span class="code-inline">v</span> is empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_pop_back">pop_back</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;): Element
</code></pre>




<h2 id="std_vector_destroy_empty">Function <span class="code-inline">destroy_empty</span></h2>

Destroy the vector <span class="code-inline">v</span>.<br/>
Aborts if <span class="code-inline">v</span> is not empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_destroy_empty">destroy_empty</a>&lt;Element&gt;(v: <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;)
</code></pre>




<h2 id="std_vector_swap">Function <span class="code-inline">swap</span></h2>

Swaps the elements at the <span class="code-inline">i</span>th and <span class="code-inline">j</span>th indices in the vector <span class="code-inline">v</span>.<br/>
Aborts if <span class="code-inline">i</span> or <span class="code-inline">j</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_swap">swap</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, i: <a href="../sui_std/u64#std_u64">u64</a>, j: <a href="../sui_std/u64#std_u64">u64</a>)
</code></pre>




<h2 id="std_vector_reverse">Function <span class="code-inline">reverse</span></h2>

Reverses the order of the elements in the vector <span class="code-inline">v</span> in place.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_reverse">reverse</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;)
</code></pre>




<h2 id="std_vector_append">Function <span class="code-inline">append</span></h2>

Pushes all of the elements of the <span class="code-inline">other</span> vector into the <span class="code-inline">lhs</span> vector.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_append">append</a>&lt;Element&gt;(lhs: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, other: <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;)
</code></pre>




<h2 id="std_vector_is_empty">Function <span class="code-inline">is_empty</span></h2>

Return <span class="code-inline"><b>true</b></span> if the vector <span class="code-inline">v</span> has no elements and <span class="code-inline"><b>false</b></span> otherwise.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_is_empty">is_empty</a>&lt;Element&gt;(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_vector_contains">Function <span class="code-inline">contains</span></h2>

Return true if <span class="code-inline">e</span> is in the vector <span class="code-inline">v</span>.<br/>
Otherwise, returns false.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_contains">contains</a>&lt;Element&gt;(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, e: &Element): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_vector_index_of">Function <span class="code-inline">index_of</span></h2>

Return <span class="code-inline">(<b>true</b>, i)</span> if <span class="code-inline">e</span> is in the vector <span class="code-inline">v</span> at index <span class="code-inline">i</span>.<br/>
Otherwise, returns <span class="code-inline">(<b>false</b>, 0)</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_index_of">index_of</a>&lt;Element&gt;(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, e: &Element): (<a href="../sui_std/bool#std_bool">bool</a>, <a href="../sui_std/u64#std_u64">u64</a>)
</code></pre>




<h2 id="std_vector_remove">Function <span class="code-inline">remove</span></h2>

Remove the <span class="code-inline">i</span>th element of the vector <span class="code-inline">v</span>, shifting all subsequent elements.<br/>
This is O(n) and preserves ordering of elements in the vector.<br/>
Aborts if <span class="code-inline">i</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_remove">remove</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, i: <a href="../sui_std/u64#std_u64">u64</a>): Element
</code></pre>




<h2 id="std_vector_insert">Function <span class="code-inline">insert</span></h2>

Insert <span class="code-inline">e</span> at position <span class="code-inline">i</span> in the vector <span class="code-inline">v</span>.<br/>
If <span class="code-inline">i</span> is in bounds, this shifts the old <span class="code-inline">v[i]</span> and all subsequent elements to the right.<br/>
If <span class="code-inline">i == v.<a href="../sui_std/vector#std_vector_length">length</a>()</span>, this adds <span class="code-inline">e</span> to the end of the vector.<br/>
This is O(n) and preserves ordering of elements in the vector.<br/>
Aborts if <span class="code-inline">i &gt; v.<a href="../sui_std/vector#std_vector_length">length</a>()</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_insert">insert</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, e: Element, i: <a href="../sui_std/u64#std_u64">u64</a>)
</code></pre>




<h2 id="std_vector_swap_remove">Function <span class="code-inline">swap_remove</span></h2>

Swap the <span class="code-inline">i</span>th element of the vector <span class="code-inline">v</span> with the last element and then pop the vector.<br/>
This is O(1), but does not preserve ordering of elements in the vector.<br/>
Aborts if <span class="code-inline">i</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_swap_remove">swap_remove</a>&lt;Element&gt;(v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;, i: <a href="../sui_std/u64#std_u64">u64</a>): Element
</code></pre>




<h2 id="std_vector_skip">Function <span class="code-inline">skip</span></h2>

Return a new vector containing the elements of <span class="code-inline">v</span> except the first <span class="code-inline">n</span> elements.<br/>
If <span class="code-inline">n &gt; <a href="../sui_std/vector#std_vector_length">length</a></span>, returns an empty vector.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_skip">skip</a>&lt;T: drop&gt;(v: <a href="../sui_std/vector#std_vector">vector</a>&lt;T&gt;, n: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;T&gt;
</code></pre>




<h2 id="std_vector_take">Function <span class="code-inline">take</span></h2>

Take the first <span class="code-inline">n</span> elements of the vector <span class="code-inline">v</span> and drop the rest.<br/>
Aborts if <span class="code-inline">n</span> is greater than the length of <span class="code-inline">v</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_take">take</a>&lt;T: drop&gt;(v: <a href="../sui_std/vector#std_vector">vector</a>&lt;T&gt;, n: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;T&gt;
</code></pre>




<h2 id="std_vector_tabulate">Macro function <span class="code-inline">tabulate</span></h2>

Create a vector of length <span class="code-inline">n</span> by calling the function <span class="code-inline">f</span> on each index.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_tabulate">tabulate</a>&lt;$T&gt;($n: <a href="../sui_std/u64#std_u64">u64</a>, $f: |<a href="../sui_std/u64#std_u64">u64</a>| -&gt; $T): <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;
</code></pre>




<h2 id="std_vector_destroy">Macro function <span class="code-inline">destroy</span></h2>

Destroy the vector <span class="code-inline">v</span> by calling <span class="code-inline">f</span> on each element and then destroying the vector.<br/>
Does not preserve the order of elements in the vector (starts from the end of the vector).


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_destroy">destroy</a>&lt;$T, $R: drop&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_vector_do">Macro function <span class="code-inline">do</span></h2>

Destroy the vector <span class="code-inline">v</span> by calling <span class="code-inline">f</span> on each element and then destroying the vector.<br/>
Preserves the order of elements in the vector.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_do">do</a>&lt;$T, $R: drop&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_vector_do_ref">Macro function <span class="code-inline">do_ref</span></h2>

Perform an action <span class="code-inline">f</span> on each element of the vector <span class="code-inline">v</span>. The vector is not modified.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_do_ref">do_ref</a>&lt;$T, $R: drop&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; $R)
</code></pre>




<h2 id="std_vector_do_mut">Macro function <span class="code-inline">do_mut</span></h2>

Perform an action <span class="code-inline">f</span> on each element of the vector <span class="code-inline">v</span>.<br/>
The function <span class="code-inline">f</span> takes a mutable reference to the element.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_do_mut">do_mut</a>&lt;$T, $R: drop&gt;($v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&<b>mut</b> $T| -&gt; $R)
</code></pre>




<h2 id="std_vector_map">Macro function <span class="code-inline">map</span></h2>

Map the vector <span class="code-inline">v</span> to a new vector by applying the function <span class="code-inline">f</span> to each element.<br/>
Preserves the order of elements in the vector, first is called first.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_map">map</a>&lt;$T, $U&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |$T| -&gt; $U): <a href="../sui_std/vector#std_vector">vector</a>&lt;$U&gt;
</code></pre>




<h2 id="std_vector_map_ref">Macro function <span class="code-inline">map_ref</span></h2>

Map the vector <span class="code-inline">v</span> to a new vector by applying the function <span class="code-inline">f</span> to each element.<br/>
Preserves the order of elements in the vector, first is called first.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_map_ref">map_ref</a>&lt;$T, $U&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; $U): <a href="../sui_std/vector#std_vector">vector</a>&lt;$U&gt;
</code></pre>




<h2 id="std_vector_filter">Macro function <span class="code-inline">filter</span></h2>

Filter the vector <span class="code-inline">v</span> by applying the function <span class="code-inline">f</span> to each element.<br/>
Return a new vector containing only the elements for which <span class="code-inline">f</span> returns <span class="code-inline"><b>true</b></span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_filter">filter</a>&lt;$T: drop&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;
</code></pre>




<h2 id="std_vector_partition">Macro function <span class="code-inline">partition</span></h2>

Split the vector <span class="code-inline">v</span> into two vectors by applying the function <span class="code-inline">f</span> to each element.<br/>
Return a tuple containing two vectors: the first containing the elements for which <span class="code-inline">f</span> returns <span class="code-inline"><b>true</b></span>,
and the second containing the elements for which <span class="code-inline">f</span> returns <span class="code-inline"><b>false</b></span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_partition">partition</a>&lt;$T&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): (<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;)
</code></pre>




<h2 id="std_vector_find_index">Macro function <span class="code-inline">find_index</span></h2>

Finds the index of first element in the vector <span class="code-inline">v</span> that satisfies the predicate <span class="code-inline">f</span>.<br/>
Returns <span class="code-inline">some(index)</span> if such an element is found, otherwise <span class="code-inline">none()</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_find_index">find_index</a>&lt;$T&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/u64#std_u64">u64</a>&gt;
</code></pre>




<h2 id="std_vector_find_indices">Macro function <span class="code-inline">find_indices</span></h2>

Finds all indices of elements in the vector <span class="code-inline">v</span> that satisfy the predicate <span class="code-inline">f</span>.<br/>
Returns a vector of indices of all found elements.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_find_indices">find_indices</a>&lt;$T&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u64#std_u64">u64</a>&gt;
</code></pre>




<h2 id="std_vector_count">Macro function <span class="code-inline">count</span></h2>

Count how many elements in the vector <span class="code-inline">v</span> satisfy the predicate <span class="code-inline">f</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_count">count</a>&lt;$T&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_vector_fold">Macro function <span class="code-inline">fold</span></h2>

Reduce the vector <span class="code-inline">v</span> to a single value by applying the function <span class="code-inline">f</span> to each element.<br/>
Similar to <span class="code-inline">fold_left</span> in Rust and <span class="code-inline">reduce</span> in Python and JavaScript.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_fold">fold</a>&lt;$T, $Acc&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $init: $Acc, $f: |$Acc, $T| -&gt; $Acc): $Acc
</code></pre>




<h2 id="std_vector_flatten">Function <span class="code-inline">flatten</span></h2>

Concatenate the vectors of <span class="code-inline">v</span> into a single vector, keeping the order of the elements.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_flatten">flatten</a>&lt;T&gt;(v: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/vector#std_vector">vector</a>&lt;T&gt;&gt;): <a href="../sui_std/vector#std_vector">vector</a>&lt;T&gt;
</code></pre>




<h2 id="std_vector_any">Macro function <span class="code-inline">any</span></h2>

Whether any element in the vector <span class="code-inline">v</span> satisfies the predicate <span class="code-inline">f</span>.<br/>
If the vector is empty, returns <span class="code-inline"><b>false</b></span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_any">any</a>&lt;$T&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_vector_all">Macro function <span class="code-inline">all</span></h2>

Whether all elements in the vector <span class="code-inline">v</span> satisfy the predicate <span class="code-inline">f</span>.<br/>
If the vector is empty, returns <span class="code-inline"><b>true</b></span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_all">all</a>&lt;$T&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_vector_zip_do">Macro function <span class="code-inline">zip_do</span></h2>

Destroys two vectors <span class="code-inline">v1</span> and <span class="code-inline">v2</span> by calling <span class="code-inline">f</span> to each pair of elements.<br/>
Aborts if the vectors are not of the same length.<br/>
The order of elements in the vectors is preserved.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_zip_do">zip_do</a>&lt;$T1, $T2, $R: drop&gt;($v1: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T1&gt;, $v2: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T2&gt;, $f: |$T1, $T2| -&gt; $R)
</code></pre>




<h2 id="std_vector_zip_do_reverse">Macro function <span class="code-inline">zip_do_reverse</span></h2>

Destroys two vectors <span class="code-inline">v1</span> and <span class="code-inline">v2</span> by calling <span class="code-inline">f</span> to each pair of elements.<br/>
Aborts if the vectors are not of the same length.<br/>
Starts from the end of the vectors.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_zip_do_reverse">zip_do_reverse</a>&lt;$T1, $T2, $R: drop&gt;($v1: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T1&gt;, $v2: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T2&gt;, $f: |$T1, $T2| -&gt; $R)
</code></pre>




<h2 id="std_vector_zip_do_ref">Macro function <span class="code-inline">zip_do_ref</span></h2>

Iterate through <span class="code-inline">v1</span> and <span class="code-inline">v2</span> and apply the function <span class="code-inline">f</span> to references of each pair of
elements. The vectors are not modified.<br/>
Aborts if the vectors are not of the same length.<br/>
The order of elements in the vectors is preserved.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_zip_do_ref">zip_do_ref</a>&lt;$T1, $T2, $R: drop&gt;($v1: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T1&gt;, $v2: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T2&gt;, $f: |&$T1, &$T2| -&gt; $R)
</code></pre>




<h2 id="std_vector_zip_do_mut">Macro function <span class="code-inline">zip_do_mut</span></h2>

Iterate through <span class="code-inline">v1</span> and <span class="code-inline">v2</span> and apply the function <span class="code-inline">f</span> to mutable references of each pair
of elements. The vectors may be modified.<br/>
Aborts if the vectors are not of the same length.<br/>
The order of elements in the vectors is preserved.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_zip_do_mut">zip_do_mut</a>&lt;$T1, $T2, $R: drop&gt;($v1: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;$T1&gt;, $v2: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;$T2&gt;, $f: |&<b>mut</b> $T1, &<b>mut</b> $T2| -&gt; $R)
</code></pre>




<h2 id="std_vector_zip_map">Macro function <span class="code-inline">zip_map</span></h2>

Destroys two vectors <span class="code-inline">v1</span> and <span class="code-inline">v2</span> by applying the function <span class="code-inline">f</span> to each pair of elements.<br/>
The returned values are collected into a new vector.<br/>
Aborts if the vectors are not of the same length.<br/>
The order of elements in the vectors is preserved.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_zip_map">zip_map</a>&lt;$T1, $T2, $U&gt;($v1: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T1&gt;, $v2: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T2&gt;, $f: |$T1, $T2| -&gt; $U): <a href="../sui_std/vector#std_vector">vector</a>&lt;$U&gt;
</code></pre>




<h2 id="std_vector_zip_map_ref">Macro function <span class="code-inline">zip_map_ref</span></h2>

Iterate through <span class="code-inline">v1</span> and <span class="code-inline">v2</span> and apply the function <span class="code-inline">f</span> to references of each pair of
elements. The returned values are collected into a new vector.<br/>
Aborts if the vectors are not of the same length.<br/>
The order of elements in the vectors is preserved.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_zip_map_ref">zip_map_ref</a>&lt;$T1, $T2, $U&gt;($v1: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T1&gt;, $v2: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T2&gt;, $f: |&$T1, &$T2| -&gt; $U): <a href="../sui_std/vector#std_vector">vector</a>&lt;$U&gt;
</code></pre>




<h2 id="std_vector_insertion_sort_by">Macro function <span class="code-inline">insertion_sort_by</span></h2>

Performs an in-place insertion sort on the vector <span class="code-inline">v</span> using the comparison function <span class="code-inline">le</span>.<br/>
The sort is stable, meaning that equal elements will maintain their relative order.

Please, note that the comparison function <span class="code-inline">le</span> expects less or equal, not less.

Example:
```
let mut v = vector[2, 1, 3];
v.insertion_sort_by(|a, b| a <= b);
assert!(v == vector[1, 2, 3]);
```

Insertion sort is efficient for small vectors (~30 or less elements), and can
be faster than merge sort for almost sorted vectors (e.g. when the vector is
already sorted or nearly sorted).


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_insertion_sort_by">insertion_sort_by</a>&lt;$T&gt;($v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $le: |&$T, &$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>)
</code></pre>




<h2 id="std_vector_merge_sort_by">Macro function <span class="code-inline">merge_sort_by</span></h2>

Performs an in-place merge sort on the vector <span class="code-inline">v</span> using the comparison function <span class="code-inline">le</span>.<br/>
Merge sort is efficient for large vectors, and is a stable sort.

Please, note that the comparison function <span class="code-inline">le</span> expects less or equal, not less.

Example:
```
let mut v = vector[2, 1, 3];
v.merge_sort_by(|a, b| a <= b);
assert!(v == vector[1, 2, 3]);
```

Merge sort performs better than insertion sort for large vectors (~30 elements or more).


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_merge_sort_by">merge_sort_by</a>&lt;$T&gt;($v: &<b>mut</b> <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $le: |&$T, &$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>)
</code></pre>




<h2 id="std_vector_is_sorted_by">Macro function <span class="code-inline">is_sorted_by</span></h2>

Check if the vector <span class="code-inline">v</span> is sorted in non-decreasing order according to the comparison
function <span class="code-inline">le</span> (les). Returns <span class="code-inline"><b>true</b></span> if the vector is sorted, <span class="code-inline"><b>false</b></span> otherwise.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_is_sorted_by">is_sorted_by</a>&lt;$T&gt;($v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $le: |&$T, &$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_vector_take_while">Macro function <span class="code-inline">take_while</span></h2>

Return a new vector containing the elements of <span class="code-inline">v</span> except the first <span class="code-inline">n</span> elements
that satisfy the predicate <span class="code-inline">p</span>. If all elements satisfy the predicate, returns an
empty vector.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_take_while">take_while</a>&lt;$T: drop&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $p: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;
</code></pre>




<h2 id="std_vector_skip_while">Macro function <span class="code-inline">skip_while</span></h2>

Take all elements of the vector <span class="code-inline">v</span> except the first <span class="code-inline">n</span> elements that satisfy
the predicate <span class="code-inline">p</span> and drop the rest, where <span class="code-inline">n &lt;= v.<a href="../sui_std/vector#std_vector_length">length</a>()</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/vector#std_vector_skip_while">skip_while</a>&lt;$T: drop&gt;($v: <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;, $p: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;$T&gt;
</code></pre>




<h2 id="std_vector_empty">Function <span class="code-inline">empty</span></h2>

Create an empty vector.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_empty">empty</a>&lt;Element&gt;(): <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;
</code></pre>




<h2 id="std_vector_singleton">Function <span class="code-inline">singleton</span></h2>

Return an vector of size one containing element <span class="code-inline">e</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/vector#std_vector_singleton">singleton</a>&lt;Element&gt;(e: Element): <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;
</code></pre>



