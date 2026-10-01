---
title: Module std::macros
sidebar_label: macros
---

This module holds shared implementation of macros used in <span class="code-inline">std</span>

<h2 id="std_macros_num_max">Macro function <span class="code-inline">num_max</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_max">num_max</a>&lt;$T&gt;($x: $T, $y: $T): $T
</code></pre>




<h2 id="std_macros_num_min">Macro function <span class="code-inline">num_min</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_min">num_min</a>&lt;$T&gt;($x: $T, $y: $T): $T
</code></pre>




<h2 id="std_macros_num_diff">Macro function <span class="code-inline">num_diff</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_diff">num_diff</a>&lt;$T&gt;($x: $T, $y: $T): $T
</code></pre>




<h2 id="std_macros_num_div_ceil">Macro function <span class="code-inline">num_div_ceil</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_div_ceil">num_div_ceil</a>&lt;$T&gt;($x: $T, $y: $T): $T
</code></pre>




<h2 id="std_macros_num_pow">Macro function <span class="code-inline">num_pow</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_pow">num_pow</a>($base: _, $exponent: <a href="../sui_std/u8#std_u8">u8</a>): _
</code></pre>




<h2 id="std_macros_num_sqrt">Macro function <span class="code-inline">num_sqrt</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_sqrt">num_sqrt</a>&lt;$T, $U&gt;($x: $T, $bitsize: <a href="../sui_std/u8#std_u8">u8</a>): $T
</code></pre>




<h2 id="std_macros_num_to_string">Macro function <span class="code-inline">num_to_string</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_to_string">num_to_string</a>($x: _): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="std_macros_num_checked_add">Macro function <span class="code-inline">num_checked_add</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_checked_add">num_checked_add</a>&lt;$T&gt;($x: $T, $y: $T, $max_t: $T): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_checked_sub">Macro function <span class="code-inline">num_checked_sub</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_checked_sub">num_checked_sub</a>&lt;$T&gt;($x: $T, $y: $T): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_checked_mul">Macro function <span class="code-inline">num_checked_mul</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_checked_mul">num_checked_mul</a>&lt;$T&gt;($x: $T, $y: $T, $max_t: $T): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_checked_div">Macro function <span class="code-inline">num_checked_div</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_checked_div">num_checked_div</a>&lt;$T&gt;($x: $T, $y: $T): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_saturating_add">Macro function <span class="code-inline">num_saturating_add</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_saturating_add">num_saturating_add</a>&lt;$T&gt;($x: $T, $y: $T, $max_t: $T): $T
</code></pre>




<h2 id="std_macros_num_saturating_sub">Macro function <span class="code-inline">num_saturating_sub</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_saturating_sub">num_saturating_sub</a>&lt;$T&gt;($x: $T, $y: $T): $T
</code></pre>




<h2 id="std_macros_num_saturating_mul">Macro function <span class="code-inline">num_saturating_mul</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_saturating_mul">num_saturating_mul</a>&lt;$T&gt;($x: $T, $y: $T, $max_t: $T): $T
</code></pre>




<h2 id="std_macros_num_checked_shl">Macro function <span class="code-inline">num_checked_shl</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_checked_shl">num_checked_shl</a>&lt;$T&gt;($x: $T, $shift: <a href="../sui_std/u8#std_u8">u8</a>, $bit_size: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_checked_shr">Macro function <span class="code-inline">num_checked_shr</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_checked_shr">num_checked_shr</a>&lt;$T&gt;($x: $T, $shift: <a href="../sui_std/u8#std_u8">u8</a>, $bit_size: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_lossless_shl">Macro function <span class="code-inline">num_lossless_shl</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_lossless_shl">num_lossless_shl</a>&lt;$T&gt;($x: $T, $shift: <a href="../sui_std/u8#std_u8">u8</a>, $bit_size: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_lossless_shr">Macro function <span class="code-inline">num_lossless_shr</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_lossless_shr">num_lossless_shr</a>&lt;$T&gt;($x: $T, $shift: <a href="../sui_std/u8#std_u8">u8</a>, $bit_size: <a href="../sui_std/u8#std_u8">u8</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_num_lossless_div">Macro function <span class="code-inline">num_lossless_div</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_lossless_div">num_lossless_div</a>&lt;$T&gt;($x: $T, $y: $T): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_macros_range_do">Macro function <span class="code-inline">range_do</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_range_do">range_do</a>&lt;$T, $R: drop&gt;($start: $T, $stop: $T, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_macros_range_do_eq">Macro function <span class="code-inline">range_do_eq</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_range_do_eq">range_do_eq</a>&lt;$T, $R: drop&gt;($start: $T, $stop: $T, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_macros_do">Macro function <span class="code-inline">do</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_do">do</a>&lt;$T, $R: drop&gt;($stop: $T, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_macros_do_eq">Macro function <span class="code-inline">do_eq</span></h2>


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_do_eq">do_eq</a>&lt;$T, $R: drop&gt;($stop: $T, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_macros_try_as_u8">Macro function <span class="code-inline">try_as_u8</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_try_as_u8">try_as_u8</a>($x: _): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>




<h2 id="std_macros_try_as_u16">Macro function <span class="code-inline">try_as_u16</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_try_as_u16">try_as_u16</a>($x: _): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/u16#std_u16">u16</a>&gt;
</code></pre>




<h2 id="std_macros_try_as_u32">Macro function <span class="code-inline">try_as_u32</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_try_as_u32">try_as_u32</a>($x: _): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/u32#std_u32">u32</a>&gt;
</code></pre>




<h2 id="std_macros_try_as_u64">Macro function <span class="code-inline">try_as_u64</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_try_as_u64">try_as_u64</a>($x: _): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/u64#std_u64">u64</a>&gt;
</code></pre>




<h2 id="std_macros_try_as_u128">Macro function <span class="code-inline">try_as_u128</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_try_as_u128">try_as_u128</a>($x: _): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/u128#std_u128">u128</a>&gt;
</code></pre>




<h2 id="std_macros_num_mul_div">Macro function <span class="code-inline">num_mul_div</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_mul_div">num_mul_div</a>&lt;$T, $U&gt;($a: $T, $b: $T, $c: $T): $T
</code></pre>




<h2 id="std_macros_num_mul_div_ceil">Macro function <span class="code-inline">num_mul_div_ceil</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_num_mul_div_ceil">num_mul_div_ceil</a>&lt;$T, $U&gt;($a: $T, $b: $T, $c: $T): $T
</code></pre>




<h2 id="std_macros_uq_from_quotient">Macro function <span class="code-inline">uq_from_quotient</span></h2>

Creates a fixed-point value from a quotient specified by its numerator and denominator.
<span class="code-inline">&#36;T</span> is the underlying integer type for the fixed-point value, where <span class="code-inline">&#36;T</span> has <span class="code-inline">&#36;t_bits</span> bits.
<span class="code-inline">&#36;U</span> is the type used for intermediate calculations, where <span class="code-inline">&#36;U</span> is the next larger integer type.
<span class="code-inline">&#36;max_t</span> is the maximum value that can be represented by <span class="code-inline">&#36;T</span>.
<span class="code-inline">&#36;t_bits</span> (as mentioned above) is the total number of bits in the fixed-point value (integer
plus fractional).
<span class="code-inline">&#36;fractional_bits</span> is the number of fractional bits in the fixed-point value.


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_uq_from_quotient">uq_from_quotient</a>&lt;$T, $U&gt;($numerator: $T, $denominator: $T, $max_t: $T, $t_bits: <a href="../sui_std/u8#std_u8">u8</a>, $fractional_bits: <a href="../sui_std/u8#std_u8">u8</a>, $abort_denominator: _, $abort_quotient_too_small: _, $abort_quotient_too_large: _): $T
</code></pre>




<h2 id="std_macros_uq_from_int">Macro function <span class="code-inline">uq_from_int</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_uq_from_int">uq_from_int</a>&lt;$T, $U&gt;($integer: $T, $fractional_bits: <a href="../sui_std/u8#std_u8">u8</a>): $U
</code></pre>




<h2 id="std_macros_uq_add">Macro function <span class="code-inline">uq_add</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_uq_add">uq_add</a>&lt;$T, $U&gt;($a: $T, $b: $T, $max_t: $T, $abort_overflow: _): $T
</code></pre>




<h2 id="std_macros_uq_sub">Macro function <span class="code-inline">uq_sub</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_uq_sub">uq_sub</a>&lt;$T&gt;($a: $T, $b: $T, $abort_overflow: _): $T
</code></pre>




<h2 id="std_macros_uq_to_int">Macro function <span class="code-inline">uq_to_int</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_uq_to_int">uq_to_int</a>&lt;$T, $U&gt;($a: $U, $fractional_bits: <a href="../sui_std/u8#std_u8">u8</a>): $T
</code></pre>




<h2 id="std_macros_uq_int_mul">Macro function <span class="code-inline">uq_int_mul</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_uq_int_mul">uq_int_mul</a>&lt;$T, $U&gt;($val: $T, $multiplier: $T, $max_t: $T, $fractional_bits: <a href="../sui_std/u8#std_u8">u8</a>, $abort_overflow: _): $T
</code></pre>




<h2 id="std_macros_uq_int_div">Macro function <span class="code-inline">uq_int_div</span></h2>


<pre><code><b>public</b>(package) <b>macro</b> <b>fun</b> <a href="../sui_std/macros#std_macros_uq_int_div">uq_int_div</a>&lt;$T, $U&gt;($val: $T, $divisor: $T, $max_t: $T, $fractional_bits: <a href="../sui_std/u8#std_u8">u8</a>, $abort_division_by_zero: _, $abort_overflow: _): $T
</code></pre>



