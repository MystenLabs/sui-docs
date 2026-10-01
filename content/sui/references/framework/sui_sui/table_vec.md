---
title: Module sui::table_vec
sidebar_label: table_vec
---

A basic scalable vector library implemented using <span class="code-inline">Table</span>.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_table_vec_TableVec">Struct <span class="code-inline">TableVec</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/table_vec#sui_table_vec_TableVec">TableVec</a>&lt;<b>phantom</b> Element: store&gt; <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">contents: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;u64, Element&gt;</span>
</dt>
<dd>
 The contents of the table vector.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/table_vec#sui_table_vec_EIndexOutOfBound">EIndexOutOfBound</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/table_vec#sui_table_vec_ETableNonEmpty">ETableNonEmpty</a>: u64 = 1;
</code></pre>


<h2 id="sui_table_vec_empty">Function <span class="code-inline">empty</span></h2>

Create an empty TableVec.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_empty">empty</a>&lt;Element: store&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;
</code></pre>




<h2 id="sui_table_vec_singleton">Function <span class="code-inline">singleton</span></h2>

Return a TableVec of size one containing element <span class="code-inline">e</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_singleton">singleton</a>&lt;Element: store&gt;(e: Element, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;
</code></pre>




<h2 id="sui_table_vec_length">Function <span class="code-inline">length</span></h2>

Return the length of the TableVec.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_length">length</a>&lt;Element: store&gt;(t: &<a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;): u64
</code></pre>




<h2 id="sui_table_vec_is_empty">Function <span class="code-inline">is_empty</span></h2>

Return if the TableVec is empty or not.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_is_empty">is_empty</a>&lt;Element: store&gt;(t: &<a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;): bool
</code></pre>




<h2 id="sui_table_vec_borrow">Function <span class="code-inline">borrow</span></h2>

Acquire an immutable reference to the <span class="code-inline">i</span>th element of the TableVec <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">i</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;Element: store&gt;(t: &<a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;, i: u64): &Element
</code></pre>




<h2 id="sui_table_vec_push_back">Function <span class="code-inline">push_back</span></h2>

Add element <span class="code-inline">e</span> to the end of the TableVec <span class="code-inline">t</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_push_back">push_back</a>&lt;Element: store&gt;(t: &<b>mut</b> <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;, e: Element)
</code></pre>




<h2 id="sui_table_vec_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Return a mutable reference to the <span class="code-inline">i</span>th element in the TableVec <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">i</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_borrow_mut">borrow_mut</a>&lt;Element: store&gt;(t: &<b>mut</b> <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;, i: u64): &<b>mut</b> Element
</code></pre>




<h2 id="sui_table_vec_pop_back">Function <span class="code-inline">pop_back</span></h2>

Pop an element from the end of TableVec <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">t</span> is empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_pop_back">pop_back</a>&lt;Element: store&gt;(t: &<b>mut</b> <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;): Element
</code></pre>




<h2 id="sui_table_vec_destroy_empty">Function <span class="code-inline">destroy_empty</span></h2>

Destroy the TableVec <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">t</span> is not empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_destroy_empty">destroy_empty</a>&lt;Element: store&gt;(t: <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;)
</code></pre>




<h2 id="sui_table_vec_drop">Function <span class="code-inline">drop</span></h2>

Drop a possibly non-empty TableVec <span class="code-inline">t</span>.<br/>
Usable only if the value type <span class="code-inline">Element</span> has the <span class="code-inline"><a href="../sui_sui/table_vec#sui_table_vec_drop">drop</a></span> ability


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_drop">drop</a>&lt;Element: <a href="../sui_sui/table_vec#sui_table_vec_drop">drop</a>, store&gt;(t: <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;)
</code></pre>




<h2 id="sui_table_vec_swap">Function <span class="code-inline">swap</span></h2>

Swaps the elements at the <span class="code-inline">i</span>th and <span class="code-inline">j</span>th indices in the TableVec <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">i</span> or <span class="code-inline">j</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_swap">swap</a>&lt;Element: store&gt;(t: &<b>mut</b> <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;, i: u64, j: u64)
</code></pre>




<h2 id="sui_table_vec_swap_remove">Function <span class="code-inline">swap_remove</span></h2>

Swap the <span class="code-inline">i</span>th element of the TableVec <span class="code-inline">t</span> with the last element and then pop the TableVec.<br/>
This is O(1), but does not preserve ordering of elements in the TableVec.<br/>
Aborts if <span class="code-inline">i</span> is out of bounds.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/table_vec#sui_table_vec_swap_remove">swap_remove</a>&lt;Element: store&gt;(t: &<b>mut</b> <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;Element&gt;, i: u64): Element
</code></pre>



