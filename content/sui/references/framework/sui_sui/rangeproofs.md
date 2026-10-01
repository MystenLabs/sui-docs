---
title: Module sui::rangeproofs
sidebar_label: rangeproofs
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/group_ops#sui_group_ops">sui::group_ops</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/ristretto255#sui_ristretto255">sui::ristretto255</a>;
</code></pre>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_ENotSupported">ENotSupported</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_EInvalidProof">EInvalidProof</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_EInvalidRange">EInvalidRange</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_EInvalidBatchSize">EInvalidBatchSize</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_EUnsupportedVersion">EUnsupportedVersion</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_EInvalidDst">EInvalidDst</a>: u64 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_MAX_DST_LENGTH">MAX_DST_LENGTH</a>: u64 = 64;
</code></pre>


<h2 id="sui_rangeproofs_verify_bulletproofs_with_dst_ristretto255">Function <span class="code-inline">verify_bulletproofs_with_dst_ristretto255</span></h2>

Verify a range proof over the Ristretto255 curve that all committed values are in the range [0, 2^bits).<br/>
Currently, the only supported version is 0 which corresponds to the original Bulletproofs construction (https://eprint.iacr.org/2017/1066.pdf).<br/>
In the future, we may add support for newer versions of Bulletproofs, such as Bulletproofs+ or Bulletproofs++.

The format of the proof follows the specifications from https://github.com/dalek-cryptography/bulletproofs/blob/be67b6d5f5ad1c1f54d5511b52e6d645a1313d07/src/range_proof/mod.rs#L59-L76.

The <span class="code-inline">bits</span> parameter is the bit length of the range and must be one of 8, 16, 32, or 64.

The <span class="code-inline">commitments</span> are Pedersen commitments to the values used in the proof.<br/>
The number of commitments must be a power of two, but if needed, the input to the prover can be padded with trivial commitments to zero.<br/>
The number of commitments times <span class="code-inline">bits</span> can be at most 1024.

The <span class="code-inline">dst</span> is a domain separation tag that is bound into the proof transcript. Provers and
verifiers must agree on the same <span class="code-inline">dst</span> for verification to succeed. It can be at most 64 bytes.

Enabled only on devnet and testnet.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_verify_bulletproofs_with_dst_ristretto255">verify_bulletproofs_with_dst_ristretto255</a>(proof: &vector&lt;u8&gt;, bits: u8, commitments: &vector&lt;<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;&gt;, dst: &vector&lt;u8&gt;, version: u8): bool
</code></pre>




<h2 id="sui_rangeproofs_verify_bulletproofs_ristretto255">Function <span class="code-inline">verify_bulletproofs_ristretto255</span></h2>

Disabled. This entry point always aborts; use <span class="code-inline"><a href="../sui_sui/rangeproofs#sui_rangeproofs_verify_bulletproofs_with_dst_ristretto255">verify_bulletproofs_with_dst_ristretto255</a></span>
instead.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_verify_bulletproofs_ristretto255">verify_bulletproofs_ristretto255</a>(_proof: &vector&lt;u8&gt;, _bits: u8, _commitments: &vector&lt;<a href="../sui_sui/group_ops#sui_group_ops_Element">sui::group_ops::Element</a>&lt;<a href="../sui_sui/ristretto255#sui_ristretto255_G">sui::ristretto255::G</a>&gt;&gt;, _version: u8): bool
</code></pre>




<h2 id="sui_rangeproofs_verify_bulletproofs_with_dst_ristretto255_internal">Function <span class="code-inline">verify_bulletproofs_with_dst_ristretto255_internal</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/rangeproofs#sui_rangeproofs_verify_bulletproofs_with_dst_ristretto255_internal">verify_bulletproofs_with_dst_ristretto255_internal</a>(proof: &vector&lt;u8&gt;, bits: u8, commitments: &vector&lt;vector&lt;u8&gt;&gt;, dst: &vector&lt;u8&gt;): bool
</code></pre>



