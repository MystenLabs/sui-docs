---
title: Module std::string
sidebar_label: string
---

The <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> module defines the <span class="code-inline"><a href="../sui_std/string#std_string_String">String</a></span> type which represents UTF8 encoded
strings.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="std_string_String">Struct <span class="code-inline">String</span></h2>

A <span class="code-inline"><a href="../sui_std/string#std_string_String">String</a></span> holds a sequence of bytes which is guaranteed to be in utf8
format.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/string#std_string_String">String</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_std/string#std_string_bytes">bytes</a>: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

An invalid UTF8 encoding.


<pre><code><b>const</b> <a href="../sui_std/string#std_string_EInvalidUTF8">EInvalidUTF8</a>: <a href="../sui_std/u64#std_u64">u64</a> = 1;
</code></pre>

Index out of range.


<pre><code><b>const</b> <a href="../sui_std/string#std_string_EInvalidIndex">EInvalidIndex</a>: <a href="../sui_std/u64#std_u64">u64</a> = 2;
</code></pre>


<h2 id="std_string_utf8">Function <span class="code-inline">utf8</span></h2>

Creates a new string from a sequence of bytes. Aborts if the bytes do
not represent valid utf8.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_utf8">utf8</a>(<a href="../sui_std/string#std_string_bytes">bytes</a>: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="std_string_from_ascii">Function <span class="code-inline">from_ascii</span></h2>

Convert an ASCII string to a UTF8 string


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_from_ascii">from_ascii</a>(s: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="std_string_to_ascii">Function <span class="code-inline">to_ascii</span></h2>

Convert an UTF8 string to an ASCII string.<br/>
Aborts if <span class="code-inline">s</span> is not valid ASCII


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_to_ascii">to_ascii</a>(s: <a href="../sui_std/string#std_string_String">std::string::String</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_string_try_utf8">Function <span class="code-inline">try_utf8</span></h2>

Tries to create a new string from a sequence of bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_try_utf8">try_utf8</a>(<a href="../sui_std/string#std_string_bytes">bytes</a>: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;
</code></pre>




<h2 id="std_string_as_bytes">Function <span class="code-inline">as_bytes</span></h2>

Returns a reference to the underlying byte vector.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_as_bytes">as_bytes</a>(s: &<a href="../sui_std/string#std_string_String">std::string::String</a>): &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>




<h2 id="std_string_into_bytes">Function <span class="code-inline">into_bytes</span></h2>

Unpack the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> to get its underlying bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_into_bytes">into_bytes</a>(s: <a href="../sui_std/string#std_string_String">std::string::String</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>




<h2 id="std_string_is_empty">Function <span class="code-inline">is_empty</span></h2>

Checks whether this string is empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_is_empty">is_empty</a>(s: &<a href="../sui_std/string#std_string_String">std::string::String</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_string_length">Function <span class="code-inline">length</span></h2>

Returns the length of this string, in bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_length">length</a>(s: &<a href="../sui_std/string#std_string_String">std::string::String</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_string_append">Function <span class="code-inline">append</span></h2>

Appends a string.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_append">append</a>(s: &<b>mut</b> <a href="../sui_std/string#std_string_String">std::string::String</a>, r: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="std_string_append_utf8">Function <span class="code-inline">append_utf8</span></h2>

Appends bytes which must be in valid utf8 format.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_append_utf8">append_utf8</a>(s: &<b>mut</b> <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_std/string#std_string_bytes">bytes</a>: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;)
</code></pre>




<h2 id="std_string_insert">Function <span class="code-inline">insert</span></h2>

Insert the other string at the byte index in given string. The index
must be at a valid utf8 char boundary.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_insert">insert</a>(s: &<b>mut</b> <a href="../sui_std/string#std_string_String">std::string::String</a>, at: <a href="../sui_std/u64#std_u64">u64</a>, o: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="std_string_substring">Function <span class="code-inline">substring</span></h2>

Returns a sub-string using the given byte indices, where <span class="code-inline">i</span> is the first
byte position and <span class="code-inline">j</span> is the start of the first byte not included (or the
length of the string). The indices must be at valid utf8 char boundaries,
guaranteeing that the result is valid utf8.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_substring">substring</a>(s: &<a href="../sui_std/string#std_string_String">std::string::String</a>, i: <a href="../sui_std/u64#std_u64">u64</a>, j: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="std_string_index_of">Function <span class="code-inline">index_of</span></h2>

Computes the index of the first occurrence of a string. Returns <span class="code-inline">s.<a href="../sui_std/string#std_string_length">length</a>()</span>
if no occurrence found.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_index_of">index_of</a>(s: &<a href="../sui_std/string#std_string_String">std::string::String</a>, r: &<a href="../sui_std/string#std_string_String">std::string::String</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_string_internal_check_utf8">Function <span class="code-inline">internal_check_utf8</span></h2>


<pre><code><b>fun</b> <a href="../sui_std/string#std_string_internal_check_utf8">internal_check_utf8</a>(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_string_internal_is_char_boundary">Function <span class="code-inline">internal_is_char_boundary</span></h2>


<pre><code><b>fun</b> <a href="../sui_std/string#std_string_internal_is_char_boundary">internal_is_char_boundary</a>(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;, i: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_string_internal_sub_string">Function <span class="code-inline">internal_sub_string</span></h2>


<pre><code><b>fun</b> <a href="../sui_std/string#std_string_internal_sub_string">internal_sub_string</a>(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;, i: <a href="../sui_std/u64#std_u64">u64</a>, j: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>




<h2 id="std_string_internal_index_of">Function <span class="code-inline">internal_index_of</span></h2>


<pre><code><b>fun</b> <a href="../sui_std/string#std_string_internal_index_of">internal_index_of</a>(v: &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;, r: &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_string_bytes">Function <span class="code-inline">bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_bytes">bytes</a>(s: &<a href="../sui_std/string#std_string_String">std::string::String</a>): &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>




<h2 id="std_string_sub_string">Function <span class="code-inline">sub_string</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string_sub_string">sub_string</a>(s: &<a href="../sui_std/string#std_string_String">std::string::String</a>, i: <a href="../sui_std/u64#std_u64">u64</a>, j: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>



