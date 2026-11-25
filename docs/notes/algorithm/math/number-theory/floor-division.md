---
title: "数论分块"
algorithms: []
sidebarOutline: true
---

# 数论分块

## 整数分块：


### 性质和公式：

求
$\huge \sum_{i=1}^{n} \left \lfloor \displaystyle\frac {n}{i} \right \rfloor$

例如：

待补图片（Pasted image 20250823141839.png）


其中 $\displaystyle n/(n/i)$ 表示的是 n / i 不变的最大 x，使得 没有比 x 大的数t，使得 n / t = n / x .

基本代码理解：
```cpp
for(int l=1,r=1;l<=n;l=r+1)
{
	r=min(n/(n/l),n);
	res+=(r-l+1)*(n/l);
}
```
不要硬套模版，理解，因为很多题目都是基于这一点优化，但是每个值的贡献可能会有变化，但是思想是不变的。、

在赛场上请灵活调整！！

性质1：
分块的块数<= $2\left \lfloor\sqrt {n}\right \rfloor$

i < $\sqrt n$  和 i > $\sqrt n$
两个部分组成，所以分块总数为 $2*\left \lfloor\sqrt {n}\right \rfloor$
这个性质可以用来优化对 整除枚举求和 的时间复杂度，将 $O(n)$ 变成 $O(2\left \lfloor\sqrt {n}\right \rfloor)$

性质2：
i 所在的右端点为 $\left \lfloor \displaystyle\frac {n}{\left \lfloor \frac {n}{i} \right \rfloor} \right \rfloor$

证明：
令 k = $\left \lfloor \displaystyle\frac {n}{i} \right \rfloor$ ，则 k < =$\displaystyle\frac {n}{i}$ ,然后进行转换，即：左右两边同时被 n 除以：
$\left \lfloor \displaystyle\frac {n}{k} \right \rfloor >=\left \lfloor \displaystyle\frac {n}{ \frac {n}{i} } \right \rfloor = i$ 。所以 i 的最大值为 $\left \lfloor \displaystyle\frac {n}{k} \right \rfloor = \left \lfloor \displaystyle\frac {n}{\left \lfloor \frac {n}{i} \right \rfloor} \right \rfloor$  。

### 遍历模版数论分块：

[P2261 [CQOI2007] 余数求和 - 洛谷](https://www.luogu.com.cn/problem/P2261)
大意：
计算 $\large\sum_{i=1}^{n}k (mod i)$
思路：
k mod i =>  $k-i\times \left \lfloor \frac {k}{i} \right \rfloor$
对这个求和 。
然后我们用 整数分块来简化时间复杂， 记得 要对 系数这个等差数列求和 ，以及在循环中加入 mod 大于 k 的情况。
```cpp
void solve() // ll !
{
    int n,k;cin>>n>>k;
    int ans=n*k;
    for(int l=1,r=1;l<=n;l=r+1)
    {
        if(k/l) r=min(k/(k/l),n);
        else r=n;//这里直接 break 也可以
        // if(l>k) break;
        
        ans-=((l+r)*(r-l+1)/2)*(k/l);
    }
    cout<<ans<<endl;

}
```

### 向上取整的数论分块

即：
$\huge \sum_{i=1}^{n}\left \lceil \displaystyle\frac {n}{i} \right \rceil$
直接给你答案吧：
转换成 像取整：
$\large r=$$\left \lfloor \displaystyle\frac {n-1}{\left \lfloor \frac {n-1}{i} \right \rfloor} \right \rfloor$
证明：
因为 $\left \lceil \displaystyle\frac {n}{i} \right \rceil = \left \lfloor \displaystyle\frac {n-1}{i}  \right \rfloor +1$
所以式子 $\left \lceil \displaystyle\frac {n}{l} \right \rceil=\left \lceil \displaystyle\frac {n}{r} \right \rceil$ 变成 $\left \lfloor \displaystyle\frac {n-1}{l}  \right \rfloor +1=\left \lfloor \displaystyle\frac {n-1}{r}  \right \rfloor +1$
so
$r=$$\left \lfloor \displaystyle\frac {n-1}{\left \lfloor \frac {n-1}{i} \right \rfloor} \right \rfloor$
注意这里只是找到 这个 r 边界，如果要计算贡献，还是要考虑这里的+1.
他是可以变向下取整，但你不能真的把他当成向下取整。

来到题目练一下吧：
[Problem - E - Codeforces](https://codeforces.com/contest/1954/problem/E)


所以： 此时

### 二维数论分块

这题的题目在容斥原理篇章也有，但是因为这里侧重点是二维数论分块，所以我会提前解析**二维数论**分快的要点！！
[215. 破译密码 - AcWing题库](https://www.acwing.com/problem/content/217/)

大意：
对于给定的整数 a ,b 和 d，有多少正整数对 x,y，满足 x≤a，y≤b，并且 gcd( x ,y)=d。
1≤n≤50000,
1≤d≤a,b≤50000
思路：
首先就是 a=a / d ,b=b / d.隐射嘛
然后就是对这样的  a  和  b  求范围内的互质的数对。

与其求互质的数对，不如求所有不互质的数对，即含有共同的质因子
因为两两互质的判断是没有公共质因子，每一次判断都是对数进行质因数分解，同时还是 n^2  的二维遍历。
因此采用 线性求相关的公共因子数，搭配容斥原理优化时间复杂度。

利用容斥原理：
$\Large a*b-(a/2)*(b/2)-(a/3)*(b/3)+(a/6)*(b/6)……$
但是这样的话，每次访问的过程就是$O(n)$的时间复杂度，加上50000 次访问，会爆炸。
为什么 质因子的 指数大于 1 的就不用考虑了？
因为这些 在互质的情况 已经被即算过了，和属于其对应单次方质因子的 集合
考虑再优化：
如何优化，我们发现在 a/x 时 和 a / (x +1) 时有时候会相等，对于 a中 $\large \sum a/i$  中， 不同的值大概只有 $\large 2\sqrt{a}$  个，所以我们每次计算将这些相同值的数合起来，就会大大降低我们的时间复杂度。
这就要考虑到 一个函数 $g(x)$ ，设它就是 $\large a/x==a/(g(x))$  根据数学推导： g ( x ) = =  a / ( a/ x )，所以我们每次只要对这一部分的值统一处理就好了。

因为每个值的系数不一样，用莫比乌斯函数求出系数后，因为值是相同的，所以用前缀和预处理一下，每次取值的系数就是区间和。

对于莫比乌斯函数的判断，其实是 更具欧拉函数和莫比乌斯函数的关系：
$\large \varphi (n) =\sum_{d|n} \mu (d)\displaystyle \frac{n}{d}$

然后每次遍历不用++i了，直接加到 g ( x ) + 1 就好。
注意：考虑边界问题，不要小于 min ( a  ,  b );
```

// s 数组为 莫比乌斯前缀和
void solve() // ll !
{
    int a,b,d;cin>>a>>b>>d;
    a=a/d,b=b/d;
    int n=min(a,b);
    int ans=0;
    for(int l=1,r;l<=n;l=r+1)
    {
        r=min(n,min(a/(a/l),b/(b/l)));
        ans=(ans+(a/l)*(b/l)*(s[r]-s[l-1]));
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
```


### 练习：


#### 求前缀约数和：

$f(n) 表示所有小于n的数的约数的和$

$$
f(n)=\ \sum_{i=1}^{n}\ \sum_{d|i}\ d
$$


思路：
计算每一个约数的贡献，即算$n/1*(1)+(n/2)2+……+(n/k)*k$
以上均为整除。

整除分块:
因为 $(n/k)$ 有时会相同，所以将个数按照整除分块来分类，剩下的就是等差数列求和。

题目：[P2424 约数和 - 洛谷](https://www.luogu.com.cn/problem/P2424)
```cpp
void solve() // ll
{  
    int x,y;cin>>x>>y;x--;
    auto jisuan=[&](int n)
    {
        int ans=0;
        for(int l=1,r;l<=n;l=r+1)
        {
            r=min(n,n/(n/l));
            ans+=(r-l+1)*(l+r)/2*(n/l);
        }
        return ans;
    };
    cout<<jisuan(y)-jisuan(x)<<endl;
}
```

#### 细节分块：

题意：
 $n,m<1e9$
 求

$$
\large \sum_{i=1}^{n}\sum_{j=1}^{m}(n\ mod\ i)(m\ mod\ j)(i\ !=j)
$$


思路：
mod 变换

$\displaystyle \sum_{i=1}^{n}(n-\left \lfloor \frac{n}{i}  \right \rfloor i)\sum_{j=1}^{m}(m-\left \lfloor \frac{m}{j}  \right \rfloor j) - \sum_{i=1}^{n}(n-\left \lfloor \frac{n}{i}  \right \rfloor i)\times(m-\left \lfloor \frac{m}{i}  \right \rfloor i)$
减号前面的可以直接用一维整数除法做运算，然后最后乘一下。
减号后面需要打开：
$\displaystyle \sum_{i=1}^{n}(nm-m\left \lfloor \frac{m}{i}  \right \rfloor i-n\left \lfloor \frac{m}{i}  \right \rfloor i+\left \lfloor \frac{n}{i}  \right \rfloor \left \lfloor \frac{m}{i}  \right \rfloor i^2)$
因为同时考虑 $m/i和n/i$所以 要做二维数论整除：
然后 对 $i^2$ 的区间和要用到 $\displaystyle 1+2^2+3^2+……+n^2=\frac{n*(n+1)*(2*n+1)}{6}$

要点注意：因为模数不是质数，所以面对除以  2 和除以 6，我们需要用手动计算其逆元。
```cpp
int inv2=9970209,inv6=3323403;
int sum1(int l,int r)
{
    return (l+r)%mod*(r-l+1)%mod*inv2%mod;
}
inline long long sum2(long long n) {
    n %= mod;
    long long a = n * (n + 1) % mod;
    long long b = (2 * n + 1) % mod;
    return (long long)((__int128)a * b % mod * inv6 % mod);
}
void solve() // ll
{ 
    int n,m;cin>>n>>m;
    if(n>m) swap(n,m);
    int nn=n*n%mod,mm=m*m%mod,ca=0;
    for(int l=1,r;l<=n;l=r+1)
    {
        r=min(n,n/(n/l));
        int a=sum1(l,r)*(n/l)%mod;
        nn=(nn-a+mod)%mod;
    }
    for(int l=1,r;l<=m;l=r+1)
    {
        r=min(m,m/(m/l));
        int a=sum1(l,r)*(m/l)%mod;
        mm=(mm-a+mod)%mod;
    }
    for(int l=1,r;l<=n;l=r+1)
    {
        r=min(n,min(n/(n/l),m/(m/l)));
        int a=(r-l+1)*((n*m)%mod)%mod;
        int b=((__int128)m*sum1(l,r)%mod*(n/l))%mod;
        int c=((__int128)n*sum1(l,r)%mod*(m/l))%mod;
        int d=((__int128)sum2(r)-sum2(l-1)+2*mod)%mod*(n/l)%mod*(m/l)%mod;
        ca=(ca+a-(b+c)%mod+d+2*mod)%mod;
    }
    int ans=(__int128)nn*mm%mod-ca;
    cout<<Mod(ans+mod,mod)<<endl;
}
```

#### 欧拉反演：

求：

$$
\sum_{i=1}^{n}\sum_{j=1}^{m}(2gcd(i,j)-1)
$$


思路：
转:$\displaystyle 2\sum_{i=1}^{n}\sum_{j=1}^{m}(gcd(i,j))-n*m$
我转换到这一步，然后我接着转换:
T 是 k 乘 d ，k 是莫比乌斯反演后的分母

$\displaystyle \sum_{i=1}^{n}\sum_{j=1}^{m}(gcd(i,j))=\sum_{T=1}^{n}\left \lfloor \frac{n}{T}  \right \rfloor\left \lfloor \frac{m}{T}  \right \rfloor\sum_{d|n}d\mu(n/d)$

因为：$\tilde{\mu}\tilde{id}=\varphi$

所以$\displaystyle \sum_{T=1}^{n}\left \lfloor \frac{n}{T}  \right \rfloor\left \lfloor \frac{m}{T}  \right \rfloor\sum_{d|n}d\mu(n/d)=\sum_{T=1}^{n}\left \lfloor \frac{n}{T}  \right \rfloor\left \lfloor \frac{m}{T}  \right \rfloor\varphi(T)$

然后就可以做了。
```cpp
int pri[N],phi[N],cnt;
bool vis[N];
void init(int n)
{
    phi[1]=1;
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
}
void solve() // ll
{ 
    int n,m;cin>>n>>m;
    if(n>m) swap(n,m);
    int ans=0;
    for(int l=1,r;l<=n;l=r+1)
    {
        r=min(n,min(n/(n/l),m/(m/l)));
        int v=(n/l)*(m/l);
        int t = s[r]-s[l-1];// s 是欧拉函数数组的前缀和
        ans+=v*t;
    }
    cout<<2*ans-n*m<<endl;
}
```
