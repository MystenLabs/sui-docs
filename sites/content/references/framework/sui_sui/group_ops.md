---
title: Module sui::group_ops
sidebar_label: group_ops
---

Generic Move and native functions for group operations.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
</code></pre>

<h2 id="sui_group_ops_Element">Struct <span class="code-inline">Element</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/group_ops#sui_group_ops_Element">Element</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/group_ops#sui_group_ops_bytes">bytes</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/group_ops#sui_group_ops_ENotSupported">ENotSupported</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/group_ops#sui_group_ops_EInvalidInput">EInvalidInput</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/group_ops#sui_group_ops_EInputTooLong">EInputTooLong</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/group_ops#sui_group_ops_EInvalidBufferLength">EInvalidBufferLength</a>: u64 = 3;
</code></pre>


<h2 id="sui_group_ops_bytes">Function <span class="code-inline">bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_bytes">bytes</a>&lt;G&gt;(e: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_equal">Function <span class="code-inline">equal</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_equal">equal</a>&lt;G&gt;(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;): bool
</code></pre>




<h2 id="sui_group_ops_from_bytes">Function <span class="code-inline">from_bytes</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_from_bytes">from_bytes</a>&lt;G&gt;(type_: u8, <a href="../sui_sui/group_ops#sui_group_ops_bytes">bytes</a>: vector&lt;u8&gt;, is_trusted: bool): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_add">Function <span class="code-inline">add</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_add">add</a>&lt;G&gt;(type_: u8, e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_sub">Function <span class="code-inline">sub</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_sub">sub</a>&lt;G&gt;(type_: u8, e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_mul">Function <span class="code-inline">mul</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_mul">mul</a>&lt;S, G&gt;(type_: u8, scalar: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;S&gt;, e: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_div">Function <span class="code-inline">div</span></h2>

Fails if scalar = 0. Else returns 1/scalar * e.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_div">div</a>&lt;S, G&gt;(type_: u8, scalar: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;S&gt;, e: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_hash_to">Function <span class="code-inline">hash_to</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_hash_to">hash_to</a>&lt;G&gt;(type_: u8, m: &vector&lt;u8&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_multi_scalar_multiplication">Function <span class="code-inline">multi_scalar_multiplication</span></h2>

Aborts with <span class="code-inline"><a href="../sui_sui/group_ops#sui_group_ops_EInputTooLong">EInputTooLong</a></span> if the vectors are too long.

This function is currently only enabled on Devnet.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_multi_scalar_multiplication">multi_scalar_multiplication</a>&lt;S, G&gt;(type_: u8, scalars: &vector&lt;<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;S&gt;&gt;, elements: &vector&lt;<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_pairing">Function <span class="code-inline">pairing</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_pairing">pairing</a>&lt;G1, G2, G3&gt;(type_: u8, e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G1&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G2&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G3&gt;
</code></pre>




<h2 id="sui_group_ops_convert">Function <span class="code-inline">convert</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_convert">convert</a>&lt;From, To&gt;(from_type_: u8, to_type_: u8, e: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;From&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;To&gt;
</code></pre>




<h2 id="sui_group_ops_sum">Function <span class="code-inline">sum</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_sum">sum</a>&lt;G&gt;(type_: u8, terms: &vector&lt;<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;G&gt;
</code></pre>




<h2 id="sui_group_ops_internal_validate">Function <span class="code-inline">internal_validate</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_validate">internal_validate</a>(type_: u8, <a href="../sui_sui/group_ops#sui_group_ops_bytes">bytes</a>: &vector&lt;u8&gt;): bool
</code></pre>




<h2 id="sui_group_ops_internal_add">Function <span class="code-inline">internal_add</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_add">internal_add</a>(type_: u8, e1: &vector&lt;u8&gt;, e2: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_sub">Function <span class="code-inline">internal_sub</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_sub">internal_sub</a>(type_: u8, e1: &vector&lt;u8&gt;, e2: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_mul">Function <span class="code-inline">internal_mul</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_mul">internal_mul</a>(type_: u8, e1: &vector&lt;u8&gt;, e2: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_div">Function <span class="code-inline">internal_div</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_div">internal_div</a>(type_: u8, e1: &vector&lt;u8&gt;, e2: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_hash_to">Function <span class="code-inline">internal_hash_to</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_hash_to">internal_hash_to</a>(type_: u8, m: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_multi_scalar_mul">Function <span class="code-inline">internal_multi_scalar_mul</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_multi_scalar_mul">internal_multi_scalar_mul</a>(type_: u8, scalars: &vector&lt;u8&gt;, elements: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_pairing">Function <span class="code-inline">internal_pairing</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_pairing">internal_pairing</a>(type_: u8, e1: &vector&lt;u8&gt;, e2: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_convert">Function <span class="code-inline">internal_convert</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_convert">internal_convert</a>(from_type_: u8, to_type_: u8, e: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_internal_sum">Function <span class="code-inline">internal_sum</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_internal_sum">internal_sum</a>(type_: u8, e: &vector&lt;vector&lt;u8&gt;&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_group_ops_set_as_prefix">Function <span class="code-inline">set_as_prefix</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/group_ops#sui_group_ops_set_as_prefix">set_as_prefix</a>(x: u64, big_endian: bool, buffer: &<b>mut</b> vector&lt;u8&gt;)
</code></pre>



