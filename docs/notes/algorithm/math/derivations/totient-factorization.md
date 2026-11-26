---
title: "欧拉函数和质因数分解"
algorithms: []
sidebarOutline: true
---

# 欧拉函数和质因数分解：

## 欧拉函数:


### 概念：

 $\Large \varphi (n)$ 欧拉函数，表小于 n 中 与 n 互质的数的个数。

```cpp
int ohla(int x)
{
    int res=x;
    for(int i=2;i*i<x;++i)
    {
        if(x%i==0)
        {
            res=res/i*(i-1);
            while(x%i==0) x/=i;
        }
    }
    if(x>1) res=res/x*(x-1);
    return res;
}
```

### 欧拉定理：

1. 如果满足 a , b 互质，那么$a^{\varphi (b)}=1 (mod \ b)$

$$
\large a^{b}\equiv a^{b (mod\  \varphi(m))} (mod \ m)
$$





![欧拉定理的同余结论](../../../../assets/note-images/Pasted%20image%2020250602193726.png){width=1129 height=579}

费马小定理可以看成是欧拉定理的特殊情况（m为质数）
```cpp
int n;
int ohla(int x)//欧拉函数
{
    int res=x;
    for(int i=2;i*i<=x;++i)
    {
        if(x%i==0)
        {
            res-=res/i;
            while(x%i==0) x/=i;
        }
    }
    if(x>1) res-=res/x;
    return res;
}
int qm(string s,int p)//string 取mod

{
    int b=0,fff=0;
    for(int i=0;s[i];++i)
    {
        b=(b*10)+(s[i]-'0');
        if(b>=p) fff=1,b%=p;
    }
    if(fff) b+=p;
    return b;
}
void solve()
{
    int a,m;
    cin>>a>>m;
    string b;cin>>b;
    int phi=ohla(m);
    int k=qm(b,phi);
    cout<<ksm(a,k,m)<<endl;
}
```


### 练习：


#### [220. 最大公约数](https://www.acwing.com/problem/content/222/)

给定整数 N，求 1≤x,y≤N 且` GCD(x,y)` 为素数的数对 `(x,y) `有多少对。

`GCD(x,y)` 即求 `x，y` 的最大公约数
$1≤N≤1e7$

相当于 对于每个小于 n 的质数，求  1 -> $\displaystyle\frac{n}{pri_i}$  中 互质的素数对。
也就是 $\displaystyle\frac{n}{pri_i}$  的欧拉函数前缀和，欧拉函数可以融入欧拉筛中一起解决。
```cpp
int primes[N], cnt;
bool st[N];
int phi[N];
int s[N];

void init(int n)
{
    for(int i=2;i<=n;i++)
    {
        if(!st[i])
        {
            primes[cnt++]=i;
            phi[i] = i-1;
        }
        for(int j =0;primes[j]*i<=n;j++)
        {
            st[primes[j]*i]=true;
            if(i%primes[j]==0)
            {
                phi[i*primes[j]] = phi[i]*primes[j];
                break;
            }
            phi[i*primes[j]] = phi[i]*(primes[j]-1);
        }
    }
    for(int i =1;i<=n;i++)s[i]=s[i-1]+phi[i];
}
void solve() // ll !
{
    int n;cin>>n;
    init(n);
    int ans=0;
    rep(j,0,cnt-1)
    {
        int p=primes[j];
        ans+=s[n/p]*2+1;
    }
    cout<<ans<<endl;
}
```

### 对于欧拉函数的公式变形：

p 为 n 的质因子分解后的单质因子

$$
\Large \varphi(n) =\prod_{p|n}^{}p^a\times(1-\frac{1}{p})=n\prod_{p|n}(1-\frac{1}{p})
$$


证明：
$\varphi(n)$表示 小于 n 中与其互质的数的个数，将其质因数分解：
$\Large \varphi(n)=p_{1}^{b_1}p_{2}^{b_2}p_{3}^{b_3}……p_{k}^{b_k}$
将一个因子拿出来：

$$
\Large \varphi(p_{1}^{b_1})=p_{1}^{b_1}-p_{1}^{b_1} / p_1=(p_{1}^{b_1-1})
$$


因为 与 $\varphi(p_{1}^{b_1})$ 不互质的数只有 带 $p_1$ 的。
所以枚举每一个质因子。

$$
\Large \varphi(n) =\prod_{p|n}^{}p^a\times(1-\frac{1}{p})=n\prod_{p|n}(1-\frac{1}{p})
$$


而那些重复的实际上是乘起来合成一个约数。这样很巧妙

 另一种直观（容斥）解释
把集合 ${1,2,…,e}\{1,2,\dots,e\}{1,2,…,e}$ 中与 $eee$ 互素的数看成“既不被 $p1p_1p1$​ 整除，也不被$p2p_2p2$​ 整除，……”，按容斥原理计算：

- 被 $p_1$​ 整除的数约占比例 $1/p_1$​；

- 不被 $p1​$ 整除的比例是 $1−1/p_1$​；

- 对于不同质因子，容斥后正好得到乘积形式（这与 $\varphi$ 的乘法性本质上是一致的）。


#### 求前缀gcd

[P2303 [SDOI2012] Longge 的问题 - 洛谷](https://www.luogu.com.cn/problem/P2303)
优质好题，每一步都值得细细品味：
题意：
求

$$
\Large \sum_{i=1}^{n}gcd(i,n)
$$


思路：
公式变形：
$\large \displaystyle \sum_{i=1}^{n}gcd(i,n)\longrightarrow \sum_{i=1}^{n}\sum_{d=1}^{n} d\ [gcd(i,n)==d]\longrightarrow \sum_{d=1}^{n} d \sum_{i=1}^{n/d}\ [gcd(i,n/d)==1]\longrightarrow \sum_{d|n}^{}d\ \varphi(n/d)$
这个公式中间少了一个 $[d|n]$ 你发现没有？
最后一步变形的解释：
- 为什么不考虑使用莫比乌斯反演？ 因为莫反后，我们有 $[k|i]\times [k|(n/d)]$ 这两个因子，对于前面的和式来说都不好替换处理掉他们，所以这里使用欧拉函数的定义。
- $\sum_{d|n}$可以理解为$\sum_{d=1}^{n} d\ [gcd(i,j)==d]$ 求和函数的替换，你写成$\sum_{d|i}$ 也是可以的，但是和式交换就要受到限制。

欧拉函数变形：【参考下文的欧拉函数公式变形】

$$
\Large \varphi(n) =\prod_{p|n}^{}p^a\times(1-\frac{1}{p})=n\prod_{p|n}(1-\frac{1}{p})
$$



原式就变成了：
这一步变换参考【积性函数的性质】

$\Large \displaystyle \sum_{d|n}^{}n/d\ \varphi(d)$  然后公式代入后

$\large \displaystyle n\sum_{d|n}\prod_{p|n} (1-\frac{1}{p})$                                       令：1-1/pi 为 f(i)
bi 和 pi 都表示n的质因数分解后 bi 表示第 i 个质因子指数，pi 为第 i 个质因子。
这里将和式里的顺序进行调整：将拥有相同质因子的数放一起（因为他们的$\prod_{p|n} (1-\frac{1}{p})$ 是一样的）就可以得到
令 ： $b_i \times f(i) =X_i$
$\large n(1+X_1+X_2+X_3+X_1X_2+X_2X_3+X_1X_3+X_1X_2X_3……)\longrightarrow n(1+X_1)(1+X_2)(1+X_3)……$
（虽然有点跳跃，但还是值得再推一遍）

然后合并展开得到最终答案：

$$
\Large n\prod_{p|n}b_i\times\frac{p_i-1}{p_i}+1
$$


```cpp
void solve() // ll
{  
    int n;cin>>n;
    vector<pii> bp;
    int ans=n;
    for(auto p:pri)
    {
        if(n%p==0)
        {
            int pi=p,bi=0;
            while(n%p==0)
            {
                bi++;
                n/=p;
            }
            bp.push_back({pi,bi});
        }
        if(n==1) break;
    }
    if(n>1) bp.push_back({n,1});
    int bji=1;
    for(auto x:bp)
    {
        int pi=x.first,bi=x.second;
        ans/=pi;
        ans*=(bi*pi-bi+pi);
    }
    cout<<(int)ans<<endl;
}
```

## 求前缀lcm:

这题本来想着用上一题小粉兔教的方法优化的，但是化出来有问题，就用了题解常用的朴素法：
题意：

$$
求\large \sum_{i=1}^{n}lcm(i,n)
$$


思路：
先公式化简：

$\large \displaystyle \sum_{i=1}^{n}lcm(i,n)=\sum_{i=1}^{n} \frac{i*n}{gcd(i,n)}=n\sum_{i=1}^{n}i \sum_{d|n}\frac{[gcd(i,n)==d]}{d}=n\sum_{i=1}^{n/d}i\ d \sum_{d|(n)}\frac{[gcd(i,n/d)==1]}{d}\longrightarrow$

这里运用到了 积性函数 的性质

$\large \displaystyle n\sum_{d|(n)} \sum_{i=1}^{d}i {[gcd(i,d)==1]}=n\sum_{d|(n)}(与d互质的数的和)$

因为 如果$gcd(i,d)==1$，那么$gcd(i,d-i)==1$

所以与 n 互质的数是关于 n/2 对称的，所以公式变成：（真是妙啊）

$$
\large \displaystyle n\sum_{d|n}\frac {d\ \varphi(d)}{2}
$$


到这一步我就没有继续化简了，但其实有更简单的形式，我会补上的。

因为 n 的范围最大为 1e6 ，所以可以用 欧拉筛+欧拉函数 求出来，时间复杂度为 n

再加上 提前对 约数的枚举 ，求出数组 ans 中每个值的$\sum_{d|n}\frac {d\ \varphi(d)}{2}$ 这一过程（$nlogn$）含有调和级数

时间上够了。
```cpp
int pri[N],phi[N],cnt;
bool vis[N];
int ans[N];
void init(int n)
{
    for(int i=2;i<=n;i++)
    {
        if(!vis[i])
        {
            pri[cnt++]=i;
            phi[i] = i-1;
        }
        for(int j =0;pri[j]*i<=n;j++)
        {
            vis[pri[j]*i]=true;
            if(i%pri[j]==0)
            {
                phi[i*pri[j]] = phi[i]*pri[j];
                break;
            }
            phi[i*pri[j]] = phi[i]*(pri[j]-1);
        }
    }
    rep(i,1,n)
    {
        rep(j,1,n)
        {
            if(i*j>N) break;
            ans[i*j]+=(i==1?1:i*phi[i]/2);
        }
    }
}
void solve() // ll
{  
    int n;cin>>n;
    cout<<ans[n]*n<<endl;
}
```
