---
title: "已知可以解决的公式化简问题：(需整理)"
sidebarOutline: true
---

# 已知可以解决的公式化简问题：(需整理)

## gcd 类：
1.  n 以内的正整数 与 m 以内的正整数 lcm 的总和，n ，m 在1e7 的范围

$$
\large \displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m} lcm(i,j)=\sum_{d=1}^{n}d\sum_{k=1}^{n/{d}}\mu(k)*k^2\sum_{i=1}^{n/dk}i \sum_{j=1}^{m/{dk}}j
$$

将 $\rm O(n\times m) 的时间复杂度变为 O(\sqrt{n}\sqrt{\sqrt{n}})$ 外围一个 整除分块，内部套一个整除分块。
[数学讲解/莫比乌斯反演/练习]
2. n 以内的正整数 与 m 以内的正整数 gcd 的总积，n,m 的在 1e6 的范围

$$
\Large \displaystyle\prod_{i=1}^{n} \prod_{j=1}^{m} f(gcd(i,j))=\prod_{d=1}^{n} f(d)^{\mu(T/d)}
$$

$O(n\times m) \longrightarrow O(n)$
[数学讲解/莫比乌斯反演/练习]
3. 数组内部的数对 lcm 求和，$n 和 A_i$ 在 1e6 之内

$$
\Large \sum_{i=1}^{n}\sum_{j=1}^{n}lcm(A_i,A_j)=\sum_{T=1}^{n}T(\sum_{i=1}^{n/T}cn[i\ T]\ i)^2(\sum_{d|T}^{}\mu(d)\ d)
$$

这里将数组的值转换为 数值为 i 的个数。$O(n^2)\longrightarrow O(nlogn)$?
[数学讲解/莫比乌斯反演/练习]

4. 处理公约质数问题：

$$
\large \displaystyle\sum_{p=2}^{pri}\sum_{i=1}^{n}\sum_{j=1}^{m}[gcd(i,j)=p,p\in primes]=\sum_{T=1}^{n}  \frac{n}{T} \frac{m}{T}\sum_{p=2}^{pri} \mu(T/p)
$$

5. 求前缀二元组的乘积约数个数和。$d(x)$ 表示 x 的约数个数。

$$
\large \displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m} d(ij)
$$

$\large \displaystyle d(ij)=\sum_{x|i}^{}\sum_{y|j} [gcd(x,y)==1]$ 证明过程[数学讲解/和式变换练习]

6. 积性和式转化：

   $$
   \large \displaystyle\sum_{d|n}\sum_{k|\frac{n}{d}}=\sum_{k|n}\sum_{d|\frac{n}{k}}
   $$

证明过程：

待补图片（Pasted image 20250828141553.png）
