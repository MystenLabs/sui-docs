---
title: Module std::type_name
sidebar_label: type_name
---

Functionality for converting Move types into values. Use with care!

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="std_type_name_TypeName">Struct <span class="code-inline">TypeName</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/type_name#std_type_name_TypeName">TypeName</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">name: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a></span>
</dt>
<dd>
 String representation of the type. All types are represented
 using their source syntax:
 "u8", "u64", "bool", "address", "vector", and so on for primitive types.<br/>
 Struct types are represented as fully qualified type names; e.g.
 <span class="code-inline">00000000000000000000000000000001::string::String</span> or <span class="code-inline">0000000000000000000000000000000a::module_name1::type_name1&lt;0000000000000000000000000000000a::module_name2::type_name2&lt;<a href="../sui_std/u64#std_u64">u64</a>&gt;&gt;</span>
 Addresses are hex-encoded lowercase values of length ADDRESS_LENGTH (16, 20, or 32 depending on the Move platform)
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

ASCII Character code for the <span class="code-inline">:</span> (colon) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_COLON">ASCII_COLON</a>: <a href="../sui_std/u8#std_u8">u8</a> = 58;
</code></pre>

ASCII Character code for the <span class="code-inline">&lt;</span> (less than) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_LESS_THAN">ASCII_LESS_THAN</a>: <a href="../sui_std/u8#std_u8">u8</a> = 60;
</code></pre>

ASCII Character code for the <span class="code-inline">v</span> (lowercase v) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_V">ASCII_V</a>: <a href="../sui_std/u8#std_u8">u8</a> = 118;
</code></pre>

ASCII Character code for the <span class="code-inline">e</span> (lowercase e) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_E">ASCII_E</a>: <a href="../sui_std/u8#std_u8">u8</a> = 101;
</code></pre>

ASCII Character code for the <span class="code-inline">c</span> (lowercase c) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_C">ASCII_C</a>: <a href="../sui_std/u8#std_u8">u8</a> = 99;
</code></pre>

ASCII Character code for the <span class="code-inline">t</span> (lowercase t) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_T">ASCII_T</a>: <a href="../sui_std/u8#std_u8">u8</a> = 116;
</code></pre>

ASCII Character code for the <span class="code-inline">o</span> (lowercase o) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_O">ASCII_O</a>: <a href="../sui_std/u8#std_u8">u8</a> = 111;
</code></pre>

ASCII Character code for the <span class="code-inline">r</span> (lowercase r) symbol.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ASCII_R">ASCII_R</a>: <a href="../sui_std/u8#std_u8">u8</a> = 114;
</code></pre>

The type is not from a package/module. It is a primitive type.


<pre><code><b>const</b> <a href="../sui_std/type_name#std_type_name_ENonModuleType">ENonModuleType</a>: <a href="../sui_std/u64#std_u64">u64</a> = 0;
</code></pre>


<h2 id="std_type_name_with_defining_ids">Function <span class="code-inline">with_defining_ids</span></h2>

Return a value representation of the type <span class="code-inline">T</span>. Package IDs that appear in fully qualified type
names in the output from this function are defining IDs (the ID of the package in storage that
first introduced the type).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_with_defining_ids">with_defining_ids</a>&lt;T&gt;(): <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>
</code></pre>




<h2 id="std_type_name_with_original_ids">Function <span class="code-inline">with_original_ids</span></h2>

Return a value representation of the type <span class="code-inline">T</span>. Package IDs that appear in fully qualified type
names in the output from this function are original IDs (the ID of the first version of
the package, even if the type in question was introduced in a later upgrade).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_with_original_ids">with_original_ids</a>&lt;T&gt;(): <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>
</code></pre>




<h2 id="std_type_name_defining_id">Function <span class="code-inline">defining_id</span></h2>

Like <span class="code-inline"><a href="../sui_std/type_name#std_type_name_with_defining_ids">with_defining_ids</a></span>, this accesses the package ID that original defined the type <span class="code-inline">T</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_defining_id">defining_id</a>&lt;T&gt;(): <b>address</b>
</code></pre>




<h2 id="std_type_name_original_id">Function <span class="code-inline">original_id</span></h2>

Like <span class="code-inline"><a href="../sui_std/type_name#std_type_name_with_original_ids">with_original_ids</a></span>, this accesses the original ID of the package that defines type <span class="code-inline">T</span>,
even if the type was introduced in a later version of the package.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_original_id">original_id</a>&lt;T&gt;(): <b>address</b>
</code></pre>




<h2 id="std_type_name_is_primitive">Function <span class="code-inline">is_primitive</span></h2>

Returns true iff the TypeName represents a primitive type, i.e. one of
u8, u16, u32, u64, u128, u256, bool, address, vector.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_is_primitive">is_primitive</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_type_name_as_string">Function <span class="code-inline">as_string</span></h2>

Get the String representation of <span class="code-inline">self</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_as_string">as_string</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_type_name_address_string">Function <span class="code-inline">address_string</span></h2>

Get Address string (Base16 encoded), first part of the TypeName.<br/>
Aborts if given a primitive type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_address_string">address_string</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_type_name_module_string">Function <span class="code-inline">module_string</span></h2>

Get name of the module.<br/>
Aborts if given a primitive type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_module_string">module_string</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_type_name_datatype_string">Function <span class="code-inline">datatype_string</span></h2>

Get name of the datatype (struct or enum).<br/>
Aborts if given a primitive type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_datatype_string">datatype_string</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_type_name_into_string">Function <span class="code-inline">into_string</span></h2>

Convert <span class="code-inline">self</span> into its inner String


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_into_string">into_string</a>(self: <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_type_name_get">Function <span class="code-inline">get</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_get">get</a>&lt;T&gt;(): <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>
</code></pre>




<h2 id="std_type_name_get_with_original_ids">Function <span class="code-inline">get_with_original_ids</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_get_with_original_ids">get_with_original_ids</a>&lt;T&gt;(): <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>
</code></pre>




<h2 id="std_type_name_borrow_string">Function <span class="code-inline">borrow_string</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_borrow_string">borrow_string</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_type_name_get_address">Function <span class="code-inline">get_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_get_address">get_address</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="std_type_name_get_module">Function <span class="code-inline">get_module</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/type_name#std_type_name_get_module">get_module</a>(self: &<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>



