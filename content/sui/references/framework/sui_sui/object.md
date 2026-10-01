---
title: Module sui::object
sidebar_label: object
---

Sui object identifiers

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>

<h2 id="sui_object_ID">Struct <span class="code-inline">ID</span></h2>

An object ID. This is used to reference Sui Objects.<br/>
This is *not* guaranteed to be globally unique--anyone can create an <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> from a <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> or
from an object, and ID's can be freely copied and dropped.<br/>
Here, the values are not globally unique because there can be multiple values of type <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span>
with the same underlying bytes. For example, <span class="code-inline"><a href="../sui_sui/object#sui_object_id">object::id</a>(&obj)</span> can be called as many times
as you want for a given <span class="code-inline">obj</span>, and each <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> value will be identical.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/object#sui_object_ID">ID</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">bytes: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_object_UID">Struct <span class="code-inline">UID</span></h2>

Globally unique IDs that define an object's ID in storage. Any Sui Object, that is a struct
with the <span class="code-inline">key</span> ability, must have <span class="code-inline"><a href="../sui_sui/object#sui_object_id">id</a>: <a href="../sui_sui/object#sui_object_UID">UID</a></span> as its first field.<br/>
These are globally unique in the sense that no two values of type <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> are ever equal, in
other words for any two values <span class="code-inline">id1: <a href="../sui_sui/object#sui_object_UID">UID</a></span> and <span class="code-inline">id2: <a href="../sui_sui/object#sui_object_UID">UID</a></span>, <span class="code-inline">id1</span>!= <span class="code-inline">id2</span>.<br/>
This is a privileged type that can only be derived from a <span class="code-inline">TxContext</span>.
<span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> doesn't have the <span class="code-inline">drop</span> ability, so deleting a <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> requires a call to <span class="code-inline"><a href="../sui_sui/object#sui_object_delete">delete</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/object#sui_object_UID">UID</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/object#sui_object_id">id</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

The hardcoded ID for the singleton Sui System State Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_SYSTEM_STATE_OBJECT_ID">SUI_SYSTEM_STATE_OBJECT_ID</a>: <b>address</b> = 0x5;
</code></pre>

The hardcoded ID for the singleton Clock Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_CLOCK_OBJECT_ID">SUI_CLOCK_OBJECT_ID</a>: <b>address</b> = 0x6;
</code></pre>

The hardcoded ID for the singleton AuthenticatorState Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_AUTHENTICATOR_STATE_ID">SUI_AUTHENTICATOR_STATE_ID</a>: <b>address</b> = 0x7;
</code></pre>

The hardcoded ID for the singleton Random Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_RANDOM_ID">SUI_RANDOM_ID</a>: <b>address</b> = 0x8;
</code></pre>

The hardcoded ID for the singleton DenyList.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_DENY_LIST_OBJECT_ID">SUI_DENY_LIST_OBJECT_ID</a>: <b>address</b> = 0x403;
</code></pre>

The hardcoded ID for the singleton AccumulatorRoot Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_ACCUMULATOR_ROOT_OBJECT_ID">SUI_ACCUMULATOR_ROOT_OBJECT_ID</a>: <b>address</b> = 0xacc;
</code></pre>

The hardcoded ID for the Bridge Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_BRIDGE_ID">SUI_BRIDGE_ID</a>: <b>address</b> = 0x9;
</code></pre>

The hardcoded ID for the Coin Registry Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_COIN_REGISTRY_OBJECT_ID">SUI_COIN_REGISTRY_OBJECT_ID</a>: <b>address</b> = 0xc;
</code></pre>

The hardcoded ID for the Display Registry Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_DISPLAY_REGISTRY_OBJECT_ID">SUI_DISPLAY_REGISTRY_OBJECT_ID</a>: <b>address</b> = 0xd;
</code></pre>

The hardcoded ID for the AddressAliasState Object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_ADDRESS_ALIAS_STATE_ID">SUI_ADDRESS_ALIAS_STATE_ID</a>: <b>address</b> = 0xa;
</code></pre>

The hardcoded ID for the singleton ForwardingAddressRegistry object.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_SUI_FORWARDING_ADDRESS_REGISTRY_OBJECT_ID">SUI_FORWARDING_ADDRESS_REGISTRY_OBJECT_ID</a>: <b>address</b> = 0xfa;
</code></pre>

Sender is not @0x0 the system address.


<pre><code><b>const</b> <a href="../sui_sui/object#sui_object_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>


<h2 id="sui_object_id_to_bytes">Function <span class="code-inline">id_to_bytes</span></h2>

Get the raw bytes of a <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_id_to_bytes">id_to_bytes</a>(<a href="../sui_sui/object#sui_object_id">id</a>: &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_object_id_to_address">Function <span class="code-inline">id_to_address</span></h2>

Get the inner bytes of <span class="code-inline"><a href="../sui_sui/object#sui_object_id">id</a></span> as an address.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_id_to_address">id_to_address</a>(<a href="../sui_sui/object#sui_object_id">id</a>: &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): <b>address</b>
</code></pre>




<h2 id="sui_object_id_from_bytes">Function <span class="code-inline">id_from_bytes</span></h2>

Make an <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> from raw bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_id_from_bytes">id_from_bytes</a>(bytes: vector&lt;u8&gt;): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_object_id_from_address">Function <span class="code-inline">id_from_address</span></h2>

Make an <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> from an address.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_id_from_address">id_from_address</a>(bytes: <b>address</b>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_object_sui_system_state">Function <span class="code-inline">sui_system_state</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">SuiSystemState</span> object.<br/>
This should only be called once from <span class="code-inline">sui_system</span>.


<pre><code><b>fun</b> <a href="../sui_sui/object#sui_object_sui_system_state">sui_system_state</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_clock">Function <span class="code-inline">clock</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">Clock</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/clock#sui_clock">clock</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/clock#sui_clock">clock</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_authenticator_state">Function <span class="code-inline">authenticator_state</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">AuthenticatorState</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/authenticator_state#sui_authenticator_state">authenticator_state</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state">authenticator_state</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_randomness_state">Function <span class="code-inline">randomness_state</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">Random</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/random#sui_random">random</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_randomness_state">randomness_state</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_sui_deny_list_object_id">Function <span class="code-inline">sui_deny_list_object_id</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">DenyList</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/deny_list#sui_deny_list">deny_list</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_sui_deny_list_object_id">sui_deny_list_object_id</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_sui_accumulator_root_object_id">Function <span class="code-inline">sui_accumulator_root_object_id</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_sui_accumulator_root_object_id">sui_accumulator_root_object_id</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_sui_accumulator_root_address">Function <span class="code-inline">sui_accumulator_root_address</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_sui_accumulator_root_address">sui_accumulator_root_address</a>(): <b>address</b>
</code></pre>




<h2 id="sui_object_sui_coin_registry_object_id">Function <span class="code-inline">sui_coin_registry_object_id</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">CoinRegistry</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry">coin_registry</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_sui_coin_registry_object_id">sui_coin_registry_object_id</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_sui_coin_registry_address">Function <span class="code-inline">sui_coin_registry_address</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_sui_coin_registry_address">sui_coin_registry_address</a>(): <b>address</b>
</code></pre>




<h2 id="sui_object_sui_display_registry_object_id">Function <span class="code-inline">sui_display_registry_object_id</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">DisplayRegistry</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/display_registry#sui_display_registry">display_registry</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_sui_display_registry_object_id">sui_display_registry_object_id</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_sui_display_registry_address">Function <span class="code-inline">sui_display_registry_address</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_sui_display_registry_address">sui_display_registry_address</a>(): <b>address</b>
</code></pre>




<h2 id="sui_object_bridge">Function <span class="code-inline">bridge</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">Bridge</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/object#sui_object_bridge">bridge</a></span>.


<pre><code><b>fun</b> <a href="../sui_sui/object#sui_object_bridge">bridge</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_address_alias_state">Function <span class="code-inline">address_alias_state</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">AddressAliasState</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/address_alias#sui_address_alias">address_alias</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_address_alias_state">address_alias_state</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_forwarding_address_registry">Function <span class="code-inline">forwarding_address_registry</span></h2>

Create the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for the singleton <span class="code-inline">ForwardingAddressRegistry</span> object.<br/>
This should only be called once from <span class="code-inline"><a href="../sui_sui/forwarding_address#sui_forwarding_address">forwarding_address</a></span>.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_forwarding_address_registry">forwarding_address_registry</a>(): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_uid_as_inner">Function <span class="code-inline">uid_as_inner</span></h2>

Get the inner <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> of <span class="code-inline">uid</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_uid_as_inner">uid_as_inner</a>(uid: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>): &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_object_uid_to_inner">Function <span class="code-inline">uid_to_inner</span></h2>

Get the raw bytes of a <span class="code-inline">uid</span>'s inner <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_uid_to_inner">uid_to_inner</a>(uid: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_object_uid_to_bytes">Function <span class="code-inline">uid_to_bytes</span></h2>

Get the raw bytes of a <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_uid_to_bytes">uid_to_bytes</a>(uid: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_object_uid_to_address">Function <span class="code-inline">uid_to_address</span></h2>

Get the inner bytes of <span class="code-inline"><a href="../sui_sui/object#sui_object_id">id</a></span> as an address.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_uid_to_address">uid_to_address</a>(uid: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>): <b>address</b>
</code></pre>




<h2 id="sui_object_new">Function <span class="code-inline">new</span></h2>

Create a new object. Returns the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> that must be stored in a Sui object.<br/>
This is the only way to create <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span>s.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_new">new</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_delete">Function <span class="code-inline">delete</span></h2>

Delete the object and its <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span>. This is the only way to eliminate a <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span>.<br/>
This exists to inform Sui of object deletions. When an object
gets unpacked, the programmer will have to do something with its
<span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span>. The implementation of this function emits a deleted
system event so Sui knows to process the object deletion


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_delete">delete</a>(<a href="../sui_sui/object#sui_object_id">id</a>: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>)
</code></pre>




<h2 id="sui_object_id">Function <span class="code-inline">id</span></h2>

Get the underlying <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> of <span class="code-inline">obj</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_id">id</a>&lt;T: key&gt;(obj: &T): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_object_borrow_id">Function <span class="code-inline">borrow_id</span></h2>

Borrow the underlying <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> of <span class="code-inline">obj</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_borrow_id">borrow_id</a>&lt;T: key&gt;(obj: &T): &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_object_id_bytes">Function <span class="code-inline">id_bytes</span></h2>

Get the raw bytes for the underlying <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> of <span class="code-inline">obj</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_id_bytes">id_bytes</a>&lt;T: key&gt;(obj: &T): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_object_id_address">Function <span class="code-inline">id_address</span></h2>

Get the inner bytes for the underlying <span class="code-inline"><a href="../sui_sui/object#sui_object_ID">ID</a></span> of <span class="code-inline">obj</span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/object#sui_object_id_address">id_address</a>&lt;T: key&gt;(obj: &T): <b>address</b>
</code></pre>




<h2 id="sui_object_borrow_uid">Function <span class="code-inline">borrow_uid</span></h2>

Get the <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for <span class="code-inline">obj</span>.<br/>
Safe because Sui has an extra bytecode verifier pass that forces every struct with
the <span class="code-inline">key</span> ability to have a distinguished <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> field.<br/>
Cannot be made public as the access to <span class="code-inline"><a href="../sui_sui/object#sui_object_UID">UID</a></span> for a given object must be privileged, and
restrictable in the object's module.


<pre><code><b>fun</b> <a href="../sui_sui/object#sui_object_borrow_uid">borrow_uid</a>&lt;T: key&gt;(obj: &T): &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_new_uid_from_hash">Function <span class="code-inline">new_uid_from_hash</span></h2>

Generate a new UID specifically used for creating a UID from a hash


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/object#sui_object_new_uid_from_hash">new_uid_from_hash</a>(parent: <b>address</b>, bytes: <b>address</b>): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_object_delete_impl">Function <span class="code-inline">delete_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/object#sui_object_delete_impl">delete_impl</a>(<a href="../sui_sui/object#sui_object_id">id</a>: <b>address</b>)
</code></pre>




<h2 id="sui_object_record_new_uid_from_hash">Function <span class="code-inline">record_new_uid_from_hash</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/object#sui_object_record_new_uid_from_hash">record_new_uid_from_hash</a>(parent: <b>address</b>, bytes: <b>address</b>)
</code></pre>



