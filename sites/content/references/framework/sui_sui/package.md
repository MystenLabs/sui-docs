---
title: Module sui::package
sidebar_label: package
---

Functions for operating on Move packages from within Move:
- Creating proof-of-publish objects from one-time witnesses
- Administering package upgrades through upgrade policies.

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_package_Publisher">Struct <span class="code-inline">Publisher</span></h2>

This type can only be created in the transaction that
generates a module, by consuming its one-time witness, so it
can be used to identify the address that published the package
a type originated from.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/package#sui_package_Publisher">Publisher</a> <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui/package#sui_package">package</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">module_name: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_package_UpgradeCap">Struct <span class="code-inline">UpgradeCap</span></h2>

Capability controlling the ability to upgrade a package.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a> <b>has</b> key, store
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
<span class="code-inline"><a href="../sui_sui/package#sui_package">package</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 (Mutable) ID of the package that can be upgraded.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/package#sui_package_version">version</a>: u64</span>
</dt>
<dd>
 (Mutable) The number of upgrades that have been applied
 successively to the original package.  Initially 0.
</dd>
<dt>
<span class="code-inline">policy: u8</span>
</dt>
<dd>
 What kind of upgrades are allowed.
</dd>
</dl>


</details>

<h2 id="sui_package_UpgradeTicket">Struct <span class="code-inline">UpgradeTicket</span></h2>

Permission to perform a particular upgrade (for a fixed version of
the package, bytecode to upgrade with and transitive dependencies to
depend against).

An <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> can only issue one ticket at a time, to prevent races
between concurrent updates or a change in its upgrade policy after
issuing a ticket, so the ticket is a "Hot Potato" to preserve forward
progress.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/package#sui_package_UpgradeTicket">UpgradeTicket</a>
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">cap: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 (Immutable) ID of the <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> this originated from.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/package#sui_package">package</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 (Immutable) ID of the package that can be upgraded.
</dd>
<dt>
<span class="code-inline">policy: u8</span>
</dt>
<dd>
 (Immutable) The policy regarding what kind of upgrade this ticket
 permits.
</dd>
<dt>
<span class="code-inline">digest: vector&lt;u8&gt;</span>
</dt>
<dd>
 (Immutable) SHA256 digest of the bytecode and transitive
 dependencies that will be used in the upgrade.
</dd>
</dl>


</details>

<h2 id="sui_package_UpgradeReceipt">Struct <span class="code-inline">UpgradeReceipt</span></h2>

Issued as a result of a successful upgrade, containing the
information to be used to update the <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span>.  This is a "Hot.<br/>
Potato" to ensure that it is used to update its <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> before
the end of the transaction that performed the upgrade.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/package#sui_package_UpgradeReceipt">UpgradeReceipt</a>
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">cap: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 (Immutable) ID of the <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> this originated from.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/package#sui_package">package</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
 (Immutable) ID of the package after it was upgraded.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Tried to create a <span class="code-inline"><a href="../sui_sui/package#sui_package_Publisher">Publisher</a></span> using a type that isn't a
one-time witness.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_ENotOneTimeWitness">ENotOneTimeWitness</a>: u64 = 0;
</code></pre>

Tried to set a less restrictive policy than currently in place.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_ETooPermissive">ETooPermissive</a>: u64 = 1;
</code></pre>

This <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> has already authorized a pending upgrade.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_EAlreadyAuthorized">EAlreadyAuthorized</a>: u64 = 2;
</code></pre>

This <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> has not authorized an upgrade.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_ENotAuthorized">ENotAuthorized</a>: u64 = 3;
</code></pre>

Trying to commit an upgrade to the wrong <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span>.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_EWrongUpgradeCap">EWrongUpgradeCap</a>: u64 = 4;
</code></pre>

Trying to read the current package ID from the <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span>
while an upgrade is in progress.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_EUpgradeInProgress">EUpgradeInProgress</a>: u64 = 5;
</code></pre>

Invalid package version in the <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span>, or there was a mismatch
between the package ID and version supplied (in the native).


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_EInvalidPackageVersion">EInvalidPackageVersion</a>: u64 = 6;
</code></pre>

Update any part of the package (function implementations, add new
functions or types, change dependencies)


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_COMPATIBLE">COMPATIBLE</a>: u8 = 0;
</code></pre>

Add new functions or types, or change dependencies, existing
functions can't change.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_ADDITIVE">ADDITIVE</a>: u8 = 128;
</code></pre>

Only be able to change dependencies.


<pre><code><b>const</b> <a href="../sui_sui/package#sui_package_DEP_ONLY">DEP_ONLY</a>: u8 = 192;
</code></pre>


<h2 id="sui_package_claim">Function <span class="code-inline">claim</span></h2>

Claim a Publisher object.<br/>
Requires a One-Time-Witness to prove ownership. Due to this
constraint there can be only one Publisher object per module
but multiple per package (!).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_claim">claim</a>&lt;OTW: drop&gt;(otw: OTW, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>
</code></pre>




<h2 id="sui_package_claim_and_keep">Function <span class="code-inline">claim_and_keep</span></h2>

Claim a Publisher object and send it to transaction sender.<br/>
Since this function can only be called in the module initializer,
the sender is the publisher.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_claim_and_keep">claim_and_keep</a>&lt;OTW: drop&gt;(otw: OTW, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_package_burn_publisher">Function <span class="code-inline">burn_publisher</span></h2>

Destroy a Publisher object effectively removing all privileges
associated with it.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_burn_publisher">burn_publisher</a>(self: <a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>)
</code></pre>




<h2 id="sui_package_from_package">Function <span class="code-inline">from_package</span></h2>

Check whether type belongs to the same package as the publisher object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_from_package">from_package</a>&lt;T&gt;(self: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>): bool
</code></pre>




<h2 id="sui_package_from_module">Function <span class="code-inline">from_module</span></h2>

Check whether a type belongs to the same module as the publisher object.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_from_module">from_module</a>&lt;T&gt;(self: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>): bool
</code></pre>




<h2 id="sui_package_published_module">Function <span class="code-inline">published_module</span></h2>

Read the name of the module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_published_module">published_module</a>(self: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>): &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="sui_package_published_package">Function <span class="code-inline">published_package</span></h2>

Read the package address string.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_published_package">published_package</a>(self: &<a href="../sui_sui/package#sui_package_Publisher">sui::package::Publisher</a>): &<a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>




<h2 id="sui_package_upgrade_package">Function <span class="code-inline">upgrade_package</span></h2>

The ID of the package that this cap authorizes upgrades for.<br/>
Can be <span class="code-inline">0x0</span> if the cap cannot currently authorize an upgrade
because there is already a pending upgrade in the transaction.<br/>
Otherwise guaranteed to be the latest version of any given
package.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_upgrade_package">upgrade_package</a>(cap: &<a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_package_version">Function <span class="code-inline">version</span></h2>

The most recent version of the package, increments by one for each
successfully applied upgrade.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_version">version</a>(cap: &<a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>): u64
</code></pre>




<h2 id="sui_package_upgrade_policy">Function <span class="code-inline">upgrade_policy</span></h2>

The most permissive kind of upgrade currently supported by this <span class="code-inline">cap</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_upgrade_policy">upgrade_policy</a>(cap: &<a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>): u8
</code></pre>




<h2 id="sui_package_ticket_package">Function <span class="code-inline">ticket_package</span></h2>

The package that this ticket is authorized to upgrade


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_ticket_package">ticket_package</a>(ticket: &<a href="../sui_sui/package#sui_package_UpgradeTicket">sui::package::UpgradeTicket</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_package_ticket_policy">Function <span class="code-inline">ticket_policy</span></h2>

The kind of upgrade that this ticket authorizes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_ticket_policy">ticket_policy</a>(ticket: &<a href="../sui_sui/package#sui_package_UpgradeTicket">sui::package::UpgradeTicket</a>): u8
</code></pre>




<h2 id="sui_package_receipt_cap">Function <span class="code-inline">receipt_cap</span></h2>

ID of the <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> that this <span class="code-inline">receipt</span> should be used to
update.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_receipt_cap">receipt_cap</a>(receipt: &<a href="../sui_sui/package#sui_package_UpgradeReceipt">sui::package::UpgradeReceipt</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_package_receipt_package">Function <span class="code-inline">receipt_package</span></h2>

ID of the package that was upgraded to: the latest version of
the package, as of the upgrade represented by this <span class="code-inline">receipt</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_receipt_package">receipt_package</a>(receipt: &<a href="../sui_sui/package#sui_package_UpgradeReceipt">sui::package::UpgradeReceipt</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_package_ticket_digest">Function <span class="code-inline">ticket_digest</span></h2>

A hash of the package contents for the new version of the
package.  This ticket only authorizes an upgrade to a package
that matches this digest.  A package's contents are identified
by two things:

 - modules: [[u8]]       a list of the package's module contents
 - deps:    [[u8; 32]]   a list of 32 byte ObjectIDs of the
                         package's transitive dependencies

A package's digest is calculated as:

  sha3_256(sort(modules ++ deps))


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_ticket_digest">ticket_digest</a>(ticket: &<a href="../sui_sui/package#sui_package_UpgradeTicket">sui::package::UpgradeTicket</a>): &vector&lt;u8&gt;
</code></pre>




<h2 id="sui_package_compatible_policy">Function <span class="code-inline">compatible_policy</span></h2>

Expose the constants representing various upgrade policies


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_compatible_policy">compatible_policy</a>(): u8
</code></pre>




<h2 id="sui_package_additive_policy">Function <span class="code-inline">additive_policy</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_additive_policy">additive_policy</a>(): u8
</code></pre>




<h2 id="sui_package_dep_only_policy">Function <span class="code-inline">dep_only_policy</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_dep_only_policy">dep_only_policy</a>(): u8
</code></pre>




<h2 id="sui_package_only_additive_upgrades">Function <span class="code-inline">only_additive_upgrades</span></h2>

Restrict upgrades through this upgrade <span class="code-inline">cap</span> to just add code, or
change dependencies.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/package#sui_package_only_additive_upgrades">only_additive_upgrades</a>(cap: &<b>mut</b> <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>)
</code></pre>




<h2 id="sui_package_only_dep_upgrades">Function <span class="code-inline">only_dep_upgrades</span></h2>

Restrict upgrades through this upgrade <span class="code-inline">cap</span> to just change
dependencies.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/package#sui_package_only_dep_upgrades">only_dep_upgrades</a>(cap: &<b>mut</b> <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>)
</code></pre>




<h2 id="sui_package_make_immutable">Function <span class="code-inline">make_immutable</span></h2>

Discard the <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span> to make a package immutable.


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/package#sui_package_make_immutable">make_immutable</a>(cap: <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>)
</code></pre>




<h2 id="sui_package_authorize_upgrade">Function <span class="code-inline">authorize_upgrade</span></h2>

Issue a ticket authorizing an upgrade to a particular new bytecode
(identified by its digest).  A ticket will only be issued if one has
not already been issued, and if the <span class="code-inline">policy</span> requested is at least as
restrictive as the policy set out by the <span class="code-inline">cap</span>.

The <span class="code-inline">digest</span> supplied and the <span class="code-inline">policy</span> will both be checked by
validators when running the upgrade.  I.e. the bytecode supplied in
the upgrade must have a matching digest, and the changes relative to
the parent package must be compatible with the policy in the ticket
for the upgrade to succeed.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_authorize_upgrade">authorize_upgrade</a>(cap: &<b>mut</b> <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>, policy: u8, digest: vector&lt;u8&gt;): <a href="../sui_sui/package#sui_package_UpgradeTicket">sui::package::UpgradeTicket</a>
</code></pre>




<h2 id="sui_package_commit_upgrade">Function <span class="code-inline">commit_upgrade</span></h2>

Consume an <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeReceipt">UpgradeReceipt</a></span> to update its <span class="code-inline"><a href="../sui_sui/package#sui_package_UpgradeCap">UpgradeCap</a></span>, finalizing
the upgrade.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_commit_upgrade">commit_upgrade</a>(cap: &<b>mut</b> <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>, receipt: <a href="../sui_sui/package#sui_package_UpgradeReceipt">sui::package::UpgradeReceipt</a>)
</code></pre>




<h2 id="sui_package_original_package_id">Function <span class="code-inline">original_package_id</span></h2>

The original (first-version) ID of the package that this cap authorizes upgrades for.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/package#sui_package_original_package_id">original_package_id</a>(cap: &<a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_package_original_package_id_impl">Function <span class="code-inline">original_package_id_impl</span></h2>

Returns the original package id for the given <span class="code-inline">package_id</span> that must be <span class="code-inline"><a href="../sui_sui/package#sui_package_version">version</a></span> of the package.<br/>
If <span class="code-inline">package_id</span>'s version is not <span class="code-inline"><a href="../sui_sui/package#sui_package_version">version</a></span>, <span class="code-inline"><a href="../sui_sui/package#sui_package_EInvalidPackageVersion">EInvalidPackageVersion</a></span> will be raised.


<pre><code><b>fun</b> <a href="../sui_sui/package#sui_package_original_package_id_impl">original_package_id_impl</a>(package_id: <b>address</b>, <a href="../sui_sui/package#sui_package_version">version</a>: u64): <b>address</b>
</code></pre>




<h2 id="sui_package_restrict">Function <span class="code-inline">restrict</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/package#sui_package_restrict">restrict</a>(cap: &<b>mut</b> <a href="../sui_sui/package#sui_package_UpgradeCap">sui::package::UpgradeCap</a>, policy: u8)
</code></pre>



