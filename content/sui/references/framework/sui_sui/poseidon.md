---
title: Module sui::poseidon
sidebar_label: poseidon
---

Module which defines instances of the poseidon hash functions.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
</code></pre>

<h2 id="@Constants_0">Constants</h2>

Error if any of the inputs are larger than or equal to the BN254 field size.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_ENonCanonicalInput">ENonCanonicalInput</a>: u64 = 0;
</code></pre>

Error if an empty vector is passed as input.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_EEmptyInput">EEmptyInput</a>: u64 = 1;
</code></pre>

Error if more than MAX_INPUTS inputs are given.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_ETooManyInputs">ETooManyInputs</a>: u64 = 2;
</code></pre>

The field size for BN254 curve.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_BN254_MAX">BN254_MAX</a>: u256 = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
</code></pre>

The maximum number of inputs for the poseidon_bn254 function.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_MAX_INPUTS">MAX_INPUTS</a>: u64 = 16;
</code></pre>


<h2 id="sui_poseidon_poseidon_bn254">Function <span class="code-inline">poseidon_bn254</span></h2>

@param data: Vector of BN254 field elements to hash.

Hash the inputs using poseidon_bn254 and returns a BN254 field element.

Each element has to be a BN254 field element in canonical representation so it must be smaller than the BN254
scalar field size which is 21888242871839275222246405745257275088548364400416034343698204186575808495617.

This function supports between 1 and 16 inputs. If you need to hash more than 16 inputs, some implementations
instead returns the root of a k-ary Merkle tree with the inputs as leafs, but since this is not standardized,
we leave that to the caller to implement if needed.

If the input is empty, the function will abort with EEmptyInput.<br/>
If more than 16 inputs are provided, the function will abort with ETooManyInputs.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/poseidon#sui_poseidon_poseidon_bn254">poseidon_bn254</a>(data: &vector&lt;u256&gt;): u256
</code></pre>




<h2 id="sui_poseidon_poseidon_bn254_internal">Function <span class="code-inline">poseidon_bn254_internal</span></h2>

@param data: Vector of BN254 field elements in little-endian representation.

Hash the inputs using poseidon_bn254 and returns a BN254 field element in little-endian representation.


<pre><code><b>fun</b> <a href="../sui_sui/poseidon#sui_poseidon_poseidon_bn254_internal">poseidon_bn254_internal</a>(data: &vector&lt;vector&lt;u8&gt;&gt;): vector&lt;u8&gt;
</code></pre>



