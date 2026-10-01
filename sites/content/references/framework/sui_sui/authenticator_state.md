---
title: Module sui::authenticator_state
sidebar_label: authenticator_state
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/u64#std_u64">std::u64</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_authenticator_state_AuthenticatorState">Struct <span class="code-inline">AuthenticatorState</span></h2>

Singleton shared object which stores the global authenticator state.<br/>
The actual state is stored in a dynamic field of type AuthenticatorStateInner to support
future versions of the authenticator state.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState">AuthenticatorState</a> <b>has</b> key
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

<h2 id="sui_authenticator_state_AuthenticatorStateInner">Struct <span class="code-inline">AuthenticatorStateInner</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorStateInner">AuthenticatorStateInner</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">version: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">active_jwks: vector&lt;<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>&gt;</span>
</dt>
<dd>
 List of currently active JWKs.
</dd>
</dl>


</details>

<h2 id="sui_authenticator_state_JWK">Struct <span class="code-inline">JWK</span></h2>

Must match the JWK struct in fastcrypto-zkp


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_JWK">JWK</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">kty: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">e: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">n: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">alg: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_authenticator_state_JwkId">Struct <span class="code-inline">JwkId</span></h2>

Must match the JwkId struct in fastcrypto-zkp


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_JwkId">JwkId</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">iss: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">kid: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_authenticator_state_ActiveJwk">Struct <span class="code-inline">ActiveJwk</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">ActiveJwk</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">jwk_id: <a href="../sui_sui/authenticator_state#sui_authenticator_state_JwkId">sui::authenticator_state::JwkId</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">jwk: <a href="../sui_sui/authenticator_state#sui_authenticator_state_JWK">sui::authenticator_state::JWK</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">epoch: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Sender is not @0x0 the system address.


<pre><code><b>const</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_EWrongInnerVersion">EWrongInnerVersion</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_EJwksNotSorted">EJwksNotSorted</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_CurrentVersion">CurrentVersion</a>: u64 = 1;
</code></pre>


<h2 id="sui_authenticator_state_active_jwk_equal">Function <span class="code-inline">active_jwk_equal</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_active_jwk_equal">active_jwk_equal</a>(a: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>, b: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>): bool
</code></pre>




<h2 id="sui_authenticator_state_jwk_equal">Function <span class="code-inline">jwk_equal</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_jwk_equal">jwk_equal</a>(a: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_JWK">sui::authenticator_state::JWK</a>, b: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_JWK">sui::authenticator_state::JWK</a>): bool
</code></pre>




<h2 id="sui_authenticator_state_jwk_id_equal">Function <span class="code-inline">jwk_id_equal</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_jwk_id_equal">jwk_id_equal</a>(a: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_JwkId">sui::authenticator_state::JwkId</a>, b: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_JwkId">sui::authenticator_state::JwkId</a>): bool
</code></pre>




<h2 id="sui_authenticator_state_string_bytes_lt">Function <span class="code-inline">string_bytes_lt</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_string_bytes_lt">string_bytes_lt</a>(a: &<a href="../sui_std/string#std_string_String">std::string::String</a>, b: &<a href="../sui_std/string#std_string_String">std::string::String</a>): bool
</code></pre>




<h2 id="sui_authenticator_state_jwk_lt">Function <span class="code-inline">jwk_lt</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_jwk_lt">jwk_lt</a>(a: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>, b: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>): bool
</code></pre>




<h2 id="sui_authenticator_state_create">Function <span class="code-inline">create</span></h2>

Create and share the AuthenticatorState object. This function is call exactly once, when
the authenticator state object is first created.<br/>
Can only be called by genesis or change_epoch transactions.


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_create">create</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_authenticator_state_load_inner_mut">Function <span class="code-inline">load_inner_mut</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_load_inner_mut">load_inner_mut</a>(self: &<b>mut</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState">sui::authenticator_state::AuthenticatorState</a>): &<b>mut</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorStateInner">sui::authenticator_state::AuthenticatorStateInner</a>
</code></pre>




<h2 id="sui_authenticator_state_load_inner">Function <span class="code-inline">load_inner</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_load_inner">load_inner</a>(self: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState">sui::authenticator_state::AuthenticatorState</a>): &<a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorStateInner">sui::authenticator_state::AuthenticatorStateInner</a>
</code></pre>




<h2 id="sui_authenticator_state_check_sorted">Function <span class="code-inline">check_sorted</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_check_sorted">check_sorted</a>(new_active_jwks: &vector&lt;<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>&gt;)
</code></pre>




<h2 id="sui_authenticator_state_update_authenticator_state">Function <span class="code-inline">update_authenticator_state</span></h2>

Record a new set of active_jwks. Called when executing the AuthenticatorStateUpdate system
transaction. The new input vector must be sorted and must not contain duplicates.<br/>
If a new JWK is already present, but with a previous epoch, then the epoch is updated to
indicate that the JWK has been validated in the current epoch and should not be expired.


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_update_authenticator_state">update_authenticator_state</a>(self: &<b>mut</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState">sui::authenticator_state::AuthenticatorState</a>, new_active_jwks: vector&lt;<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_authenticator_state_deduplicate">Function <span class="code-inline">deduplicate</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_deduplicate">deduplicate</a>(jwks: vector&lt;<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>&gt;): vector&lt;<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>&gt;
</code></pre>




<h2 id="sui_authenticator_state_expire_jwks">Function <span class="code-inline">expire_jwks</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_expire_jwks">expire_jwks</a>(self: &<b>mut</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState">sui::authenticator_state::AuthenticatorState</a>, min_epoch: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_authenticator_state_get_active_jwks">Function <span class="code-inline">get_active_jwks</span></h2>

Get the current active_jwks. Called when the node starts up in order to load the current.<br/>
JWK state from the chain.


<pre><code><b>fun</b> <a href="../sui_sui/authenticator_state#sui_authenticator_state_get_active_jwks">get_active_jwks</a>(self: &<a href="../sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState">sui::authenticator_state::AuthenticatorState</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): vector&lt;<a href="../sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk">sui::authenticator_state::ActiveJwk</a>&gt;
</code></pre>



