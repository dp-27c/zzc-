---
title: 生成函数
sidebarOutline: true
---

# 生成函数

## 普通生成函数

形式：

$$
F(x)= \sum_{n\geqslant 0} a_n*x^n
$$

$a_n$可以是有穷序列，也可以是无穷序列。例如，
$\langle 1,2,3\rangle$ 的普通生成函数是 $1+2x+3x^2$
$\langle 1,1,1,1\rangle$ ……
$\langle 1,2,4,8\rangle$ ……
利用普通生成函数解决多重集组合数问题。

### 加法运算：

就很好理解，合并同类项即可：

$$
F(x)+G(x)=\sum_{n\geqslant 0} (a_n+b_n) x^n
$$

$\langle a_n+b_n\rangle$ 的生成函数

### 乘法运算（卷积）

卷积哥，你终于来了

$$
F(x)G(x)=\sum_{i \geqslant 0} a_ix^i \sum_{j \geqslant 0}b_jx^j
$$

$$
\Longrightarrow \sum_{n\geqslant 0} x^n\sum_{i\geqslant 0}^{n} a_i b_{n-i}
$$

变成了 $\langle\sum_{i\geqslant 0}^{n}a_i b_{n-i}\rangle$ 的普通生成函数

## 指数生成函数

### 概念：

$$
f(x)=\sum_{i \geqslant 0} a_i \frac {x^i}{i!}
$$

利用普通生成函数解决多重集排列数问题。
对于同一集，我们通常要考虑内部的顺序，只有除掉内部的顺序，我们可以最后乘上一个 (m)!

### 卷积

$$
f(x)=\sum_{n \geqslant 0}  \frac {x^n}{n!} \sum_{i \geqslant 0}^{n} C_{n}^{i} a_i*b_{n-i}
$$

因为分母有 $n!$，所以在做卷积运算的时候，我们将分母 $(i)!(n-i)!$ 乘上一个 $\frac{n!}{n!}$，然后转换一下就可以了。
变成了 $\langle\sum_{i\geqslant 0}^{n}C_{n}^{i}a_i*b_{n-i}\rangle$ 的指数生成函数

## 生成函数的运用

### 泰勒展开式

#### 普通生成函数展开：

$$
\frac{1}{1-x}=1+x^1+x^2+x^3+x^4+\cdots=\sum_{n\geqslant 0}^{\infty}x^n
$$

然后就是由这个式子推导出来的变形：

![普通生成函数的三个级数展开](../../../../assets/note-images/Pasted%20image%2020250825160946.png){width=441 height=160}
讲一下（4） 是怎么变出来的，我们将原式子左右两边求导，就可以了
同时我们利用公式，求出 一些有穷函数的结论：

$$
1+x+x^2=\frac{1-x^3}{1-x}\Longrightarrow\sum_{i\geqslant 0}^{n} x^i=\frac{1-x^{n+1}}{1-x}
$$

#### 指数生成函数展开:

$$
e^x=1+\frac{x}{1!}+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots=\sum_{n\geqslant 0}^{\infty}\frac{x^n}{n!}
$$

由上面的这个式子变形得到的。

![指数生成函数的交错、偶次和奇次展开](../../../../assets/note-images/Pasted%20image%2020250825161417.png){width=399 height=183}

### 广义二项式定理：

$$
\frac{1}{(1-x)^n}=\sum_{i=0}^{\infty}C_{n+i-1}^{i}x^i=\sum_{i=0}^{\infty}C_{n+i-1}^{n-1}x^i
$$

用二项式定理证明：
有点复杂，但是能看懂，哥们还是记一下结论吧。

待补图片（Pasted image 20250825162928.png）

#### 运用：

##### 练习1:普通生成函数+广义二项式定理：

很抱歉，这个网站上的这个题爆了，看不到了。
所以我只能在视频里找出来了。
大意：

待补图片（Pasted image 20250825171035.png）
思路：
对于这么多复杂的问题，以及n 的超级大的范围，那什么分组多重背包啊，什么生成函数遍历去算啊，在数值面前都是浮云。
怎么办？

我们考虑将这么复杂的东西转换成一个式子看看能不能解决。
因为我们要求的是组合数问题，所以构造的函数应该是普通生成函数。

我们对于每一种食物构造一个多项式，判断每个多项式化简。
(1) 偶数个：$1+x^2+x^4+x^6+\cdots=\frac{1}{1-x^2}$ 这里用是 普通生成函数在 泰勒展开式上的应用
  (1 ，3 都可以参考)
(2)  0，1个： $1+x = \frac {1-x^2}{1-x}$  普通生成函数里 有穷函数的 转换。
  (这里 2,3,6,7 都是参考这个)
(4) 奇数个: $\frac{1}{1-x}- \frac {1}{1-x^2}$  偶数个的补集

全部相乘后，发现最后 化简成 一个 式子：

$$
F(x)=\frac {x}{(1-x)^4}
$$

走到这一步还没有完，我们要知道，我们求是什么，是 $x^n$ 的系数。
所以我们 用广义二项式定理展开 ：$\frac{1}{(1-x)^n}=\sum_{i=0}^{\infty}C_{n+i-1}^{i}x^i$

$$
F(x) =x\sum_{i=0}^{\infty} C_{4-1+i}^{i} x^i
$$

所以 $x^n$ 的系数就是 $C_{3+(n-1)}^{n-1}=C_{n+2}^{3}=\frac {(n+2)(n+1)n}{6}$
直接 算然后取模得出结果。

数学真是太神奇了！！

##### 练习2：指数生成函数

不是哥们，这么水吗？
别急……
为什么是指数生成函数？我们看到这些砖块不是选出来放包里的，而是选出来再排列的，这就是排列数，所以构造生成函数的时候考虑构造指数生成函数。

然后就是把对应的指数生成多项式做乘积运算，展开后取$x^n$ 的系数。
这里面的展开还是比较有意思的，分数码出来真的累，就水一下吧。

当然因为这里面还是比较简单的，只涉及到指数生成函数的加法运算。

待补图片（Pasted image 20250825185527.png）

#### 生成函数的tricks：

##### k阶前缀和：

举个例子 有一个序列 $A(n)=\langle a_1,a_2,a_3,\ldots,a_n\rangle$
那么此时 这个序列可以构造成一个 普通生成函数：

$$
A(n)=0+a_1x+a_2x^2+a_3x^3+\cdots+a_nx^n
$$

如果我们要求前缀和，可以构造另一个生成函数 $B(n)=1+x+x^2+x^3+\cdots+x^n$
此时如果我们对 $A(n)$ 和 $B(n)$ 做卷积。
那么 此时每个系数就是 我们熟知的 第 i 项前缀和了

优化一下，用 泰勒展开式带入， 将B(n) 的多项式看成 $\frac{1}{1-x}$ ,此时我们可以算出 k阶前缀和
利用广义二项式展开：
$$
\frac{1}{(1-x)^k}=\sum_{i=0}^{\infty}C_{n+i-1}^{i}x^i
$$
就可以求 k 阶 序列 A 的k 阶前缀和了，如果k太大了，我们还需要用 NTT 优化，别问我为什么不能是 TNT ，我也想炸掉他们。

##### k阶差分

和前缀和方法差不多，构造一个 B 多项式为 (1 - x) , 此时与A(n)做卷积就是 A(n) 的差分了
k阶同理，不同的是 K 阶差分是 $(1-x)^kA(n)$ .这个只要用 二项式定理展开就好了：
变成 $(1-x)^k=\sum_{i=0}^{\infty} C_{k}^{i}(-1)^i*x^i$
都不要用 NTT 了，直接算。

模版题：[P5488 差分与前缀和 - 洛谷](https://www.luogu.com.cn/problem/P5488)

## 狄利克雷生成函数：

$$
\tilde F(x)=\frac{a_1}{1^x}+\frac{a_2}{2^x}+\frac{a_3}{3^x}+\cdots=\sum_{n=1}^{\infty}\frac{a_n}{n^x}
$$

简称 DFG

乘法运算：

$$
\sum_{n=1}^{\infty}\frac{a_n}{n^x}\sum_{n=1}^{\infty}\frac{b_n}{n^x}
$$

$$
\Longrightarrow\sum_{n=1}^{\infty}\frac{1}{n^x}\sum_{d\mid n}a_db_{n/d}
$$

## 积性函数：

规定 ：$f(1)=1$，当 $\gcd(a,b)=1$ 时，满足 $f(ab)=f(a)*f(b)$
则成为积性函数。(前提是a,b互质)
例如： 欧拉函数 $\varphi(x)$ ，和莫比乌斯函数 $\mu(x)$

### 欧拉函数了解加深：

$$
\varphi(n)=\sum_{i=1}^{n}[\gcd(i,n)=1]
$$

性质：

$$
\sum_{d\mid n}\varphi(d)=n
$$

证明：利用真分数

待补图片（Pasted image 20250826145132.png）

### 莫比乌斯函数的加深和了解：

莫比乌斯函数:
1．定义

$$
\mu(n)=
\begin{cases}
1 & n=1\\
(-1)^s & n=p_1p_2\cdots p_s\\
0 & n\text{ 包含相同质因子}
\end{cases}
$$
性质：

$$
\tilde{\mu}(n)=\sum_{d\mid n}\mu(d)=[n=1]
$$

证明：
首先 $n=1$ 时，$\sum_{d\mid 1}\mu(d)=1$
$n>1$ 时，将 $n$ 进行 质因式分解 为 $p_1^{k_1}p_2^{k_2}p_3^{k_3}p_4^{k_4}\cdots$
令 $n'=p_1p_2p_3p_4\cdots$
因为 莫比乌斯函数中 包含相同质因子的数为 0 。
所以 $\sum_{d\mid n}\mu(d)=\sum_{d\mid n'}\mu(d)$
根据容斥原理：
根据取不用数量的质因子的方案：
再根据二相式定理转换

$$
C_s^0+(-1)C_s^1+(-1)^2C_s^2+\cdots=(1+(-1))^s=0
$$

### 莫比乌斯函数与欧拉函数的联系：

$$
\tilde{\mu}(n) * \tilde{id}(n)=\sum_{d\mid n}\mu(d)\frac{n}{d}=\varphi(n)
$$

证明：

$$
\begin{aligned}
\sum_{d\mid n}\mu(d)\frac{n}{d}
&=n\sum_{d\mid n}\frac{\mu(d)}{d}\\
&=n\left(1-\left(\frac{1}{p_1}+\frac{1}{p_2}+\frac{1}{p_3}+\frac{1}{p_4}+\cdots\right)\right.\\
&\qquad\left.+\left(\frac{1}{p_1p_2}+\frac{1}{p_1p_3}+\cdots\right)\right)
\end{aligned}
$$

$$
\Longrightarrow n\left((1-\frac1{p_1})(1-\frac1{p_2})(1-\frac1{p_3})\cdots\right)
$$

$$
\Longrightarrow\varphi(n)
$$

其实就是 欧拉函数 的容斥展开 。
参考 （####  容斥原理 + 莫比乌斯函数 + 二维数论分块）
