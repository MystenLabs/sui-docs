---
title: Module sui::bcs
sidebar_label: bcs
---

This module implements BCS (de)serialization in Move.<br/>
Full specification can be found here: https://github.com/diem/bcs

Short summary (for Move-supported types):

- address - sequence of X bytes
- bool - byte with 0 or 1
- u8 - a single u8 byte
- u16 / u32 / u64 / u128 / u256 - LE bytes
- vector - ULEB128 length + LEN elements
- option - first byte bool: None (0) or Some (1), then value

Usage example:
```
/// This function reads u8 and u64 value from the input
/// and returns the rest of the bytes.
fun deserialize(bytes: vector<u8>): (u8, u64, vector<u8>) {
    use sui::bcs::\{Self, BCS\};

    let prepared: BCS = bcs::new(bytes);
    let (u8_value, u64_value) = (
        prepared.peel_u8(),
        prepared.peel_u64()
    );

    // unpack bcs struct
    let leftovers = prepared.into_remainder_bytes();

    (u8_value, u64_value, leftovers)
}
```

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
</code></pre>

<h2 id="sui_bcs_BCS">Struct <span class="code-inline">BCS</span></h2>

A helper struct that saves resources on operations. For better
vector performance, it stores reversed bytes of the BCS and
enables use of <span class="code-inline">vector::pop_back</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/bcs#sui_bcs_BCS">BCS</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

For when bytes length is less than required for deserialization.


<pre><code><b>const</b> <a href="../sui_sui/bcs#sui_bcs_EOutOfRange">EOutOfRange</a>: u64 = 0;
</code></pre>

For when the boolean value different than <span class="code-inline">0</span> or <span class="code-inline">1</span>.


<pre><code><b>const</b> <a href="../sui_sui/bcs#sui_bcs_ENotBool">ENotBool</a>: u64 = 1;
</code></pre>

For when ULEB byte is out of range (or not found).


<pre><code><b>const</b> <a href="../sui_sui/bcs#sui_bcs_ELenOutOfRange">ELenOutOfRange</a>: u64 = 2;
</code></pre>


<h2 id="sui_bcs_to_bytes">Function <span class="code-inline">to_bytes</span></h2>

Get BCS serialized bytes for any value.<br/>
Re-exports stdlib <span class="code-inline"><a href="../sui_sui/bcs#sui_bcs_to_bytes">bcs::to_bytes</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_to_bytes">to_bytes</a>&lt;T&gt;(value: &T): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_bcs_new">Function <span class="code-inline">new</span></h2>

Creates a new instance of BCS wrapper that holds inversed
bytes for better performance.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_new">new</a>(bytes: vector&lt;u8&gt;): <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>
</code></pre>




<h2 id="sui_bcs_into_remainder_bytes">Function <span class="code-inline">into_remainder_bytes</span></h2>

Unpack the <span class="code-inline"><a href="../sui_sui/bcs#sui_bcs_BCS">BCS</a></span> struct returning the leftover bytes.<br/>
Useful for passing the data further after partial deserialization.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_into_remainder_bytes">into_remainder_bytes</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_bcs_peel_address">Function <span class="code-inline">peel_address</span></h2>

Read address from the bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_address">peel_address</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <b>address</b>
</code></pre>




<h2 id="sui_bcs_peel_bool">Function <span class="code-inline">peel_bool</span></h2>

Read a <span class="code-inline">bool</span> value from bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_bool">peel_bool</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): bool
</code></pre>




<h2 id="sui_bcs_peel_u8">Function <span class="code-inline">peel_u8</span></h2>

Read <span class="code-inline">u8</span> value from bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_u8">peel_u8</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u8
</code></pre>




<h2 id="sui_bcs_peel_num">Macro function <span class="code-inline">peel_num</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_num">peel_num</a>&lt;$I, $T&gt;($<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>, $len: u64, $bits: $I): $T
</code></pre>




<h2 id="sui_bcs_peel_u16">Function <span class="code-inline">peel_u16</span></h2>

Read <span class="code-inline">u16</span> value from bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_u16">peel_u16</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u16
</code></pre>




<h2 id="sui_bcs_peel_u32">Function <span class="code-inline">peel_u32</span></h2>

Read <span class="code-inline">u32</span> value from bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_u32">peel_u32</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u32
</code></pre>




<h2 id="sui_bcs_peel_u64">Function <span class="code-inline">peel_u64</span></h2>

Read <span class="code-inline">u64</span> value from bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_u64">peel_u64</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u64
</code></pre>




<h2 id="sui_bcs_peel_u128">Function <span class="code-inline">peel_u128</span></h2>

Read <span class="code-inline">u128</span> value from bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_u128">peel_u128</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u128
</code></pre>




<h2 id="sui_bcs_peel_u256">Function <span class="code-inline">peel_u256</span></h2>

Read <span class="code-inline">u256</span> value from bcs-serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_u256">peel_u256</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u256
</code></pre>




<h2 id="sui_bcs_peel_vec_length">Function <span class="code-inline">peel_vec_length</span></h2>

Read ULEB bytes expecting a vector length. Result should
then be used to perform <span class="code-inline">peel_*</span> operation LEN times.

In BCS <span class="code-inline">vector</span> length is implemented with ULEB128;<br/>
See more here: https://en.wikipedia.org/wiki/LEB128


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_length">peel_vec_length</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u64
</code></pre>




<h2 id="sui_bcs_peel_vec">Macro function <span class="code-inline">peel_vec</span></h2>

Peel <span class="code-inline">vector&lt;&#36;T&gt;</span> from serialized bytes, where <span class="code-inline">&#36;peel: |&<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">BCS</a>| -&gt; &#36;T</span> gives the
functionality of peeling each value.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec">peel_vec</a>&lt;$T&gt;($<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>, $peel: |&<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>| -&gt; $T): vector&lt;$T&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_address">Function <span class="code-inline">peel_vec_address</span></h2>

Peel a vector of <span class="code-inline"><b>address</b></span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_address">peel_vec_address</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_bool">Function <span class="code-inline">peel_vec_bool</span></h2>

Peel a vector of <span class="code-inline"><b>address</b></span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_bool">peel_vec_bool</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;bool&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_u8">Function <span class="code-inline">peel_vec_u8</span></h2>

Peel a vector of <span class="code-inline">u8</span> (eg string) from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_u8">peel_vec_u8</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_vec_u8">Function <span class="code-inline">peel_vec_vec_u8</span></h2>

Peel a <span class="code-inline">vector&lt;vector&lt;u8&gt;&gt;</span> (eg vec of string) from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_vec_u8">peel_vec_vec_u8</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_u16">Function <span class="code-inline">peel_vec_u16</span></h2>

Peel a vector of <span class="code-inline">u16</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_u16">peel_vec_u16</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;u16&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_u32">Function <span class="code-inline">peel_vec_u32</span></h2>

Peel a vector of <span class="code-inline">u32</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_u32">peel_vec_u32</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;u32&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_u64">Function <span class="code-inline">peel_vec_u64</span></h2>

Peel a vector of <span class="code-inline">u64</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_u64">peel_vec_u64</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;u64&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_u128">Function <span class="code-inline">peel_vec_u128</span></h2>

Peel a vector of <span class="code-inline">u128</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_u128">peel_vec_u128</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;u128&gt;
</code></pre>




<h2 id="sui_bcs_peel_vec_u256">Function <span class="code-inline">peel_vec_u256</span></h2>

Peel a vector of <span class="code-inline">u256</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_vec_u256">peel_vec_u256</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): vector&lt;u256&gt;
</code></pre>




<h2 id="sui_bcs_peel_enum_tag">Function <span class="code-inline">peel_enum_tag</span></h2>

Peel enum from serialized bytes, where <span class="code-inline">&#36;f</span> takes a <span class="code-inline">tag</span> value and returns
the corresponding enum variant. Move enums are limited to 127 variants,
however the tag can be any <span class="code-inline">u32</span> value.

Example:
```rust
let my_enum = match (bcs.peel_enum_tag()) \{
   0 => Enum::Empty,
   1 => Enum::U8(bcs.peel_u8()),
   2 => Enum::U16(bcs.peel_u16()),
   3 => Enum::Struct { a: bcs.peel_address(), b: bcs.peel_u8() \},
   _ => abort,
};
```


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_enum_tag">peel_enum_tag</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): u32
</code></pre>




<h2 id="sui_bcs_peel_option">Macro function <span class="code-inline">peel_option</span></h2>

Peel <span class="code-inline">Option&lt;&#36;T&gt;</span> from serialized bytes, where <span class="code-inline">&#36;peel: |&<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">BCS</a>| -&gt; &#36;T</span> gives the
functionality of peeling the inner value.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option">peel_option</a>&lt;$T&gt;($<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>, $peel: |&<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>| -&gt; $T): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_address">Function <span class="code-inline">peel_option_address</span></h2>

Peel <span class="code-inline">Option&lt;<b>address</b>&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_address">peel_option_address</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_bool">Function <span class="code-inline">peel_option_bool</span></h2>

Peel <span class="code-inline">Option&lt;bool&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_bool">peel_option_bool</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;bool&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_u8">Function <span class="code-inline">peel_option_u8</span></h2>

Peel <span class="code-inline">Option&lt;u8&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_u8">peel_option_u8</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u8&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_u16">Function <span class="code-inline">peel_option_u16</span></h2>

Peel <span class="code-inline">Option&lt;u16&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_u16">peel_option_u16</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u16&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_u32">Function <span class="code-inline">peel_option_u32</span></h2>

Peel <span class="code-inline">Option&lt;u32&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_u32">peel_option_u32</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u32&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_u64">Function <span class="code-inline">peel_option_u64</span></h2>

Peel <span class="code-inline">Option&lt;u64&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_u64">peel_option_u64</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_u128">Function <span class="code-inline">peel_option_u128</span></h2>

Peel <span class="code-inline">Option&lt;u128&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_u128">peel_option_u128</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u128&gt;
</code></pre>




<h2 id="sui_bcs_peel_option_u256">Function <span class="code-inline">peel_option_u256</span></h2>

Peel <span class="code-inline">Option&lt;u256&gt;</span> from serialized bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bcs#sui_bcs_peel_option_u256">peel_option_u256</a>(<a href="../sui_sui/bcs#sui_bcs">bcs</a>: &<b>mut</b> <a href="../sui_sui/bcs#sui_bcs_BCS">sui::bcs::BCS</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u256&gt;
</code></pre>



