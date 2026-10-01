---
title: Module sui::transfer
sidebar_label: transfer
---

<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_transfer_Receiving">Struct <span class="code-inline">Receiving</span></h2>

This represents the ability to <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_receive">receive</a></span> an object of type <span class="code-inline">T</span>.<br/>
This type is ephemeral per-transaction and cannot be stored on-chain.<br/>
This does not represent the obligation to receive the object that it
references, but simply the ability to receive the object with object ID
<span class="code-inline">id</span> at version <span class="code-inline">version</span> if you can prove mutable access to the parent
object during the transaction.<br/>
Internals of this struct are opaque outside this module.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/transfer#sui_transfer_Receiving">Receiving</a>&lt;<b>phantom</b> T: key&gt; <b>has</b> drop
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
<span class="code-inline">version: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

Shared an object that was previously created. Shared objects must currently
be constructed in the transaction they are created.


<pre><code><b>const</b> <a href="../sui_sui/transfer#sui_transfer_ESharedNonNewObject">ESharedNonNewObject</a>: u64 = 0;
</code></pre>

Serialization of the object failed.


<pre><code><b>const</b> <a href="../sui_sui/transfer#sui_transfer_EBCSSerializationFailure">EBCSSerializationFailure</a>: u64 = 1;
</code></pre>

The object being received is not of the expected type.


<pre><code><b>const</b> <a href="../sui_sui/transfer#sui_transfer_EReceivingObjectTypeMismatch">EReceivingObjectTypeMismatch</a>: u64 = 2;
</code></pre>

Represents both the case where the object does not exist and the case where the object is not
able to be accessed through the parent that is passed-in.


<pre><code><b>const</b> <a href="../sui_sui/transfer#sui_transfer_EUnableToReceiveObject">EUnableToReceiveObject</a>: u64 = 3;
</code></pre>

Shared object operations such as wrapping, freezing, and converting to owned are not allowed.


<pre><code><b>const</b> <a href="../sui_sui/transfer#sui_transfer_ESharedObjectOperationNotSupported">ESharedObjectOperationNotSupported</a>: u64 = 4;
</code></pre>

Operation is not yet supported by the network. The functionality might still be in development.


<pre><code><b>const</b> <a href="../sui_sui/transfer#sui_transfer_ENotSupported">ENotSupported</a>: u64 = 5;
</code></pre>

<pre><code>#[error]
<b>const</b> <a href="../sui_sui/transfer#sui_transfer_EInvalidPartyPermissions">EInvalidPartyPermissions</a>: vector&lt;u8&gt; = b"Party <a href="../sui_sui/transfer#sui_transfer">transfer</a> is currently limited to one <a href="../sui_sui/party#sui_party">party</a>.";
</code></pre>


<h2 id="sui_transfer_transfer">Function <span class="code-inline">transfer</span></h2>

Transfer ownership of <span class="code-inline">obj</span> to <span class="code-inline">recipient</span>. <span class="code-inline">obj</span> must have the <span class="code-inline">key</span> attribute,
which (in turn) ensures that <span class="code-inline">obj</span> has a globally unique ID. Note that if the recipient
address represents an object ID, the <span class="code-inline">obj</span> sent will be inaccessible after the transfer
(though they will be retrievable at a future date once new features are added).<br/>
This function has custom rules performed by the Sui Move bytecode verifier that ensures
that <span class="code-inline">T</span> is an object defined in the module where <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> is invoked. Use
<span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_public_transfer">public_transfer</a></span> to transfer an object with <span class="code-inline">store</span> outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer">transfer</a>&lt;T: key&gt;(obj: T, recipient: <b>address</b>)
</code></pre>




<h2 id="sui_transfer_public_transfer">Function <span class="code-inline">public_transfer</span></h2>

Transfer ownership of <span class="code-inline">obj</span> to <span class="code-inline">recipient</span>. <span class="code-inline">obj</span> must have the <span class="code-inline">key</span> attribute,
which (in turn) ensures that <span class="code-inline">obj</span> has a globally unique ID. Note that if the recipient
address represents an object ID, the <span class="code-inline">obj</span> sent will be inaccessible after the transfer
(though they will be retrievable at a future date once new features are added).<br/>
The object must have <span class="code-inline">store</span> to be transferred outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_public_transfer">public_transfer</a>&lt;T: key, store&gt;(obj: T, recipient: <b>address</b>)
</code></pre>




<h2 id="sui_transfer_party_transfer">Function <span class="code-inline">party_transfer</span></h2>

Transfer ownership of <span class="code-inline">obj</span> to the <span class="code-inline"><a href="../sui_sui/party#sui_party">party</a></span>. This transfer behaves similar to both
<span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> and <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_share_object">share_object</a></span>. It is similar to <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> in that the object is authorized for
use only by the recipient(s), in this case the <span class="code-inline"><a href="../sui_sui/party#sui_party">party</a></span>. This means that only the members
can use the object as an input to a transaction. It is similar to <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_share_object">share_object</a></span> two ways. One
in that the object can potentially be used by anyone, as defined by the <span class="code-inline">default</span> permissions of
the <span class="code-inline">Party</span> value. The other in that the object must be used in consensus and cannot be
used in the fast path.<br/>
This function has custom rules performed by the Sui Move bytecode verifier that ensures that <span class="code-inline">T</span>
is an object defined in the module where <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> is invoked. Use <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_public_party_transfer">public_party_transfer</a></span>
to transfer an object with <span class="code-inline">store</span> outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_party_transfer">party_transfer</a>&lt;T: key&gt;(obj: T, <a href="../sui_sui/party#sui_party">party</a>: <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>)
</code></pre>




<h2 id="sui_transfer_public_party_transfer">Function <span class="code-inline">public_party_transfer</span></h2>

Transfer ownership of <span class="code-inline">obj</span> to the <span class="code-inline"><a href="../sui_sui/party#sui_party">party</a></span>. This transfer behaves similar to both
<span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> and <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_share_object">share_object</a></span>. It is similar to <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer">transfer</a></span> in that the object is authorized for
use only by the recipient(s), in this case the <span class="code-inline"><a href="../sui_sui/party#sui_party">party</a></span>. This means that only the members
can use the object as an input to a transaction. It is similar to <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_share_object">share_object</a></span> two ways. One
in that the object can potentially be used by anyone, as defined by the <span class="code-inline">default</span> permissions of
the <span class="code-inline">Party</span> value. The other in that the object must be used in consensus and cannot be
used in the fast path.<br/>
The object must have <span class="code-inline">store</span> to be transferred outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_public_party_transfer">public_party_transfer</a>&lt;T: key, store&gt;(obj: T, <a href="../sui_sui/party#sui_party">party</a>: <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>)
</code></pre>




<h2 id="sui_transfer_freeze_object">Function <span class="code-inline">freeze_object</span></h2>

Freeze <span class="code-inline">obj</span>. After freezing <span class="code-inline">obj</span> becomes immutable and can no longer be transferred or
mutated.<br/>
This function has custom rules performed by the Sui Move bytecode verifier that ensures
that <span class="code-inline">T</span> is an object defined in the module where <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_freeze_object">freeze_object</a></span> is invoked. Use
<span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_public_freeze_object">public_freeze_object</a></span> to freeze an object with <span class="code-inline">store</span> outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_freeze_object">freeze_object</a>&lt;T: key&gt;(obj: T)
</code></pre>




<h2 id="sui_transfer_public_freeze_object">Function <span class="code-inline">public_freeze_object</span></h2>

Freeze <span class="code-inline">obj</span>. After freezing <span class="code-inline">obj</span> becomes immutable and can no longer be transferred or
mutated.<br/>
The object must have <span class="code-inline">store</span> to be frozen outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_public_freeze_object">public_freeze_object</a>&lt;T: key, store&gt;(obj: T)
</code></pre>




<h2 id="sui_transfer_share_object">Function <span class="code-inline">share_object</span></h2>

Turn the given object into a mutable shared object that everyone can access and mutate.<br/>
This is irreversible, i.e. once an object is shared, it will stay shared forever.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_ESharedNonNewObject">ESharedNonNewObject</a></span> of the object being shared was not created in this
transaction. This restriction may be relaxed in the future.<br/>
This function has custom rules performed by the Sui Move bytecode verifier that ensures
that <span class="code-inline">T</span> is an object defined in the module where <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_share_object">share_object</a></span> is invoked. Use
<span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_public_share_object">public_share_object</a></span> to share an object with <span class="code-inline">store</span> outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_share_object">share_object</a>&lt;T: key&gt;(obj: T)
</code></pre>




<h2 id="sui_transfer_public_share_object">Function <span class="code-inline">public_share_object</span></h2>

Turn the given object into a mutable shared object that everyone can access and mutate.<br/>
This is irreversible, i.e. once an object is shared, it will stay shared forever.<br/>
Aborts with <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_ESharedNonNewObject">ESharedNonNewObject</a></span> of the object being shared was not created in this
transaction. This restriction may be relaxed in the future.<br/>
The object must have <span class="code-inline">store</span> to be shared outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_public_share_object">public_share_object</a>&lt;T: key, store&gt;(obj: T)
</code></pre>




<h2 id="sui_transfer_receive">Function <span class="code-inline">receive</span></h2>

Given mutable (i.e., locked) access to the <span class="code-inline">parent</span> and a <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_Receiving">Receiving</a></span> argument
referencing an object of type <span class="code-inline">T</span> owned by <span class="code-inline">parent</span> use the <span class="code-inline">to_receive</span>
argument to receive and return the referenced owned object of type <span class="code-inline">T</span>.<br/>
This function has custom rules performed by the Sui Move bytecode verifier that ensures
that <span class="code-inline">T</span> is an object defined in the module where <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_receive">receive</a></span> is invoked. Use
<span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_public_receive">public_receive</a></span> to receivne an object with <span class="code-inline">store</span> outside of its module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_receive">receive</a>&lt;T: key&gt;(parent: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, to_receive: <a href="../sui_sui/transfer#sui_transfer_Receiving">sui::transfer::Receiving</a>&lt;T&gt;): T
</code></pre>




<h2 id="sui_transfer_public_receive">Function <span class="code-inline">public_receive</span></h2>

Given mutable (i.e., locked) access to the <span class="code-inline">parent</span> and a <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_Receiving">Receiving</a></span> argument
referencing an object of type <span class="code-inline">T</span> owned by <span class="code-inline">parent</span> use the <span class="code-inline">to_receive</span>
argument to receive and return the referenced owned object of type <span class="code-inline">T</span>.<br/>
The object must have <span class="code-inline">store</span> to be received outside of its defining module.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_public_receive">public_receive</a>&lt;T: key, store&gt;(parent: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, to_receive: <a href="../sui_sui/transfer#sui_transfer_Receiving">sui::transfer::Receiving</a>&lt;T&gt;): T
</code></pre>




<h2 id="sui_transfer_receiving_object_id">Function <span class="code-inline">receiving_object_id</span></h2>

Return the object ID that the given <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_Receiving">Receiving</a></span> argument references.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_receiving_object_id">receiving_object_id</a>&lt;T: key&gt;(receiving: &<a href="../sui_sui/transfer#sui_transfer_Receiving">sui::transfer::Receiving</a>&lt;T&gt;): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>




<h2 id="sui_transfer_freeze_object_impl">Function <span class="code-inline">freeze_object_impl</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_freeze_object_impl">freeze_object_impl</a>&lt;T: key&gt;(obj: T)
</code></pre>




<h2 id="sui_transfer_share_object_impl">Function <span class="code-inline">share_object_impl</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_share_object_impl">share_object_impl</a>&lt;T: key&gt;(obj: T)
</code></pre>




<h2 id="sui_transfer_party_transfer_impl">Function <span class="code-inline">party_transfer_impl</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_party_transfer_impl">party_transfer_impl</a>&lt;T: key&gt;(obj: T, default_permissions: u64, addresses: vector&lt;<b>address</b>&gt;, permissions: vector&lt;u64&gt;)
</code></pre>




<h2 id="sui_transfer_transfer_impl">Function <span class="code-inline">transfer_impl</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/transfer#sui_transfer_transfer_impl">transfer_impl</a>&lt;T: key&gt;(obj: T, recipient: <b>address</b>)
</code></pre>




<h2 id="sui_transfer_receive_impl">Function <span class="code-inline">receive_impl</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/transfer#sui_transfer_receive_impl">receive_impl</a>&lt;T: key&gt;(parent: <b>address</b>, to_receive: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, version: u64): T
</code></pre>



