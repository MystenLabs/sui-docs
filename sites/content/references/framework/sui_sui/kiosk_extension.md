---
title: Module sui::kiosk_extension
sidebar_label: kiosk_extension
---

This module implements the Kiosk Extensions functionality. It allows
exposing previously protected (only-owner) methods to third-party apps.

A Kiosk Extension is a module that implements any functionality on top of
the <span class="code-inline">Kiosk</span> without discarding nor blocking the base. Given that <span class="code-inline">Kiosk</span>
itself is a trading primitive, most of the extensions are expected to be
related to trading. However, there's no limit to what can be built using the <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension">kiosk_extension</a></span> module, as it gives certain benefits such as using <span class="code-inline">Kiosk</span>
as the storage for any type of data / assets.

#### Flow:

- An extension can only be installed by the Kiosk Owner and requires an
authorization via the <span class="code-inline">KioskOwnerCap</span>.
- When installed, the extension is given a permission bitmap that allows it
to perform certain protected actions (eg <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span>, <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span>). However, it is
possible to install an extension that does not have any permissions.
- Kiosk Owner can <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_disable">disable</a></span> the extension at any time, which prevents it
from performing any protected actions. The storage is still available to the
extension until it is completely removed.
- A disabled extension can be <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_enable">enable</a></span>d at any time giving the permissions
back to the extension.
- An extension permissions follow the all-or-nothing policy. Either all of
the requested permissions are granted or none of them (can't install).

#### Examples:

- An Auction extension can utilize the storage to store Auction-related data
while utilizing the same <span class="code-inline">Kiosk</span> object that the items are stored in.
- A Marketplace extension that implements custom events and fees for the
default trading functionality.

#### Notes:

- Trading functionality can utilize the <span class="code-inline">PurchaseCap</span> to build a custom
logic around the purchase flow. However, it should be carefully managed to
prevent asset locking.
- <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension">kiosk_extension</a></span> is a friend module to <span class="code-inline"><a href="../sui_sui/kiosk#sui_kiosk">kiosk</a></span> and has access to its
internal functions (such as <span class="code-inline">place_internal</span> and <span class="code-inline">lock_internal</span> to
implement custom authorization scheme for <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span> and <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span> respectively).

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
<b>use</b> <a href="../sui_sui/kiosk#sui_kiosk">sui::kiosk</a>;
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

<h2 id="sui_kiosk_extension_Extension">Struct <span class="code-inline">Extension</span></h2>

The Extension struct contains the data used by the extension and the
configuration for this extension. Stored under the <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_ExtensionKey">ExtensionKey</a></span>
dynamic field.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_Extension">Extension</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_storage">storage</a>: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 Storage for the extension, an isolated Bag. By putting the extension
 into a single dynamic field, we reduce the amount of fields on the
 top level (eg items / listings) while giving extension developers
 the ability to store any data they want.
</dd>
<dt>
<span class="code-inline">permissions: u128</span>
</dt>
<dd>
 Bitmap of permissions that the extension has (can be revoked any
 moment). It's all or nothing policy - either the extension has the
 required permissions or no permissions at all.
 1st bit - <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span> - allows to place items for sale
 2nd bit - <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span> and <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span> - allows to lock items (and place).<br/>
 For example:
 - <span class="code-inline">10</span> - allows to place items and lock them.
 - <span class="code-inline">11</span> - allows to place items and lock them (<span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span> includes <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span>).
 - <span class="code-inline">01</span> - allows to place items, but not lock them.
 - <span class="code-inline">00</span> - no permissions.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_is_enabled">is_enabled</a>: bool</span>
</dt>
<dd>
 Whether the extension can call protected actions. By default, all
 extensions are enabled (on <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_add">add</a></span> call), however the Kiosk
 owner can disable them at any time.<br/>
 Disabling the extension does not limit its access to the storage.
</dd>
</dl>


</details>

<h2 id="sui_kiosk_extension_ExtensionKey">Struct <span class="code-inline">ExtensionKey</span></h2>

The <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_ExtensionKey">ExtensionKey</a></span> is a typed dynamic field key used to store the
extension configuration and data. <span class="code-inline">Ext</span> is a phantom type that is used
to identify the extension witness.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_ExtensionKey">ExtensionKey</a>&lt;<b>phantom</b> Ext&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="@Constants_3">Constants</h2>

Trying to add an extension while not being the owner of the Kiosk.


<pre><code><b>const</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_ENotOwner">ENotOwner</a>: u64 = 0;
</code></pre>

Extension is trying to access a permissioned action while not having
the required permission.


<pre><code><b>const</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_EExtensionNotAllowed">EExtensionNotAllowed</a>: u64 = 2;
</code></pre>

Extension is not installed in the Kiosk.


<pre><code><b>const</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_EExtensionNotInstalled">EExtensionNotInstalled</a>: u64 = 3;
</code></pre>

Value that represents the <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span> permission in the permissions bitmap.


<pre><code><b>const</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_PLACE">PLACE</a>: u128 = 1;
</code></pre>

Value that represents the <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span> and <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span> permission in the
permissions bitmap.


<pre><code><b>const</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_LOCK">LOCK</a>: u128 = 2;
</code></pre>


<h2 id="sui_kiosk_extension_add">Function <span class="code-inline">add</span></h2>

Add an extension to the Kiosk. Can only be performed by the owner. The
extension witness is required to allow extensions define their set of
permissions in the custom <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_add">add</a></span> call.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_add">add</a>&lt;Ext: drop&gt;(_ext: Ext, self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>, permissions: u128, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_kiosk_extension_disable">Function <span class="code-inline">disable</span></h2>

Revoke permissions from the extension. While it does not remove the
extension completely, it keeps it from performing any protected actions.<br/>
The storage is still available to the extension (until it's removed).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_disable">disable</a>&lt;Ext: drop&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>)
</code></pre>




<h2 id="sui_kiosk_extension_enable">Function <span class="code-inline">enable</span></h2>

Re-enable the extension allowing it to call protected actions (eg
<span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span>, <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span>). By default, all added extensions are enabled. Kiosk
owner can disable them via <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_disable">disable</a></span> call.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_enable">enable</a>&lt;Ext: drop&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>)
</code></pre>




<h2 id="sui_kiosk_extension_remove">Function <span class="code-inline">remove</span></h2>

Remove an extension from the Kiosk. Can only be performed by the owner,
the extension storage must be empty for the transaction to succeed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_remove">remove</a>&lt;Ext: drop&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, cap: &<a href="../sui_sui/kiosk#sui_kiosk_KioskOwnerCap">sui::kiosk::KioskOwnerCap</a>)
</code></pre>




<h2 id="sui_kiosk_extension_storage">Function <span class="code-inline">storage</span></h2>

Get immutable access to the extension storage. Can only be performed by
the extension as long as the extension is installed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_storage">storage</a>&lt;Ext: drop&gt;(_ext: Ext, self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): &<a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>
</code></pre>




<h2 id="sui_kiosk_extension_storage_mut">Function <span class="code-inline">storage_mut</span></h2>

Get mutable access to the extension storage. Can only be performed by
the extension as long as the extension is installed. Disabling the
extension does not prevent it from accessing the storage.

Potentially dangerous: extension developer can keep data in a Bag
therefore never really allowing the KioskOwner to remove the extension.<br/>
However, it is the case with any other solution (1) and this way we
prevent intentional extension freeze when the owner wants to ruin a
trade (2) - eg locking extension while an auction is in progress.

Extensions should be crafted carefully, and the KioskOwner should be
aware of the risks.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_storage_mut">storage_mut</a>&lt;Ext: drop&gt;(_ext: Ext, self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): &<b>mut</b> <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a>
</code></pre>




<h2 id="sui_kiosk_extension_place">Function <span class="code-inline">place</span></h2>

Protected action: place an item into the Kiosk. Can be performed by an
authorized extension. The extension must have the <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span> permission or
a <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span> permission.

To prevent non-tradable items from being placed into <span class="code-inline">Kiosk</span> the method
requires a <span class="code-inline">TransferPolicy</span> for the placed type to exist.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a>&lt;Ext: drop, T: key, store&gt;(_ext: Ext, self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, item: T, _policy: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_kiosk_extension_lock">Function <span class="code-inline">lock</span></h2>

Protected action: lock an item in the Kiosk. Can be performed by an
authorized extension. The extension must have the <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span> permission.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a>&lt;Ext: drop, T: key, store&gt;(_ext: Ext, self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>, item: T, _policy: &<a href="../sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy">sui::transfer_policy::TransferPolicy</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_kiosk_extension_is_installed">Function <span class="code-inline">is_installed</span></h2>

Check whether an extension of type <span class="code-inline">Ext</span> is installed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_is_installed">is_installed</a>&lt;Ext: drop&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): bool
</code></pre>




<h2 id="sui_kiosk_extension_is_enabled">Function <span class="code-inline">is_enabled</span></h2>

Check whether an extension of type <span class="code-inline">Ext</span> is enabled.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_is_enabled">is_enabled</a>&lt;Ext: drop&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): bool
</code></pre>




<h2 id="sui_kiosk_extension_can_place">Function <span class="code-inline">can_place</span></h2>

Check whether an extension of type <span class="code-inline">Ext</span> can <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span> into Kiosk.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_can_place">can_place</a>&lt;Ext: drop&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): bool
</code></pre>




<h2 id="sui_kiosk_extension_can_lock">Function <span class="code-inline">can_lock</span></h2>

Check whether an extension of type <span class="code-inline">Ext</span> can <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_lock">lock</a></span> items in Kiosk.<br/>
Locking also enables <span class="code-inline"><a href="../sui_sui/kiosk_extension#sui_kiosk_extension_place">place</a></span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_can_lock">can_lock</a>&lt;Ext: drop&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): bool
</code></pre>




<h2 id="sui_kiosk_extension_extension">Function <span class="code-inline">extension</span></h2>

Internal: get a read-only access to the Extension.


<pre><code><b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_extension">extension</a>&lt;Ext: drop&gt;(self: &<a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): &<a href="../sui_sui/kiosk_extension#sui_kiosk_extension_Extension">sui::kiosk_extension::Extension</a>
</code></pre>




<h2 id="sui_kiosk_extension_extension_mut">Function <span class="code-inline">extension_mut</span></h2>

Internal: get a mutable access to the Extension.


<pre><code><b>fun</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_extension_mut">extension_mut</a>&lt;Ext: drop&gt;(self: &<b>mut</b> <a href="../sui_sui/kiosk#sui_kiosk_Kiosk">sui::kiosk::Kiosk</a>): &<b>mut</b> <a href="../sui_sui/kiosk_extension#sui_kiosk_extension_Extension">sui::kiosk_extension::Extension</a>
</code></pre>



