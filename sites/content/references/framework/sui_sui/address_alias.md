---
title: Module sui::address_alias
sidebar_label: address_alias
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/derived_object#sui_derived_object">sui::derived_object</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>

<h2 id="sui_address_alias_AddressAliasState">Struct <span class="code-inline">AddressAliasState</span></h2>

Singleton shared object which manages creation of AddressAliases state.<br/>
The actual alias configs are created as derived objects with this object
as the parent.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/address_alias#sui_address_alias_AddressAliasState">AddressAliasState</a> <b>has</b> key
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
<span class="code-inline">version: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_address_alias_AddressAliases">Struct <span class="code-inline">AddressAliases</span></h2>

Tracks the set of addresses allowed to act as a given sender.

An alias allows transactions signed by the alias address to act as the
original address. For example, if address X sets an alias of address Y, then
then a transaction signed by Y can set its sender address to X.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/address_alias#sui_address_alias_AddressAliases">AddressAliases</a> <b>has</b> key
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
<span class="code-inline">aliases: <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_address_alias_AliasKey">Struct <span class="code-inline">AliasKey</span></h2>

Internal key used for derivation of AddressAliases object addresses.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/address_alias#sui_address_alias_AliasKey">AliasKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/address_alias#sui_address_alias_ENotSystemAddress">ENotSystemAddress</a>: vector&lt;u8&gt; = b"Only the system can <a href="../sui_sui/address_alias#sui_address_alias_create">create</a> the alias state <a href="../sui_sui/object#sui_object">object</a>.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/address_alias#sui_address_alias_ENoSuchAlias">ENoSuchAlias</a>: vector&lt;u8&gt; = b"Given alias does not exist.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/address_alias#sui_address_alias_EAliasAlreadyExists">EAliasAlreadyExists</a>: vector&lt;u8&gt; = b"Alias already exists.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/address_alias#sui_address_alias_ECannotRemoveLastAlias">ECannotRemoveLastAlias</a>: vector&lt;u8&gt; = b"Cannot <a href="../sui_sui/address_alias#sui_address_alias_remove">remove</a> the last alias.";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/address_alias#sui_address_alias_ETooManyAliases">ETooManyAliases</a>: vector&lt;u8&gt; = b"The number of aliases exceeds the maximum allowed.";
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/address_alias#sui_address_alias_CURRENT_VERSION">CURRENT_VERSION</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/address_alias#sui_address_alias_MAX_ALIASES">MAX_ALIASES</a>: u64 = 8;
</code></pre>


<h2 id="sui_address_alias_create">Function <span class="code-inline">create</span></h2>

Create and share the AddressAliasState object. This function is called exactly once, when
the address alias state object is first created.<br/>
Can only be called by genesis or change_epoch transactions.


<pre><code><b>fun</b> <a href="../sui_sui/address_alias#sui_address_alias_create">create</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_address_alias_enable">Function <span class="code-inline">enable</span></h2>

Enables address alias configuration for the sender address.

By default, an address is its own alias. The provided <span class="code-inline"><a href="../sui_sui/address_alias#sui_address_alias_AddressAliases">AddressAliases</a></span>
object can be used to change the set of allowed aliases after enabling.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/address_alias#sui_address_alias_enable">enable</a>(address_alias_state: &<b>mut</b> <a href="../sui_sui/address_alias#sui_address_alias_AddressAliasState">sui::address_alias::AddressAliasState</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_address_alias_add">Function <span class="code-inline">add</span></h2>

Adds the provided address to the set of aliases for the sender.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/address_alias#sui_address_alias_add">add</a>(aliases: &<b>mut</b> <a href="../sui_sui/address_alias#sui_address_alias_AddressAliases">sui::address_alias::AddressAliases</a>, alias: <b>address</b>)
</code></pre>




<h2 id="sui_address_alias_replace_all">Function <span class="code-inline">replace_all</span></h2>

Overwrites the aliases for the sender's address with the given set.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/address_alias#sui_address_alias_replace_all">replace_all</a>(aliases: &<b>mut</b> <a href="../sui_sui/address_alias#sui_address_alias_AddressAliases">sui::address_alias::AddressAliases</a>, new_aliases: vector&lt;<b>address</b>&gt;)
</code></pre>




<h2 id="sui_address_alias_remove">Function <span class="code-inline">remove</span></h2>

Removes the given alias from the set of aliases for the sender's address.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/address_alias#sui_address_alias_remove">remove</a>(aliases: &<b>mut</b> <a href="../sui_sui/address_alias#sui_address_alias_AddressAliases">sui::address_alias::AddressAliases</a>, alias: <b>address</b>)
</code></pre>



