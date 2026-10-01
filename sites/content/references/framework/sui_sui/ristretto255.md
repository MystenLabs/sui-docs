---
title: Module sui::ristretto255
sidebar_label: ristretto255
---

Group operations of BLS12-381.<br/>
Only available in devnet and testnet.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/group_ops#sui_group_ops">sui::group_ops</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
</code></pre>

<h2 id="sui_ristretto255_Scalar">Struct <span class="code-inline">Scalar</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">Scalar</a> <b>has</b> store
</code></pre>




<h2 id="sui_ristretto255_G">Struct <span class="code-inline">G</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/ristretto255#sui_ristretto255_G">G</a> <b>has</b> store
</code></pre>




<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/ristretto255#sui_ristretto255_SCALAR_ZERO_BYTES">SCALAR_ZERO_BYTES</a>: vector&lt;u8&gt; = vector[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ristretto255#sui_ristretto255_SCALAR_ONE_BYTES">SCALAR_ONE_BYTES</a>: vector&lt;u8&gt; = vector[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ristretto255#sui_ristretto255_IDENTITY_BYTES">IDENTITY_BYTES</a>: vector&lt;u8&gt; = vector[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ristretto255#sui_ristretto255_GENERATOR_BYTES">GENERATOR_BYTES</a>: vector&lt;u8&gt; = vector[226, 242, 174, 10, 106, 188, 78, 113, 168, 132, 169, 97, 197, 0, 81, 95, 88, 227, 11, 106, 165, 130, 221, 141, 182, 166, 89, 69, 224, 141, 45, 118];
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ristretto255#sui_ristretto255_SCALAR_TYPE">SCALAR_TYPE</a>: u8 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ristretto255#sui_ristretto255_G_TYPE">G_TYPE</a>: u8 = 6;
</code></pre>


<h2 id="sui_ristretto255_scalar_from_bytes">Function <span class="code-inline">scalar_from_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_from_bytes">scalar_from_bytes</a>(bytes: &vector&lt;u8&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_from_u64">Function <span class="code-inline">scalar_from_u64</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_from_u64">scalar_from_u64</a>(x: u64): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_zero">Function <span class="code-inline">scalar_zero</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_zero">scalar_zero</a>(): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_one">Function <span class="code-inline">scalar_one</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_one">scalar_one</a>(): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_add">Function <span class="code-inline">scalar_add</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_add">scalar_add</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_sub">Function <span class="code-inline">scalar_sub</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_sub">scalar_sub</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_mul">Function <span class="code-inline">scalar_mul</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_mul">scalar_mul</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_div">Function <span class="code-inline">scalar_div</span></h2>

Returns e2/e1, fails if a is zero.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_div">scalar_div</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_neg">Function <span class="code-inline">scalar_neg</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_neg">scalar_neg</a>(e: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_scalar_inv">Function <span class="code-inline">scalar_inv</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_scalar_inv">scalar_inv</a>(e: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_from_bytes">Function <span class="code-inline">g_from_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_from_bytes">g_from_bytes</a>(bytes: &vector&lt;u8&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_identity">Function <span class="code-inline">g_identity</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_identity">g_identity</a>(): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_generator">Function <span class="code-inline">g_generator</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_generator">g_generator</a>(): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_add">Function <span class="code-inline">g_add</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_add">g_add</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_sub">Function <span class="code-inline">g_sub</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_sub">g_sub</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_mul">Function <span class="code-inline">g_mul</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_mul">g_mul</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_div">Function <span class="code-inline">g_div</span></h2>

Returns e2 / e1, fails if scalar is zero.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_div">g_div</a>(e1: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_Scalar">sui::ristretto255::Scalar</a>&gt;, e2: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>




<h2 id="sui_ristretto255_g_neg">Function <span class="code-inline">g_neg</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ristretto255#sui_ristretto255_g_neg">g_neg</a>(e: &<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;): <a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;
</code></pre>



