---
title: Module sui::coin
sidebar_label: coin
---

Defines the <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">Coin</a></span> type - platform wide representation of fungible
tokens and coins. <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">Coin</a></span> can be described as a secure wrapper around
<span class="code-inline">Balance</span> type.

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

<h2 id="sui_coin_Coin">Struct <span class="code-inline">Coin</span></h2>

A coin of type <span class="code-inline">T</span> worth <span class="code-inline"><a href="../sui_sui/coin#sui_coin_value">value</a></span>. Transferable and storable


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin#sui_coin_Coin">Coin</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
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
</dd>
</dl>


</details>

<h2 id="sui_coin_CoinMetadata">Struct <span class="code-inline">CoinMetadata</span></h2>

Each Coin type T created through <span class="code-inline"><a href="../sui_sui/coin#sui_coin_create_currency">create_currency</a></span> function will have a
unique instance of CoinMetadata<T> that stores the metadata for this coin type.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin#sui_coin_CoinMetadata">CoinMetadata</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
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
<span class="code-inline">decimals: u8</span>
</dt>
<dd>
 Number of decimal places the coin uses.<br/>
 A coin with <span class="code-inline"><a href="../sui_sui/coin#sui_coin_value">value</a> </span> N and <span class="code-inline">decimals</span> D should be shown as N / 10^D.<br/>
 E.g., a coin with <span class="code-inline"><a href="../sui_sui/coin#sui_coin_value">value</a></span> 7002 and decimals 3 should be displayed as 7.002.<br/>
 This is metadata for display usage only.
</dd>
<dt>
<span class="code-inline">name: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 Name for the token
</dd>
<dt>
<span class="code-inline">symbol: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a></span>
</dt>
<dd>
 Symbol for the token
</dd>
<dt>
<span class="code-inline">description: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 Description of the token
</dd>
<dt>
<span class="code-inline">icon_url: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>&gt;</span>
</dt>
<dd>
 URL for the token logo
</dd>
</dl>


</details>

<h2 id="sui_coin_RegulatedCoinMetadata">Struct <span class="code-inline">RegulatedCoinMetadata</span></h2>

Similar to CoinMetadata, but created only for regulated coins that use the DenyList.<br/>
This object is always immutable.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin#sui_coin_RegulatedCoinMetadata">RegulatedCoinMetadata</a>&lt;<b>phantom</b> T&gt; <b>has</b> key
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
<span class="code-inline">coin_metadata_object: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 The ID of the coin's CoinMetadata object.
</dd>
<dt>
<span class="code-inline">deny_cap_object: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 The ID of the coin's DenyCap object.
</dd>
</dl>


</details>

<h2 id="sui_coin_TreasuryCap">Struct <span class="code-inline">TreasuryCap</span></h2>

Capability allowing the bearer to mint and burn
coins of type <span class="code-inline">T</span>. Transferable


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">TreasuryCap</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui/coin#sui_coin_total_supply">total_supply</a>: <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_coin_DenyCapV2">Struct <span class="code-inline">DenyCapV2</span></h2>

Capability allowing the bearer to deny addresses from using the currency's coins--
immediately preventing those addresses from interacting with the coin as an input to a
transaction and at the start of the next preventing them from receiving the coin.<br/>
If <span class="code-inline"><a href="../sui_sui/coin#sui_coin_allow_global_pause">allow_global_pause</a></span> is true, the bearer can enable a global pause that behaves as if
all addresses were added to the deny list.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin#sui_coin_DenyCapV2">DenyCapV2</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui/coin#sui_coin_allow_global_pause">allow_global_pause</a>: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_coin_CurrencyCreated">Struct <span class="code-inline">CurrencyCreated</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin#sui_coin_CurrencyCreated">CurrencyCreated</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">decimals: u8</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_coin_DenyCap">Struct <span class="code-inline">DenyCap</span></h2>

Capability allowing the bearer to freeze addresses, preventing those addresses from
interacting with the coin as an input to a transaction.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin#sui_coin_DenyCap">DenyCap</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

A type passed to create_supply is not a one-time witness.


<pre><code><b>const</b> <a href="../sui_sui/coin#sui_coin_EBadWitness">EBadWitness</a>: u64 = 0;
</code></pre>

Invalid arguments are passed to a function.


<pre><code><b>const</b> <a href="../sui_sui/coin#sui_coin_EInvalidArg">EInvalidArg</a>: u64 = 1;
</code></pre>

Trying to split a coin more times than its balance allows.


<pre><code><b>const</b> <a href="../sui_sui/coin#sui_coin_ENotEnough">ENotEnough</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/coin#sui_coin_EGlobalPauseNotAllowed">EGlobalPauseNotAllowed</a>: u64 = 3;
</code></pre>

The index into the deny list vector for the <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a></span> type.


<pre><code><b>const</b> <a href="../sui_sui/coin#sui_coin_DENY_LIST_COIN_INDEX">DENY_LIST_COIN_INDEX</a>: u64 = 0;
</code></pre>


<h2 id="sui_coin_total_supply">Function <span class="code-inline">total_supply</span></h2>

Return the total number of <span class="code-inline">T</span>'s in circulation.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_total_supply">total_supply</a>&lt;T&gt;(cap: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_coin_treasury_into_supply">Function <span class="code-inline">treasury_into_supply</span></h2>

Unwrap <span class="code-inline"><a href="../sui_sui/coin#sui_coin_TreasuryCap">TreasuryCap</a></span> getting the <span class="code-inline">Supply</span>.

Operation is irreversible. Supply cannot be converted into a <span class="code-inline"><a href="../sui_sui/coin#sui_coin_TreasuryCap">TreasuryCap</a></span> due
to different security guarantees (TreasuryCap can be created only once for a type)


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_treasury_into_supply">treasury_into_supply</a>&lt;T&gt;(treasury: <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;): <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_supply_immut">Function <span class="code-inline">supply_immut</span></h2>

Get immutable reference to the treasury's <span class="code-inline">Supply</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_supply_immut">supply_immut</a>&lt;T&gt;(treasury: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;): &<a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_supply_mut">Function <span class="code-inline">supply_mut</span></h2>

Get mutable reference to the treasury's <span class="code-inline">Supply</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_supply_mut">supply_mut</a>&lt;T&gt;(treasury: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;): &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_value">Function <span class="code-inline">value</span></h2>

Public getter for the coin's value


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_value">value</a>&lt;T&gt;(self: &<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_coin_balance">Function <span class="code-inline">balance</span></h2>

Get immutable reference to the balance of a coin.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/balance#sui_balance">balance</a>&lt;T&gt;(<a href="../sui_sui/coin#sui_coin">coin</a>: &<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;): &<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_balance_mut">Function <span class="code-inline">balance_mut</span></h2>

Get a mutable reference to the balance of a coin.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_balance_mut">balance_mut</a>&lt;T&gt;(<a href="../sui_sui/coin#sui_coin">coin</a>: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;): &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_from_balance">Function <span class="code-inline">from_balance</span></h2>

Wrap a balance into a Coin to make it transferable.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_from_balance">from_balance</a>&lt;T&gt;(<a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_into_balance">Function <span class="code-inline">into_balance</span></h2>

Destruct a Coin wrapper and keep the balance.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_into_balance">into_balance</a>&lt;T&gt;(<a href="../sui_sui/coin#sui_coin">coin</a>: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_take">Function <span class="code-inline">take</span></h2>

Take a <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">Coin</a></span> worth of <span class="code-inline"><a href="../sui_sui/coin#sui_coin_value">value</a></span> from <span class="code-inline">Balance</span>.<br/>
Aborts if <span class="code-inline"><a href="../sui_sui/coin#sui_coin_value">value</a> &gt; <a href="../sui_sui/balance#sui_balance">balance</a>.<a href="../sui_sui/coin#sui_coin_value">value</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_take">take</a>&lt;T&gt;(<a href="../sui_sui/balance#sui_balance">balance</a>: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_value">value</a>: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_put">Function <span class="code-inline">put</span></h2>

Put a <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">Coin</a>&lt;T&gt;</span> to the <span class="code-inline">Balance&lt;T&gt;</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_put">put</a>&lt;T&gt;(<a href="../sui_sui/balance#sui_balance">balance</a>: &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin">coin</a>: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_redeem_funds">Function <span class="code-inline">redeem_funds</span></h2>

Redeem a <span class="code-inline">Withdrawal&lt;Balance&lt;T&gt;&gt;</span> and create a <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">Coin</a>&lt;T&gt;</span> from the withdrawn Balance<T>.<br/>
Aborts if an object withdrawal exceeds the funds currently available to the object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_redeem_funds">redeem_funds</a>&lt;T&gt;(withdrawal: <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_send_funds">Function <span class="code-inline">send_funds</span></h2>

Send a coin to an address balance


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_send_funds">send_funds</a>&lt;T&gt;(<a href="../sui_sui/coin#sui_coin">coin</a>: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, recipient: <b>address</b>)
</code></pre>




<h2 id="sui_coin_join">Function <span class="code-inline">join</span></h2>

Consume the coin <span class="code-inline">c</span> and add its value to <span class="code-inline">self</span>.<br/>
Aborts if <span class="code-inline">c.<a href="../sui_sui/coin#sui_coin_value">value</a> + self.<a href="../sui_sui/coin#sui_coin_value">value</a> &gt; U64_MAX</span>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_join">join</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, c: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_split">Function <span class="code-inline">split</span></h2>

Split coin <span class="code-inline">self</span> to two coins, one with balance <span class="code-inline">split_amount</span>,
and the remaining balance is left is <span class="code-inline">self</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_split">split</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, split_amount: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_divide_into_n">Function <span class="code-inline">divide_into_n</span></h2>

Split coin <span class="code-inline">self</span> into <span class="code-inline">n - 1</span> coins with equal balances. The remainder is left in
<span class="code-inline">self</span>. Return newly created coins.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_divide_into_n">divide_into_n</a>&lt;T&gt;(self: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;, n: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): vector&lt;<a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;&gt;
</code></pre>




<h2 id="sui_coin_zero">Function <span class="code-inline">zero</span></h2>

Make any Coin with a zero value. Useful for placeholding
bids/payments or preemptively making empty balances.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_zero">zero</a>&lt;T&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_destroy_zero">Function <span class="code-inline">destroy_zero</span></h2>

Destroy a coin with value zero


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_destroy_zero">destroy_zero</a>&lt;T&gt;(c: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_create_currency">Function <span class="code-inline">create_currency</span></h2>

Create a new currency type <span class="code-inline">T</span> as and return the <span class="code-inline"><a href="../sui_sui/coin#sui_coin_TreasuryCap">TreasuryCap</a></span> for <span class="code-inline">T</span> to the caller. Can only be called with a <span class="code-inline">one-time-witness</span>
type, ensuring that there's only one <span class="code-inline"><a href="../sui_sui/coin#sui_coin_TreasuryCap">TreasuryCap</a></span> per <span class="code-inline">T</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_create_currency">create_currency</a>&lt;T: drop&gt;(witness: T, decimals: u8, symbol: vector&lt;u8&gt;, name: vector&lt;u8&gt;, description: vector&lt;u8&gt;, icon_url: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_create_regulated_currency_v2">Function <span class="code-inline">create_regulated_currency_v2</span></h2>

This creates a new currency, via <span class="code-inline"><a href="../sui_sui/coin#sui_coin_create_currency">create_currency</a></span>, but with an extra capability that
allows for specific addresses to have their coins frozen. When an address is added to the
deny list, it is immediately unable to interact with the currency's coin as input objects.<br/>
Additionally at the start of the next epoch, they will be unable to receive the currency's
coin.<br/>
The <span class="code-inline"><a href="../sui_sui/coin#sui_coin_allow_global_pause">allow_global_pause</a></span> flag enables an additional API that will cause all addresses to
be denied. Note however, that this doesn't affect per-address entries of the deny list and
will not change the result of the "contains" APIs.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_create_regulated_currency_v2">create_regulated_currency_v2</a>&lt;T: drop&gt;(witness: T, decimals: u8, symbol: vector&lt;u8&gt;, name: vector&lt;u8&gt;, description: vector&lt;u8&gt;, icon_url: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>&gt;, <a href="../sui_sui/coin#sui_coin_allow_global_pause">allow_global_pause</a>: bool, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_migrate_regulated_currency_to_v2">Function <span class="code-inline">migrate_regulated_currency_to_v2</span></h2>

Given the <span class="code-inline"><a href="../sui_sui/coin#sui_coin_DenyCap">DenyCap</a></span> for a regulated currency, migrate it to the new <span class="code-inline"><a href="../sui_sui/coin#sui_coin_DenyCapV2">DenyCapV2</a></span> type.<br/>
All entries in the deny list will be migrated to the new format.<br/>
See <span class="code-inline"><a href="../sui_sui/coin#sui_coin_create_regulated_currency_v2">create_regulated_currency_v2</a></span> for details on the new v2 of the deny list.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_migrate_regulated_currency_to_v2">migrate_regulated_currency_to_v2</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, cap: <a href="../sui_sui/coin#sui_coin_DenyCap">sui::coin::DenyCap</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_allow_global_pause">allow_global_pause</a>: bool, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_mint">Function <span class="code-inline">mint</span></h2>

Create a coin worth <span class="code-inline"><a href="../sui_sui/coin#sui_coin_value">value</a></span> and increase the total supply
in <span class="code-inline">cap</span> accordingly.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_mint">mint</a>&lt;T&gt;(cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_value">value</a>: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_mint_balance">Function <span class="code-inline">mint_balance</span></h2>

Mint some amount of T as a <span class="code-inline">Balance</span> and increase the total
supply in <span class="code-inline">cap</span> accordingly.<br/>
Aborts if <span class="code-inline"><a href="../sui_sui/coin#sui_coin_value">value</a></span> + <span class="code-inline">cap.<a href="../sui_sui/coin#sui_coin_total_supply">total_supply</a></span> >= U64_MAX


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_mint_balance">mint_balance</a>&lt;T&gt;(cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_value">value</a>: u64): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_burn">Function <span class="code-inline">burn</span></h2>

Destroy the coin <span class="code-inline">c</span> and decrease the total supply in <span class="code-inline">cap</span>
accordingly.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_burn">burn</a>&lt;T&gt;(cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, c: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;): u64
</code></pre>




<h2 id="sui_coin_deny_list_v2_add">Function <span class="code-inline">deny_list_v2_add</span></h2>

Adds the given address to the deny list, preventing it from interacting with the specified
coin type as an input to a transaction. Additionally at the start of the next epoch, the
address will be unable to receive objects of this coin type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_add">deny_list_v2_add</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, _deny_cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;, addr: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_deny_list_v2_remove">Function <span class="code-inline">deny_list_v2_remove</span></h2>

Removes an address from the deny list. Similar to <span class="code-inline"><a href="../sui_sui/coin#sui_coin_deny_list_v2_add">deny_list_v2_add</a></span>, the effect for input
objects will be immediate, but the effect for receiving objects will be delayed until the
next epoch.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_remove">deny_list_v2_remove</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, _deny_cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;, addr: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_deny_list_v2_contains_current_epoch">Function <span class="code-inline">deny_list_v2_contains_current_epoch</span></h2>

Check if the deny list contains the given address for the current epoch. Denied addresses
in the current epoch will be unable to receive objects of this coin type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_contains_current_epoch">deny_list_v2_contains_current_epoch</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, addr: <b>address</b>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): bool
</code></pre>




<h2 id="sui_coin_deny_list_v2_contains_next_epoch">Function <span class="code-inline">deny_list_v2_contains_next_epoch</span></h2>

Check if the deny list contains the given address for the next epoch. Denied addresses in
the next epoch will immediately be unable to use objects of this coin type as inputs. At the
start of the next epoch, the address will be unable to receive objects of this coin type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_contains_next_epoch">deny_list_v2_contains_next_epoch</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, addr: <b>address</b>): bool
</code></pre>




<h2 id="sui_coin_deny_list_v2_enable_global_pause">Function <span class="code-inline">deny_list_v2_enable_global_pause</span></h2>

Enable the global pause for the given coin type. This will immediately prevent all addresses
from using objects of this coin type as inputs. At the start of the next epoch, all
addresses will be unable to receive objects of this coin type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_enable_global_pause">deny_list_v2_enable_global_pause</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, deny_cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_deny_list_v2_disable_global_pause">Function <span class="code-inline">deny_list_v2_disable_global_pause</span></h2>

Disable the global pause for the given coin type. This will immediately allow all addresses
to resume using objects of this coin type as inputs. However, receiving objects of this coin
type will still be paused until the start of the next epoch.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_disable_global_pause">deny_list_v2_disable_global_pause</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, deny_cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_deny_list_v2_is_global_pause_enabled_current_epoch">Function <span class="code-inline">deny_list_v2_is_global_pause_enabled_current_epoch</span></h2>

Check if the global pause is enabled for the given coin type in the current epoch.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_is_global_pause_enabled_current_epoch">deny_list_v2_is_global_pause_enabled_current_epoch</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): bool
</code></pre>




<h2 id="sui_coin_deny_list_v2_is_global_pause_enabled_next_epoch">Function <span class="code-inline">deny_list_v2_is_global_pause_enabled_next_epoch</span></h2>

Check if the global pause is enabled for the given coin type in the next epoch.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_v2_is_global_pause_enabled_next_epoch">deny_list_v2_is_global_pause_enabled_next_epoch</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>): bool
</code></pre>




<h2 id="sui_coin_mint_and_transfer">Function <span class="code-inline">mint_and_transfer</span></h2>

Mint <span class="code-inline">amount</span> of <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">Coin</a></span> and send it to <span class="code-inline">recipient</span>. Invokes <span class="code-inline"><a href="../sui_sui/coin#sui_coin_mint">mint</a>()</span>.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_mint_and_transfer">mint_and_transfer</a>&lt;T&gt;(c: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, amount: u64, recipient: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_update_name">Function <span class="code-inline">update_name</span></h2>

Update name of the coin in <span class="code-inline"><a href="../sui_sui/coin#sui_coin_CoinMetadata">CoinMetadata</a></span>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_update_name">update_name</a>&lt;T&gt;(_treasury: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, metadata: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_coin_update_symbol">Function <span class="code-inline">update_symbol</span></h2>

Update the symbol of the coin in <span class="code-inline"><a href="../sui_sui/coin#sui_coin_CoinMetadata">CoinMetadata</a></span>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_update_symbol">update_symbol</a>&lt;T&gt;(_treasury: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, metadata: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, symbol: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>)
</code></pre>




<h2 id="sui_coin_update_description">Function <span class="code-inline">update_description</span></h2>

Update the description of the coin in <span class="code-inline"><a href="../sui_sui/coin#sui_coin_CoinMetadata">CoinMetadata</a></span>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_update_description">update_description</a>&lt;T&gt;(_treasury: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, metadata: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, description: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_coin_update_icon_url">Function <span class="code-inline">update_icon_url</span></h2>

Update the url of the coin in <span class="code-inline"><a href="../sui_sui/coin#sui_coin_CoinMetadata">CoinMetadata</a></span>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_update_icon_url">update_icon_url</a>&lt;T&gt;(_treasury: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, metadata: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, <a href="../sui_sui/url#sui_url">url</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>)
</code></pre>




<h2 id="sui_coin_get_decimals">Function <span class="code-inline">get_decimals</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_get_decimals">get_decimals</a>&lt;T&gt;(metadata: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;): u8
</code></pre>




<h2 id="sui_coin_get_name">Function <span class="code-inline">get_name</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_get_name">get_name</a>&lt;T&gt;(metadata: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_coin_get_symbol">Function <span class="code-inline">get_symbol</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_get_symbol">get_symbol</a>&lt;T&gt;(metadata: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="sui_coin_get_description">Function <span class="code-inline">get_description</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_get_description">get_description</a>&lt;T&gt;(metadata: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_coin_get_icon_url">Function <span class="code-inline">get_icon_url</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_get_icon_url">get_icon_url</a>&lt;T&gt;(metadata: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>&gt;
</code></pre>




<h2 id="sui_coin_destroy_metadata">Function <span class="code-inline">destroy_metadata</span></h2>

Destroy legacy <span class="code-inline"><a href="../sui_sui/coin#sui_coin_CoinMetadata">CoinMetadata</a></span> object


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/coin#sui_coin_destroy_metadata">destroy_metadata</a>&lt;T&gt;(metadata: <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_deny_cap_id">Function <span class="code-inline">deny_cap_id</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_cap_id">deny_cap_id</a>&lt;T&gt;(metadata: &<a href="../sui_sui/coin#sui_coin_RegulatedCoinMetadata">sui::coin::RegulatedCoinMetadata</a>&lt;T&gt;): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_coin_new_deny_cap_v2">Function <span class="code-inline">new_deny_cap_v2</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/coin#sui_coin_new_deny_cap_v2">new_deny_cap_v2</a>&lt;T&gt;(<a href="../sui_sui/coin#sui_coin_allow_global_pause">allow_global_pause</a>: bool, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_new_treasury_cap">Function <span class="code-inline">new_treasury_cap</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/coin#sui_coin_new_treasury_cap">new_treasury_cap</a>&lt;T&gt;(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_allow_global_pause">Function <span class="code-inline">allow_global_pause</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/coin#sui_coin_allow_global_pause">allow_global_pause</a>&lt;T&gt;(cap: &<a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;): bool
</code></pre>




<h2 id="sui_coin_new_coin_metadata">Function <span class="code-inline">new_coin_metadata</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/coin#sui_coin_new_coin_metadata">new_coin_metadata</a>&lt;T&gt;(decimals: u8, name: <a href="../sui_std/string#std_string_String">std::string::String</a>, symbol: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, description: <a href="../sui_std/string#std_string_String">std::string::String</a>, icon_url: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_update_coin_metadata">Function <span class="code-inline">update_coin_metadata</span></h2>

Internal function to refresh the <span class="code-inline"><a href="../sui_sui/coin#sui_coin_CoinMetadata">CoinMetadata</a></span> with new values in
<span class="code-inline">CoinRegistry</span> borrowing.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/coin#sui_coin_update_coin_metadata">update_coin_metadata</a>&lt;T&gt;(metadata: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, name: <a href="../sui_std/string#std_string_String">std::string::String</a>, symbol: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>, description: <a href="../sui_std/string#std_string_String">std::string::String</a>, icon_url: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>)
</code></pre>




<h2 id="sui_coin_supply">Function <span class="code-inline">supply</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_supply">supply</a>&lt;T&gt;(treasury: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;): &<a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_create_regulated_currency">Function <span class="code-inline">create_regulated_currency</span></h2>

This creates a new currency, via <span class="code-inline"><a href="../sui_sui/coin#sui_coin_create_currency">create_currency</a></span>, but with an extra capability that
allows for specific addresses to have their coins frozen. Those addresses cannot interact
with the coin as input objects.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_create_regulated_currency">create_regulated_currency</a>&lt;T: drop&gt;(witness: T, decimals: u8, symbol: vector&lt;u8&gt;, name: vector&lt;u8&gt;, description: vector&lt;u8&gt;, icon_url: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_DenyCap">sui::coin::DenyCap</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_deny_list_add">Function <span class="code-inline">deny_list_add</span></h2>

Adds the given address to the deny list, preventing it
from interacting with the specified coin type as an input to a transaction.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_add">deny_list_add</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, _deny_cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_DenyCap">sui::coin::DenyCap</a>&lt;T&gt;, addr: <b>address</b>, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_deny_list_remove">Function <span class="code-inline">deny_list_remove</span></h2>

Removes an address from the deny list.<br/>
Aborts with <span class="code-inline">ENotFrozen</span> if the address is not already in the list.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_remove">deny_list_remove</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, _deny_cap: &<b>mut</b> <a href="../sui_sui/coin#sui_coin_DenyCap">sui::coin::DenyCap</a>&lt;T&gt;, addr: <b>address</b>, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_deny_list_contains">Function <span class="code-inline">deny_list_contains</span></h2>

Returns true iff the given address is denied for the given coin type. It will
return false if given a non-coin type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin#sui_coin_deny_list_contains">deny_list_contains</a>&lt;T&gt;(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, addr: <b>address</b>): bool
</code></pre>



