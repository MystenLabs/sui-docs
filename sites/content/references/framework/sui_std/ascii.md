---
title: Module std::ascii
sidebar_label: ascii
---

The <span class="code-inline">ASCII</span> module defines basic string and char newtypes in Move that verify
that characters are valid ASCII, and that strings consist of only valid ASCII characters.

<pre><code><b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="std_ascii_String">Struct <span class="code-inline">String</span></h2>

The <span class="code-inline"><a href="../sui_std/ascii#std_ascii_String">String</a></span> struct holds a vector of bytes that all represent
valid ASCII characters. Note that these ASCII characters may not all
be printable. To determine if a <span class="code-inline"><a href="../sui_std/ascii#std_ascii_String">String</a></span> contains only "printable"
characters you should use the <span class="code-inline"><a href="../sui_std/ascii#std_ascii_all_characters_printable">all_characters_printable</a></span> predicate
defined in this module.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/ascii#std_ascii_String">String</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">bytes: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="std_ascii_Char">Struct <span class="code-inline">Char</span></h2>

An ASCII character.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/ascii#std_ascii_Char">Char</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_std/ascii#std_ascii_byte">byte</a>: <a href="../sui_std/u8#std_u8">u8</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

An invalid ASCII character was encountered when creating an ASCII string.


<pre><code><b>const</b> <a href="../sui_std/ascii#std_ascii_EInvalidASCIICharacter">EInvalidASCIICharacter</a>: <a href="../sui_std/u64#std_u64">u64</a> = 65536;
</code></pre>

An invalid index was encountered when creating a substring.


<pre><code><b>const</b> <a href="../sui_std/ascii#std_ascii_EInvalidIndex">EInvalidIndex</a>: <a href="../sui_std/u64#std_u64">u64</a> = 65537;
</code></pre>


<h2 id="std_ascii_char">Function <span class="code-inline">char</span></h2>

Convert a <span class="code-inline"><a href="../sui_std/ascii#std_ascii_byte">byte</a></span> into a <span class="code-inline"><a href="../sui_std/ascii#std_ascii_Char">Char</a></span> that is checked to make sure it is valid ASCII.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_char">char</a>(<a href="../sui_std/ascii#std_ascii_byte">byte</a>: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/ascii#std_ascii_Char">std::ascii::Char</a>
</code></pre>




<h2 id="std_ascii_string">Function <span class="code-inline">string</span></h2>

Convert a vector of bytes <span class="code-inline">bytes</span> into an <span class="code-inline"><a href="../sui_std/ascii#std_ascii_String">String</a></span>. Aborts if
<span class="code-inline">bytes</span> contains non-ASCII characters.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/string#std_string">string</a>(bytes: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_ascii_try_string">Function <span class="code-inline">try_string</span></h2>

Convert a vector of bytes <span class="code-inline">bytes</span> into an <span class="code-inline"><a href="../sui_std/ascii#std_ascii_String">String</a></span>. Returns
<span class="code-inline">Some(&lt;ascii_string&gt;)</span> if the <span class="code-inline">bytes</span> contains all valid ASCII
characters. Otherwise returns <span class="code-inline">None</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_try_string">try_string</a>(bytes: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>&gt;
</code></pre>




<h2 id="std_ascii_all_characters_printable">Function <span class="code-inline">all_characters_printable</span></h2>

Returns <span class="code-inline"><b>true</b></span> if all characters in <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> are printable characters.<br/>
Returns <span class="code-inline"><b>false</b></span> otherwise. Not all <span class="code-inline"><a href="../sui_std/ascii#std_ascii_String">String</a></span>s are printable strings.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_all_characters_printable">all_characters_printable</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_ascii_push_char">Function <span class="code-inline">push_char</span></h2>

Push a <span class="code-inline"><a href="../sui_std/ascii#std_ascii_Char">Char</a></span> to the end of the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_push_char">push_char</a>(<a href="../sui_std/string#std_string">string</a>: &<b>mut</b> <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, <a href="../sui_std/ascii#std_ascii_char">char</a>: <a href="../sui_std/ascii#std_ascii_Char">std::ascii::Char</a>)
</code></pre>




<h2 id="std_ascii_pop_char">Function <span class="code-inline">pop_char</span></h2>

Pop a <span class="code-inline"><a href="../sui_std/ascii#std_ascii_Char">Char</a></span> from the end of the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_pop_char">pop_char</a>(<a href="../sui_std/string#std_string">string</a>: &<b>mut</b> <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/ascii#std_ascii_Char">std::ascii::Char</a>
</code></pre>




<h2 id="std_ascii_length">Function <span class="code-inline">length</span></h2>

Returns the length of the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> in bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_length">length</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_ascii_append">Function <span class="code-inline">append</span></h2>

Append the <span class="code-inline">other</span> string to the end of <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_append">append</a>(<a href="../sui_std/string#std_string">string</a>: &<b>mut</b> <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, other: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>)
</code></pre>




<h2 id="std_ascii_insert">Function <span class="code-inline">insert</span></h2>

Insert the <span class="code-inline">other</span> string at the <span class="code-inline">at</span> index of <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_insert">insert</a>(s: &<b>mut</b> <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, at: <a href="../sui_std/u64#std_u64">u64</a>, o: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>)
</code></pre>




<h2 id="std_ascii_substring">Function <span class="code-inline">substring</span></h2>

Copy the slice of the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> from <span class="code-inline">i</span> to <span class="code-inline">j</span> into a new <span class="code-inline"><a href="../sui_std/ascii#std_ascii_String">String</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_substring">substring</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, i: <a href="../sui_std/u64#std_u64">u64</a>, j: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_ascii_as_bytes">Function <span class="code-inline">as_bytes</span></h2>

Get the inner bytes of the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> as a reference


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_as_bytes">as_bytes</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): &<a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>




<h2 id="std_ascii_into_bytes">Function <span class="code-inline">into_bytes</span></h2>

Unpack the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> to get its backing bytes


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_into_bytes">into_bytes</a>(<a href="../sui_std/string#std_string">string</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>




<h2 id="std_ascii_byte">Function <span class="code-inline">byte</span></h2>

Unpack the <span class="code-inline"><a href="../sui_std/ascii#std_ascii_char">char</a></span> into its underlying bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_byte">byte</a>(<a href="../sui_std/ascii#std_ascii_char">char</a>: <a href="../sui_std/ascii#std_ascii_Char">std::ascii::Char</a>): <a href="../sui_std/u8#std_u8">u8</a>
</code></pre>




<h2 id="std_ascii_is_valid_char">Function <span class="code-inline">is_valid_char</span></h2>

Returns <span class="code-inline"><b>true</b></span> if <span class="code-inline">b</span> is a valid ASCII character.<br/>
Returns <span class="code-inline"><b>false</b></span> otherwise.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_is_valid_char">is_valid_char</a>(b: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_ascii_is_printable_char">Function <span class="code-inline">is_printable_char</span></h2>

Returns <span class="code-inline"><b>true</b></span> if <span class="code-inline"><a href="../sui_std/ascii#std_ascii_byte">byte</a></span> is a printable ASCII character.<br/>
Returns <span class="code-inline"><b>false</b></span> otherwise.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_is_printable_char">is_printable_char</a>(<a href="../sui_std/ascii#std_ascii_byte">byte</a>: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_ascii_is_empty">Function <span class="code-inline">is_empty</span></h2>

Returns <span class="code-inline"><b>true</b></span> if <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> is empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_is_empty">is_empty</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_ascii_to_uppercase">Function <span class="code-inline">to_uppercase</span></h2>

Convert a <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> to its uppercase equivalent.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_to_uppercase">to_uppercase</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_ascii_to_lowercase">Function <span class="code-inline">to_lowercase</span></h2>

Convert a <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> to its lowercase equivalent.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_to_lowercase">to_lowercase</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_ascii_index_of">Function <span class="code-inline">index_of</span></h2>

Computes the index of the first occurrence of the <span class="code-inline">substr</span> in the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span>.<br/>
Returns the length of the <span class="code-inline"><a href="../sui_std/string#std_string">string</a></span> if the <span class="code-inline">substr</span> is not found.<br/>
Returns 0 if the <span class="code-inline">substr</span> is empty.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/ascii#std_ascii_index_of">index_of</a>(<a href="../sui_std/string#std_string">string</a>: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, substr: &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_ascii_char_to_uppercase">Function <span class="code-inline">char_to_uppercase</span></h2>

Convert a <span class="code-inline"><a href="../sui_std/ascii#std_ascii_char">char</a></span> to its lowercase equivalent.


<pre><code><b>fun</b> <a href="../sui_std/ascii#std_ascii_char_to_uppercase">char_to_uppercase</a>(<a href="../sui_std/ascii#std_ascii_byte">byte</a>: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/u8#std_u8">u8</a>
</code></pre>




<h2 id="std_ascii_char_to_lowercase">Function <span class="code-inline">char_to_lowercase</span></h2>

Convert a <span class="code-inline"><a href="../sui_std/ascii#std_ascii_char">char</a></span> to its lowercase equivalent.


<pre><code><b>fun</b> <a href="../sui_std/ascii#std_ascii_char_to_lowercase">char_to_lowercase</a>(<a href="../sui_std/ascii#std_ascii_byte">byte</a>: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/u8#std_u8">u8</a>
</code></pre>



