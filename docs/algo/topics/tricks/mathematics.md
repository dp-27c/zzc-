---
title: 数学
sidebarOutline: true
---

# 数学

## 时间效率优化：
- GCD 效率
如果 一个集合内 不断增加数，那么这个集合的 gcd  变化次数最多只有 `logC` (C为值域)
- 取mod 效率
如果 一个数 对于很多个不同的模数取模，那么这个数的变化次数最多只有 `logx` 次（x为这个数大小）

## 质数：
### gcd：
 （1）
 如果 d=gcd(a , b), 存在 c | a 同时 c | b ，那么 c | d. (反之亦然)

（2）
如果 $gcd(i,n)==1$ ,那么 $gcd(i,n\pm k*i)==1$ .  (辗转相除)

拓展：

$$
gcd(a,b)=gcd(a,b\pm k*a)
$$

（3）
这道题需要一点 数论上的 trick：
如果 $x>y$，则 $x-y\ge\gcd(x,y)$。
当且仅当，$\displaystyle \frac{x}{gcd(x,y)}=\frac{y}{gcd(x,y)}+1$ 取等

证明：
我们思考，加入 x = y ，那么很明显 后面式子不成立，但是前提是 严格大于。
分类讨论：
1.  $gcd(x,y) = 1$ ，最坏的情况是  x = y+1，然后： $x-y=1\ge gcd(x,y)=1$ ，符合。
2. $gcd(x,y)>1$ ， 那么 x 至少是 y 的两倍，那么：$x-y\ge y\ge gcd(x,y)$ ， 符合。
因此得证
### 约数
（1）
令 $d(x)$表示 x 的约数个数
（2）
$d(i\  \times \ j) =\sum_{x|i}^{}\sum_{y|j}^{} [gcd(x,y)==1]$(还没有理解出证明过程！！)
（3）

![各值域内的最大约数个数及其质因数分解](../../../assets/note-images/Pasted%20image%2020260109193627.png){width=1030 height=431}
（4）
在 1 e 7 的数据范围下， 相邻质数的间距最大值是 150 , 分别是   ，  
在 1 e 6
(5)
![伯特兰定理的素数存在性结论](../../../assets/note-images/Pasted%20image%2020260803152556.png){width=683 height=44}
## 同余
### 取模逆元时const
在对变量型数作为mod 做乘法的逆元时，时间上比 常数型数做mod要慢很多。
**建议模数设为常数。**
### 手算逆元 ：
$a*x =1 (mod p) => x=\displaystyle  \frac {(p+1)}{a}$
x 为 a的逆元，这类通常适合a比较 小并且用逆元的地方只有 一次两次，此时直接计算的也可以。
没说不让你用 费马小定理+快速幂。

### mod 转 基本运算
（1）
$a\bmod b = a-\left\lfloor\frac{a}{b}\right\rfloor\times b$
（2）
如果 $x<p$，则 $x\bmod p=x$；如果 $x>p$，则 $x\bmod p<\dfrac{x}{2}$。
### 欧拉定理

$\huge a^{\varphi(c) }\equiv 1(\bmod c )$
这个条件的前提是 a 和 其指数互质才成立
看不懂的函数 叫 欧拉函数，求出前c个与c互质的数的数量
### 同余拓展

如果满足 $\huge a^{x}\equiv 1(\bmod c )$
那么 $\huge a^{k*x}\equiv 1(\bmod c )$

## 线性约瑟夫trick：
大意：
从 1 到 无穷 的正整数排列一队
将 mod p 为 0 的 位置删除。进行多次求第 id 个位置上的数。

1. 固定最后可能的位置，二分模拟每次操作： $\large \displaystyle id' = id' - \left \lfloor \frac{id'}{p} \right \rfloor$

2. 从头开始推，做逆操作：$\large \displaystyle id'=id+\left \lfloor \frac{id-1}{p-1} \right \rfloor$

2的正确性证明：
![线性约瑟夫问题逆操作的正确性证明](../../../assets/note-images/Pasted%20image%2020251119193225.png){width=522 height=365}
公式中的$id - 1$ 的原因是为了防止 $id'= t\times p -1$ 的  

## 数字转换

### 1111…1111

$88888……8888$ 这样一共 x  个 8 的十进制数
-> $8*(11111……111)(x个1)$
-> $\huge 8*\displaystyle \frac{10^{x+1}-1}{9}$  
设这个数等于 L ，令$C = \displaystyle \frac{9*L}{8}$
-> $\huge 10^{x+1}=1(mod C)$

将这个 x 转换进可运算
### 判断数是不是3的幂：
1162261467 是 int 范围内最大的3次幂
3 次幂的数分解质因数后只有3这个因子。
这样就可以快速判断 x 是否有除3以外的别的因子

```cpp
bool panduan(int x)
{
	return x>0&&1162261476%x==0
}
```


### 快速求从数值 l 到 r 的 与 和

```cpp
int interval_yuhe(int l,int r)// 快速求l 到 r 的与和
{
    while(l<r)// 找到区间公共位
    {
        r-=lowbit(r);
    }
    return r;
}
```


## 翻转 位数，从32位开始二进制翻转
思路是 归并分治翻转

```cpp
int flip_bit(int x)// 32 位int
{
    x=((x&0xaaaaaaaa)>>1)|((x&0x55555555)<<1);
    x=((x&0xcccccccc)>>2)|((x&0x33333333)<<2);
    x=((x&0xf0f0f0f0)>>4)|((x&0x0f0f0f0f)<<4);
    x=((x&0xff00ff00)>>8)|((x&0x00ff00ff)<<8);
    x=(x>>16)|(x<<16);
    return x;
}
```


## 数2进制上 1 的个数：

```cpp
int count_bit(int x)// 32 位整数,64位，可以提前>>32,分成两个32位1数之和
{
    x=(x&0x55555555)+((x>>1)&0x55555555);
    x=(x&0x33333333)+((x>>2)&0x33333333);
    x=(x&0x0f0f0f0f)+((x>>4)&0x0f0f0f0f);
    x=(x&0x00ff00ff)+((x>>8)&0x00ff00ff);
    x=(x&0x0000ffff)+((x>>16)&0x0000ffff);
    return x;
}
```


## 大于自己的最近2次幂：

```cpp
int upbit(int x)//(1<<62)
{
    if(x<=0) return 1;
    x--;
    x|=x>>1;
    x|=x>>2;
    x|=x>>4;
    x|=x>>8;
    x|=x>>16;
    x|=x>>32; //(1<<62) 之前 
    return x+1;
}
```


## 斐波那契数列

### 前缀 $S_i=F_{i+2}-1$
证明：
将$F_{i+2}$ 不断展开就会变成 $\huge\sum F_i$
### 前缀变形和

![斐波那契数列前缀和的变形](../../../assets/note-images/Pasted%20image%2020250815194510.png){width=583 height=178}
## 组合数学
待补图片（59d384720f0a5b859b2812256ca59d1e.png）

### 组合数常用公式：
#### 1.递推式：
这个公式常用于递推求 组合数的值：
$\huge C_{n}^{k} = C_{n-1}^{k}+C_{n-1}^{k-1}$
#### 2.分离式：
对组合数乘法进行转换优化
$\huge C_{n}^{k}*C_{k}^{j}=C_{n}^{j}*C_{n-1}^{k-1}$
#### 3.通项公式：
$\huge \displaystyle \frac{n!}{(n-m)!m!}=C_{n}^{m}$

#### 4.递推2式
可以减少使用求组合数的模版，在 底数 n 相同的情况下，直接线性递推就好了。
$\huge C_{n}^{i}=\displaystyle \frac{(n-i+1)C_{n}^{i-1}}{i}$

解释：
![组合数递推式的推导](../../../assets/note-images/Pasted%20image%2020250821200740.png){width=699 height=141}
### 排列数的常用公式：

$\huge A_{n}^{m}=\displaystyle\frac{n!}{(n-m)!}$
### 相关杂式：
定义 $\huge J_{n}^{j}=\displaystyle \frac{n!}{(n-j)!}$

那么：
$\huge J_{n}^{j}=J_{n}^{j-1}*(n-j+1)$
这招在 n 为定值时，做递推从而不用做乘法逆元的优化。
### 二项式转组合数
$\huge (1+x)^{p}=\sum_{i=0}^{p}C_{p}^{i}*X^i$
$C_{p}^{i}$可以看成是 $X^i$的系数

### 二维坐标取点方案数

 $\huge C_{a+c}^{k}*C_{d}^{k}*A_{k}^{k}$   这样就是 两个轴分别选k个位置 乘上搭配顺序。
#### 二维网格取三点连线
步骤分成三部分：
1. 斜率无和为0的，即那些垂直与坐标轴的直线，$\huge m*(C_{n}^{3})+n*(C_{m}^{3})$
2. 斜率大于0的，遍历二维`i,j`为 直角三角形的长和高
(**和格点不同，n和m是各点的长度的话要还原到格子的长度:n-1,m-1**)
直角三角形的个数：$\huge (n-i+1)*(m-i+1)$
三角形斜边包含除端点以外的点的个数 : $\huge gcd(i,j) -1$ 即以三角形的两个端点为定的两点，三元找一
个数为 $\huge (n-i+1)*(m-i+1)*gcd(i,j) -1$
3. 斜率小于0的，因为对称，所以和上面一样
这样的找法保证不重不漏，且时间复杂度控制在 $O(m*n)$
### 卡特兰数的递推式：

$\displaystyle\huge H_n=\frac{4n-2}{n+1} *H_{n-1}$

$\huge H_0=1,H_1=1$

### 杨辉三角多项式：

待补图片（Pasted image 20251202104717.png）
i 表示层数：
即 杨辉三角关系： 一层和下一层的递推关系： $F(i)=(x+1) \times F(i-1)$ ，涉及多项式乘法 或者二项式乘法
对于 正宗杨辉三角而言： $F(i)= (x+1)^i$
## 容斥
### 集合并集转交集容斥：
$|s_1\cup s_2 \cup s_3……|=|s_1|+|s_2|+|s_3|……-|s_1\cap s_2|-|s_1\cap s_3|……$
## 和式变换
求和符合之间可以交换，和合并？
！！
待补图片（Pasted image 20250821200945.png）

## 随机漫步模型：
随机漫步模型：命中时间定理。

   适用于 可以向右跳任意步，但是只能向左跳一步的随机漫步模型

   即总共 m 步，从0跳到 -n 这个点（且中途不能小于-n）的概率为：

$$
\Large P(第m步首次到-n)=\frac{n}{m} \times P(m步随便走最后到-n)
$$

证明过程：

待补图片（Pasted image 20260724160104.png）

## 概率论：
N 个 独立均匀分布随机变量中（变量随机从 `[0,m]` 中取） ，第 i 小的期望是：

$$
\Large E(X_i)=\frac{i}{N+1}m
$$

## 卷积构造：
待补图片（Pasted image 20260801213123.png）
