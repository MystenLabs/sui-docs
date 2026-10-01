---
title: Module sui::allowance
sidebar_label: allowance
---

Native allowances enable delegated, bounded, revocable spending from an address's live balance.

A transaction declares its funding source as a (funder, allowance) pair. Signing verifies that
source against the shared <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a></span> and hands the transaction an <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_AllowanceWithdrawal">AllowanceWithdrawal</a></span>.

All policy checks (rate limits, lifetime caps, expiry) are enforced by this module.

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
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/balance#sui_balance">sui::balance</a>;
<b>use</b> <a href="../sui_sui/clock#sui_clock">sui::clock</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/funds_accumulator#sui_funds_accumulator">sui::funds_accumulator</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/protocol_config#sui_protocol_config">sui::protocol_config</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_allowance_AllowanceWithdrawal">Struct <span class="code-inline">AllowanceWithdrawal</span></h2>

Created via a PTB Argument.

The inner <span class="code-inline">Withdrawal</span> is contained within this module and cannot be accessed directly.<br/>
An allowance's limits can never be charged without the funds actually moving.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/allowance#sui_allowance_AllowanceWithdrawal">AllowanceWithdrawal</a>&lt;<b>phantom</b> T: store&gt; <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance">allowance</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">is_sponsor: bool</span>
</dt>
<dd>
 Today is always false. Opens the door for future <span class="code-inline">ctx.sponsor()</span> based allowances.
</dd>
<dt>
<span class="code-inline">inner: <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_allowance_Allowance">Struct <span class="code-inline">Allowance</span></h2>

Enables withdrawing <span class="code-inline">T</span> from the funder's balance, within this allowance's limits.<br/>
Always kept as a shared object.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a>&lt;<b>phantom</b> T&gt; <b>has</b> key
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
<span class="code-inline">settings: <a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">current_spend: u256</span>
</dt>
<dd>
 Total cumulative spend from this allowance.
</dd>
</dl>


</details>

<h2 id="sui_allowance_Settings">Struct <span class="code-inline">Settings</span></h2>

Configuration of the Allowance, held by <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a></span> and <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_AllowanceProposal">AllowanceProposal</a></span>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/allowance#sui_allowance_Settings">Settings</a> <b>has</b> drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_funder">funder</a>: <b>address</b></span>
</dt>
<dd>
 The address whose balance is debited by spends against this allowance.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_spender">spender</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;</span>
</dt>
<dd>
 The spender of the allowance.<br/>
 While it is currently always set, in the future this may become optional
 to allow for keyless app-bound withdrawals.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_app">app</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;</span>
</dt>
<dd>
 When set, requires the app's <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_SpendPermit">SpendPermit</a></span> to spend, and only that app
 can rotate the spender or issue the allowance in the first place.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_lifetime_cap">lifetime_cap</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u256&gt;</span>
</dt>
<dd>
 An optional lifetime cap on withdrawals using this allowance. Inclusive.<br/>
 Amounts are <span class="code-inline">u256</span>, matching <span class="code-inline">Withdrawal.limit</span>.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_start_timestamp_ms">start_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;</span>
</dt>
<dd>
 Optional activation time, in milliseconds. Inclusive.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_expiration_timestamp_ms">expiration_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;</span>
</dt>
<dd>
 Optional expiration time, in milliseconds. Exclusive.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_rate_limit">rate_limit</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>&gt;</span>
</dt>
<dd>
 An optional recurring limit, applied on top of <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_lifetime_cap">lifetime_cap</a></span>. At least one of the two
 must be set.
</dd>
<dt>
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a></span>
</dt>
<dd>
 A label for off-chain use, never read by any check. At most 128 bytes.
</dd>
</dl>


</details>

<h2 id="sui_allowance_AllowanceCap">Struct <span class="code-inline">AllowanceCap</span></h2>

Revocation for an allowance, sent to the funder at issuance (soulbound).<br/>
Also used for discoverability (funder -> allowances).

Created with the allowance and destroyed with it by <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_revoke">revoke</a></span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/allowance#sui_allowance_AllowanceCap">AllowanceCap</a>&lt;<b>phantom</b> T&gt; <b>has</b> key
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
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance">allowance</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_allowance_AllowanceProposal">Struct <span class="code-inline">AllowanceProposal</span></h2>

A proposal that can only be issued by app <span class="code-inline">A</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/allowance#sui_allowance_AllowanceProposal">AllowanceProposal</a>&lt;<b>phantom</b> T&gt; <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: <a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_allowance_SpendPermit">Struct <span class="code-inline">SpendPermit</span></h2>

A <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_SpendPermit">SpendPermit</a>&lt;A&gt;</span> authorizes a single spend against an allowance bound to
<span class="code-inline">A</span>. It is issued from an <span class="code-inline">internal::Permit&lt;A&gt;</span>, allowing the module that
defines <span class="code-inline">A</span> to gate every withdrawal on its own logic.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/allowance#sui_allowance_SpendPermit">SpendPermit</a>&lt;<b>phantom</b> A&gt; <b>has</b> drop
</code></pre>




<h2 id="sui_allowance_SettingsPermit">Struct <span class="code-inline">SettingsPermit</span></h2>

A <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_SettingsPermit">SettingsPermit</a>&lt;A&gt;</span> authorizes changing the configuration of an allowance bound to <span class="code-inline">A</span>:
issuing one, or rotating its spender. It is issued from an <span class="code-inline">internal::Permit&lt;A&gt;</span>.

Kept distinct from <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_SpendPermit">SpendPermit</a></span> so an app can hand out the right to spend without also
handing out the right to reconfigure, and vice versa.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/allowance#sui_allowance_SettingsPermit">SettingsPermit</a>&lt;<b>phantom</b> A&gt; <b>has</b> drop
</code></pre>




<h2 id="sui_allowance_RateLimit">Enum <span class="code-inline">RateLimit</span></h2>

A recurring cap on withdrawals, applied on top of any lifetime cap.

An enum so other mechanics, like sliding windows, can be added as variants.


<pre><code><b>public</b> <b>enum</b> <a href="../sui_sui/allowance#sui_allowance_RateLimit">RateLimit</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Variants</summary>


<dl>
<dt>
Variant <span class="code-inline">Windowed</span>
</dt>
<dd>
 At most <span class="code-inline">limit</span> per window. Windows only roll forward.
</dd>

<dl>
<dt>
<span class="code-inline">limit: u256</span>
</dt>
<dd>
 The most that can be spent within a window. Inclusive.
</dd>
</dl>


<dl>
<dt>
<span class="code-inline">spent: u256</span>
</dt>
<dd>
 Amount spent so far within the current window.
</dd>
</dl>


<dl>
<dt>
<span class="code-inline">anchor_ms: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;</span>
</dt>
<dd>
 Start of the first window, stamped by the first successful charge.
</dd>
</dl>


<dl>
<dt>
<span class="code-inline">index: u64</span>
</dt>
<dd>
 Which window <span class="code-inline">spent</span> is accumulated in, numbered from the anchor (0 = first).<br/>
 A spend landing in a later one resets <span class="code-inline">spent</span>.
</dd>
</dl>


<dl>
<dt>
<span class="code-inline">window: <a href="../sui_sui/allowance#sui_allowance_Window">sui::allowance::Window</a></span>
</dt>
<dd>
 The defining period of time for this rate limit.
</dd>
</dl>

</dl>


</details>

<h2 id="sui_allowance_Window">Enum <span class="code-inline">Window</span></h2>

The defining time period for a <span class="code-inline">RateLimit::Windowed</span>.


<pre><code><b>public</b> <b>enum</b> <a href="../sui_sui/allowance#sui_allowance_Window">Window</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Variants</summary>


<dl>
<dt>
Variant <span class="code-inline">PeriodicMs</span>
</dt>
<dd>
 Windows of exactly this many milliseconds.
</dd>

<dl>
<dt>
<span class="code-inline">0: u64</span>
</dt>
<dd>
</dd>
</dl>

<dt>
Variant <span class="code-inline">CalendarMonths</span>
</dt>
<dd>
 Windows of this many civil (UTC) months.
</dd>

<dl>
<dt>
<span class="code-inline">0: u8</span>
</dt>
<dd>
</dd>
</dl>

</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_ENotSpender">ENotSpender</a>: vector&lt;u8&gt; = b"Transaction sender is not this <a href="../sui_sui/allowance#sui_allowance">allowance</a>'s <a href="../sui_sui/allowance#sui_allowance_spender">spender</a>";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EWrongApp">EWrongApp</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a> is not bound to this <a href="../sui_sui/allowance#sui_allowance_app">app</a>";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EExpired">EExpired</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a> <b>has</b> expired";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EExceedsLifetimeCap">EExceedsLifetimeCap</a>: vector&lt;u8&gt; = b"Spend would exceed the lifetime cap";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EExceedsRateLimit">EExceedsRateLimit</a>: vector&lt;u8&gt; = b"Spend would exceed the current rate-limit window";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_ENoLimit">ENoLimit</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a> must have a lifetime cap or a rate limit";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EWrongAllowance">EWrongAllowance</a>: vector&lt;u8&gt; = b"Withdrawal was issued <b>for</b> a different <a href="../sui_sui/allowance#sui_allowance">allowance</a>";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EBadRateLimit">EBadRateLimit</a>: vector&lt;u8&gt; = b"Rate limit needs a positive period and limit";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_ENotStarted">ENotStarted</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a> is not active yet; it <b>has</b> a future start timestamp";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EHasApp">EHasApp</a>: vector&lt;u8&gt; = b"App-bound <a href="../sui_sui/allowance#sui_allowance">allowance</a>: spend through <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_app_balance_spend">app_balance_spend</a></span>";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EWrongFunder">EWrongFunder</a>: vector&lt;u8&gt; = b"Withdrawal debits a different <b>address</b> than this <a href="../sui_sui/allowance#sui_allowance">allowance</a>'s <a href="../sui_sui/allowance#sui_allowance_funder">funder</a>";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EWrongCap">EWrongCap</a>: vector&lt;u8&gt; = b"Cap does not match this <a href="../sui_sui/allowance#sui_allowance">allowance</a>";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_ENameTooLong">ENameTooLong</a>: vector&lt;u8&gt; = b"Name exceeds the 128-byte limit";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EZeroLifetimeCap">EZeroLifetimeCap</a>: vector&lt;u8&gt; = b"Lifetime cap must be greater than zero";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_EBadTimeWindow">EBadTimeWindow</a>: vector&lt;u8&gt; = b"Expiration must be after the start time";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_ENoExpiration">ENoExpiration</a>: vector&lt;u8&gt; = b"<a href="../sui_sui/allowance#sui_allowance_Allowance">Allowance</a> must have an expiration or a rate limit";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_ENotEnabled">ENotEnabled</a>: vector&lt;u8&gt; = b"Allowances are not enabled";
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/allowance#sui_allowance_ESponsorWithdrawalNotEnabled">ESponsorWithdrawalNotEnabled</a>: vector&lt;u8&gt; = b"Sponsor <a href="../sui_sui/allowance#sui_allowance">allowance</a> withdrawals are not enabled";
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/allowance#sui_allowance_MAX_NAME_LENGTH">MAX_NAME_LENGTH</a>: u64 = 128;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/allowance#sui_allowance_MS_PER_DAY">MS_PER_DAY</a>: u64 = 86400000;
</code></pre>


<h2 id="sui_allowance_spend_permit">Function <span class="code-inline">spend_permit</span></h2>

Issues a <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_SpendPermit">SpendPermit</a>&lt;A&gt;</span> from the privileged <span class="code-inline">internal::Permit&lt;A&gt;</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_spend_permit">spend_permit</a>&lt;A&gt;(_: <a href="../sui_std/internal#std_internal_Permit">std::internal::Permit</a>&lt;A&gt;): <a href="../sui_sui/allowance#sui_allowance_SpendPermit">sui::allowance::SpendPermit</a>&lt;A&gt;
</code></pre>




<h2 id="sui_allowance_settings_permit">Function <span class="code-inline">settings_permit</span></h2>

Issues a <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_SettingsPermit">SettingsPermit</a>&lt;A&gt;</span> from the privileged <span class="code-inline">internal::Permit&lt;A&gt;</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_settings_permit">settings_permit</a>&lt;A&gt;(_: <a href="../sui_std/internal#std_internal_Permit">std::internal::Permit</a>&lt;A&gt;): <a href="../sui_sui/allowance#sui_allowance_SettingsPermit">sui::allowance::SettingsPermit</a>&lt;A&gt;
</code></pre>




<h2 id="sui_allowance_periodic_rate_limit">Function <span class="code-inline">periodic_rate_limit</span></h2>

At most <span class="code-inline">limit</span> per <span class="code-inline">period_ms</span>, counted from the first charge.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_periodic_rate_limit">periodic_rate_limit</a>(period_ms: u64, limit: u256): <a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>
</code></pre>




<h2 id="sui_allowance_calendar_rate_limit">Function <span class="code-inline">calendar_rate_limit</span></h2>

At most <span class="code-inline">limit</span> per <span class="code-inline">months</span> civil (UTC) months, counted from the first charge. Windows renew
on the anchor's day-of-month at 00:00 UTC, clamped to shorter months (a Jan 31 anchor renews.<br/>
Feb 28, then Mar 31).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_calendar_rate_limit">calendar_rate_limit</a>(months: u8, limit: u256): <a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>
</code></pre>




<h2 id="sui_allowance_monthly_rate_limit">Function <span class="code-inline">monthly_rate_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_monthly_rate_limit">monthly_rate_limit</a>(limit: u256): <a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>
</code></pre>




<h2 id="sui_allowance_quarterly_rate_limit">Function <span class="code-inline">quarterly_rate_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_quarterly_rate_limit">quarterly_rate_limit</a>(limit: u256): <a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>
</code></pre>




<h2 id="sui_allowance_yearly_rate_limit">Function <span class="code-inline">yearly_rate_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_yearly_rate_limit">yearly_rate_limit</a>(limit: u256): <a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>
</code></pre>




<h2 id="sui_allowance_new">Function <span class="code-inline">new</span></h2>

Issues an allowance funded by the sender, sharing it and sending its <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_AllowanceCap">AllowanceCap</a></span> to the
sender. Creation is <span class="code-inline"><b>entry</b></span> so contracts cannot create allowances implicitly.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_new">new</a>&lt;T&gt;(<a href="../sui_sui/allowance#sui_allowance_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/allowance#sui_allowance_spender">spender</a>: <b>address</b>, <a href="../sui_sui/allowance#sui_allowance_lifetime_cap">lifetime_cap</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u256&gt;, <a href="../sui_sui/allowance#sui_allowance_start_timestamp_ms">start_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, <a href="../sui_sui/allowance#sui_allowance_expiration_timestamp_ms">expiration_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, <a href="../sui_sui/allowance#sui_allowance_rate_limit">rate_limit</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_allowance_propose_for_app">Function <span class="code-inline">propose_for_app</span></h2>

Returns an <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_AllowanceProposal">AllowanceProposal</a></span> for an allowance bound to the controlling app <span class="code-inline">A</span>, funded by
the sender.

Unlike <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_new">new</a></span>, this creates no allowance on its own. <span class="code-inline">A</span>'s module must accept the proposal via
<span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_issue">issue</a></span>, giving the app a say in every allowance that names it.


<pre><code><b>entry</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_propose_for_app">propose_for_app</a>&lt;T, A&gt;(<a href="../sui_sui/allowance#sui_allowance_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>, <a href="../sui_sui/allowance#sui_allowance_spender">spender</a>: <b>address</b>, <a href="../sui_sui/allowance#sui_allowance_lifetime_cap">lifetime_cap</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u256&gt;, <a href="../sui_sui/allowance#sui_allowance_start_timestamp_ms">start_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, <a href="../sui_sui/allowance#sui_allowance_expiration_timestamp_ms">expiration_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, <a href="../sui_sui/allowance#sui_allowance_rate_limit">rate_limit</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/allowance#sui_allowance_AllowanceProposal">sui::allowance::AllowanceProposal</a>&lt;T&gt;
</code></pre>




<h2 id="sui_allowance_issue">Function <span class="code-inline">issue</span></h2>

Issues the proposed allowance on <span class="code-inline">A</span>'s behalf, creating and sharing it.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_issue">issue</a>&lt;T, A&gt;(proposal: <a href="../sui_sui/allowance#sui_allowance_AllowanceProposal">sui::allowance::AllowanceProposal</a>&lt;T&gt;, _: <a href="../sui_sui/allowance#sui_allowance_SettingsPermit">sui::allowance::SettingsPermit</a>&lt;A&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_allowance_balance_spend">Function <span class="code-inline">balance_spend</span></h2>

Signer path: the tx sender must be the spender.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_balance_spend">balance_spend</a>&lt;C&gt;(self: &<b>mut</b> <a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;C&gt;&gt;, w: <a href="../sui_sui/allowance#sui_allowance_AllowanceWithdrawal">sui::allowance::AllowanceWithdrawal</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;C&gt;&gt;, <a href="../sui_sui/clock#sui_clock">clock</a>: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;C&gt;
</code></pre>




<h2 id="sui_allowance_app_balance_spend">Function <span class="code-inline">app_balance_spend</span></h2>

App path: requires a <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_SpendPermit">SpendPermit</a>&lt;A&gt;</span> matching the allowance's <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_app">app</a></span>. The tx must still come
from the spender.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_app_balance_spend">app_balance_spend</a>&lt;C, A&gt;(self: &<b>mut</b> <a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;C&gt;&gt;, _: <a href="../sui_sui/allowance#sui_allowance_SpendPermit">sui::allowance::SpendPermit</a>&lt;A&gt;, w: <a href="../sui_sui/allowance#sui_allowance_AllowanceWithdrawal">sui::allowance::AllowanceWithdrawal</a>&lt;<a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;C&gt;&gt;, <a href="../sui_sui/clock#sui_clock">clock</a>: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;C&gt;
</code></pre>




<h2 id="sui_allowance_revoke">Function <span class="code-inline">revoke</span></h2>

Revokes an allowance, removing the ability to spend.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_revoke">revoke</a>&lt;T&gt;(self: <a href="../sui_sui/allowance#sui_allowance_AllowanceCap">sui::allowance::AllowanceCap</a>&lt;T&gt;, <a href="../sui_sui/allowance#sui_allowance">allowance</a>: <a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_allowance_rotate_spender">Function <span class="code-inline">rotate_spender</span></h2>

Rotates the spender key without the funder reissuing the allowance.

App-only: for an app-bound allowance the app dictates who the spender is. Non-app allowances
rotate through address aliases instead.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_rotate_spender">rotate_spender</a>&lt;T, A&gt;(self: &<b>mut</b> <a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;T&gt;, _: <a href="../sui_sui/allowance#sui_allowance_SettingsPermit">sui::allowance::SettingsPermit</a>&lt;A&gt;, new_spender: <b>address</b>)
</code></pre>




<h2 id="sui_allowance_allowance_settings">Function <span class="code-inline">allowance_settings</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_allowance_settings">allowance_settings</a>&lt;T&gt;(self: &<a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;T&gt;): &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>
</code></pre>




<h2 id="sui_allowance_allowance_current_spend">Function <span class="code-inline">allowance_current_spend</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_allowance_current_spend">allowance_current_spend</a>&lt;T&gt;(self: &<a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;T&gt;): u256
</code></pre>




<h2 id="sui_allowance_allowance_cap_allowance">Function <span class="code-inline">allowance_cap_allowance</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_allowance_cap_allowance">allowance_cap_allowance</a>&lt;T&gt;(self: &<a href="../sui_sui/allowance#sui_allowance_AllowanceCap">sui::allowance::AllowanceCap</a>&lt;T&gt;): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_allowance_allowance_proposal_settings">Function <span class="code-inline">allowance_proposal_settings</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_allowance_proposal_settings">allowance_proposal_settings</a>&lt;T&gt;(self: &<a href="../sui_sui/allowance#sui_allowance_AllowanceProposal">sui::allowance::AllowanceProposal</a>&lt;T&gt;): &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>
</code></pre>




<h2 id="sui_allowance_funder">Function <span class="code-inline">funder</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_funder">funder</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): <b>address</b>
</code></pre>




<h2 id="sui_allowance_spender">Function <span class="code-inline">spender</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_spender">spender</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<b>address</b>&gt;
</code></pre>




<h2 id="sui_allowance_app">Function <span class="code-inline">app</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_app">app</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;
</code></pre>




<h2 id="sui_allowance_lifetime_cap">Function <span class="code-inline">lifetime_cap</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_lifetime_cap">lifetime_cap</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u256&gt;
</code></pre>




<h2 id="sui_allowance_start_timestamp_ms">Function <span class="code-inline">start_timestamp_ms</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_start_timestamp_ms">start_timestamp_ms</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;
</code></pre>




<h2 id="sui_allowance_expiration_timestamp_ms">Function <span class="code-inline">expiration_timestamp_ms</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_expiration_timestamp_ms">expiration_timestamp_ms</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;
</code></pre>




<h2 id="sui_allowance_rate_limit">Function <span class="code-inline">rate_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_rate_limit">rate_limit</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>&gt;
</code></pre>




<h2 id="sui_allowance_name">Function <span class="code-inline">name</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_name">name</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>): &<a href="../sui_std/string#std_string_String">std::string::String</a>
</code></pre>




<h2 id="sui_allowance_rate_limit_limit">Function <span class="code-inline">rate_limit_limit</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_rate_limit_limit">rate_limit_limit</a>(self: &<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>): u256
</code></pre>




<h2 id="sui_allowance_rate_limit_spent">Function <span class="code-inline">rate_limit_spent</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_rate_limit_spent">rate_limit_spent</a>(self: &<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>): u256
</code></pre>




<h2 id="sui_allowance_rate_limit_window">Function <span class="code-inline">rate_limit_window</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_rate_limit_window">rate_limit_window</a>(self: &<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>): <a href="../sui_sui/allowance#sui_allowance_Window">sui::allowance::Window</a>
</code></pre>




<h2 id="sui_allowance_civil_from_ms">Function <span class="code-inline">civil_from_ms</span></h2>

Civil (year, month, day) in UTC, month and day 1-based. This is Howard Hinnant's
<span class="code-inline">civil_from_days</span>, where the derivation of every constant here is documented:
https://howardhinnant.github.io/date_algorithms.html#civil_from_days

The unsigned-only form of the algorithm. Chain timestamps are never pre-epoch.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_civil_from_ms">civil_from_ms</a>(timestamp_ms: u64): (u64, u64, u64)
</code></pre>




<h2 id="sui_allowance_days_in_month">Function <span class="code-inline">days_in_month</span></h2>

Companion to <span class="code-inline"><a href="../sui_sui/allowance#sui_allowance_civil_from_ms">civil_from_ms</a></span>, following the same reference:
https://howardhinnant.github.io/date_algorithms.html#last_day_of_month


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/allowance#sui_allowance_days_in_month">days_in_month</a>(year: u64, month: u64): u64
</code></pre>




<h2 id="sui_allowance_assert_app">Function <span class="code-inline">assert_app</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_assert_app">assert_app</a>&lt;T, A&gt;(self: &<a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;T&gt;)
</code></pre>




<h2 id="sui_allowance_consume">Function <span class="code-inline">consume</span></h2>

Central logic for policy checks and accounting, including the check of the
spender. NB: Any app checks must be done beforehand by the caller.


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_consume">consume</a>&lt;T: store&gt;(self: &<b>mut</b> <a href="../sui_sui/allowance#sui_allowance_Allowance">sui::allowance::Allowance</a>&lt;T&gt;, w: <a href="../sui_sui/allowance#sui_allowance_AllowanceWithdrawal">sui::allowance::AllowanceWithdrawal</a>&lt;T&gt;, <a href="../sui_sui/clock#sui_clock">clock</a>: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal">sui::funds_accumulator::Withdrawal</a>&lt;T&gt;
</code></pre>




<h2 id="sui_allowance_new_rate_limit">Function <span class="code-inline">new_rate_limit</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_new_rate_limit">new_rate_limit</a>(limit: u256, window: <a href="../sui_sui/allowance#sui_allowance_Window">sui::allowance::Window</a>): <a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>
</code></pre>




<h2 id="sui_allowance_charge">Function <span class="code-inline">charge</span></h2>

Records <span class="code-inline">amount</span> against the limit, aborting if it does not fit.


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_charge">charge</a>(self: &<b>mut</b> <a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>, amount: u256, now_ms: u64)
</code></pre>




<h2 id="sui_allowance_index_at">Function <span class="code-inline">index_at</span></h2>

Which window <span class="code-inline">now_ms</span> falls in, numbered from <span class="code-inline">anchor_ms</span> (0 = first).


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_index_at">index_at</a>(self: &<a href="../sui_sui/allowance#sui_allowance_Window">sui::allowance::Window</a>, anchor_ms: u64, now_ms: u64): u64
</code></pre>




<h2 id="sui_allowance_elapsed_windows">Function <span class="code-inline">elapsed_windows</span></h2>

Which <span class="code-inline">months</span>-month window <span class="code-inline">now_ms</span> falls in, counting from <span class="code-inline">anchor_ms</span>
(0 = the window the anchor itself is in).


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_elapsed_windows">elapsed_windows</a>(anchor_ms: u64, now_ms: u64, months: u8): u64
</code></pre>




<h2 id="sui_allowance_is_leap_year">Function <span class="code-inline">is_leap_year</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_is_leap_year">is_leap_year</a>(year: u64): bool
</code></pre>




<h2 id="sui_allowance_new_settings">Function <span class="code-inline">new_settings</span></h2>

Builds and validates settings. Rejects allowances that are unbounded in amount or in time.


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_new_settings">new_settings</a>(<a href="../sui_sui/allowance#sui_allowance_funder">funder</a>: <b>address</b>, <a href="../sui_sui/allowance#sui_allowance_spender">spender</a>: <b>address</b>, <a href="../sui_sui/allowance#sui_allowance_app">app</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_std/type_name#std_type_name_TypeName">std::type_name::TypeName</a>&gt;, <a href="../sui_sui/allowance#sui_allowance_lifetime_cap">lifetime_cap</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u256&gt;, <a href="../sui_sui/allowance#sui_allowance_start_timestamp_ms">start_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, <a href="../sui_sui/allowance#sui_allowance_expiration_timestamp_ms">expiration_timestamp_ms</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;u64&gt;, <a href="../sui_sui/allowance#sui_allowance_rate_limit">rate_limit</a>: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/allowance#sui_allowance_RateLimit">sui::allowance::RateLimit</a>&gt;, <a href="../sui_sui/allowance#sui_allowance_name">name</a>: <a href="../sui_std/string#std_string_String">std::string::String</a>): <a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>
</code></pre>




<h2 id="sui_allowance_share_new">Function <span class="code-inline">share_new</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/allowance#sui_allowance_share_new">share_new</a>&lt;T&gt;(settings: <a href="../sui_sui/allowance#sui_allowance_Settings">sui::allowance::Settings</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



