---
title: Module sui::hash
sidebar_label: hash
---

Module which defines hash functions. Note that Sha-256 and Sha3-256 is available in the std::hash module in the
standard library.

<h2 id="sui_hash_blake2b256">Function <span class="code-inline">blake2b256</span></h2>

@param data: Arbitrary binary data to hash.<br/>
Hash the input bytes using Blake2b-256 and returns 32 bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/hash#sui_hash_blake2b256">blake2b256</a>(data: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_hash_keccak256">Function <span class="code-inline">keccak256</span></h2>

@param data: Arbitrary binary data to hash.<br/>
Hash the input bytes using keccak256 and returns 32 bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/hash#sui_hash_keccak256">keccak256</a>(data: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



