---
title: Module sui::forwarding_address
sidebar_label: forwarding_address
---

Registry for forwarding addresses.

A forwarding address is an off-chain-derived alias that forwards deposits to a
registered master address at resolution time. This module currently defines only the
singleton registry object; registration and resolution APIs are added in later steps.

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

<h2 id="sui_forwarding_address_ForwardingAddressRegistry">Struct <span class="code-inline">ForwardingAddressRegistry</span></h2>

Singleton shared object which will hold forwarding address registrations.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/forwarding_address#sui_forwarding_address_ForwardingAddressRegistry">ForwardingAddressRegistry</a> <b>has</b> key
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/forwarding_address#sui_forwarding_address_ENotSystemAddress">ENotSystemAddress</a>: vector&lt;u8&gt; = b"Only the system can <a href="../sui_sui/forwarding_address#sui_forwarding_address_create">create</a> the forwarding <b>address</b> registry.";
</code></pre>


<h2 id="sui_forwarding_address_create">Function <span class="code-inline">create</span></h2>

Create and share the <span class="code-inline"><a href="../sui_sui/forwarding_address#sui_forwarding_address_ForwardingAddressRegistry">ForwardingAddressRegistry</a></span> object. This function is called exactly
once, when the registry object is first created. Can only be called by genesis or
change_epoch transactions.


<pre><code><b>fun</b> <a href="../sui_sui/forwarding_address#sui_forwarding_address_create">create</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



