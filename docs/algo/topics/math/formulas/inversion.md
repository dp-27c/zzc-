---
title: "反演公式"
sidebarOutline: true
---

# 反演公式

## 斯特林反演：

$$
\Large x^n=\sum_{k=0}^{n}C_{x}^{k}\ S_{n}^{k}\ k!
$$

变换的理解
组合思想：
最左边的式子 $X^{n}$ 可以看成是  将 n 个小球放到 x 个盒子的所有的方案数。
最右边的式子$\huge \sum_{k=0}^{n} C_{x}^{k}*S_{n}^{k}*A_{k}^{k}$   可以理解为，枚举非空盒子的情况（k） ，从n 个盒子中选的这k个盒子里，用n个元素放入这k个盒子（已经保证非空），最后在乘上这k个盒子的全排列。

这一步转换，是普通幂和下降幂的转换
## 二项式反演：

### 二项式定理：

$\Huge (a+b)^n=\sum_{i=0}^{n}C_{n}^{i} \times a^{n-i}\times  b^i$
定理的运用：
  1.用于将 求和的遍历 加速成 一个式子直接求。
  2.用于将 方程转换 例如 $\large (x+1)^n=\sum_{i=0}^{n}C_{n}^{i} \times x^{i}$
### 推论式1：

$\Huge \sum_{i=0}^{n}(-1)^i \times C_{n}^{i} = [n==0]$

### 二项式反演：

$\Huge f(n)=\sum_{i=0}^{n}C_{n}^{i}\times g(i) \Longleftrightarrow  g(n)=\sum_{i=0}^{n}(-1)^{n-i} \times C_{n}^{i} \times f(i)$

二项式反演 很多时候其实就是一个容斥原理的 题目
### 证明：
这里需要自己去推理
这里的倒数第二行 => 倒数第一行 的变化：
  可以将组合数$\large C_{n-j}^{i} => C_{n}^{n-j-i}$  
  这样更符合 推论式1，更好理解这一步的变换。
### 运用场景：
#### 1.恰好 --> 至多型
$g(m)$ 表示**恰好**满足条件(=m)的方案数（答案）
$f(m)$ 表示**至多**满足条件(<=m)的方案数 (方便求的)
先求出 f(m) , 再反演求 g(m)

![二项式反演至多型求和范围](../../../../assets/note-images/Pasted%20image%2020250822160047.png){width=330 height=93}

$\Huge f(m)=\sum_{i=0}^{m}C_{m}^{i}\times g(i) \Longrightarrow  g(m)=\sum_{i=0}^{m}(-1)^{m-i} \times C_{m}^{i} \times f(i)$
#### 2.恰好 --> 至少型
$g(m)$ 表示**恰好**满足条件(=m)的方案数（答案）
$f(m)$ 表示**至少**满足条件(>=m)的方案数 (方便求的)
先求出 f(m) , 再反演求 g(m)

![二项式反演至少型求和范围](../../../../assets/note-images/Pasted%20image%2020250822160404.png){width=318 height=98}

$$
\Huge f(m)=\sum_{i=m}^{n}C_{i}^{m}\times g(i) \Longrightarrow  g(m)=\sum_{i=m}^{n}(-1)^{i-m} \times C_{i}^{m} \times f(i)
$$
