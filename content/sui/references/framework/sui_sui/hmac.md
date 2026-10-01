---
title: Module sui::hmac
sidebar_label: hmac
---

<h2 id="sui_hmac_hmac_sha3_256">Function <span class="code-inline">hmac_sha3_256</span></h2>

@param key: HMAC key, arbitrary bytes.
@param msg: message to sign, arbitrary bytes.<br/>
Returns the 32 bytes digest of HMAC-SHA3-256(key, msg).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/hmac#sui_hmac_hmac_sha3_256">hmac_sha3_256</a>(key: &vector&lt;u8&gt;, msg: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



