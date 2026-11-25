---
title: "莫比乌斯反演"
algorithms: []
sidebarOutline: true
---

# 莫比乌斯反演


## 公式：


$\displaystyle \tilde f(n)=\sum_{d|n} g(d) \Longleftrightarrow \tilde g(n)=\sum_{d|n} \mu(d) f(\frac{n}{d})$


## 证明：

可以利用常用的卷积关系来证明：
$\displaystyle \tilde f=\tilde g*\tilde 1 \longleftrightarrow \tilde \mu *\tilde f=\tilde g*\tilde 1*\tilde \mu \longleftrightarrow \tilde \mu*\tilde f=\tilde g*\tilde \varepsilon=\tilde g$ 

## 莫比乌斯反演常规应用：


1. $\displaystyle [gcd(i,j)==1]=\tilde \mu(gcd(i,j))=\sum_{d|gcd(i,j)} \mu(d)=\sum_{d>=1}^{}\mu(d)[d|i][d|j]$（黄金代换）

2. $\displaystyle \sum{i=1}^{n} [gcd(i,n)==1]=\varphi(n)$ 这里容易和上面的黄金代还搞混

3. $\displaystyle\sum_{i=1}^{n/d} 1=n/d$


## 练习：


### 莫反+和式变换+整除分块套分块

[P1829 [国家集训队] Crash的数字表格 / JZPTAB - 洛谷](https://www.luogu.com.cn/problem/P1829)
因为涉及到 分块套分块 。
所以在 写代码的时候需要保持 大脑在线 （？ 什么代码不需要大脑在线，数学）
（看来是为数不多写代码需要大脑在线的数学题呢）

大意：
给你正整数 n ，m。（1<n,m<1e7）
求 $\displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m} lcm(i,j)$
思路：
首先暴力 $O(nm)$ 会爆炸，考虑公式化简
$lcm(i,j)$ 转换为 $\displaystyle \frac{i*j}{gcd(i,j)}$

 $\displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m} \frac{i*j}{gcd(i,j)}\longrightarrow \sum_{i=1}^{n} i\sum_{j=1}^{m} j\sum_{d=1}^{n}\frac{[gcd(i,j)==d]}{d}$

=> 为了使得转换 分子为互质版本
即：$i= i'd,j=j'd$  放进式子中，然后化简，最后 改 i' 和 j' 为 i 和 j。

$\displaystyle \sum_{d=1}^{n}\sum_{i'd=1}^{n} i'd\sum_{j'd=1}^{m} j'd\frac{[gcd(i'd,j'd)==d]}{d} \longrightarrow \sum_{d=1}^{n}\sum_{i=1}^{n/d} id\sum_{j=1}^{m/d} jd\frac{[gcd(i,j)==1]}{d} \longrightarrow \sum_{d=1}^{n}\sum_{i=1}^{n/d}\sum_{j=1}^{m/d} ijd[gcd(i,j)==1]$

根据莫比乌斯反演：$\displaystyle [gcd(i,j)==1]=\tilde \mu(gcd(i,j))$

$\displaystyle\sum_{d=1}^{n}\sum_{i=1}^{n/d}\sum_{j=1}^{m/d} ijd\sum_{k=1}^{n/d} [k|i][k|j]\mu(k)\longrightarrow\sum_{d=1}^{n}d\sum_{k=1}^{n/d}\mu(k)\sum_{i=1}^{n/d}i[k|i]\sum_{j=1}^{m/d}j[k|j]$

=>当然和上面的替换是一样的，此时消去$[k|i]$ 就要还原 $i=i'k$,然后化简可以得到：

$\displaystyle \sum_{d=1}^{n}d\sum_{k=1}^{n/{dk}}\mu(k)\sum_{i=1}^{n/dk}ik\sum_{j=1}^{m/{dk}}jk\longrightarrow\sum_{d=1}^{n}d\sum_{k=1}^{n/{d}}\mu(k)*k^2\sum_{i=1}^{n/dk}i\sum_{j=1}^{m/{dk}}j$
 
化简到这一步就可以使用整数分块了：对 d 做二维整数分块后 再对 k 做一遍二维整数分块
还需要对 $\sum_{k=1}^{n/{d}}\mu(k)*k^2$ 做预处理，即前缀 $\mu(i)i^2$和
最后结合一下就好了：
结合的过程也是在训练你对和式变换的理解和思维，建议反复练习。

时间复杂度：$O(\sqrt {n} \sqrt {\sqrt{n}})$ 
 代码：
```cpp
int lowbit(int x){ return x&(-x); }
int Mod(int a,int M){return (a%M+M)%M;}
vi vis(N,0),pri;
vi s(N,0);
vi mbws(N,0);
void init()
{
    vis[1]=1;

    mbws[1]=1;
    rep(i,2,N-1)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
            mbws[i]=-1;
        }
        rep(j,0,pri.size()-1)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=pri[j];
            mbws[i*pri[j]]=mbws[i]*-1;
            if(vis[i]<=pri[j])
            {
                mbws[i*pri[j]]=0;
                break;
            }
        }
    }
    rep(i,1,N-1)
    {
        s[i]=(i*i%mod*((mbws[i]+mod)%mod)+s[i-1])%mod;
    }
}
void solve() // ll
{
    int n,m;cin>>n>>m;
    if(n>m) swap(n,m);
    int ans=0;
    for(int dl=1,dr;dl<=n;dl=dr+1)
    {
        dr=min(n,min(n/(n/dl),m/(m/dl)));
        int cn=dr-dl+1,up1=n/dl,up2=m/dl,asw=0;
        for(int kl=1,kr;kl<=up1;kl=kr+1)
        {
            kr=min(up1,min((up1/(up1/kl)),up2/(up2/kl)));
            int up3=up1/kl,up4=up2/kl,T;
            T=(1+up3)*up3/2%mod;
            T=T*(up4*(up4+1)/2%mod)%mod;
            asw=(asw+T*((s[kr]-s[kl-1]+mod)%mod)%mod)%mod;
        }
        ans=(ans+(cn*(dl+dr)/2)%mod*asw%mod)%mod;
    }
    cout<<Mod(ans,mod)<<endl;
}

```

### 连乘转指数求和+整除分块+莫反

（纪念我在luogo平台上的第100道题，可口可乐！）
[P3704 [SDOI2017] 数字表格 - 洛谷](https://www.luogu.com.cn/problem/P3704)
大意：
给你 正整数n ，m， T， （T表示有多少组数据测试）
令`f[i]`为斐波那契数列的 第 i 项
求$\displaystyle\prod_{i=1}^{n} \prod_{j=1}^{m} f(gcd(i,j))$

思路：
当时学得时候有被连乘吓到，看完 董晓叔叔 的教程后 大为震惊 ，啊，数学真是太奇妙了。

接下来为你展示神奇的公式推导：

因为是连乘符号，所以在处理公式时要注意不能乘0，换到指数上。
$\displaystyle\prod_{i=1}^{n} \prod_{j=1}^{m} f(gcd(i,j)) \longrightarrow \prod_{i=1}^{n} \prod_{j=1}^{m}\prod_{d=1}^{n} f(d)^{[gcd(i,j)==d]}\longrightarrow\prod_{d=1}^{n}\prod_{i=1}^{n} \prod_{j=1}^{m} f(d)^{[gcd(i,j)==d]}$

关键步骤：将外面的连乘符号转到内部函数的指数上做连和，这一步是为了方便黄金代还后的公式
$\displaystyle \prod_{d=1}^{n} f(d)^{\sum_{i=1}^{n} \sum_{j=1}^{m}[gcd(i,j)==d]}$
为什么这一步成立：
我们把相同的`f[d]` 的成积看成是 指数上的求和，因为在这个过程中我们保持 `f[d]`的独立.(带 d 的连乘符号进不去一样）

然后先处理指数上d的问题，再黄金代还,然后化简
(和上一题处理方法一样)
$\displaystyle \prod_{d=1}^{n} f(d)^{\sum_{i=1}^{n/d} \sum_{j=1}^{m/d}[gcd(i,j)==1]} \longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{k=1}^{n/d}\sum_{i=1}^{n/d} \sum_{j=1}^{m/d}[k|i][k|j]\mu(k)}\longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{k=1}^{n/d}\mu(k)\sum_{i=1}^{n/dk} 1\sum_{j=1}^{m/dk}1}$
$\displaystyle\longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{k=1}^{n/d}\mu(k) (n/dk)(m/dk)}$

此时判断能不能预处理，发现内部还有一个求和，思考这个指数还能怎么化简。
在[处理公约质数问题](./summation-transformations.md#处理公约质数问题)这里，有对这个指数的处理细节：
将 $dk=T$ 代入指数式子替换掉原来的 d 和 k。

$\displaystyle\longrightarrow \prod_{d=1}^{n} f(d)^{\sum_{T=1}^{n} \mu(T/d)(n/T)(m/T)}$

然后利用公式交换，任性地把指数的求和拿出来。（反复横跳）
再用指数的计算顺序交换的特点，转化。这一步是为了更好的预处理里面的数据。

$\displaystyle\longrightarrow \prod_{T=1}^{n}\prod_{d=1}^{n} f(d)^{\mu(T/d)(n/T)(m/T)}\longrightarrow \prod_{T=1}^{n}\prod_{d=1}^{n} {(f(d)^{\mu(T/d)})}^{(n/T)(m/T)}\longrightarrow \prod_{T=1}^{n} {(\prod_{d=1}^{n} f(d)^{\mu(T/d)})}^{(n/T)(m/T)}$
为什么上面的这个连乘可以放里面？因为这里的 外面套的指数和 d 无关，则 d 的连乘式可以放里面而不影响结果。

假设括号内的数可以看成一个函数 `F[T]` 那么式子就转换成了

$\displaystyle\longrightarrow\prod_{T=1}^{n} {F[T]}^{(n/T)(m/T)}$

这一块似乎使用 连乘版 的整除分块就可以计算了，如果我们有一个使得查询 `F[T]` 的表格。
如何预处理这一块 又是一门学问！！

$\displaystyle \longrightarrow\prod_{d=1}^{n} f(d)^{\mu(T/d)}$

如果要d和T 的枚举，我们发现会有一个 $O(n^2)$ 的时间复杂度，这不又回去了吗？
但是我们发现 这个 (T/d) 很有味道，如果我们先枚举 d ，再将d 的每个倍数 ，将$f(d)^{\mu(T/d)}$进每个对应的 `F[T]` 上,那我就可以得到一个
$O(nlon(n))$ 的时间复杂度 （含调和级数） 大约是 1e7 可以接受。

注意在预处理上我们要有一些小细节：
比如：
- 因为涉及到$\mu(n)=-1$的情况，我们在线性计算斐波那契数列的同时，还要计算其对应的逆元。
- 因为最外层是一个整除分块,所以我们预处理完这个`F[T]`后,还要算前缀积,来方便我们做区间积,区间积要记得乘上逆元。
- 因为涉及到一个很大的指数，我们还要知道拓展欧拉定理(参考本文的[欧拉定理：])，因为模数是一个质数，所以其对应的欧拉函数就是 mod - 1，快速幂计算时 指数变成 其指数 对 （mod - 1） 取模后的指数。

大功告成！！

代码：
```cpp
int lowbit(int x){ return x&(-x); }
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    int sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % M;
        x = (x * x) % M, k >>= 1;
    }
    return sum;
}
vi vis(N,0),pri;
vi s(N,0);
vi mbws(N,0);
vi f(N,0),invf(N,0),F(N,1);
void init()
{
    vis[1]=1;
    mbws[1]=1;
    f[1]=1;
    invf[1]=1;
    for(int i=2;i<N;i++)
    {
        f[i]=(f[i-1]+f[i-2])%mod;
        invf[i]=ksm(f[i],mod-2,mod);
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
            mbws[i]=-1;
        }
        for(int j=0;j<pri.size();++j)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=pri[j];
            mbws[i*pri[j]]=mbws[i]*-1;
            if(vis[i]<=pri[j])
            {
                mbws[i*pri[j]]=0;
                break;
            }
        }
    }
    // F[T]的预处理操作
    for(int d=1;d<N;++d)
    {
        for(int T=d;T<N;T+=d)
        {
            F[T]=Mod(F[T]*(mbws[T/d]==1?f[d]:(mbws[T/d]==0?1LL:invf[d])),mod);
        }
    }
    rep(i,1,N-1) F[i]=(F[i]*F[i-1])%mod;
}
void solve() // ll
{
    int n,m;cin>>n>>m;
    if(n>m) swap(n,m);
    int ans=1;
    for(int l=1,r;l<=n;l=r+1)
    {
        r=min(n,min(n/(n/l),m/(m/l)));
        int d=F[r]*ksm(F[l-1],mod-2,mod);
        ans=Mod(ans*ksm(d,(n/l)*(m/l)%(mod-1),mod),mod);
    }
    cout<<ans<<endl;
}
```

### 数组数据处理方式：

题意：
给你数组 $A$,有 n 个元素。
求：

$$
\sum_{i=1}^{n}\sum_{j=1}^{n}lcm(A_i,A_j)
$$


$1<=n,A_i<=5e4$
思路：
 求这样的 $lcm(i,j)$是有经验的，经典的莫比乌斯反演，但这里却是数组。

因为数组元素的大小最大为 5e4,所以我们可以把 $\sum_{i=1}^{n}\sum_{j=1}^{n}lcm(A_i,A_j)$ 看成 

$$
\sum_{i=1}^{n}\sum_{j=1}^{n}cn[i]cn[j]lcm(i,j)
$$


然后就进行公式转换，根据上面的题目的经验：你成功将其变成了：


$$
\sum_{d>=1}^{}d\sum_{T=1}^{n}\mu(T/d)T^2/d^2\sum_{i=1}^{n/T}\sum_{j=1}^{n/T}cn[i\ T]cn[j\ T]\ i\ j
$$


此时还要进一步优化公式：


$$
\sum_{T=1}^{n}T(\sum_{i=1}^{n/T}cn[i\ T]\ i)^2(\sum_{d|T}^{}\mu(d)\ d)
$$


第二个括号内的公式需要用调和级数的复杂度预处理，（枚举每个因子d，再枚举d的倍数加上对应的权值）

然后就是 $\displaystyle \sum_{T=1}^{n}\sum_{i=1}^{n/T}$ 的时间复杂度为$O(nlogn)$。很神奇，这里居然可以暴力。


```cpp
vi vis(N,0),pri;
vi s(N,0);
vi mu(N,0);
void init()
{
    vis[1]=1;

    mu[1]=1;
    for(int i=2;i<=N;i++)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
            mu[i]=-1;
        }
        //rep(j,0,pri.size()-1)
        for(int j=0;j<pri.size();++j)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=pri[j];
            mu[i*pri[j]]=mu[i]*-1;
            if(vis[i]<=pri[j])
            {
                mu[i*pri[j]]=0;
                break;
            }
        }
    }
    // 前缀和操作：
    for(int i=1;i<N;++i)
    {
        for(int j=1;i*j<N;++j)
        {
            s[i*j]+=mu[i]*i;
        }
    }
}
void solve() // ll
{
    int n;cin>>n;
    vi cn(N,0);
    int mx=0;
    rep(i,1,n)
    {
        int a;cin>>a;
        cn[a]++;
        mx=max(a,mx);
    }
    int ans=0;
    for(int i=1;i<=mx;++i)
    {
        int v=i*s[i];
        int p=0;
        for(int j=1;j<=mx/i;++j)
        {
            if(i*j>mx) continue;
            p+=cn[i*j]*j;
        }
        ans+=v*(p*p);
    }
    cout<<ans<<endl;
}   
```
