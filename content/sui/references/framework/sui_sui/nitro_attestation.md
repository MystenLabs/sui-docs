---
title: Module sui::nitro_attestation
sidebar_label: nitro_attestation
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/clock#sui_clock">sui::clock</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_nitro_attestation_PCREntry">Struct <span class="code-inline">PCREntry</span></h2>

Represents a PCR entry with an index and value.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry">PCREntry</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_index">index</a>: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_value">value</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_nitro_attestation_NitroAttestationDocument">Struct <span class="code-inline">NitroAttestationDocument</span></h2>

Nitro Attestation Document defined for AWS.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">NitroAttestationDocument</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_module_id">module_id</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
 Issuing Nitro hypervisor module ID.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_timestamp">timestamp</a>: u64</span>
</dt>
<dd>
 UTC time when document was created, in milliseconds since UNIX epoch.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_digest">digest</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
 The digest function used for calculating the register values.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_pcrs">pcrs</a>: vector&lt;<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry">sui::nitro_attestation::PCREntry</a>&gt;</span>
</dt>
<dd>
 A list of PCREntry containing the index and the PCR bytes.
 <https://docs.aws.amazon.com/enclaves/latest/user/set-up-attestation.html#where>.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_public_key">public_key</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
 An optional DER-encoded key the attestation, consumer can use to encrypt data with.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_user_data">user_data</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
 Additional signed user data, defined by protocol.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/nitro_attestation#sui_nitro_attestation_nonce">nonce</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
 An optional cryptographic nonce provided by the attestation consumer as a proof of
 authenticity.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Error that the feature is not available on this network.


<pre><code><b>const</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_ENotSupportedError">ENotSupportedError</a>: u64 = 0;
</code></pre>

Error that the attestation input failed to be parsed.


<pre><code><b>const</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_EParseError">EParseError</a>: u64 = 1;
</code></pre>

Error that the attestation failed to be verified.


<pre><code><b>const</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_EVerifyError">EVerifyError</a>: u64 = 2;
</code></pre>

Error that the PCRs are invalid.


<pre><code><b>const</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_EInvalidPCRsError">EInvalidPCRsError</a>: u64 = 3;
</code></pre>


<h2 id="sui_nitro_attestation_load_nitro_attestation">Function <span class="code-inline">load_nitro_attestation</span></h2>

@param attestation: attesttaion documents bytes data.
@param clock: the clock object.

Returns the parsed NitroAttestationDocument after verifying the attestation,
may abort with errors described above.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_load_nitro_attestation">load_nitro_attestation</a>(attestation: vector&lt;u8&gt;, <a href="../sui_sui/clock#sui_clock">clock</a>: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>): <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>
</code></pre>




<h2 id="sui_nitro_attestation_module_id">Function <span class="code-inline">module_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_module_id">module_id</a>(attestation: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_nitro_attestation_timestamp">Function <span class="code-inline">timestamp</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_timestamp">timestamp</a>(attestation: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>): &u64
</code></pre>




<h2 id="sui_nitro_attestation_digest">Function <span class="code-inline">digest</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_digest">digest</a>(attestation: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_nitro_attestation_pcrs">Function <span class="code-inline">pcrs</span></h2>

Returns a list of mapping PCREntry containg the index and the PCR bytes.<br/>
AWS supports PCR0-31. Required PCRs (index 0-4 & 8) are always included regardless of their
value. Additional custom PCRs (index 5-7, 9-31) are also included if they are nonzeros.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_pcrs">pcrs</a>(attestation: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>): &vector&lt;<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry">sui::nitro_attestation::PCREntry</a>&gt;
</code></pre>




<h2 id="sui_nitro_attestation_public_key">Function <span class="code-inline">public_key</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_public_key">public_key</a>(attestation: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_nitro_attestation_user_data">Function <span class="code-inline">user_data</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_user_data">user_data</a>(attestation: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_nitro_attestation_nonce">Function <span class="code-inline">nonce</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_nonce">nonce</a>(attestation: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_nitro_attestation_index">Function <span class="code-inline">index</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_index">index</a>(<b>entry</b>: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry">sui::nitro_attestation::PCREntry</a>): u8
</code></pre>




<h2 id="sui_nitro_attestation_value">Function <span class="code-inline">value</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_value">value</a>(<b>entry</b>: &<a href="../sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry">sui::nitro_attestation::PCREntry</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_nitro_attestation_load_nitro_attestation_internal">Function <span class="code-inline">load_nitro_attestation_internal</span></h2>

Internal native function


<pre><code><b>fun</b> <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_load_nitro_attestation_internal">load_nitro_attestation_internal</a>(attestation: &vector&lt;u8&gt;, current_timestamp: u64): <a href="../sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument">sui::nitro_attestation::NitroAttestationDocument</a>
</code></pre>



