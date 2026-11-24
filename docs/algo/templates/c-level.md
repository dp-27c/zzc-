---
title: C级公式
algorithms: []
sidebarOutline: true
---

# C级公式
## 线性代数：

## 整除分块：

求

$$
\sum_{i=1}^{n} \left \lfloor \frac {n}{i} \right \rfloor
$$

```cpp
for(int l=1,r=1;l<=n;l=r+1)
{
	r=min(n/(n/l),n);
	res+=(r-l+1)*(n/l);
}
```

## 组合数学
### 错位排列：
例：
对于一个 $n$ 的排列，对于任何元素都满足 $a_i \ne i$
这样的排列有多少？
利用容斥原理推导：
[OI-Wiki 错位排列](https://oi-wiki.org/math/combinatorics/derangement/#%E9%94%99%E4%BD%8D%E6%8E%92%E5%88%97 "Permanent link")

![错位排列的容斥推导](../../assets/note-images/Pasted%20image%2020250817203103.png){width=973 height=197}

这里我们可以参考 二项式反演 去理解

错位排列数满足递推关系

$$
D_n=(n-1)(D_{n-1}+D_{n-2})
$$

$$
D_{1}=0,D_{2}=1
$$

这里也给出另一个递推关系：

$$
D_n=nD_{n-1}-(-1)^n
$$

### 圆排列:
$n$ 个不同的数，围成一圈的圆排列数，记做：$Q_{n}^{n}$
递推公式：

$$
Q_{n}^{n}=\frac {A_{n}^{n}}{n}=(n-1)!
$$

$$
Q_{n}^{m}=C_{n}^{m}*Q_{m}^{m}
$$

### 卡特兰数:
#### 公式
注意：
当 n 大于等于19 的时候，$H_n$ 就会超过 long long
而对于开的 long long ，n 在 33 往后就要爆炸了 ！！BOOM！！

![卡特兰数的三种公式及前九项](../../assets/note-images/Pasted%20image%2020250817161610.png){width=1494 height=385}

![卡特兰数的六类计数应用](../../assets/note-images/Pasted%20image%2020260901143341.png){width=1616 height=572}

#### ex卡特兰数
如果是 $n\times m$ 的网格，那我们又该如何是好？

$$
C_{2n}^{n}-C_{2n}^{m-1}
$$

依旧是用网格的对称性来映射，参考第一推理：

### 斯特林数：

公式递推的共同点是：

初始值：

$$
S_{0}^{0}=1,S_{1}^{0}=0
$$

除了 $n=0$ 以外，其他的 $m=0$ 的值都是 $0$。
对比打出来的表格就可以了。
#### 第二类斯特林数/ 斯特林子集数：
##### 公式+理解：
这类斯特林数通常表示： $S_{n}^{m}$

对于有着 n 个元素的一个集合划分成 m 个非空集合的方案数

将 n 个小球 放到 m 个盒子里，保证每个盒子都不是空的。

注意：前提是保证了 m 个集合是统一性的。 例如：
m个房子，m个相同的盒子
否则还需要的对 m 做全排列
递推式：

$$
S_{n}^{m}=S_{n-1}^{m-1}+m*S_{n-1}^{m}
$$

#### 第一类斯特林数/斯特林轮转数：

***将 n 个元素划分成 m 个非空圆排列 的方案数***
##### 公式：

$$
S_{n}^{m}=S_{n-1}^{m-1}+(n-1)*S_{n-1}^{m}
$$

## 多项式：
### 二项式定理：

$$
(a+b)^n=\sum_{i=0}^{n}C_{n}^{i} \times a^{n-i}\times  b^i
$$

定理的运用：

1. 用于将 求和的遍历 加速成 一个式子直接求。
2. 用于将 方程转换 例如 $(x+1)^n=\sum_{i=0}^{n}C_{n}^{i} \times x^{i}$

### 二项式反演：

$$
f(n)=\sum_{i=0}^{n}C_{n}^{i}\times g(i) \Longleftrightarrow  g(n)=\sum_{i=0}^{n}(-1)^{n-i} \times C_{n}^{i} \times f(i)
$$

二项式反演 很多时候其实就是一个容斥原理的 题目
#### 运用场景：
##### 1.恰好 --> 至多型
$g(m)$ 表示**恰好**满足条件（$=m$）的方案数（答案）
$f(m)$ 表示**至多**满足条件（$\le m$）的方案数 (方便求的)
先求出 $f(m)$，再反演求 $g(m)$

![二项式反演至多型从 0 到 m 的求和范围](../../assets/note-images/Pasted%20image%2020250822160047.png){width=330 height=93}

$$
f(m)=\sum_{i=0}^{m}C_{m}^{i}\times g(i) \Longrightarrow  g(m)=\sum_{i=0}^{m}(-1)^{m-i} \times C_{m}^{i} \times f(i)
$$

##### 2.恰好 --> 至少型
$g(m)$ 表示**恰好**满足条件（$=m$）的方案数（答案）
$f(m)$ 表示**至少**满足条件（$\ge m$）的方案数 (方便求的)
先求出 $f(m)$，再反演求 $g(m)$

![二项式反演至少型从 m 到 n 的求和范围](../../assets/note-images/Pasted%20image%2020250822160404.png){width=318 height=98}

$$
f(m)=\sum_{i=m}^{n}C_{i}^{m}\times g(i) \Longrightarrow  g(m)=\sum_{i=m}^{n}(-1)^{i-m} \times C_{i}^{m} \times f(i)
$$

### 斯特林反演：
#### 变换一的推导：

![用第二类斯特林数将幂展开成下降阶乘](../../assets/note-images/Pasted%20image%2020250821193647.png){width=689 height=141}

$$
x^n=\sum_{k=0}^{n}C_{x}^{k}\ S_{n}^{k}\ k!
$$

注意可以用 NTT 计算固定 n 的情况下， 斯特林数和 k 有关的所有值，复杂度为 `O(nlogn)`
#### 反斯特林反演求表达式：

$$
S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n
$$

### 范德蒙德卷积公式：
#### 公式:

$$
\sum_{i=0}^{k}C_{n}^{i}C_{m}^{k-i}=C_{n+m}^{k}
$$

#### 总结公式版：
理解就是 ：
在两个或者多个不同的集合中，选择一共 k 个物品  = 这些集合合并成一共大集合，在大集合里取 k 个物品

$$
\sum_{i=\mathrm{low}}^{\mathrm{up}}C_{n}^{i-\mathrm{low}}\ C_{m}^{\mathrm{up}-i}=C_{n+m}^{\mathrm{up}-\mathrm{low}}
$$

### 生成函数的运用
#### 泰勒展开式
##### 普通生成函数展开：

$$
\frac{1}{1-x}= 1+ x^1+x^2+x^3+x^4+\cdots=\sum_{n \geqslant 0}^{\infty} x^n
$$

然后就是由这个式子推导出来的变形：

![普通生成函数的三个级数展开](../../assets/note-images/Pasted%20image%2020250825160946.png){width=441 height=160}

讲一下（4） 是怎么变出来的，我们将原式子左右两边求导，就可以了

同时我们利用公式，求出 一些有穷函数的结论：

$$
1+x+x^2=\frac{1-x^3}{1-x} \Longrightarrow \sum_{i = 0}^{n} x^i =\frac{1-x^{n+1}}{1-x}
$$

##### 指数生成函数展开:

$$
e^x=1+\frac {x}{1!}+\frac {x^2}{2!}+\frac {x^3}{3!}+\cdots=\sum_{n \geqslant 0}^{\infty} \frac{x^n}{n!}
$$

由上面的这个式子变形得到的。

![指数生成函数的交错、偶次和奇次展开](../../assets/note-images/Pasted%20image%2020250825161417.png){width=399 height=183}

#### 生成函数的tricks：
##### k阶前缀和：
举个例子，有一个序列 $A(n)=\langle a_1,a_2,a_3,\ldots,a_nangle$。
那么此时 这个序列可以构造成一个 普通生成函数：

$$
A(n)=0+a_1x+a_2x^2+a_3x^3+\cdots+a_nx^n
$$

如果我们要求前缀和，可以构造另一个生成函数 $B(n)=1+x+x^2+x^3+\cdots+x^n$
此时如果我们对 $A(n)$ 和 $B(n)$ 做卷积。
那么 此时每个系数就是 我们熟知的 第 i 项前缀和了

优化一下，用 泰勒展开式带入， 将 $B(n)$ 的多项式看成 $\frac{1}{1-x}$ ,此时我们可以算出 k阶前缀和
利用广义二项式展开：

$$
\frac{1}{(1-x)^k}=\sum_{i=0}^{\infty} C_{k-1+i}^{i} x^i
$$
就可以求 k 阶 序列 A 的k 阶前缀和了，如果k太大了，我们还需要用 NTT 优化，别问我为什么不能是 TNT ，我也想炸掉他们。

##### k阶差分
和前缀和方法差不多，构造一个 B 多项式为 $(1-x)$，此时与 $A(n)$ 做卷积就是 $A(n)$ 的差分了
k阶同理，不同的是 K 阶差分是 $(1-x)^kA(n)$ .这个只要用 二项式定理展开就好了：
变成 $(1-x)^k=\sum_{i=0}^{\infty} C_{k}^{i}(-1)^i*x^i$
都不要用 NTT 了，直接算。

模版题：[P5488 差分与前缀和 - 洛谷](https://www.luogu.com.cn/problem/P5488)

### 广义二项式定理：

$$
\frac{1}{(1-x)^n}=\sum_{i=0}^{\infty}C_{n+i-1}^{i}x^i=\sum_{i=0}^{\infty}C_{n+i-1}^{n-1}x^i
$$

我们通常是利用这个来求特定$x^i$的系数。

### 莫比乌斯反演：
#### 公式：

$$
\tilde f(n)=\sum_{d\mid n} g(d) \Longleftrightarrow \tilde g(n)=\sum_{d\mid n} \mu(d) f(\frac{n}{d})
$$

#### 莫比乌斯反演常规应用：

1. $[\gcd(i,j)=1]=\tilde \mu(\gcd(i,j))=\sum_{d\mid\gcd(i,j)}\mu(d)=\sum_{d\ge 1}\mu(d)[d\mid i][d\mid j]$（黄金代换）

2. $\sum_{i=1}^{n} [\gcd(i,n)=1]=\varphi(n)$ 这里容易和上面的黄金代还搞混

3. $\sum_{i=1}^{n/d} 1=n/d$

## 字符串哈希
用字符串哈希的方法
选定质数 $p=131$
模数 $\operatorname{mod}=10^9+7$

$$
\operatorname{Hash}(s1)=\sum_{i=0}^{n-1}s_i \times p^i
$$

判断两个字符串是否相等时，可以通过 哈希值的方式 判断（冲突概率很小可以忽略，但只能判断相等与否）

## 概率 DP Trick：期望、方差与矩递推

### 1. 期望与方差的常用公式

**期望的线性性质：**

$$
E[aX+bY+c]=aE[X]+bE[Y]+c
$$

**独立变量的乘积期望：**

$$
X,Y\text{ 独立}\implies E[XY]=E[X]E[Y]
$$

**方差与期望的转化：**

$$
\boxed{\operatorname{Var}(X)=E[X^2]-(E[X])^2}
$$

$$
\boxed{E[X^2]=\operatorname{Var}(X)+(E[X])^2}
$$

特别注意：

$$
E[X^2]\ne(E[X])^2
$$

**方差的常用性质：**

$$
\begin{aligned}
\operatorname{Var}(aX+b)&=a^2\operatorname{Var}(X)\\
\operatorname{Var}(X+Y)&=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)
\end{aligned}
$$

其中：

$$
\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]
$$

若 $X,Y$ 独立，则协方差为 $0$，方差可以直接相加。

### 2. 全期望公式

按互斥且完备的事件 $A_1,\ldots,A_m$ 分类：

$$
\boxed{E[X]=\sum_{j=1}^{m}P(A_j)E[X\mid A_j]}
$$

**Trick：** 遇到随机状态转移，按照每种操作的发生概率分类，分别计算转移后的期望，再加权求和。

### 3. 矩递推

定义随机变量 $X_i$ 的 $k$ 阶原点矩：

$$
m_{i,k}=E[X_i^k],\qquad m_{i,0}=1
$$

假设每轮状态转移为：

$$
X_i=
\begin{cases}
X_{i-1}+w_i,&\text{概率 }q_i\\
0,&\text{概率 }1-q_i
\end{cases}
$$

根据全期望公式与二项式定理：

$$
\boxed{
m_{i,k}=q_i\sum_{j=0}^{k}\binom{k}{j}w_i^{k-j}m_{i-1,j}
}
$$

特别地：

**一阶矩：**

$$
E[X_i]=q_i(E[X_{i-1}]+w_i)
$$

**二阶矩：**

$$
\boxed{
E[X_i^2]=q_i\left(E[X_{i-1}^2]+2w_iE[X_{i-1}]+w_i^2\right)
}
$$

**三阶矩：**

$$
E[X_i^3]=q_i\left(E[X_{i-1}^3]+3w_iE[X_{i-1}^2]+3w_i^2E[X_{i-1}]+w_i^3\right)
$$

维护前 $k$ 阶矩，每轮 $O(k^2)$，总复杂度 $O(nk^2)$。

### 4. 核心结论

- **期望的平方不等于平方的期望**，差值为方差。
- **求平方期望维护一阶矩、二阶矩**；求 $k$ 次方期望通常维护前 $k$ 阶矩。
- 随机状态满足多项式转移时，优先考虑全期望公式和矩递推，避免维护完整概率分布。
- 多轮产出之和的期望可以利用线性性直接累加：$E[\sum_iY_i]=\sum_iE[Y_i]$，不要求各轮独立。

**识别模型：随机状态转移 + 多项式期望目标 $\Rightarrow$ 全期望公式 + 矩递推。**
