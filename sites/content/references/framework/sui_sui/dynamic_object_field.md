---
title: Module sui::dynamic_object_field
sidebar_label: dynamic_object_field
---

Similar to <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a></span>, this module allows for the access of dynamic fields. But
unlike, <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a></span> the values bound to these dynamic fields _must_ be objects
themselves. This allows for the objects to still exist within in storage, which may be important
for external tools. The difference is otherwise not observable from within Move.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_dynamic_object_field_Wrapper">Struct <span class="code-inline">Wrapper</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_Wrapper">Wrapper</a>&lt;Name&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">name: Name</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_dynamic_object_field_add">Function <span class="code-inline">add</span></h2>

Adds a dynamic object field to the object <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> UID</span> at field specified by <span class="code-inline">name: Name</span>.<br/>
Aborts with <span class="code-inline">EFieldAlreadyExists</span> if the object already has that field with that name.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_add">add</a>&lt;Name: <b>copy</b>, drop, store, Value: key, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name, value: Value)
</code></pre>




<h2 id="sui_dynamic_object_field_borrow">Function <span class="code-inline">borrow</span></h2>

Immutably borrows the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span>s dynamic object field with the name specified by <span class="code-inline">name: Name</span>.<br/>
Aborts with <span class="code-inline">EFieldDoesNotExist</span> if the object does not have a field with that name.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;Name: <b>copy</b>, drop, store, Value: key, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): &Value
</code></pre>




<h2 id="sui_dynamic_object_field_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Mutably borrows the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span>s dynamic object field with the name specified by <span class="code-inline">name: Name</span>.<br/>
Aborts with <span class="code-inline">EFieldDoesNotExist</span> if the object does not have a field with that name.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_mut">borrow_mut</a>&lt;Name: <b>copy</b>, drop, store, Value: key, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): &<b>mut</b> Value
</code></pre>




<h2 id="sui_dynamic_object_field_remove">Function <span class="code-inline">remove</span></h2>

Removes the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span>s dynamic object field with the name specified by <span class="code-inline">name: Name</span> and returns
the bound object.<br/>
Aborts with <span class="code-inline">EFieldDoesNotExist</span> if the object does not have a field with that name.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_remove">remove</a>&lt;Name: <b>copy</b>, drop, store, Value: key, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): Value
</code></pre>




<h2 id="sui_dynamic_object_field_exists">Function <span class="code-inline">exists</span></h2>

Returns true if and only if the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span> has a dynamic object field with the name specified by <span class="code-inline">name: Name</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_exists">exists</a>&lt;Name: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): bool
</code></pre>




<h2 id="sui_dynamic_object_field_exists_with_type">Function <span class="code-inline">exists_with_type</span></h2>

Returns true if and only if the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span> has a dynamic field with the name specified by <span class="code-inline">name: Name</span> with an assigned value of type <span class="code-inline">Value</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_exists_with_type">exists_with_type</a>&lt;Name: <b>copy</b>, drop, store, Value: key, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): bool
</code></pre>




<h2 id="sui_dynamic_object_field_id">Function <span class="code-inline">id</span></h2>

Returns the ID of the object associated with the dynamic object field.<br/>
Returns none otherwise


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_id">id</a>&lt;Name: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>&gt;
</code></pre>




<h2 id="sui_dynamic_object_field_remove_opt">Function <span class="code-inline">remove_opt</span></h2>

Removes the dynamic object field if it exists. Returns <span class="code-inline">some(Value)</span> if it exists or <span class="code-inline">none</span>
otherwise.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_remove_opt">remove_opt</a>&lt;Name: <b>copy</b>, drop, store, Value: key, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>




<h2 id="sui_dynamic_object_field_replace">Function <span class="code-inline">replace</span></h2>

Removes the existing value at <span class="code-inline">name</span> (if any) and adds <span class="code-inline">value</span> in its place.<br/>
Returns the old value if it existed, or <span class="code-inline">none</span> otherwise.<br/>
Note: the old and new value types may differ.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified <span class="code-inline">ValueOld</span> type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_replace">replace</a>&lt;Name: <b>copy</b>, drop, store, ValueNew: key, store, ValueOld: key, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name, value: ValueNew): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;ValueOld&gt;
</code></pre>




<h2 id="sui_dynamic_object_field_borrow_or_add">Macro function <span class="code-inline">borrow_or_add</span></h2>

Immutably borrows the field value, adding it with <span class="code-inline">&#36;default</span> if it doesn't exist.<br/>
Note that <span class="code-inline">&#36;default</span> is evaluated only if the field does not already exist.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_or_add">borrow_or_add</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key, store&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $default: $Value): &$Value
</code></pre>




<h2 id="sui_dynamic_object_field_borrow_mut_or_add">Macro function <span class="code-inline">borrow_mut_or_add</span></h2>

Mutably borrows the field value, adding it with <span class="code-inline">&#36;default</span> if it doesn't exist.<br/>
Note that <span class="code-inline">&#36;default</span> is evaluated only if the field does not already exist.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_mut_or_add">borrow_mut_or_add</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key, store&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $default: $Value): &<b>mut</b> $Value
</code></pre>




<h2 id="sui_dynamic_object_field_get_do">Macro function <span class="code-inline">get_do</span></h2>

If the field exists, calls <span class="code-inline">&#36;f</span> on an immutable reference to the value; otherwise, does nothing.<br/>
This is like getting an <span class="code-inline">Option&lt;&Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_do">std::option::do</a></span>.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_get_do">get_do</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key, store, $R: drop&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $f: |&$Value| -&gt; $R)
</code></pre>




<h2 id="sui_dynamic_object_field_get_mut_do">Macro function <span class="code-inline">get_mut_do</span></h2>

If the field exists, calls <span class="code-inline">&#36;f</span> on a mutable reference to the value; otherwise, does nothing.<br/>
This is like getting an <span class="code-inline">Option&lt;&<b>mut</b> Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_do">std::option::do</a></span>.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_get_mut_do">get_mut_do</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key, store, $R: drop&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $f: |&<b>mut</b> $Value| -&gt; $R)
</code></pre>




<h2 id="sui_dynamic_object_field_get_fold">Macro function <span class="code-inline">get_fold</span></h2>

If the field exists, applies <span class="code-inline">&#36;some</span> to an immutable reference to the value; otherwise, returns <span class="code-inline">&#36;none</span>.<br/>
This is like getting an <span class="code-inline">Option&lt;&Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_fold">std::option::fold</a></span>.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_get_fold">get_fold</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key, store, $R&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $none: $R, $some: |&$Value| -&gt; $R): $R
</code></pre>




<h2 id="sui_dynamic_object_field_get_mut_fold">Macro function <span class="code-inline">get_mut_fold</span></h2>

If the field exists, applies <span class="code-inline">&#36;some</span> to a mutable reference to the value; otherwise, returns <span class="code-inline">&#36;none</span>.<br/>
This is like getting an <span class="code-inline">Option&lt;&<b>mut</b> Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_fold">std::option::fold</a></span>.<br/>
Aborts with <span class="code-inline">EFieldTypeMismatch</span> if the field exists, but the value object does not have the
specified type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_get_mut_fold">get_mut_fold</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key, store, $R&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $none: $R, $some: |&<b>mut</b> $Value| -&gt; $R): $R
</code></pre>




<h2 id="sui_dynamic_object_field_exists_">Function <span class="code-inline">exists_</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_exists_">exists_</a>&lt;Name: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): bool
</code></pre>




<h2 id="sui_dynamic_object_field_internal_add">Function <span class="code-inline">internal_add</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_add">internal_add</a>&lt;Name: <b>copy</b>, drop, store, Value: key&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name, value: Value)
</code></pre>




<h2 id="sui_dynamic_object_field_internal_borrow">Function <span class="code-inline">internal_borrow</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_borrow">internal_borrow</a>&lt;Name: <b>copy</b>, drop, store, Value: key&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): &Value
</code></pre>




<h2 id="sui_dynamic_object_field_internal_borrow_mut">Function <span class="code-inline">internal_borrow_mut</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_borrow_mut">internal_borrow_mut</a>&lt;Name: <b>copy</b>, drop, store, Value: key&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): &<b>mut</b> Value
</code></pre>




<h2 id="sui_dynamic_object_field_internal_remove">Function <span class="code-inline">internal_remove</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_remove">internal_remove</a>&lt;Name: <b>copy</b>, drop, store, Value: key&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): Value
</code></pre>




<h2 id="sui_dynamic_object_field_internal_exists_with_type">Function <span class="code-inline">internal_exists_with_type</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_exists_with_type">internal_exists_with_type</a>&lt;Name: <b>copy</b>, drop, store, Value: key&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): bool
</code></pre>




<h2 id="sui_dynamic_object_field_add_impl">Macro function <span class="code-inline">add_impl</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_add_impl">add_impl</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $value: $Value)
</code></pre>




<h2 id="sui_dynamic_object_field_borrow_impl">Macro function <span class="code-inline">borrow_impl</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_impl">borrow_impl</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name): &$Value
</code></pre>




<h2 id="sui_dynamic_object_field_borrow_mut_impl">Macro function <span class="code-inline">borrow_mut_impl</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_mut_impl">borrow_mut_impl</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name): &<b>mut</b> $Value
</code></pre>




<h2 id="sui_dynamic_object_field_remove_impl">Macro function <span class="code-inline">remove_impl</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_remove_impl">remove_impl</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name): $Value
</code></pre>




<h2 id="sui_dynamic_object_field_exists_with_type_impl">Macro function <span class="code-inline">exists_with_type_impl</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field_exists_with_type_impl">exists_with_type_impl</a>&lt;$Name: <b>copy</b>, drop, store, $Value: key&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name): bool
</code></pre>



