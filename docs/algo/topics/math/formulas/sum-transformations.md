---
title: "和式变换：（核武器）"
sidebarOutline: true
---

# 和式变换：（核武器）

## 和式变换的规则（核裂变）
 1. 分配律：
 $\Large \displaystyle \sum_{k \in K} ca_k =c\sum_{k \in K}a_k$

 2. 结合律：
$\Large \displaystyle \sum_{k \in K} (a_k+b_k)= \sum_{k \in K}a_k+  \sum_{k \in K}b_k$

 3. 交换律：
 $\Large \displaystyle \sum_{k \in K}a_k=\sum_{p(k) \in K} a_{p(k)}$
   这里的含义是，我可以排列 $a_k$的求和顺序，例如：$a_1+a_2+a_3=a_3+a_2+a_1$
## 和式变换技术（核聚变）
1. 替换条件式：

$\Large \displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d|gcd(i,j)}d =\sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d=1}^{n} [d|i] [d|j] d$ (`[d|i]` 属于条件式，满足d|i 为1，否则0)
可以根据 公约数的性质来证明 。

2. 替换指标变量：

$\Large \displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}[gcd(i,j)==k]=\sum_{ik=1}^{n} \sum_{jk=1}^{n} [gcd(ik,jk)==k,即gcd(i,j)==1]$
=>$\Large \displaystyle\sum_{i=1}^{n/k} \sum_{j=1}^{n/k}[gcd(i,j)==1]$
利用 替换 $i=i'k$  ,然后转换成  $i'$ 的公式就可以了
$\Large \displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}[gcd(i,j)==k]=\sum_{i=1}^{n} \sum_{j=1}^{n}[gcd(i/k,j/k)==1][k|i][k|j]$

3. 交换求和次序：

$\Large \displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}A(i)B(j)=\sum_{j=1}^{n}\sum_{i=1}^{n} A(i)B(j)$

4. 分离变量：

$\Large \displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}A(i)B(j)=\sum_{i=1}^{n}A(i)\sum_{j=1}^{n} B(j)$
保证 $A(i)$ 的变量 独立，与其他变量无关，则可以提出来计算 。

5. 互质转莫比乌斯：
$\Large \displaystyle [gcd(i,j)==1] =\sum_{d|gcd(i,j)}^{}\mu(d)=\sum_{d=1}^{n} [d|i] [d|j] \mu(d)$ (莫反的黄金代还)
6. 连积转指数求和：
$\Large \displaystyle\prod_{d=1}^{n}\prod_{i=1}^{n} \prod_{j=1}^{m} f(d)^{[gcd(i,j)==d]} =  \prod_{d=1}^{n} f(d)^{\sum_{i=1}^{n} \sum_{j=1}^{m}[gcd(i,j)==d]}$
我们甚至可以参考 第二条性质 来承接 这条性质。
## 进阶求和公式变化：
### 普通函数连乘变换
$\huge \displaystyle \sum_{i=0}^{n}\sum_{j=0}^{i}=\sum_{j=0}^{n}\sum_{i=j}^{n}$
正常 直接交换左边的式子的两个求和是不行的，因为 j 的上限是 i ，有 i 的因素。

所以要转换：
公式理解可以看成是 i ，j 的下三角遍历，
等式的左边是 从 第一行往下遍历，
等式右边则是 从 第一列开始往右遍历。
这两种遍历方式都遍历了这个下三角，所以可以互相转换。

![双重求和按行与按列遍历下三角区域](../../../../assets/note-images/Pasted%20image%2020250822152038.png){width=354 height=417}

### 积性函数求和变换
$\large \displaystyle\sum_{d|n}\sum_{k|\frac{n}{d}}=\sum_{k|n}\sum_{d|\frac{n}{k}}$
打表模拟一下
左边是一行一行枚举
右边是一列一列枚举
左右等价。
