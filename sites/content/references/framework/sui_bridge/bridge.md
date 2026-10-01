---
title: Module bridge::bridge
sidebar_label: bridge
---

<pre><code><b>use</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids">bridge::chain_ids</a>;
<b>use</b> <a href="../sui_bridge/committee#bridge_committee">bridge::committee</a>;
<b>use</b> <a href="../sui_bridge/crypto#bridge_crypto">bridge::crypto</a>;
<b>use</b> <a href="../sui_bridge/limiter#bridge_limiter">bridge::limiter</a>;
<b>use</b> <a href="../sui_bridge/message#bridge_message">bridge::message</a>;
<b>use</b> <a href="../sui_bridge/message_types#bridge_message_types">bridge::message_types</a>;
<b>use</b> <a href="../sui_bridge/treasury#bridge_treasury">bridge::treasury</a>;
<b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
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
<b>use</b> <a href="../sui_sui/clock#sui_clock">sui::clock</a>;
<b>use</b> <a href="../sui_sui/coin#sui_coin">sui::coin</a>;
<b>use</b> <a href="../sui_sui/config#sui_config">sui::config</a>;
<b>use</b> <a href="../sui_sui/deny_list#sui_deny_list">sui::deny_list</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field">sui::dynamic_object_field</a>;
<b>use</b> <a href="../sui_sui/ecdsa_k1#sui_ecdsa_k1">sui::ecdsa_k1</a>;
<b>use</b> <a href="../sui_sui/event#sui_event">sui::event</a>;
<b>use</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator">sui::funds_accumulator</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/linked_table#sui_linked_table">sui::linked_table</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/object_bag#sui_object_bag">sui::object_bag</a>;
<b>use</b> <a href="../sui_sui/package#sui_package">sui::package</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/priority_queue#sui_priority_queue">sui::priority_queue</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/sui#sui_sui">sui::sui</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/table_vec#sui_table_vec">sui::table_vec</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
<b>use</b> <a href="../sui_sui/versioned#sui_versioned">sui::versioned</a>;
<b>use</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy">sui_system::stake_subsidy</a>;
<b>use</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool">sui_system::staking_pool</a>;
<b>use</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund">sui_system::storage_fund</a>;
<b>use</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system::sui_system</a>;
<b>use</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner">sui_system::sui_system_state_inner</a>;
<b>use</b> <a href="../sui_sui_system/validator#sui_system_validator">sui_system::validator</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
<b>use</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set">sui_system::validator_set</a>;
<b>use</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper">sui_system::validator_wrapper</a>;
<b>use</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power">sui_system::voting_power</a>;
</code></pre>

<h2 id="bridge_bridge_Bridge">Struct <span class="code-inline">Bridge</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">Bridge</a> <b>has</b> key
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
<span class="code-inline">inner: <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_BridgeInner">Struct <span class="code-inline">BridgeInner</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">BridgeInner</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">bridge_version: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">message_version: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">chain_id: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">sequence_nums: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;u8, u64&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/committee#bridge_committee">committee</a>: <a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/treasury#bridge_treasury">treasury</a>: <a href="../sui_bridge/treasury#bridge_treasury_BridgeTreasury">bridge::treasury::BridgeTreasury</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">token_transfer_records: <a href="../sui_sui/linked_table#sui_linked_table_LinkedTable">sui::linked_table::LinkedTable</a>&lt;<a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a>, <a href="../sui_bridge/bridge#bridge_bridge_BridgeRecord">bridge::bridge::BridgeRecord</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_bridge/limiter#bridge_limiter">limiter</a>: <a href="../sui_bridge/limiter#bridge_limiter_TransferLimiter">bridge::limiter::TransferLimiter</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">paused: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_TokenDepositedEvent">Struct <span class="code-inline">TokenDepositedEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_TokenDepositedEvent">TokenDepositedEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">seq_num: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">source_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">sender_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">token_type: u8</span>
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

<h2 id="bridge_bridge_TokenDepositedEventV2">Struct <span class="code-inline">TokenDepositedEventV2</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_TokenDepositedEventV2">TokenDepositedEventV2</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">seq_num: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">source_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">sender_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_chain: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">target_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">token_type: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">amount: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">timestamp_ms: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_EmergencyOpEvent">Struct <span class="code-inline">EmergencyOpEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_EmergencyOpEvent">EmergencyOpEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">frozen: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_BridgeRecord">Struct <span class="code-inline">BridgeRecord</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeRecord">BridgeRecord</a> <b>has</b> drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_bridge/message#bridge_message">message</a>: <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">verified_signatures: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;vector&lt;u8&gt;&gt;&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">claimed: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_TokenTransferApproved">Struct <span class="code-inline">TokenTransferApproved</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_TokenTransferApproved">TokenTransferApproved</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">message_key: <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_TokenTransferClaimed">Struct <span class="code-inline">TokenTransferClaimed</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_TokenTransferClaimed">TokenTransferClaimed</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">message_key: <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_TokenTransferAlreadyApproved">Struct <span class="code-inline">TokenTransferAlreadyApproved</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_TokenTransferAlreadyApproved">TokenTransferAlreadyApproved</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">message_key: <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_TokenTransferAlreadyClaimed">Struct <span class="code-inline">TokenTransferAlreadyClaimed</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_TokenTransferAlreadyClaimed">TokenTransferAlreadyClaimed</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">message_key: <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_bridge_TokenTransferLimitExceed">Struct <span class="code-inline">TokenTransferLimitExceed</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/bridge#bridge_bridge_TokenTransferLimitExceed">TokenTransferLimitExceed</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">message_key: <a href="../sui_bridge/message#bridge_message_BridgeMessageKey">bridge::message::BridgeMessageKey</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_MESSAGE_VERSION">MESSAGE_VERSION</a>: u8 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_PENDING">TRANSFER_STATUS_PENDING</a>: u8 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_APPROVED">TRANSFER_STATUS_APPROVED</a>: u8 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_CLAIMED">TRANSFER_STATUS_CLAIMED</a>: u8 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_NOT_FOUND">TRANSFER_STATUS_NOT_FOUND</a>: u8 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EVM_ADDRESS_LENGTH">EVM_ADDRESS_LENGTH</a>: u64 = 20;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EUnexpectedMessageType">EUnexpectedMessageType</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EUnauthorisedClaim">EUnauthorisedClaim</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EMalformedMessageError">EMalformedMessageError</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EUnexpectedTokenType">EUnexpectedTokenType</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EUnexpectedChainID">EUnexpectedChainID</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_ENotSystemAddress">ENotSystemAddress</a>: u64 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EUnexpectedSeqNum">EUnexpectedSeqNum</a>: u64 = 6;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EWrongInnerVersion">EWrongInnerVersion</a>: u64 = 7;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EBridgeUnavailable">EBridgeUnavailable</a>: u64 = 8;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EUnexpectedOperation">EUnexpectedOperation</a>: u64 = 9;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EInvariantSuiInitializedTokenTransferShouldNotBeClaimed">EInvariantSuiInitializedTokenTransferShouldNotBeClaimed</a>: u64 = 10;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EMessageNotFoundInRecords">EMessageNotFoundInRecords</a>: u64 = 11;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EUnexpectedMessageVersion">EUnexpectedMessageVersion</a>: u64 = 12;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EBridgeAlreadyPaused">EBridgeAlreadyPaused</a>: u64 = 13;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EBridgeNotPaused">EBridgeNotPaused</a>: u64 = 14;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_ETokenAlreadyClaimedOrHitLimit">ETokenAlreadyClaimedOrHitLimit</a>: u64 = 15;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EInvalidBridgeRoute">EInvalidBridgeRoute</a>: u64 = 16;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EMustBeTokenMessage">EMustBeTokenMessage</a>: u64 = 17;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_EInvalidEvmAddress">EInvalidEvmAddress</a>: u64 = 18;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_ETokenValueIsZero">ETokenValueIsZero</a>: u64 = 19;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/bridge#bridge_bridge_CURRENT_VERSION">CURRENT_VERSION</a>: u64 = 1;
</code></pre>


<h2 id="bridge_bridge_create">Function <span class="code-inline">create</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_create">create</a>(id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, chain_id: u8, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_bridge_init_bridge_committee">Function <span class="code-inline">init_bridge_committee</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_init_bridge_committee">init_bridge_committee</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, active_validator_voting_power: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, u64&gt;, min_stake_participation_percentage: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_bridge_committee_registration">Function <span class="code-inline">committee_registration</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_committee_registration">committee_registration</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, system_state: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, bridge_pubkey_bytes: vector&lt;u8&gt;, http_rest_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_bridge_update_node_url">Function <span class="code-inline">update_node_url</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_update_node_url">update_node_url</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, new_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_bridge_register_foreign_token">Function <span class="code-inline">register_foreign_token</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_register_foreign_token">register_foreign_token</a>&lt;T&gt;(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, tc: <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, uc: <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>, metadata: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="bridge_bridge_send_token">Function <span class="code-inline">send_token</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_send_token">send_token</a>&lt;T&gt;(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, target_chain: u8, target_address: vector&lt;u8&gt;, token: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_bridge_send_token_v2">Function <span class="code-inline">send_token_v2</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_send_token_v2">send_token_v2</a>&lt;T&gt;(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, target_chain: u8, target_address: vector&lt;u8&gt;, token: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, clock: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_bridge_approve_token_transfer">Function <span class="code-inline">approve_token_transfer</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_approve_token_transfer">approve_token_transfer</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, <a href="../sui_bridge/message#bridge_message">message</a>: <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>, signatures: vector&lt;vector&lt;u8&gt;&gt;)
</code></pre>




<h2 id="bridge_bridge_claim_token">Function <span class="code-inline">claim_token</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_claim_token">claim_token</a>&lt;T&gt;(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, clock: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, source_chain: u8, bridge_seq_num: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="bridge_bridge_claim_and_transfer_token">Function <span class="code-inline">claim_and_transfer_token</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_claim_and_transfer_token">claim_and_transfer_token</a>&lt;T&gt;(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, clock: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, source_chain: u8, bridge_seq_num: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_bridge_execute_system_message">Function <span class="code-inline">execute_system_message</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_execute_system_message">execute_system_message</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, <a href="../sui_bridge/message#bridge_message">message</a>: <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>, signatures: vector&lt;vector&lt;u8&gt;&gt;)
</code></pre>




<h2 id="bridge_bridge_get_token_transfer_action_status">Function <span class="code-inline">get_token_transfer_action_status</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_get_token_transfer_action_status">get_token_transfer_action_status</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, source_chain: u8, bridge_seq_num: u64): u8
</code></pre>




<h2 id="bridge_bridge_get_token_transfer_action_signatures">Function <span class="code-inline">get_token_transfer_action_signatures</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_get_token_transfer_action_signatures">get_token_transfer_action_signatures</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, source_chain: u8, bridge_seq_num: u64): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;vector&lt;vector&lt;u8&gt;&gt;&gt;
</code></pre>




<h2 id="bridge_bridge_load_inner">Function <span class="code-inline">load_inner</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_load_inner">load_inner</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>): &<a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>
</code></pre>




<h2 id="bridge_bridge_load_inner_mut">Function <span class="code-inline">load_inner_mut</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_load_inner_mut">load_inner_mut</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>): &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>
</code></pre>




<h2 id="bridge_bridge_claim_token_internal">Function <span class="code-inline">claim_token_internal</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_claim_token_internal">claim_token_internal</a>&lt;T&gt;(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, clock: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, source_chain: u8, bridge_seq_num: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;&gt;, <b>address</b>)
</code></pre>




<h2 id="bridge_bridge_send_token_internal">Function <span class="code-inline">send_token_internal</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_send_token_internal">send_token_internal</a>&lt;T&gt;(inner: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>, target_chain: u8, token: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, <a href="../sui_bridge/message#bridge_message">message</a>: <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>)
</code></pre>




<h2 id="bridge_bridge_execute_emergency_op">Function <span class="code-inline">execute_emergency_op</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_execute_emergency_op">execute_emergency_op</a>(inner: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>, payload: <a href="../sui_bridge/message#bridge_message_EmergencyOp">bridge::message::EmergencyOp</a>)
</code></pre>




<h2 id="bridge_bridge_execute_update_bridge_limit">Function <span class="code-inline">execute_update_bridge_limit</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_execute_update_bridge_limit">execute_update_bridge_limit</a>(inner: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>, payload: <a href="../sui_bridge/message#bridge_message_UpdateBridgeLimit">bridge::message::UpdateBridgeLimit</a>)
</code></pre>




<h2 id="bridge_bridge_execute_update_asset_price">Function <span class="code-inline">execute_update_asset_price</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_execute_update_asset_price">execute_update_asset_price</a>(inner: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>, payload: <a href="../sui_bridge/message#bridge_message_UpdateAssetPrice">bridge::message::UpdateAssetPrice</a>)
</code></pre>




<h2 id="bridge_bridge_execute_add_tokens_on_sui">Function <span class="code-inline">execute_add_tokens_on_sui</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_execute_add_tokens_on_sui">execute_add_tokens_on_sui</a>(inner: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>, payload: <a href="../sui_bridge/message#bridge_message_AddTokenOnSui">bridge::message::AddTokenOnSui</a>)
</code></pre>




<h2 id="bridge_bridge_get_current_seq_num_and_increment">Function <span class="code-inline">get_current_seq_num_and_increment</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_get_current_seq_num_and_increment">get_current_seq_num_and_increment</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<b>mut</b> <a href="../sui_bridge/bridge#bridge_bridge_BridgeInner">bridge::bridge::BridgeInner</a>, msg_type: u8): u64
</code></pre>




<h2 id="bridge_bridge_get_parsed_token_transfer_message">Function <span class="code-inline">get_parsed_token_transfer_message</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/bridge#bridge_bridge_get_parsed_token_transfer_message">get_parsed_token_transfer_message</a>(<a href="../sui_bridge/bridge#bridge_bridge">bridge</a>: &<a href="../sui_bridge/bridge#bridge_bridge_Bridge">bridge::bridge::Bridge</a>, source_chain: u8, bridge_seq_num: u64): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_bridge/message#bridge_message_ParsedTokenTransferMessage">bridge::message::ParsedTokenTransferMessage</a>&gt;
</code></pre>



