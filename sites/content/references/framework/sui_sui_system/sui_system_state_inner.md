---
title: Module sui_system::sui_system_state_inner
sidebar_label: sui_system_state_inner
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
<b>use</b> <a href="../sui_sui_system/validator#sui_system_validator">sui_system::validator</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
<b>use</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set">sui_system::validator_set</a>;
<b>use</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper">sui_system::validator_wrapper</a>;
<b>use</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power">sui_system::voting_power</a>;
</code></pre>

<h2 id="sui_system_sui_system_state_inner_ExecutionTimeObservationChunkKey">Struct <span class="code-inline">ExecutionTimeObservationChunkKey</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ExecutionTimeObservationChunkKey">ExecutionTimeObservationChunkKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">chunk_index: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_sui_system_state_inner_SystemParameters">Struct <span class="code-inline">SystemParameters</span></h2>

A list of system config parameters.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters">SystemParameters</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">epoch_duration_ms: u64</span>
</dt>
<dd>
 The duration of an epoch, in milliseconds.
</dd>
<dt>
<span class="code-inline">stake_subsidy_start_epoch: u64</span>
</dt>
<dd>
 The starting epoch in which stake subsidies start being paid out
</dd>
<dt>
<span class="code-inline">max_validator_count: u64</span>
</dt>
<dd>
 Deprecated.<br/>
 Maximum number of active validators at any moment.<br/>
 We do not allow the number of validators in any epoch to go above this.
</dd>
<dt>
<span class="code-inline">min_validator_joining_stake: u64</span>
</dt>
<dd>
 Deprecated.<br/>
 Lower-bound on the amount of stake required to become a validator.
</dd>
<dt>
<span class="code-inline">validator_low_stake_threshold: u64</span>
</dt>
<dd>
 Validators with stake amount below <span class="code-inline">validator_low_stake_threshold</span> are considered to
 have low stake and will be escorted out of the validator set after being below this
 threshold for more than <span class="code-inline">validator_low_stake_grace_period</span> number of epochs.
</dd>
<dt>
<span class="code-inline">validator_very_low_stake_threshold: u64</span>
</dt>
<dd>
 Deprecated.<br/>
 Validators with stake below <span class="code-inline">validator_very_low_stake_threshold</span> will be removed
 immediately at epoch change, no grace period.
</dd>
<dt>
<span class="code-inline">validator_low_stake_grace_period: u64</span>
</dt>
<dd>
 A validator can have stake below <span class="code-inline">validator_low_stake_threshold</span>
 for this many epochs before being kicked out.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields">extra_fields</a>: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_sui_system_state_inner_SystemParametersV2">Struct <span class="code-inline">SystemParametersV2</span></h2>

Added <span class="code-inline">min_validator_count</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParametersV2">SystemParametersV2</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">epoch_duration_ms: u64</span>
</dt>
<dd>
 The duration of an epoch, in milliseconds.
</dd>
<dt>
<span class="code-inline">stake_subsidy_start_epoch: u64</span>
</dt>
<dd>
 The starting epoch in which stake subsidies start being paid out
</dd>
<dt>
<span class="code-inline">min_validator_count: u64</span>
</dt>
<dd>
 Minimum number of active validators at any moment.
</dd>
<dt>
<span class="code-inline">max_validator_count: u64</span>
</dt>
<dd>
 Maximum number of active validators at any moment.<br/>
 We do not allow the number of validators in any epoch to go above this.
</dd>
<dt>
<span class="code-inline">min_validator_joining_stake: u64</span>
</dt>
<dd>
 Deprecated.<br/>
 Lower-bound on the amount of stake required to become a validator.
</dd>
<dt>
<span class="code-inline">validator_low_stake_threshold: u64</span>
</dt>
<dd>
 Deprecated.<br/>
 Validators with stake amount below <span class="code-inline">validator_low_stake_threshold</span> are considered to
 have low stake and will be escorted out of the validator set after being below this
 threshold for more than <span class="code-inline">validator_low_stake_grace_period</span> number of epochs.
</dd>
<dt>
<span class="code-inline">validator_very_low_stake_threshold: u64</span>
</dt>
<dd>
 Deprecated.<br/>
 Validators with stake below <span class="code-inline">validator_very_low_stake_threshold</span> will be removed
 immediately at epoch change, no grace period.
</dd>
<dt>
<span class="code-inline">validator_low_stake_grace_period: u64</span>
</dt>
<dd>
 A validator can have stake below <span class="code-inline">validator_low_stake_threshold</span>
 for this many epochs before being kicked out.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields">extra_fields</a>: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_sui_system_state_inner_SuiSystemStateInner">Struct <span class="code-inline">SuiSystemStateInner</span></h2>

The top-level object containing all information of the Sui system.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInner">SuiSystemStateInner</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch">epoch</a>: u64</span>
</dt>
<dd>
 The current epoch ID, starting from 0.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version">protocol_version</a>: u64</span>
</dt>
<dd>
 The current protocol version, starting from 1.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_system_state_version">system_state_version</a>: u64</span>
</dt>
<dd>
 The current version of the system state data structure type.<br/>
 This is always the same as SuiSystemState.version. Keeping a copy here so that
 we know what version it is by inspecting SuiSystemStateInner as well.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_validators">validators</a>: <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a></span>
</dt>
<dd>
 Contains all information about the validators.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/storage_fund#sui_system_storage_fund">storage_fund</a>: <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a></span>
</dt>
<dd>
 The storage fund.
</dd>
<dt>
<span class="code-inline">parameters: <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters">sui_system::sui_system_state_inner::SystemParameters</a></span>
</dt>
<dd>
 A list of system config parameters.
</dd>
<dt>
<span class="code-inline">reference_gas_price: u64</span>
</dt>
<dd>
 The reference gas price for the current epoch.
</dd>
<dt>
<span class="code-inline">validator_report_records: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;&gt;</span>
</dt>
<dd>
 A map storing the records of validator reporting each other.<br/>
 There is an entry in the map for each validator that has been reported
 at least once. The entry VecSet contains all the validators that reported
 them. If a validator has never been reported they don't have an entry in this map.<br/>
 This map persists across epoch: a peer continues being in a reported state until the
 reporter doesn't explicitly remove their report.<br/>
 Note that in case we want to support validator address change in future,
 the reports should be based on validator ids
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy">stake_subsidy</a>: <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a></span>
</dt>
<dd>
 Schedule of stake subsidies given out each epoch.
</dd>
<dt>
<span class="code-inline">safe_mode: bool</span>
</dt>
<dd>
 Whether the system is running in a downgraded safe mode due to a non-recoverable bug.<br/>
 This is set whenever we failed to execute advance_epoch, and ended up executing advance_epoch_safe_mode.<br/>
 It can be reset once we are able to successfully execute advance_epoch.<br/>
 The rest of the fields starting with <span class="code-inline">safe_mode_</span> are accumulated during safe mode
 when advance_epoch_safe_mode is executed. They will eventually be processed once we
 are out of safe mode.
</dd>
<dt>
<span class="code-inline">safe_mode_storage_rewards: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">safe_mode_computation_rewards: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">safe_mode_storage_rebates: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">safe_mode_non_refundable_storage_fee: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch_start_timestamp_ms">epoch_start_timestamp_ms</a>: u64</span>
</dt>
<dd>
 Unix timestamp of the current epoch start
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields">extra_fields</a>: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_sui_system_state_inner_SuiSystemStateInnerV2">Struct <span class="code-inline">SuiSystemStateInnerV2</span></h2>

Uses SystemParametersV2 as the parameters.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">SuiSystemStateInnerV2</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch">epoch</a>: u64</span>
</dt>
<dd>
 The current epoch ID, starting from 0.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version">protocol_version</a>: u64</span>
</dt>
<dd>
 The current protocol version, starting from 1.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_system_state_version">system_state_version</a>: u64</span>
</dt>
<dd>
 The current version of the system state data structure type.<br/>
 This is always the same as SuiSystemState.version. Keeping a copy here so that
 we know what version it is by inspecting SuiSystemStateInner as well.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_validators">validators</a>: <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a></span>
</dt>
<dd>
 Contains all information about the validators.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/storage_fund#sui_system_storage_fund">storage_fund</a>: <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a></span>
</dt>
<dd>
 The storage fund.
</dd>
<dt>
<span class="code-inline">parameters: <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParametersV2">sui_system::sui_system_state_inner::SystemParametersV2</a></span>
</dt>
<dd>
 A list of system config parameters.
</dd>
<dt>
<span class="code-inline">reference_gas_price: u64</span>
</dt>
<dd>
 The reference gas price for the current epoch.
</dd>
<dt>
<span class="code-inline">validator_report_records: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;&gt;</span>
</dt>
<dd>
 A map storing the records of validator reporting each other.<br/>
 There is an entry in the map for each validator that has been reported
 at least once. The entry VecSet contains all the validators that reported
 them. If a validator has never been reported they don't have an entry in this map.<br/>
 This map persists across epoch: a peer continues being in a reported state until the
 reporter doesn't explicitly remove their report.<br/>
 Note that in case we want to support validator address change in future,
 the reports should be based on validator ids
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy">stake_subsidy</a>: <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a></span>
</dt>
<dd>
 Schedule of stake subsidies given out each epoch.
</dd>
<dt>
<span class="code-inline">safe_mode: bool</span>
</dt>
<dd>
 Whether the system is running in a downgraded safe mode due to a non-recoverable bug.<br/>
 This is set whenever we failed to execute advance_epoch, and ended up executing advance_epoch_safe_mode.<br/>
 It can be reset once we are able to successfully execute advance_epoch.<br/>
 The rest of the fields starting with <span class="code-inline">safe_mode_</span> are accumulated during safe mode
 when advance_epoch_safe_mode is executed. They will eventually be processed once we
 are out of safe mode.
</dd>
<dt>
<span class="code-inline">safe_mode_storage_rewards: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">safe_mode_computation_rewards: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">safe_mode_storage_rebates: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">safe_mode_non_refundable_storage_fee: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch_start_timestamp_ms">epoch_start_timestamp_ms</a>: u64</span>
</dt>
<dd>
 Unix timestamp of the current epoch start
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields">extra_fields</a>: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_sui_system_state_inner_SystemEpochInfoEvent">Struct <span class="code-inline">SystemEpochInfoEvent</span></h2>

Event containing system-level epoch information, emitted during
the epoch advancement transaction.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemEpochInfoEvent">SystemEpochInfoEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch">epoch</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version">protocol_version</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">reference_gas_price: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">total_stake: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">storage_fund_reinvestment: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">storage_charge: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">storage_rebate: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">storage_fund_balance: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake_subsidy_amount: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">total_gas_fees: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">total_stake_rewards_distributed: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">leftover_storage_fund_inflow: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ENotValidator">ENotValidator</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ELimitExceeded">ELimitExceeded</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ENotSystemAddress">ENotSystemAddress</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ECannotReportOneself">ECannotReportOneself</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EReportRecordNotFound">EReportRecordNotFound</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EBpsTooLarge">EBpsTooLarge</a>: u64 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ESafeModeGasNotProcessed">ESafeModeGasNotProcessed</a>: u64 = 7;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EAdvancedToWrongEpoch">EAdvancedToWrongEpoch</a>: u64 = 8;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_BASIS_POINT_DENOMINATOR">BASIS_POINT_DENOMINATOR</a>: u64 = 10000;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ACTIVE_VALIDATOR_ONLY">ACTIVE_VALIDATOR_ONLY</a>: u8 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ACTIVE_OR_PENDING_VALIDATOR">ACTIVE_OR_PENDING_VALIDATOR</a>: u8 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ANY_VALIDATOR">ANY_VALIDATOR</a>: u8 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SYSTEM_STATE_VERSION_V1">SYSTEM_STATE_VERSION_V1</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_KEY">EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_KEY</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_CHUNK_COUNT_KEY">EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_CHUNK_COUNT_KEY</a>: u64 = 1;
</code></pre>


<h2 id="sui_system_sui_system_state_inner_create">Function <span class="code-inline">create</span></h2>

Create a new SuiSystemState object and make it shared.<br/>
This function will be called only once in genesis.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_create">create</a>(<a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_validators">validators</a>: vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, initial_storage_fund: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version">protocol_version</a>: u64, <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch_start_timestamp_ms">epoch_start_timestamp_ms</a>: u64, parameters: <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters">sui_system::sui_system_state_inner::SystemParameters</a>, <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy">stake_subsidy</a>: <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInner">sui_system::sui_system_state_inner::SuiSystemStateInner</a>
</code></pre>




<h2 id="sui_system_sui_system_state_inner_create_system_parameters">Function <span class="code-inline">create_system_parameters</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_create_system_parameters">create_system_parameters</a>(epoch_duration_ms: u64, stake_subsidy_start_epoch: u64, max_validator_count: u64, min_validator_joining_stake: u64, validator_low_stake_threshold: u64, validator_very_low_stake_threshold: u64, validator_low_stake_grace_period: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters">sui_system::sui_system_state_inner::SystemParameters</a>
</code></pre>




<h2 id="sui_system_sui_system_state_inner_v1_to_v2">Function <span class="code-inline">v1_to_v2</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_v1_to_v2">v1_to_v2</a>(self: <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInner">sui_system::sui_system_state_inner::SuiSystemStateInner</a>): <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_add_validator_candidate">Function <span class="code-inline">request_add_validator_candidate</span></h2>

Can be called by anyone who wishes to become a validator candidate and starts accruing delegated
stakes in their staking pool. Once they have at least <span class="code-inline">MIN_VALIDATOR_JOINING_STAKE</span> amount of stake they
can call <span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator">request_add_validator</a></span> to officially become an active validator at the next epoch.<br/>
Aborts if the caller is already a pending or active validator, or a validator candidate.<br/>
Note: <span class="code-inline">proof_of_possession</span> MUST be a valid signature using sui_address and protocol_pubkey_bytes.<br/>
To produce a valid PoP, run [fn test_proof_of_possession].


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator_candidate">request_add_validator_candidate</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, pubkey_bytes: vector&lt;u8&gt;, network_pubkey_bytes: vector&lt;u8&gt;, worker_pubkey_bytes: vector&lt;u8&gt;, proof_of_possession: vector&lt;u8&gt;, name: vector&lt;u8&gt;, description: vector&lt;u8&gt;, image_url: vector&lt;u8&gt;, project_url: vector&lt;u8&gt;, net_address: vector&lt;u8&gt;, p2p_address: vector&lt;u8&gt;, primary_address: vector&lt;u8&gt;, worker_address: vector&lt;u8&gt;, gas_price: u64, commission_rate: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_remove_validator_candidate">Function <span class="code-inline">request_remove_validator_candidate</span></h2>

Called by a validator candidate to remove themselves from the candidacy. After this call
their staking pool becomes deactivate.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_remove_validator_candidate">request_remove_validator_candidate</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_add_validator">Function <span class="code-inline">request_add_validator</span></h2>

Called by a validator candidate to add themselves to the active validator set beginning next epoch.<br/>
Aborts if the validator is a duplicate with one of the pending or active validators, or if the amount of
stake the validator has doesn't meet the min threshold, or if the number of new validators for the next
epoch has already reached the maximum.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator">request_add_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_remove_validator">Function <span class="code-inline">request_remove_validator</span></h2>

A validator can call this function to request a removal in the next epoch.<br/>
We use the sender of <span class="code-inline">ctx</span> to look up the validator
(i.e. sender must match the sui_address in the validator).<br/>
At the end of the epoch, the <span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator">validator</a></span> object will be returned to the sui_address
of the validator.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_remove_validator">request_remove_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_set_gas_price">Function <span class="code-inline">request_set_gas_price</span></h2>

A validator can call this function to submit a new gas price quote, to be
used for the reference gas price calculation at the end of the epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_set_gas_price">request_set_gas_price</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, new_gas_price: u64)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_set_candidate_validator_gas_price">Function <span class="code-inline">set_candidate_validator_gas_price</span></h2>

This function is used to set new gas price for candidate validators


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_set_candidate_validator_gas_price">set_candidate_validator_gas_price</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, new_gas_price: u64)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_set_commission_rate">Function <span class="code-inline">request_set_commission_rate</span></h2>

A validator can call this function to set a new commission rate, updated at the end of
the epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_set_commission_rate">request_set_commission_rate</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, new_commission_rate: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_set_candidate_validator_commission_rate">Function <span class="code-inline">set_candidate_validator_commission_rate</span></h2>

This function is used to set new commission rate for candidate validators


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_set_candidate_validator_commission_rate">set_candidate_validator_commission_rate</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, new_commission_rate: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_add_stake">Function <span class="code-inline">request_add_stake</span></h2>

Add stake to a validator's staking pool.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_stake">request_add_stake</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, stake: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, validator_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_add_stake_mul_coin">Function <span class="code-inline">request_add_stake_mul_coin</span></h2>

Add stake to a validator's staking pool using multiple coins.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_stake_mul_coin">request_add_stake_mul_coin</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, stakes: vector&lt;<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;&gt;, stake_amount: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, validator_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>
</code></pre>




<h2 id="sui_system_sui_system_state_inner_request_withdraw_stake">Function <span class="code-inline">request_withdraw_stake</span></h2>

Withdraw some portion of a stake from a validator's staking pool.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_withdraw_stake">request_withdraw_stake</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_sui_system_state_inner_convert_to_fungible_staked_sui">Function <span class="code-inline">convert_to_fungible_staked_sui</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_convert_to_fungible_staked_sui">convert_to_fungible_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>
</code></pre>




<h2 id="sui_system_sui_system_state_inner_redeem_fungible_staked_sui">Function <span class="code-inline">redeem_fungible_staked_sui</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_redeem_fungible_staked_sui">redeem_fungible_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, fungible_staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_sui_system_state_inner_report_validator">Function <span class="code-inline">report_validator</span></h2>

Report a validator as a bad or non-performant actor in the system.<br/>
Succeeds if all the following are satisfied:
1. both the reporter in <span class="code-inline">cap</span> and the input <span class="code-inline">reportee_addr</span> are active validators.
2. reporter and reportee not the same address.
3. the cap object is still valid.<br/>
This function is idempotent.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_report_validator">report_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, reportee_addr: <b>address</b>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_undo_report_validator">Function <span class="code-inline">undo_report_validator</span></h2>

Undo a <span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_report_validator">report_validator</a></span> action. Aborts if
1. the reportee is not a currently active validator or
2. the sender has not previously reported the <span class="code-inline">reportee_addr</span>, or
3. the cap is not valid


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_undo_report_validator">undo_report_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>, reportee_addr: <b>address</b>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_report_validator_impl">Function <span class="code-inline">report_validator_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_report_validator_impl">report_validator_impl</a>(verified_cap: <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>, reportee_addr: <b>address</b>, validator_report_records: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;&gt;)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_undo_report_validator_impl">Function <span class="code-inline">undo_report_validator_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_undo_report_validator_impl">undo_report_validator_impl</a>(verified_cap: <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>, reportee_addr: <b>address</b>, validator_report_records: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;&gt;)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_rotate_operation_cap">Function <span class="code-inline">rotate_operation_cap</span></h2>

Create a new <span class="code-inline">UnverifiedValidatorOperationCap</span>, transfer it to the
validator and registers it. The original object is thus revoked.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_rotate_operation_cap">rotate_operation_cap</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_update_validator_name">Function <span class="code-inline">update_validator_name</span></h2>

Update a validator's name.

Unlike <span class="code-inline">description</span> and <span class="code-inline">image_url</span>, <span class="code-inline">name</span> is checked against both active
and pending validators and must be unique in the system.

For candidate validators, the name is not checked for duplicates.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_name">update_validator_name</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, name: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_update_validator_description">Function <span class="code-inline">update_validator_description</span></h2>

Update a validator's description.<br/>
Never checked for duplicates.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_description">update_validator_description</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, description: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_update_validator_image_url">Function <span class="code-inline">update_validator_image_url</span></h2>

Update a validator's image url.<br/>
Never checked for duplicates.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_image_url">update_validator_image_url</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, image_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_update_validator_project_url">Function <span class="code-inline">update_validator_project_url</span></h2>

Update a candidate or an active/pending validator's project url.<br/>
Never checked for duplicates.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_project_url">update_validator_project_url</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, project_url: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_update_validator_next_epoch_network_address">Function <span class="code-inline">update_validator_next_epoch_network_address</span></h2>

Update a validator's network address.<br/>
The change will only take effects starting from the next epoch.

Aborts if there's a duplicate network address in the system.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_next_epoch_network_address">update_validator_next_epoch_network_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, network_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_sui_system_state_inner_update_candidate_validator_network_address">Function <span class="code-inline">update_candidate_validator_network_address</span></h2>

Update candidate validator's network address.<br/>
Not checked for duplicates. Uniqueness check is performed in <span class="code-inline"><a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator">request_add_validator</a></span>.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_candidate_validator_network_address">update_candidate_validator_network_address</a>(self: &<b>mut</b> <a href="../sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2">sui_system::sui_system_state_inner::SuiSystemStateInnerV2</a>, network_address: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>






---

*This page has been truncated because it exceeds the maximum character limit. [View the full source](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/sui_system_state_inner.md).*
