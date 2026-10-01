---
title: Module sui::coin_registry
sidebar_label: coin_registry
---

Defines the system object for managing coin data in a central
registry. This module provides a centralized way to store and manage
metadata for all currencies in the Sui ecosystem, including their
supply information, regulatory status, and metadata capabilities.

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
<b>use</b> <a href="../sui_sui/derived_object#sui_derived_object">sui::derived_object</a>;
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

<h2 id="sui_coin_registry_CoinRegistry">Struct <span class="code-inline">CoinRegistry</span></h2>

System object found at address <span class="code-inline">0xc</span> that stores coin data for all
registered coin types. This is a shared object that acts as a central
registry for coin metadata, supply information, and regulatory status.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CoinRegistry">CoinRegistry</a> <b>has</b> key
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

<h2 id="sui_coin_registry_ExtraField">Struct <span class="code-inline">ExtraField</span></h2>

Store only object that enables more flexible coin data
registration, allowing for additional fields to be added
without changing the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> structure.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_ExtraField">ExtraField</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: <a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">1: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_coin_registry_CurrencyKey">Struct <span class="code-inline">CurrencyKey</span></h2>

Key used to derive addresses when creating <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a>&lt;T&gt;</span> objects.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyKey">CurrencyKey</a>&lt;<b>phantom</b> T&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="sui_coin_registry_LegacyMetadataKey">Struct <span class="code-inline">LegacyMetadataKey</span></h2>

Key used to store the legacy <span class="code-inline">CoinMetadata</span> for a <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_LegacyMetadataKey">LegacyMetadataKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="sui_coin_registry_MetadataCap">Struct <span class="code-inline">MetadataCap</span></h2>

Capability object that gates metadata (name, description, icon_url, symbol)
changes in the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>. It can only be created (or claimed) once, and can
be deleted to prevent changes to the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> metadata.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a>&lt;<b>phantom</b> T&gt; <b>has</b> key, store
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

<h2 id="sui_coin_registry_Borrow">Struct <span class="code-inline">Borrow</span></h2>

Potato callback for the legacy <span class="code-inline">CoinMetadata</span> borrowing.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Borrow">Borrow</a>&lt;<b>phantom</b> T&gt;
</code></pre>




<h2 id="sui_coin_registry_Currency">Struct <span class="code-inline">Currency</span></h2>

Currency stores metadata such as name, symbol, decimals, icon_url and description,
as well as supply states (optional) and regulatory status.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a>&lt;<b>phantom</b> T&gt; <b>has</b> key
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
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_decimals">decimals</a>: u8</span>
</dt>
<dd>
 Number of decimal places the coin uses for display purposes.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 Human-readable name for the coin.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_symbol">symbol</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 Short symbol/ticker for the coin.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_description">description</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 Detailed description of the coin.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_icon_url">icon_url</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 URL for the coin's icon/logo.
</dd>
<dt>
<span class="code-inline">supply: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/coin_registry#sui_coin_registry_SupplyState">sui::coin_registry::SupplyState</a>&lt;T&gt;&gt;</span>
</dt>
<dd>
 Current supply state of the coin (fixed supply or unknown).<br/>
 Note: We're using <span class="code-inline">Option</span> because <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_SupplyState">SupplyState</a></span> does not have drop,
 meaning we cannot swap out its value at a later state.
</dd>
<dt>
<span class="code-inline">regulated: <a href="../sui_sui/coin_registry#sui_coin_registry_RegulatedState">sui::coin_registry::RegulatedState</a></span>
</dt>
<dd>
 Regulatory status of the coin (regulated with deny cap or unknown)
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_treasury_cap_id">treasury_cap_id</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>&gt;</span>
</dt>
<dd>
 ID of the treasury cap for this coin type, if registered.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_metadata_cap_id">metadata_cap_id</a>: <a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCapState">sui::coin_registry::MetadataCapState</a></span>
</dt>
<dd>
 ID of the metadata capability for this coin type, if claimed.
</dd>
<dt>
<span class="code-inline">extra_fields: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_ExtraField">sui::coin_registry::ExtraField</a>&gt;</span>
</dt>
<dd>
 Additional fields for extensibility.
</dd>
</dl>


</details>

<h2 id="sui_coin_registry_CurrencyInitializer">Struct <span class="code-inline">CurrencyInitializer</span></h2>

Hot potato wrapper to enforce registration after "new_currency" data creation.<br/>
Destroyed in the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_finalize">finalize</a></span> call and either transferred to the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_CoinRegistry">CoinRegistry</a></span>
(in case of an OTW registration) or shared directly (for dynamically created
currencies).


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">CurrencyInitializer</a>&lt;<b>phantom</b> T&gt;
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">currency: <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">is_otw: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_coin_registry_SupplyState">Enum <span class="code-inline">SupplyState</span></h2>

Supply state marks the type of Currency Supply, which can be
- Fixed: no minting or burning;
- BurnOnly: no minting, burning is allowed;
- Unknown: flexible (supply is controlled by its <span class="code-inline">TreasuryCap</span>);


<pre><code><b>public</b> <b>enum</b> <a href="../sui_sui/coin_registry#sui_coin_registry_SupplyState">SupplyState</a>&lt;<b>phantom</b> T&gt; <b>has</b> store
</code></pre>


<details>
<summary>Variants</summary>


<dl>
<dt>
Variant <span class="code-inline">Fixed</span>
</dt>
<dd>
 Coin has a fixed supply with the given Supply object.
</dd>

<dl>
<dt>
<span class="code-inline">0: <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;</span>
</dt>
<dd>
</dd>
</dl>

<dt>
Variant <span class="code-inline">BurnOnly</span>
</dt>
<dd>
 Coin has a supply that can ONLY decrease.
</dd>

<dl>
<dt>
<span class="code-inline">0: <a href="../sui_sui/balance#sui_balance_Supply">sui::balance::Supply</a>&lt;T&gt;</span>
</dt>
<dd>
</dd>
</dl>

<dt>
Variant <span class="code-inline">Unknown</span>
</dt>
<dd>
 Supply information is not yet known or registered.
</dd>
</dl>


</details>

<h2 id="sui_coin_registry_RegulatedState">Enum <span class="code-inline">RegulatedState</span></h2>

Regulated state of a coin type.
- Regulated: <span class="code-inline">DenyCap</span> exists or a <span class="code-inline">RegulatedCoinMetadata</span> used to mark currency as regulated;
- Unregulated: the currency was created without deny list;
- Unknown: the regulatory status is unknown.


<pre><code><b>public</b> <b>enum</b> <a href="../sui_sui/coin_registry#sui_coin_registry_RegulatedState">RegulatedState</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Variants</summary>


<dl>
<dt>
Variant <span class="code-inline">Regulated</span>
</dt>
<dd>
 Coin is regulated with a deny cap for address restrictions.
 <span class="code-inline">allow_global_pause</span> is <span class="code-inline">None</span> if the information is unknown (has not been migrated from <span class="code-inline">DenyCapV2</span>).
</dd>

<dl>
<dt>
<span class="code-inline">cap: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


<dl>
<dt>
<span class="code-inline">allow_global_pause: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;bool&gt;</span>
</dt>
<dd>
</dd>
</dl>


<dl>
<dt>
<span class="code-inline">variant: u8</span>
</dt>
<dd>
</dd>
</dl>

<dt>
Variant <span class="code-inline">Unregulated</span>
</dt>
<dd>
 The coin has been created without deny list.
</dd>
<dt>
Variant <span class="code-inline">Unknown</span>
</dt>
<dd>
 Regulatory status is unknown.<br/>
 Result of a legacy migration for that coin (from <span class="code-inline"><a href="../sui_sui/coin#sui_coin">coin</a>.<b>move</b></span> constructors)
</dd>
</dl>


</details>

<h2 id="sui_coin_registry_MetadataCapState">Enum <span class="code-inline">MetadataCapState</span></h2>

State of the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> for a single <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>enum</b> <a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCapState">MetadataCapState</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Variants</summary>


<dl>
<dt>
Variant <span class="code-inline">Claimed</span>
</dt>
<dd>
 The metadata cap has been claimed.
</dd>

<dl>
<dt>
<span class="code-inline">0: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>

<dt>
Variant <span class="code-inline">Unclaimed</span>
</dt>
<dd>
 The metadata cap has not been claimed.
</dd>
<dt>
Variant <span class="code-inline">Deleted</span>
</dt>
<dd>
 The metadata cap has been claimed and then deleted.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Metadata cap already claimed


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EMetadataCapAlreadyClaimed">EMetadataCapAlreadyClaimed</a>: vector&lt;u8&gt; = b"Metadata cap already claimed";
</code></pre>

Only the system address can create the registry


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_ENotSystemAddress">ENotSystemAddress</a>: vector&lt;u8&gt; = b"Only the system can <a href="../sui_sui/coin_registry#sui_coin_registry_create">create</a> the registry.";
</code></pre>

Currency for this coin type already exists


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_ECurrencyAlreadyExists">ECurrencyAlreadyExists</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a> <b>for</b> this <a href="../sui_sui/coin#sui_coin">coin</a> type already <a href="../sui_sui/coin_registry#sui_coin_registry_exists">exists</a>.";
</code></pre>

Attempt to set the deny list state permissionlessly while it has already been set.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EDenyListStateAlreadySet">EDenyListStateAlreadySet</a>: vector&lt;u8&gt; = b"Cannot set the deny list state <b>as</b> it <b>has</b> already been set.";
</code></pre>

Attempt to update <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> with legacy metadata after the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> has
been claimed. Updates are only allowed if the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> has not yet been
claimed or deleted.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_ECannotUpdateManagedMetadata">ECannotUpdateManagedMetadata</a>: vector&lt;u8&gt; = b"Cannot update metadata whose <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> <b>has</b> already been claimed";
</code></pre>

Attempt to set the symbol to a non-ASCII printable character


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EInvalidSymbol">EInvalidSymbol</a>: vector&lt;u8&gt; = b"Symbol <b>has</b> to be ASCII printable";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EDenyCapAlreadyCreated">EDenyCapAlreadyCreated</a>: vector&lt;u8&gt; = b"Cannot claim the deny cap twice";
</code></pre>

Attempt to migrate legacy metadata for a <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> that already exists.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_ECurrencyAlreadyRegistered">ECurrencyAlreadyRegistered</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a> already registered";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EEmptySupply">EEmptySupply</a>: vector&lt;u8&gt; = b"Supply cannot be empty";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_ESupplyNotBurnOnly">ESupplyNotBurnOnly</a>: vector&lt;u8&gt; = b"Cannot <a href="../sui_sui/coin_registry#sui_coin_registry_burn">burn</a> on a non <a href="../sui_sui/coin_registry#sui_coin_registry_burn">burn</a>-only supply";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EInvariantViolation">EInvariantViolation</a>: vector&lt;u8&gt; = b"Code <b>invariant</b> violation";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EDeletionNotSupported">EDeletionNotSupported</a>: vector&lt;u8&gt; = b"Deleting legacy metadata is not supported";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_ENotOneTimeWitness">ENotOneTimeWitness</a>: vector&lt;u8&gt; = b"Type is expected to be OTW";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EBorrowLegacyMetadata">EBorrowLegacyMetadata</a>: vector&lt;u8&gt; = b"Cannot <a href="../sui_sui/borrow#sui_borrow">borrow</a> legacy metadata <b>for</b> migrated currency";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_EDuplicateBorrow">EDuplicateBorrow</a>: vector&lt;u8&gt; = b"Attempt to <b>return</b> duplicate borrowed CoinMetadata";
</code></pre>

Incremental identifier for regulated coin versions in the deny list.<br/>
We start from <span class="code-inline">0</span> in the new system, which aligns with the state of <span class="code-inline">DenyCapV2</span>.


<pre><code><b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_REGULATED_COIN_VERSION">REGULATED_COIN_VERSION</a>: u8 = 0;
</code></pre>

Marker used in metadata to indicate that the currency is not migrated.


<pre><code><b>const</b> <a href="../sui_sui/coin_registry#sui_coin_registry_NEW_CURRENCY_MARKER">NEW_CURRENCY_MARKER</a>: vector&lt;u8&gt; = vector[105, 115, 95, 110, 101, 119, 95, 99, 117, 114, 114, 101, 110, 99, 121];
</code></pre>


<h2 id="sui_coin_registry_new_currency">Function <span class="code-inline">new_currency</span></h2>

Creates a new currency.

Note: This constructor has no long term difference from <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_new_currency_with_otw">new_currency_with_otw</a></span>.<br/>
This can be called from the module that defines <span class="code-inline">T</span> any time after it has been published.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_new_currency">new_currency</a>&lt;T: key&gt;(registry: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CoinRegistry">sui::coin_registry::CoinRegistry</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_decimals">decimals</a>: u8, <a href="../sui_sui/coin_registry#sui_coin_registry_symbol">symbol</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_description">description</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_icon_url">icon_url</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">sui::coin_registry::CurrencyInitializer</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_new_currency_with_otw">Function <span class="code-inline">new_currency_with_otw</span></h2>

Creates a new currency with using an OTW as proof of uniqueness.

This is a two-step operation:
1. <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> is constructed in the <span class="code-inline">init</span> function and sent to the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_CoinRegistry">CoinRegistry</a></span>;
2. <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> is promoted to a shared object in the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_finalize_registration">finalize_registration</a></span> call;


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_new_currency_with_otw">new_currency_with_otw</a>&lt;T: drop&gt;(otw: T, <a href="../sui_sui/coin_registry#sui_coin_registry_decimals">decimals</a>: u8, <a href="../sui_sui/coin_registry#sui_coin_registry_symbol">symbol</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_description">description</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/coin_registry#sui_coin_registry_icon_url">icon_url</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">sui::coin_registry::CurrencyInitializer</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_claim_metadata_cap">Function <span class="code-inline">claim_metadata_cap</span></h2>

Claim a <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> for a coin type.<br/>
Only allowed from the owner of <span class="code-inline">TreasuryCap</span>, and only once.

Aborts if the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> has already been claimed.<br/>
Deleted <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> cannot be reclaimed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_claim_metadata_cap">claim_metadata_cap</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, _: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">sui::coin_registry::MetadataCap</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_registry_make_regulated">Function <span class="code-inline">make_regulated</span></h2>

Allows converting a currency, on init, to regulated, which creates
a <span class="code-inline">DenyCapV2</span> object, and a denylist entry. Sets regulated state to <span class="code-inline">Regulated</span>.

This action is irreversible.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_make_regulated">make_regulated</a>&lt;T&gt;(init: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">sui::coin_registry::CurrencyInitializer</a>&lt;T&gt;, allow_global_pause: bool, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_registry_make_supply_fixed_init">Function <span class="code-inline">make_supply_fixed_init</span></h2>

Initializer function to make the supply fixed.<br/>
Aborts if Supply is <span class="code-inline">0</span> to enforce minting during initialization.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_make_supply_fixed_init">make_supply_fixed_init</a>&lt;T&gt;(init: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">sui::coin_registry::CurrencyInitializer</a>&lt;T&gt;, cap: <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_make_supply_burn_only_init">Function <span class="code-inline">make_supply_burn_only_init</span></h2>

Initializer function to make the supply burn-only.<br/>
Aborts if Supply is <span class="code-inline">0</span> to enforce minting during initialization.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_make_supply_burn_only_init">make_supply_burn_only_init</a>&lt;T&gt;(init: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">sui::coin_registry::CurrencyInitializer</a>&lt;T&gt;, cap: <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_make_supply_fixed">Function <span class="code-inline">make_supply_fixed</span></h2>

Freeze the supply by destroying the <span class="code-inline">TreasuryCap</span> and storing it in the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_make_supply_fixed">make_supply_fixed</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, cap: <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_make_supply_burn_only">Function <span class="code-inline">make_supply_burn_only</span></h2>

Make the supply <span class="code-inline">BurnOnly</span> by giving up the <span class="code-inline">TreasuryCap</span>, and allowing
burning of Coins through the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_make_supply_burn_only">make_supply_burn_only</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, cap: <a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_finalize">Function <span class="code-inline">finalize</span></h2>

Finalize the coin initialization, returning <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_finalize">finalize</a>&lt;T&gt;(builder: <a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">sui::coin_registry::CurrencyInitializer</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">sui::coin_registry::MetadataCap</a>&lt;T&gt;
</code></pre>




<h2 id="sui_coin_registry_finalize_and_delete_metadata_cap">Function <span class="code-inline">finalize_and_delete_metadata_cap</span></h2>

Does the same as <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_finalize">finalize</a></span>, but also deletes the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> after finalization.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_finalize_and_delete_metadata_cap">finalize_and_delete_metadata_cap</a>&lt;T&gt;(builder: <a href="../sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer">sui::coin_registry::CurrencyInitializer</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_registry_finalize_registration">Function <span class="code-inline">finalize_registration</span></h2>

The second step in the "otw" initialization of coin metadata, that takes in
the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a>&lt;T&gt;</span> that was transferred from init, and transforms it in to a
"derived address" shared object.

Can be performed by anyone.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_finalize_registration">finalize_registration</a>&lt;T&gt;(registry: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CoinRegistry">sui::coin_registry::CoinRegistry</a>, currency: <a href="../sui_sui/transfer#sui_transfer_Receiving">sui::transfer::Receiving</a>&lt;<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_registry_delete_metadata_cap">Function <span class="code-inline">delete_metadata_cap</span></h2>

Delete the metadata cap making further updates of <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> metadata impossible.<br/>
This action is IRREVERSIBLE, and the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> can no longer be claimed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_delete_metadata_cap">delete_metadata_cap</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, cap: <a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">sui::coin_registry::MetadataCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_burn">Function <span class="code-inline">burn</span></h2>

Burn the <span class="code-inline">Coin</span> if the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> has a <span class="code-inline">BurnOnly</span> supply state.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_burn">burn</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, <a href="../sui_sui/coin#sui_coin">coin</a>: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_burn_balance">Function <span class="code-inline">burn_balance</span></h2>

Burn the <span class="code-inline">Balance</span> if the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> has a <span class="code-inline">BurnOnly</span> supply state.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_burn_balance">burn_balance</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, <a href="../sui_sui/balance#sui_balance">balance</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_set_name">Function <span class="code-inline">set_name</span></h2>

Update the name of the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_set_name">set_name</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, _: &<a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">sui::coin_registry::MetadataCap</a>&lt;T&gt;, <a href="../sui_sui/coin_registry#sui_coin_registry_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_coin_registry_set_description">Function <span class="code-inline">set_description</span></h2>

Update the description of the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_set_description">set_description</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, _: &<a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">sui::coin_registry::MetadataCap</a>&lt;T&gt;, <a href="../sui_sui/coin_registry#sui_coin_registry_description">description</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_coin_registry_set_icon_url">Function <span class="code-inline">set_icon_url</span></h2>

Update the icon URL of the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_set_icon_url">set_icon_url</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, _: &<a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">sui::coin_registry::MetadataCap</a>&lt;T&gt;, <a href="../sui_sui/coin_registry#sui_coin_registry_icon_url">icon_url</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>)
</code></pre>




<h2 id="sui_coin_registry_set_treasury_cap_id">Function <span class="code-inline">set_treasury_cap_id</span></h2>

Register the treasury cap ID for a migrated <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>. All currencies created with
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_new_currency">new_currency</a></span> or <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_new_currency_with_otw">new_currency_with_otw</a></span> have their treasury cap ID set during
initialization.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_set_treasury_cap_id">set_treasury_cap_id</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, cap: &<a href="../sui_sui/coin#sui_coin_TreasuryCap">sui::coin::TreasuryCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_migrate_legacy_metadata">Function <span class="code-inline">migrate_legacy_metadata</span></h2>

Register <span class="code-inline">CoinMetadata</span> in the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_CoinRegistry">CoinRegistry</a></span>. This can happen only once, if the
<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> did not exist yet. Further updates are possible through <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_update_from_legacy_metadata">update_from_legacy_metadata</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_migrate_legacy_metadata">migrate_legacy_metadata</a>&lt;T&gt;(registry: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_CoinRegistry">sui::coin_registry::CoinRegistry</a>, legacy: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_registry_update_from_legacy_metadata">Function <span class="code-inline">update_from_legacy_metadata</span></h2>

Update <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> from <span class="code-inline">CoinMetadata</span> if the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> is not claimed. After
the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_MetadataCap">MetadataCap</a></span> is claimed, updates can only be made through <span class="code-inline">set_*</span> functions.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_update_from_legacy_metadata">update_from_legacy_metadata</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, legacy: &<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_delete_migrated_legacy_metadata">Function <span class="code-inline">delete_migrated_legacy_metadata</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_delete_migrated_legacy_metadata">delete_migrated_legacy_metadata</a>&lt;T&gt;(_: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, _: <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_migrate_regulated_state_by_metadata">Function <span class="code-inline">migrate_regulated_state_by_metadata</span></h2>

Allow migrating the regulated state by access to <span class="code-inline">RegulatedCoinMetadata</span> frozen object.<br/>
This is a permissionless operation which can be performed only once.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_migrate_regulated_state_by_metadata">migrate_regulated_state_by_metadata</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, metadata: &<a href="../sui_sui/coin#sui_coin_RegulatedCoinMetadata">sui::coin::RegulatedCoinMetadata</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_migrate_regulated_state_by_cap">Function <span class="code-inline">migrate_regulated_state_by_cap</span></h2>

Mark regulated state by showing the <span class="code-inline">DenyCapV2</span> object for the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_migrate_regulated_state_by_cap">migrate_regulated_state_by_cap</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, cap: &<a href="../sui_sui/coin#sui_coin_DenyCapV2">sui::coin::DenyCapV2</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_borrow_legacy_metadata">Function <span class="code-inline">borrow_legacy_metadata</span></h2>

Borrow the legacy <span class="code-inline">CoinMetadata</span> from a new <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>. To preserve the <span class="code-inline">ID</span>
of the legacy <span class="code-inline">CoinMetadata</span>, we create it on request and then store it as a
dynamic field for future borrows.

<span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Borrow">Borrow</a>&lt;T&gt;</span> ensures that the <span class="code-inline">CoinMetadata</span> is returned in the same transaction.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_borrow_legacy_metadata">borrow_legacy_metadata</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, <a href="../sui_sui/coin_registry#sui_coin_registry_Borrow">sui::coin_registry::Borrow</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_coin_registry_return_borrowed_legacy_metadata">Function <span class="code-inline">return_borrowed_legacy_metadata</span></h2>

Return the borrowed <span class="code-inline">CoinMetadata</span> and the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Borrow">Borrow</a></span> potato to the <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span>.

Note to self: Borrow requirement prevents deletion through this method.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_return_borrowed_legacy_metadata">return_borrowed_legacy_metadata</a>&lt;T&gt;(currency: &<b>mut</b> <a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;, legacy: <a href="../sui_sui/coin#sui_coin_CoinMetadata">sui::coin::CoinMetadata</a>&lt;T&gt;, <a href="../sui_sui/borrow#sui_borrow">borrow</a>: <a href="../sui_sui/coin_registry#sui_coin_registry_Borrow">sui::coin_registry::Borrow</a>&lt;T&gt;, _ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_coin_registry_decimals">Function <span class="code-inline">decimals</span></h2>

Get the number of decimal places for the coin type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_decimals">decimals</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): u8
</code></pre>




<h2 id="sui_coin_registry_name">Function <span class="code-inline">name</span></h2>

Get the human-readable name of the coin.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_name">name</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_coin_registry_symbol">Function <span class="code-inline">symbol</span></h2>

Get the symbol/ticker of the coin.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_symbol">symbol</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_coin_registry_description">Function <span class="code-inline">description</span></h2>

Get the description of the coin.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_description">description</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_coin_registry_icon_url">Function <span class="code-inline">icon_url</span></h2>

Get the icon URL for the coin.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_icon_url">icon_url</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): <a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_coin_registry_is_metadata_cap_claimed">Function <span class="code-inline">is_metadata_cap_claimed</span></h2>

Check if the metadata capability has been claimed for this <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_is_metadata_cap_claimed">is_metadata_cap_claimed</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): bool
</code></pre>




<h2 id="sui_coin_registry_is_metadata_cap_deleted">Function <span class="code-inline">is_metadata_cap_deleted</span></h2>

Check if the metadata capability has been deleted for this <span class="code-inline"><a href="../sui_sui/coin_registry#sui_coin_registry_Currency">Currency</a></span> type.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_is_metadata_cap_deleted">is_metadata_cap_deleted</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): bool
</code></pre>




<h2 id="sui_coin_registry_metadata_cap_id">Function <span class="code-inline">metadata_cap_id</span></h2>

Get the metadata cap ID, or none if it has not been claimed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_metadata_cap_id">metadata_cap_id</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>&gt;
</code></pre>




<h2 id="sui_coin_registry_treasury_cap_id">Function <span class="code-inline">treasury_cap_id</span></h2>

Get the treasury cap ID for this coin type, if registered.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/coin_registry#sui_coin_registry_treasury_cap_id">treasury_cap_id</a>&lt;T&gt;(currency: &<a href="../sui_sui/coin_registry#sui_coin_registry_Currency">sui::coin_registry::Currency</a>&lt;T&gt;): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>&gt;
</code></pre>






---

*This page has been truncated because it exceeds the maximum character limit. [View the full source](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui/coin_registry.md).*
