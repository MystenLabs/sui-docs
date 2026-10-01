---
title: Module sui::vdf
sidebar_label: vdf
---

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/vdf#sui_vdf_EInvalidInput">EInvalidInput</a>: u64 = 0;
</code></pre>


<h2 id="sui_vdf_hash_to_input">Function <span class="code-inline">hash_to_input</span></h2>

Hash an arbitrary binary <span class="code-inline">message</span> to a class group element to be used as input for <span class="code-inline"><a href="../sui_sui/vdf#sui_vdf_vdf_verify">vdf_verify</a></span>.

This function is currently only enabled on Devnet.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_hash_to_input">hash_to_input</a>(message: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_vdf_hash_to_input_internal">Function <span class="code-inline">hash_to_input_internal</span></h2>

The internal functions for <span class="code-inline"><a href="../sui_sui/vdf#sui_vdf_hash_to_input">hash_to_input</a></span>.


<pre><code><b>fun</b> <a href="../sui_sui/vdf#sui_vdf_hash_to_input_internal">hash_to_input_internal</a>(message: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_vdf_vdf_verify">Function <span class="code-inline">vdf_verify</span></h2>

Verify the output and proof of a VDF with the given number of iterations. The <span class="code-inline">input</span>, <span class="code-inline">output</span> and <span class="code-inline">proof</span>
are all class group elements represented by triples <span class="code-inline">(a,b,c)</span> such that <span class="code-inline">b^2 - 4ac = discriminant</span>. The are expected
to be encoded as a BCS encoding of a triple of byte arrays, each being the big-endian twos-complement encoding of
a, b and c in that order.

This uses Wesolowski's VDF construction over imaginary class groups as described in Wesolowski (2020),
'Efficient Verifiable Delay Functions.', J. Cryptol. 33, and is compatible with the VDF implementation in
fastcrypto.

The discriminant for the class group is pre-computed and fixed. See how this was generated in the fastcrypto-vdf
crate. The final selection of the discriminant for Mainnet will be computed and announced under a nothing-up-my-sleeve
process.

This function is currently only enabled on Devnet.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_vdf_verify">vdf_verify</a>(input: &vector&lt;u8&gt;, output: &vector&lt;u8&gt;, proof: &vector&lt;u8&gt;, iterations: u64): bool
</code></pre>




<h2 id="sui_vdf_vdf_verify_internal">Function <span class="code-inline">vdf_verify_internal</span></h2>

The internal functions for <span class="code-inline"><a href="../sui_sui/vdf#sui_vdf_vdf_verify_internal">vdf_verify_internal</a></span>.


<pre><code><b>fun</b> <a href="../sui_sui/vdf#sui_vdf_vdf_verify_internal">vdf_verify_internal</a>(input: &vector&lt;u8&gt;, output: &vector&lt;u8&gt;, proof: &vector&lt;u8&gt;, iterations: u64): bool
</code></pre>



