---
title: Module sui::kiosk
sidebar_label: kiosk
---

Kiosk is a primitive for building safe, decentralized and trustless trading
experiences. It allows storing and trading any types of assets as long as
the creator of these assets implements a <span class="code-inline">TransferPolicy</span> for them.

#### Principles and philosophy:

- Kiosk provides guarantees of "true ownership"; - just like single owner
objects, assets stored in the Kiosk can only be managed by the Kiosk owner.<br/>
Only the owner can <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_place">place</a></span>, <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span>, <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span>, perform any other actions on
assets in the Kiosk.

- Kiosk aims to be generic - allowing for a small set of default behaviors
and not imposing any restrictions on how the assets can be traded. The only
default scenario is a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span> + <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase">purchase</a></span> flow; any other trading logic can
be implemented on top using the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list_with_purchase_cap">list_with_purchase_cap</a></span> (and a matching
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase_with_cap">purchase_with_cap</a></span>) flow.

- For every transaction happening with a third party a <span class="code-inline">TransferRequest</span> is
created - this way creators are fully in control of the trading experience.

#### Asset states in the Kiosk:

- <span class="code-inline">placed</span> -  An asset is <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_place">place</a></span>d into the Kiosk and can be <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span>n out by
the Kiosk owner; it's freely tradable and modifiable via the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_borrow_mut">borrow_mut</a></span>
and <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_borrow_val">borrow_val</a></span> functions.

- <span class="code-inline">locked</span> - Similar to <span class="code-inline">placed</span> except that <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span> is disabled and the only
way to move the asset out of the Kiosk is to <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span> it or
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list_with_purchase_cap">list_with_purchase_cap</a></span> therefore performing a trade (issuing a
<span class="code-inline">TransferRequest</span>). The check on the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_lock">lock</a></span> function makes sure that the
<span class="code-inline">TransferPolicy</span> exists to not lock the item in a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> forever.

- <span class="code-inline">listed</span> - A <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_place">place</a></span>d or a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_lock">lock</a></span>ed item can be <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span>ed for a fixed price
allowing anyone to <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase">purchase</a></span> it from the Kiosk. While listed, an item can
not be taken or modified. However, an immutable borrow via <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow">borrow</a></span> call is
still available. The <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_delist">delist</a></span> function returns the asset to the previous
state.

- <span class="code-inline">listed_exclusively</span> - An item is listed via the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list_with_purchase_cap">list_with_purchase_cap</a></span>
function (and a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> is created). While listed this way, an item
can not be <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_delist">delist</a></span>-ed unless a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> is returned. All actions
available at this item state require a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span>:

1. <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase_with_cap">purchase_with_cap</a></span> - to purchase the item for a price equal or higher
than the <span class="code-inline">min_price</span> set in the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span>.
2. <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_return_purchase_cap">return_purchase_cap</a></span> - to return the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> and return the asset
into the previous state.

When an item is listed exclusively it cannot be modified nor taken and
losing a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> would lock the item in the Kiosk forever. Therefore,
it is recommended to only use <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> functionality in trusted
applications and not use it for direct trading (eg sending to another
account).

#### Using multiple Transfer Policies for different "tracks":

Every <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase">purchase</a></span> or <span class="code-inline">purchase_with_purchase_cap</span> creates a <span class="code-inline">TransferRequest</span>
hot potato which must be resolved in a matching <span class="code-inline">TransferPolicy</span> for the
transaction to pass. While the default scenario implies that there should be
a single <span class="code-inline">TransferPolicy&lt;T&gt;</span> for <span class="code-inline">T</span>; it is possible to have multiple, each
one having its own set of rules.

#### Examples:

- I create one <span class="code-inline">TransferPolicy</span> with "Royalty Rule" for everyone
- I create a special <span class="code-inline">TransferPolicy</span> for bearers of a "Club Membership"
object so they don't have to pay anything
- I create and wrap a <span class="code-inline">TransferPolicy</span> so that players of my game can
transfer items between <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>s in game without any charge (and maybe not
even paying the price with a 0 SUI PurchaseCap)

```
Kiosk -> (Item, TransferRequest)
... TransferRequest ------> Common Transfer Policy
... TransferRequest ------> In-game Wrapped Transfer Policy
... TransferRequest ------> Club Membership Transfer Policy
```

See <span class="code-inline"><a href="../sui_sui/transfer_policy#sui_transfer_policy">transfer_policy</a></span> module for more details on how they function.

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
<b>use</b> <a href="../sui_sui/transfer_policy#sui_transfer_policy">sui::transfer_policy</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>

<h2 id="sui_kiosk_Kiosk">Struct <span class="code-inline">Kiosk</span></h2>

An object which allows selling collectibles within "kiosk" ecosystem.<br/>
By default gives the functionality to list an item openly - for anyone
to purchase providing the guarantees for creators that every transfer
needs to be approved via the <span class="code-inline">TransferPolicy</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a> <b>has</b> key, store
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
<span class="code-inline">profits: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</span>
</dt>
<dd>
 Balance of the Kiosk - all profits from sales go here.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_owner">owner</a>: <b>address</b></span>
</dt>
<dd>
 Always point to <span class="code-inline">sender</span> of the transaction.<br/>
 Can be changed by calling <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_set_owner">set_owner</a></span> with Cap.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_item_count">item_count</a>: u32</span>
</dt>
<dd>
 Number of items stored in a Kiosk. Used to allow unpacking
 an empty Kiosk if it was wrapped or has a single owner.
</dd>
<dt>
<span class="code-inline">allow_extensions: bool</span>
</dt>
<dd>
 [DEPRECATED] Please, don't use the <span class="code-inline">allow_extensions</span> and the matching
 <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_set_allow_extensions">set_allow_extensions</a></span> function - it is a legacy feature that is being
 replaced by the <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension">kiosk_extension</a></span> module and its Extensions API.<br/>
 Exposes <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_uid_mut">uid_mut</a></span> publicly when set to <span class="code-inline"><b>true</b></span>, set to <span class="code-inline"><b>false</b></span> by default.
</dd>
</dl>


</details>

<h2 id="sui_kiosk_KioskOwnerCap">Struct <span class="code-inline">KioskOwnerCap</span></h2>

A Capability granting the bearer a right to <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_place">place</a></span> and <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span> items
from the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> as well as to <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span> them and <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list_with_purchase_cap">list_with_purchase_cap</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">KioskOwnerCap</a> <b>has</b> key, store
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

<h2 id="sui_kiosk_PurchaseCap">Struct <span class="code-inline">PurchaseCap</span></h2>

A capability which locks an item and gives a permission to
purchase it from a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> for any price no less than <span class="code-inline">min_price</span>.

Allows exclusive listing: only bearer of the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> can
purchase the asset. However, the capability should be used
carefully as losing it would lock the asset in the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.

The main application for the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> is building extensions
on top of the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a>&lt;<b>phantom</b> T: key, store&gt; <b>has</b> key, store
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
<span class="code-inline">kiosk_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 ID of the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> the cap belongs to.
</dd>
<dt>
<span class="code-inline">item_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 ID of the listed item.
</dd>
<dt>
<span class="code-inline">min_price: u64</span>
</dt>
<dd>
 Minimum price for which the item can be purchased.
</dd>
</dl>


</details>

<h2 id="sui_kiosk_Borrow">Struct <span class="code-inline">Borrow</span></h2>

Hot potato to ensure an item was returned after being taken using
the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_borrow_val">borrow_val</a></span> call.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_Borrow">Borrow</a>
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">kiosk_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">item_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_kiosk_Item">Struct <span class="code-inline">Item</span></h2>

Dynamic field key for an item placed into the kiosk.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_Item">Item</a> <b>has</b> <b>copy</b>, drop, store
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

<h2 id="sui_kiosk_Listing">Struct <span class="code-inline">Listing</span></h2>

Dynamic field key for an active offer to purchase the T. If an
item is listed without a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span>, exclusive is set to <span class="code-inline"><b>false</b></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_Listing">Listing</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">is_exclusive: bool</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_kiosk_Lock">Struct <span class="code-inline">Lock</span></h2>

Dynamic field key which marks that an item is locked in the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> and
can't be <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span>n. The item then can only be listed / sold via the PurchaseCap.<br/>
Lock is released on <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase">purchase</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_Lock">Lock</a> <b>has</b> <b>copy</b>, drop, store
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

<h2 id="sui_kiosk_ItemListed">Struct <span class="code-inline">ItemListed</span></h2>

Emitted when an item was listed by the safe owner. Can be used
to track available offers anywhere on the network; the event is
type-indexed which allows for searching for offers of a specific <span class="code-inline">T</span>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_ItemListed">ItemListed</a>&lt;<b>phantom</b> T: key, store&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk">kiosk</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">price: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_kiosk_ItemPurchased">Struct <span class="code-inline">ItemPurchased</span></h2>

Emitted when an item was purchased from the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>. Can be used
to track finalized sales across the network. The event is emitted
in both cases: when an item is purchased via the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> or
when it's purchased directly (via <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span> + <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase">purchase</a></span>).

The <span class="code-inline">price</span> is also emitted and might differ from the <span class="code-inline">price</span> set
in the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_ItemListed">ItemListed</a></span> event. This is because the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> only
sets a minimum price for the item, and the actual price is defined
by the trading module / extension.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_ItemPurchased">ItemPurchased</a>&lt;<b>phantom</b> T: key, store&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk">kiosk</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">price: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_kiosk_ItemDelisted">Struct <span class="code-inline">ItemDelisted</span></h2>

Emitted when an item was delisted by the safe owner. Can be used
to close tracked offers.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk#sui_kiosk_ItemDelisted">ItemDelisted</a>&lt;<b>phantom</b> T: key, store&gt; <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk">kiosk</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_4">Constants</h2>

Trying to withdraw profits and sender is not owner.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_ENotOwner">ENotOwner</a>: u64 = 0;
</code></pre>

Coin paid does not match the offer price.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EIncorrectAmount">EIncorrectAmount</a>: u64 = 1;
</code></pre>

Trying to withdraw higher amount than stored.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_ENotEnough">ENotEnough</a>: u64 = 2;
</code></pre>

Trying to close a Kiosk and it has items in it.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_ENotEmpty">ENotEmpty</a>: u64 = 3;
</code></pre>

Attempt to take an item that has a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> issued.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EListedExclusively">EListedExclusively</a>: u64 = 4;
</code></pre>

<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> does not match the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EWrongKiosk">EWrongKiosk</a>: u64 = 5;
</code></pre>

Trying to exclusively list an already listed item.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EAlreadyListed">EAlreadyListed</a>: u64 = 6;
</code></pre>

Trying to call <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_uid_mut">uid_mut</a></span> when <span class="code-inline">allow_extensions</span> set to false.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EUidAccessNotAllowed">EUidAccessNotAllowed</a>: u64 = 7;
</code></pre>

Attempt to <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span> an item that is locked.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EItemLocked">EItemLocked</a>: u64 = 8;
</code></pre>

Taking or mutably borrowing an item that is listed.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EItemIsListed">EItemIsListed</a>: u64 = 9;
</code></pre>

Item does not match <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Borrow">Borrow</a></span> in <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_return_val">return_val</a></span>.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EItemMismatch">EItemMismatch</a>: u64 = 10;
</code></pre>

An is not found while trying to borrow.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_EItemNotFound">EItemNotFound</a>: u64 = 11;
</code></pre>

Delisting an item that is not listed.


<pre><code><b>const</b> <a href="../sui_sui/kiosk#sui_kiosk_ENotListed">ENotListed</a>: u64 = 12;
</code></pre>


<h2 id="sui_kiosk_default">Function <span class="code-inline">default</span></h2>

Creates a new Kiosk in a default configuration: sender receives the
<span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">KioskOwnerCap</a></span> and becomes the Owner, the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> is shared.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_default">default</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_kiosk_new">Function <span class="code-inline">new</span></h2>

Creates a new <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> with a matching <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">KioskOwnerCap</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_new">new</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): (<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, <a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>)
</code></pre>




<h2 id="sui_kiosk_close_and_withdraw">Function <span class="code-inline">close_and_withdraw</span></h2>

Unpacks and destroys a Kiosk returning the profits (even if "0").<br/>
Can only be performed by the bearer of the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">KioskOwnerCap</a></span> in the
case where there's no items inside and a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> is not shared.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_close_and_withdraw">close_and_withdraw</a>(self: <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: <a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_kiosk_set_owner">Function <span class="code-inline">set_owner</span></h2>

Change the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_owner">owner</a></span> field to the transaction sender.<br/>
The change is purely cosmetical and does not affect any of the
basic kiosk functions unless some logic for this is implemented
in a third party module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_set_owner">set_owner</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_kiosk_set_owner_custom">Function <span class="code-inline">set_owner_custom</span></h2>

Update the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_owner">owner</a></span> field with a custom address. Can be used for
implementing a custom logic that relies on the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> owner.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_set_owner_custom">set_owner_custom</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, <a href="../sui_sui/kiosk#sui_kiosk_owner">owner</a>: <b>address</b>)
</code></pre>




<h2 id="sui_kiosk_place">Function <span class="code-inline">place</span></h2>

Place any object into a Kiosk.<br/>
Performs an authorization check to make sure only owner can do that.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_place">place</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, item: T)
</code></pre>




<h2 id="sui_kiosk_lock">Function <span class="code-inline">lock</span></h2>

Place an item to the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> and issue a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Lock">Lock</a></span> for it. Once placed this
way, an item can only be listed either with a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span> function or with a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list_with_purchase_cap">list_with_purchase_cap</a></span>.

Requires policy for <span class="code-inline">T</span> to make sure that there's an issued <span class="code-inline">TransferPolicy</span>
and the item can be sold, otherwise the asset might be locked forever.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_lock">lock</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, _policy: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;, item: T)
</code></pre>




<h2 id="sui_kiosk_take">Function <span class="code-inline">take</span></h2>

Take any object from the Kiosk.<br/>
Performs an authorization check to make sure only owner can do that.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_take">take</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): T
</code></pre>




<h2 id="sui_kiosk_list">Function <span class="code-inline">list</span></h2>

List the item by setting a price and making it available for purchase.<br/>
Performs an authorization check to make sure only owner can sell.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_list">list</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, price: u64)
</code></pre>




<h2 id="sui_kiosk_place_and_list">Function <span class="code-inline">place_and_list</span></h2>

Calls <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_place">place</a></span> and <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span> together - simplifies the flow.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_place_and_list">place_and_list</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, item: T, price: u64)
</code></pre>




<h2 id="sui_kiosk_delist">Function <span class="code-inline">delist</span></h2>

Remove an existing listing from the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> and keep the item in the
user Kiosk. Can only be performed by the owner of the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_delist">delist</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>)
</code></pre>




<h2 id="sui_kiosk_purchase">Function <span class="code-inline">purchase</span></h2>

Make a trade: pay the owner of the item and request a Transfer to the <span class="code-inline">target</span>
kiosk (to prevent item being taken by the approving party).

Received <span class="code-inline">TransferRequest</span> needs to be handled by the publisher of the T,
if they have a method implemented that allows a trade, it is possible to
request their approval (by calling some function) so that the trade can be
finalized.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_purchase">purchase</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, payment: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;): (T, <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_kiosk_list_with_purchase_cap">Function <span class="code-inline">list_with_purchase_cap</span></h2>

Creates a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> which gives the right to purchase an item
for any price equal or higher than the <span class="code-inline">min_price</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_list_with_purchase_cap">list_with_purchase_cap</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, min_price: u64, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">sui::kiosk::PurchaseCap</a>&lt;T&gt;
</code></pre>




<h2 id="sui_kiosk_purchase_with_cap">Function <span class="code-inline">purchase_with_cap</span></h2>

Unpack the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> and call <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_purchase">purchase</a></span>. Sets the payment amount
as the price for the listing making sure it's no less than <span class="code-inline">min_amount</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_purchase_with_cap">purchase_with_cap</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, purchase_cap: <a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">sui::kiosk::PurchaseCap</a>&lt;T&gt;, payment: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;): (T, <a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferRequest">sui::transfer_policy::TransferRequest</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_kiosk_return_purchase_cap">Function <span class="code-inline">return_purchase_cap</span></h2>

Return the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> without making a purchase; remove an active offer and
allow the item for taking. Can only be returned to its <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>, aborts otherwise.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_return_purchase_cap">return_purchase_cap</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, purchase_cap: <a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">sui::kiosk::PurchaseCap</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_kiosk_withdraw">Function <span class="code-inline">withdraw</span></h2>

Withdraw profits from the Kiosk.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_withdraw">withdraw</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, amount: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_kiosk_lock_internal">Function <span class="code-inline">lock_internal</span></h2>

Internal: "lock" an item disabling the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span> action.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_lock_internal">lock_internal</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, item: T)
</code></pre>




<h2 id="sui_kiosk_place_internal">Function <span class="code-inline">place_internal</span></h2>

Internal: "place" an item to the Kiosk and increment the item count.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_place_internal">place_internal</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, item: T)
</code></pre>




<h2 id="sui_kiosk_uid_mut_internal">Function <span class="code-inline">uid_mut_internal</span></h2>

Internal: get a mutable access to the UID.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_uid_mut_internal">uid_mut_internal</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_kiosk_has_item">Function <span class="code-inline">has_item</span></h2>

Check whether the <span class="code-inline">item</span> is present in the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_has_item">has_item</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): bool
</code></pre>




<h2 id="sui_kiosk_has_item_with_type">Function <span class="code-inline">has_item_with_type</span></h2>

Check whether the <span class="code-inline">item</span> is present in the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> and has type T.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_has_item_with_type">has_item_with_type</a>&lt;T: key, store&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): bool
</code></pre>




<h2 id="sui_kiosk_is_locked">Function <span class="code-inline">is_locked</span></h2>

Check whether an item with the <span class="code-inline">id</span> is locked in the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>. Meaning
that the only two actions that can be performed on it are <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list">list</a></span> and <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_list_with_purchase_cap">list_with_purchase_cap</a></span>, it cannot be <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_take">take</a></span>n out of the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_is_locked">is_locked</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): bool
</code></pre>




<h2 id="sui_kiosk_is_listed">Function <span class="code-inline">is_listed</span></h2>

Check whether an <span class="code-inline">item</span> is listed (exclusively or non exclusively).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_is_listed">is_listed</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): bool
</code></pre>




<h2 id="sui_kiosk_is_listed_exclusively">Function <span class="code-inline">is_listed_exclusively</span></h2>

Check whether there's a <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span> issued for an item.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_is_listed_exclusively">is_listed_exclusively</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): bool
</code></pre>




<h2 id="sui_kiosk_has_access">Function <span class="code-inline">has_access</span></h2>

Check whether the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">KioskOwnerCap</a></span> matches the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_has_access">has_access</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>): bool
</code></pre>




<h2 id="sui_kiosk_uid_mut_as_owner">Function <span class="code-inline">uid_mut_as_owner</span></h2>

Access the <span class="code-inline">UID</span> using the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">KioskOwnerCap</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_uid_mut_as_owner">uid_mut_as_owner</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>): &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_kiosk_uid">Function <span class="code-inline">uid</span></h2>

Get the immutable <span class="code-inline">UID</span> for dynamic field access.<br/>
Always enabled.

Given the &UID can be used for reading keys and authorization,
its access


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_uid">uid</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_kiosk_uid_mut">Function <span class="code-inline">uid_mut</span></h2>

Get the mutable <span class="code-inline">UID</span> for dynamic field access and extensions.<br/>
Aborts if <span class="code-inline">allow_extensions</span> set to <span class="code-inline"><b>false</b></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_uid_mut">uid_mut</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>




<h2 id="sui_kiosk_owner">Function <span class="code-inline">owner</span></h2>

Get the owner of the Kiosk.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_owner">owner</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): <b>address</b>
</code></pre>




<h2 id="sui_kiosk_item_count">Function <span class="code-inline">item_count</span></h2>

Get the number of items stored in a Kiosk.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_item_count">item_count</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): u32
</code></pre>




<h2 id="sui_kiosk_profits_amount">Function <span class="code-inline">profits_amount</span></h2>

Get the amount of profits collected by selling items.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_profits_amount">profits_amount</a>(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): u64
</code></pre>




<h2 id="sui_kiosk_profits_mut">Function <span class="code-inline">profits_mut</span></h2>

Get mutable access to <span class="code-inline">profits</span> - owner only action.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_profits_mut">profits_mut</a>(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>): &<b>mut</b> <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>




<h2 id="sui_kiosk_borrow">Function <span class="code-inline">borrow</span></h2>

Immutably borrow an item from the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>. Any item can be <span class="code-inline"><a href="../sui_sui/borrow#sui_borrow">borrow</a></span>ed
at any time.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;T: key, store&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): &T
</code></pre>




<h2 id="sui_kiosk_borrow_mut">Function <span class="code-inline">borrow_mut</span></h2>

Mutably borrow an item from the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>.<br/>
Item can be <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_borrow_mut">borrow_mut</a></span>ed only if it's not <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_is_listed">is_listed</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_borrow_mut">borrow_mut</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): &<b>mut</b> T
</code></pre>




<h2 id="sui_kiosk_borrow_val">Function <span class="code-inline">borrow_val</span></h2>

Take the item from the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span> with a guarantee that it will be returned.<br/>
Item can be <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_borrow_val">borrow_val</a></span>-ed only if it's not <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_is_listed">is_listed</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_borrow_val">borrow_val</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>): (T, <a href="../sui_sui/kiosk#sui_kiosk_Borrow">sui::kiosk::Borrow</a>)
</code></pre>




<h2 id="sui_kiosk_return_val">Function <span class="code-inline">return_val</span></h2>

Return the borrowed item to the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_Kiosk">Kiosk</a></span>. This method cannot be avoided
if <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_borrow_val">borrow_val</a></span> is used.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_return_val">return_val</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, item: T, <a href="../sui_sui/borrow#sui_borrow">borrow</a>: <a href="../sui_sui/kiosk#sui_kiosk_Borrow">sui::kiosk::Borrow</a>)
</code></pre>




<h2 id="sui_kiosk_kiosk_owner_cap_for">Function <span class="code-inline">kiosk_owner_cap_for</span></h2>

Get the <span class="code-inline"><b>for</b></span> field of the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">KioskOwnerCap</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_kiosk_owner_cap_for">kiosk_owner_cap_for</a>(cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_kiosk_purchase_cap_kiosk">Function <span class="code-inline">purchase_cap_kiosk</span></h2>

Get the <span class="code-inline">kiosk_id</span> from the <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">PurchaseCap</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk#sui_kiosk_purchase_cap_kiosk">purchase_cap_kiosk</a>&lt;T: key, store&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_PurchaseCap">sui::kiosk::PurchaseCap</a>&lt;T&gt;): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>






---

*This page has been truncated because it exceeds the maximum character limit. [View the full source](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui/kiosk.md).*
