---
title: Module sui_system::validator
sidebar_label: validator
---

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/internal#std_internal">std::internal</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/u128#std_u128">std::u128</a>;
<b>use</b> <a href="../sui_std/u64#std_u64">std::u64</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement">sui::accumulator_settlement</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bag#sui_bag">sui::bag</a>;
<b>use</b> <a href="../sui_sui/balance#sui_balance">sui::balance</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/coin#sui_coin">sui::coin</a>;
<b>use</b> <a href="../sui_sui/config#sui_config">sui::config</a>;
<b>use</b> <a href="../sui_sui/deny_list#sui_deny_list">sui::deny_list</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field">sui::dynamic_object_field</a>;
<b>use</b> <a href="../sui_sui/event#sui_event">sui::event</a>;
<b>use</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator">sui::funds_accumulator</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/sui#sui_sui">sui::sui</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
<b>use</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool">sui_system::staking_pool</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
</code></pre>

<h2 id="sui_system_validator_ValidatorMetadata">Struct <span class="code-inline">ValidatorMetadata</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator#sui_system_validator_ValidatorMetadata">ValidatorMetadata</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_sui_address">sui_address</a>: <b>address</b></span>
</dt>
<dd>
 The Sui Address of the validator. This is the sender that created the Validator object,
 and also the address to send validator/coins to during withdraws.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes">protocol_pubkey_bytes</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
 The public key bytes corresponding to the private key that the validator
 holds to sign transactions. For now, this is the same as AuthorityName.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_network_pubkey_bytes">network_pubkey_bytes</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
 The public key bytes corresponding to the private key that the validator
 uses to establish TLS connections
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes">worker_pubkey_bytes</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
 The public key bytes correstponding to the Narwhal Worker
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_proof_of_possession">proof_of_possession</a>: vector&lt;u8&gt;</span>
</dt>
<dd>
 This is a proof that the validator has ownership of the private key
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 A unique human-readable name of this validator.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_description">description</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_image_url">image_url</a>: <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_project_url">project_url</a>: <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">net_address: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The network address of the validator (could also contain extra info such as port, DNS and etc.).
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_p2p_address">p2p_address</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The address of the validator used for p2p activities such as state sync (could also contain extra info such as port, DNS and etc.).
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_primary_address">primary_address</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The address of the narwhal primary
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_worker_address">worker_address</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 The address of the narwhal worker
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_protocol_pubkey_bytes">next_epoch_protocol_pubkey_bytes</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
 "next_epoch" metadata only takes effects in the next epoch.<br/>
 If none, current value will stay unchanged.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_proof_of_possession">next_epoch_proof_of_possession</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_network_pubkey_bytes">next_epoch_network_pubkey_bytes</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_worker_pubkey_bytes">next_epoch_worker_pubkey_bytes</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">next_epoch_net_address: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_p2p_address">next_epoch_p2p_address</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_primary_address">next_epoch_primary_address</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_worker_address">next_epoch_worker_address</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_validator_Validator">Struct <span class="code-inline">Validator</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">Validator</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_metadata">metadata</a>: <a href="../sui_sui_system/validator#sui_system_validator_ValidatorMetadata">sui_system::validator::ValidatorMetadata</a></span>
</dt>
<dd>
 Summary of the validator.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/voting_power#sui_system_voting_power">voting_power</a>: u64</span>
</dt>
<dd>
 The voting power of this validator, which might be different from its
 stake amount.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_operation_cap_id">operation_cap_id</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 The ID of this validator's current valid <span class="code-inline">UnverifiedValidatorOperationCap</span>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_gas_price">gas_price</a>: u64</span>
</dt>
<dd>
 Gas price quote, updated only at end of epoch.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool">staking_pool</a>: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a></span>
</dt>
<dd>
 Staking pool for this validator.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_commission_rate">commission_rate</a>: u64</span>
</dt>
<dd>
 Commission rate of the validator, in basis point.
</dd>
<dt>
<span class="code-inline">next_epoch_stake: u64</span>
</dt>
<dd>
 Total amount of stake that would be active in the next epoch.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator_next_epoch_gas_price">next_epoch_gas_price</a>: u64</span>
</dt>
<dd>
 This validator's gas price quote for the next epoch.
</dd>
<dt>
<span class="code-inline">next_epoch_commission_rate: u64</span>
</dt>
<dd>
 The commission rate of the validator starting the next epoch, in basis point.
</dd>
<dt>
<span class="code-inline">extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_validator_StakingRequestEvent">Struct <span class="code-inline">StakingRequestEvent</span></h2>

Event emitted when a new stake request is received.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator#sui_system_validator_StakingRequestEvent">StakingRequestEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">staker_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">amount: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_UnstakingRequestEvent">Struct <span class="code-inline">UnstakingRequestEvent</span></h2>

Event emitted when a new unstake request is received.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator#sui_system_validator_UnstakingRequestEvent">UnstakingRequestEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">staker_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake_activation_epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">unstaking_epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">principal_amount: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">reward_amount: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_ConvertingToFungibleStakedSuiEvent">Struct <span class="code-inline">ConvertingToFungibleStakedSuiEvent</span></h2>

Event emitted when a staked SUI is converted to a fungible staked SUI.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator#sui_system_validator_ConvertingToFungibleStakedSuiEvent">ConvertingToFungibleStakedSuiEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake_activation_epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">staked_sui_principal_amount: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">fungible_staked_sui_amount: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_RedeemingFungibleStakedSuiEvent">Struct <span class="code-inline">RedeemingFungibleStakedSuiEvent</span></h2>

Event emitted when a fungible staked SUI is redeemed.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator#sui_system_validator_RedeemingFungibleStakedSuiEvent">RedeemingFungibleStakedSuiEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">fungible_staked_sui_amount: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">sui_amount: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Invalid proof_of_possession field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EInvalidProofOfPossession">EInvalidProofOfPossession</a>: u64 = 0;
</code></pre>

Invalid pubkey_bytes field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EMetadataInvalidPubkey">EMetadataInvalidPubkey</a>: u64 = 1;
</code></pre>

Invalid network_pubkey_bytes field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EMetadataInvalidNetPubkey">EMetadataInvalidNetPubkey</a>: u64 = 2;
</code></pre>

Invalid worker_pubkey_bytes field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EMetadataInvalidWorkerPubkey">EMetadataInvalidWorkerPubkey</a>: u64 = 3;
</code></pre>

Invalid net_address field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EMetadataInvalidNetAddr">EMetadataInvalidNetAddr</a>: u64 = 4;
</code></pre>

Invalid p2p_address field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EMetadataInvalidP2pAddr">EMetadataInvalidP2pAddr</a>: u64 = 5;
</code></pre>

Invalid primary_address field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EMetadataInvalidPrimaryAddr">EMetadataInvalidPrimaryAddr</a>: u64 = 6;
</code></pre>

Invalid worker_address field in ValidatorMetadata


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EMetadataInvalidWorkerAddr">EMetadataInvalidWorkerAddr</a>: u64 = 7;
</code></pre>

Commission rate set by the validator is higher than the threshold


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_ECommissionRateTooHigh">ECommissionRateTooHigh</a>: u64 = 8;
</code></pre>

Validator Metadata is too long


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EValidatorMetadataExceedingLengthLimit">EValidatorMetadataExceedingLengthLimit</a>: u64 = 9;
</code></pre>

Intended validator is not a candidate one.


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_ENotValidatorCandidate">ENotValidatorCandidate</a>: u64 = 10;
</code></pre>

Stake amount is invalid or wrong.


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EInvalidStakeAmount">EInvalidStakeAmount</a>: u64 = 11;
</code></pre>

Function called during non-genesis times.


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_ECalledDuringNonGenesis">ECalledDuringNonGenesis</a>: u64 = 12;
</code></pre>

New Capability is not created by the validator itself


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_ENewCapNotCreatedByValidatorItself">ENewCapNotCreatedByValidatorItself</a>: u64 = 100;
</code></pre>

Capability code is not valid


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EInvalidCap">EInvalidCap</a>: u64 = 101;
</code></pre>

Validator trying to set gas price higher than threshold.


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EGasPriceHigherThanThreshold">EGasPriceHigherThanThreshold</a>: u64 = 102;
</code></pre>

Invalid protocol public key length.


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_EInvalidProtocolPubKeyLength">EInvalidProtocolPubKeyLength</a>: u64 = 16;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_MAX_COMMISSION_RATE">MAX_COMMISSION_RATE</a>: u64 = 2000;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_MAX_VALIDATOR_METADATA_LENGTH">MAX_VALIDATOR_METADATA_LENGTH</a>: u64 = 256;
</code></pre>

Max gas price a validator can set is 100K MIST.


<pre><code><b>const</b> <a href="../sui_sui_system/validator#sui_system_validator_MAX_VALIDATOR_GAS_PRICE">MAX_VALIDATOR_GAS_PRICE</a>: u64 = 100000;
</code></pre>


<h2 id="sui_system_validator_new_metadata">Function <span class="code-inline">new_metadata</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_new_metadata">new_metadata</a>(<a href="../sui_sui_system/validator#sui_system_validator_sui_address">sui_address</a>: <b>address</b>, <a href="../sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes">protocol_pubkey_bytes</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_network_pubkey_bytes">network_pubkey_bytes</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes">worker_pubkey_bytes</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_proof_of_possession">proof_of_possession</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui_system/validator#sui_system_validator_description">description</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui_system/validator#sui_system_validator_image_url">image_url</a>: <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>, <a href="../sui_sui_system/validator#sui_system_validator_project_url">project_url</a>: <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>, net_address: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui_system/validator#sui_system_validator_p2p_address">p2p_address</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui_system/validator#sui_system_validator_primary_address">primary_address</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui_system/validator#sui_system_validator_worker_address">worker_address</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>): <a href="../sui_sui_system/validator#sui_system_validator_ValidatorMetadata">sui_system::validator::ValidatorMetadata</a>
</code></pre>




<h2 id="sui_system_validator_new">Function <span class="code-inline">new</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_new">new</a>(<a href="../sui_sui_system/validator#sui_system_validator_sui_address">sui_address</a>: <b>address</b>, <a href="../sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes">protocol_pubkey_bytes</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_network_pubkey_bytes">network_pubkey_bytes</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes">worker_pubkey_bytes</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_proof_of_possession">proof_of_possession</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_name">name</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_description">description</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_image_url">image_url</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_project_url">project_url</a>: vector&lt;u8&gt;, net_address: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_p2p_address">p2p_address</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_primary_address">primary_address</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_worker_address">worker_address</a>: vector&lt;u8&gt;, <a href="../sui_sui_system/validator#sui_system_validator_gas_price">gas_price</a>: u64, <a href="../sui_sui_system/validator#sui_system_validator_commission_rate">commission_rate</a>: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_deactivate">Function <span class="code-inline">deactivate</span></h2>

Mark Validator's <span class="code-inline">StakingPool</span> as inactive by setting the <span class="code-inline">deactivation_epoch</span>.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_deactivate">deactivate</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, deactivation_epoch: u64)
</code></pre>




<h2 id="sui_system_validator_activate">Function <span class="code-inline">activate</span></h2>

Activate Validator's <span class="code-inline">StakingPool</span> by setting the <span class="code-inline">activation_epoch</span>.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_activate">activate</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, activation_epoch: u64)
</code></pre>




<h2 id="sui_system_validator_adjust_stake_and_gas_price">Function <span class="code-inline">adjust_stake_and_gas_price</span></h2>

Process pending stake and pending withdraws, and update the gas price.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_adjust_stake_and_gas_price">adjust_stake_and_gas_price</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>)
</code></pre>




<h2 id="sui_system_validator_request_add_stake">Function <span class="code-inline">request_add_stake</span></h2>

Request to add stake to the validator's staking pool, processed at the end of the epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_request_add_stake">request_add_stake</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, stake: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, staker_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>
</code></pre>




<h2 id="sui_system_validator_convert_to_fungible_staked_sui">Function <span class="code-inline">convert_to_fungible_staked_sui</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_convert_to_fungible_staked_sui">convert_to_fungible_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>
</code></pre>




<h2 id="sui_system_validator_redeem_fungible_staked_sui">Function <span class="code-inline">redeem_fungible_staked_sui</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_redeem_fungible_staked_sui">redeem_fungible_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, fungible_staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_validator_request_add_stake_at_genesis">Function <span class="code-inline">request_add_stake_at_genesis</span></h2>

Request to add stake to the validator's staking pool at genesis


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_request_add_stake_at_genesis">request_add_stake_at_genesis</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, stake: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, staker_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_validator_request_withdraw_stake">Function <span class="code-inline">request_withdraw_stake</span></h2>

Request to withdraw stake from the validator's staking pool, processed at the end of the epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_request_withdraw_stake">request_withdraw_stake</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_validator_request_set_gas_price">Function <span class="code-inline">request_set_gas_price</span></h2>

Request to set new gas price for the next epoch.<br/>
Need to present a <span class="code-inline">ValidatorOperationCap</span>.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_request_set_gas_price">request_set_gas_price</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, verified_cap: <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>, new_price: u64)
</code></pre>




<h2 id="sui_system_validator_set_candidate_gas_price">Function <span class="code-inline">set_candidate_gas_price</span></h2>

Set new gas price for the candidate validator.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_set_candidate_gas_price">set_candidate_gas_price</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, verified_cap: <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>, new_price: u64)
</code></pre>




<h2 id="sui_system_validator_request_set_commission_rate">Function <span class="code-inline">request_set_commission_rate</span></h2>

Request to set new commission rate for the next epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_request_set_commission_rate">request_set_commission_rate</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, new_commission_rate: u64)
</code></pre>




<h2 id="sui_system_validator_set_candidate_commission_rate">Function <span class="code-inline">set_candidate_commission_rate</span></h2>

Set new commission rate for the candidate validator.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_set_candidate_commission_rate">set_candidate_commission_rate</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, new_commission_rate: u64)
</code></pre>




<h2 id="sui_system_validator_deposit_stake_rewards">Function <span class="code-inline">deposit_stake_rewards</span></h2>

Deposit stakes rewards into the validator's staking pool, called at the end of the epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_deposit_stake_rewards">deposit_stake_rewards</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, reward: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;)
</code></pre>




<h2 id="sui_system_validator_process_pending_stakes_and_withdraws">Function <span class="code-inline">process_pending_stakes_and_withdraws</span></h2>

Process pending stakes and withdraws, called at the end of the epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_process_pending_stakes_and_withdraws">process_pending_stakes_and_withdraws</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_validator_is_preactive">Function <span class="code-inline">is_preactive</span></h2>

Returns true if the validator is preactive.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_is_preactive">is_preactive</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): bool
</code></pre>




<h2 id="sui_system_validator_metadata">Function <span class="code-inline">metadata</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_metadata">metadata</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_sui_system/validator#sui_system_validator_ValidatorMetadata">sui_system::validator::ValidatorMetadata</a>
</code></pre>




<h2 id="sui_system_validator_sui_address">Function <span class="code-inline">sui_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_sui_address">sui_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): <b>address</b>
</code></pre>




<h2 id="sui_system_validator_name">Function <span class="code-inline">name</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_name">name</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_system_validator_description">Function <span class="code-inline">description</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_description">description</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_system_validator_image_url">Function <span class="code-inline">image_url</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_image_url">image_url</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>
</code></pre>




<h2 id="sui_system_validator_project_url">Function <span class="code-inline">project_url</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_project_url">project_url</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>
</code></pre>




<h2 id="sui_system_validator_network_address">Function <span class="code-inline">network_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_network_address">network_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_system_validator_p2p_address">Function <span class="code-inline">p2p_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_p2p_address">p2p_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_system_validator_primary_address">Function <span class="code-inline">primary_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_primary_address">primary_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_system_validator_worker_address">Function <span class="code-inline">worker_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_worker_address">worker_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_system_validator_protocol_pubkey_bytes">Function <span class="code-inline">protocol_pubkey_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes">protocol_pubkey_bytes</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_system_validator_proof_of_possession">Function <span class="code-inline">proof_of_possession</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_proof_of_possession">proof_of_possession</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_system_validator_network_pubkey_bytes">Function <span class="code-inline">network_pubkey_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_network_pubkey_bytes">network_pubkey_bytes</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_system_validator_worker_pubkey_bytes">Function <span class="code-inline">worker_pubkey_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes">worker_pubkey_bytes</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_network_address">Function <span class="code-inline">next_epoch_network_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_network_address">next_epoch_network_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_p2p_address">Function <span class="code-inline">next_epoch_p2p_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_p2p_address">next_epoch_p2p_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_primary_address">Function <span class="code-inline">next_epoch_primary_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_primary_address">next_epoch_primary_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_worker_address">Function <span class="code-inline">next_epoch_worker_address</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_worker_address">next_epoch_worker_address</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_protocol_pubkey_bytes">Function <span class="code-inline">next_epoch_protocol_pubkey_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_protocol_pubkey_bytes">next_epoch_protocol_pubkey_bytes</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_proof_of_possession">Function <span class="code-inline">next_epoch_proof_of_possession</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_proof_of_possession">next_epoch_proof_of_possession</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_network_pubkey_bytes">Function <span class="code-inline">next_epoch_network_pubkey_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_network_pubkey_bytes">next_epoch_network_pubkey_bytes</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_system_validator_next_epoch_worker_pubkey_bytes">Function <span class="code-inline">next_epoch_worker_pubkey_bytes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_worker_pubkey_bytes">next_epoch_worker_pubkey_bytes</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;u8&gt;&gt;
</code></pre>




<h2 id="sui_system_validator_operation_cap_id">Function <span class="code-inline">operation_cap_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_operation_cap_id">operation_cap_id</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_system_validator_next_epoch_gas_price">Function <span class="code-inline">next_epoch_gas_price</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_next_epoch_gas_price">next_epoch_gas_price</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_total_stake_amount">Function <span class="code-inline">total_stake_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_total_stake_amount">total_stake_amount</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_stake_amount">Function <span class="code-inline">stake_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_stake_amount">stake_amount</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_total_stake">Function <span class="code-inline">total_stake</span></h2>

Return the total amount staked with this validator


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_total_stake">total_stake</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_voting_power">Function <span class="code-inline">voting_power</span></h2>

Return the voting power of this validator.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power">voting_power</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_set_voting_power">Function <span class="code-inline">set_voting_power</span></h2>

Set the voting power of this validator, called only from validator_set.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_set_voting_power">set_voting_power</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, new_voting_power: u64)
</code></pre>




<h2 id="sui_system_validator_pending_stake_amount">Function <span class="code-inline">pending_stake_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_pending_stake_amount">pending_stake_amount</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_pending_stake_withdraw_amount">Function <span class="code-inline">pending_stake_withdraw_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_pending_stake_withdraw_amount">pending_stake_withdraw_amount</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_gas_price">Function <span class="code-inline">gas_price</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_gas_price">gas_price</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_commission_rate">Function <span class="code-inline">commission_rate</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_commission_rate">commission_rate</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): u64
</code></pre>




<h2 id="sui_system_validator_pool_token_exchange_rate_at_epoch">Function <span class="code-inline">pool_token_exchange_rate_at_epoch</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_pool_token_exchange_rate_at_epoch">pool_token_exchange_rate_at_epoch</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, epoch: u64): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>
</code></pre>




<h2 id="sui_system_validator_staking_pool_id">Function <span class="code-inline">staking_pool_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator#sui_system_validator_staking_pool_id">staking_pool_id</a>(self: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>






---

*This page has been truncated because it exceeds the maximum character limit. [View the full source](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/validator.md).*
