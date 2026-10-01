---
title: Module std::option
sidebar_label: option
---

This module defines the Option type and its methods to represent and handle an optional value.

<pre><code><b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="std_option_Option">Struct <span class="code-inline">Option</span></h2>

Abstraction of a value that may or may not be present. Implemented with a vector of size
zero or one because Move bytecode does not have ADTs.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/option#std_option_Option">Option</a>&lt;Element&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">vec: <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

The <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a></span> is in an invalid state for the operation attempted.<br/>
The <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a></span> is <span class="code-inline">Some</span> while it should be <span class="code-inline">None</span>.


<pre><code><b>const</b> <a href="../sui_std/option#std_option_EOPTION_IS_SET">EOPTION_IS_SET</a>: <a href="../sui_std/u64#std_u64">u64</a> = 262144;
</code></pre>

The <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a></span> is in an invalid state for the operation attempted.<br/>
The <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a></span> is <span class="code-inline">None</span> while it should be <span class="code-inline">Some</span>.


<pre><code><b>const</b> <a href="../sui_std/option#std_option_EOPTION_NOT_SET">EOPTION_NOT_SET</a>: <a href="../sui_std/u64#std_u64">u64</a> = 262145;
</code></pre>


<h2 id="std_option_none">Function <span class="code-inline">none</span></h2>

Return an empty <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_none">none</a>&lt;Element&gt;(): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;
</code></pre>




<h2 id="std_option_some">Function <span class="code-inline">some</span></h2>

Return an <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a></span> containing <span class="code-inline">e</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_some">some</a>&lt;Element&gt;(e: Element): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;
</code></pre>




<h2 id="std_option_is_none">Function <span class="code-inline">is_none</span></h2>

Return true if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_is_none">is_none</a>&lt;Element&gt;(t: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_option_is_some">Function <span class="code-inline">is_some</span></h2>

Return true if <span class="code-inline">t</span> holds a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_is_some">is_some</a>&lt;Element&gt;(t: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_option_contains">Function <span class="code-inline">contains</span></h2>

Return true if the value in <span class="code-inline">t</span> is equal to <span class="code-inline">e_ref</span>.<br/>
Always returns <span class="code-inline"><b>false</b></span> if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_contains">contains</a>&lt;Element&gt;(t: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;, e_ref: &Element): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_option_borrow">Function <span class="code-inline">borrow</span></h2>

Return an immutable reference to the value inside <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_borrow">borrow</a>&lt;Element&gt;(t: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;): &Element
</code></pre>




<h2 id="std_option_borrow_with_default">Function <span class="code-inline">borrow_with_default</span></h2>

Return a reference to the value inside <span class="code-inline">t</span> if it holds one.<br/>
Return <span class="code-inline">default_ref</span> if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_borrow_with_default">borrow_with_default</a>&lt;Element&gt;(t: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;, default_ref: &Element): &Element
</code></pre>




<h2 id="std_option_get_with_default">Function <span class="code-inline">get_with_default</span></h2>

Return the value inside <span class="code-inline">t</span> if it holds one.<br/>
Return <span class="code-inline">default</span> if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_get_with_default">get_with_default</a>&lt;Element: <b>copy</b>, drop&gt;(t: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;, default: Element): Element
</code></pre>




<h2 id="std_option_fill">Function <span class="code-inline">fill</span></h2>

Convert the none option <span class="code-inline">t</span> to a some option by adding <span class="code-inline">e</span>.<br/>
Aborts if <span class="code-inline">t</span> already holds a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_fill">fill</a>&lt;Element&gt;(t: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;, e: Element)
</code></pre>




<h2 id="std_option_extract">Function <span class="code-inline">extract</span></h2>

Convert a <span class="code-inline"><a href="../sui_std/option#std_option_some">some</a></span> option to a <span class="code-inline"><a href="../sui_std/option#std_option_none">none</a></span> by removing and returning the value stored inside <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_extract">extract</a>&lt;Element&gt;(t: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;): Element
</code></pre>




<h2 id="std_option_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Return a mutable reference to the value inside <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_borrow_mut">borrow_mut</a>&lt;Element&gt;(t: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;): &<b>mut</b> Element
</code></pre>




<h2 id="std_option_swap">Function <span class="code-inline">swap</span></h2>

Swap the old value inside <span class="code-inline">t</span> with <span class="code-inline">e</span> and return the old value.<br/>
Aborts if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_swap">swap</a>&lt;Element&gt;(t: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;, e: Element): Element
</code></pre>




<h2 id="std_option_swap_or_fill">Function <span class="code-inline">swap_or_fill</span></h2>

Swap the old value inside <span class="code-inline">t</span> with <span class="code-inline">e</span> and return the old value;
or if there is no old value, fill it with <span class="code-inline">e</span>.<br/>
Different from swap(), swap_or_fill() allows for <span class="code-inline">t</span> not holding a value.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_swap_or_fill">swap_or_fill</a>&lt;Element&gt;(t: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;, e: Element): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;
</code></pre>




<h2 id="std_option_destroy_with_default">Function <span class="code-inline">destroy_with_default</span></h2>

Destroys <span class="code-inline">t.</span> If <span class="code-inline">t</span> holds a value, return it. Returns <span class="code-inline">default</span> otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_destroy_with_default">destroy_with_default</a>&lt;Element: drop&gt;(t: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;, default: Element): Element
</code></pre>




<h2 id="std_option_destroy_some">Function <span class="code-inline">destroy_some</span></h2>

Unpack <span class="code-inline">t</span> and return its contents.<br/>
Aborts if <span class="code-inline">t</span> does not hold a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_destroy_some">destroy_some</a>&lt;Element&gt;(t: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;): Element
</code></pre>




<h2 id="std_option_destroy_none">Function <span class="code-inline">destroy_none</span></h2>

Unpack <span class="code-inline">t</span>.<br/>
Aborts if <span class="code-inline">t</span> holds a value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_destroy_none">destroy_none</a>&lt;Element&gt;(t: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;)
</code></pre>




<h2 id="std_option_to_vec">Function <span class="code-inline">to_vec</span></h2>

Convert <span class="code-inline">t</span> into a vector of length 1 if it is <span class="code-inline">Some</span>,
and an empty vector otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/option#std_option_to_vec">to_vec</a>&lt;Element&gt;(t: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Element&gt;): <a href="../sui_std/vector#std_vector">vector</a>&lt;Element&gt;
</code></pre>




<h2 id="std_option_destroy">Macro function <span class="code-inline">destroy</span></h2>

Destroy <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> and call the closure <span class="code-inline">f</span> on the value inside if it holds one.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_destroy">destroy</a>&lt;$T, $R: drop&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_option_do">Macro function <span class="code-inline">do</span></h2>

Destroy <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> and call the closure <span class="code-inline">f</span> on the value inside if it holds one.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_do">do</a>&lt;$T, $R: drop&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |$T| -&gt; $R)
</code></pre>




<h2 id="std_option_do_ref">Macro function <span class="code-inline">do_ref</span></h2>

Execute a closure on the value inside <span class="code-inline">t</span> if it holds one.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_do_ref">do_ref</a>&lt;$T, $R: drop&gt;($o: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&$T| -&gt; $R)
</code></pre>




<h2 id="std_option_do_mut">Macro function <span class="code-inline">do_mut</span></h2>

Execute a closure on the mutable reference to the value inside <span class="code-inline">t</span> if it holds one.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_do_mut">do_mut</a>&lt;$T, $R: drop&gt;($o: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&<b>mut</b> $T| -&gt; $R)
</code></pre>




<h2 id="std_option_or">Macro function <span class="code-inline">or</span></h2>

Select the first <span class="code-inline">Some</span> value from the two options, or <span class="code-inline">None</span> if both are <span class="code-inline">None</span>.<br/>
Equivalent to Rust's <span class="code-inline">a.<a href="../sui_std/option#std_option_or">or</a>(b)</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_or">or</a>&lt;$T&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $default: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_option_and">Macro function <span class="code-inline">and</span></h2>

If the value is <span class="code-inline">Some</span>, call the closure <span class="code-inline">f</span> on it. Otherwise, return <span class="code-inline">None</span>.<br/>
Equivalent to Rust's <span class="code-inline">t.and_then(f)</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_and">and</a>&lt;$T, $U&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |$T| -&gt; <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$U&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$U&gt;
</code></pre>




<h2 id="std_option_and_ref">Macro function <span class="code-inline">and_ref</span></h2>

If the value is <span class="code-inline">Some</span>, call the closure <span class="code-inline">f</span> on it. Otherwise, return <span class="code-inline">None</span>.<br/>
Equivalent to Rust's <span class="code-inline">t.and_then(f)</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_and_ref">and_ref</a>&lt;$T, $U&gt;($o: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$U&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$U&gt;
</code></pre>




<h2 id="std_option_map">Macro function <span class="code-inline">map</span></h2>

Map an <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> to <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;U&gt;</span> by applying a function to a contained value.<br/>
Equivalent to Rust's <span class="code-inline">t.<a href="../sui_std/option#std_option_map">map</a>(f)</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_map">map</a>&lt;$T, $U&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |$T| -&gt; $U): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$U&gt;
</code></pre>




<h2 id="std_option_map_ref">Macro function <span class="code-inline">map_ref</span></h2>

Map an <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> value to <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;U&gt;</span> by applying a function to a contained value by reference.<br/>
Original <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> is preserved.<br/>
Equivalent to Rust's <span class="code-inline">t.<a href="../sui_std/option#std_option_map">map</a>(f)</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_map_ref">map_ref</a>&lt;$T, $U&gt;($o: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&$T| -&gt; $U): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$U&gt;
</code></pre>




<h2 id="std_option_map_mut">Macro function <span class="code-inline">map_mut</span></h2>

Map an <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> value to <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;U&gt;</span> by applying a function to a contained value by mutable
reference. Original <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> is preserved, although potentially modified.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_map_mut">map_mut</a>&lt;$T, $U&gt;($o: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&<b>mut</b> $T| -&gt; $U): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$U&gt;
</code></pre>




<h2 id="std_option_filter">Macro function <span class="code-inline">filter</span></h2>

Return <span class="code-inline">None</span> if the value is <span class="code-inline">None</span>, otherwise return <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> if the predicate <span class="code-inline">f</span> returns true.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_filter">filter</a>&lt;$T: drop&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;
</code></pre>




<h2 id="std_option_is_some_and">Macro function <span class="code-inline">is_some_and</span></h2>

Return <span class="code-inline"><b>false</b></span> if the value is <span class="code-inline">None</span>, otherwise return the result of the predicate <span class="code-inline">f</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_is_some_and">is_some_and</a>&lt;$T&gt;($o: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_option_is_none_or">Macro function <span class="code-inline">is_none_or</span></h2>

Return <span class="code-inline"><b>true</b></span> if the value is <span class="code-inline">None</span>, or if the predicate <span class="code-inline">f</span> returns <span class="code-inline"><b>true</b></span> for the contained
value.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_is_none_or">is_none_or</a>&lt;$T&gt;($o: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $f: |&$T| -&gt; <a href="../sui_std/bool#std_bool">bool</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_option_fold">Macro function <span class="code-inline">fold</span></h2>

Consume the option and return <span class="code-inline">&#36;<a href="../sui_std/option#std_option_none">none</a></span> if it is <span class="code-inline">None</span>, otherwise apply <span class="code-inline">&#36;<a href="../sui_std/option#std_option_some">some</a></span> to the contained
value.<br/>
Note <span class="code-inline">&#36;<a href="../sui_std/option#std_option_none">none</a></span> is evaluated only if the option is <span class="code-inline">None</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_fold">fold</a>&lt;$T, $R&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $<a href="../sui_std/option#std_option_none">none</a>: $R, $<a href="../sui_std/option#std_option_some">some</a>: |$T| -&gt; $R): $R
</code></pre>




<h2 id="std_option_fold_ref">Macro function <span class="code-inline">fold_ref</span></h2>

Apply <span class="code-inline">&#36;<a href="../sui_std/option#std_option_some">some</a></span> to the borrowed value if <span class="code-inline">Some</span>, otherwise return <span class="code-inline">&#36;<a href="../sui_std/option#std_option_none">none</a></span>.<br/>
Original option is preserved.<br/>
Note <span class="code-inline">&#36;<a href="../sui_std/option#std_option_none">none</a></span> is evaluated only if the option is <span class="code-inline">None</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_fold_ref">fold_ref</a>&lt;$T, $R&gt;($o: &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $<a href="../sui_std/option#std_option_none">none</a>: $R, $<a href="../sui_std/option#std_option_some">some</a>: |&$T| -&gt; $R): $R
</code></pre>




<h2 id="std_option_fold_mut">Macro function <span class="code-inline">fold_mut</span></h2>

Apply <span class="code-inline">&#36;<a href="../sui_std/option#std_option_some">some</a></span> to the mutably borrowed value if <span class="code-inline">Some</span>, otherwise return <span class="code-inline">&#36;<a href="../sui_std/option#std_option_none">none</a></span>.<br/>
Note <span class="code-inline">&#36;<a href="../sui_std/option#std_option_none">none</a></span> is evaluated only if the option is <span class="code-inline">None</span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_fold_mut">fold_mut</a>&lt;$T, $R&gt;($o: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $<a href="../sui_std/option#std_option_none">none</a>: $R, $<a href="../sui_std/option#std_option_some">some</a>: |&<b>mut</b> $T| -&gt; $R): $R
</code></pre>




<h2 id="std_option_extract_or">Macro function <span class="code-inline">extract_or</span></h2>

Extract the value inside <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> if it holds one, or <span class="code-inline">default</span> otherwise.<br/>
Similar to <span class="code-inline"><a href="../sui_std/option#std_option_destroy_or">destroy_or</a></span>, but modifying the input <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a></span> via a mutable reference.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_extract_or">extract_or</a>&lt;$T&gt;($o: &<b>mut</b> <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $default: $T): $T
</code></pre>




<h2 id="std_option_destroy_or">Macro function <span class="code-inline">destroy_or</span></h2>

Destroy <span class="code-inline"><a href="../sui_std/option#std_option_Option">Option</a>&lt;T&gt;</span> and return the value inside if it holds one, or <span class="code-inline">default</span> otherwise.<br/>
Equivalent to Rust's <span class="code-inline">t.unwrap_or(default)</span>.

Note: this function is a more efficient version of <span class="code-inline"><a href="../sui_std/option#std_option_destroy_with_default">destroy_with_default</a></span>, as it does not
evaluate the default value unless necessary. The <span class="code-inline"><a href="../sui_std/option#std_option_destroy_with_default">destroy_with_default</a></span> function should be
deprecated in favor of this function.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_std/option#std_option_destroy_or">destroy_or</a>&lt;$T&gt;($o: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$T&gt;, $default: $T): $T
</code></pre>



