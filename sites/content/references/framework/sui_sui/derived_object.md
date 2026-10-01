---
title: Module sui::derived_object
sidebar_label: derived_object
---

Enables the creation of objects with deterministic addresses derived from a parent object's UID.<br/>
This module provides a way to generate objects with predictable addresses based on a parent UID
and a key, creating a namespace that ensures uniqueness for each parent-key combination,
which is usually how registries are built.

Key features:
- Deterministic address generation based on parent object UID and key
- Derived objects can exist and operate independently of their parent

The derived UIDs, once created, are independent and do not require sequencing on the parent
object. They can be used without affecting the parent. The parent only maintains a record of
which derived addresses have been claimed to prevent duplicates.

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

<h2 id="sui_derived_object_Claimed">Struct <span class="code-inline">Claimed</span></h2>

Added as a DF to the parent's UID, to mark an ID as claimed.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/derived_object#sui_derived_object_Claimed">Claimed</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_derived_object_DerivedObjectKey">Struct <span class="code-inline">DerivedObjectKey</span></h2>

An internal key to protect from generating the same UID twice (e.g. collide with DFs)


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/derived_object#sui_derived_object_DerivedObjectKey">DerivedObjectKey</a>&lt;K: <b>copy</b>, drop, store&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: K</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_derived_object_ClaimedStatus">Enum <span class="code-inline">ClaimedStatus</span></h2>

The possible values of a claimed UID.<br/>
We make it an enum to make upgradeability easier in the future.


<pre><code><b>public</b> <b>enum</b> <a href="../sui_sui/derived_object#sui_derived_object_ClaimedStatus">ClaimedStatus</a> <b>has</b> store
</code></pre>


<details>
<summary>Variants</summary>


<dl>
<dt>
Variant <span class="code-inline">Reserved</span>
</dt>
<dd>
 The UID has been claimed and cannot be re-claimed or used.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Tries to create an object twice with the same parent-key combination.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/derived_object#sui_derived_object_EObjectAlreadyExists">EObjectAlreadyExists</a>: vector&lt;u8&gt; = b"Derived <a href="../sui_sui/object#sui_object">object</a> is already claimed.";
</code></pre>


<h2 id="sui_derived_object_claim">Function <span class="code-inline">claim</span></h2>

Claim a deterministic UID, using the parent's UID & any key.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_claim">claim</a>&lt;K: <b>copy</b>, drop, store&gt;(parent: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, key: K): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_derived_object_exists">Function <span class="code-inline">exists</span></h2>

Checks if a provided <span class="code-inline">key</span> has been claimed for the given parent.<br/>
Note: If the UID has been deleted through <span class="code-inline"><a href="../sui_sui/object#sui_object_delete">object::delete</a></span>, this will always return true.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_exists">exists</a>&lt;K: <b>copy</b>, drop, store&gt;(parent: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, key: K): bool
</code></pre>




<h2 id="sui_derived_object_derive_address">Function <span class="code-inline">derive_address</span></h2>

Given an ID and a Key, it calculates the derived address.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_derive_address">derive_address</a>&lt;K: <b>copy</b>, drop, store&gt;(parent: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, key: K): <b>address</b>
</code></pre>



