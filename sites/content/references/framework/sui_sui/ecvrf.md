---
title: Module sui::ecvrf
sidebar_label: ecvrf
---

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidHashLength">EInvalidHashLength</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidPublicKeyEncoding">EInvalidPublicKeyEncoding</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidProofEncoding">EInvalidProofEncoding</a>: u64 = 3;
</code></pre>


<h2 id="sui_ecvrf_ecvrf_verify">Function <span class="code-inline">ecvrf_verify</span></h2>

@param hash: The hash/output from a ECVRF to be verified.
@param alpha_string: Input/seed to the ECVRF used to generate the output.
@param public_key: The public key corresponding to the private key used to generate the output.
@param proof: The proof of validity of the output.<br/>
Verify a proof for a Ristretto ECVRF. Returns true if the proof is valid and corresponds to the given output. May abort with <span class="code-inline"><a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidHashLength">EInvalidHashLength</a></span>, <span class="code-inline"><a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidPublicKeyEncoding">EInvalidPublicKeyEncoding</a></span> or <span class="code-inline"><a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidProofEncoding">EInvalidProofEncoding</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ecvrf#sui_ecvrf_ecvrf_verify">ecvrf_verify</a>(<a href="../sui_sui/hash#sui_hash">hash</a>: &vector&lt;u8&gt;, alpha_string: &vector&lt;u8&gt;, public_key: &vector&lt;u8&gt;, proof: &vector&lt;u8&gt;): bool
</code></pre>



