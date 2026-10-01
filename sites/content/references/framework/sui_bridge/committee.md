---
title: Module bridge::committee
sidebar_label: committee
---

<pre><code><b>use</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids">bridge::chain_ids</a>;
<b>use</b> <a href="../sui_bridge/crypto#bridge_crypto">bridge::crypto</a>;
<b>use</b> <a href="../sui_bridge/message#bridge_message">bridge::message</a>;
<b>use</b> <a href="../sui_bridge/message_types#bridge_message_types">bridge::message_types</a>;
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
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
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

<h2 id="bridge_committee_BlocklistValidatorEvent">Struct <span class="code-inline">BlocklistValidatorEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/committee#bridge_committee_BlocklistValidatorEvent">BlocklistValidatorEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">blocklisted: bool</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">public_keys: vector&lt;vector&lt;u8&gt;&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_committee_BridgeCommittee">Struct <span class="code-inline">BridgeCommittee</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">BridgeCommittee</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">members: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;vector&lt;u8&gt;, <a href="../sui_bridge/committee#bridge_committee_CommitteeMember">bridge::committee::CommitteeMember</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">member_registrations: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_bridge/committee#bridge_committee_CommitteeMemberRegistration">bridge::committee::CommitteeMemberRegistration</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">last_committee_update_epoch: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_committee_CommitteeUpdateEvent">Struct <span class="code-inline">CommitteeUpdateEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/committee#bridge_committee_CommitteeUpdateEvent">CommitteeUpdateEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">members: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;vector&lt;u8&gt;, <a href="../sui_bridge/committee#bridge_committee_CommitteeMember">bridge::committee::CommitteeMember</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake_participation_percentage: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_committee_CommitteeMemberUrlUpdateEvent">Struct <span class="code-inline">CommitteeMemberUrlUpdateEvent</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/committee#bridge_committee_CommitteeMemberUrlUpdateEvent">CommitteeMemberUrlUpdateEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">member: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">new_url: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="bridge_committee_CommitteeMember">Struct <span class="code-inline">CommitteeMember</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/committee#bridge_committee_CommitteeMember">CommitteeMember</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">sui_address: <b>address</b></span>
</dt>
<dd>
 The Sui Address of the validator
</dd>
<dt>
<span class="code-inline">bridge_pubkey_bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
 The public key bytes of the bridge key
</dd>
<dt>
<span class="code-inline">voting_power: u64</span>
</dt>
<dd>
 Voting power, values are voting power in the scale of 10000.
</dd>
<dt>
<span class="code-inline">http_rest_url: vector&lt;u8&gt;</span>
</dt>
<dd>
 The HTTP REST URL the member's node listens to
 it looks like b'https://127.0.0.1:9191'
</dd>
<dt>
<span class="code-inline">blocklisted: bool</span>
</dt>
<dd>
 If this member is blocklisted
</dd>
</dl>


</details>

<h2 id="bridge_committee_CommitteeMemberRegistration">Struct <span class="code-inline">CommitteeMemberRegistration</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/committee#bridge_committee_CommitteeMemberRegistration">CommitteeMemberRegistration</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">sui_address: <b>address</b></span>
</dt>
<dd>
 The Sui Address of the validator
</dd>
<dt>
<span class="code-inline">bridge_pubkey_bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
 The public key bytes of the bridge key
</dd>
<dt>
<span class="code-inline">http_rest_url: vector&lt;u8&gt;</span>
</dt>
<dd>
 The HTTP REST URL the member's node listens to
 it looks like b'https://127.0.0.1:9191'
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_ESignatureBelowThreshold">ESignatureBelowThreshold</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_EDuplicatedSignature">EDuplicatedSignature</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_EInvalidSignature">EInvalidSignature</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_ENotSystemAddress">ENotSystemAddress</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_EValidatorBlocklistContainsUnknownKey">EValidatorBlocklistContainsUnknownKey</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_ESenderNotActiveValidator">ESenderNotActiveValidator</a>: u64 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_EInvalidPubkeyLength">EInvalidPubkeyLength</a>: u64 = 6;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_ECommitteeAlreadyInitiated">ECommitteeAlreadyInitiated</a>: u64 = 7;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_EDuplicatePubkey">EDuplicatePubkey</a>: u64 = 8;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_ESenderIsNotInBridgeCommittee">ESenderIsNotInBridgeCommittee</a>: u64 = 9;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_SUI_MESSAGE_PREFIX">SUI_MESSAGE_PREFIX</a>: vector&lt;u8&gt; = vector[83, 85, 73, 95, 66, 82, 73, 68, 71, 69, 95, 77, 69, 83, 83, 65, 71, 69];
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/committee#bridge_committee_ECDSA_COMPRESSED_PUBKEY_LENGTH">ECDSA_COMPRESSED_PUBKEY_LENGTH</a>: u64 = 33;
</code></pre>


<h2 id="bridge_committee_verify_signatures">Function <span class="code-inline">verify_signatures</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/committee#bridge_committee_verify_signatures">verify_signatures</a>(self: &<a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>, <a href="../sui_bridge/message#bridge_message">message</a>: <a href="../sui_bridge/message#bridge_message_BridgeMessage">bridge::message::BridgeMessage</a>, signatures: vector&lt;vector&lt;u8&gt;&gt;)
</code></pre>




<h2 id="bridge_committee_create">Function <span class="code-inline">create</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/committee#bridge_committee_create">create</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>
</code></pre>




<h2 id="bridge_committee_register">Function <span class="code-inline">register</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/committee#bridge_committee_register">register</a>(self: &<b>mut</b> <a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>, system_state: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, bridge_pubkey_bytes: vector&lt;u8&gt;, http_rest_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_committee_try_create_next_committee">Function <span class="code-inline">try_create_next_committee</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/committee#bridge_committee_try_create_next_committee">try_create_next_committee</a>(self: &<b>mut</b> <a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>, active_validator_voting_power: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, u64&gt;, min_stake_participation_percentage: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_committee_execute_blocklist">Function <span class="code-inline">execute_blocklist</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/committee#bridge_committee_execute_blocklist">execute_blocklist</a>(self: &<b>mut</b> <a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>, blocklist: <a href="../sui_bridge/message#bridge_message_Blocklist">bridge::message::Blocklist</a>)
</code></pre>




<h2 id="bridge_committee_committee_members">Function <span class="code-inline">committee_members</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/committee#bridge_committee_committee_members">committee_members</a>(self: &<a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>): &<a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;vector&lt;u8&gt;, <a href="../sui_bridge/committee#bridge_committee_CommitteeMember">bridge::committee::CommitteeMember</a>&gt;
</code></pre>




<h2 id="bridge_committee_update_node_url">Function <span class="code-inline">update_node_url</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/committee#bridge_committee_update_node_url">update_node_url</a>(self: &<b>mut</b> <a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>, new_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="bridge_committee_check_uniqueness_bridge_keys">Function <span class="code-inline">check_uniqueness_bridge_keys</span></h2>


<pre><code><b>fun</b> <a href="../sui_bridge/committee#bridge_committee_check_uniqueness_bridge_keys">check_uniqueness_bridge_keys</a>(self: &<a href="../sui_bridge/committee#bridge_committee_BridgeCommittee">bridge::committee::BridgeCommittee</a>, bridge_pubkey_bytes: vector&lt;u8&gt;)
</code></pre>



