---
title: Module std::fixed_point32
sidebar_label: fixed_point32
---

Defines a fixed-point numeric type with a 32-bit integer part and
a 32-bit fractional part.

<h2 id="std_fixed_point32_FixedPoint32">Struct <span class="code-inline">FixedPoint32</span></h2>

Define a fixed-point numeric type with 32 fractional bits.<br/>
This is just a u64 integer but it is wrapped in a struct to
make a unique type. This is a binary representation, so decimal
values may not be exactly representable, but it provides more
than 9 decimal digits of precision both before and after the
decimal point (18 digits total). For comparison, double precision
floating-point has less than 16 decimal digits of precision, so
be careful about using floating-point to convert these values to
decimal.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">FixedPoint32</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">value: <a href="../sui_std/u64#std_u64">u64</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

> TODO: This is a basic constant and should be provided somewhere centrally in the framework.


<pre><code><b>const</b> <a href="../sui_std/fixed_point32#std_fixed_point32_MAX_U64">MAX_U64</a>: <a href="../sui_std/u128#std_u128">u128</a> = 18446744073709551615;
</code></pre>

The denominator provided was zero


<pre><code><b>const</b> <a href="../sui_std/fixed_point32#std_fixed_point32_EDENOMINATOR">EDENOMINATOR</a>: <a href="../sui_std/u64#std_u64">u64</a> = 65537;
</code></pre>

The quotient value would be too large to be held in a <span class="code-inline"><a href="../sui_std/u64#std_u64">u64</a></span>


<pre><code><b>const</b> <a href="../sui_std/fixed_point32#std_fixed_point32_EDIVISION">EDIVISION</a>: <a href="../sui_std/u64#std_u64">u64</a> = 131074;
</code></pre>

The multiplied value would be too large to be held in a <span class="code-inline"><a href="../sui_std/u64#std_u64">u64</a></span>


<pre><code><b>const</b> <a href="../sui_std/fixed_point32#std_fixed_point32_EMULTIPLICATION">EMULTIPLICATION</a>: <a href="../sui_std/u64#std_u64">u64</a> = 131075;
</code></pre>

A division by zero was encountered


<pre><code><b>const</b> <a href="../sui_std/fixed_point32#std_fixed_point32_EDIVISION_BY_ZERO">EDIVISION_BY_ZERO</a>: <a href="../sui_std/u64#std_u64">u64</a> = 65540;
</code></pre>

The computed ratio when converting to a <span class="code-inline"><a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">FixedPoint32</a></span> would be unrepresentable


<pre><code><b>const</b> <a href="../sui_std/fixed_point32#std_fixed_point32_ERATIO_OUT_OF_RANGE">ERATIO_OUT_OF_RANGE</a>: <a href="../sui_std/u64#std_u64">u64</a> = 131077;
</code></pre>


<h2 id="std_fixed_point32_multiply_u64">Function <span class="code-inline">multiply_u64</span></h2>

Multiply a u64 integer by a fixed-point number, truncating any
fractional part of the product. This will abort if the product
overflows.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/fixed_point32#std_fixed_point32_multiply_u64">multiply_u64</a>(val: <a href="../sui_std/u64#std_u64">u64</a>, multiplier: <a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">std::fixed_point32::FixedPoint32</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_fixed_point32_divide_u64">Function <span class="code-inline">divide_u64</span></h2>

Divide a u64 integer by a fixed-point number, truncating any
fractional part of the quotient. This will abort if the divisor
is zero or if the quotient overflows.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/fixed_point32#std_fixed_point32_divide_u64">divide_u64</a>(val: <a href="../sui_std/u64#std_u64">u64</a>, divisor: <a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">std::fixed_point32::FixedPoint32</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_fixed_point32_create_from_rational">Function <span class="code-inline">create_from_rational</span></h2>

Create a fixed-point value from a rational number specified by its
numerator and denominator. Calling this function should be preferred
for using <span class="code-inline"><a href="../sui_std/fixed_point32#std_fixed_point32_create_from_raw_value">Self::create_from_raw_value</a></span> which is also available.<br/>
This will abort if the denominator is zero. It will also
abort if the numerator is nonzero and the ratio is not in the range
2^-32 .. 2^32-1. When specifying decimal fractions, be careful about
rounding errors: if you round to display N digits after the decimal
point, you can use a denominator of 10^N to avoid numbers where the
very small imprecision in the binary representation could change the
rounding, e.g., 0.0125 will round down to 0.012 instead of up to 0.013.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/fixed_point32#std_fixed_point32_create_from_rational">create_from_rational</a>(numerator: <a href="../sui_std/u64#std_u64">u64</a>, denominator: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">std::fixed_point32::FixedPoint32</a>
</code></pre>




<h2 id="std_fixed_point32_create_from_raw_value">Function <span class="code-inline">create_from_raw_value</span></h2>

Create a fixedpoint value from a raw value.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/fixed_point32#std_fixed_point32_create_from_raw_value">create_from_raw_value</a>(value: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">std::fixed_point32::FixedPoint32</a>
</code></pre>




<h2 id="std_fixed_point32_get_raw_value">Function <span class="code-inline">get_raw_value</span></h2>

Accessor for the raw u64 value. Other less common operations, such as
adding or subtracting FixedPoint32 values, can be done using the raw
values directly.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/fixed_point32#std_fixed_point32_get_raw_value">get_raw_value</a>(num: <a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">std::fixed_point32::FixedPoint32</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_fixed_point32_is_zero">Function <span class="code-inline">is_zero</span></h2>

Returns true if the ratio is zero.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/fixed_point32#std_fixed_point32_is_zero">is_zero</a>(num: <a href="../sui_std/fixed_point32#std_fixed_point32_FixedPoint32">std::fixed_point32::FixedPoint32</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>



