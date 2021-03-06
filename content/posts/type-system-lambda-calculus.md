---
title: 类型推导 — λ 演算
date: 2018-11-08
tags:
  - PL
  - Type System
---
> 一段时间内，这篇文章都将反映我的学习进度，并处于**未完成**的状态。

最近在尝试给自己的一个[玩具级表达式解释器](https://github.com/imtsuki/NotC)（还称不上是一门语言）加上类型系统。起初想简单地把所有规则硬编码进解释器，诸如 $\rm Int \ne Int :: Bool$ 云云； 可不久便发现，这样的拓展性不高。譬如，若要实现自定义运算符的功能，便不能很好的和现有的逻辑统一起来。这些远远谈不上「优美」(elegant)。

## 类型系统初探

不同的语言有不同的类型系统 (type system)。从一种层面，类型系统可分为「**强类型** (strongly typed)」与「**弱类型** (weakly typed)」：强类型不允许隐式的类型转换，而弱类型则偏向于容忍这些。弱类型的典型例子便是 C/C++：两个完全不同的 `struct`，透过 `void *` 指针便可以无视所有规则互相转换，所有的内存都可以随意解读。不过，例如 `double` 与 `int` 的隐式转换，以及 JavaScript 中字符串到数字的隐式转换，由于都是语言已知的行为（类型提供的转换接口），严格意义上不应属于弱类型的表现。

另一方面，类型系统又可分为「**静态的** (static)」与「**动态的** (dynamic)」：静态类型在编译期确定类型，抛出类型错误，而动态类型则在运行时进行这些检查。对于静态类型，若语法要求类型需要显式地声明，如 C/C++ `int x = 0;`，则称为**静态显式类型** (explicitly typed)；若不需要手工标记类型，而由编译器推在编译时推导，例如 Haskell，则为**静态隐式类型** (implicitly typed)。

类型系统可以看作一套附着在语言语法上的符号证明系统。而一切，都要从 $λ$ 演算开始。

## $λ$ 演算

单纯从语法 (syntax) 的角度（不涉及任何语义 (semantics)）来看，$λ$ 演算只是一套符号推导系统。一个合法的 $λ$ 项 (term) 由以下产生式给出：

$$
\begin{aligned}
t \ \ & \rightarrow \ \ x & \textbf{[Variable]}\\
     &\ \ |\ \ \ \ \lambda x.t_1 & \textbf{[Abstraction]}\\
     &\ \ |\ \ \ \ t_1 t_2 & \textbf{[Application]}\\
\end{aligned}
$$

其中，

- $x$ 为一个合法的 $\lambda$ 项，称为**变量** (Variable)；
- $\lambda x.t_1$ 为一个合法的 $\lambda$ 项，称为从项 $t_1$ 中**抽象** (Abstraction) 出 $x$；
- $t_1 t_2$ 为一个合法的 $λ$ 项，称为把项 $t_1$ **应用** (Application) 于 $t_2$。

譬如，$λx.x$、$(λx.xy)(λy.xy)$、$λx.(λy.xy)$都是一个合法的 $λ$ 项。

有了以上语法规则，我们便可以生成无数的串。可在我们指定**推导规则** (reducion rule) 之前，这些串都是各自独立、毫无关联的。

### 自由项与绑定项

### 推导规则

推导规则，或者说运算法则，有众多不同的形式。其中，最简单的推导系统只有两条规则：**$\bm\alpha$ 转换**与 **$\bm\beta$ 规约**。

#### $\alpha$ 转换

$\alpha$ 转换基本上可以看作一个重命名的操作。$\alpha$ 转换指，$\lambda$ 项中变量的名称是不重要的。我们可以任意修改一个 $\lambda$ 项中变量的名称，只要同时修改其在该项中的所有自由引用。

例如，我们有如下 $\lambda$ 项
$$
λx.(λy.xy)
$$
把所有 $x$ 的出现更换为 $u$（记作 $\alpha[x/u]$），其在 $\alpha$ 转换下等价于
$$
λu.(λy.uy)
$$
进一步又可等价于
$$
λu.(λv.uv)
$$

#### $\beta$ 规约
