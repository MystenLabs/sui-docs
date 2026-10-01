---
title: Module bridge::chain_ids
sidebar_label: chain_ids
---

<pre><code><b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>

<h2 id="bridge_chain_ids_BridgeRoute">Struct <span class="code-inline">BridgeRoute</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">BridgeRoute</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">source: u8</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">destination: u8</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_SUI_MAINNET">SUI_MAINNET</a>: u8 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_SUI_TESTNET">SUI_TESTNET</a>: u8 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_SUI_CUSTOM">SUI_CUSTOM</a>: u8 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_ETH_MAINNET">ETH_MAINNET</a>: u8 = 10;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_ETH_SEPOLIA">ETH_SEPOLIA</a>: u8 = 11;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_ETH_CUSTOM">ETH_CUSTOM</a>: u8 = 12;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_EInvalidBridgeRoute">EInvalidBridgeRoute</a>: u64 = 0;
</code></pre>


<h2 id="bridge_chain_ids_sui_mainnet">Function <span class="code-inline">sui_mainnet</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_sui_mainnet">sui_mainnet</a>(): u8
</code></pre>




<h2 id="bridge_chain_ids_sui_testnet">Function <span class="code-inline">sui_testnet</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_sui_testnet">sui_testnet</a>(): u8
</code></pre>




<h2 id="bridge_chain_ids_sui_custom">Function <span class="code-inline">sui_custom</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_sui_custom">sui_custom</a>(): u8
</code></pre>




<h2 id="bridge_chain_ids_eth_mainnet">Function <span class="code-inline">eth_mainnet</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_eth_mainnet">eth_mainnet</a>(): u8
</code></pre>




<h2 id="bridge_chain_ids_eth_sepolia">Function <span class="code-inline">eth_sepolia</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_eth_sepolia">eth_sepolia</a>(): u8
</code></pre>




<h2 id="bridge_chain_ids_eth_custom">Function <span class="code-inline">eth_custom</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_eth_custom">eth_custom</a>(): u8
</code></pre>




<h2 id="bridge_chain_ids_route_source">Function <span class="code-inline">route_source</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_route_source">route_source</a>(route: &<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>): &u8
</code></pre>




<h2 id="bridge_chain_ids_route_destination">Function <span class="code-inline">route_destination</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_route_destination">route_destination</a>(route: &<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>): &u8
</code></pre>




<h2 id="bridge_chain_ids_assert_valid_chain_id">Function <span class="code-inline">assert_valid_chain_id</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_assert_valid_chain_id">assert_valid_chain_id</a>(id: u8)
</code></pre>




<h2 id="bridge_chain_ids_valid_routes">Function <span class="code-inline">valid_routes</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_valid_routes">valid_routes</a>(): vector&lt;<a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>&gt;
</code></pre>




<h2 id="bridge_chain_ids_is_valid_route">Function <span class="code-inline">is_valid_route</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_is_valid_route">is_valid_route</a>(source: u8, destination: u8): bool
</code></pre>




<h2 id="bridge_chain_ids_get_route">Function <span class="code-inline">get_route</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/chain_ids#bridge_chain_ids_get_route">get_route</a>(source: u8, destination: u8): <a href="../sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute">bridge::chain_ids::BridgeRoute</a>
</code></pre>



