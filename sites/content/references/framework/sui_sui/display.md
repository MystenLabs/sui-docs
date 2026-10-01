---
title: Module sui::display
sidebar_label: display
---

Defines a Display struct which defines the way an Object
should be displayed. The intention is to keep data as independent
from its display as possible, protecting the development process
and keeping it separate from the ecosystem agreements.

Each of the fields of the Display object should allow for pattern
substitution and filling-in the pieces using the data from the object T.

More entry functions might be added in the future depending on the use cases.

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement">sui::accumulator_settlement</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/event#sui_event">sui::event</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/package#sui_package">sui::package</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_display_Display">Struct <span class="code-inline">Display</span></h2>

The Display<T> object. Defines the way a T instance should be
displayed. Display object can only be created and modified with
a PublisherCap, making sure that the rules are set by the owner
of the type.

Each of the display properties should support patterns outside
of the system, making it simpler to customize Display based
on the property values of an Object.
```
// Example of a display object.<br/>
Display<0x...::capy::Capy> {
 fields:
   <name, "Capy { genes }">
   <link, "https://capy.art/capy/{ id }">
   <image, "https://api.capy.art/capy/{ id }/svg">
   <description, "Lovely Capy, one of many">
}
```

Uses only String type due to external-facing nature of the object,
the property names have a priority over their types.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display#sui_display_Display">Display</a>&lt;<b>phantom</b> T: key&gt; <b>has</b> key, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/display#sui_display_fields">fields</a>: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_std/string#std_string_String">std::string::String</a>&gt;</span>
</dt>
<dd>
 Contains fields for display. Currently supported
 fields are: name, link, image and description.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/display#sui_display_version">version</a>: u16</span>
</dt>
<dd>
 Version that can only be updated manually by the Publisher.
</dd>
</dl>


</details>

<h2 id="sui_display_DisplayCreated">Struct <span class="code-inline">DisplayCreated</span></h2>

Event: emitted when a new Display object has been created for type T.<br/>
Type signature of the event corresponds to the type while id serves for
the discovery.

Since Sui RPC supports querying events by type, finding a Display for the T
would be as simple as looking for the first event with <span class="code-inline"><a href="../sui_sui/display#sui_display_Display">Display</a>&lt;T&gt;</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display#sui_display_DisplayCreated">DisplayCreated</a>&lt;<b>phantom</b> T: key&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_display_VersionUpdated">Struct <span class="code-inline">VersionUpdated</span></h2>

Version of Display got updated -


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display#sui_display_VersionUpdated">VersionUpdated</a>&lt;<b>phantom</b> T: key&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/display#sui_display_version">version</a>: u16</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/display#sui_display_fields">fields</a>: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_std/string#std_string_String">std::string::String</a>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

For when T does not belong to the package <span class="code-inline">Publisher</span>.


<pre><code><b>const</b> <a href="../sui_sui/display#sui_display_ENotOwner">ENotOwner</a>: u64 = 0;
</code></pre>

For when vectors passed into one of the multiple insert functions
don't match in their lengths.


<pre><code><b>const</b> <a href="../sui_sui/display#sui_display_EVecLengthMismatch">EVecLengthMismatch</a>: u64 = 1;
</code></pre>


<h2 id="sui_display_new">Function <span class="code-inline">new</span></h2>

Create an empty Display object. It can either be shared empty or filled
with data right away via cheaper <span class="code-inline">set_owned</span> method.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display#sui_display_new">new</a>&lt;T: key&gt;(pub: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;
</code></pre>




<h2 id="sui_display_new_with_fields">Function <span class="code-inline">new_with_fields</span></h2>

Create a new Display<T> object with a set of fields.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display#sui_display_new_with_fields">new_with_fields</a>&lt;T: key&gt;(pub: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>, <a href="../sui_sui/display#sui_display_fields">fields</a>: vector&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;, values: vector&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;
</code></pre>




<h2 id="sui_display_create_and_keep">Function <span class="code-inline">create_and_keep</span></h2>

Create a new empty Display<T> object and keep it.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/display#sui_display_create_and_keep">create_and_keep</a>&lt;T: key&gt;(pub: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_display_update_version">Function <span class="code-inline">update_version</span></h2>

Manually bump the version and emit an event with the updated version's contents.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/display#sui_display_update_version">update_version</a>&lt;T: key&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<b>mut</b> <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_add">Function <span class="code-inline">add</span></h2>

Sets a custom <span class="code-inline">name</span> field with the <span class="code-inline">value</span>.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/display#sui_display_add">add</a>&lt;T: key&gt;(self: &<b>mut</b> <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>, value: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_display_add_multiple">Function <span class="code-inline">add_multiple</span></h2>

Sets multiple <span class="code-inline"><a href="../sui_sui/display#sui_display_fields">fields</a></span> with <span class="code-inline">values</span>.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/display#sui_display_add_multiple">add_multiple</a>&lt;T: key&gt;(self: &<b>mut</b> <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;, <a href="../sui_sui/display#sui_display_fields">fields</a>: vector&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;, values: vector&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;)
</code></pre>




<h2 id="sui_display_edit">Function <span class="code-inline">edit</span></h2>

Change the value of the field.<br/>
TODO (long run): version changes;


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/display#sui_display_edit">edit</a>&lt;T: key&gt;(self: &<b>mut</b> <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>, value: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_display_remove">Function <span class="code-inline">remove</span></h2>

Remove the key from the Display.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/display#sui_display_remove">remove</a>&lt;T: key&gt;(self: &<b>mut</b> <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_display_is_authorized">Function <span class="code-inline">is_authorized</span></h2>

Authorization check; can be performed externally to implement protection rules for Display.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display#sui_display_is_authorized">is_authorized</a>&lt;T: key&gt;(pub: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>): bool
</code></pre>




<h2 id="sui_display_version">Function <span class="code-inline">version</span></h2>

Read the <span class="code-inline"><a href="../sui_sui/display#sui_display_version">version</a></span> field.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display#sui_display_version">version</a>&lt;T: key&gt;(d: &<a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;): u16
</code></pre>




<h2 id="sui_display_fields">Function <span class="code-inline">fields</span></h2>

Read the <span class="code-inline"><a href="../sui_sui/display#sui_display_fields">fields</a></span> field.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display#sui_display_fields">fields</a>&lt;T: key&gt;(d: &<a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;): &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_std/string#std_string_String">std::string::String</a>&gt;
</code></pre>




<h2 id="sui_display_destroy">Function <span class="code-inline">destroy</span></h2>

Allow destroying legacy display objects.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/display#sui_display_destroy">destroy</a>&lt;T: key&gt;(<a href="../sui_sui/display#sui_display">display</a>: <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_create_internal">Function <span class="code-inline">create_internal</span></h2>

Internal function to create a new <span class="code-inline"><a href="../sui_sui/display#sui_display_Display">Display</a>&lt;T&gt;</span>.


<pre><code><b>fun</b> <a href="../sui_sui/display#sui_display_create_internal">create_internal</a>&lt;T: key&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;
</code></pre>




<h2 id="sui_display_add_internal">Function <span class="code-inline">add_internal</span></h2>

Private method for inserting fields without security checks.


<pre><code><b>fun</b> <a href="../sui_sui/display#sui_display_add_internal">add_internal</a>&lt;T: key&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<b>mut</b> <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>, value: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>



