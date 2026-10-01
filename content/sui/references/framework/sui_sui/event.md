---
title: Module sui::event
sidebar_label: event
---

Events module. Defines the <span class="code-inline"><a href="../sui_sui/event#sui_event_emit">sui::event::emit</a></span> function which
creates and sends a custom MoveEvent as a part of the effects
certificate of the transaction.

Every MoveEvent has the following properties:
 - sender
 - type signature (<span class="code-inline">T</span>)
 - event data (the value of <span class="code-inline">T</span>)
 - timestamp (local to a node)
 - transaction digest

Example:
```
module my::marketplace \{
   use sui::event;
   /* ... */
   struct ItemPurchased has copy, drop {
     item_id: ID, buyer: address
   \}
   entry fun buy(/* .... */) \{
      /* ... */
      event::emit(ItemPurchased { item_id: ..., buyer: .... \})
   }
}
```

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
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_event_emit">Function <span class="code-inline">emit</span></h2>

Emit a custom Move event, sending the data offchain.

Used for creating custom indexes and tracking onchain
activity in a way that suits a specific application the most.

The type <span class="code-inline">T</span> is the main way to index the event, and can contain
phantom parameters, eg <span class="code-inline"><a href="../sui_sui/event#sui_event_emit">emit</a>(MyEvent&lt;<b>phantom</b> T&gt;)</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/event#sui_event_emit">emit</a>&lt;T: <b>copy</b>, drop&gt;(<a href="../sui_sui/event#sui_event">event</a>: T)
</code></pre>




<h2 id="sui_event_emit_authenticated">Function <span class="code-inline">emit_authenticated</span></h2>

Emits a custom Move event which can be authenticated by a light client.

This method emits the authenticated event to the event stream for the Move package that
defines the event type <span class="code-inline">T</span>.<br/>
Only the package that defines the type <span class="code-inline">T</span> can emit authenticated events to this stream.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/event#sui_event_emit_authenticated">emit_authenticated</a>&lt;T: <b>copy</b>, drop&gt;(<a href="../sui_sui/event#sui_event">event</a>: T)
</code></pre>




<h2 id="sui_event_emit_authenticated_impl">Function <span class="code-inline">emit_authenticated_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/event#sui_event_emit_authenticated_impl">emit_authenticated_impl</a>&lt;StreamHeadT, T: <b>copy</b>, drop&gt;(accumulator_id: <b>address</b>, stream: <b>address</b>, <a href="../sui_sui/event#sui_event">event</a>: T)
</code></pre>



