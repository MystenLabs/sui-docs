---
title: Module std::internal
sidebar_label: internal
---

Defines the <span class="code-inline"><a href="../sui_std/internal#std_internal_Permit">Permit</a></span> type, which can be used to constrain the logic of a
generic function to be authorized only by the module that defines the type
parameter.

```move
module example::use_permit;

public struct MyType \{ /* ... */ \}

public fun test_permit() \{
   let permit = internal::permit<MyType>();
   /* external_module::call_with_permit(permit); */
\}
```

To write a function that is guarded by a <span class="code-inline"><a href="../sui_std/internal#std_internal_Permit">Permit</a></span>, require it as an argument.

```move
// Silly mockup of a type registry where a type can be registered only by
// the module that defines the type.
module example::type_registry;

public fun register_type<T>(_: internal::Permit<T> /* ... */) {
  /* ... */
}
```

<h2 id="std_internal_Permit">Struct <span class="code-inline">Permit</span></h2>

A privileged witness of the <span class="code-inline">T</span> type.<br/>
Instances can only be created by the module that defines the type <span class="code-inline">T</span>.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_std/internal#std_internal_Permit">Permit</a>&lt;<b>phantom</b> T&gt; <b>has</b> drop
</code></pre>




<h2 id="std_internal_permit">Function <span class="code-inline">permit</span></h2>

Construct a new <span class="code-inline"><a href="../sui_std/internal#std_internal_Permit">Permit</a></span> for the type <span class="code-inline">T</span>.<br/>
Can only be called by the module that defines the type <span class="code-inline">T</span>.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/internal#std_internal_permit">permit</a>&lt;T&gt;(): <a href="../sui_std/internal#std_internal_Permit">std::internal::Permit</a>&lt;T&gt;
</code></pre>



