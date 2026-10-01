---
title: Module sui_system::sui_system
sidebar_label: sui_system
---

Sui System State Type Upgrade Guide
<span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">SuiSystemState</a></span> is a thin wrapper around <span class="code-inline">SuiSystemStateInner</span> that provides a versioned interface.
The <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">SuiSystemState</a></span> object has a fixed ID 0x5, and the <span class="code-inline">SuiSystemStateInner</span> object is stored as a dynamic field.<br/>
There are a few different ways to upgrade the <span class="code-inline">SuiSystemStateInner</span> type:

The simplest and one that doesn't involve a real upgrade is to just add dynamic fields to the <span class="code-inline">extra_fields</span> field
of <span class="code-inline">SuiSystemStateInner</span> or any of its sub type. This is useful when we are in a rush, or making a small change,
or still experimenting a new field.

To properly upgrade the <span class="code-inline">SuiSystemStateInner</span> type, we need to ship a new framework that does the following:
1. Define a new <span class="code-inline">SuiSystemStateInner</span>type (e.g. <span class="code-inline">SuiSystemStateInnerV2</span>).
2. Define a data migration function that migrates the old <span class="code-inline">SuiSystemStateInner</span> to the new one (i.e. SuiSystemStateInnerV2).
3. Replace all uses of <span class="code-inline">SuiSystemStateInner</span> with <span class="code-inline">SuiSystemStateInnerV2</span> in both sui_system.move and sui_system_state_inner.move,
   with the exception of the <span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_create">sui_system_state_inner::create</a></span> function, which should always return the genesis type.
4. Inside <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_load_inner_maybe_upgrade">load_inner_maybe_upgrade</a></span> function, check the current version in the wrapper, and if it's not the latest version,
  call the data migration function to upgrade the inner object. Make sure to also update the version in the wrapper.<br/>
A detailed example can be found in sui/tests/framework_upgrades/mock_sui_systems/shallow_upgrade.<br/>
Along with the Move change, we also need to update the Rust code to support the new type. This includes:
1. Define a new <span class="code-inline">SuiSystemStateInner</span> struct type that matches the new Move type, and implement the SuiSystemStateTrait.
2. Update the <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">SuiSystemState</a></span> struct to include the new version as a new enum variant.
3. Update the <span class="code-inline">get_sui_system_state</span> function to handle the new version.<br/>
To test that the upgrade will be successful, we need to modify <span class="code-inline">sui_system_state_production_upgrade_test</span> test in
protocol_version_tests and trigger a real upgrade using the new framework. We will need to keep this directory as old version,
put the new framework in a new directory, and run the test to exercise the upgrade.

To upgrade Validator type, besides everything above, we also need to:
1. Define a new Validator type (e.g. ValidatorV2).
2. Define a data migration function that migrates the old Validator to the new one (i.e. ValidatorV2).
3. Replace all uses of Validator with ValidatorV2 except the genesis creation function.
4. In validator_wrapper::upgrade_to_latest, check the current version in the wrapper, and if it's not the latest version,
 call the data migration function to upgrade it.<br/>
In Rust, we also need to add a new case in <span class="code-inline">get_validator_from_table</span>.<br/>
Note that it is possible to upgrade SuiSystemStateInner without upgrading Validator, but not the other way around.<br/>
And when we only upgrade SuiSystemStateInner, the version of Validator in the wrapper will not be updated, and hence may become
inconsistent with the version of SuiSystemStateInner. This is fine as long as we don't use the Validator version to determine
the SuiSystemStateInner version, or vice versa.

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
<b>use</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner">sui_system::sui_system_state_inner</a>;
<b>use</b> <a href="../sui_sui_system/validator#sui_system_validator">sui_system::validator</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
<b>use</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set">sui_system::validator_set</a>;
<b>use</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper">sui_system::validator_wrapper</a>;
<b>use</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power">sui_system::voting_power</a>;
</code></pre>

<h2 id="sui_system_sui_system_SuiSystemState">Struct <span class="code-inline">SuiSystemState</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">SuiSystemState</a> <b>has</b> key
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
<span class="code-inline">version: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_sui_system_AccumulatorStorageCostKey">Struct <span class="code-inline">AccumulatorStorageCostKey</span></h2>

Key for storing the storage cost for accumulator objects, computed at end of epoch.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_AccumulatorStorageCostKey">AccumulatorStorageCostKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_EWrongInnerVersion">EWrongInnerVersion</a>: u64 = 1;
</code></pre>


<h2 id="sui_system_sui_system_create">Function <span class="code-inline">create</span></h2>

Create a new SuiSystemState object and make it shared.<br/>
This function will be called only once in genesis.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_create">create</a>(id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, validators: vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, <a href="../sui_sui_system/storage_fund#sui_system_storage_fund">storage_fund</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, protocol_version: u64, epoch_start_timestamp_ms: u64, parameters: <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters">sui_system::sui_system_state_inner::SystemParameters</a>, <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy">stake_subsidy</a>: <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_add_validator_candidate">Function <span class="code-inline">request_add_validator_candidate</span></h2>

Can be called by anyone who wishes to become a validator candidate and starts accruing delegated
stakes in their staking pool. Once they have at least <span class="code-inline">MIN_VALIDATOR_JOINING_STAKE</span> amount of stake they
can call <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_request_add_validator">request_add_validator</a></span> to officially become an active validator at the next epoch.<br/>
Aborts if the caller is already a pending or active validator, or a validator candidate.<br/>
Note: <span class="code-inline">proof_of_possession</span> MUST be a valid signature using sui_address and protocol_pubkey_bytes.<br/>
To produce a valid PoP, run [fn test_proof_of_possession].


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_add_validator_candidate">request_add_validator_candidate</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, pubkey_bytes: vector&lt;u8&gt;, network_pubkey_bytes: vector&lt;u8&gt;, worker_pubkey_bytes: vector&lt;u8&gt;, proof_of_possession: vector&lt;u8&gt;, name: vector&lt;u8&gt;, description: vector&lt;u8&gt;, image_url: vector&lt;u8&gt;, project_url: vector&lt;u8&gt;, net_address: vector&lt;u8&gt;, p2p_address: vector&lt;u8&gt;, primary_address: vector&lt;u8&gt;, worker_address: vector&lt;u8&gt;, gas_price: u64, commission_rate: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_remove_validator_candidate">Function <span class="code-inline">request_remove_validator_candidate</span></h2>

Called by a validator candidate to remove themselves from the candidacy. After this call
their staking pool becomes deactivate.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_remove_validator_candidate">request_remove_validator_candidate</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_add_validator">Function <span class="code-inline">request_add_validator</span></h2>

Called by a validator candidate to add themselves to the active validator set beginning next epoch.<br/>
Aborts if the validator is a duplicate with one of the pending or active validators, or if the amount of
stake the validator has doesn't meet the min threshold, or if the number of new validators for the next
epoch has already reached the maximum.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_add_validator">request_add_validator</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_remove_validator">Function <span class="code-inline">request_remove_validator</span></h2>

A validator can call this function to request a removal in the next epoch.<br/>
We use the sender of <span class="code-inline">ctx</span> to look up the validator
(i.e. sender must match the sui_address in the validator).<br/>
At the end of the epoch, the <span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator">validator</a></span> object will be returned to the sui_address
of the validator.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_remove_validator">request_remove_validator</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_set_gas_price">Function <span class="code-inline">request_set_gas_price</span></h2>

A validator can call this entry function to submit a new gas price quote, to be
used for the reference gas price calculation at the end of the epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_set_gas_price">request_set_gas_price</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, new_gas_price: u64)
</code></pre>




<h2 id="sui_system_sui_system_set_candidate_validator_gas_price">Function <span class="code-inline">set_candidate_validator_gas_price</span></h2>

This entry function is used to set new gas price for candidate validators


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_set_candidate_validator_gas_price">set_candidate_validator_gas_price</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, new_gas_price: u64)
</code></pre>




<h2 id="sui_system_sui_system_request_set_commission_rate">Function <span class="code-inline">request_set_commission_rate</span></h2>

A validator can call this entry function to set a new commission rate, updated at the end of
the epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_set_commission_rate">request_set_commission_rate</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, new_commission_rate: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_set_candidate_validator_commission_rate">Function <span class="code-inline">set_candidate_validator_commission_rate</span></h2>

This entry function is used to set new commission rate for candidate validators


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_set_candidate_validator_commission_rate">set_candidate_validator_commission_rate</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, new_commission_rate: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_add_stake">Function <span class="code-inline">request_add_stake</span></h2>

Add stake to a validator's staking pool.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_add_stake">request_add_stake</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, stake: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, validator_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_add_stake_non_entry">Function <span class="code-inline">request_add_stake_non_entry</span></h2>

The non-entry version of <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_request_add_stake">request_add_stake</a></span>, which returns the staked SUI instead of transferring it to the sender.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_add_stake_non_entry">request_add_stake_non_entry</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, stake: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, validator_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>
</code></pre>




<h2 id="sui_system_sui_system_request_add_stake_mul_coin">Function <span class="code-inline">request_add_stake_mul_coin</span></h2>

Add stake to a validator's staking pool using multiple coins.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_add_stake_mul_coin">request_add_stake_mul_coin</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, stakes: vector&lt;<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;&gt;, stake_amount: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, validator_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_request_withdraw_stake">Function <span class="code-inline">request_withdraw_stake</span></h2>

Withdraw stake from a validator's staking pool.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_withdraw_stake">request_withdraw_stake</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_convert_to_fungible_staked_sui">Function <span class="code-inline">convert_to_fungible_staked_sui</span></h2>

Convert StakedSui into a FungibleStakedSui object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_convert_to_fungible_staked_sui">convert_to_fungible_staked_sui</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>
</code></pre>




<h2 id="sui_system_sui_system_redeem_fungible_staked_sui">Function <span class="code-inline">redeem_fungible_staked_sui</span></h2>

Convert FungibleStakedSui into a StakedSui object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_redeem_fungible_staked_sui">redeem_fungible_staked_sui</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, fungible_staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_sui_system_request_withdraw_stake_non_entry">Function <span class="code-inline">request_withdraw_stake_non_entry</span></h2>

Non-entry version of <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_request_withdraw_stake">request_withdraw_stake</a></span> that returns the withdrawn SUI instead of transferring it to the sender.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_request_withdraw_stake_non_entry">request_withdraw_stake_non_entry</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_sui_system_report_validator">Function <span class="code-inline">report_validator</span></h2>

Report a validator as a bad or non-performant actor in the system.<br/>
Succeeds if all the following are satisfied:
1. both the reporter in <span class="code-inline">cap</span> and the input <span class="code-inline">reportee_addr</span> are active validators.
2. reporter and reportee not the same address.
3. the cap object is still valid.<br/>
This function is idempotent.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_report_validator">report_validator</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, reportee_addr: <b>address</b>)
</code></pre>




<h2 id="sui_system_sui_system_undo_report_validator">Function <span class="code-inline">undo_report_validator</span></h2>

Undo a <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system_report_validator">report_validator</a></span> action. Aborts if
1. the reportee is not a currently active validator or
2. the sender has not previously reported the <span class="code-inline">reportee_addr</span>, or
3. the cap is not valid


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_undo_report_validator">undo_report_validator</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, reportee_addr: <b>address</b>)
</code></pre>




<h2 id="sui_system_sui_system_rotate_operation_cap">Function <span class="code-inline">rotate_operation_cap</span></h2>

Create a new <span class="code-inline">UnverifiedValidatorOperationCap</span>, transfer it to the
validator and registers it. The original object is thus revoked.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_rotate_operation_cap">rotate_operation_cap</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_name">Function <span class="code-inline">update_validator_name</span></h2>

Update a validator's name.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_name">update_validator_name</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, name: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_description">Function <span class="code-inline">update_validator_description</span></h2>

Update a validator's description


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_description">update_validator_description</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, description: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_image_url">Function <span class="code-inline">update_validator_image_url</span></h2>

Update a validator's image url


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_image_url">update_validator_image_url</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, image_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_project_url">Function <span class="code-inline">update_validator_project_url</span></h2>

Update a validator's project url


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_project_url">update_validator_project_url</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, project_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_next_epoch_network_address">Function <span class="code-inline">update_validator_next_epoch_network_address</span></h2>

Update a validator's network address.<br/>
The change will only take effects starting from the next epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_network_address">update_validator_next_epoch_network_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, network_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_candidate_validator_network_address">Function <span class="code-inline">update_candidate_validator_network_address</span></h2>

Update candidate validator's network address.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_network_address">update_candidate_validator_network_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, network_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_next_epoch_p2p_address">Function <span class="code-inline">update_validator_next_epoch_p2p_address</span></h2>

Update a validator's p2p address.<br/>
The change will only take effects starting from the next epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_p2p_address">update_validator_next_epoch_p2p_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, p2p_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_candidate_validator_p2p_address">Function <span class="code-inline">update_candidate_validator_p2p_address</span></h2>

Update candidate validator's p2p address.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_p2p_address">update_candidate_validator_p2p_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, p2p_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_next_epoch_primary_address">Function <span class="code-inline">update_validator_next_epoch_primary_address</span></h2>

Update a validator's narwhal primary address.<br/>
The change will only take effects starting from the next epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_primary_address">update_validator_next_epoch_primary_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, primary_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_candidate_validator_primary_address">Function <span class="code-inline">update_candidate_validator_primary_address</span></h2>

Update candidate validator's narwhal primary address.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_primary_address">update_candidate_validator_primary_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, primary_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_next_epoch_worker_address">Function <span class="code-inline">update_validator_next_epoch_worker_address</span></h2>

Update a validator's narwhal worker address.<br/>
The change will only take effects starting from the next epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_worker_address">update_validator_next_epoch_worker_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, worker_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_candidate_validator_worker_address">Function <span class="code-inline">update_candidate_validator_worker_address</span></h2>

Update candidate validator's narwhal worker address.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_worker_address">update_candidate_validator_worker_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, worker_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_next_epoch_protocol_pubkey">Function <span class="code-inline">update_validator_next_epoch_protocol_pubkey</span></h2>

Update a validator's public key of protocol key and proof of possession.<br/>
The change will only take effects starting from the next epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_protocol_pubkey">update_validator_next_epoch_protocol_pubkey</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, protocol_pubkey: vector&lt;u8&gt;, proof_of_possession: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_candidate_validator_protocol_pubkey">Function <span class="code-inline">update_candidate_validator_protocol_pubkey</span></h2>

Update candidate validator's public key of protocol key and proof of possession.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_protocol_pubkey">update_candidate_validator_protocol_pubkey</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, protocol_pubkey: vector&lt;u8&gt;, proof_of_possession: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_next_epoch_worker_pubkey">Function <span class="code-inline">update_validator_next_epoch_worker_pubkey</span></h2>

Update a validator's public key of worker key.<br/>
The change will only take effects starting from the next epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_worker_pubkey">update_validator_next_epoch_worker_pubkey</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, worker_pubkey: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_candidate_validator_worker_pubkey">Function <span class="code-inline">update_candidate_validator_worker_pubkey</span></h2>

Update candidate validator's public key of worker key.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_worker_pubkey">update_candidate_validator_worker_pubkey</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, worker_pubkey: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_validator_next_epoch_network_pubkey">Function <span class="code-inline">update_validator_next_epoch_network_pubkey</span></h2>

Update a validator's public key of network key.<br/>
The change will only take effects starting from the next epoch.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_network_pubkey">update_validator_next_epoch_network_pubkey</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, network_pubkey: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_update_candidate_validator_network_pubkey">Function <span class="code-inline">update_candidate_validator_network_pubkey</span></h2>

Update candidate validator's public key of network key.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_network_pubkey">update_candidate_validator_network_pubkey</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, network_pubkey: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_validator_address_by_pool_id">Function <span class="code-inline">validator_address_by_pool_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_validator_address_by_pool_id">validator_address_by_pool_id</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, pool_id: &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): <b>address</b>
</code></pre>




<h2 id="sui_system_sui_system_pool_exchange_rates">Function <span class="code-inline">pool_exchange_rates</span></h2>

Getter of the pool token exchange rate of a staking pool. Works for both active and inactive pools.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_pool_exchange_rates">pool_exchange_rates</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, pool_id: &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;u64, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>&gt;
</code></pre>




<h2 id="sui_system_sui_system_active_validator_addresses">Function <span class="code-inline">active_validator_addresses</span></h2>

Getter returning addresses of the currently active validators.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_active_validator_addresses">active_validator_addresses</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): vector&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_system_sui_system_active_validator_addresses_ref">Function <span class="code-inline">active_validator_addresses_ref</span></h2>

Getter returning addresses of the currently active validators by reference.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_active_validator_addresses_ref">active_validator_addresses_ref</a>(wrapper: &<a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): vector&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_system_sui_system_active_validator_voting_powers">Function <span class="code-inline">active_validator_voting_powers</span></h2>

Getter returns the voting power of the active validators, values are voting power in the scale of 10000.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_active_validator_voting_powers">active_validator_voting_powers</a>(wrapper: &<a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, u64&gt;
</code></pre>




<h2 id="sui_system_sui_system_active_validator_stake_amount">Function <span class="code-inline">active_validator_stake_amount</span></h2>

Getter returns the total stake amount of a given validator.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_active_validator_stake_amount">active_validator_stake_amount</a>(wrapper: &<a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, validator_addr: <b>address</b>): u64
</code></pre>




<h2 id="sui_system_sui_system_calculate_rewards">Function <span class="code-inline">calculate_rewards</span></h2>

Calculate the rewards for a given staked SUI object.<br/>
Used in the package, and can be dev-inspected.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_calculate_rewards">calculate_rewards</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, staked_sui: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): u64
</code></pre>




<h2 id="sui_system_sui_system_advance_epoch">Function <span class="code-inline">advance_epoch</span></h2>

This function should be called at the end of an epoch, and advances the system to the next epoch.<br/>
It does the following things:
1. Add storage charge to the storage fund.
2. Burn the storage rebates from the storage fund. These are already refunded to transaction sender's
   gas coins.
3. Distribute computation charge to validator stake.
4. Update all validators.


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_advance_epoch">advance_epoch</a>(storage_reward: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, computation_reward: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, new_epoch: u64, next_protocol_version: u64, storage_rebate: u64, non_refundable_storage_fee: u64, storage_fund_reinvest_rate: u64, reward_slashing_rate: u64, epoch_start_timestamp_ms: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_sui_system_load_system_state">Function <span class="code-inline">load_system_state</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_load_system_state">load_system_state</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): &<a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>
</code></pre>




<h2 id="sui_system_sui_system_load_system_state_mut">Function <span class="code-inline">load_system_state_mut</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_load_system_state_mut">load_system_state_mut</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>
</code></pre>




<h2 id="sui_system_sui_system_load_system_state_ref">Function <span class="code-inline">load_system_state_ref</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_load_system_state_ref">load_system_state_ref</a>(self: &<a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): &<a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>
</code></pre>




<h2 id="sui_system_sui_system_load_inner_maybe_upgrade">Function <span class="code-inline">load_inner_maybe_upgrade</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_load_inner_maybe_upgrade">load_inner_maybe_upgrade</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>
</code></pre>




<h2 id="sui_system_sui_system_validator_voting_powers">Function <span class="code-inline">validator_voting_powers</span></h2>

Returns the voting power of the active validators, values are voting power in the scale of 10000.


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_validator_voting_powers">validator_voting_powers</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>): <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, u64&gt;
</code></pre>




<h2 id="sui_system_sui_system_store_execution_time_estimates">Function <span class="code-inline">store_execution_time_estimates</span></h2>

Saves the given execution time estimate blob to the SuiSystemState object, for system use
at the start of the next epoch.


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_store_execution_time_estimates">store_execution_time_estimates</a>(wrapper: &<b>mut</b> <a href="../sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState">sui_system::sui_system::SuiSystemState</a>, estimates_bytes: vector&lt;u8&gt;)
</code></pre>






---

*This page has been truncated because it exceeds the maximum character limit. [View the full source](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/sui_system.md).*
