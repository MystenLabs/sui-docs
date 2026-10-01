---
title: Module sui::transfer_policy
sidebar_label: transfer_policy
---

Defines the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span> type and the logic to approve <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span>s.

- TransferPolicy - is a highly customizable primitive, which provides an
interface for the type owner to set custom transfer rules for every
deal performed in the <span class="code-inline">Kiosk</span> or a similar system that integrates with TP.

- Once a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a>&lt;T&gt;</span> is created for and shared (or frozen), the
type <span class="code-inline">T</span> becomes tradable in <span class="code-inline">Kiosk</span>s. On every purchase operation, a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span> is created and needs to be confirmed by the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>
hot potato or transaction will fail.

- Type owner (creator) can set any Rules as long as the ecosystem supports
them. All of the Rules need to be resolved within a single transaction (eg
pay royalty and pay fixed commission). Once required actions are performed,
the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span> can be "confirmed" via <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_confirm_request">confirm_request</a></span> call.

- <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span> aims to be the main interface for creators to control trades
of their types and collect profits if a fee is required on sales. Custom
policies can be removed at any moment, and the change will affect all instances
of the type at once.

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/internal#std_internal">std::internal</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/u128#std_u128">std::u128</a>;
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
<b>use</b> <a href="../sui_sui/package#sui_package">sui::package</a>;
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

<h2 id="sui_transfer_policy_TransferRequest">Struct <span class="code-inline">TransferRequest</span></h2>

A "Hot Potato" forcing the buyer to get a transfer permission
from the item type (<span class="code-inline">T</span>) owner on purchase attempt.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a>&lt;<b>phantom</b> T&gt;
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_item">item</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 The ID of the transferred item. Although the <span class="code-inline">T</span> has no
 constraints, the main use case for this module is to work
 with Objects.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_paid">paid</a>: u64</span>
</dt>
<dd>
 Amount of SUI paid for the item. Can be used to
 calculate the fee / transfer policy enforcement.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_from">from</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 The ID of the Kiosk / Safe the object is being sold from.<br/>
 Can be used by the TransferPolicy implementors.
</dd>
<dt>
<span class="code-inline">receipts: <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;</span>
</dt>
<dd>
 Collected Receipts. Used to verify that all of the rules
 were followed and <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span> can be confirmed.
</dd>
</dl>


</details>

<h2 id="sui_transfer_policy_TransferPolicy">Struct <span class="code-inline">TransferPolicy</span></h2>

A unique capability that allows the owner of the <span class="code-inline">T</span> to authorize
transfers. Can only be created with the <span class="code-inline">Publisher</span> object. Although
there's no limitation to how many policies can be created, for most
of the cases there's no need to create more than one since any of the
policies can be used to confirm the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
 The Balance of the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span> which collects <span class="code-inline">SUI</span>.<br/>
 By default, transfer policy does not collect anything , and it's
 a matter of an implementation of a specific rule - whether to add
 to balance and how much.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_rules">rules</a>: <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;</span>
</dt>
<dd>
 Set of types of attached rules - used to verify <span class="code-inline">receipts</span> when
 a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span> is received in <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_confirm_request">confirm_request</a></span> function.<br/>
 Additionally provides a way to look up currently attached Rules.
</dd>
</dl>


</details>

<h2 id="sui_transfer_policy_TransferPolicyCap">Struct <span class="code-inline">TransferPolicyCap</span></h2>

A Capability granting the owner permission to add/remove rules as well
as to <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_withdraw">withdraw</a></span> and <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_destroy_and_withdraw">destroy_and_withdraw</a></span> the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">TransferPolicyCap</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
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
<span class="code-inline">policy_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_transfer_policy_TransferPolicyCreated">Struct <span class="code-inline">TransferPolicyCreated</span></h2>

Event that is emitted when a publisher creates a new <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">TransferPolicyCap</a></span>
making the discoverability and tracking the supported types easier.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCreated">TransferPolicyCreated</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_transfer_policy_TransferPolicyDestroyed">Struct <span class="code-inline">TransferPolicyDestroyed</span></h2>

Event that is emitted when a publisher destroys a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">TransferPolicyCap</a></span>.<br/>
Allows for tracking supported policies.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyDestroyed">TransferPolicyDestroyed</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_transfer_policy_RuleKey">Struct <span class="code-inline">RuleKey</span></h2>

Key to store "Rule" configuration for a specific <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_RuleKey">RuleKey</a>&lt;<b>phantom</b> T: drop&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="@Constants_0">Constants</h2>

The number of receipts does not match the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span> requirement.


<pre><code><b>const</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_EPolicyNotSatisfied">EPolicyNotSatisfied</a>: u64 = 0;
</code></pre>

A completed rule is not set in the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>const</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_EIllegalRule">EIllegalRule</a>: u64 = 1;
</code></pre>

A Rule is not set.


<pre><code><b>const</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_EUnknownRequirement">EUnknownRequirement</a>: u64 = 2;
</code></pre>

Attempting to create a Rule that is already set.


<pre><code><b>const</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_ERuleAlreadySet">ERuleAlreadySet</a>: u64 = 3;
</code></pre>

Trying to <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_withdraw">withdraw</a></span> or <span class="code-inline">close_and_withdraw</span> with a wrong Cap.


<pre><code><b>const</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_ENotOwner">ENotOwner</a>: u64 = 4;
</code></pre>

Trying to <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_withdraw">withdraw</a></span> more than there is.


<pre><code><b>const</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_ENotEnough">ENotEnough</a>: u64 = 5;
</code></pre>


<h2 id="sui_transfer_policy_new_request">Function <span class="code-inline">new_request</span></h2>

Construct a new <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span> hot potato which requires an
approving action from the creator to be destroyed / resolved. Once
created, it must be confirmed in the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_confirm_request">confirm_request</a></span> call otherwise
the transaction will fail.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_new_request">new_request</a>&lt;T&gt;(<a href="../sui_sui/transfer_policy#sui_transfer_policy_item">item</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, <a href="../sui_sui/transfer_policy#sui_transfer_policy_paid">paid</a>: u64, <a href="../sui_sui/transfer_policy#sui_transfer_policy_from">from</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;
</code></pre>




<h2 id="sui_transfer_policy_new">Function <span class="code-inline">new</span></h2>

Register a type in the Kiosk system and receive a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span> and
a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">TransferPolicyCap</a></span> for the type. The <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span> is required to
confirm kiosk deals for the <span class="code-inline">T</span>. If there's no <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>
available for use, the type can not be traded in kiosks.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_new">new</a>&lt;T&gt;(pub: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">sui::transfer_policy::TransferPolicyCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_transfer_policy_default">Function <span class="code-inline">default</span></h2>

Initialize the Transfer Policy in the default scenario: Create and share
the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>, transfer <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">TransferPolicyCap</a></span> to the transaction
sender.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_default">default</a>&lt;T&gt;(pub: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_transfer_policy_withdraw">Function <span class="code-inline">withdraw</span></h2>

Withdraw some amount of profits from the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>. If amount
is not specified, all profits are withdrawn.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_withdraw">withdraw</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">sui::transfer_policy::TransferPolicyCap</a>&lt;T&gt;, amount: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_transfer_policy_destroy_and_withdraw">Function <span class="code-inline">destroy_and_withdraw</span></h2>

Destroy a TransferPolicyCap.<br/>
Can be performed by any party as long as they own it.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_destroy_and_withdraw">destroy_and_withdraw</a>&lt;T&gt;(self: <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, cap: <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">sui::transfer_policy::TransferPolicyCap</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_transfer_policy_confirm_request">Function <span class="code-inline">confirm_request</span></h2>

Allow a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span> for the type <span class="code-inline">T</span>. The call is protected
by the type constraint, as only the publisher of the <span class="code-inline">T</span> can get <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a>&lt;T&gt;</span>.

Note: unless there's a policy for <span class="code-inline">T</span> to allow transfers,.<br/>
Kiosk trades will not be possible.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_confirm_request">confirm_request</a>&lt;T&gt;(self: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, request: <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;): (<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, u64, <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>)
</code></pre>




<h2 id="sui_transfer_policy_add_rule">Function <span class="code-inline">add_rule</span></h2>

Add a custom Rule to the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>. Once set, <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span> must
receive a confirmation of the rule executed so the hot potato can be unpacked.

- T: the type to which TransferPolicy<T> is applied.
- Rule: the witness type for the Custom rule
- Config: a custom configuration for the rule

Config requires <span class="code-inline">drop</span> to allow creators to remove any policy at any moment,
even if graceful unpacking has not been implemented in a "rule module".


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_add_rule">add_rule</a>&lt;T, Rule: drop, Config: drop, store&gt;(_: Rule, policy: &<b>mut</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">sui::transfer_policy::TransferPolicyCap</a>&lt;T&gt;, cfg: Config)
</code></pre>




<h2 id="sui_transfer_policy_get_rule">Function <span class="code-inline">get_rule</span></h2>

Get the custom Config for the Rule (can be only one per "Rule" type).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_get_rule">get_rule</a>&lt;T, Rule: drop, Config: drop, store&gt;(_: Rule, policy: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;): &Config
</code></pre>




<h2 id="sui_transfer_policy_add_to_balance">Function <span class="code-inline">add_to_balance</span></h2>

Add some <span class="code-inline">SUI</span> to the balance of a <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_add_to_balance">add_to_balance</a>&lt;T, Rule: drop&gt;(_: Rule, policy: &<b>mut</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin">coin</a>: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;)
</code></pre>




<h2 id="sui_transfer_policy_add_receipt">Function <span class="code-inline">add_receipt</span></h2>

Adds a <span class="code-inline">Receipt</span> to the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span>, unblocking the request and
confirming that the policy requirements are satisfied.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_add_receipt">add_receipt</a>&lt;T, Rule: drop&gt;(_: Rule, request: &<b>mut</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_transfer_policy_has_rule">Function <span class="code-inline">has_rule</span></h2>

Check whether a custom rule has been added to the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_has_rule">has_rule</a>&lt;T, Rule: drop&gt;(policy: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;): bool
</code></pre>




<h2 id="sui_transfer_policy_remove_rule">Function <span class="code-inline">remove_rule</span></h2>

Remove the Rule from the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_remove_rule">remove_rule</a>&lt;T, Rule: drop, Config: drop, store&gt;(policy: &<b>mut</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">sui::transfer_policy::TransferPolicyCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_transfer_policy_uid">Function <span class="code-inline">uid</span></h2>

Allows reading custom attachments to the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span> if there are any.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_uid">uid</a>&lt;T&gt;(self: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;): &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_transfer_policy_uid_mut_as_owner">Function <span class="code-inline">uid_mut_as_owner</span></h2>

Get a mutable reference to the <span class="code-inline">self.id</span> to enable custom attachments
to the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_uid_mut_as_owner">uid_mut_as_owner</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap">sui::transfer_policy::TransferPolicyCap</a>&lt;T&gt;): &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_transfer_policy_rules">Function <span class="code-inline">rules</span></h2>

Read the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_rules">rules</a></span> field from the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">TransferPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_rules">rules</a>&lt;T&gt;(self: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;): &<a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;
</code></pre>




<h2 id="sui_transfer_policy_item">Function <span class="code-inline">item</span></h2>

Get the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_item">item</a></span> field of the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_item">item</a>&lt;T&gt;(self: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_transfer_policy_paid">Function <span class="code-inline">paid</span></h2>

Get the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_paid">paid</a></span> field of the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_paid">paid</a>&lt;T&gt;(self: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_transfer_policy_from">Function <span class="code-inline">from</span></h2>

Get the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_from">from</a></span> field of the <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">TransferRequest</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy_from">from</a>&lt;T&gt;(self: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>



