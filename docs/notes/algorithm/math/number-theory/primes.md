---
title: "质数"
algorithms: []
sidebarOutline: true
---

# 质数

## 朴素练习：

(线性筛+二分图染色+并查集反集)

思路：

线性筛出质数，对这个质数和以这个质数为因子的数做连接，用并查集反向连接，最后遍历找n范围的连通块个数

```cpp
#define _CRT_SECURE_NO_WARNINGS // 忽略scanf的不安全性

#include <bits/stdc++.h>
#include <unordered_map>
using namespace std;                          // 存一下这个nb代码
const int N = 1e6 +7;                        // 数组上限
const int inf = 0xc0c0c0c0, INF = 0x3f3f3f3f; // memset专用路径,//此int与ll后的int 有所不同 望知;
//             -1061109568        1061109567,  1e9以上；请注意数据范围！
const double eps = 1e-7; // 最小可忽略
int const mod = 1e9 + 7;//998244353;//1e6+7;//mod运算
#define endl "\n";
#define ll long long
//#define ld long double
#define ld double
#define int ll
#define pii pair<int, int> // 此int 已经是 ll 了
#define vi vector<int>
#define vii vector<vi>
#define rep(i, l, r) for (int i = (l); i <= (r); ++i)
// 上述
//
int b[N],cn[N];
int findd(int x)
{
    return b[x]=(b[x]==x?x:findd(b[x]));
}
void link(int x,int y)
{
    int xx=x,yy=y;
    x=findd(x),y=findd(y);
    if(x==y) return;
    if(y>x) swap(y,x);
    b[x]=y;
    cn[y]=max(cn[y],xx);
    cn[y]=max(cn[y],yy);
}
void init(int n)
{
    vi a(n+3,0);
    rep(i,1,2*(n+2)) b[i]=i;    
    rep(i,2,n)
    {
        if(a[i]==0)
        {
            rep(j,2,n)
            {
                if(i*j>n) break;
                a[i*j]=i;
                link(n+i,i*j),link(n+i*j,i);
            }
        }
    }
    int colo=0;
    rep(i,2,n)
    {
        if(vis[findd(i)]==0)
        {
            vis[findd(i)]=++colo;
        }
        //cout<<vis[findd(i)]<<" \n"[i==n+1];
    }
}
void solve() // ll !
{
    int n;cin>>n;
    n++;
    int mx=0;
    rep(i,2,n) 
    {
        mx=max(mx,vis[findd(i)]);
    }
    cout<<mx<<endl;
    rep(i,2,n)
    {
        cout<<vis[findd(i)]<<" \n"[i==n];
    }
}
signed main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int t_ = 1;
    //cin>>t_;
    init((N>>1)-5);
    while (t_--)
    {
        solve();
    }
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
/*

*/

```

## 处理gcd：

处理gcd的方式有很多：
这里包括处理 lcm 的方法
1. 求多少数对$(a,b)$满足

   $$
   lcm(a,b)=n
   $$


将 n 质因数分解，$p_1^{b_1}p_2^{b_2}……$
然后对于每个质因子判断， a 有 $b_1$ ，b 有 $0$~$b_1$ ,然后 b 有 $b_1$ ，a 有 $0$~$b_1$  ，一共$2b_i+1$个（去重复）

总共就是$\Large \displaystyle \sum_{p|n}^{}(2b_i+1)$
2. gcd的映射：

   $$
   gcd(a,m)=gcd(a\pm km,m)，所有a在mod\ m意义下均满足
   $$


证明：
因为$gcd(a,m)=d，因为 d|a,且d|m，所以 d|(a+km)$
反之$gcd(a+km,m)=d,因为 d|m 且d|a+km,将a+km中本来可以整除d的元素删去，就变成了d|a$


### 练习lcm：

[P5150 生日礼物 - 洛谷](https://www.luogu.com.cn/problem/P5150)
```cpp
typedef long long LL;
LL qmul(LL a, LL b, LL c) {
    LL res = 0;
    while (b) {
        if (b & 1) res = (res + a) % c;
        a = (a + a) % c;
        b >>= 1;
    }
    return res;
}
//快速幂
LL ksm(LL a, LL b, LL c) {
    LL res = 1;
    while (b) {
        if (b & 1) res = qmul(res, a, c);
        a = qmul(a, a, c);
        b >>= 1;
    }
    return res;
}
vi vis(N,0),pri;
void init()
{
    vis[1]=1;
    rep(i,2,N-1)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
        }
        rep(j,0,pri.size()-1)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=pri[j];
            if(vis[i]<=pri[j]) break;
        }
    }
}
bool Miller_Rabin(int x)
{
	if(x==1) return false;
    auto panduan=[&](int a,int x)
    {
        int re=ksm(a,x-1,x);
        if(re!=1) return false;
        int mi=x-1;
        while(mi%2==0)
        {
            mi>>=1;
            re=ksm(a,mi,x);
            if(re==x-1) break;
            if(re!=1) return false;
        }
        return true;
    };
    //vi pa={2,7,61};//2^32以内
    // vi pa={2,325,9375,28178,450775,9780504,1795265022};//2^78以内
    vi pa={2, 3, 5, 7, 11, 13, 17, 19, 23 , 29 , 31, 37};
    for(auto it:pa)
    {
        if(it<x&&panduan(it,x)==false) return false;
    }
    return true;
}
void solve() // ll
{  
    int n;cin>>n;
    int ans=1;
    for(auto p:pri)
    {
        if(n%p==0)
        {
            int cn=1;
            while(n%p==0) cn+=2,n/=p;
            ans*=cn;
        }
        if(n==1) break;
    }
    if(n>1)
    {
        int x=sqrtl((long double) n);
        while(x*x>n) --x;
        while((x+1)*(x+1)<=n) ++x;
        if(x*x==n)
        {
            ans*=5;
        }
        else if(Miller_Rabin(n)) ans*=3;
        else ans*=9;
    }
    cout<<ans<<endl;
}
```

### 练习gcd：

[CF1295D Same GCDs - 洛谷](https://www.luogu.com.cn/problem/CF1295D)
大意：
求$gcd(a,m)=gcd(a+x,m),x的个数$
$0<=x<m，0<a<m<=1e10$
思路：
$\displaystyle gcd(a,m)=d=gcd(a+x,m)\longrightarrow gcd(\frac{a+x}{d},\frac{m}{d})==1$
将 $a+x 看成mod\ m意义下的数,那么每个数都可以对应唯一一个 (0，m-1)$
所以就是 $\varphi(m/d)$

```cpp
int gcd(int a,int b)
{
    return (b?gcd(b,a%b):a);
}
int ohla(int x)
{
    int res=x;
    for(int i=2;i*i<=x;++i)
    {
        if(x%i==0)
        {
            int s = 0;
            res=res/i*(i-1);
            while(x%i==0) ++ s,x/=i;
        }
    }
    if(x>1) res=res/x*(x-1);
    return res;
}
void solve() // ll
{  
    int a,m;cin>>a>>m;
    int d=gcd(a,m);
    cout<<ohla(m/d)<<endl;
}
```

## 质因数分解


### 处理1e9的约数:

 [200. Hankson的趣味题](https://www.acwing.com/problem/content/202/)(acwing 中等)
大一：
已知正整数 a0,a1,b0,b1，设某未知正整数 x 满足：

1. x 和 a0 的最大公约数是 a1；
2. x 和 b0 的最小公倍数是 b1。

Hankson 的“逆问题”就是求出满足条件的正整数 x。
$1≤n≤2000,$
$1≤a0,a1,b0,b1≤2∗10^9$

思路：
 分析下来，因为x满足为 b1 的约数，那么我们可以遍历 b1 的约数来判断
 1. 如何判断的问题很简单 即 `if((gcd(x,a0)==a1)&&(x*b0/(gcd(x,b0))==b1)) return 1;`
 2. 如果用试除法遍历到 sqrt（b1) 那么遍历的时间是 1e5 左右， 但是题目给的n 还有2000 呢，所以时间复杂度为 1e8 很容易被卡
 那么我们要优化找到 b1 的约数过程
 1.对于 一个2e9的数分解质因数，我们可以推断，如果有大于1e6的质因数为这个数的质因子，那么这个这个质因子的数量绝对不能超1个
,因为这样会超出2e9的范围，（总之就是2e9还不够大） 所以我们可以先找到这个数的前 1e6 的质因子分解，将这个数除以我们累计质因子的积.
 2.如果这个数大于1，说明此时这个数就是我们要多处理的大于1e6的那个质因子；
这样就对一个2e9的数分解质因数啦！！！
然后就是深搜找约数，判断加加，这个找约数过程的时间复杂度 是 $O(2000*\displaystyle\frac{n}{ln(n)})$ 因为 1-> n 的约数个数大约在$\displaystyle\frac{n}{ln(n)}$
判断的过程则是 $O(nlogn^2)$ 平均每个数的约数个数为 $log n$,计算最小公倍数和最大公约数的时间复杂度 为 $logn$.

```cpp
#define _CRT_SECURE_NO_WARNINGS // 忽略scanf的不安全性

#include <bits/stdc++.h>
#include <unordered_map>
using namespace std;                          // 存一下这个nb代码
const int N = 1e6 +7;                        // 数组上限
const int inf = 0xc0c0c0c0, INF = 0x3f3f3f3f; // memset专用路径,//此int与ll后的int 有所不同 望知;
//             -1061109568        1061109567,  1e9以上；请注意数据范围！
const double eps = 1e-7; // 最小可忽略
int const mod = 2e9 + 7;//998244353;//1e6+7;//mod运算
#define endl "\n";
#define ll long long
//#define ld long double
#define ld double
#define int ll
#define pii pair<int, int> // 此int 已经是 ll 了
#define vi vector<int>
#define vii vector<vi>
#define rep(i, l, r) for (int i = (l); i <= (r); ++i)
// 上述
vi vis(N,0),pri;
void init()
{
    vis[1]=1;
    rep(i,2,N-1)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
        }
        rep(j,0,pri.size()-1)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=pri[j];
            if(vis[i]<=pri[j]) break;
        }
    }
}
int gcd(int a,int b)
{
    return b==0?a:gcd(b,a%b);
}
void solve() // ll !
{
    int a0,a1,b0,b1;cin>>a0>>a1>>b0>>b1;
    vector<pii> pp;
    int cur=b1,mx=0;
    for(auto x:pri)
    {
        if(x>sqrt(b1)) break;
        if(cur%x==0)
        {
            pp.push_back({x,0});
            while(cur%x==0)
            {
                pp.back().second++;
                cur/=x;
                mx=x;
            }
        }
    }
    int d=0;
    if(cur>1) d=cur;
    int cnt=0;
    function<bool(int)> panduan=[&](int x) -> bool
    {
        if((gcd(x,a0)==a1)&&(x*b0/(gcd(x,b0))==b1)) return 1;
        else return 0;
    };
    function<void(int,int)> dfs=[&](int id,int s)
    {
        if(id==pp.size())
        {
            cnt+=panduan(s);
            if(d) cnt+=panduan(s*d);
            return;
        }
        //if(p[pri[id]]==0){ dfs(id+1,s);return;}
        rep(i,0,pp[id].second)
        {
            if(i==0) dfs(id+1,s);
            else s*=pp[id].first,dfs(id+1,s);
        }
    };
    //cnt+=panduan(b1);
    dfs(0,1);
    cout<<cnt<<endl;
}
signed main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int t_ = 1;
    cin>>t_;
    init();
    while (t_--)
    {
        solve();
    }
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```

### 处理1e16 的质因数分解：

1e16 超过 1e6 的质因子个数最多只有两个，将前1e6的 质因子先分解，然后最后剩下来的数只有三种情况：
- 由 一个质数的平方构成
- 由一个质数构成
- 由两个不同的质数构成
因为这里的质数都是大于1e6 的，所以如果不需要明确地知道这个质数是什么，或者只需要知道数的质因数构成关系。就可以这样分类讨论：
- 第一个用 高精度的开根号
```cpp
        int x=sqrtl((long double) n);
        while(x*x>n) --x;
        while((x+1)*(x+1)<=n) ++x;
        if(x*x==n)
        {
            ans*=5;
        }
```
- 用Miller_rabin 素性检测
(直接抄模版就好了)
