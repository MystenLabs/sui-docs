---
title: Module sui::dynamic_field
sidebar_label: dynamic_field
---

In addition to the fields declared in its type definition, a Sui object can have dynamic fields
that can be added after the object has been constructed. Unlike ordinary field names
(which are always statically declared identifiers) a dynamic field name can be any value with
the <span class="code-inline"><b>copy</b></span>, <span class="code-inline">drop</span>, and <span class="code-inline">store</span> abilities, e.g. an integer, a boolean, or a string.<br/>
This gives Sui programmers the flexibility to extend objects on-the-fly, and it also serves as a
building block for core collection types

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_dynamic_field_Field">Struct <span class="code-inline">Field</span></h2>

Internal object used for storing the field and value


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_Field">Field</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt; <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
 Determined by the hash of the object ID, the field name value and it's type,
 i.e. hash(parent.id || name || Name)
</dd>
<dt>
<span class="code-inline">name: Name</span>
</dt>
<dd>
 The value for the name of this field
</dd>
<dt>
<span class="code-inline">value: Value</span>
</dt>
<dd>
 The value bound to this field
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

The object already has a dynamic field with this name (with the value and type specified)


<pre><code><b>const</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">EFieldAlreadyExists</a>: u64 = 0;
</code></pre>

Cannot load dynamic field.<br/>
The object does not have a dynamic field with this name (with the value and type specified)


<pre><code><b>const</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">EFieldDoesNotExist</a>: u64 = 1;
</code></pre>

The object has a field with that name, but the value type does not match


<pre><code><b>const</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a>: u64 = 2;
</code></pre>

Failed to serialize the field's name


<pre><code><b>const</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure">EBCSSerializationFailure</a>: u64 = 3;
</code></pre>

The object added as a dynamic field was previously a shared object


<pre><code><b>const</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_ESharedObjectOperationNotSupported">ESharedObjectOperationNotSupported</a>: u64 = 4;
</code></pre>


<h2 id="sui_dynamic_field_add">Function <span class="code-inline">add</span></h2>

Adds a dynamic field to the object <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> UID</span> at field specified by <span class="code-inline">name: Name</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists">EFieldAlreadyExists</a></span> if the object already has that field with that name.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_add">add</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name, value: Value)
</code></pre>




<h2 id="sui_dynamic_field_borrow">Function <span class="code-inline">borrow</span></h2>

Immutably borrows the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span>s dynamic field with the name specified by <span class="code-inline">name: Name</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">EFieldDoesNotExist</a></span> if the object does not have a field with that name.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): &Value
</code></pre>




<h2 id="sui_dynamic_field_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Mutably borrows the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span>s dynamic field with the name specified by <span class="code-inline">name: Name</span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">EFieldDoesNotExist</a></span> if the object does not have a field with that name.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_borrow_mut">borrow_mut</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): &<b>mut</b> Value
</code></pre>




<h2 id="sui_dynamic_field_remove">Function <span class="code-inline">remove</span></h2>

Removes the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span>s dynamic field with the name specified by <span class="code-inline">name: Name</span> and returns the
bound value.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">EFieldDoesNotExist</a></span> if the object does not have a field with that name.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_remove">remove</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): Value
</code></pre>




<h2 id="sui_dynamic_field_exists">Function <span class="code-inline">exists</span></h2>

Returns true if and only if the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span> has a dynamic field with the name specified by
<span class="code-inline">name: Name</span> but without specifying the <span class="code-inline">Value</span> type


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_exists">exists</a>&lt;Name: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): bool
</code></pre>




<h2 id="sui_dynamic_field_remove_opt">Function <span class="code-inline">remove_opt</span></h2>

Removes the dynamic field if it exists. Returns <span class="code-inline">some(Value)</span> if it exists or <span class="code-inline">none</span> otherwise.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_remove_opt">remove_opt</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>




<h2 id="sui_dynamic_field_replace">Function <span class="code-inline">replace</span></h2>

Removes the existing value at <span class="code-inline">name</span> (if any) and adds <span class="code-inline">value</span> in its place.<br/>
Returns the old value if it existed, or <span class="code-inline">none</span> otherwise.<br/>
Note: the old and new value types may differ.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
<span class="code-inline">ValueOld</span> type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_replace">replace</a>&lt;Name: <b>copy</b>, drop, store, ValueNew: store, ValueOld: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name, value: ValueNew): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;ValueOld&gt;
</code></pre>




<h2 id="sui_dynamic_field_exists_with_type">Function <span class="code-inline">exists_with_type</span></h2>

Returns true if and only if the <span class="code-inline"><a href="../sui_sui/object#sui_object">object</a></span> has a dynamic field with the name specified by <span class="code-inline">name: Name</span> with an assigned value of type <span class="code-inline">Value</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_exists_with_type">exists_with_type</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): bool
</code></pre>




<h2 id="sui_dynamic_field_borrow_or_add">Macro function <span class="code-inline">borrow_or_add</span></h2>

Immutably borrows the field value, adding it with <span class="code-inline">&#36;default</span> if it doesn't exist.<br/>
Note that <span class="code-inline">&#36;default</span> is evaluated only if the field does not already exist.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_borrow_or_add">borrow_or_add</a>&lt;$Name: <b>copy</b>, drop, store, $Value: store&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $default: $Value): &$Value
</code></pre>




<h2 id="sui_dynamic_field_borrow_mut_or_add">Macro function <span class="code-inline">borrow_mut_or_add</span></h2>

Mutably borrows the field value, adding it with <span class="code-inline">&#36;default</span> if it doesn't exist.<br/>
Note that <span class="code-inline">&#36;default</span> is evaluated only if the field does not already exist.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_borrow_mut_or_add">borrow_mut_or_add</a>&lt;$Name: <b>copy</b>, drop, store, $Value: store&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $default: $Value): &<b>mut</b> $Value
</code></pre>




<h2 id="sui_dynamic_field_get_do">Macro function <span class="code-inline">get_do</span></h2>

If the field exists, calls <span class="code-inline">&#36;f</span> on an immutable reference to the value; otherwise, does nothing.<br/>
This is like getting an <span class="code-inline">Option&lt;&Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_do">std::option::do</a></span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_get_do">get_do</a>&lt;$Name: <b>copy</b>, drop, store, $Value: store, $R: drop&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $f: |&$Value| -&gt; $R)
</code></pre>




<h2 id="sui_dynamic_field_get_mut_do">Macro function <span class="code-inline">get_mut_do</span></h2>

If the field exists, calls <span class="code-inline">&#36;f</span> on a mutable reference to the value; otherwise, does nothing.<br/>
This is like getting an <span class="code-inline">Option&lt;&<b>mut</b> Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_do">std::option::do</a></span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_get_mut_do">get_mut_do</a>&lt;$Name: <b>copy</b>, drop, store, $Value: store, $R: drop&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $f: |&<b>mut</b> $Value| -&gt; $R)
</code></pre>




<h2 id="sui_dynamic_field_get_fold">Macro function <span class="code-inline">get_fold</span></h2>

If the field exists, applies <span class="code-inline">&#36;some</span> to an immutable reference to the value; otherwise, returns <span class="code-inline">&#36;none</span>.<br/>
This is like getting an <span class="code-inline">Option&lt;&Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_fold">std::option::fold</a></span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_get_fold">get_fold</a>&lt;$Name: <b>copy</b>, drop, store, $Value: store, $R&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $none: $R, $some: |&$Value| -&gt; $R): $R
</code></pre>




<h2 id="sui_dynamic_field_get_mut_fold">Macro function <span class="code-inline">get_mut_fold</span></h2>

If the field exists, applies <span class="code-inline">&#36;some</span> to a mutable reference to the value; otherwise, returns <span class="code-inline">&#36;none</span>.<br/>
This is like getting an <span class="code-inline">Option&lt;&<b>mut</b> Value&gt;</span> then calling <span class="code-inline"><a href="../sui_std/option#std_option_fold">std::option::fold</a></span>.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the field exists, but the value does not have the specified
type.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_get_mut_fold">get_mut_fold</a>&lt;$Name: <b>copy</b>, drop, store, $Value: store, $R&gt;($<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, $name: $Name, $none: $R, $some: |&<b>mut</b> $Value| -&gt; $R): $R
</code></pre>




<h2 id="sui_dynamic_field_exists_">Function <span class="code-inline">exists_</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_exists_">exists_</a>&lt;Name: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): bool
</code></pre>




<h2 id="sui_dynamic_field_remove_if_exists">Function <span class="code-inline">remove_if_exists</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_remove_if_exists">remove_if_exists</a>&lt;Name: <b>copy</b>, drop, store, Value: store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>




<h2 id="sui_dynamic_field_field_info">Function <span class="code-inline">field_info</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_field_info">field_info</a>&lt;Name: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): (&<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, <b>address</b>)
</code></pre>




<h2 id="sui_dynamic_field_field_info_mut">Function <span class="code-inline">field_info_mut</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_field_info_mut">field_info_mut</a>&lt;Name: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, name: Name): (&<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, <b>address</b>)
</code></pre>




<h2 id="sui_dynamic_field_hash_type_and_key">Function <span class="code-inline">hash_type_and_key</span></h2>

May abort with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure">EBCSSerializationFailure</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_hash_type_and_key">hash_type_and_key</a>&lt;K: <b>copy</b>, drop&gt;(parent: <b>address</b>, k: K): <b>address</b>
</code></pre>




<h2 id="sui_dynamic_field_add_child_object">Function <span class="code-inline">add_child_object</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_add_child_object">add_child_object</a>&lt;Child: key&gt;(parent: <b>address</b>, child: Child)
</code></pre>




<h2 id="sui_dynamic_field_borrow_child_object">Function <span class="code-inline">borrow_child_object</span></h2>

throws <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">EFieldDoesNotExist</a></span> if a child does not exist with that ID
or throws <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the type does not match,
and may also abort with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure">EBCSSerializationFailure</a></span>
we need two versions to return a reference or a mutable reference


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_borrow_child_object">borrow_child_object</a>&lt;Child: key&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, id: <b>address</b>): &Child
</code></pre>




<h2 id="sui_dynamic_field_borrow_child_object_mut">Function <span class="code-inline">borrow_child_object_mut</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_borrow_child_object_mut">borrow_child_object_mut</a>&lt;Child: key&gt;(<a href="../sui_sui/object#sui_object">object</a>: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, id: <b>address</b>): &<b>mut</b> Child
</code></pre>




<h2 id="sui_dynamic_field_remove_child_object">Function <span class="code-inline">remove_child_object</span></h2>

throws <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist">EFieldDoesNotExist</a></span> if a child does not exist with that ID
or throws <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch">EFieldTypeMismatch</a></span> if the type does not match,
and may also abort with <span class="code-inline"><a href="../sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure">EBCSSerializationFailure</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_remove_child_object">remove_child_object</a>&lt;Child: key&gt;(parent: <b>address</b>, id: <b>address</b>): Child
</code></pre>




<h2 id="sui_dynamic_field_has_child_object">Function <span class="code-inline">has_child_object</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_has_child_object">has_child_object</a>(parent: <b>address</b>, id: <b>address</b>): bool
</code></pre>




<h2 id="sui_dynamic_field_has_child_object_with_ty">Function <span class="code-inline">has_child_object_with_ty</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field_has_child_object_with_ty">has_child_object_with_ty</a>&lt;Child: key&gt;(parent: <b>address</b>, id: <b>address</b>): bool
</code></pre>



