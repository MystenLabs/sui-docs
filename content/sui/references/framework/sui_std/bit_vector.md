---
title: Module std::bit_vector
sidebar_label: bit_vector
---

<h2 id="std_bit_vector_BitVector">Struct <span class="code-inline">BitVector</span></h2>


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/bit_vector#std_bit_vector_BitVector">BitVector</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline"><a href="../sui_std/bit_vector#std_bit_vector_length">length</a>: <a href="../sui_std/u64#std_u64">u64</a></span>
</dt>
<dd>
</dd>
<dt>
<span class="code-inline">bit_field: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/bool#std_bool">bool</a>&gt;</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

The provided index is out of bounds


<pre><code><b>const</b> <a href="../sui_std/bit_vector#std_bit_vector_EINDEX">EINDEX</a>: <a href="../sui_std/u64#std_u64">u64</a> = 131072;
</code></pre>

An invalid length of bitvector was given


<pre><code><b>const</b> <a href="../sui_std/bit_vector#std_bit_vector_ELENGTH">ELENGTH</a>: <a href="../sui_std/u64#std_u64">u64</a> = 131073;
</code></pre>

<pre><code><b>const</b> <a href="../sui_std/bit_vector#std_bit_vector_WORD_SIZE">WORD_SIZE</a>: <a href="../sui_std/u64#std_u64">u64</a> = 1;
</code></pre>

The maximum allowed bitvector size


<pre><code><b>const</b> <a href="../sui_std/bit_vector#std_bit_vector_MAX_SIZE">MAX_SIZE</a>: <a href="../sui_std/u64#std_u64">u64</a> = 1024;
</code></pre>


<h2 id="std_bit_vector_new">Function <span class="code-inline">new</span></h2>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bit_vector#std_bit_vector_new">new</a>(<a href="../sui_std/bit_vector#std_bit_vector_length">length</a>: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/bit_vector#std_bit_vector_BitVector">std::bit_vector::BitVector</a>
</code></pre>




<h2 id="std_bit_vector_set">Function <span class="code-inline">set</span></h2>

Set the bit at <span class="code-inline">bit_index</span> in the <span class="code-inline">bitvector</span> regardless of its previous state.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bit_vector#std_bit_vector_set">set</a>(bitvector: &<b>mut</b> <a href="../sui_std/bit_vector#std_bit_vector_BitVector">std::bit_vector::BitVector</a>, bit_index: <a href="../sui_std/u64#std_u64">u64</a>)
</code></pre>




<h2 id="std_bit_vector_unset">Function <span class="code-inline">unset</span></h2>

Unset the bit at <span class="code-inline">bit_index</span> in the <span class="code-inline">bitvector</span> regardless of its previous state.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bit_vector#std_bit_vector_unset">unset</a>(bitvector: &<b>mut</b> <a href="../sui_std/bit_vector#std_bit_vector_BitVector">std::bit_vector::BitVector</a>, bit_index: <a href="../sui_std/u64#std_u64">u64</a>)
</code></pre>




<h2 id="std_bit_vector_shift_left">Function <span class="code-inline">shift_left</span></h2>

Shift the <span class="code-inline">bitvector</span> left by <span class="code-inline">amount</span>. If <span class="code-inline">amount</span> is greater than the
bitvector's length the bitvector will be zeroed out.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bit_vector#std_bit_vector_shift_left">shift_left</a>(bitvector: &<b>mut</b> <a href="../sui_std/bit_vector#std_bit_vector_BitVector">std::bit_vector::BitVector</a>, amount: <a href="../sui_std/u64#std_u64">u64</a>)
</code></pre>




<h2 id="std_bit_vector_is_index_set">Function <span class="code-inline">is_index_set</span></h2>

Return the value of the bit at <span class="code-inline">bit_index</span> in the <span class="code-inline">bitvector</span>. <span class="code-inline"><b>true</b></span>
represents "1" and <span class="code-inline"><b>false</b></span> represents a 0


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bit_vector#std_bit_vector_is_index_set">is_index_set</a>(bitvector: &<a href="../sui_std/bit_vector#std_bit_vector_BitVector">std::bit_vector::BitVector</a>, bit_index: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/bool#std_bool">bool</a>
</code></pre>




<h2 id="std_bit_vector_length">Function <span class="code-inline">length</span></h2>

Return the length (number of usable bits) of this bitvector


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bit_vector#std_bit_vector_length">length</a>(bitvector: &<a href="../sui_std/bit_vector#std_bit_vector_BitVector">std::bit_vector::BitVector</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>




<h2 id="std_bit_vector_longest_set_sequence_starting_at">Function <span class="code-inline">longest_set_sequence_starting_at</span></h2>

Returns the length of the longest sequence of set bits starting at (and
including) <span class="code-inline">start_index</span> in the <span class="code-inline">bitvector</span>. If there is no such
sequence, then <span class="code-inline">0</span> is returned.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bit_vector#std_bit_vector_longest_set_sequence_starting_at">longest_set_sequence_starting_at</a>(bitvector: &<a href="../sui_std/bit_vector#std_bit_vector_BitVector">std::bit_vector::BitVector</a>, start_index: <a href="../sui_std/u64#std_u64">u64</a>): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>



