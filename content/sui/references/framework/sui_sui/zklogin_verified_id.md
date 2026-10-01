---
title: Module sui::zklogin_verified_id
sidebar_label: zklogin_verified_id
---

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

<h2 id="sui_zklogin_verified_id_VerifiedID">Struct <span class="code-inline">VerifiedID</span></h2>

Possession of a VerifiedID proves that the user's address was created using zklogin and the given parameters.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID">VerifiedID</a> <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
 The ID of this VerifiedID
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_owner">owner</a>: <b>address</b></span>
</dt>
<dd>
 The address this VerifiedID is associated with
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_name">key_claim_name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The name of the key claim
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_value">key_claim_value</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The value of the key claim
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_issuer">issuer</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The issuer
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_audience">audience</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The audience (wallet)
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_EFunctionDisabled">EFunctionDisabled</a>: u64 = 0;
</code></pre>


<h2 id="sui_zklogin_verified_id_owner">Function <span class="code-inline">owner</span></h2>

Returns the address associated with the given VerifiedID


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_owner">owner</a>(verified_id: &<a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID">sui::zklogin_verified_id::VerifiedID</a>): <b>address</b>
</code></pre>




<h2 id="sui_zklogin_verified_id_key_claim_name">Function <span class="code-inline">key_claim_name</span></h2>

Returns the name of the key claim associated with the given VerifiedID


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_name">key_claim_name</a>(verified_id: &<a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID">sui::zklogin_verified_id::VerifiedID</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_zklogin_verified_id_key_claim_value">Function <span class="code-inline">key_claim_value</span></h2>

Returns the value of the key claim associated with the given VerifiedID


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_value">key_claim_value</a>(verified_id: &<a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID">sui::zklogin_verified_id::VerifiedID</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_zklogin_verified_id_issuer">Function <span class="code-inline">issuer</span></h2>

Returns the issuer associated with the given VerifiedID


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_issuer">issuer</a>(verified_id: &<a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID">sui::zklogin_verified_id::VerifiedID</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_zklogin_verified_id_audience">Function <span class="code-inline">audience</span></h2>

Returns the audience (wallet) associated with the given VerifiedID


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_audience">audience</a>(verified_id: &<a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID">sui::zklogin_verified_id::VerifiedID</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_zklogin_verified_id_delete">Function <span class="code-inline">delete</span></h2>

Delete a VerifiedID


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_delete">delete</a>(verified_id: <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID">sui::zklogin_verified_id::VerifiedID</a>)
</code></pre>




<h2 id="sui_zklogin_verified_id_verify_zklogin_id">Function <span class="code-inline">verify_zklogin_id</span></h2>

This function has been disabled.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_verify_zklogin_id">verify_zklogin_id</a>(_key_claim_name: <a href="../sui_std/string#std_string_String">std::string::String</a>, _key_claim_value: <a href="../sui_std/string#std_string_String">std::string::String</a>, _issuer: <a href="../sui_std/string#std_string_String">std::string::String</a>, _audience: <a href="../sui_std/string#std_string_String">std::string::String</a>, _pin_hash: u256, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_zklogin_verified_id_check_zklogin_id">Function <span class="code-inline">check_zklogin_id</span></h2>

This function has been disabled.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_check_zklogin_id">check_zklogin_id</a>(_address: <b>address</b>, _key_claim_name: &<a href="../sui_std/string#std_string_String">std::string::String</a>, _key_claim_value: &<a href="../sui_std/string#std_string_String">std::string::String</a>, _issuer: &<a href="../sui_std/string#std_string_String">std::string::String</a>, _audience: &<a href="../sui_std/string#std_string_String">std::string::String</a>, _pin_hash: u256): bool
</code></pre>




<h2 id="sui_zklogin_verified_id_check_zklogin_id_internal">Function <span class="code-inline">check_zklogin_id_internal</span></h2>

Returns true if <span class="code-inline"><b>address</b></span> was created using zklogin and the given parameters.

Aborts with <span class="code-inline">EInvalidInput</span> if any of <span class="code-inline">kc_name</span>, <span class="code-inline">kc_value</span>, <span class="code-inline">iss</span> and <span class="code-inline">aud</span> is not a properly encoded UTF-8
string or if the inputs are longer than the allowed upper bounds: <span class="code-inline">kc_name</span> must be at most 32 characters,
<span class="code-inline">kc_value</span> must be at most 115 characters and <span class="code-inline">aud</span> must be at most 145 characters.


<pre><code><b>fun</b> <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_check_zklogin_id_internal">check_zklogin_id_internal</a>(<b>address</b>: <b>address</b>, <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_name">key_claim_name</a>: &vector&lt;u8&gt;, <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_value">key_claim_value</a>: &vector&lt;u8&gt;, <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_issuer">issuer</a>: &vector&lt;u8&gt;, <a href="../sui_sui/zklogin_verified_id#sui_zklogin_verified_id_audience">audience</a>: &vector&lt;u8&gt;, pin_hash: u256): bool
</code></pre>



