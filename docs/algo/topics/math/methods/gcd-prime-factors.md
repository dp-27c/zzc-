---
title: GCD 与质因数
sidebarOutline: true
---

# GCD 与质因数

## 处理公约质数问题
[P2257 YY的GCD - 洛谷](https://www.luogu.com.cn/problem/P2257)
大意：
给定 n,m
求出 $\large \displaystyle\sum_{p=2}^{pri}\sum_{i=1}^{n}\sum_{j=1}^{m}[gcd(i,j)=p,p\in primes]$
思路：
我们可以参考上一题的方法，只需要带入 `d = pri[i]`, 但是计算时间复杂度，为$O(\sqrt{n}\sqrt{m}(n/lenn))$
因为 n <= 1e7 ，所以要爆炸的，考虑公式化简：
我们先化简到这一步：

$\displaystyle \sum_{p=2}^{pri}\sum_{d=1}^{n/d} \mu(d) \frac{n}{p\ d} \frac{m}{p\  d}$

此时为了方便整除分块，同时为下文铺垫：
我们设 $T=k\ d$

原式化简为：$\displaystyle \sum_{p=2}^{pri}\sum_{T=1}^{n} \mu(T/p) \frac{n}{T} \frac{m}{T}$

=>$\displaystyle \sum_{T=1}^{n}  \frac{n}{T} \frac{m}{T}\sum_{p=2}^{pri} \mu(T/p)$

到了这一步我们只需要对 $\sum_{p=2}^{pri} \mu(T/p)$ 进行预处理。
how？ 还记得我们欧拉筛处理的莫比乌斯函数吗？
枚举 pri 数组中的所有元素，记录 `F[T]` 数组来表示$\sum_{p=2}^{pri} \mu(T/p)$
那么就得到 `F[j]+=mu[j/pri[i]]`
为了实现区间`F[T]`的访问，别忘了最后预处理前缀和。

时间复杂度 就变成 了$O(n+{n}{ln\ n}+\sqrt {n})$
对 1e7 的数据 可以了

下面的 `s[i]`数组表示的就是 `F[i]`
## 处理约数个数问题：
[P3327 [SDOI2015] 约数个数和 - 洛谷](https://www.luogu.com.cn/problem/P3327)
大意：
$d(x)$设为 x 的约数个数。
求$\large \displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m} d(ij)$
思路：
首先我们要知道如何转换 这个 $d(ij)$
暂时记住：$\large \displaystyle d(ij)=\sum_{x|i}^{}\sum_{y|j} [gcd(i,j)==1]$
证明过程我会补在思路最后。

然后
原式就变成了 $\large \displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m}\sum_{x|i}^{}\sum_{y|j} [gcd(i,j)==1]$
进一步转换为： 这里用的是 「替换条件」

 $\large \displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m}\sum_{x|i}^{}\sum_{y|j} \sum_{d=1}^{n}[d|x][d|y]\mu(d)$

 =>这里就是简单的交换

  $\large \displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m}\sum_{x=1}^{n}[x|i]\sum_{y=1}^{m}[y|j] \sum_{d=1}^{n}[d|x][d|y]\mu(d)$

  =>把 $\mu(d)$ 提出来

  $\large \displaystyle\sum_{d=1}^{n}\mu(d)\sum_{x=1}^{n}\sum_{y=1}^{m}\sum_{i=1}^{n}[x|i]\sum_{j=1}^{m}[y|j] ([d|x][d|y])$

  => 在证明整数除法的过程中有这一步的详解

   $\large \displaystyle\sum_{d=1}^{n}\mu(d)\sum_{x=1}^{n}\sum_{y=1}^{m}\frac{n}{x}[d|x]\frac{m}{y}[d|y]$

   =>这里则是 将 $x=x'd,y=y'd$ 来替换原来的 x 和 y 这样是为了消去 $[d|x]和[d|y]$

  $\large \displaystyle\sum_{d=1}^{n}\mu(d)\sum_{x=1}^{n/d}\frac{n}{x}\sum_{y=1}^{m/d}\frac{m}{y}$

  =>然后试着将后面的看成一个函数，想办法预处理他。

  设 `F[i]`表示 $\large \displaystyle \sum_{k=1}^{i}\frac{i}{k}$,`s[i]`为莫比乌斯前缀和。

 所以，原式就变成了$\large \displaystyle\sum_{d=1}^{n}\mu(d) F[n/d]*F[m/d]$
 只需要对 `F[i]`数组进行预处理就可以了，如何预处理呢，其实就是整数分块的求法，使得
 n=5e5 的时间复杂度可行。

 然后再用一次整数分块处理 $\large \displaystyle\sum_{d=1}^{n}\mu(d) F[n/d]*F[m/d]$  就终于大功告成了
 约数转换证明：（暂时不知道）

 $\large \displaystyle d(ij)=\sum_{x|i}^{}\sum_{y|j} [gcd(i,j)==1]$

## 公式推理+分解质因数
 [1294. 樱花](https://www.acwing.com/problem/content/1296/)
大意：
$\displaystyle\frac{1}{x}+\displaystyle\frac{1}{y}=\displaystyle\frac{1}{n!}$

求出满足上面条件的正整数对`{x,y}`的数量

x  和 y 一定 大于 n！ ，因为要满足他们的倒数和等于 n！ 的倒数

所以我们令 y =  n！+ k：

然后消分母等于  -> $n!*(n!+k)+x*n!=x*(n!+k)$

展开并且后 -> $(n!)^2+k*n!=k*x$

由此我们得到 -> $\displaystyle\frac{(n!)^2}{k}+n!=x$

为了满足 x 为正整数，所以 k 必须是$(n!)^2$的约数

问题也变转换成了有多少个不同的k，即 $(n!)^2$ 有多少个约数

**接下来就是分解阶乘的质因数，然后每个权的指数乘上2，计算数量就可以得出解了**
## 求前缀gcd
[P2303 [SDOI2012] Longge 的问题 - 洛谷](https://www.luogu.com.cn/problem/P2303)
优质好题，每一步都值得细细品味：
题意：
求

$$
\Large \sum_{i=1}^{n}gcd(i,n)
$$

思路：
公式变形：
$\large \displaystyle \sum_{i=1}^{n}gcd(i,n)\longrightarrow \sum_{i=1}^{n}\sum_{d=1}^{n} d\ [gcd(i,j)==d]\longrightarrow \sum_{d=1}^{n} d \sum_{i=1}^{n/d}\ [gcd(i,n/d)==1]\longrightarrow \sum_{d|n}^{}d\ \varphi(n/d)$
最后一步变形的解释：
- 为什么不考虑使用莫比乌斯反演？ 因为莫反后，我们有 $[k|i]\times [k|(n/d)]$ 这两个因子，对于前面的和式来说都不好替换处理掉他们，所以这里使用欧拉函数的定义。
- $\sum_{d|n}$可以理解为$\sum_{d=1}^{n} d\ [gcd(i,j)==d]$ 求和函数的替换，你写成$\sum_{d|i}$ 也是可以的，但是和式交换就要受到限制。

欧拉函数变形：【参考下文的欧拉函数公式变形】

$$
\Large \varphi(n) =\prod_{p|n}^{}p^a\times(1-\frac{1}{p})=n\prod_{p|n}(1-\frac{1}{p})
$$

原式就变成了：
这一步变换参考【积性函数的性质】

$\Large \displaystyle \sum_{d|n}^{}n/d\ \varphi(d)$  然后公式代入后

$\large \displaystyle n\sum_{d|n}\prod_{p|n} (1-\frac{1}{p})$                                       令：1-1/pi 为 f(i)
bi 和 pi 都表示n的质因数分解后 bi 表示第 i 个质因子指数，pi 为第 i 个质因子。
这里将和式里的顺序进行调整：将拥有相同质因子的数放一起（因为他们的$\prod_{p|n} (1-\frac{1}{p})$ 是一样的）就可以得到
令 ： $b_i \times f(i) =X_i$
$\large n(1+X_1+X_2+X_3+X_1X_2+X_2X_3+X_1X_3+X_1X_2X_3……)\longrightarrow n(1+X_1)(1+X_2)(1+X_3)……$
（虽然有点跳跃，但还是值得再推一遍）

然后合并展开得到最终答案：

$$
\Large n\prod_{p|n}\frac{b_i\times p_i-b_i+p_i}{p_i}
$$

## 求前缀lcm:
这题本来想着用上一题小粉兔教的方法优化的，但是化出来有问题，就用了题解常用的朴素法：
题意：

$$
求\large \sum_{i=1}^{n}lcm(i,n)
$$

思路：
先公式化简：
$\large \displaystyle \sum_{i=1}^{n}lcm(i,n)=\sum_{i=1}^{n} \frac{i*n}{gcd(i,n)}=n\sum_{i=1}^{n}i \sum_{d|n}\frac{[gcd(i,n)==d]}{d}=n\sum_{i=1}^{n/d}i\ d \sum_{d|(n)}\frac{[gcd(i,n/d)==1]}{d}\longrightarrow$
这里运用到了 积性函数 的性质
$\large \displaystyle n\sum_{d|(n)} \sum_{i=1}^{d}i {[gcd(i,d)==1]}=n\sum_{d|(n)}(与n互质的数的和)$
因为 如果$gcd(i,d)==1$，那么$gcd(i,d-i)==1$
所以与 n 互质的数是关于 n/2 对称的，所以公式变成：（真是妙啊）

$$
\large \displaystyle n\sum_{d|n}\frac {d\ \varphi(d)}{2}
$$

到这一步我就没有继续化简了，但其实有更简单的形式，我会补上的。

因为 n 的范围最大为 1e6 ，所以可以用 欧拉筛+欧拉函数 求出来，时间复杂度为 n
再加上 提前对 约数的枚举 ，求出数组 ans 中每个值的$\sum_{d|n}\frac {d\ \varphi(d)}{2}$ 这一过程（$nlogn$）含有调和级数
时间上够了。
## 约数个数，排序
大一：
对于任何正整数 x，其约数的个数记作 g(x)，如果某个正整数 x 满足：对于任意的小于 x 的正整数 i，都有 g(x)>g(i)，则称 x 为反素数。
现在给定一个数 N，请求出不超过 N 的最大的反素数。（n<2e9)
思路：
这题的思路很关键，下面是条件分析：
欧拉筛，分解只因数。
1.一个数的约数个数是其分解质因数后，各个 质因子的指数+1后 相乘 如 6 = 2 x 3  个数为 （1+1）*（1+1） = 4；
2.对于一个反素数来说，存在与其相同约数数量的数一定大于这个反素数，因为反素数满足严格单调递增
3.对于固定的指数搭配，比如 1 1 2 ，1 1 3，其必应从最小的质因子 2 开始往后，指数不增，（这是为了符合条件2）
所以我们可以遍历质因子的指数搭配，所有在 n 范围内的 可能的约数个数，以及对应的值（建议用dfs剪枝，代码如下）
然后排序，根据条件2和3，对定义的结构体 v w 排序，找出最优即可；

## 欧拉反演：
求：

$$
\sum_{i=1}^{n}\sum_{j=1}^{m}(2gcd(i,j)-1)
$$

思路：
转:$\displaystyle 2\sum_{i=1}^{n}\sum_{j=1}^{m}(gcd(i,j))-n*m$
我转换到这一步，然后我接着转换:

$\displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m}(gcd(i,j))=\sum_{T=1}^{n}\left \lfloor \frac{n}{T}  \right \rfloor\left \lfloor \frac{m}{T}  \right \rfloor\sum_{d|n}d\mu(n/d)$

因为：$\tilde{\mu}\tilde{id}=\varphi$

所以$\displaystyle \sum_{T=1}^{n}\left \lfloor \frac{n}{T}  \right \rfloor\left \lfloor \frac{m}{T}  \right \rfloor\sum_{d|n}d\mu(n/d)=\sum_{T=1}^{n}\left \lfloor \frac{n}{T}  \right \rfloor\left \lfloor \frac{m}{T}  \right \rfloor\varphi(T)$

然后就可以做了。

## k阶前缀和：
举个例子 有一个序列 $A(n)=\langle a_1,a_2,a_3,\dots,a_n\rangle$
那么此时 这个序列可以构造成一个 普通生成函数：
$A(n)=0+a_1x+a_2x^2+a_3x^3……a_nx^n$
如果我们要求前缀和，可以构造另一个生成函数 $B(n)=1+x+x^2+x^3……+x^n$
此时如果我们对 $A(n)$ 和 $B(n)$ 做卷积。
那么 此时每个系数就是 我们熟知的 第 i 项前缀和了

优化一下，用 泰勒展开式带入， 将B(n) 的多项式看成 $\displaystyle \frac{1}{1-x}$ ,此时我们可以算出 k阶前缀和
$\displaystyle \frac{1}{(1-x)^k}$  利用广义二项式展开 => $\sum_{i=0}^{\infty} C_{n+i-1}^{i} x^i$
就可以求 k 阶 序列 A 的k 阶前缀和了，如果k太大了，我们还需要用 NTT 优化，别问我为什么不能是 TNT ，我也想炸掉他们。

## k阶差分
和前缀和方法差不多，构造一个 B 多项式为 (1 - x) , 此时与A(n)做卷积就是 A(n) 的差分了
k阶同理，不同的是 K 阶差分是 $(1-x)^kA(n)$ .这个只要用 二项式定理展开就好了：
变成 $(1-x)^k=\sum_{i=0}^{\infty} C_{k}^{i}(-1)^i*x^i$
都不要用 NTT 了，直接算。
