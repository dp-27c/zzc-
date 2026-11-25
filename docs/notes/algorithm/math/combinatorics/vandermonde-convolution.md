---
title: "范德蒙德卷积公式"
algorithms: []
sidebarOutline: true
---

# 范德蒙德卷积公式：

## 公式:


$$
\Large \sum_{i=0}^{k}C_{n}^{i}C_{m}^{k-i}=C_{n+m}^{k}
$$



证明：
- 组合数学：
  在 t 个小球中选择 k 个小球 看成 将 t 个小球分成 n 个小球和 m 个小球 两个堆，分别从第一堆里取 i 个，从另一堆取剩下（k - i）个，枚举  i 从 0 ~ k。
- 二项式定理：
$\large \displaystyle \sum_{k}^{n+m} C_{n+m}^{k}x^k=(1+x)^{n+m}=(1+x)^n*(1+x)^m$
$\large \displaystyle =\sum_{i=0}^{n}\sum_{j=0}^{m}C_{n}^{i}C_{m}^{j}x^{i+j}=\sum_{k}^{n+m}\sum_{i=0}{k}C_{n}^{i}C_{m}^{k-i}x^k$


## 推论：


1.

   $$
   \Large \displaystyle \sum_{i=-r}^{s}C_{n}^{r+i}C_{m}^{s-i}=C_{m+n}^{r+s}
   $$

   证明：与原公式相似
2.

$$
\Large \displaystyle\sum_{i=0}^{n-1}C_{n}^{i}C_{n}^{i-1}=C_{2n}^{n-1}
$$


证明：将左边的$C_{n}^{i}=C_{n}^{n-i}$ 就和原公式是一样的了
3.

$$
\Large \displaystyle \sum_{i=0}^{n}(C_{n}^{i})^2=C_{2n}^{n}
$$


证明：和 第二条 推论的证明方法一样。
4.

$$
\Large \displaystyle \sum_{i=0}^{m}C_{n}^{i}C_{m}^{i}=C_{n+m}^{m}
$$


证明:将$C_{m}^{i}=C_{m}^{m-i}$ 就和原公式一样了。

## 总结公式版：


$$
\Large \displaystyle \rm \sum_{i=low}^{up}C_{n}^{i-low}\ C_{m}^{up-i}=C_{n+m}^{up-low}
$$



## 练习：


[Problem - D - Codeforces](https://codeforces.com/contest/785/problem/D)
左右括号数量

[P2791 幼儿园篮球题 - 洛谷](https://www.luogu.com.cn/problem/P2791)
黑色！！！
