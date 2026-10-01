---
title: Module sui::address
sidebar_label: address
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
</code></pre>

<h2 id="@Constants_0">Constants</h2>

The length of an address, in bytes


<pre><code><b>const</b> <a href="../sui_sui/address#sui_address_LENGTH">LENGTH</a>: u64 = 32;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/address#sui_address_MAX">MAX</a>: u256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
</code></pre>

Error from <span class="code-inline"><a href="../sui_sui/address#sui_address_from_bytes">from_bytes</a></span> when it is supplied too many or too few bytes.


<pre><code><b>const</b> <a href="../sui_sui/address#sui_address_EAddressParseError">EAddressParseError</a>: u64 = 0;
</code></pre>


<h2 id="sui_address_to_u256">Function <span class="code-inline">to_u256</span></h2>

Convert <span class="code-inline">a</span> into a u256 by interpreting <span class="code-inline">a</span> as the bytes of a big-endian integer
(e.g., <span class="code-inline"><a href="../sui_sui/address#sui_address_to_u256">to_u256</a>(0x1) == 1</span>)


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_to_u256">to_u256</a>(a: <b>address</b>): u256
</code></pre>




<h2 id="sui_address_from_u256">Function <span class="code-inline">from_u256</span></h2>

Convert <span class="code-inline">n</span> into an address by encoding it as a big-endian integer (e.g., <span class="code-inline"><a href="../sui_sui/address#sui_address_from_u256">from_u256</a>(1) = @0x1</span>).<br/>
Aborts if <span class="code-inline">n</span> > <span class="code-inline">MAX_ADDRESS</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_from_u256">from_u256</a>(n: u256): <b>address</b>
</code></pre>




<h2 id="sui_address_from_bytes">Function <span class="code-inline">from_bytes</span></h2>

Convert <span class="code-inline">bytes</span> into an address.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/address#sui_address_EAddressParseError">EAddressParseError</a></span> if the length of <span class="code-inline">bytes</span> is not 32


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_from_bytes">from_bytes</a>(bytes: vector&lt;u8&gt;): <b>address</b>
</code></pre>




<h2 id="sui_address_to_bytes">Function <span class="code-inline">to_bytes</span></h2>

Convert <span class="code-inline">a</span> into BCS-encoded bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_to_bytes">to_bytes</a>(a: <b>address</b>): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_address_to_ascii_string">Function <span class="code-inline">to_ascii_string</span></h2>

Convert <span class="code-inline">a</span> to a hex-encoded ASCII string


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_to_ascii_string">to_ascii_string</a>(a: <b>address</b>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="sui_address_to_string">Function <span class="code-inline">to_string</span></h2>

Convert <span class="code-inline">a</span> to a hex-encoded string


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_to_string">to_string</a>(a: <b>address</b>): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_address_from_ascii_bytes">Function <span class="code-inline">from_ascii_bytes</span></h2>

Converts an ASCII string to an address, taking the numerical value for each character. The
string must be Base16 encoded, and thus exactly 64 characters long.<br/>
For example, the string "00000000000000000000000000000000000000000000000000000000DEADB33F"
will be converted to the address @0xDEADB33F.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/address#sui_address_EAddressParseError">EAddressParseError</a></span> if the length of <span class="code-inline">s</span> is not 64,
or if an invalid character is encountered.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_from_ascii_bytes">from_ascii_bytes</a>(bytes: &vector&lt;u8&gt;): <b>address</b>
</code></pre>




<h2 id="sui_address_hex_char_value">Function <span class="code-inline">hex_char_value</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/address#sui_address_hex_char_value">hex_char_value</a>(c: u8): u8
</code></pre>




<h2 id="sui_address_length">Function <span class="code-inline">length</span></h2>

Length of a Sui address in bytes


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_length">length</a>(): u64
</code></pre>




<h2 id="sui_address_max">Function <span class="code-inline">max</span></h2>

Largest possible address


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/address#sui_address_max">max</a>(): u256
</code></pre>



