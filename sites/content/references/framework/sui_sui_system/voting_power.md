---
title: Module sui_system::voting_power
sidebar_label: voting_power
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
<b>use</b> <a href="../sui_sui_system/validator#sui_system_validator">sui_system::validator</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
</code></pre>

<h2 id="sui_system_voting_power_VotingPowerInfo">Struct <span class="code-inline">VotingPowerInfo</span></h2>

Deprecated. Use VotingPowerInfoV2 instead.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfo">VotingPowerInfo</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">validator_index: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/voting_power#sui_system_voting_power">voting_power</a>: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_voting_power_VotingPowerInfoV2">Struct <span class="code-inline">VotingPowerInfoV2</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2">VotingPowerInfoV2</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">validator_index: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui_system/voting_power#sui_system_voting_power">voting_power</a>: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">stake: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Set total_voting_power as 10_000 by convention. Individual voting powers can be interpreted
as easily understandable basis points (e.g., voting_power: 100 = 1%, voting_power: 1 = 0.01%) rather than
opaque quantities whose meaning changes from epoch to epoch as the total amount staked shifts.<br/>
Fixing the total voting power allows clients to hardcode the quorum threshold and total_voting power rather
than recomputing these.


<pre><code><b>const</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_TOTAL_VOTING_POWER">TOTAL_VOTING_POWER</a>: u64 = 10000;
</code></pre>

Quorum threshold for our fixed voting power--any message signed by this much voting power can be trusted
up to BFT assumptions


<pre><code><b>const</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_QUORUM_THRESHOLD">QUORUM_THRESHOLD</a>: u64 = 6667;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_MAX_VOTING_POWER">MAX_VOTING_POWER</a>: u64 = 1000;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_ETotalPowerMismatch">ETotalPowerMismatch</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_ERelativePowerMismatch">ERelativePowerMismatch</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_EVotingPowerOverThreshold">EVotingPowerOverThreshold</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_EInvalidVotingPower">EInvalidVotingPower</a>: u64 = 4;
</code></pre>


<h2 id="sui_system_voting_power_set_voting_power">Function <span class="code-inline">set_voting_power</span></h2>

Set the voting power of all validators.<br/>
Each validator's voting power is initialized using their stake. We then attempt to cap their voting power
at <span class="code-inline"><a href="../sui_sui_system/voting_power#sui_system_voting_power_MAX_VOTING_POWER">MAX_VOTING_POWER</a></span>. If <span class="code-inline"><a href="../sui_sui_system/voting_power#sui_system_voting_power_MAX_VOTING_POWER">MAX_VOTING_POWER</a></span> is not a feasible cap, we pick the lowest possible cap.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_set_voting_power">set_voting_power</a>(validators: &<b>mut</b> vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, total_stake: u64)
</code></pre>




<h2 id="sui_system_voting_power_init_voting_power_info">Function <span class="code-inline">init_voting_power_info</span></h2>

Create the initial voting power of each validator, set using their stake, but capped using threshold.<br/>
We also perform insertion sort while creating the voting power list, by maintaining the list in
descending order using voting power.<br/>
Anything beyond the threshold is added to the remaining_power, which is also returned.


<pre><code><b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_init_voting_power_info">init_voting_power_info</a>(validators: &vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, threshold: u64, total_stake: u64): (vector&lt;<a href="../sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2">sui_system::voting_power::VotingPowerInfoV2</a>&gt;, u64)
</code></pre>




<h2 id="sui_system_voting_power_derive_raw_voting_power">Function <span class="code-inline">derive_raw_voting_power</span></h2>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_derive_raw_voting_power">derive_raw_voting_power</a>(stake: u64, total_stake: u64): u64
</code></pre>




<h2 id="sui_system_voting_power_insert">Function <span class="code-inline">insert</span></h2>

Insert <span class="code-inline">new_info</span> to <span class="code-inline">info_list</span> as part of insertion sort, such that <span class="code-inline">info_list</span> is always sorted
using stake, in descending order.


<pre><code><b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_insert">insert</a>(info_list: &<b>mut</b> vector&lt;<a href="../sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2">sui_system::voting_power::VotingPowerInfoV2</a>&gt;, new_info: <a href="../sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2">sui_system::voting_power::VotingPowerInfoV2</a>)
</code></pre>




<h2 id="sui_system_voting_power_adjust_voting_power">Function <span class="code-inline">adjust_voting_power</span></h2>

Distribute remaining_power to validators that are not capped at threshold.


<pre><code><b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_adjust_voting_power">adjust_voting_power</a>(info_list: &<b>mut</b> vector&lt;<a href="../sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2">sui_system::voting_power::VotingPowerInfoV2</a>&gt;, threshold: u64, remaining_power: u64)
</code></pre>




<h2 id="sui_system_voting_power_update_voting_power">Function <span class="code-inline">update_voting_power</span></h2>

Update validators with the decided voting power.


<pre><code><b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_update_voting_power">update_voting_power</a>(validators: &<b>mut</b> vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;, info_list: vector&lt;<a href="../sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2">sui_system::voting_power::VotingPowerInfoV2</a>&gt;)
</code></pre>




<h2 id="sui_system_voting_power_check_invariants">Function <span class="code-inline">check_invariants</span></h2>

Check a few invariants that must hold after setting the voting power.


<pre><code><b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_check_invariants">check_invariants</a>(v: &vector&lt;<a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>&gt;)
</code></pre>




<h2 id="sui_system_voting_power_total_voting_power">Function <span class="code-inline">total_voting_power</span></h2>

Return the (constant) total voting power


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_total_voting_power">total_voting_power</a>(): u64
</code></pre>




<h2 id="sui_system_voting_power_quorum_threshold">Function <span class="code-inline">quorum_threshold</span></h2>

Return the (constant) quorum threshold


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/voting_power#sui_system_voting_power_quorum_threshold">quorum_threshold</a>(): u64
</code></pre>



