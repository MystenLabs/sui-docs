---
title: Module sui::borrow
sidebar_label: borrow
---

A simple library that enables hot-potato-locked borrow mechanics.

With Programmable transactions, it is possible to borrow a value within
a transaction, use it and put back in the end. Hot-potato <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></span> makes
sure the object is returned and was not swapped for another one.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_borrow_Referent">Struct <span class="code-inline">Referent</span></h2>

An object wrapping a <span class="code-inline">T</span> and providing the borrow API.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>&lt;T: key, store&gt; <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">value: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;T&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_borrow_Borrow">Struct <span class="code-inline">Borrow</span></h2>

A hot potato making sure the object is put back once borrowed.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a>
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">ref: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">obj: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

The <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></span> does not match the <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></span>.


<pre><code><b>const</b> <a href="../sui_sui/borrow#sui_borrow_EWrongBorrow">EWrongBorrow</a>: u64 = 0;
</code></pre>

An attempt to swap the <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>.value</span> with another object of the same type.


<pre><code><b>const</b> <a href="../sui_sui/borrow#sui_borrow_EWrongValue">EWrongValue</a>: u64 = 1;
</code></pre>


<h2 id="sui_borrow_new">Function <span class="code-inline">new</span></h2>

Create a new <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></span> struct


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_new">new</a>&lt;T: key, store&gt;(value: T, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;
</code></pre>




<h2 id="sui_borrow_borrow">Function <span class="code-inline">borrow</span></h2>

Borrow the <span class="code-inline">T</span> from the <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></span>, receiving the <span class="code-inline">T</span> and a <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></span>
hot potato.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;): (T, <a href="../sui_sui/borrow#sui_borrow_Borrow">sui::borrow::Borrow</a>)
</code></pre>




<h2 id="sui_borrow_put_back">Function <span class="code-inline">put_back</span></h2>

Put an object and the <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></span> hot potato back.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_put_back">put_back</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;, value: T, <a href="../sui_sui/borrow#sui_borrow">borrow</a>: <a href="../sui_sui/borrow#sui_borrow_Borrow">sui::borrow::Borrow</a>)
</code></pre>




<h2 id="sui_borrow_destroy">Function <span class="code-inline">destroy</span></h2>

Unpack the <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></span> struct and return the value.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_destroy">destroy</a>&lt;T: key, store&gt;(self: <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;): T
</code></pre>



