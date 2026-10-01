---
title: Module sui::deny_list
sidebar_label: deny_list
---

Defines the <span class="code-inline"><a href="../sui_sui/deny_list#sui_deny_list_DenyList">DenyList</a></span> type. The <span class="code-inline"><a href="../sui_sui/deny_list#sui_deny_list_DenyList">DenyList</a></span> shared object is used to restrict access to
instances of certain core types from being used as inputs by specified addresses in the deny
list.

<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement">sui::accumulator_settlement</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bag#sui_bag">sui::bag</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/config#sui_config">sui::config</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field">sui::dynamic_object_field</a>;
<b>use</b> <a href="../sui_sui/event#sui_event">sui::event</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>

<h2 id="sui_deny_list_DenyList">Struct <span class="code-inline">DenyList</span></h2>

A shared object that stores the addresses that are blocked for a given core type.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">DenyList</a> <b>has</b> key
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
<span class="code-inline">lists: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></span>
</dt>
<dd>
 The individual deny lists.
</dd>
</dl>


</details>

<h2 id="sui_deny_list_ConfigWriteCap">Struct <span class="code-inline">ConfigWriteCap</span></h2>

The capability used to write to the deny list config. Ensures that the Configs for the.<br/>
DenyList are modified only by this module.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/deny_list#sui_deny_list_ConfigWriteCap">ConfigWriteCap</a> <b>has</b> drop
</code></pre>




<h2 id="sui_deny_list_ConfigKey">Struct <span class="code-inline">ConfigKey</span></h2>

The dynamic object field key used to store the <span class="code-inline">Config</span> for a given type, essentially a
<span class="code-inline">(per_type_index, per_type_key)</span> pair.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/deny_list#sui_deny_list_ConfigKey">ConfigKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">per_type_index: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">per_type_key: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_deny_list_AddressKey">Struct <span class="code-inline">AddressKey</span></h2>

The setting key used to store the deny list for a given address in the <span class="code-inline">Config</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/deny_list#sui_deny_list_AddressKey">AddressKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: <b>address</b></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_deny_list_GlobalPauseKey">Struct <span class="code-inline">GlobalPauseKey</span></h2>

The setting key used to store the global pause setting in the <span class="code-inline">Config</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/deny_list#sui_deny_list_GlobalPauseKey">GlobalPauseKey</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>




<h2 id="sui_deny_list_PerTypeConfigCreated">Struct <span class="code-inline">PerTypeConfigCreated</span></h2>

The event emitted when a new <span class="code-inline">Config</span> is created for a given type. This can be useful for
tracking the <span class="code-inline">ID</span> of a type's <span class="code-inline">Config</span> object.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/deny_list#sui_deny_list_PerTypeConfigCreated">PerTypeConfigCreated</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">key: <a href="../sui_sui/deny_list#sui_deny_list_ConfigKey">sui::deny_list::ConfigKey</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">config_id: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_deny_list_PerTypeList">Struct <span class="code-inline">PerTypeList</span></h2>

Stores the addresses that are denied for a given core type.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/deny_list#sui_deny_list_PerTypeList">PerTypeList</a> <b>has</b> key, store
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
<span class="code-inline">denied_count: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;<b>address</b>, u64&gt;</span>
</dt>
<dd>
 Number of object types that have been banned for a given address.<br/>
 Used to quickly skip checks for most addresses.
</dd>
<dt>
<span class="code-inline">denied_addresses: <a href="../sui_sui/table#sui_table_Table">sui::table::Table</a>&lt;vector&lt;u8&gt;, <a href="../sui_sui/vec_set#sui_vec_set_VecSet">sui::vec_set::VecSet</a>&lt;<b>address</b>&gt;&gt;</span>
</dt>
<dd>
 Set of addresses that are banned for a given type.<br/>
 For example with <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a></span>: If addresses A and B are banned from using
 "0...0123::my_coin::MY_COIN", this will be "0...0123::my_coin::MY_COIN" -> \{A, B\}.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Trying to create a deny list object when not called by the system address.


<pre><code><b>const</b> <a href="../sui_sui/deny_list#sui_deny_list_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>

The specified address to be removed is not already in the deny list.


<pre><code><b>const</b> <a href="../sui_sui/deny_list#sui_deny_list_ENotDenied">ENotDenied</a>: u64 = 1;
</code></pre>

The specified address cannot be added to the deny list.


<pre><code><b>const</b> <a href="../sui_sui/deny_list#sui_deny_list_EInvalidAddress">EInvalidAddress</a>: u64 = 1;
</code></pre>

The index into the deny list vector for the <span class="code-inline"><a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a></span> type.


<pre><code><b>const</b> <a href="../sui_sui/deny_list#sui_deny_list_COIN_INDEX">COIN_INDEX</a>: u64 = 0;
</code></pre>

These addresses are reserved and cannot be added to the deny list.<br/>
The addresses listed are well known package and object addresses. So it would be
meaningless to add them to the deny list.


<pre><code><b>const</b> <a href="../sui_sui/deny_list#sui_deny_list_RESERVED">RESERVED</a>: vector&lt;<b>address</b>&gt; = vector[0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf, 0x403, 0xdee9];
</code></pre>


<h2 id="sui_deny_list_v2_add">Function <span class="code-inline">v2_add</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_add">v2_add</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, addr: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_deny_list_v2_remove">Function <span class="code-inline">v2_remove</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_remove">v2_remove</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, addr: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_deny_list_v2_contains_current_epoch">Function <span class="code-inline">v2_contains_current_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_contains_current_epoch">v2_contains_current_epoch</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, addr: <b>address</b>, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): bool
</code></pre>




<h2 id="sui_deny_list_v2_contains_next_epoch">Function <span class="code-inline">v2_contains_next_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_contains_next_epoch">v2_contains_next_epoch</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, addr: <b>address</b>): bool
</code></pre>




<h2 id="sui_deny_list_v2_enable_global_pause">Function <span class="code-inline">v2_enable_global_pause</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_enable_global_pause">v2_enable_global_pause</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_deny_list_v2_disable_global_pause">Function <span class="code-inline">v2_disable_global_pause</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_disable_global_pause">v2_disable_global_pause</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_deny_list_v2_is_global_pause_enabled_current_epoch">Function <span class="code-inline">v2_is_global_pause_enabled_current_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_is_global_pause_enabled_current_epoch">v2_is_global_pause_enabled_current_epoch</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): bool
</code></pre>




<h2 id="sui_deny_list_v2_is_global_pause_enabled_next_epoch">Function <span class="code-inline">v2_is_global_pause_enabled_next_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v2_is_global_pause_enabled_next_epoch">v2_is_global_pause_enabled_next_epoch</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;): bool
</code></pre>




<h2 id="sui_deny_list_migrate_v1_to_v2">Function <span class="code-inline">migrate_v1_to_v2</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_migrate_v1_to_v2">migrate_v1_to_v2</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_deny_list_add_per_type_config">Function <span class="code-inline">add_per_type_config</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_add_per_type_config">add_per_type_config</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_deny_list_borrow_per_type_config_mut">Function <span class="code-inline">borrow_per_type_config_mut</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_borrow_per_type_config_mut">borrow_per_type_config_mut</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;): &<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;<a href="../sui_sui/deny_list#sui_deny_list_ConfigWriteCap">sui::deny_list::ConfigWriteCap</a>&gt;
</code></pre>




<h2 id="sui_deny_list_borrow_per_type_config">Function <span class="code-inline">borrow_per_type_config</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_borrow_per_type_config">borrow_per_type_config</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;): &<a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;<a href="../sui_sui/deny_list#sui_deny_list_ConfigWriteCap">sui::deny_list::ConfigWriteCap</a>&gt;
</code></pre>




<h2 id="sui_deny_list_per_type_exists">Function <span class="code-inline">per_type_exists</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_per_type_exists">per_type_exists</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, per_type_key: vector&lt;u8&gt;): bool
</code></pre>




<h2 id="sui_deny_list_per_type_config_entry">Macro function <span class="code-inline">per_type_config_entry</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_per_type_config_entry">per_type_config_entry</a>($<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, $per_type_index: u64, $per_type_key: vector&lt;u8&gt;, $ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): &<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;<a href="../sui_sui/deny_list#sui_deny_list_ConfigWriteCap">sui::deny_list::ConfigWriteCap</a>&gt;
</code></pre>




<h2 id="sui_deny_list_v1_add">Function <span class="code-inline">v1_add</span></h2>

Adds the given address to the deny list of the specified type, preventing it
from interacting with instances of that type as an input to a transaction. For coins,
the type specified is the type of the coin, not the coin type itself. For example,
"00...0123::my_coin::MY_COIN" would be the type, not "00...02::coin::Coin".


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v1_add">v1_add</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, type: vector&lt;u8&gt;, addr: <b>address</b>)
</code></pre>




<h2 id="sui_deny_list_v1_per_type_list_add">Function <span class="code-inline">v1_per_type_list_add</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v1_per_type_list_add">v1_per_type_list_add</a>(list: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_PerTypeList">sui::deny_list::PerTypeList</a>, type: vector&lt;u8&gt;, addr: <b>address</b>)
</code></pre>




<h2 id="sui_deny_list_v1_remove">Function <span class="code-inline">v1_remove</span></h2>

Removes a previously denied address from the list.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/deny_list#sui_deny_list_ENotDenied">ENotDenied</a></span> if the address is not on the list.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v1_remove">v1_remove</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, type: vector&lt;u8&gt;, addr: <b>address</b>)
</code></pre>




<h2 id="sui_deny_list_v1_per_type_list_remove">Function <span class="code-inline">v1_per_type_list_remove</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v1_per_type_list_remove">v1_per_type_list_remove</a>(list: &<b>mut</b> <a href="../sui_sui/deny_list#sui_deny_list_PerTypeList">sui::deny_list::PerTypeList</a>, type: vector&lt;u8&gt;, addr: <b>address</b>)
</code></pre>




<h2 id="sui_deny_list_v1_contains">Function <span class="code-inline">v1_contains</span></h2>

Returns true iff the given address is denied for the given type.


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v1_contains">v1_contains</a>(<a href="../sui_sui/deny_list#sui_deny_list">deny_list</a>: &<a href="../sui_sui/deny_list#sui_deny_list_DenyList">sui::deny_list::DenyList</a>, per_type_index: u64, type: vector&lt;u8&gt;, addr: <b>address</b>): bool
</code></pre>




<h2 id="sui_deny_list_v1_per_type_list_contains">Function <span class="code-inline">v1_per_type_list_contains</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_v1_per_type_list_contains">v1_per_type_list_contains</a>(list: &<a href="../sui_sui/deny_list#sui_deny_list_PerTypeList">sui::deny_list::PerTypeList</a>, type: vector&lt;u8&gt;, addr: <b>address</b>): bool
</code></pre>




<h2 id="sui_deny_list_create">Function <span class="code-inline">create</span></h2>

Creation of the deny list object is restricted to the system address
via a system transaction.


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_create">create</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_deny_list_per_type_list">Function <span class="code-inline">per_type_list</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/deny_list#sui_deny_list_per_type_list">per_type_list</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/deny_list#sui_deny_list_PerTypeList">sui::deny_list::PerTypeList</a>
</code></pre>



