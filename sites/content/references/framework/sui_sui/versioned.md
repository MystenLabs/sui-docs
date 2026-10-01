---
title: Module sui::versioned
sidebar_label: versioned
---

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

<h2 id="sui_versioned_Versioned">Struct <span class="code-inline">Versioned</span></h2>

A wrapper type that supports versioning of the inner type.<br/>
The inner type is a dynamic field of the Versioned object, and is keyed using version.<br/>
User of this type could load the inner object using corresponding type based on the version.<br/>
You can also upgrade the inner object to a new type version.<br/>
If you want to support lazy upgrade of the inner type, one caveat is that all APIs would have
to use mutable reference even if it's a read-only API.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/versioned#sui_versioned_Versioned">Versioned</a> <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui/versioned#sui_versioned_version">version</a>: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_versioned_VersionChangeCap">Struct <span class="code-inline">VersionChangeCap</span></h2>

Represents a hot potato object generated when we take out the dynamic field.<br/>
This is to make sure that we always put a new value back.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/versioned#sui_versioned_VersionChangeCap">VersionChangeCap</a>
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">versioned_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">old_version: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Failed to upgrade the inner object due to invalid capability or new version.


<pre><code><b>const</b> <a href="../sui_sui/versioned#sui_versioned_EInvalidUpgrade">EInvalidUpgrade</a>: u64 = 0;
</code></pre>


<h2 id="sui_versioned_create">Function <span class="code-inline">create</span></h2>

Create a new Versioned object that contains a initial value of type <span class="code-inline">T</span> with an initial version.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/versioned#sui_versioned_create">create</a>&lt;T: store&gt;(init_version: u64, init_value: T, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a>
</code></pre>




<h2 id="sui_versioned_version">Function <span class="code-inline">version</span></h2>

Get the current version of the inner type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/versioned#sui_versioned_version">version</a>(self: &<a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a>): u64
</code></pre>




<h2 id="sui_versioned_load_value">Function <span class="code-inline">load_value</span></h2>

Load the inner value based on the current version. Caller specifies an expected type T.<br/>
If the type mismatch, the load will fail.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/versioned#sui_versioned_load_value">load_value</a>&lt;T: store&gt;(self: &<a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a>): &T
</code></pre>




<h2 id="sui_versioned_load_value_mut">Function <span class="code-inline">load_value_mut</span></h2>

Similar to load_value, but return a mutable reference.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/versioned#sui_versioned_load_value_mut">load_value_mut</a>&lt;T: store&gt;(self: &<b>mut</b> <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a>): &<b>mut</b> T
</code></pre>




<h2 id="sui_versioned_remove_value_for_upgrade">Function <span class="code-inline">remove_value_for_upgrade</span></h2>

Take the inner object out for upgrade. To ensure we always upgrade properly, a capability object is returned
and must be used when we upgrade.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/versioned#sui_versioned_remove_value_for_upgrade">remove_value_for_upgrade</a>&lt;T: store&gt;(self: &<b>mut</b> <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a>): (T, <a href="../sui_sui/versioned#sui_versioned_VersionChangeCap">sui::versioned::VersionChangeCap</a>)
</code></pre>




<h2 id="sui_versioned_upgrade">Function <span class="code-inline">upgrade</span></h2>

Upgrade the inner object with a new version and new value. Must use the capability returned
by calling remove_value_for_upgrade.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/versioned#sui_versioned_upgrade">upgrade</a>&lt;T: store&gt;(self: &<b>mut</b> <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a>, new_version: u64, new_value: T, cap: <a href="../sui_sui/versioned#sui_versioned_VersionChangeCap">sui::versioned::VersionChangeCap</a>)
</code></pre>




<h2 id="sui_versioned_destroy">Function <span class="code-inline">destroy</span></h2>

Destroy this Versioned container, and return the inner object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/versioned#sui_versioned_destroy">destroy</a>&lt;T: store&gt;(self: <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a>): T
</code></pre>



