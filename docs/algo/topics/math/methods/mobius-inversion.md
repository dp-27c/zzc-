---
title: 莫比乌斯反演
sidebarOutline: true
---

# 莫比乌斯反演

## 莫反+和式变换+整除分块套分块
[P1829 [国家集训队] Crash的数字表格 / JZPTAB - 洛谷](https://www.luogu.com.cn/problem/P1829)
因为涉及到 分块套分块 。
所以在 写代码的时候需要保持 大脑在线 （？ 什么代码不需要大脑在线，数学）
（看来是为数不多写代码需要大脑在线的数学题呢）

大意：
给你正整数 n ，m。（1<n,m<1e7）
求 $\large \displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m} lcm(i,j)$
思路：
首先暴力 $O(nm)$ 会爆炸，考虑公式化简
$lcm(i,j)$ 转换为 $\displaystyle \frac{i*j}{gcd(i,j)}$

 $\large \displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m} \frac{i*j}{gcd(i,j)}\longrightarrow \sum_{i=1}^{n} i\sum_{j=1}^{m} j\sum_{d=1}^{n}\frac{[gcd(i,j)==d]}{d}$

=> 为了使得转换 分子为互质版本
即：$i= i'd,j=j'd$  放进式子中，然后化简，最后 改 i' 和 j' 为 i 和 j。

$\large \displaystyle \sum_{d=1}^{n}\sum_{i'd=1}^{n} i'd\sum_{j'd=1}^{m} j'd\frac{[gcd(i'd,j'd)==d]}{d} \longrightarrow \sum_{d=1}^{n}\sum_{i=1}^{n/d} id\sum_{j=1}^{m/d} jd\frac{[gcd(i,j)==1]}{d} \longrightarrow \sum_{d=1}^{n}\sum_{i=1}^{n/d}\sum_{j=1}^{m/d} ijd[gcd(i,j)==1]$

根据莫比乌斯反演：$\large \displaystyle [gcd(i,j)==1]=\tilde \mu(gcd(i,j))$

$\large \displaystyle\sum_{d=1}^{n}\sum_{i=1}^{n/d}\sum_{j=1}^{m/d} ijd\sum_{k=1}^{n/d} [k|i][k|j]\mu(k)\longrightarrow\sum_{d=1}^{n}d\sum_{k=1}^{n/d}\mu(k)\sum_{i=1}^{n/d}i[k|i]\sum_{j=1}^{m/d}j[k|j]$

=>当然和上面的替换是一样的，此时消去$[k|i]$ 就要还原 $i=i'k$,然后化简可以得到：

$\large \displaystyle \sum_{d=1}^{n}d\sum_{k=1}^{n/{dk}}\mu(k)\sum_{i=1}^{n/dk}ik\sum_{j=1}^{m/{dk}}jk\longrightarrow\sum_{d=1}^{n}d\sum_{k=1}^{n/{d}}\mu(k)*k^2\sum_{i=1}^{n/dk}i\sum_{j=1}^{m/{dk}}j$

化简到这一步就可以使用整数分块了：对 d 做二维整数分块后 再对 k 做一遍二维整数分块
还需要对 $\sum_{k=1}^{n/{d}}\mu(k)*k^2$ 做预处理，即前缀 $\mu(i)i^2$和
最后结合一下就好了：
结合的过程也是在训练你对和式变换的理解和思维，建议反复练习。

时间复杂度：$O(\sqrt {n} \sqrt {\sqrt{n}})$
## 连乘转指数求和+整除分块+莫反
（纪念我在luogo平台上的第100道题，可口可乐！）
[P3704 [SDOI2017] 数字表格 - 洛谷](https://www.luogu.com.cn/problem/P3704)
大意：
给你 正整数n ，m， T， （T表示有多少组数据测试）
令`f[i]`为斐波那契数列的 第 i 项
求$\Large \displaystyle\prod_{i=1}^{n} \prod_{j=1}^{m} f(gcd(i,j))$

思路：
当时学得时候有被连乘吓到，看完 董晓叔叔 的教程后 大为震惊 ，啊，数学真是太奇妙了。

接下来为你展示神奇的公式推导：

因为是连乘符号，所以在处理公式时要注意不能乘0，换到指数上。
$\large \displaystyle\prod_{i=1}^{n} \prod_{j=1}^{m} f(gcd(i,j)) \longrightarrow \prod_{i=1}^{n} \prod_{j=1}^{m}\prod_{d=1}^{n} f(d)^{[gcd(i,j)==d]}\longrightarrow\prod_{d=1}^{n}\prod_{i=1}^{n} \prod_{j=1}^{m} f(d)^{[gcd(i,j)==d]}$

关键步骤：将外面的连乘符号转到内部函数的指数上做连和，这一步是为了方便黄金代还后的公式
$\large \displaystyle \prod_{d=1}^{n} f(d)^{\sum_{i=1}^{n} \sum_{j=1}^{m}[gcd(i,j)==d]}$
为什么这一步成立：
我们把相同的`f[d]` 的成积看成是 指数上的求和，因为在这个过程中我们保持 `f[d]`的独立.(带 d 的连乘符号进不去一样）

然后先处理指数上d的问题，再黄金代还,然后化简
(和上一题处理方法一样)
$\large \displaystyle \prod_{d=1}^{n} f(d)^{\sum_{i=1}^{n/d} \sum_{j=1}^{m/d}[gcd(i,j)==1]} \longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{k=1}^{n/d}\sum_{i=1}^{n/d} \sum_{j=1}^{m/d}[k|i][k|j]\mu(k)}\longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{k=1}^{n/d}\mu(k)\sum_{i=1}^{n/dk} 1\sum_{j=1}^{m/dk}1}$
$\large \displaystyle\longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{k=1}^{n/d}\mu(k) (n/dk)(m/dk)}$

此时判断能不能预处理，发现内部还有一个求和，思考这个指数还能怎么化简。
在这篇文章的[处理公约质数问题](./gcd-prime-factors.md#处理公约质数问题) 这里，有对这个指数的处理细节：
将 $dk=T$ 代入指数式子替换掉原来的 d 和 k。

$\large \displaystyle\longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{T=1}^{n} \mu(T/d)(n/T)(m/T)}$

然后利用公式交换，任性地把指数的求和拿出来。（反复横跳）
再用指数的计算顺序交换的特点，转化。这一步是为了更好的预处理里面的数据。

$\large \displaystyle\longrightarrow \prod_{T=1}^{n}\prod_{d=1}^{n} f(d)^{\mu(T/d)(n/T)(m/T)}\longrightarrow \prod_{T=1}^{n}\prod_{d=1}^{n} {(f(d)^{\mu(T/d)})}^{(n/T)(m/T)}\longrightarrow \prod_{T=1}^{n} {(\prod_{d=1}^{n} f(d)^{\mu(T/d)})}^{(n/T)(m/T)}$
为什么上面的这个连乘可以放里面？因为这里的 外面套的指数和 d 无关，则 d 的连乘式可以放里面而不影响结果。

假设括号内的数可以看成一个函数 `F[T]` 那么式子就转换成了

$\large \displaystyle\longrightarrow\prod_{T=1}^{n} {F[T]}^{(n/T)(m/T)}$

这一块似乎使用 连乘版 的整除分块就可以计算了，如果我们有一个使得查询 `F[T]` 的表格。
如何预处理这一块 又是一门学问！！

$\large \displaystyle \longrightarrow\prod_{d=1}^{n} f(d)^{\mu(T/d)}$

如果要d和T 的枚举，我们发现会有一个 $O(n^2)$ 的时间复杂度，这不又回去了吗？
但是我们发现 这个 (T/d) 很有味道，如果我们先枚举 d ，再将d 的每个倍数 ，将$f(d)^{\mu(T/d)}$进每个对应的 `F[T]` 上,那我就可以得到一个
$O(nlon(n))$ 的时间复杂度 （含调和级数） 大约是 1e7 可以接受。

注意在预处理上我们要有一些小细节：
比如：
- 因为涉及到$\mu(n)=-1$的情况，我们在线性计算斐波那契数列的同时，还要计算其对应的逆元。
- 因为最外层是一个整除分块,所以我们预处理完这个`F[T]`后,还要算前缀积,来方便我们做区间积,区间积要记得乘上逆元。
- 因为涉及到一个很大的指数，我们还要知道拓展欧拉定理(参考本文的[欧拉定理：])，因为模数是一个质数，所以其对应的欧拉函数就是 mod - 1，快速幂计算时 指数变成 其指数 对 （mod - 1） 取模后的指数。

大功告成！！
## 数组数据处理方式：
题意：
给你数组 $A$,有 n 个元素。
求：

$$
\large \sum_{i=1}^{n}\sum_{j=1}^{n}lcm(A_i,A_j)
$$

$1<=n,A_i<=5e4$
思路：
 求这样的 $lcm(i,j)$是有经验的，经典的莫比乌斯反演，但这里却是数组。

因为数组元素的大小最大为 5e4,所以我们可以把 $\sum_{i=1}^{n}\sum_{j=1}^{n}lcm(A_i,A_j)$ 看成

$$
\large \sum_{i=1}^{n}\sum_{j=1}^{n}cn[i]cn[j]lcm(i,j)
$$

然后就进行公式转换，根据上面的题目的经验：你成功将其变成了：

$$
\large \sum_{d>=1}^{}d\sum_{T=1}^{n}\mu(T/d)T^2/d^2\sum_{i=1}^{n/T}\sum_{j=1}^{n/T}cn[i\ T]cn[j\ T]\ i\ j
$$

此时还要进一步优化公式：

$$
\large \sum_{T=1}^{n}T(\sum_{i=1}^{n/T}cn[i\ T]\ i)^2(\sum_{d|T}^{}\mu(d)\ d)
$$

第二个括号内的公式需要用调和级数的复杂度预处理，（枚举每个因子d，再枚举d的倍数加上对应的权值）

然后就是 $\displaystyle \sum_{T=1}^{n}\sum_{i=1}^{n/T}$ 的时间复杂度为$O(nlogn)$。很神奇，这里居然可以暴力。
