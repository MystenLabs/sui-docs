---
title: Module sui::token
sidebar_label: token
---

The Token module which implements a Closed Loop Token with a configurable
policy. The policy is defined by a set of rules that must be satisfied for
an action to be performed on the token.

The module is designed to be used with a <span class="code-inline">TreasuryCap</span> to allow for minting
and burning of the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span>s. And can act as a replacement / extension or a
companion to existing open-loop (<span class="code-inline">Coin</span>) systems.

```
Module:      sui::balance       sui::coin             sui::token.<br/>
Main type:   Balance<T>         Coin<T>               Token<T>.<br/>
Capability:  Supply<T>  <---->  TreasuryCap<T> <----> TreasuryCap<T>.<br/>
Abilities:   store              key + store           key
```

The Token system allows for fine-grained control over the actions performed
on the token. And hence it is highly suitable for applications that require
control over the currency which a simple open-loop system can't provide.

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
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>

<h2 id="sui_token_Token">Struct <span class="code-inline">Token</span></h2>

A single <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> with <span class="code-inline">Balance</span> inside. Can only be owned by an address,
and actions performed on it must be confirmed in a matching <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/token#sui_token_Token">Token</a>&lt;<b>phantom</b> T&gt; <b>has</b> <a href="../sui_sui/token#sui_token_key">key</a>
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
<span class="code-inline"><a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;</span>
</dt>
<dd>
 The Balance of the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span>.
</dd>
</dl>


</details>

<h2 id="sui_token_TokenPolicyCap">Struct <span class="code-inline">TokenPolicyCap</span></h2>

A Capability that manages a single <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> specified in the <span class="code-inline"><b>for</b></span>
field. Created together with <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> in the <span class="code-inline">new</span> function.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a>&lt;<b>phantom</b> T&gt; <b>has</b> <a href="../sui_sui/token#sui_token_key">key</a>, store
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
<span class="code-inline"><b>for</b>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_token_TokenPolicy">Struct <span class="code-inline">TokenPolicy</span></h2>

<span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> represents a set of rules that define what actions can be
performed on a <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> and which <span class="code-inline">Rules</span> must be satisfied for the
action to succeed.

- For the sake of availability, <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> is a <span class="code-inline"><a href="../sui_sui/token#sui_token_key">key</a></span>-only object.
- Each <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> is managed by a matching <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span>.
- For an action to become available, there needs to be a record in the
<span class="code-inline"><a href="../sui_sui/token#sui_token_rules">rules</a></span> VecMap. To allow an action to be performed freely, there's an
<span class="code-inline"><a href="../sui_sui/token#sui_token_allow">allow</a></span> function that can be called by the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> owner.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a>&lt;<b>phantom</b> T&gt; <b>has</b> <a href="../sui_sui/token#sui_token_key">key</a>
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
<span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;</span>
</dt>
<dd>
 The balance that is effectively spent by the user on the "spend"
 action. However, actual decrease of the supply can only be done by
 the <span class="code-inline">TreasuryCap</span> owner when <span class="code-inline"><a href="../sui_sui/token#sui_token_flush">flush</a></span> is called.<br/>
 This balance is effectively spent and cannot be accessed by anyone
 but the <span class="code-inline">TreasuryCap</span> owner.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/token#sui_token_rules">rules</a>: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;&gt;</span>
</dt>
<dd>
 The set of rules that define what actions can be performed on the
 token. For each "action" there's a set of Rules that must be
 satisfied for the <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> to be confirmed.
</dd>
</dl>


</details>

<h2 id="sui_token_ActionRequest">Struct <span class="code-inline">ActionRequest</span></h2>

A request to perform an "Action" on a token. Stores the information
about the action to be performed and must be consumed by the <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request">confirm_request</a></span>
or <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request_mut">confirm_request_mut</a></span> functions when the Rules are satisfied.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a>&lt;<b>phantom</b> T&gt;
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">name: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 Name of the Action to look up in the Policy. Name can be one of the
 default actions: <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span>, <span class="code-inline"><a href="../sui_sui/token#sui_token_spend">spend</a></span>, <span class="code-inline"><a href="../sui_sui/token#sui_token_to_coin">to_coin</a></span>, <span class="code-inline"><a href="../sui_sui/token#sui_token_from_coin">from_coin</a></span> or a
 custom action.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/token#sui_token_amount">amount</a>: u64</span>
</dt>
<dd>
 Amount is present in all of the txs
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/token#sui_token_sender">sender</a>: <b>address</b></span>
</dt>
<dd>
 Sender is a permanent field always
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/token#sui_token_recipient">recipient</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;</span>
</dt>
<dd>
 Recipient is only available in <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> action.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;&gt;</span>
</dt>
<dd>
 The balance to be "spent" in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>, only available
 in the <span class="code-inline"><a href="../sui_sui/token#sui_token_spend">spend</a></span> action.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/token#sui_token_approvals">approvals</a>: <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;</span>
</dt>
<dd>
 Collected approvals (stamps) from completed <span class="code-inline">Rules</span>. They're matched
 against <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a>.<a href="../sui_sui/token#sui_token_rules">rules</a></span> to determine if the request can be
 confirmed.
</dd>
</dl>


</details>

<h2 id="sui_token_RuleKey">Struct <span class="code-inline">RuleKey</span></h2>

Dynamic field key for the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> to store the <span class="code-inline">Config</span> for a
specific action <span class="code-inline">Rule</span>. There can be only one configuration per <span class="code-inline">Rule</span> per <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/token#sui_token_RuleKey">RuleKey</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">is_protected: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_token_TokenPolicyCreated">Struct <span class="code-inline">TokenPolicyCreated</span></h2>

An event emitted when a <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> is created and shared. Because
<span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> can only be shared (and potentially frozen in the future),
we emit this event in the <span class="code-inline"><a href="../sui_sui/token#sui_token_share_policy">share_policy</a></span> function and mark it as mutable.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/token#sui_token_TokenPolicyCreated">TokenPolicyCreated</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 ID of the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> that was created.
</dd>
<dt>
<span class="code-inline">is_mutable: bool</span>
</dt>
<dd>
 Whether the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> is "shared" (mutable) or "frozen"
 (immutable) - TBD.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

The action is not allowed (defined) in the policy.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_EUnknownAction">EUnknownAction</a>: u64 = 0;
</code></pre>

The rule was not approved.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_ENotApproved">ENotApproved</a>: u64 = 1;
</code></pre>

Trying to perform an admin action with a wrong cap.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_ENotAuthorized">ENotAuthorized</a>: u64 = 2;
</code></pre>

The balance is too low to perform the action.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_EBalanceTooLow">EBalanceTooLow</a>: u64 = 3;
</code></pre>

The balance is not zero.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_ENotZero">ENotZero</a>: u64 = 4;
</code></pre>

The balance is not zero when trying to confirm with <span class="code-inline">TransferPolicyCap</span>.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_ECantConsumeBalance">ECantConsumeBalance</a>: u64 = 5;
</code></pre>

Rule is trying to access a missing config (with type).


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_ENoConfig">ENoConfig</a>: u64 = 6;
</code></pre>

Using <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request_mut">confirm_request_mut</a></span> without <span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span>. Immutable version
of the function must be used instead.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_EUseImmutableConfirm">EUseImmutableConfirm</a>: u64 = 7;
</code></pre>

A Tag for the <span class="code-inline"><a href="../sui_sui/token#sui_token_spend">spend</a></span> action.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_SPEND">SPEND</a>: vector&lt;u8&gt; = vector[115, 112, 101, 110, 100];
</code></pre>

A Tag for the <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> action.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_TRANSFER">TRANSFER</a>: vector&lt;u8&gt; = vector[116, 114, 97, 110, 115, 102, 101, 114];
</code></pre>

A Tag for the <span class="code-inline"><a href="../sui_sui/token#sui_token_to_coin">to_coin</a></span> action.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_TO_COIN">TO_COIN</a>: vector&lt;u8&gt; = vector[116, 111, 95, 99, 111, 105, 110];
</code></pre>

A Tag for the <span class="code-inline"><a href="../sui_sui/token#sui_token_from_coin">from_coin</a></span> action.


<pre><code><b>const</b> <a href="../sui_sui/token#sui_token_FROM_COIN">FROM_COIN</a>: vector&lt;u8&gt; = vector[102, 114, 111, 109, 95, 99, 111, 105, 110];
</code></pre>


<h2 id="sui_token_new_policy">Function <span class="code-inline">new_policy</span></h2>

Create a new <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> and a matching <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span>.<br/>
The <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> must then be shared using the <span class="code-inline"><a href="../sui_sui/token#sui_token_share_policy">share_policy</a></span> method.

<span class="code-inline">TreasuryCap</span> guarantees full ownership over the currency, and is unique,
hence it is safe to use it for authorization.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_new_policy">new_policy</a>&lt;T&gt;(_treasury_cap: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_token_share_policy">Function <span class="code-inline">share_policy</span></h2>

Share the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>. Due to <span class="code-inline"><a href="../sui_sui/token#sui_token_key">key</a></span>-only restriction, it must be
shared after initialization.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_share_policy">share_policy</a>&lt;T&gt;(policy: <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_token_transfer">Function <span class="code-inline">transfer</span></h2>

Transfer a <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> to a <span class="code-inline"><a href="../sui_sui/token#sui_token_recipient">recipient</a></span>. Creates an <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> for the
"transfer" action. The <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> contains the <span class="code-inline"><a href="../sui_sui/token#sui_token_recipient">recipient</a></span> field
to be used in verification.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer">transfer</a>&lt;T&gt;(t: <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_recipient">recipient</a>: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;
</code></pre>




<h2 id="sui_token_spend">Function <span class="code-inline">spend</span></h2>

Spend a <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> by unwrapping it and storing the <span class="code-inline">Balance</span> in the
<span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> for the "spend" action. The <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> contains
the <span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span> field to be used in verification.

Spend action requires <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request_mut">confirm_request_mut</a></span> to be called to confirm the
request and join the spent balance with the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a>.<a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_spend">spend</a>&lt;T&gt;(t: <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;
</code></pre>




<h2 id="sui_token_to_coin">Function <span class="code-inline">to_coin</span></h2>

Convert <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> into an open <span class="code-inline">Coin</span>. Creates an <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> for the
"to_coin" action.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_to_coin">to_coin</a>&lt;T&gt;(t: <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_token_from_coin">Function <span class="code-inline">from_coin</span></h2>

Convert an open <span class="code-inline">Coin</span> into a <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span>. Creates an <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> for
the "from_coin" action.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_from_coin">from_coin</a>&lt;T&gt;(<a href="../sui_sui/coin#sui_coin">coin</a>: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_token_join">Function <span class="code-inline">join</span></h2>

Join two <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span>s into one, always available.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_join">join</a>&lt;T&gt;(<a href="../sui_sui/token#sui_token">token</a>: &<b>mut</b> <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;, another: <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_token_split">Function <span class="code-inline">split</span></h2>

Split a <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> with <span class="code-inline"><a href="../sui_sui/token#sui_token_amount">amount</a></span>.<br/>
Aborts if the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a>.<a href="../sui_sui/balance#sui_balance">balance</a></span> is lower than <span class="code-inline"><a href="../sui_sui/token#sui_token_amount">amount</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_split">split</a>&lt;T&gt;(<a href="../sui_sui/token#sui_token">token</a>: &<b>mut</b> <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_amount">amount</a>: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;
</code></pre>




<h2 id="sui_token_zero">Function <span class="code-inline">zero</span></h2>

Create a zero <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_zero">zero</a>&lt;T&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;
</code></pre>




<h2 id="sui_token_destroy_zero">Function <span class="code-inline">destroy_zero</span></h2>

Destroy an empty <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span>, fails if the balance is non-zero.<br/>
Aborts if the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a>.<a href="../sui_sui/balance#sui_balance">balance</a></span> is not zero.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_destroy_zero">destroy_zero</a>&lt;T&gt;(<a href="../sui_sui/token#sui_token">token</a>: <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_token_keep">Function <span class="code-inline">keep</span></h2>

Transfer the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> to the transaction sender.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_keep">keep</a>&lt;T&gt;(<a href="../sui_sui/token#sui_token">token</a>: <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_token_new_request">Function <span class="code-inline">new_request</span></h2>

Create a new <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span>.<br/>
Publicly available method to allow for custom actions.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_new_request">new_request</a>&lt;T&gt;(name: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/token#sui_token_amount">amount</a>: u64, <a href="../sui_sui/token#sui_token_recipient">recipient</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;, <a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;
</code></pre>




<h2 id="sui_token_confirm_request">Function <span class="code-inline">confirm_request</span></h2>

Confirm the request against the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> and return the parameters
of the request: (Name, Amount, Sender, Recipient).

Cannot be used for <span class="code-inline"><a href="../sui_sui/token#sui_token_spend">spend</a></span> and similar actions that deliver <span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span>
to the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>. For those actions use <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request_mut">confirm_request_mut</a></span>.

Aborts if:
- the action is not allowed (missing record in <span class="code-inline"><a href="../sui_sui/token#sui_token_rules">rules</a></span>)
- action contains <span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span> (use <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request_mut">confirm_request_mut</a></span>)
- the <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> does not meet the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> rules for the action


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_confirm_request">confirm_request</a>&lt;T&gt;(policy: &<a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, request: <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_std/string#std_string_String">std::string::String</a>, u64, <b>address</b>, <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;)
</code></pre>




<h2 id="sui_token_confirm_request_mut">Function <span class="code-inline">confirm_request_mut</span></h2>

Confirm the request against the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> and return the parameters
of the request: (Name, Amount, Sender, Recipient).

Unlike <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request">confirm_request</a></span> this function requires mutable access to the
<span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> and must be used on <span class="code-inline"><a href="../sui_sui/token#sui_token_spend">spend</a></span> action. After dealing with the
spent balance it calls <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request">confirm_request</a></span> internally.

See <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_request">confirm_request</a></span> for the list of abort conditions.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_confirm_request_mut">confirm_request_mut</a>&lt;T&gt;(policy: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, request: <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_std/string#std_string_String">std::string::String</a>, u64, <b>address</b>, <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;)
</code></pre>




<h2 id="sui_token_confirm_with_policy_cap">Function <span class="code-inline">confirm_with_policy_cap</span></h2>

Confirm an <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> as the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> owner. This function
allows <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> owner to perform Capability-gated actions ignoring
the ruleset specified in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.

Aborts if request contains <span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span> due to inability of the
<span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> to decrease supply. For scenarios like this a <span class="code-inline">TreasuryCap</span> is required (see <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_with_treasury_cap">confirm_with_treasury_cap</a></span>).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_confirm_with_policy_cap">confirm_with_policy_cap</a>&lt;T&gt;(_policy_cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;, request: <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_std/string#std_string_String">std::string::String</a>, u64, <b>address</b>, <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;)
</code></pre>




<h2 id="sui_token_confirm_with_treasury_cap">Function <span class="code-inline">confirm_with_treasury_cap</span></h2>

Confirm an <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> as the <span class="code-inline">TreasuryCap</span> owner. This function
allows <span class="code-inline">TreasuryCap</span> owner to perform Capability-gated actions ignoring
the ruleset specified in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.

Unlike <span class="code-inline"><a href="../sui_sui/token#sui_token_confirm_with_policy_cap">confirm_with_policy_cap</a></span> this function allows <span class="code-inline"><a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span>
to be consumed, decreasing the <span class="code-inline">total_supply</span> of the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_confirm_with_treasury_cap">confirm_with_treasury_cap</a>&lt;T&gt;(treasury_cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, request: <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_std/string#std_string_String">std::string::String</a>, u64, <b>address</b>, <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;)
</code></pre>




<h2 id="sui_token_add_approval">Function <span class="code-inline">add_approval</span></h2>

Add an "approval" to the <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span> by providing a Witness.<br/>
Intended to be used by Rules to add their own approvals, however, can
be used to add arbitrary approvals to the request (not only the ones
required by the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_add_approval">add_approval</a>&lt;T, W: drop&gt;(_t: W, request: &<b>mut</b> <a href="../sui_sui/token#sui_token_ActionRequest">sui::token::ActionRequest</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_token_add_rule_config">Function <span class="code-inline">add_rule_config</span></h2>

Add a <span class="code-inline">Config</span> for a <span class="code-inline">Rule</span> in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>. Rule configuration is
independent from the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a>.<a href="../sui_sui/token#sui_token_rules">rules</a></span> and needs to be managed by the.<br/>
Rule itself. Configuration is stored per <span class="code-inline">Rule</span> and not per <span class="code-inline">Rule</span> per
<span class="code-inline">Action</span> to allow reuse in different actions.

- Rule witness guarantees that the <span class="code-inline">Config</span> is approved by the Rule.
- <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> guarantees that the <span class="code-inline">Config</span> setup is initiated by
the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> owner.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_add_rule_config">add_rule_config</a>&lt;T, Rule: drop, Config: store&gt;(_rule: Rule, self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;, <a href="../sui_sui/config#sui_config">config</a>: Config, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_token_rule_config">Function <span class="code-inline">rule_config</span></h2>

Get a <span class="code-inline">Config</span> for a <span class="code-inline">Rule</span> in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>. Requires <span class="code-inline">Rule</span>
witness, hence can only be read by the <span class="code-inline">Rule</span> itself. This requirement
guarantees safety of the stored <span class="code-inline">Config</span> and allows for simpler dynamic
field management inside the Rule Config (custom type keys are not needed
for access gating).

Aborts if the Config is not present.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_rule_config">rule_config</a>&lt;T, Rule: drop, Config: store&gt;(_rule: Rule, self: &<a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;): &Config
</code></pre>




<h2 id="sui_token_rule_config_mut">Function <span class="code-inline">rule_config_mut</span></h2>

Get mutable access to the <span class="code-inline">Config</span> for a <span class="code-inline">Rule</span> in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.<br/>
Requires <span class="code-inline">Rule</span> witness, hence can only be read by the <span class="code-inline">Rule</span> itself,
as well as <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> to guarantee that the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> owner
is the one who initiated the <span class="code-inline">Config</span> modification.

Aborts if:
- the Config is not present
- <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> is not matching the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_rule_config_mut">rule_config_mut</a>&lt;T, Rule: drop, Config: store&gt;(_rule: Rule, self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;): &<b>mut</b> Config
</code></pre>




<h2 id="sui_token_remove_rule_config">Function <span class="code-inline">remove_rule_config</span></h2>

Remove a <span class="code-inline">Config</span> for a <span class="code-inline">Rule</span> in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.<br/>
Unlike the <span class="code-inline"><a href="../sui_sui/token#sui_token_add_rule_config">add_rule_config</a></span>, this function does not require a <span class="code-inline">Rule</span>
witness, hence can be performed by the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> owner on their own.

Rules need to make sure that the <span class="code-inline">Config</span> is present when performing
verification of the <span class="code-inline"><a href="../sui_sui/token#sui_token_ActionRequest">ActionRequest</a></span>.

Aborts if:
- the Config is not present
- <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> is not matching the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_remove_rule_config">remove_rule_config</a>&lt;T, Rule, Config: store&gt;(self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): Config
</code></pre>




<h2 id="sui_token_has_rule_config">Function <span class="code-inline">has_rule_config</span></h2>

Check if a config for a <span class="code-inline">Rule</span> is set in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> without
checking the type of the <span class="code-inline">Config</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_has_rule_config">has_rule_config</a>&lt;T, Rule&gt;(self: &<a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;): bool
</code></pre>




<h2 id="sui_token_has_rule_config_with_type">Function <span class="code-inline">has_rule_config_with_type</span></h2>

Check if a <span class="code-inline">Config</span> for a <span class="code-inline">Rule</span> is set in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span> and that
it matches the type provided.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_has_rule_config_with_type">has_rule_config_with_type</a>&lt;T, Rule, Config: store&gt;(self: &<a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;): bool
</code></pre>




<h2 id="sui_token_allow">Function <span class="code-inline">allow</span></h2>

Allows an <span class="code-inline"><a href="../sui_sui/token#sui_token_action">action</a></span> to be performed on the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> freely by adding an
empty set of <span class="code-inline">Rules</span> for the <span class="code-inline"><a href="../sui_sui/token#sui_token_action">action</a></span>.

Aborts if the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> is not matching the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_allow">allow</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_action">action</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_token_disallow">Function <span class="code-inline">disallow</span></h2>

Completely disallows an <span class="code-inline"><a href="../sui_sui/token#sui_token_action">action</a></span> on the <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> by removing the record
from the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a>.<a href="../sui_sui/token#sui_token_rules">rules</a></span>.

Aborts if the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> is not matching the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_disallow">disallow</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_action">action</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_token_add_rule_for_action">Function <span class="code-inline">add_rule_for_action</span></h2>

Adds a Rule for an action with <span class="code-inline">name</span> in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.

Aborts if the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> is not matching the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_add_rule_for_action">add_rule_for_action</a>&lt;T, Rule: drop&gt;(self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_action">action</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_token_remove_rule_for_action">Function <span class="code-inline">remove_rule_for_action</span></h2>

Removes a rule for an action with <span class="code-inline">name</span> in the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>. Returns
the config object to be handled by the sender (or a Rule itself).

Aborts if the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicyCap">TokenPolicyCap</a></span> is not matching the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_remove_rule_for_action">remove_rule_for_action</a>&lt;T, Rule: drop&gt;(self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<a href="../sui_sui/token#sui_token_TokenPolicyCap">sui::token::TokenPolicyCap</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_action">action</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_token_mint">Function <span class="code-inline">mint</span></h2>

Mint a <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> with a given <span class="code-inline"><a href="../sui_sui/token#sui_token_amount">amount</a></span> using the <span class="code-inline">TreasuryCap</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_mint">mint</a>&lt;T&gt;(cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token_amount">amount</a>: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;
</code></pre>




<h2 id="sui_token_burn">Function <span class="code-inline">burn</span></h2>

Burn a <span class="code-inline"><a href="../sui_sui/token#sui_token_Token">Token</a></span> using the <span class="code-inline">TreasuryCap</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_burn">burn</a>&lt;T&gt;(cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, <a href="../sui_sui/token#sui_token">token</a>: <a href="../sui_sui/token#sui_token_Token">sui::token::Token</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_token_flush">Function <span class="code-inline">flush</span></h2>

Flush the <span class="code-inline"><a href="../sui_sui/token#sui_token_TokenPolicy">TokenPolicy</a>.<a href="../sui_sui/token#sui_token_spent_balance">spent_balance</a></span> into the <span class="code-inline">TreasuryCap</span>. This
action is only available to the <span class="code-inline">TreasuryCap</span> owner.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/token#sui_token_flush">flush</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/token#sui_token_TokenPolicy">sui::token::TokenPolicy</a>&lt;T&gt;, cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): u64
</code></pre>






---

*This page has been truncated because it exceeds the maximum character limit. [View the full source](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui/token.md).*
