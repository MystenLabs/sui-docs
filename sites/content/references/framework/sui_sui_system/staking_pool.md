---
title: Module sui_system::staking_pool
sidebar_label: staking_pool
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
</code></pre>

<h2 id="sui_system_staking_pool_StakingPool">Struct <span class="code-inline">StakingPool</span></h2>

A staking pool embedded in each validator struct in the system state object.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">StakingPool</a> <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch">activation_epoch</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;</span>
</dt>
<dd>
 The epoch at which this pool became active.<br/>
 The value is <span class="code-inline">None</span> if the pool is pre-active and <span class="code-inline">Some(&lt;epoch_number&gt;)</span> if active or inactive.
</dd>
<dt>
<span class="code-inline">deactivation_epoch: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;</span>
</dt>
<dd>
 The epoch at which this staking pool ceased to be active. <span class="code-inline">None</span> = {pre-active, active}, <span class="code-inline">Some(&lt;epoch_number&gt;)</span> if in-active, and it was de-activated at epoch <span class="code-inline">&lt;epoch_number&gt;</span>.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_sui_balance">sui_balance</a>: u64</span>
</dt>
<dd>
 The total number of SUI tokens in this pool, including the SUI in the rewards_pool, as well as in all the principal
 in the <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">StakedSui</a></span> object, updated at epoch boundaries.
</dd>
<dt>
<span class="code-inline">rewards_pool: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
 The epoch stake rewards will be added here at the end of each epoch.
</dd>
<dt>
<span class="code-inline">pool_token_balance: u64</span>
</dt>
<dd>
 Total number of pool tokens issued by the pool.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_exchange_rates">exchange_rates</a>: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;u64, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>&gt;</span>
</dt>
<dd>
 Exchange rate history of previous epochs. Key is the epoch number.<br/>
 The entries start from the <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch">activation_epoch</a></span> of this pool and contains exchange rates at the beginning of each epoch,
 i.e., right after the rewards for the previous epoch have been deposited into the pool.
</dd>
<dt>
<span class="code-inline">pending_stake: u64</span>
</dt>
<dd>
 Pending stake amount for this epoch, emptied at epoch boundaries.
</dd>
<dt>
<span class="code-inline">pending_total_sui_withdraw: u64</span>
</dt>
<dd>
 Pending stake withdrawn during the current epoch, emptied at epoch boundaries.<br/>
 This includes both the principal and rewards SUI withdrawn.
</dd>
<dt>
<span class="code-inline">pending_pool_token_withdraw: u64</span>
</dt>
<dd>
 Pending pool token withdrawn during the current epoch, emptied at epoch boundaries.
</dd>
<dt>
<span class="code-inline">extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Any extra fields that's not defined statically.
</dd>
</dl>


</details>

<h2 id="sui_system_staking_pool_PoolTokenExchangeRate">Struct <span class="code-inline">PoolTokenExchangeRate</span></h2>

Struct representing the exchange rate of the stake pool token to SUI.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">PoolTokenExchangeRate</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_sui_amount">sui_amount</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pool_token_amount">pool_token_amount</a>: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_staking_pool_StakedSui">Struct <span class="code-inline">StakedSui</span></h2>

A self-custodial object holding the staked SUI tokens.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">StakedSui</a> <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pool_id">pool_id</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 ID of the staking pool we are staking with.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch">stake_activation_epoch</a>: u64</span>
</dt>
<dd>
 The epoch at which the stake becomes active.
</dd>
<dt>
<span class="code-inline">principal: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
 The staked SUI tokens.
</dd>
</dl>


</details>

<h2 id="sui_system_staking_pool_FungibleStakedSui">Struct <span class="code-inline">FungibleStakedSui</span></h2>

An alternative to <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">StakedSui</a></span> that holds the pool token amount instead of the SUI balance.<br/>
StakedSui objects can be converted to FungibleStakedSuis after the initial warmup period.<br/>
The advantage of this is that you can now merge multiple StakedSui objects from different
activation epochs into a single FungibleStakedSui object.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">FungibleStakedSui</a> <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pool_id">pool_id</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 ID of the staking pool we are staking with.
</dd>
<dt>
<span class="code-inline">value: u64</span>
</dt>
<dd>
 The pool token amount.
</dd>
</dl>


</details>

<h2 id="sui_system_staking_pool_FungibleStakedSuiData">Struct <span class="code-inline">FungibleStakedSuiData</span></h2>

Holds useful information


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSuiData">FungibleStakedSuiData</a> <b>has</b> key, store
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
<span class="code-inline">total_supply: u64</span>
</dt>
<dd>
 fungible_staked_sui supply
</dd>
<dt>
<span class="code-inline">principal: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
 principal balance. Rewards are withdrawn from the reward pool
</dd>
</dl>


</details>

<h2 id="sui_system_staking_pool_FungibleStakedSuiDataKey">Struct <span class="code-inline">FungibleStakedSuiDataKey</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSuiDataKey">FungibleStakedSuiDataKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="sui_system_staking_pool_UnderflowSuiBalance">Struct <span class="code-inline">UnderflowSuiBalance</span></h2>

Holds the amount of SUI that was underflowed when withdrawing from the pool
post safe mode. Cleaned up in the same transaction.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_UnderflowSuiBalance">UnderflowSuiBalance</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="@Constants_0">Constants</h2>

StakedSui objects cannot be split to below this amount.


<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_MIN_STAKING_THRESHOLD">MIN_STAKING_THRESHOLD</a>: u64 = 1000000000;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EInsufficientPoolTokenBalance">EInsufficientPoolTokenBalance</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EWrongPool">EWrongPool</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EWithdrawAmountCannotBeZero">EWithdrawAmountCannotBeZero</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EInsufficientSuiTokenBalance">EInsufficientSuiTokenBalance</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EInsufficientRewardsPoolBalance">EInsufficientRewardsPoolBalance</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EDestroyNonzeroBalance">EDestroyNonzeroBalance</a>: u64 = 5;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_ETokenTimeLockIsSome">ETokenTimeLockIsSome</a>: u64 = 6;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EWrongDelegation">EWrongDelegation</a>: u64 = 7;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EPendingDelegationDoesNotExist">EPendingDelegationDoesNotExist</a>: u64 = 8;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_ETokenBalancesDoNotMatchExchangeRate">ETokenBalancesDoNotMatchExchangeRate</a>: u64 = 9;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EDelegationToInactivePool">EDelegationToInactivePool</a>: u64 = 10;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EDeactivationOfInactivePool">EDeactivationOfInactivePool</a>: u64 = 11;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EIncompatibleStakedSui">EIncompatibleStakedSui</a>: u64 = 12;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EWithdrawalInSameEpoch">EWithdrawalInSameEpoch</a>: u64 = 13;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EPoolAlreadyActive">EPoolAlreadyActive</a>: u64 = 14;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EPoolPreactiveOrInactive">EPoolPreactiveOrInactive</a>: u64 = 15;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EActivationOfInactivePool">EActivationOfInactivePool</a>: u64 = 16;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EDelegationOfZeroSui">EDelegationOfZeroSui</a>: u64 = 17;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EStakedSuiBelowThreshold">EStakedSuiBelowThreshold</a>: u64 = 18;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_ECannotMintFungibleStakedSuiYet">ECannotMintFungibleStakedSuiYet</a>: u64 = 19;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_EInvariantFailure">EInvariantFailure</a>: u64 = 20;
</code></pre>


<h2 id="sui_system_staking_pool_new">Function <span class="code-inline">new</span></h2>

Create a new, empty staking pool.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_new">new</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>
</code></pre>




<h2 id="sui_system_staking_pool_request_add_stake">Function <span class="code-inline">request_add_stake</span></h2>

Request to stake to a staking pool. The stake starts counting at the beginning of the next epoch,


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_request_add_stake">request_add_stake</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, stake: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch">stake_activation_epoch</a>: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>
</code></pre>




<h2 id="sui_system_staking_pool_request_withdraw_stake">Function <span class="code-inline">request_withdraw_stake</span></h2>

Request to withdraw the given stake plus rewards from a staking pool.<br/>
Both the principal and corresponding rewards in SUI are withdrawn.<br/>
A proportional amount of pool token withdraw is recorded and processed at epoch change time.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_request_withdraw_stake">request_withdraw_stake</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_staking_pool_redeem_fungible_staked_sui">Function <span class="code-inline">redeem_fungible_staked_sui</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_redeem_fungible_staked_sui">redeem_fungible_staked_sui</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, fungible_staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_staking_pool_calculate_fungible_staked_sui_withdraw_amount">Function <span class="code-inline">calculate_fungible_staked_sui_withdraw_amount</span></h2>

written in separate function so i can test with random values
returns (principal_withdraw_amount, rewards_withdraw_amount)


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_calculate_fungible_staked_sui_withdraw_amount">calculate_fungible_staked_sui_withdraw_amount</a>(latest_exchange_rate: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_fungible_staked_sui_value">fungible_staked_sui_value</a>: u64, fungible_staked_sui_data_principal_amount: u64, fungible_staked_sui_data_total_supply: u64): (u64, u64)
</code></pre>




<h2 id="sui_system_staking_pool_convert_to_fungible_staked_sui">Function <span class="code-inline">convert_to_fungible_staked_sui</span></h2>

Convert the given staked SUI to an FungibleStakedSui object


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_convert_to_fungible_staked_sui">convert_to_fungible_staked_sui</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>
</code></pre>




<h2 id="sui_system_staking_pool_withdraw_from_principal">Function <span class="code-inline">withdraw_from_principal</span></h2>

Withdraw the principal SUI stored in the StakedSui object, and calculate the corresponding amount of pool
tokens using exchange rate at staking epoch.<br/>
Returns values are amount of pool tokens withdrawn and withdrawn principal portion of SUI.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_withdraw_from_principal">withdraw_from_principal</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>): (u64, <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;)
</code></pre>




<h2 id="sui_system_staking_pool_unwrap_staked_sui">Function <span class="code-inline">unwrap_staked_sui</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_unwrap_staked_sui">unwrap_staked_sui</a>(staked_sui: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_staking_pool_deposit_rewards">Function <span class="code-inline">deposit_rewards</span></h2>

Called at epoch advancement times to add rewards (in SUI) to the staking pool.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_deposit_rewards">deposit_rewards</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, rewards: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;)
</code></pre>




<h2 id="sui_system_staking_pool_process_pending_stakes_and_withdraws">Function <span class="code-inline">process_pending_stakes_and_withdraws</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_process_pending_stakes_and_withdraws">process_pending_stakes_and_withdraws</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_staking_pool_process_pending_stake_withdraw">Function <span class="code-inline">process_pending_stake_withdraw</span></h2>

Called at epoch boundaries to process pending stake withdraws requested during the epoch.<br/>
Also called immediately upon withdrawal if the pool is inactive.


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_process_pending_stake_withdraw">process_pending_stake_withdraw</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>)
</code></pre>




<h2 id="sui_system_staking_pool_process_pending_stake">Function <span class="code-inline">process_pending_stake</span></h2>

Called at epoch boundaries to process the pending stake.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_process_pending_stake">process_pending_stake</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>)
</code></pre>




<h2 id="sui_system_staking_pool_withdraw_rewards">Function <span class="code-inline">withdraw_rewards</span></h2>

This function does the following:
    1. Calculates the total amount of SUI (including principal and rewards) that the provided pool tokens represent
       at the current exchange rate.
    2. Using the above number and the given <span class="code-inline">principal_withdraw_amount</span>, calculates the rewards portion of the
       stake we should withdraw.
    3. Withdraws the rewards portion from the rewards pool at the current exchange rate. We only withdraw the rewards
       portion because the principal portion was already taken out of the staker's self custodied StakedSui.


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_withdraw_rewards">withdraw_rewards</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, principal_withdraw_amount: u64, pool_token_withdraw_amount: u64, epoch: u64): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_system_staking_pool_activate_staking_pool">Function <span class="code-inline">activate_staking_pool</span></h2>

Called by <span class="code-inline"><a href="../sui_sui_system/validator#sui_system_validator">validator</a></span> module to activate a staking pool.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_activate_staking_pool">activate_staking_pool</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch">activation_epoch</a>: u64)
</code></pre>




<h2 id="sui_system_staking_pool_deactivate_staking_pool">Function <span class="code-inline">deactivate_staking_pool</span></h2>

Deactivate a staking pool by setting the <span class="code-inline">deactivation_epoch</span>. After
this pool deactivation, the pool stops earning rewards. Only stake
withdraws can be made to the pool.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_deactivate_staking_pool">deactivate_staking_pool</a>(pool: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, deactivation_epoch: u64)
</code></pre>




<h2 id="sui_system_staking_pool_sui_balance">Function <span class="code-inline">sui_balance</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_sui_balance">sui_balance</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_pool_id">Function <span class="code-inline">pool_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pool_id">pool_id</a>(staked_sui: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_system_staking_pool_fungible_staked_sui_pool_id">Function <span class="code-inline">fungible_staked_sui_pool_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_fungible_staked_sui_pool_id">fungible_staked_sui_pool_id</a>(fungible_staked_sui: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_system_staking_pool_staked_sui_amount">Function <span class="code-inline">staked_sui_amount</span></h2>

Returns the principal amount of <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">StakedSui</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_staked_sui_amount">staked_sui_amount</a>(staked_sui: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_stake_activation_epoch">Function <span class="code-inline">stake_activation_epoch</span></h2>

Returns the activation epoch of <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">StakedSui</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch">stake_activation_epoch</a>(staked_sui: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_is_preactive">Function <span class="code-inline">is_preactive</span></h2>

Returns true if the input staking pool is preactive.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_is_preactive">is_preactive</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>): bool
</code></pre>




<h2 id="sui_system_staking_pool_activation_epoch">Function <span class="code-inline">activation_epoch</span></h2>

Returns the activation epoch of the <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">StakingPool</a></span>. For validator candidates,
or pending validators, the value returned is <span class="code-inline">None</span>. For active validators,
the value is the epoch before the validator was activated.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch">activation_epoch</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;
</code></pre>




<h2 id="sui_system_staking_pool_is_inactive">Function <span class="code-inline">is_inactive</span></h2>

Returns true if the input staking pool is inactive.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_is_inactive">is_inactive</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>): bool
</code></pre>




<h2 id="sui_system_staking_pool_fungible_staked_sui_value">Function <span class="code-inline">fungible_staked_sui_value</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_fungible_staked_sui_value">fungible_staked_sui_value</a>(fungible_staked_sui: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_split_fungible_staked_sui">Function <span class="code-inline">split_fungible_staked_sui</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_split_fungible_staked_sui">split_fungible_staked_sui</a>(fungible_staked_sui: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>, split_amount: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>
</code></pre>




<h2 id="sui_system_staking_pool_join_fungible_staked_sui">Function <span class="code-inline">join_fungible_staked_sui</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_join_fungible_staked_sui">join_fungible_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>, other: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui">sui_system::staking_pool::FungibleStakedSui</a>)
</code></pre>




<h2 id="sui_system_staking_pool_split">Function <span class="code-inline">split</span></h2>

Split StakedSui <span class="code-inline">self</span> to two parts, one with principal <span class="code-inline">split_amount</span>,
and the remaining principal is left in <span class="code-inline">self</span>.<br/>
All the other parameters of the StakedSui like <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch">stake_activation_epoch</a></span> or <span class="code-inline"><a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pool_id">pool_id</a></span> remain the same.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_split">split</a>(self: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, split_amount: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>
</code></pre>




<h2 id="sui_system_staking_pool_split_staked_sui">Function <span class="code-inline">split_staked_sui</span></h2>

Split the given StakedSui to the two parts, one with principal <span class="code-inline">split_amount</span>,
transfer the newly split part to the sender address.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_split_staked_sui">split_staked_sui</a>(stake: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, split_amount: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_system_staking_pool_join_staked_sui">Function <span class="code-inline">join_staked_sui</span></h2>

Consume the staked sui <span class="code-inline">other</span> and add its value to <span class="code-inline">self</span>.<br/>
Aborts if some of the staking parameters are incompatible (pool id, stake activation epoch, etc.)


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_join_staked_sui">join_staked_sui</a>(self: &<b>mut</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, other: <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>)
</code></pre>




<h2 id="sui_system_staking_pool_is_equal_staking_metadata">Function <span class="code-inline">is_equal_staking_metadata</span></h2>

Returns true if all the staking parameters of the staked sui except the principal are identical


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_is_equal_staking_metadata">is_equal_staking_metadata</a>(self: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, other: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>): bool
</code></pre>




<h2 id="sui_system_staking_pool_pool_token_exchange_rate_at_epoch">Function <span class="code-inline">pool_token_exchange_rate_at_epoch</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pool_token_exchange_rate_at_epoch">pool_token_exchange_rate_at_epoch</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, epoch: u64): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>
</code></pre>




<h2 id="sui_system_staking_pool_pending_stake_amount">Function <span class="code-inline">pending_stake_amount</span></h2>

Returns the total value of the pending staking requests for this staking pool.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pending_stake_amount">pending_stake_amount</a>(<a href="../sui_sui_system/staking_pool#sui_system_staking_pool">staking_pool</a>: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_pending_stake_withdraw_amount">Function <span class="code-inline">pending_stake_withdraw_amount</span></h2>

Returns the total withdrawal from the staking pool this epoch.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pending_stake_withdraw_amount">pending_stake_withdraw_amount</a>(<a href="../sui_sui_system/staking_pool#sui_system_staking_pool">staking_pool</a>: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_exchange_rates">Function <span class="code-inline">exchange_rates</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_exchange_rates">exchange_rates</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>): &<a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;u64, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>&gt;
</code></pre>




<h2 id="sui_system_staking_pool_sui_amount">Function <span class="code-inline">sui_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_sui_amount">sui_amount</a>(exchange_rate: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_pool_token_amount">Function <span class="code-inline">pool_token_amount</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_pool_token_amount">pool_token_amount</a>(exchange_rate: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>): u64
</code></pre>




<h2 id="sui_system_staking_pool_is_preactive_at_epoch">Function <span class="code-inline">is_preactive_at_epoch</span></h2>

Returns true if the provided staking pool is preactive at the provided epoch.


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_is_preactive_at_epoch">is_preactive_at_epoch</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, epoch: u64): bool
</code></pre>




<h2 id="sui_system_staking_pool_get_sui_amount">Function <span class="code-inline">get_sui_amount</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_get_sui_amount">get_sui_amount</a>(exchange_rate: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>, token_amount: u64): u64
</code></pre>




<h2 id="sui_system_staking_pool_get_token_amount">Function <span class="code-inline">get_token_amount</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_get_token_amount">get_token_amount</a>(exchange_rate: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>, <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_sui_amount">sui_amount</a>: u64): u64
</code></pre>




<h2 id="sui_system_staking_pool_initial_exchange_rate">Function <span class="code-inline">initial_exchange_rate</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_initial_exchange_rate">initial_exchange_rate</a>(): <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate">sui_system::staking_pool::PoolTokenExchangeRate</a>
</code></pre>




<h2 id="sui_system_staking_pool_check_balance_invariants">Function <span class="code-inline">check_balance_invariants</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_check_balance_invariants">check_balance_invariants</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, epoch: u64)
</code></pre>




<h2 id="sui_system_staking_pool_mul_div">Macro function <span class="code-inline">mul_div</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_mul_div">mul_div</a>($a: u64, $b: u64, $c: u64): u64
</code></pre>




<h2 id="sui_system_staking_pool_calculate_rewards">Function <span class="code-inline">calculate_rewards</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool_calculate_rewards">calculate_rewards</a>(pool: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool">sui_system::staking_pool::StakingPool</a>, staked_sui: &<a href="../sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui">sui_system::staking_pool::StakedSui</a>, current_epoch: u64): u64
</code></pre>



