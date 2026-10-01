---
title: Module sui_system::validator_cap
sidebar_label: validator_cap
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

<h2 id="sui_system_validator_cap_UnverifiedValidatorOperationCap">Struct <span class="code-inline">UnverifiedValidatorOperationCap</span></h2>

The capability object is created when creating a new <span class="code-inline">Validator</span> or when the
validator explicitly creates a new capability object for rotation/revocation.<br/>
The holder address of this object can perform some validator operations on behalf of
the authorizer validator. Thus, if a validator wants to separate the keys for operation
(such as reference gas price setting or tallying rule reporting) from fund/staking, it
could transfer this capability object to another address.<br/>
To facilitate rotating/revocation, <span class="code-inline">Validator</span> stores the ID of currently valid <span class="code-inline"><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a></span>. Thus, before converting <span class="code-inline"><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a></span>
to <span class="code-inline"><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a></span>, verification needs to be done to make sure
the cap object is still valid.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a> <b>has</b> key, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">authorizer_validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_cap_ValidatorOperationCap">Struct <span class="code-inline">ValidatorOperationCap</span></h2>

Privileged operations require <span class="code-inline"><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a></span> for permission check.<br/>
This is only constructed after successful verification.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">authorizer_validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_cap_unverified_operation_cap_address">Function <span class="code-inline">unverified_operation_cap_address</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_unverified_operation_cap_address">unverified_operation_cap_address</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>): &<b>address</b>
</code></pre>




<h2 id="sui_system_validator_cap_verified_operation_cap_address">Function <span class="code-inline">verified_operation_cap_address</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_verified_operation_cap_address">verified_operation_cap_address</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>): <b>address</b>
</code></pre>




<h2 id="sui_system_validator_cap_new_unverified_validator_operation_cap_and_transfer">Function <span class="code-inline">new_unverified_validator_operation_cap_and_transfer</span></h2>

Should be only called by the friend modules when adding a <span class="code-inline">Validator</span>
or rotating an existing validaotr's <span class="code-inline">operation_cap_id</span>.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_new_unverified_validator_operation_cap_and_transfer">new_unverified_validator_operation_cap_and_transfer</a>(validator_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_system_validator_cap_into_verified">Function <span class="code-inline">into_verified</span></h2>

Convert an <span class="code-inline"><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a></span> to <span class="code-inline"><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a></span>.<br/>
Should only be called by <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set">validator_set</a></span> module AFTER verification.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_into_verified">into_verified</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>): <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>
</code></pre>



