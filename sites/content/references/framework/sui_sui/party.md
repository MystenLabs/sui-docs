---
title: Module sui::party
sidebar_label: party
---

<pre><code><b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>

<h2 id="sui_party_Party">Struct <span class="code-inline">Party</span></h2>

The permissions that apply to a party object. If the transaction sender has an entry in
the <span class="code-inline">members</span> map, the permissions in that entry apply. Otherwise, the <span class="code-inline">default</span> permissions
are used.<br/>
If the party has the <span class="code-inline"><a href="../sui_sui/party#sui_party_READ">READ</a></span> permission, the object can be taken as an immutable input.<br/>
If the party has the <span class="code-inline"><a href="../sui_sui/party#sui_party_WRITE">WRITE</a></span>, <span class="code-inline"><a href="../sui_sui/party#sui_party_DELETE">DELETE</a></span>, or <span class="code-inline"><a href="../sui_sui/party#sui_party_TRANSFER">TRANSFER</a></span> permissions, the object can be taken as
a mutable input. Additional restrictions pertaining to each permission are checked at the end
of transaction execution.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/party#sui_party_Party">Party</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">default: <a href="../sui_sui/party#sui_party_Permissions">sui::party::Permissions</a></span>
</dt>
<dd>
 The permissions that apply if no specific permissions are set in the <span class="code-inline">members</span> map.
</dd>
<dt>
<span class="code-inline">members: <a href="../sui_sui/vec_map#sui_vec_map_VecMap">sui::vec_map::VecMap</a>&lt;<b>address</b>, <a href="../sui_sui/party#sui_party_Permissions">sui::party::Permissions</a>&gt;</span>
</dt>
<dd>
 The permissions per transaction sender.
</dd>
</dl>


</details>

<h2 id="sui_party_Permissions">Struct <span class="code-inline">Permissions</span></h2>

The permissions that a party has. The permissions are a bitset of the <span class="code-inline"><a href="../sui_sui/party#sui_party_READ">READ</a></span>, <span class="code-inline"><a href="../sui_sui/party#sui_party_WRITE">WRITE</a></span>,
<span class="code-inline"><a href="../sui_sui/party#sui_party_DELETE">DELETE</a></span>, and <span class="code-inline"><a href="../sui_sui/party#sui_party_TRANSFER">TRANSFER</a></span> constants.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/party#sui_party_Permissions">Permissions</a> <b>has</b> <b>copy</b>, drop
</code></pre>


<details>
<summary>Fields</summary>


<dl>
<dt>
<span class="code-inline">0: u64</span>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

A party can read the object, taking it as an immutable argument. This restriction is checked
when sending the transaction.


<pre><code><b>const</b> <a href="../sui_sui/party#sui_party_READ">READ</a>: u8 = 1;
</code></pre>

The party can mutate the object, but not change its owner or delete it. This is checked at
end end of transaction execution.


<pre><code><b>const</b> <a href="../sui_sui/party#sui_party_WRITE">WRITE</a>: u8 = 2;
</code></pre>

The party can delete the object, but not otherwise modify it. This is checked at the end of
transaction execution.


<pre><code><b>const</b> <a href="../sui_sui/party#sui_party_DELETE">DELETE</a>: u8 = 4;
</code></pre>

The party can change the owner of the object, but not otherwise modify it. This is checked at
the end of transaction execution.


<pre><code><b>const</b> <a href="../sui_sui/party#sui_party_TRANSFER">TRANSFER</a>: u8 = 8;
</code></pre>

No permissions.


<pre><code><b>const</b> <a href="../sui_sui/party#sui_party_NO_PERMISSIONS">NO_PERMISSIONS</a>: u64 = 0;
</code></pre>

All permissions.


<pre><code><b>const</b> <a href="../sui_sui/party#sui_party_ALL_PERMISSIONS">ALL_PERMISSIONS</a>: u64 = 15;
</code></pre>


<h2 id="sui_party_single_owner">Function <span class="code-inline">single_owner</span></h2>

Creates a <span class="code-inline"><a href="../sui_sui/party#sui_party_Party">Party</a></span> value with a single "owner" that has all permissions. No other party
has any permissions. And there are no default permissions.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/party#sui_party_single_owner">single_owner</a>(owner: <b>address</b>): <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>
</code></pre>




<h2 id="sui_party_transfer">Macro function <span class="code-inline">transfer</span></h2>

A helper <span class="code-inline"><b>macro</b></span> that calls <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_party_transfer">sui::transfer::party_transfer</a></span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer">transfer</a>&lt;$T: key&gt;($self: <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>, $obj: $T)
</code></pre>




<h2 id="sui_party_public_transfer">Macro function <span class="code-inline">public_transfer</span></h2>

A helper <span class="code-inline"><b>macro</b></span> that calls <span class="code-inline"><a href="../sui_sui/transfer#sui_transfer_public_party_transfer">sui::transfer::public_party_transfer</a></span>.


<pre><code><b>public</b> <b>macro</b> <b>fun</b> <a href="../sui_sui/party#sui_party_public_transfer">public_transfer</a>&lt;$T: key, store&gt;($self: <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>, $obj: $T)
</code></pre>




<h2 id="sui_party_empty">Function <span class="code-inline">empty</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/party#sui_party_empty">empty</a>(): <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>
</code></pre>




<h2 id="sui_party_set_permissions">Function <span class="code-inline">set_permissions</span></h2>


<pre><code><b>fun</b> <a href="../sui_sui/party#sui_party_set_permissions">set_permissions</a>(p: &<b>mut</b> <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>, <b>address</b>: <b>address</b>, permissions: <a href="../sui_sui/party#sui_party_Permissions">sui::party::Permissions</a>)
</code></pre>




<h2 id="sui_party_is_single_owner">Function <span class="code-inline">is_single_owner</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/party#sui_party_is_single_owner">is_single_owner</a>(p: &<a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>): bool
</code></pre>




<h2 id="sui_party_into_native">Function <span class="code-inline">into_native</span></h2>


<pre><code><b>public</b>(<a href="../sui_sui/package#sui_package">package</a>) <b>fun</b> <a href="../sui_sui/party#sui_party_into_native">into_native</a>(p: <a href="../sui_sui/party#sui_party_Party">sui::party::Party</a>): (u64, vector&lt;<b>address</b>&gt;, vector&lt;u64&gt;)
</code></pre>



