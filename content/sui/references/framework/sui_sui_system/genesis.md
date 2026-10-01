---
title: Module sui_system::genesis
sidebar_label: genesis
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

<h2 id="sui_system_genesis_GenesisValidatorMetadata">Struct <span class="code-inline">GenesisValidatorMetadata</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/genesis#sui_system_genesis_GenesisValidatorMetadata">GenesisValidatorMetadata</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">name: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">description: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">image_url: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">project_url: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">sui_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">gas_price: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">commission_rate: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">protocol_public_key: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">proof_of_possession: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">network_public_key: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">worker_public_key: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">network_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">p2p_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">primary_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">worker_address: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_genesis_GenesisChainParameters">Struct <span class="code-inline">GenesisChainParameters</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/genesis#sui_system_genesis_GenesisChainParameters">GenesisChainParameters</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">protocol_version: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">chain_start_timestamp_ms: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">epoch_duration_ms: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake_subsidy_start_epoch: u64</span>
</dt>
<dd>
 Stake Subsidy parameters
</dd>
<dt>
<span class="code-inline">stake_subsidy_initial_distribution_amount: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake_subsidy_period_length: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake_subsidy_decrease_rate: u16</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">max_validator_count: u64</span>
</dt>
<dd>
 Validator committee parameters
</dd>
<dt>
<span class="code-inline">min_validator_joining_stake: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_low_stake_threshold: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_very_low_stake_threshold: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_low_stake_grace_period: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_genesis_TokenDistributionSchedule">Struct <span class="code-inline">TokenDistributionSchedule</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/genesis#sui_system_genesis_TokenDistributionSchedule">TokenDistributionSchedule</a>
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">stake_subsidy_fund_mist: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">allocations: vector&lt;<a href="../sui_sui_system/genesis#sui_system_genesis_TokenAllocation">sui_system::genesis::TokenAllocation</a>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_genesis_TokenAllocation">Struct <span class="code-inline">TokenAllocation</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/genesis#sui_system_genesis_TokenAllocation">TokenAllocation</a>
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">recipient_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">amount_mist: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">staked_with_validator: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;</span>
</dt>
<dd>
 Indicates if this allocation should be staked at genesis and with which validator
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

The <span class="code-inline"><a href="../sui_sui_system/genesis#sui_system_genesis_create">create</a></span> function was called at a non-genesis epoch.


<pre><code><b>const</b> <a href="../sui_sui_system/genesis#sui_system_genesis_ENotCalledAtGenesis">ENotCalledAtGenesis</a>: u64 = 0;
</code></pre>

The <span class="code-inline"><a href="../sui_sui_system/genesis#sui_system_genesis_create">create</a></span> function was called with duplicate validators.


<pre><code><b>const</b> <a href="../sui_sui_system/genesis#sui_system_genesis_EDuplicateValidator">EDuplicateValidator</a>: u64 = 1;
</code></pre>

The validator address is not in the validator set.


<pre><code><b>const</b> <a href="../sui_sui_system/genesis#sui_system_genesis_ENotAValidator">ENotAValidator</a>: u64 = 2;
</code></pre>


<h2 id="sui_system_genesis_create">Function <span class="code-inline">create</span></h2>

This function will be explicitly called once at genesis.<br/>
It will create a singleton SuiSystemState object, which contains
all the information we need in the system.


<pre><code><b>fun</b> <a href="../sui_sui_system/genesis#sui_system_genesis_create">create</a>(sui_system_state_id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, sui_supply: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, genesis_chain_parameters: <a href="../sui_sui_system/genesis#sui_system_genesis_GenesisChainParameters">sui_system::genesis::GenesisChainParameters</a>, genesis_validators: vector&lt;<a href="../sui_sui_system/genesis#sui_system_genesis_GenesisValidatorMetadata">sui_system::genesis::GenesisValidatorMetadata</a>&gt;, token_distribution_schedule: <a href="../sui_sui_system/genesis#sui_system_genesis_TokenDistributionSchedule">sui_system::genesis::TokenDistributionSchedule</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_genesis_allocate_tokens">Function <span class="code-inline">allocate_tokens</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/genesis#sui_system_genesis_allocate_tokens">allocate_tokens</a>(sui_supply: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, allocations: vector&lt;<a href="../sui_sui_system/genesis#sui_system_genesis_TokenAllocation">sui_system::genesis::TokenAllocation</a>&gt;, validators: &<b>mut</b> vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



