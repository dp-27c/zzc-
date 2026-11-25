---
title: "质数"
sidebarOutline: true
---

# 质数

## gcd
1. gcd的映射：

   $$
   gcd(a,m)=gcd(a+km,m)，所有a在mod\ m意义下均满足
   $$

证明：
因为$gcd(a,m)=d，因为 d|a,且d|m，所以 d|(a+km)$
反之$gcd(a+km,m)=d,因为 d|m 且d|a+km,将a+km中本来可以整除d的元素删去，就变成了d|a$
2. 求多少数对$(a,b)$满足

   $$
   lcm(a,b)=n
   $$

将 n 质因数分解，$p_1^{b_1}p_2^{b_2}……$
然后对于每个质因子判断， a 有 $b_1$ 个，b 有 $0$~$b_1$ 个,然后 b 有 $b_1$ 个，a 有 $0$~$b_1$ 个 ，一共$2b_i+1$个（去重复）

总共就是$\displaystyle \sum_{p|n}^{}(2b_i+1)$
## 对于欧拉函数的公式变形：
p 为 n 的质因子分解后的单质因子

$$
\Large \varphi(n) =\prod_{p|n}^{}p^a\times(1-\frac{1}{p})=n\prod_{p|n}(1-\frac{1}{p})
$$

## 莫比乌斯反演：（）
### 公式：

$\Large \displaystyle \tilde f(n)=\sum_{d|n} g(d) \Longleftrightarrow \tilde g(n)=\sum_{d|n} \mu(d) f(\frac{n}{d})$

### 证明：
可以利用常用的卷积关系来证明：
$\large \displaystyle \tilde f=\tilde g*\tilde 1 \longleftrightarrow \tilde \mu *\tilde f=\tilde g*\tilde 1*\tilde \mu \longleftrightarrow \tilde \mu*\tilde f=\tilde g*\tilde \varepsilon=\tilde g$ 
### 莫比乌斯反演常规应用：

1. $\large \displaystyle [gcd(i,j)==1]=\tilde \mu(gcd(i,j))=\sum_{d|gcd(i,j)} \mu(d)=\sum_{d>=1}^{}\mu(d)[d|i][d|j]$（黄金代换）
2. $\large \displaystyle \sum_{i=1}^{n} [gcd(i,n)==1]=\varphi(n)$ 这里容易和上面的黄金代还搞混

3. $\large \displaystyle\sum_{i=1}^{n/d} 1=n/d$
