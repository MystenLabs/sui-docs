---
title: Module sui::groth16
sidebar_label: groth16
---

<h2 id="sui_groth16_Curve">Struct <span class="code-inline">Curve</span></h2>

Represents an elliptic curve construction to be used in the verifier. Currently we support BLS12-381 and BN254.<br/>
This should be given as the first parameter to <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_prepare_verifying_key">prepare_verifying_key</a></span> or <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_verify_groth16_proof">verify_groth16_proof</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/groth16#sui_groth16_Curve">Curve</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: u8</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_groth16_PreparedVerifyingKey">Struct <span class="code-inline">PreparedVerifyingKey</span></h2>

A <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">PreparedVerifyingKey</a></span> consisting of four components in serialized form.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">PreparedVerifyingKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">vk_gamma_abc_g1_bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">alpha_g1_beta_g2_bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">gamma_g2_neg_pc_bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">delta_g2_neg_pc_bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_groth16_PublicProofInputs">Struct <span class="code-inline">PublicProofInputs</span></h2>

A <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_PublicProofInputs">PublicProofInputs</a></span> wrapper around its serialized bytes.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/groth16#sui_groth16_PublicProofInputs">PublicProofInputs</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_groth16_ProofPoints">Struct <span class="code-inline">ProofPoints</span></h2>

A <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_ProofPoints">ProofPoints</a></span> wrapper around the serialized form of three proof points.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/groth16#sui_groth16_ProofPoints">ProofPoints</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/groth16#sui_groth16_EInvalidVerifyingKey">EInvalidVerifyingKey</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/groth16#sui_groth16_EInvalidCurve">EInvalidCurve</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/groth16#sui_groth16_ETooManyPublicInputs">ETooManyPublicInputs</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/groth16#sui_groth16_EInvalidScalar">EInvalidScalar</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/groth16#sui_groth16_MaxPublicInputs">MaxPublicInputs</a>: u64 = 8;
</code></pre>


<h2 id="sui_groth16_bls12381">Function <span class="code-inline">bls12381</span></h2>

Return the <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_Curve">Curve</a></span> value indicating that the BLS12-381 construction should be used in a given function.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/bls12381#sui_bls12381">bls12381</a>(): <a href="../sui_sui/groth16#sui_groth16_Curve">sui::groth16::Curve</a>
</code></pre>




<h2 id="sui_groth16_bn254">Function <span class="code-inline">bn254</span></h2>

Return the <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_Curve">Curve</a></span> value indicating that the BN254 construction should be used in a given function.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/groth16#sui_groth16_bn254">bn254</a>(): <a href="../sui_sui/groth16#sui_groth16_Curve">sui::groth16::Curve</a>
</code></pre>




<h2 id="sui_groth16_pvk_from_bytes">Function <span class="code-inline">pvk_from_bytes</span></h2>

Creates a <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">PreparedVerifyingKey</a></span> from bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/groth16#sui_groth16_pvk_from_bytes">pvk_from_bytes</a>(vk_gamma_abc_g1_bytes: vector&lt;u8&gt;, alpha_g1_beta_g2_bytes: vector&lt;u8&gt;, gamma_g2_neg_pc_bytes: vector&lt;u8&gt;, delta_g2_neg_pc_bytes: vector&lt;u8&gt;): <a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">sui::groth16::PreparedVerifyingKey</a>
</code></pre>




<h2 id="sui_groth16_pvk_to_bytes">Function <span class="code-inline">pvk_to_bytes</span></h2>

Returns bytes of the four components of the <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">PreparedVerifyingKey</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/groth16#sui_groth16_pvk_to_bytes">pvk_to_bytes</a>(pvk: <a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">sui::groth16::PreparedVerifyingKey</a>): vector&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_groth16_public_proof_inputs_from_bytes">Function <span class="code-inline">public_proof_inputs_from_bytes</span></h2>

Creates a <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_PublicProofInputs">PublicProofInputs</a></span> wrapper from bytes. The <span class="code-inline">bytes</span> parameter should be a concatenation of a number of
32 bytes scalar field elements to be used as public inputs in little-endian format to a circuit.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/groth16#sui_groth16_public_proof_inputs_from_bytes">public_proof_inputs_from_bytes</a>(bytes: vector&lt;u8&gt;): <a href="../sui_sui/groth16#sui_groth16_PublicProofInputs">sui::groth16::PublicProofInputs</a>
</code></pre>




<h2 id="sui_groth16_proof_points_from_bytes">Function <span class="code-inline">proof_points_from_bytes</span></h2>

Creates a Groth16 <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_ProofPoints">ProofPoints</a></span> from bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/groth16#sui_groth16_proof_points_from_bytes">proof_points_from_bytes</a>(bytes: vector&lt;u8&gt;): <a href="../sui_sui/groth16#sui_groth16_ProofPoints">sui::groth16::ProofPoints</a>
</code></pre>




<h2 id="sui_groth16_prepare_verifying_key">Function <span class="code-inline">prepare_verifying_key</span></h2>

@param curve: What elliptic curve construction to use. See <span class="code-inline"><a href="../sui_sui/bls12381#sui_bls12381">bls12381</a></span> and <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_bn254">bn254</a></span>.
@param verifying_key: An Arkworks canonical compressed serialization of a verifying key.

Returns four vectors of bytes representing the four components of a prepared verifying key.<br/>
This step computes one pairing e(P, Q), and binds the verification to one particular proof statement.<br/>
This can be used as inputs for the <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_verify_groth16_proof">verify_groth16_proof</a></span> function.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/groth16#sui_groth16_prepare_verifying_key">prepare_verifying_key</a>(curve: &<a href="../sui_sui/groth16#sui_groth16_Curve">sui::groth16::Curve</a>, verifying_key: &vector&lt;u8&gt;): <a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">sui::groth16::PreparedVerifyingKey</a>
</code></pre>




<h2 id="sui_groth16_prepare_verifying_key_internal">Function <span class="code-inline">prepare_verifying_key_internal</span></h2>

Native functions that flattens the inputs into an array and passes to the Rust native function. May abort with <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_EInvalidVerifyingKey">EInvalidVerifyingKey</a></span> or <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_EInvalidCurve">EInvalidCurve</a></span>.


<pre><code><b>fun</b> <a href="../sui_sui/groth16#sui_groth16_prepare_verifying_key_internal">prepare_verifying_key_internal</a>(curve: u8, verifying_key: &vector&lt;u8&gt;): <a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">sui::groth16::PreparedVerifyingKey</a>
</code></pre>




<h2 id="sui_groth16_verify_groth16_proof">Function <span class="code-inline">verify_groth16_proof</span></h2>

@param curve: What elliptic curve construction to use. See the <span class="code-inline"><a href="../sui_sui/bls12381#sui_bls12381">bls12381</a></span> and <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_bn254">bn254</a></span> functions.
@param prepared_verifying_key: Consists of four vectors of bytes representing the four components of a prepared verifying key.
@param public_proof_inputs: Represent inputs that are public.
@param proof_points: Represent three proof points.

Returns a boolean indicating whether the proof is valid.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/groth16#sui_groth16_verify_groth16_proof">verify_groth16_proof</a>(curve: &<a href="../sui_sui/groth16#sui_groth16_Curve">sui::groth16::Curve</a>, prepared_verifying_key: &<a href="../sui_sui/groth16#sui_groth16_PreparedVerifyingKey">sui::groth16::PreparedVerifyingKey</a>, public_proof_inputs: &<a href="../sui_sui/groth16#sui_groth16_PublicProofInputs">sui::groth16::PublicProofInputs</a>, proof_points: &<a href="../sui_sui/groth16#sui_groth16_ProofPoints">sui::groth16::ProofPoints</a>): bool
</code></pre>




<h2 id="sui_groth16_verify_groth16_proof_internal">Function <span class="code-inline">verify_groth16_proof_internal</span></h2>

Native functions that flattens the inputs into arrays of vectors and passed to the Rust native function. May abort with <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_EInvalidCurve">EInvalidCurve</a></span> or <span class="code-inline"><a href="../sui_sui/groth16#sui_groth16_ETooManyPublicInputs">ETooManyPublicInputs</a></span>.


<pre><code><b>fun</b> <a href="../sui_sui/groth16#sui_groth16_verify_groth16_proof_internal">verify_groth16_proof_internal</a>(curve: u8, vk_gamma_abc_g1_bytes: &vector&lt;u8&gt;, alpha_g1_beta_g2_bytes: &vector&lt;u8&gt;, gamma_g2_neg_pc_bytes: &vector&lt;u8&gt;, delta_g2_neg_pc_bytes: &vector&lt;u8&gt;, public_proof_inputs: &vector&lt;u8&gt;, proof_points: &vector&lt;u8&gt;): bool
</code></pre>



