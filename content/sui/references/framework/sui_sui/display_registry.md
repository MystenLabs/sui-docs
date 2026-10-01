---
title: Module sui::display_registry
sidebar_label: display_registry
---

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/internal#std_internal">std::internal</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement">sui::accumulator_settlement</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/derived_object#sui_derived_object">sui::derived_object</a>;
<b>use</b> <a href="../sui_sui/display#sui_display">sui::display</a>;
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

<h2 id="sui_display_registry_DisplayRegistry">Struct <span class="code-inline">DisplayRegistry</span></h2>

The root of display, to enable derivation of addresses.<br/>
The address is system-generated at <span class="code-inline">0xd</span>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayRegistry">DisplayRegistry</a> <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_display_registry_SystemMigrationCap">Struct <span class="code-inline">SystemMigrationCap</span></h2>

A singleton capability object to enable migrating all V1 displays into V2.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display_registry#sui_display_registry_SystemMigrationCap">SystemMigrationCap</a> <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_display_registry_Display">Struct <span class="code-inline">Display</span></h2>

This is the struct that holds the display values for a type T.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display_registry#sui_display_registry_Display">Display</a>&lt;<b>phantom</b> T&gt; <b>has</b> key
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
<span class="code-inline"><a href="../sui_sui/display_registry#sui_display_registry_fields">fields</a>: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_std/string#std_string_String">std::string::String</a>&gt;</span>
</dt>
<dd>
 All the (key,value) entries for a given display object.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/display_registry#sui_display_registry_cap_id">cap_id</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>&gt;</span>
</dt>
<dd>
 The capability object ID. It's <span class="code-inline">Option</span> because legacy Displays will need claiming.
</dd>
</dl>


</details>

<h2 id="sui_display_registry_DisplayCap">Struct <span class="code-inline">DisplayCap</span></h2>

The capability object that is used to manage the display.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">DisplayCap</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_display_registry_DisplayKey">Struct <span class="code-inline">DisplayKey</span></h2>

The key used for deriving the instance of <span class="code-inline"><a href="../sui_sui/display_registry#sui_display_registry_Display">Display</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayKey">DisplayKey</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="@Constants_0">Constants</h2>

This is a multi-sig address responsible for the migration of V1 displays into V2.


<pre><code><b>const</b> <a href="../sui_sui/display_registry#sui_display_registry_SYSTEM_MIGRATION_ADDRESS">SYSTEM_MIGRATION_ADDRESS</a>: <b>address</b> = 0x80e8249451c1a94b0d4ec317d9dd040f11344dcce6f917218086caf2bb1d7bdd;
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/display_registry#sui_display_registry_ENotSystemAddress">ENotSystemAddress</a>: vector&lt;u8&gt; = b"This is only callable from system <b>address</b>.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/display_registry#sui_display_registry_EDisplayAlreadyExists">EDisplayAlreadyExists</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/display_registry#sui_display_registry_Display">Display</a> <b>for</b> the supplied type already exists.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/display_registry#sui_display_registry_ECapAlreadyClaimed">ECapAlreadyClaimed</a>: vector&lt;u8&gt; = b"Cap <b>for</b> this <a href="../sui_sui/display#sui_display">display</a> <a href="../sui_sui/object#sui_object">object</a> <b>has</b> already been claimed.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/display_registry#sui_display_registry_ENotValidPublisher">ENotValidPublisher</a>: vector&lt;u8&gt; = b"The publisher is not valid <b>for</b> the supplied type.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/display_registry#sui_display_registry_EFieldDoesNotExist">EFieldDoesNotExist</a>: vector&lt;u8&gt; = b"Field does not exist in the <a href="../sui_sui/display#sui_display">display</a>.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/display_registry#sui_display_registry_ECapNotClaimed">ECapNotClaimed</a>: vector&lt;u8&gt; = b"Cap <b>for</b> this <a href="../sui_sui/display#sui_display">display</a> <a href="../sui_sui/object#sui_object">object</a> <b>has</b> not been claimed so you cannot delete the legacy <a href="../sui_sui/display#sui_display">display</a> yet.";
</code></pre>


<h2 id="sui_display_registry_new">Function <span class="code-inline">new</span></h2>

Create a new Display object for a given type <span class="code-inline">T</span> using <span class="code-inline">internal::Permit</span> to
prove type ownership.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_new">new</a>&lt;T&gt;(registry: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayRegistry">sui::display_registry::DisplayRegistry</a>, _: <a href="../sui_std/internal#std_internal_Permit">std::internal::Permit</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, <a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_registry_new_with_publisher">Function <span class="code-inline">new_with_publisher</span></h2>

Create a new display object using the <span class="code-inline">Publisher</span> object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_new_with_publisher">new_with_publisher</a>&lt;T&gt;(registry: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayRegistry">sui::display_registry::DisplayRegistry</a>, publisher: &<b>mut</b> <a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, <a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_registry_unset">Function <span class="code-inline">unset</span></h2>

Unset a key from display.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_unset">unset</a>&lt;T&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, _: &<a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_display_registry_set">Function <span class="code-inline">set</span></h2>

Set a value for the specified key, replaces existing value if it exists.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_set">set</a>&lt;T&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, _: &<a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>, value: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_display_registry_clear">Function <span class="code-inline">clear</span></h2>

Clear the display vec_map, allowing a fresh re-creation of fields


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_clear">clear</a>&lt;T&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, _: &<a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_registry_share">Function <span class="code-inline">share</span></h2>

Share the <span class="code-inline"><a href="../sui_sui/display_registry#sui_display_registry_Display">Display</a></span> object to finalize the creation.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_share">share</a>&lt;T&gt;(<a href="../sui_sui/display#sui_display">display</a>: <a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_registry_claim">Function <span class="code-inline">claim</span></h2>

Allow a legacy Display holder to claim the capability object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_claim">claim</a>&lt;T: key&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, legacy: <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;
</code></pre>




<h2 id="sui_display_registry_claim_with_publisher">Function <span class="code-inline">claim_with_publisher</span></h2>

Allow claiming a new display using <span class="code-inline">Publisher</span> as proof of ownership.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_claim_with_publisher">claim_with_publisher</a>&lt;T: key&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, publisher: &<b>mut</b> <a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;
</code></pre>




<h2 id="sui_display_registry_system_migration">Function <span class="code-inline">system_migration</span></h2>

Allow the <span class="code-inline"><a href="../sui_sui/display_registry#sui_display_registry_SystemMigrationCap">SystemMigrationCap</a></span> holder to create display objects with supplied
values. The migration is performed once on launch of the DisplayRegistry,
further migrations will have to be performed for each object, and will only
be possible until legacy <span class="code-inline"><a href="../sui_sui/display#sui_display">display</a></span> methods are finally deprecated.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_system_migration">system_migration</a>&lt;T: key&gt;(registry: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayRegistry">sui::display_registry::DisplayRegistry</a>, _: &<a href="../sui_sui/display_registry#sui_display_registry_SystemMigrationCap">sui::display_registry::SystemMigrationCap</a>, keys: vector&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;, values: vector&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_display_registry_migrate_v1_to_v2">Function <span class="code-inline">migrate_v1_to_v2</span></h2>

Enables migrating legacy display into the new one,
if a new one has not yet been created.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_migrate_v1_to_v2">migrate_v1_to_v2</a>&lt;T: key&gt;(registry: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayRegistry">sui::display_registry::DisplayRegistry</a>, legacy: <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, <a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_registry_destroy_system_migration_cap">Function <span class="code-inline">destroy_system_migration_cap</span></h2>

Destroy the <span class="code-inline"><a href="../sui_sui/display_registry#sui_display_registry_SystemMigrationCap">SystemMigrationCap</a></span> after successfully migrating all V1 instances.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_destroy_system_migration_cap">destroy_system_migration_cap</a>(cap: <a href="../sui_sui/display_registry#sui_display_registry_SystemMigrationCap">sui::display_registry::SystemMigrationCap</a>)
</code></pre>




<h2 id="sui_display_registry_transfer_migration_cap">Function <span class="code-inline">transfer_migration_cap</span></h2>


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_transfer_migration_cap">transfer_migration_cap</a>(cap: <a href="../sui_sui/display_registry#sui_display_registry_SystemMigrationCap">sui::display_registry::SystemMigrationCap</a>, recipient: <b>address</b>)
</code></pre>




<h2 id="sui_display_registry_delete_legacy">Function <span class="code-inline">delete_legacy</span></h2>

Allow deleting legacy display objects, as long as the cap has been claimed first.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_delete_legacy">delete_legacy</a>&lt;T: key&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, legacy: <a href="../sui_sui/display#sui_display_Display">sui::display::Display</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_registry_fields">Function <span class="code-inline">fields</span></h2>

Get a reference to the fields of display.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_fields">fields</a>&lt;T&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;): &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_std/string#std_string_String">std::string::String</a>&gt;
</code></pre>




<h2 id="sui_display_registry_cap_id">Function <span class="code-inline">cap_id</span></h2>

Get the cap ID for the display.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_cap_id">cap_id</a>&lt;T&gt;(<a href="../sui_sui/display#sui_display">display</a>: &<a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>&gt;
</code></pre>




<h2 id="sui_display_registry_migration_cap_receiver">Function <span class="code-inline">migration_cap_receiver</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_migration_cap_receiver">migration_cap_receiver</a>(): <b>address</b>
</code></pre>




<h2 id="sui_display_registry_new_display">Function <span class="code-inline">new_display</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_new_display">new_display</a>&lt;T&gt;(registry: &<b>mut</b> <a href="../sui_sui/display_registry#sui_display_registry_DisplayRegistry">sui::display_registry::DisplayRegistry</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/display_registry#sui_display_registry_Display">sui::display_registry::Display</a>&lt;T&gt;, <a href="../sui_sui/display_registry#sui_display_registry_DisplayCap">sui::display_registry::DisplayCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_display_registry_create">Function <span class="code-inline">create</span></h2>

Create a new display registry object callable only from 0x0 (end of epoch)


<pre><code><b>fun</b> <a href="../sui_sui/display_registry#sui_display_registry_create">create</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



