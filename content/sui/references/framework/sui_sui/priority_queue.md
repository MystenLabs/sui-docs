---
title: Module sui::priority_queue
sidebar_label: priority_queue
---

Priority queue implemented using a max heap.

<pre><code><b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="sui_priority_queue_PriorityQueue">Struct <span class="code-inline">PriorityQueue</span></h2>

Struct representing a priority queue. The <span class="code-inline">entries</span> vector represents a max
heap structure, where entries[0] is the root, entries[1] and entries[2] are the
left child and right child of the root, etc. More generally, the children of
entries[i] are at i * 2 + 1 and i * 2 + 2. The max heap should have the invariant
that the parent node's priority is always higher than its child nodes' priorities.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/priority_queue#sui_priority_queue_PriorityQueue">PriorityQueue</a>&lt;T: drop&gt; <b>has</b> drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">entries: vector&lt;<a href="../sui_sui/priority_queue#sui_priority_queue_Entry">sui::priority_queue::Entry</a>&lt;T&gt;&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_priority_queue_Entry">Struct <span class="code-inline">Entry</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/priority_queue#sui_priority_queue_Entry">Entry</a>&lt;T: drop&gt; <b>has</b> drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">priority: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">value: T</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

For when heap is empty and there's no data to pop.


<pre><code><b>const</b> <a href="../sui_sui/priority_queue#sui_priority_queue_EPopFromEmptyHeap">EPopFromEmptyHeap</a>: u64 = 0;
</code></pre>

For when the value vector and priority vector have mismatched lengths


<pre><code><b>const</b> <a href="../sui_sui/priority_queue#sui_priority_queue_ELengthMismatch">ELengthMismatch</a>: u64 = 1;
</code></pre>

For when access a node of a priority_queue at an invalid index


<pre><code><b>const</b> <a href="../sui_sui/priority_queue#sui_priority_queue_EIndexOutOfBounds">EIndexOutOfBounds</a>: u64 = 2;
</code></pre>


<h2 id="sui_priority_queue_new">Function <span class="code-inline">new</span></h2>

Create a new priority queue from the input entry vectors.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_new">new</a>&lt;T: drop&gt;(entries: vector&lt;<a href="../sui_sui/priority_queue#sui_priority_queue_Entry">sui::priority_queue::Entry</a>&lt;T&gt;&gt;): <a href="../sui_sui/priority_queue#sui_priority_queue_PriorityQueue">sui::priority_queue::PriorityQueue</a>&lt;T&gt;
</code></pre>




<h2 id="sui_priority_queue_pop_max">Function <span class="code-inline">pop_max</span></h2>

Pop the entry with the highest priority value.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_pop_max">pop_max</a>&lt;T: drop&gt;(pq: &<b>mut</b> <a href="../sui_sui/priority_queue#sui_priority_queue_PriorityQueue">sui::priority_queue::PriorityQueue</a>&lt;T&gt;): (u64, T)
</code></pre>




<h2 id="sui_priority_queue_insert">Function <span class="code-inline">insert</span></h2>

Insert a new entry into the queue.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_insert">insert</a>&lt;T: drop&gt;(pq: &<b>mut</b> <a href="../sui_sui/priority_queue#sui_priority_queue_PriorityQueue">sui::priority_queue::PriorityQueue</a>&lt;T&gt;, priority: u64, value: T)
</code></pre>




<h2 id="sui_priority_queue_new_entry">Function <span class="code-inline">new_entry</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_new_entry">new_entry</a>&lt;T: drop&gt;(priority: u64, value: T): <a href="../sui_sui/priority_queue#sui_priority_queue_Entry">sui::priority_queue::Entry</a>&lt;T&gt;
</code></pre>




<h2 id="sui_priority_queue_create_entries">Function <span class="code-inline">create_entries</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_create_entries">create_entries</a>&lt;T: drop&gt;(p: vector&lt;u64&gt;, v: vector&lt;T&gt;): vector&lt;<a href="../sui_sui/priority_queue#sui_priority_queue_Entry">sui::priority_queue::Entry</a>&lt;T&gt;&gt;
</code></pre>




<h2 id="sui_priority_queue_restore_heap_recursive">Function <span class="code-inline">restore_heap_recursive</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_restore_heap_recursive">restore_heap_recursive</a>&lt;T: drop&gt;(v: &<b>mut</b> vector&lt;<a href="../sui_sui/priority_queue#sui_priority_queue_Entry">sui::priority_queue::Entry</a>&lt;T&gt;&gt;, i: u64)
</code></pre>




<h2 id="sui_priority_queue_max_heapify_recursive">Function <span class="code-inline">max_heapify_recursive</span></h2>

Max heapify the subtree whose root is at index <span class="code-inline">i</span>. That means after this function
finishes, the subtree should have the property that the parent node has higher priority
than both child nodes.<br/>
This function assumes that all the other nodes in the subtree (nodes other than the root)
do satisfy the max heap property.


<pre><code><b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_max_heapify_recursive">max_heapify_recursive</a>&lt;T: drop&gt;(v: &<b>mut</b> vector&lt;<a href="../sui_sui/priority_queue#sui_priority_queue_Entry">sui::priority_queue::Entry</a>&lt;T&gt;&gt;, len: u64, i: u64)
</code></pre>




<h2 id="sui_priority_queue_priorities">Function <span class="code-inline">priorities</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/priority_queue#sui_priority_queue_priorities">priorities</a>&lt;T: drop&gt;(pq: &<a href="../sui_sui/priority_queue#sui_priority_queue_PriorityQueue">sui::priority_queue::PriorityQueue</a>&lt;T&gt;): vector&lt;u64&gt;
</code></pre>



