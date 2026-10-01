---
title: Module sui::zklogin_verified_issuer
sidebar_label: zklogin_verified_issuer
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_zklogin_verified_issuer_VerifiedIssuer">Struct <span class="code-inline">VerifiedIssuer</span></h2>

Possession of a VerifiedIssuer proves that the user's address was created using zklogin and with the given issuer
(identity provider).


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer">VerifiedIssuer</a> <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
 The ID of this VerifiedIssuer
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_owner">owner</a>: <b>address</b></span>
</dt>
<dd>
 The address this VerifiedID is associated with
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer">issuer</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The issuer
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Error if the proof consisting of the inputs provided to the verification function is invalid.


<pre><code><b>const</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidInput">EInvalidInput</a>: u64 = 0;
</code></pre>

Error if the proof consisting of the inputs provided to the verification function is invalid.


<pre><code><b>const</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidProof">EInvalidProof</a>: u64 = 1;
</code></pre>


<h2 id="sui_zklogin_verified_issuer_owner">Function <span class="code-inline">owner</span></h2>

Returns the address associated with the given VerifiedIssuer


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_owner">owner</a>(verified_issuer: &<a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer">sui::zklogin_verified_issuer::VerifiedIssuer</a>): <b>address</b>
</code></pre>




<h2 id="sui_zklogin_verified_issuer_issuer">Function <span class="code-inline">issuer</span></h2>

Returns the issuer associated with the given VerifiedIssuer


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer">issuer</a>(verified_issuer: &<a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer">sui::zklogin_verified_issuer::VerifiedIssuer</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_zklogin_verified_issuer_delete">Function <span class="code-inline">delete</span></h2>

Delete a VerifiedIssuer


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_delete">delete</a>(verified_issuer: <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer">sui::zklogin_verified_issuer::VerifiedIssuer</a>)
</code></pre>




<h2 id="sui_zklogin_verified_issuer_verify_zklogin_issuer">Function <span class="code-inline">verify_zklogin_issuer</span></h2>

Verify that the caller's address was created using zklogin with the given issuer. If so, a VerifiedIssuer object
with the issuers id transferred to the caller.

Aborts with <span class="code-inline"><a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidProof">EInvalidProof</a></span> if the verification fails.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_verify_zklogin_issuer">verify_zklogin_issuer</a>(address_seed: u256, <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer">issuer</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_zklogin_verified_issuer_check_zklogin_issuer">Function <span class="code-inline">check_zklogin_issuer</span></h2>

Returns true if <span class="code-inline"><b>address</b></span> was created using zklogin with the given issuer and address seed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_check_zklogin_issuer">check_zklogin_issuer</a>(<b>address</b>: <b>address</b>, address_seed: u256, <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer">issuer</a>: &<a href="../sui_std/string#std_string_String">std::string::String</a>): bool
</code></pre>




<h2 id="sui_zklogin_verified_issuer_check_zklogin_issuer_internal">Function <span class="code-inline">check_zklogin_issuer_internal</span></h2>

Returns true if <span class="code-inline"><b>address</b></span> was created using zklogin with the given issuer and address seed.

Aborts with <span class="code-inline"><a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidInput">EInvalidInput</a></span> if the <span class="code-inline">iss</span> input is not a valid UTF-8 string.


<pre><code><b>fun</b> <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_check_zklogin_issuer_internal">check_zklogin_issuer_internal</a>(<b>address</b>: <b>address</b>, address_seed: u256, <a href="../sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer">issuer</a>: &vector&lt;u8&gt;): bool
</code></pre>



