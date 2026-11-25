---
title: "和式变换：（核武器）"
algorithms: []
sidebarOutline: true
---

# 和式变换：（核武器）


## 和式变换的规则（核裂变）

 1. 分配律：
 $\displaystyle \sum_{k \in K} ca_k =c\sum_{k \in K}a_k$
 
 2. 结合律：
$\displaystyle \sum_{k \in K} (a_k+b_k)= \sum_{k \in K}a_k+  \sum_{k \in K}b_k$

 3. 交换律：
 $\displaystyle \sum_{k \in K}a_k=\sum_{p(k) \in K} a_{p(k)}$
   这里的含义是，我可以排列 $a_k$的求和顺序，例如：$a_1+a_2+a_3=a_3+a_2+a_1$

## 和式变换技术（核聚变）

1. 替换条件式：

$\displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d|gcd(i,j)}d =\sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d=1}^{n} [d|i] [d|j] d$ (`[d|i]` 属于条件式，满足d|i 为1，否则0)
可以根据 公约数的性质来证明 。

2. 替换指标变量：

$\displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}[gcd(i,j)==k]=\sum_{ik=1}^{n} \sum_{jk=1}^{n} [gcd(ik,jk)==k,即gcd(i,j)==1]$
=>$\displaystyle\sum_{i=1}^{n/k} \sum_{j=1}^{n/k}[gcd(i,j)==1]$
利用 替换 $i=i'k$  ,然后转换成  $i'$ 的公式就可以了
$\displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}[gcd(i,j)==k]=\sum_{i=1}^{n} \sum_{j=1}^{n}[gcd(i/k,j/k)==1][k|i][k|j]$


3. 交换求和次序：

$\displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}A(i)B(j)=\sum_{j=1}^{n}\sum_{i=1}^{n} A(i)B(j)$

4. 分离变量：

$\displaystyle \sum_{i=1}^{n} \sum_{j=1}^{n}A(i)B(j)=\sum_{i=1}^{n}A(i)\sum_{j=1}^{n} B(j)$
保证 $A(i)$ 的变量 独立，与其他变量无关，则可以提出来计算 。

5. 互质转莫比乌斯：
$\displaystyle [gcd(i,j)==1] =\sum_{d|gcd(i,j)}^{}\mu(d)=\sum_{d=1}^{n} [d|i] [d|j] \mu(d)$ (莫反的黄金代还)
6. 连积转指数求和：
$\displaystyle\prod_{d=1}^{n}\prod_{i=1}^{n} \prod_{j=1}^{m} f(d)^{[gcd(i,j)==d]} =  \prod_{d=1}^{n} f(d)^{\sum_{i=1}^{n} \sum_{j=1}^{m}[gcd(i,j)==d]}$
我们甚至可以参考 第二条性质 来承接 这条性质。

## 练习：


### 处理互质问题

[题目列表 - 洛谷](https://www.luogu.com.cn/problem/list?type=luogu&keyword=p3455&page=1)
大意：
给定 n ,m , d
求出$\displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m} [gcd(i,j)==d]$
思路：
也许你在做整除分块的题目中有做到过这种，但是我想说的我们可以直接暴力拆解公式的方法去推出这个整除分块。
$\displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m} [gcd(i,j)==d]$ => $\displaystyle \sum_{i=1}^{n/d}\sum_{j=1}^{m/d} [gcd(i,j)==1]$ 此时我们让 n=n/d ,m=m/d.
然后利用 莫比乌斯函数 转换成：
$\displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m}\sum_{d|n}^{} \mu(d)$ =>$\displaystyle\sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d=1}^{n} [d|i] [d|j]\mu(d)$
=> $\displaystyle \sum_{d=1}^{n} \mu(d)\sum_{i=1}^{n}[d|i] \sum_{j=1}^{m}[d|j]$
=>$\displaystyle \sum_{d=1}^{n} \mu(d)(n/d)(m/d)$
这样才来到我们熟悉的整除分块上了。
```cpp
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
    // 前缀和操作：
    rep(i,1,N-1)
    {
        s[i]=s[i-1]+mbws[i];
    }
}
void solve() // ll
{
    int a,b,d;cin>>a>>b>>d;
    a/=d,b/=d;
    int ans=0;
    for(int l=1,r;l<=min(a,b);l=r+1)
    {
        r=min(min(a,b),min(a/(a/l),b/(b/l)));
        ans+=(s[r]-s[l-1])*(a/l)*(b/l);
    }
    cout<<ans<<endl;
}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t_ = 1;
    cin>>t_;
    init();
    while (t_--){solve();}
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```

### 处理公约质数问题

[P2257 YY的GCD - 洛谷](https://www.luogu.com.cn/problem/P2257)
大意：
给定 n,m
求出 $\displaystyle\sum_{p=2}^{pri}\sum_{i=1}^{n}\sum_{j=1}^{m}[gcd(i,j)=p,p\in primes]$
思路：
我们可以参考上一题的方法，只需要带入 `d = pri[i]`, 但是计算时间复杂度，为$O(\sqrt{n}\sqrt{m}(n/lenn)$
因为 n <= 1e7 ，所以要爆炸的，考虑公式化简：
我们先化简到这一步：

$\displaystyle \sum_{p=2}^{pri}\sum_{d=1}^{n/d} \mu(d) \frac{n}{p\ d} \frac{m}{p\  d}$

此时为了方便整除分块，同时为下文铺垫：
我们设 $T=k\ d$

原式化简为：$\displaystyle \sum_{p=2}^{pri}\sum_{T=1}^{n} \mu(T/p) \frac{n}{T} \frac{m}{T}$

=>$\displaystyle \sum_{T=1}^{n}  \frac{n}{T} \frac{m}{T}\sum_{p=2}^{pri} \mu(T/p)$

到了这一步我们只需要对 $\sum_{p=2}^{pri} \mu(T/p)$ 进行预处理。
how？ 还记得我们欧拉筛处理的莫比乌斯函数吗？
枚举 pri 数组中的所有元素，记录 `F[T]` 数组来表示$\sum_{p=2}^{pri} \mu(T/p)$ 
那么就得到 `F[j]+=mu[j/pri[i]]`
为了实现区间`F[T]`的访问，别忘了最后预处理前缀和。

时间复杂度 就变成 了$O(n+{n}{ln\ n}+\sqrt {n})$
对 1e7 的数据 可以了

下面的 `s[i]`数组表示的就是 `F[i]`

```cpp
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
    // 前缀和操作：
    rep(i,0,pri.size()-1)
    {
        for(int j=pri[i];j<N;j+=pri[i])
        {
            s[j]+=mbws[j/pri[i]];
        }
    }
    rep(i,1,N-1)s[i]+=s[i-1]; 
}
void solve() // ll
{
    int n,m;cin>>n>>m;
    int ans=0;
    int pre=1;
    auto cal=[&](int p)
    {  
        int a=n/p,b=m/p,cn=0;
        for(int l=pre,r;l<=min(a,b);l=r+1)
        {
            r=min(min(a,b),min(a/(a/l),b/(b/l)));
            cn+=(s[r]-s[l-1])*(a/l)*(b/l);
        }
        return cn;
    };
    cout<<cal(1)<<endl;;
    //cout<<ans<<endl;
}
```

### 处理约数个数问题：

[P3327 [SDOI2015] 约数个数和 - 洛谷](https://www.luogu.com.cn/problem/P3327)
大意：
$d(x)$设为 x 的约数个数。
求$\displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m} d(ij)$
思路：
首先我们要知道如何转换 这个 $d(ij)$ 

暂时记住：$\displaystyle d(ij)=\sum_{x|i}^{}\sum_{y|j} [gcd(x,y)==1]$

证明过程我会补在思路最后。

然后
原式就变成了 $\displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m}\sum_{x|i}^{}\sum_{y|j} [gcd(i,j)==1]$

进一步转换为：这里用的是「替换条件」

 $\displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m}\sum_{x|i}^{}\sum_{y|j} \sum_{d=1}^{n}[d|x][d|y]\mu(d)$
 
 =>这里就是简单的交换
 
  $\displaystyle\sum_{i=1}^{n} \sum_{j=1}^{m}\sum_{x=1}^{n}[x|i]\sum_{y=1}^{m}[y|j] \sum_{d=1}^{n}[d|x][d|y]\mu(d)$
  
  =>把 $\mu(d)$ 提出来
  
  $\displaystyle\sum_{d=1}^{n}\mu(d)\sum_{x=1}^{n}\sum_{y=1}^{m}\sum_{i=1}^{n}[x|i]\sum_{j=1}^{m}[y|j] ([d|x][d|y])$
  
  => 在证明整数除法的过程中有这一步的详解
  
   $\displaystyle\sum_{d=1}^{n}\mu(d)\sum_{x=1}^{n}\sum_{y=1}^{m}\frac{n}{x}[d|x]\frac{m}{y}[d|y]$
   
   =>这里则是 将 $x=x'd,y=y'd$ 来替换原来的 x 和 y 这样是为了消去 $[d|x]和[d|y]$
   
  $\displaystyle\sum_{d=1}^{n}\mu(d)\sum_{x=1}^{n/d}\frac{n}{x}\sum_{y=1}^{m/d}\frac{m}{y}$
  
  =>然后试着将后面的看成一个函数，想办法预处理他。
  
  设 `F[i]`表示 $\displaystyle \sum_{k=1}^{i}\frac{i}{k}$,`s[i]`为莫比乌斯前缀和。
  
 所以，原式就变成了$\displaystyle\sum_{d=1}^{n}\mu(d) F[n/d]*F[m/d]$
 
 只需要对 `F[i]`数组进行预处理就可以了，如何预处理呢，其实就是整数分块的求法，使得
 n=5e5 的时间复杂度可行。
 
 然后再用一次整数分块处理 $\displaystyle\sum_{d=1}^{n}\mu(d) F[n/d]*F[m/d]$  就终于大功告成了
 
 约数转换证明：（暂时不知道）
 
 $\displaystyle d(ij)=\sum_{x|i}^{}\sum_{y|j} [gcd(i,j)==1]$

```cpp
vi vis(N,0),pri;
vi s(N,0);
vi F(N,0);
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
    // 前缀和操作：
    rep(i,1,N-1)
    {
        s[i]+=s[i-1]+mbws[i];
    }
    rep(i,1,N-1)
    {
        for(int l=1,r;l<=i;l=r+1)
        {
            r=min(i,i/(i/l));
            F[i]+=(r-l+1)*(i/l);
        }
    }
}
void solve() // ll
{
    int n,m;cin>>n>>m;
    int ans=0;
    if(n>m) swap(n,m);
    for(int l=1,r;l<=n;l=r+1)
    {
        r=min(n,min(n/(n/l),m/(m/l)));
        ans+=(s[r]-s[l-1])*F[(n/l)]*F[(m/l)];
    }
    cout<<ans<<endl;
}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t_ = 1;
    cin>>t_;
    init();
    while (t_--){solve();}
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```

## 进阶求和公式变化：


### 普通函数连乘变换

$\displaystyle \sum_{i=0}^{n}\sum_{j=0}^{i}=\sum_{j=0}^{n}\sum_{i=j}^{n}$
正常 直接交换左边的式子的两个求和是不行的，因为 j 的上限是 i ，有 i 的因素。

所以要转换：
公式理解可以看成是 i ，j 的下三角遍历，
等式的左边是 从 第一行往下遍历，
等式右边则是 从 第一列开始往右遍历。
这两种遍历方式都遍历了这个下三角，所以可以互相转换。


待补图片（Pasted image 20250822152038.png）



### 积性函数求和变换

$\displaystyle\sum_{d|n}\sum_{k|\frac{n}{d}}=\sum_{k|n}\sum_{d|\frac{n}{k}}$
打表模拟一下
左边是一行一行枚举
右边是一列一列枚举
左右等价。


待补图片（Pasted image 20250828141553.png）
