---
title: "狄利克雷函数"
algorithms: []
sidebarOutline: true
---

# 狄利克雷函数



## 狄利克雷生成函数：

$\tilde F(x)=\displaystyle \frac{a_1}{1^x}+\frac{a_2}{2^x}+\frac{a_3}{3^x}+……=\sum_{n=1}^{\infty}\frac{a_n}{n^x}$
简称 DFG

乘法运算：
$\displaystyle\sum_{n=1}^{\infty}\frac{a_n}{n^x}\sum_{n=1}^{\infty}\frac{b_n}{n^x}$
 
=> $\displaystyle \sum_{n=1}^{\infty}\displaystyle \frac{1}{n^x}\sum_{d|n}a_db_{n/d}$


## 积性函数：

规定：$f(1)=1$，当 $\gcd(a,b)=1$ 时，满足 $f(ab)=f(a)*f(b)$
则成为积性函数。(前提是a,b互质)
例如： 欧拉函数 $\varphi(x)$ ，和莫比乌斯函数 $\mu(x)$ 

### 欧拉函数了解加深：

$\varphi(n)=\sum_{i=1}^{n} [gcd(i,n)==1]$ 

性质：
$\sum_{d|n}\varphi(d)=n$
证明：利用真分数


待补图片（Pasted image 20250826145132.png）



### 莫比乌斯函数的加深和了解：

莫比乌斯函数:
$1．定义  \quad \mu(n)=\left\{\begin{array}{cl}1 & n=1 \\ (-1)^{s} & n=p_{1} p_{2} \cdots p_{s} \\ 0 & n \text { 包含相同质因子 }\end{array}\right.$
性质：
$\tilde{\mu}(n)=\sum_{d|n}^{}\mu(d)=[n==1]$

证明：
首先 n=1 时，$\sum_{d|1}^{}\mu(d)=1$
n>1 时，将 n 进行 质因式分解 为$p_1^{k1}p_2^{k2}p_3^{k3}p_4^{k4}……$
令 $n' =p_1p_2p_3p_4……$
因为 莫比乌斯函数中 包含相同质因子的数为 0 。
所以 $\sum_{d|n}^{}\mu(d)=\sum_{d|n'}^{}\mu(d)$
根据容斥原理：
根据取不用数量的质因子的方案：
再根据二相式定理转换 
$C_{s}^{0}+(-1)C_{s}^{1}+(-1)^2C_{s}^{2}+=(1+(-1))^s=0$


### 莫比乌斯函数与欧拉函数的联系：

$\tilde{\mu}(n) * \tilde{id}(n)  \sum_{d|n}^{}\mu(d) \displaystyle\frac{n}{d}=\varphi(n)$

证明：
$\sum_{d|n}^{}\mu(d) \displaystyle\frac{n}{d}= n\sum_{d|n}^{} \displaystyle\frac{\mu(d)}{d}=n(1-(\frac{1}{p_1}+\frac{1}{p_2}+\frac{1}{p_3}+\frac{1}{p_4}……)+(\frac{1}{p_1*p_2}+\frac{1}{p_1*p_3}……))$
=> $n((1-\frac{1}{p_1})(1-\frac{1}{p_2})(1-\frac{1}{p_3})……)$
=> $\varphi(n)$

其实就是 欧拉函数 的容斥展开 。
参考 [容斥原理 + 莫比乌斯函数 + 二维数论分块](../combinatorics/inclusion-exclusion.md#容斥原理-莫比乌斯函数-二维数论分块)。


## 狄利克雷卷积（开卷！！）

定义：
$f(n),g(n)$ 是 两个积性函数。
$(\tilde{f}*\tilde{g})(n)=\sum_{d|n} f(d)g(n/d)=\sum_{d|n} f(n/d)g(d)$
这是 这个卷积的定义，只有做这样的运算时，看成$\sum_{d|n} f(d)$，而单独的 $f(n)$ 不能看成这样。
要将他们全都构造成多项式的狄利克雷生成函数，而不是一个简单的函数值：
比如：

规律： (上面都加上一个 ~)
满足交换律：$f*g=g*f$
满足结合律：$(f*g)*h=f*(g*h)$
满足分配律：$(f+g)*h=f*h+g*h$

三个常用的函数：
1.元函数 $\varepsilon (n)=[n==1]$ 怎么这么像 莫比乌斯函数的约数和

2.常函数：$1(n)=1$

3.恒等函数：${id}(n)=n$


### 常用函数的卷积关系：

1. $\sum_{d|n} \mu(d)=[n==1] => (\mu * 1)(n) =\varepsilon(n)$  
(这一步可以告诉我们，$\mu(n)$变成符合性质的公式时，只需要卷上 常函数)
2. $\sum_{d|n} \varphi(d)=n => (\varphi * 1)(n) =id(n) => \varphi*1=id$

3. $\sum_{d|n} \mu(d)*id(n/i)=\sum_{d|n} \mu(d)*(n/i)=\varphi(n) => \mu*id=\varphi$

4. $\tilde{f}*\varepsilon=\tilde{f}$

5. $\tilde{f}*1 \ne \tilde{f}$
