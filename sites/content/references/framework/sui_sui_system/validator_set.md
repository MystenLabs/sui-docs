---
title: Module sui_system::validator_set
sidebar_label: validator_set
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
<b>use</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool">sui_system::staking_pool</a>;
<b>use</b> <a href="../sui_sui_system/validator#sui_system_validator">sui_system::validator</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
<b>use</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper">sui_system::validator_wrapper</a>;
<b>use</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power">sui_system::voting_power</a>;
</code></pre>

<h2 id="sui_system_validator_set_ValidatorSet">Struct <span class="code-inline">ValidatorSet</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">ValidatorSet</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_total_stake">total_stake</a>: u64</span>
</dt>
<dd>
 Total amount of stake from all active validators at the beginning of the epoch.<br/>
 Written only once per epoch, in <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_advance_epoch">advance_epoch</a></span> function.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_active_validators">active_validators</a>: vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;</span>
</dt>
<dd>
 The current list of active validators.
</dd>
<dt>
<span class="code-inline">pending_active_validators: <a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;</span>
</dt>
<dd>
 List of new validator candidates added during the current epoch.<br/>
 They will be processed at the end of the epoch.
</dd>
<dt>
<span class="code-inline">pending_removals: vector&lt;u64&gt;</span>
</dt>
<dd>
 Removal requests from the validators. Each element is an index
 pointing to <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_active_validators">active_validators</a></span>.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_staking_pool_mappings">staking_pool_mappings</a>: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, <b>address</b>&gt;</span>
</dt>
<dd>
 Mappings from staking pool's ID to the sui address of a validator.
</dd>
<dt>
<span class="code-inline">inactive_validators: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>&gt;</span>
</dt>
<dd>
 Mapping from a staking pool ID to the inactive validator that has that pool as its staking pool.<br/>
 When a validator is deactivated the validator is removed from <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_active_validators">active_validators</a></span> it
 is added to this table so that stakers can continue to withdraw their stake from it.
</dd>
<dt>
<span class="code-inline">validator_candidates: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;<b>address</b>, <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>&gt;</span>
</dt>
<dd>
 Table storing preactive/candidate validators, mapping their addresses to their <span class="code-inline">Validator </span> structs.<br/>
 When an address calls <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_request_add_validator_candidate">request_add_validator_candidate</a></span>, they get added to this table and become a preactive
 validator.<br/>
 When the candidate has met the min stake requirement, they can call <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_request_add_validator">request_add_validator</a></span> to
 officially add them to the active validator set <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_active_validators">active_validators</a></span> next epoch.
</dd>
<dt>
<span class="code-inline">at_risk_validators: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, u64&gt;</span>
</dt>
<dd>
 Table storing the number of epochs during which a validator's stake has been below the low stake threshold.
</dd>
<dt>
<span class="code-inline">extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_validator_set_ValidatorEpochInfoEvent">Struct <span class="code-inline">ValidatorEpochInfoEvent</span></h2>

Event containing staking and rewards related information of
each validator, emitted during epoch advancement.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorEpochInfoEvent">ValidatorEpochInfoEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">reference_gas_survey_quote: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">commission_rate: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">pool_staking_reward: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">storage_fund_staking_reward: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">pool_token_exchange_rate: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">tallying_rule_reporters: vector&lt;<b>address</b>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">tallying_rule_global_score: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_set_ValidatorEpochInfoEventV2">Struct <span class="code-inline">ValidatorEpochInfoEventV2</span></h2>

V2 of ValidatorEpochInfoEvent containing more information about the validator.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorEpochInfoEventV2">ValidatorEpochInfoEventV2</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">reference_gas_survey_quote: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/voting_power#sui_system_voting_power">voting_power</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">commission_rate: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">pool_staking_reward: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">storage_fund_staking_reward: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">pool_token_exchange_rate: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">tallying_rule_reporters: vector&lt;<b>address</b>&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">tallying_rule_global_score: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_set_ValidatorJoinEvent">Struct <span class="code-inline">ValidatorJoinEvent</span></h2>

Event emitted every time a new validator joins the committee.<br/>
The epoch value corresponds to the first epoch this change takes place.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorJoinEvent">ValidatorJoinEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">staking_pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_set_ValidatorLeaveEvent">Struct <span class="code-inline">ValidatorLeaveEvent</span></h2>

Event emitted every time a validator leaves the committee.<br/>
The epoch value corresponds to the first epoch this change takes place.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorLeaveEvent">ValidatorLeaveEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">validator_address: <b>address</b></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">staking_pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">is_voluntary: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_set_VotingPowerAdmissionStartEpochKey">Struct <span class="code-inline">VotingPowerAdmissionStartEpochKey</span></h2>

Key for the <span class="code-inline">extra_fields</span> bag to store the start epoch of allowing admission
of new validators based on a minimum voting power rather than a minimum stake.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_VotingPowerAdmissionStartEpochKey">VotingPowerAdmissionStartEpochKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ENonValidatorInReportRecords">ENonValidatorInReportRecords</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EInvalidStakeAdjustmentAmount">EInvalidStakeAdjustmentAmount</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EDuplicateValidator">EDuplicateValidator</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ENoPoolFound">ENoPoolFound</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ENotAValidator">ENotAValidator</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EMinJoiningStakeNotReached">EMinJoiningStakeNotReached</a>: u64 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EAlreadyValidatorCandidate">EAlreadyValidatorCandidate</a>: u64 = 6;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EValidatorNotCandidate">EValidatorNotCandidate</a>: u64 = 7;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ENotValidatorCandidate">ENotValidatorCandidate</a>: u64 = 8;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EStakingBelowThreshold">EStakingBelowThreshold</a>: u64 = 10;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EValidatorAlreadyRemoved">EValidatorAlreadyRemoved</a>: u64 = 11;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ENotAPendingValidator">ENotAPendingValidator</a>: u64 = 12;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EValidatorSetEmpty">EValidatorSetEmpty</a>: u64 = 13;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EInvalidCap">EInvalidCap</a>: u64 = 101;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EInvalidValidatorSelector">EInvalidValidatorSelector</a>: u64 = 14;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_EAlreadyValidator">EAlreadyValidator</a>: u64 = 15;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ACTIVE_VALIDATOR_ONLY">ACTIVE_VALIDATOR_ONLY</a>: u8 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ACTIVE_OR_PENDING_VALIDATOR">ACTIVE_OR_PENDING_VALIDATOR</a>: u8 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ANY_VALIDATOR">ANY_VALIDATOR</a>: u8 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_BASIS_POINT_DENOMINATOR">BASIS_POINT_DENOMINATOR</a>: u64 = 10000;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_MIN_STAKING_THRESHOLD">MIN_STAKING_THRESHOLD</a>: u64 = 1000000000;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_PHASE_LENGTH">PHASE_LENGTH</a>: u64 = 14;
</code></pre>


<h2 id="sui_system_validator_set_new">Function <span class="code-inline">new</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_new">new</a>(init_active_validators: vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>
</code></pre>




<h2 id="sui_system_validator_set_request_add_validator_candidate">Function <span class="code-inline">request_add_validator_candidate</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span> to add a new validator candidate.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_request_add_validator_candidate">request_add_validator_candidate</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_validator_set_request_remove_validator_candidate">Function <span class="code-inline">request_remove_validator_candidate</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span> to remove a validator candidate, and move them to <span class="code-inline">inactive_validators</span>.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_request_remove_validator_candidate">request_remove_validator_candidate</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_validator_set_request_add_validator">Function <span class="code-inline">request_add_validator</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span> to add a new validator to <span class="code-inline">pending_active_validators</span>, which will be
processed at the end of epoch.

Aborts if the validator contains duplicate metadata values with an active or pending validator.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_request_add_validator">request_add_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_validator_set_can_join">Function <span class="code-inline">can_join</span></h2>

Return <span class="code-inline"><b>true</b></span> if a  candidate validator with <span class="code-inline">stake</span> will have sufficeint voting power to join the validator set


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_can_join">can_join</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, stake: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): bool
</code></pre>




<h2 id="sui_system_validator_set_get_voting_power_thresholds">Function <span class="code-inline">get_voting_power_thresholds</span></h2>

return (min, low, very low voting power) thresholds


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_get_voting_power_thresholds">get_voting_power_thresholds</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (u64, u64, u64)
</code></pre>




<h2 id="sui_system_validator_set_assert_no_pending_or_active_duplicates">Function <span class="code-inline">assert_no_pending_or_active_duplicates</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_assert_no_pending_or_active_duplicates">assert_no_pending_or_active_duplicates</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>)
</code></pre>




<h2 id="sui_system_validator_set_request_remove_validator">Function <span class="code-inline">request_remove_validator</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span>, to remove a validator.<br/>
The index of the validator is added to <span class="code-inline">pending_removals</span> and
will be processed at the end of epoch.<br/>
Only an active validator can request to be removed.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_request_remove_validator">request_remove_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_validator_set_request_add_stake">Function <span class="code-inline">request_add_stake</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span>, to add a new stake to the validator.<br/>
This request is added to the validator's staking pool's pending stake entries, processed at the end
of the epoch.<br/>
Aborts in case the staking amount is smaller than MIN_STAKING_THRESHOLD


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_request_add_stake">request_add_stake</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>, stake: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>
</code></pre>




<h2 id="sui_system_validator_set_request_withdraw_stake">Function <span class="code-inline">request_withdraw_stake</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span>, to withdraw some share of a stake from the validator. The share to withdraw
is denoted by <span class="code-inline">principal_withdraw_amount</span>. One of two things occurs in this function:
1. If the <span class="code-inline">staked_sui</span> is staked with an active validator, the request is added to the validator's
   staking pool's pending stake withdraw entries, processed at the end of the epoch.
2. If the <span class="code-inline">staked_sui</span> was staked with a validator that is no longer active,
   the stake and any rewards corresponding to it will be immediately processed.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_request_withdraw_stake">request_withdraw_stake</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_validator_set_convert_to_fungible_staked_sui">Function <span class="code-inline">convert_to_fungible_staked_sui</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_convert_to_fungible_staked_sui">convert_to_fungible_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>
</code></pre>




<h2 id="sui_system_validator_set_redeem_fungible_staked_sui">Function <span class="code-inline">redeem_fungible_staked_sui</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_redeem_fungible_staked_sui">redeem_fungible_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, fungible_staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_validator_set_advance_epoch">Function <span class="code-inline">advance_epoch</span></h2>

Update the validator set at the end of epoch.<br/>
It does the following things:
  1. Distribute stake award.
  2. Process pending stake deposits and withdraws for each validator (<span class="code-inline">adjust_stake</span>).
  3. Process pending stake deposits, and withdraws.
  4. Process pending validator application and withdraws.
  5. At the end, we calculate the total stake for the new epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_advance_epoch">advance_epoch</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, computation_reward: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, storage_fund_reward: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, validator_report_records: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;&gt;, reward_slashing_rate: u64, low_stake_grace_period: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_validator_set_update_validator_positions_and_calculate_total_stake">Function <span class="code-inline">update_validator_positions_and_calculate_total_stake</span></h2>

This function does the following:
- removes validators from <span class="code-inline">at_risk</span> group if their voting power is above the LOW threshold
- increments the number of epochs a validator has been below the LOW threshold but above the.<br/>
    VERY LOW threshold
- removes validators from the active set if they have been below the LOW threshold for more than
    <span class="code-inline">low_stake_grace_period</span> epochs
- removes validators from the active set immediately if they are below the VERY LOW threshold
- activates pending validators if they have sufficient voting power


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_update_validator_positions_and_calculate_total_stake">update_validator_positions_and_calculate_total_stake</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, low_stake_grace_period: u64, validator_report_records: &<b>mut</b> <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): u64
</code></pre>




<h2 id="sui_system_validator_set_derive_reference_gas_price">Function <span class="code-inline">derive_reference_gas_price</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></span> to derive reference gas price for the new epoch.<br/>
Derive the reference gas price based on the gas price quote submitted by each validator.<br/>
The returned gas price should be greater than or equal to 2/3 of the validators submitted
gas price, weighted by stake.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_derive_reference_gas_price">derive_reference_gas_price</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>): u64
</code></pre>




<h2 id="sui_system_validator_set_total_stake">Function <span class="code-inline">total_stake</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_total_stake">total_stake</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>): u64
</code></pre>




<h2 id="sui_system_validator_set_validator_total_stake_amount">Function <span class="code-inline">validator_total_stake_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_validator_total_stake_amount">validator_total_stake_amount</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>): u64
</code></pre>




<h2 id="sui_system_validator_set_validator_stake_amount">Function <span class="code-inline">validator_stake_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_validator_stake_amount">validator_stake_amount</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>): u64
</code></pre>




<h2 id="sui_system_validator_set_validator_voting_power">Function <span class="code-inline">validator_voting_power</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_validator_voting_power">validator_voting_power</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>): u64
</code></pre>




<h2 id="sui_system_validator_set_validator_staking_pool_id">Function <span class="code-inline">validator_staking_pool_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_validator_staking_pool_id">validator_staking_pool_id</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_system_validator_set_staking_pool_mappings">Function <span class="code-inline">staking_pool_mappings</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_staking_pool_mappings">staking_pool_mappings</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>): &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, <b>address</b>&gt;
</code></pre>




<h2 id="sui_system_validator_set_validator_address_by_pool_id">Function <span class="code-inline">validator_address_by_pool_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_validator_address_by_pool_id">validator_address_by_pool_id</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, pool_id: &<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): <b>address</b>
</code></pre>




<h2 id="sui_system_validator_set_pool_exchange_rates">Function <span class="code-inline">pool_exchange_rates</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_pool_exchange_rates">pool_exchange_rates</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;u64, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>&gt;
</code></pre>




<h2 id="sui_system_validator_set_validator_by_pool_id">Function <span class="code-inline">validator_by_pool_id</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_validator_by_pool_id">validator_by_pool_id</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, pool_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_next_epoch_validator_count">Function <span class="code-inline">next_epoch_validator_count</span></h2>

Get the total number of validators in the next epoch.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_next_epoch_validator_count">next_epoch_validator_count</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>): u64
</code></pre>




<h2 id="sui_system_validator_set_is_active_validator_by_sui_address">Function <span class="code-inline">is_active_validator_by_sui_address</span></h2>

Returns true iff the address exists in active validators.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_is_active_validator_by_sui_address">is_active_validator_by_sui_address</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>): bool
</code></pre>




<h2 id="sui_system_validator_set_is_duplicate_with_active_validator">Function <span class="code-inline">is_duplicate_with_active_validator</span></h2>

Checks whether <span class="code-inline">new_validator</span> is duplicate with any currently active validators.<br/>
It differs from <span class="code-inline"><a href="../sui_sui_system/validator_set#sui_system_validator_set_is_active_validator_by_sui_address">is_active_validator_by_sui_address</a></span> in that the former checks
only the sui address but this function looks at more metadata.


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_is_duplicate_with_active_validator">is_duplicate_with_active_validator</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, search: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): bool
</code></pre>




<h2 id="sui_system_validator_set_is_duplicate_with_pending_validator">Function <span class="code-inline">is_duplicate_with_pending_validator</span></h2>

Checks whether <span class="code-inline">new_validator</span> is duplicate with any currently pending validators.


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_is_duplicate_with_pending_validator">is_duplicate_with_pending_validator</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, search: &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>): bool
</code></pre>




<h2 id="sui_system_validator_set_get_candidate_or_active_validator_mut">Function <span class="code-inline">get_candidate_or_active_validator_mut</span></h2>

Get mutable reference to either a candidate or an active validator by address.


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_get_candidate_or_active_validator_mut">get_candidate_or_active_validator_mut</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>): &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_find_validator">Function <span class="code-inline">find_validator</span></h2>

Find validator by <span class="code-inline">validator_address</span>, in <span class="code-inline">validators</span>.<br/>
Returns (true, index) if the validator is found, and the index is its index in the list.<br/>
If not found, returns (false, 0).


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_find_validator">find_validator</a>(validators: &vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, validator_address: <b>address</b>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;
</code></pre>




<h2 id="sui_system_validator_set_find_validator_from_table_vec">Function <span class="code-inline">find_validator_from_table_vec</span></h2>

Find validator by <span class="code-inline">validator_address</span>, in <span class="code-inline">validators</span>.<br/>
Returns (true, index) if the validator is found, and the index is its index in the list.<br/>
If not found, returns (false, 0).


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_find_validator_from_table_vec">find_validator_from_table_vec</a>(validators: &<a href="../sui_sui/table_vec#sui_table_vec_TableVec">sui::table_vec::TableVec</a>&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, validator_address: <b>address</b>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;
</code></pre>




<h2 id="sui_system_validator_set_get_validator_indices">Function <span class="code-inline">get_validator_indices</span></h2>

Given a vector of validator addresses, return their indices in the validator set.<br/>
Aborts if any address isn't in the given validator set.


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_get_validator_indices">get_validator_indices</a>(validators: &vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, validator_addresses: &vector&lt;<b>address</b>&gt;): vector&lt;u64&gt;
</code></pre>




<h2 id="sui_system_validator_set_any_validator">Function <span class="code-inline">any_validator</span></h2>

Get reference to validator in any state: active, pending, or candidate.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_any_validator">any_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_any_validator_mut">Function <span class="code-inline">any_validator_mut</span></h2>

Get mutable reference to validator in any state: active, pending, or candidate.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_any_validator_mut">any_validator_mut</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_active_validator">Function <span class="code-inline">active_validator</span></h2>

Get reference to an active validator by address.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_active_validator">active_validator</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_active_validator_mut">Function <span class="code-inline">active_validator_mut</span></h2>

Get mutable reference to an active validator by address.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_active_validator_mut">active_validator_mut</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_pending_validator">Function <span class="code-inline">pending_validator</span></h2>

Get reference to a pending validator by address.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_pending_validator">pending_validator</a>(self: &<a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_pending_validator_mut">Function <span class="code-inline">pending_validator_mut</span></h2>

Get mutable reference to a pending validator by address.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_pending_validator_mut">pending_validator_mut</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_candidate_validator">Function <span class="code-inline">candidate_validator</span></h2>

Get mutable reference to a candidate validator by address.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_candidate_validator">candidate_validator</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_candidate_validator_mut">Function <span class="code-inline">candidate_validator_mut</span></h2>

Get mutable reference to a candidate validator by address.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_candidate_validator_mut">candidate_validator_mut</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <b>address</b>): &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_get_validator_ref">Function <span class="code-inline">get_validator_ref</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_get_validator_ref">get_validator_ref</a>(validators: &vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, validator_address: <b>address</b>): &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>




<h2 id="sui_system_validator_set_get_active_or_pending_or_candidate_validator_ref">Function <span class="code-inline">get_active_or_pending_or_candidate_validator_ref</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_get_active_or_pending_or_candidate_validator_ref">get_active_or_pending_or_candidate_validator_ref</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet">sui_system::validator_set::ValidatorSet</a>, validator_address: <b>address</b>, which_validator: u8): &<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>






---

*This page has been truncated because it exceeds the maximum character limit. [View the full source](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/validator_set.md).*
