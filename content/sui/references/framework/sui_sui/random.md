---
title: Module sui::random
sidebar_label: random
---

This module provides functionality for generating secure randomness.

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/hmac#sui_hmac">sui::hmac</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/versioned#sui_versioned">sui::versioned</a>;
</code></pre>

<h2 id="sui_random_Random">Struct <span class="code-inline">Random</span></h2>

Singleton shared object which stores the global randomness state.<br/>
The actual state is stored in a versioned inner field.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/random#sui_random_Random">Random</a> <b>has</b> key
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
<span class="code-inline">inner: <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a></span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_random_RandomInner">Struct <span class="code-inline">RandomInner</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/random#sui_random_RandomInner">RandomInner</a> <b>has</b> store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">version: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">epoch: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">randomness_round: u64</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">random_bytes: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_random_RandomGenerator">Struct <span class="code-inline">RandomGenerator</span></h2>

Unique randomness generator, derived from the global randomness.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/random#sui_random_RandomGenerator">RandomGenerator</a> <b>has</b> drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">seed: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">counter: u16</span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">buffer: vector&lt;u8&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_EWrongInnerVersion">EWrongInnerVersion</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_EInvalidRandomnessUpdate">EInvalidRandomnessUpdate</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_EInvalidRange">EInvalidRange</a>: u64 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_EInvalidLength">EInvalidLength</a>: u64 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_CURRENT_VERSION">CURRENT_VERSION</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_RAND_OUTPUT_LEN">RAND_OUTPUT_LEN</a>: u16 = 32;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/random#sui_random_U16_MAX">U16_MAX</a>: u64 = 65535;
</code></pre>


<h2 id="sui_random_create">Function <span class="code-inline">create</span></h2>

Create and share the Random object. This function is called exactly once, when
the Random object is first created.<br/>
Can only be called by genesis or change_epoch transactions.


<pre><code><b>fun</b> <a href="../sui_sui/random#sui_random_create">create</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_random_load_inner_mut">Function <span class="code-inline">load_inner_mut</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/random#sui_random_load_inner_mut">load_inner_mut</a>(self: &<b>mut</b> <a href="../sui_sui/random#sui_random_Random">sui::random::Random</a>): &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomInner">sui::random::RandomInner</a>
</code></pre>




<h2 id="sui_random_load_inner">Function <span class="code-inline">load_inner</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/random#sui_random_load_inner">load_inner</a>(self: &<a href="../sui_sui/random#sui_random_Random">sui::random::Random</a>): &<a href="../sui_sui/random#sui_random_RandomInner">sui::random::RandomInner</a>
</code></pre>




<h2 id="sui_random_update_randomness_state">Function <span class="code-inline">update_randomness_state</span></h2>

Record new randomness. Called when executing the RandomnessStateUpdate system
transaction.


<pre><code><b>fun</b> <a href="../sui_sui/random#sui_random_update_randomness_state">update_randomness_state</a>(self: &<b>mut</b> <a href="../sui_sui/random#sui_random_Random">sui::random::Random</a>, new_round: u64, new_bytes: vector&lt;u8&gt;, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>




<h2 id="sui_random_new_generator">Function <span class="code-inline">new_generator</span></h2>

Create a generator. Can be used to derive up to MAX_U16 * 32 random bytes.

Using randomness can be error-prone if you don't observe the subtleties in its correct use, for example, randomness
dependent code might be exploitable to attacks that carefully set the gas budget
in a way that breaks security. For more information, see:
https://docs.sui.io/guides/developer/advanced/randomness-onchain


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_new_generator">new_generator</a>(r: &<a href="../sui_sui/random#sui_random_Random">sui::random::Random</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>
</code></pre>




<h2 id="sui_random_derive_next_block">Function <span class="code-inline">derive_next_block</span></h2>

Get the next block of 32 random bytes.


<pre><code><b>fun</b> <a href="../sui_sui/random#sui_random_derive_next_block">derive_next_block</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_random_generate_bytes">Function <span class="code-inline">generate_bytes</span></h2>

Generate n random bytes.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_bytes">generate_bytes</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, num_of_bytes: u16): vector&lt;u8&gt;
</code></pre>




<h2 id="sui_random_uint_from_bytes">Macro function <span class="code-inline">uint_from_bytes</span></h2>


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/random#sui_random_uint_from_bytes">uint_from_bytes</a>&lt;$T: drop&gt;($g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, $num_of_bytes: u8): $T
</code></pre>




<h2 id="sui_random_generate_u256">Function <span class="code-inline">generate_u256</span></h2>

Generate a u256.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u256">generate_u256</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): u256
</code></pre>




<h2 id="sui_random_generate_u128">Function <span class="code-inline">generate_u128</span></h2>

Generate a u128.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u128">generate_u128</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): u128
</code></pre>




<h2 id="sui_random_generate_u64">Function <span class="code-inline">generate_u64</span></h2>

Generate a u64.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u64">generate_u64</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): u64
</code></pre>




<h2 id="sui_random_generate_u32">Function <span class="code-inline">generate_u32</span></h2>

Generate a u32.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u32">generate_u32</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): u32
</code></pre>




<h2 id="sui_random_generate_u16">Function <span class="code-inline">generate_u16</span></h2>

Generate a u16.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u16">generate_u16</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): u16
</code></pre>




<h2 id="sui_random_generate_u8">Function <span class="code-inline">generate_u8</span></h2>

Generate a u8.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u8">generate_u8</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): u8
</code></pre>




<h2 id="sui_random_generate_bool">Function <span class="code-inline">generate_bool</span></h2>

Generate a boolean.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_bool">generate_bool</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>): bool
</code></pre>




<h2 id="sui_random_uint_in_range">Macro function <span class="code-inline">uint_in_range</span></h2>

Helper macro to generate a random uint in [min, max] using a random number with num_of_bytes bytes.<br/>
Assumes that the caller verified the inputs, and uses num_of_bytes to control the bias (e.g., 8 bytes larger
than the actual type used by the caller function to limit the bias by 2^\{-64\}).


<pre><code><b>macro</b> <b>fun</b> <a href="../sui_sui/random#sui_random_uint_in_range">uint_in_range</a>&lt;$T: drop&gt;($g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, $min: $T, $max: $T, $num_of_bytes: u8): $T
</code></pre>




<h2 id="sui_random_generate_u128_in_range">Function <span class="code-inline">generate_u128_in_range</span></h2>

Generate a random u128 in [min, max] (with a bias of 2^\{-64\}).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u128_in_range">generate_u128_in_range</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, min: u128, max: u128): u128
</code></pre>




<h2 id="sui_random_generate_u64_in_range">Function <span class="code-inline">generate_u64_in_range</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u64_in_range">generate_u64_in_range</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, min: u64, max: u64): u64
</code></pre>




<h2 id="sui_random_generate_u32_in_range">Function <span class="code-inline">generate_u32_in_range</span></h2>

Generate a random u32 in [min, max] (with a bias of 2^\{-64\}).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u32_in_range">generate_u32_in_range</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, min: u32, max: u32): u32
</code></pre>




<h2 id="sui_random_generate_u16_in_range">Function <span class="code-inline">generate_u16_in_range</span></h2>

Generate a random u16 in [min, max] (with a bias of 2^\{-64\}).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u16_in_range">generate_u16_in_range</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, min: u16, max: u16): u16
</code></pre>




<h2 id="sui_random_generate_u8_in_range">Function <span class="code-inline">generate_u8_in_range</span></h2>

Generate a random u8 in [min, max] (with a bias of 2^\{-64\}).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_generate_u8_in_range">generate_u8_in_range</a>(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, min: u8, max: u8): u8
</code></pre>




<h2 id="sui_random_shuffle">Function <span class="code-inline">shuffle</span></h2>

Shuffle a vector using the random generator (Fisher–Yates/Knuth shuffle).


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/random#sui_random_shuffle">shuffle</a>&lt;T&gt;(g: &<b>mut</b> <a href="../sui_sui/random#sui_random_RandomGenerator">sui::random::RandomGenerator</a>, v: &<b>mut</b> vector&lt;T&gt;)
</code></pre>



