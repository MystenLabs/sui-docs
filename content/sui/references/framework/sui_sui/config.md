---
title: Module sui::config
sidebar_label: config
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_config_Config">Struct <span class="code-inline">Config</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/config#sui_config_Config">Config</a>&lt;<b>phantom</b> WriteCap&gt; <b>has</b> key
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

<h2 id="sui_config_Setting">Struct <span class="code-inline">Setting</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/config#sui_config_Setting">Setting</a>&lt;Value: <b>copy</b>, drop, store&gt; <b>has</b> drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">data: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;<a href="../sui_sui/config#sui_config_SettingData">sui::config::SettingData</a>&lt;Value&gt;&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_config_SettingData">Struct <span class="code-inline">SettingData</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/config#sui_config_SettingData">SettingData</a>&lt;Value: <b>copy</b>, drop, store&gt; <b>has</b> drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">newer_value_epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">newer_value: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">older_value_opt: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/config#sui_config_EAlreadySetForEpoch">EAlreadySetForEpoch</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/config#sui_config_ENotSetForEpoch">ENotSetForEpoch</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/config#sui_config_EBCSSerializationFailure">EBCSSerializationFailure</a>: u64 = 2;
</code></pre>


<h2 id="sui_config_new">Function <span class="code-inline">new</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_new">new</a>&lt;WriteCap&gt;(_cap: &<b>mut</b> WriteCap, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;
</code></pre>




<h2 id="sui_config_share">Function <span class="code-inline">share</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_share">share</a>&lt;WriteCap&gt;(<a href="../sui_sui/config#sui_config">config</a>: <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;)
</code></pre>




<h2 id="sui_config_transfer">Function <span class="code-inline">transfer</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/transfer#sui_transfer">transfer</a>&lt;WriteCap&gt;(<a href="../sui_sui/config#sui_config">config</a>: <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;, owner: <b>address</b>)
</code></pre>




<h2 id="sui_config_add_for_next_epoch">Function <span class="code-inline">add_for_next_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_add_for_next_epoch">add_for_next_epoch</a>&lt;WriteCap, Name: <b>copy</b>, drop, store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: &<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;, _cap: &<b>mut</b> WriteCap, name: Name, value: Value, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>




<h2 id="sui_config_remove_for_next_epoch">Function <span class="code-inline">remove_for_next_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_remove_for_next_epoch">remove_for_next_epoch</a>&lt;WriteCap, Name: <b>copy</b>, drop, store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: &<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;, _cap: &<b>mut</b> WriteCap, name: Name, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>




<h2 id="sui_config_exists_with_type">Function <span class="code-inline">exists_with_type</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_exists_with_type">exists_with_type</a>&lt;WriteCap, Name: <b>copy</b>, drop, store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: &<a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;, name: Name): bool
</code></pre>




<h2 id="sui_config_exists_with_type_for_next_epoch">Function <span class="code-inline">exists_with_type_for_next_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_exists_with_type_for_next_epoch">exists_with_type_for_next_epoch</a>&lt;WriteCap, Name: <b>copy</b>, drop, store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: &<a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;, name: Name, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): bool
</code></pre>




<h2 id="sui_config_borrow_for_next_epoch_mut">Function <span class="code-inline">borrow_for_next_epoch_mut</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_borrow_for_next_epoch_mut">borrow_for_next_epoch_mut</a>&lt;WriteCap, Name: <b>copy</b>, drop, store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: &<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;, _cap: &<b>mut</b> WriteCap, name: Name, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): &<b>mut</b> Value
</code></pre>




<h2 id="sui_config_read_setting_for_next_epoch">Function <span class="code-inline">read_setting_for_next_epoch</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_read_setting_for_next_epoch">read_setting_for_next_epoch</a>&lt;WriteCap, Name: <b>copy</b>, drop, store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: &<a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;WriteCap&gt;, name: Name): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>




<h2 id="sui_config_entry">Macro function <span class="code-inline">entry</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>macro</b> <b>fun</b> <b>entry</b>&lt;$WriteCap, $Name: <b>copy</b>, drop, store, $Value: <b>copy</b>, drop, store&gt;($<a href="../sui_sui/config#sui_config">config</a>: &<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;$WriteCap&gt;, $cap: &<b>mut</b> $WriteCap, $name: $Name, $initial_for_next_epoch: |&<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;$WriteCap&gt;, &<b>mut</b> $WriteCap, &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>| -&gt; $Value, $ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): &<b>mut</b> $Value
</code></pre>




<h2 id="sui_config_update">Macro function <span class="code-inline">update</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>macro</b> <b>fun</b> <a href="../sui_sui/config#sui_config_update">update</a>&lt;$WriteCap, $Name: <b>copy</b>, drop, store, $Value: <b>copy</b>, drop, store&gt;($<a href="../sui_sui/config#sui_config">config</a>: &<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;$WriteCap&gt;, $cap: &<b>mut</b> $WriteCap, $name: $Name, $initial_for_next_epoch: |&<b>mut</b> <a href="../sui_sui/config#sui_config_Config">sui::config::Config</a>&lt;$WriteCap&gt;, &<b>mut</b> $WriteCap, &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>| -&gt; $Value, $update_for_next_epoch: |<a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;$Value&gt;, &<b>mut</b> $Value| -&gt; (), $ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_config_read_setting">Function <span class="code-inline">read_setting</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/config#sui_config_read_setting">read_setting</a>&lt;Name: <b>copy</b>, drop, store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, name: Name, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>




<h2 id="sui_config_read_setting_impl">Function <span class="code-inline">read_setting_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/config#sui_config_read_setting_impl">read_setting_impl</a>&lt;FieldSettingValue: key, SettingValue: store, SettingDataValue: store, Value: <b>copy</b>, drop, store&gt;(<a href="../sui_sui/config#sui_config">config</a>: <b>address</b>, name: <b>address</b>, current_epoch: u64): <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;Value&gt;
</code></pre>



