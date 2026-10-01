---
title: Module sui::url
sidebar_label: url
---

URL: standard Uniform Resource Locator string

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="sui_url_Url">Struct <span class="code-inline">Url</span></h2>

Standard Uniform Resource Locator (URL) string.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/url#sui_url_Url">Url</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/url#sui_url">url</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_url_new_unsafe">Function <span class="code-inline">new_unsafe</span></h2>

Create a <span class="code-inline"><a href="../sui_sui/url#sui_url_Url">Url</a></span>, with no validation


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_new_unsafe">new_unsafe</a>(<a href="../sui_sui/url#sui_url">url</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>
</code></pre>




<h2 id="sui_url_new_unsafe_from_bytes">Function <span class="code-inline">new_unsafe_from_bytes</span></h2>

Create a <span class="code-inline"><a href="../sui_sui/url#sui_url_Url">Url</a></span> with no validation from bytes.<br/>
Note: this will abort if <span class="code-inline">bytes</span> is not valid ASCII


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_new_unsafe_from_bytes">new_unsafe_from_bytes</a>(bytes: vector&lt;u8&gt;): <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>
</code></pre>




<h2 id="sui_url_inner_url">Function <span class="code-inline">inner_url</span></h2>

Get inner URL


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_inner_url">inner_url</a>(self: &<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="sui_url_update">Function <span class="code-inline">update</span></h2>

Update the inner URL


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_update">update</a>(self: &<b>mut</b> <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>, <a href="../sui_sui/url#sui_url">url</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>)
</code></pre>



