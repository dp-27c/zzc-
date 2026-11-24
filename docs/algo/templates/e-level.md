---
title: E级trick
algorithms: []
sidebarOutline: true
---

# E级trick
## 复杂度优化

- GCD 效率
如果 一个集合内 不断增加数，那么这个集合的 gcd  变化次数最多只有 `logC` (C为值域)
- 取mod 效率
如果 一个数 对于很多个不同的模数取模，那么这个数的变化次数最多只有 `logx` 次（x为这个数大小）

## 数学：

### GCD trick
1.

   $$
   gcd(a,b)=gcd(a,b\pm k*a)
   $$

   这其实表示，可以消去 a 的线性组合，同理还有多参的情况下 $gcd(a,b,c) = gcd(a,b,c-  k_1\times a- k_2\times b)$。
   证明：若我们定义，g 为最后的$gcd(a,b,c)$ ,那么 $gcd(a,b,c \pm k\times g)$ 仍然不会改变 答案是 g,

   $$
   gcd(a^k,b^k) = gcd(a,b)^k
   $$

   可以用分解质因数来证明。

2. 这个同理可以用第一条trick来证明：

   $$
   \text{如果 }x > y,\ x-y\ge gcd(x,y)
   $$

3. 令 $d(x)$表示 x 的约数个数

4. $d(i \times j) =\sum_{x|i}\sum_{y|j} [gcd(x,y)==1]$(还没有理解出证明过程！！)

5. ![各数量级内约数最多的数及其质因数分解](../../assets/note-images/Pasted%20image%2020260109193627.png){width=1030 height=431}

6. 在 1 e 7 的数据范围下， 相邻质数的间距最大值是 150 ,

7. ![伯特兰定理中的素数存在区间](../../assets/note-images/Pasted%20image%2020260803152556.png){width=683 height=44}

8. 欧拉函数

   $$
   \huge a^{\varphi(c) }\equiv 1(\bmod c )
   $$

   前提是   $gcd(a,\varphi(c)) = 1$

### 同余

#### 取模逆元时const
在对变量型数作为mod 做乘法的逆元时，时间上比 常数型数做mod要慢很多。
**建议模数设为常数。**
#### 手算逆元 ：
$a*x =1 (mod p) => x=\displaystyle  \frac {(p+1)}{a}$
x 为 a的逆元，这类通常适合a比较 小并且用逆元的地方只有 一次两次，此时直接计算的也可以。
没说不让你用 费马小定理+快速幂。

#### 拓展

如果满足 $\huge a^{x}\equiv 1(\bmod c )$
那么 $\huge a^{k*x}\equiv 1(\bmod c )$

#### mod 转 基本运算
（1）
$a \% b \to a-\left\lfloor\frac{a}{b}\right\rfloor \times b$
（2）
$如果(x<p) x\ mod \ p=x; 如果 x > p,x\ mod \ p<\displaystyle \frac{x}{2}$
即： $x \ mod\  p$ 要么等于 x 自己，要么小于 自己的一半，在复杂度优化有应用  

#### 固定 起点 和 步长，求mod意义下的最大值：
x为起点，s 为步长，M 为模数,g 为 $gcd( s , M )$

$$
\large max_{k}(x+sk(mod\ M)) \longrightarrow M - g +(x \ mod \ g)
$$

理由：x 对 g 的模数始终不变，$gcd(s/g,M/g) = 1$，因此 s/g 可以到到达 M/g 的任意模数（对M/g加法取模的 一个群），x为0时，最大为 $g \times (\frac{M}{g} - 1)$.

#### 二维01图的重心
1. 基本条件：
0 的个数记作`cn0` , 1 的个数记作`cn1` ，01图为 `n * n` 的01矩阵
行从 0 — n-1 ,列从 0 — n-1
满足 ： `gcd(cn1,n) == 1` ，才保证一定存在重心。

2. 重心：
重心的位置：
所有 1 的行之和为 `sx` ,所有 1 的列之和为 `sy` 

$$
\large sx \times cn1^{-1} = r , sy \times cn1^{-1}=c
$$

`{r,c}` 就是这个图的重心。
证明： 考虑相对位置，所有以`{r,c}` 为原点的 1 ，$\sum_{}^{}(x-r) = sx - cn1\times r$, y 上同理
因此存在`{0,0}` 唯一解：`{r,c}`
（`gcd(cn1,n) == 1`，所以一定存在 cn1 在 n 下的逆元。）

重心的性质：
![平移、旋转、镜像和反色对相对坐标和的影响](../../assets/note-images/Pasted%20image%2020261015154139.png){width=978 height=503}

所以经过上面任意变换后，这个二维图的重心仍是当初那个点（不是原图的重心位置，而是重心位置跟着一起变换后的位置）

### 公式转化：
#### 大小关系 转 整除关系

$$
\Large [u < v] = [u \le v-1] = 1\ +\ \left \lfloor \frac{v-1-u}{m} \right \rfloor
$$

注意：$\left\lfloor \frac{-1}{2}\right\rfloor$ 应该为 $-1$ , C++ 代码中的整除会等于 0 （向0方向取整），M保证是正整数，且保证答案只有 0 和 1

####  mod 转 整除

$$
\large a \% b = {\Huge a-\left \lfloor \frac{a}{b}  \right \rfloor \times b}
$$

#### 二项式转组合数

$$
\huge (1+x)^{p}=\sum_{i=0}^{p}C_{p}^{i}*X^i
$$

$C_{p}^{i}$可以看成是 $X^i$的系数

#### 集合并集转交集容斥：
$|s_1\cup s_2 \cup s_3……|=|s_1|+|s_2|+|s_3|……-|s_1\cap s_2|-|s_1\cap s_3|……$

#### 加减 转 异或与
1.

   $$
   \Large x+y = x\oplus y + 2(x\&y)
   $$

2.

   $$
   \Large x-y = x\oplus y - 2((\sim x)\&y)
   $$

3.

   $$
   \Large x-y = 2(x\&(\sim y)) - x\oplus y
   $$

4.

   $$
   \large A | B =(A+B)-(A\&B)
   $$

### 进制关系
#### 1111…1111

$88888……8888$ 这样一共 x  个 8 的十进制数
-> $8*(11111……111)(x个1)$ 
-> $\huge 8*\displaystyle \frac{10^{x+1}-1}{9}$  
设这个数等于 L ，令$C = \displaystyle \frac{9*L}{8}$
-> $\huge 10^{x+1}=1(mod C)$

将这个 x 转换进可运算
#### 判断数是不是3的幂：
1162261467 是 int 范围内最大的3次幂
3 次幂的数分解质因数后只有3这个因子。
这样就可以快速判断 x 是否有除3以外的别的因子
```cpp
bool panduan(int x)
{
	return x>0&&1162261476%x==0
}
```
#### 快速求从数值 l 到 r 的 与 和
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
#### 翻转 位数，从32位开始二进制翻转
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
#### 数2进制上 1 的个数：
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
#### 大于自己的最近2次幂：
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

#### 二进制01tre

由二进制位从 高位 到 地位形成的字典树 
### 递推关系
#### 斐波那契数列

### 前缀 $S_i=F_{i+2}-1$
证明：
将$F_{i+2}$ 不断展开就会变成 $\huge\sum F_i$
#### 前缀变形和

![斐波那契数列的加权前缀和](../../assets/note-images/Pasted%20image%2020250815194510.png){width=583 height=178}

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
![组合恒等式的两种计数顺序](../../assets/note-images/Pasted%20image%2020250821200740.png){width=699 height=141}
#### 5.排列式 
$\huge A_{n}^{m}=\displaystyle\frac{n!}{(n-m)!}$ 

### 线性约瑟夫trick：
大意：
从 1 到 无穷 的正整数排列一队
将 mod p 为 0 的 位置删除。进行多次求第 id 个位置上的数。

1. 固定最后可能的位置，二分模拟每次操作： $\large \displaystyle id' = id' - \left \lfloor \frac{id'}{p} \right \rfloor$

2. 从头开始推，做逆操作：$\large \displaystyle id'=id+\left \lfloor \frac{id-1}{p-1} \right \rfloor$

2的正确性证明：
![每 p 项删除一项前后的下标对应](../../assets/note-images/Pasted%20image%2020251119193225.png){width=522 height=365}
公式中的$id - 1$ 的原因是为了防止 $id'= t\times p -1$ 的  

## 构造：
### 差是定值 的卷积构造

$$
\sum_{i=k}^{n} A_{i-k}B_i
$$

将其中一个数组（这里用B) 反转，即 $B'_{i}=B_{n-i+1}$
变成：

$$
\sum_{i=k}^{n}A_{i-k}B'_{n-i+1} \longrightarrow \sum_{x=0}^{n-k+1}A_{x}B_{(n-k+1)-x}
$$

### 离散二维坐标系
#### 考虑坐标之和
1. 观察标记点的坐标之和 前后 变化，发现不变量 和 规律。

2. n阶矩阵可能存在重心（标记点个数 和 n 互质），使得矩阵相对平移，对称，反转，旋转都是同一个点（不一定是同一个位置）。

## 概率论：
### 均匀分布第 i 小期望
N 个 独立均匀分布随机变量中（变量随机从 `[0,m]` 中取实数） ，第 i 小的期望是：

$$
\Large E(X_i)=\frac{i}{N+1}m
$$

### 离散分布第 i 大期望
n 个数，每个数有自己的带权概率$w_i$和自己的值$V_i$,问每次独立随机抽取 r 次后，第 k 大的数的期望是多少？
首先升序排序数，然后得出：

$$
\Large P(X<=V_i) = \sum_{d=0}^{k-1}C_{n}^{d}\times (\frac{W_{和} - \sum_{j=1}^{i}w_i}{W_{和}})^{n-d} (\frac{\sum_{j=1}^{i}w_i}{W_{和}})^d
$$

总之就是 满足二项分布的小于$V_i$ 的分布函数，表示枚举有 d 个大于$V_i$ 的，其余小于等于 $V_i$ 。

然后差分 

$$
\Large
P(X == V_i) =P(X<=V_i) - P(X<=V_{i-1})
$$

之后就用传统计算期望

### 期望尾和公式 Trick

#### 一、三个核心结论

##### 1. 普通期望定义

对于离散随机变量 $X$：

$$
\boxed{E[X]=\sum_k k\Pr(X=k)}
$$

即每个可能取值乘以对应概率，再求和。
##### 2. 期望尾和公式
对于非负整数随机变量 $T$：

$$
\boxed{E[T]=\sum_{k=1}^{\infty}\Pr(T\ge k)
=\sum_{k=0}^{\infty}\Pr(T>k)}
$$

- $\Pr(T\ge k)$：至少需要进行第 $k$ 次操作。
- $\Pr(T>k)$：前 $k$ 次操作后仍未结束。

**适用场景：** 第一次成功时间、期望操作次数、期望等待时间等。
##### 3. 指示随机变量的期望
对于事件 $A$，定义：

$$
I_A=
\begin{cases}
1, & A\text{ 发生}\\
0, & A\text{ 不发生}
\end{cases}
$$

则：

$$
\boxed{E[I_A]=\Pr(A)}
$$

结合期望的线性性质：

$$
\boxed{E\left[\sum_i I_i\right]=\sum_i E[I_i]}
$$

注意：**期望的线性性质不要求事件相互独立。**
**将随机变量的数值拆成若干个 0/1 事件，再利用期望的线性性质求和。**
**核心转换：**

$$
\boxed{\text{期望计数}\longrightarrow\text{事件概率求和}}
$$

当直接计算 $\Pr(T=k)$ 困难，而计算 $\Pr(T>k)$ 简单时，优先使用尾和公式。
### 随机漫步模型：
#### 固定走n步不能超过界限模型：
随机漫步模型：命中时间定理。

适用于 可以向右跳任意步，但是只能向左跳一步的随机漫步模型

即总共 m 步，从0跳到 -n 这个点（且中途不能小于-n）的概率为：

$$
\Large P(第m步首次到-n)=\frac{n}{m} \times P(m步随便走最后到-n)
$$

#### 首次到达某个目标位置才停止
对于**随机游走直到首次到达某个目标位置才停止**的问题：

如果满足：

1. 每次只向上或向下移动一个单位。
2. 不同位置的转移概率和费用相同（平移不变性）。
3. 存在正向漂移，即向上概率大于向下概率，保证首次到达更高目标的期望时间有限。

那么可以：

**不直接计算从起点到终点的期望，而是先计算从位置 x 首次到达 x+1 的期望。**

然后根据第一次移动的方向建立方程：
如解下面方程：

$$
E=pc_{\mathrm{up}}+q(c_{\mathrm{down}}+2E)
$$

## 杂项：

### 中位数：
1. 一个数组的中位数判断可以二分枚举一个数值，然后与每个元素做对比，比他大的标记为1，小的标记为-1，所有标记求和后 二分搜索左右两侧的。

### 满足平方差的正整数
存在正整数 a , b 使得：

$$
X=\large|a^2-b^2|, a,b\in Z^+
$$

X 满足：
1. 奇数 $(k+1)^2-k^2$
2. 4的倍数但不包括4

## bit
### 异或：
#### 01trie
当考虑到 异或后的值最大 或则 最小值 时，考虑构造01trie 。
在 01trie 中 ，可以找到异或 X 后第 k 大的数
维护 01trie 和 每个点被标记次数：
```cpp
auto get=[&](int x,int k)
{
	int u = 0,s = 0;
	for(int i=29;i>=0;--i)
	{
		int t = (x>>i)&1;
		int v = tr[u][t];
		if(cn[v]<k) u=tr[u][!t],k -= cn[v];//少于k个则往反方向走
		else u = v;
	}
	return pos[u]^x;//pos保存叶子节点的取值，返回异或后的值
};
```
