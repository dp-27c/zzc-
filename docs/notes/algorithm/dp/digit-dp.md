---
title: "数位dp"
algorithms: []
sidebarOutline: true
---

# 数位dp

## 数位dp的核心思想

[板题](https://www.acwing.com/problem/content/description/1083/)
思想1：
对于区间问题，我们通常转化为前缀和的区间问题，例如求 （l ，r）的最优解，可以考虑用（1，r）的最优解 减去 （1，l-1）的最优解

思想2：
从高位到低位依次考虑 用 dp 热狗分析法
有点想在画树，参考下面的图

![数位 DP 从最高位逐位划分计数范围](../../../assets/note-images/Pasted%20image%2020250728200118.png){width=1256 height=632}

## 挑战模式

[很7不成妻](https://www.acwing.com/problem/content/description/1088/)
压力
