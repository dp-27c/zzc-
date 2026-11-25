---
title: "线段树（基础+提高）"
algorithms: []
sidebarOutline: true
---

# 线段树（基础+提高）

## 思维 + 模拟
[P4588 [TJOI2018] 数学计算 - 洛谷](https://www.luogu.com.cn/problem/P4588)
大意：
给定 x 数，初始为 1,以及模数 p ，一共 Q 次操作，每次操作 有两种类型：
1. `1 m` 将 $x \times m$ ，并输出 $x\ mod\  p$
2. `2 pos` 将 x 除以 第 pos 次 所乘的值，并输出 $x\ mod\  p$

思路：
因为 模数 p 的不一定是质数，因此 用 费马小求逆元 的操作 是不行的。
因此考虑 用线段树模拟。数组第 i 个值表示 第 i 次询问要乘的数。（初始时所有数为 1）

对于操作1，相当于 修改 为 m， 求出 1 到 i 上数的乘积，区间乘积。
对与操作2，相当于 将 第 pos 位置 上值修改为 1，求出 1 到 i 上数的乘积，区间乘积。

时间复杂度为 $O(QlogQ)$
因为是 单点修改，甚至不需要使用 懒标记。
Code：

```cpp
// 线段树：
#define rt tr[u]
#define ls tr[u<<1]
#define rs tr[u<<1|1]
struct Node{int l,r,sum;} tr[N<<2];
int p;
void pushup(int u)
{
    rt.sum=(ls.sum*rs.sum)%p;
}
void build(int u,int l,int r)
{
    rt={l,r,1};
    if(l==r) return;
    int mid=l+r>>1;
    build(u<<1,l,mid);
    build(u<<1|1,mid+1,r);
    pushup(u);
}
int query(int u,int l,int r)
{
    if(l<=rt.l&&rt.r<=r)return rt.sum;
    int mid=rt.l+rt.r>>1;
    int res=1;
    if(l<=mid) res=(res*query(u<<1,l,r))%p;
    if(mid<r) res=(res*query(u<<1|1,l,r))%p;
    return res;  
}
void modify(int u,int id,int v)
{
    if(rt.l==id&&rt.l==rt.r)
    {
        rt.sum=v%p;
        return;
    }
    int mid=rt.l+rt.r>>1;
    if(id<=mid) modify(u<<1,id,v);
    if(id>mid) modify(u<<1|1,id,v);
    pushup(u);
}
// 主代码
void solve() // ll
{
    int n;cin>>n>>p;
    build(1,1,n);
    rep(i,1,n)
    {
        int op,val;cin>>op>>val;
        if(op&1)
        {
            modify(1,i,val);
            cout<<query(1,1,i)<<endl;
        }
        else 
        {
            modify(1,val,1);
            cout<<query(1,1,i)<<endl;
        }
    }
}
```

## 冒泡trick + 最大最小权
[P6186 [NOI Online #1 提高组] 冒泡排序 - 洛谷](https://www.luogu.com.cn/problem/P6186)
大意：
给定长度为 n 的排列 p ，m 次操作：
1. 操作1 ， 给出 c ，将 第 c 和 第 c + 1 的位置上的值交换。
2. 操作2 ， 给出 k ，目前排列根据下面的 冒泡排序 代码，请输出 第 k 轮结束后，逆序对数为 多少？
这是一轮操作执行的 伪代码：

```python
for i = 1 to n-1:
  if p[i] > p[i + 1]:
    swap(p[i], p[i + 1])
```

$n,m<2e5,k<2^{31}$

思路：
这个时候我们就要 分析 冒泡排序 和 逆序对之间的 trick 了
根据上面这层代码，我们发现，对于每一轮操作，如果一个数 前面 存在比他大 的数，那么这次轮转 一定会交换 它的顺序一次。
（这段冒泡排序 的 伪代码 可以看成 是 一个数开始交换位置，直到撞到比它 大 的数）

因此我们可以 对于 每个 数 找到 对应前缀 大于它 的数量的个数，以这个值作为 它 的强度（其实就是反向的逆序对，这个实际的逆序对值一样的）
每次轮转，会使所有 大于 0 的数都减去 1，直到所有数为 0 。

因此 对于 第 k 轮操作后，省下的 逆序对数 就是 所有大于 k 的值 减去 k 之和：

$$
\sum_{a>k}(a-k)\longrightarrow (\sum_{a>k}a) - cnt\times k
$$

我们只要维护一个 值求和的 树状数组 和 k 数量的树状数组 就可以解决了。
什么 你问我交换 操作 怎么解决，这个太简单了，对于两个相邻关系，维护好两个数组就行！！
Code：

```cpp
// BIT 模版
void solve() // ll
{
    int n,m;cin>>n>>m;
    BIT q(n+7),s(n+7),cn(n+7);vi b(n+1,0);
    rep(i,1,n)
    {
        cin>>b[i];
        a[i]=q.sum(n-b[i]+1);
        q.add(n-b[i]+1,1);// 树状数组求出 大于 b[i] 的元素数量
        s.add(n-a[i]+1,a[i]);
        cn.add(n-a[i]+1,1);
    }
    while(m--)
    {
        int op,c;cin>>op>>c;
        if(op&1)
        {
            int tc1,tc2;
            // 维护 两个树状数组
            if(b[c]<b[c+1]) tc1=a[c+1],tc2=a[c]+1,s.add(n-a[c]+1,-a[c]),s.add(n-(a[c]+1)+1,a[c]+1),cn.add(n-a[c]+1,-1),cn.add(n-(a[c]+1)+1,1);
            else tc1=a[c+1]-1,tc2=a[c],s.add(n-a[c+1]+1,-a[c+1]),s.add(n-(a[c+1]-1)+1,a[c+1]-1),cn.add(n-a[c+1]+1,-1),cn.add(n-(a[c+1]-1)+1,1); 
            swap(b[c],b[c+1]);
            a[c]=tc1,a[c+1]=tc2;
        }
        else 
        {
            if(c>=n-1) cout<<0<<endl; 
            else cout<<s.sum(n-c+1)-cn.sum(n-c+1)*c<<endl;
        }
    }
}
```

## 二进制线段树维护
[Problem - 242E - Codeforces](https://codeforces.com/problemset/problem/242/E)
大意：
给定长度为 n 的数组a ，执行下面操作之一 m 次：
1. 操作1，选择区间 `[l,r]` ，输出区间和。
2. 操作2，选择区间 `[l,r]` ，选择 整数 x ，将 区间的每一个数 变成 与 x异或的值，即：$l\le i\le r,a_i=a_i\oplus x$
$n<1e5,m<3e5;\ \ \ a_i,x<1e6$

思路：
直接算 不可能那，树状数组也不好处理这种不能转化为单点查询的。
线段树吧，那怎么处理每个数 对 x 的异或呢？

很简单，开一个二维的线段树，多一个参数为 二进制下的 第几位，在这个位上a 上的数就变成了 0 和 1。
区间查询 ：将二进制下 所有位数的 求和算出来
区间修改 ：x 二进制有 1 的那些位上，对应的二进制线段树 上做异或修改（懒标记一下）

注意，这里要用 int ，不然空间会很大，但是 输出的答案会超过 int ，所以只有一个 longlong 大小的值

Code：

```cpp
// 线段树：
#define rt tr[id][u]
#define ls tr[id][u<<1]
#define rs tr[id][u<<1|1]
struct Node{int l,r,sum,add;} tr[22][N<<2];
int a[22][N];
void pushup(int u,int id)
{
    rt.sum=(ls.sum+rs.sum);
}
void pushdown(int u,int id)
{
    if(rt.add)
    {
        ls.add^=rt.add;
        rs.add^=rt.add;
        ls.sum=(ls.r-ls.l+1)-ls.sum;
        rs.sum=(rs.r-rs.l+1)-rs.sum;
        rt.add=0;
    }
}
void build(int u,int id,int l,int r)
{
    rt={l,r,a[id][l],0};
    if(l==r) return;
    int mid=l+r>>1;
    build(u<<1,id,l,mid);
    build(u<<1|1,id,mid+1,r);
    pushup(u,id);
}
int query(int u,int id,int l,int r)
{
    if(l<=rt.l&&rt.r<=r)
    {
        return rt.sum;
    }
    int mid=rt.l+rt.r>>1;
    int res=0;
    pushdown(u,id);
    if(l<=mid) res+=query(u<<1,id,l,r);
    if(mid<r) res+=query(u<<1|1,id,l,r);
    return res;
}
void modify(int u,int id,int l,int r)
{
    if(l<=rt.l&&rt.r<=r)
    {
        rt.sum=(rt.r-rt.l+1)-rt.sum;
        rt.add^=1;
        return;
    }
    int mid=rt.l+rt.r>>1;
    pushdown(u,id);
    if(l<=mid) modify(u<<1,id,l,r);
    if(mid<r) modify(u<<1|1,id,l,r);
    pushup(u,id);
}
void solve() // ll
{
    int n;cin>>n;
    rep(i,1,n) 
    {
        int x;cin>>x;
        rep(id,0,21)
        {
            a[id][i]=((x&(1LL<<id))>0);
        }
    }
    rep(id,0,21) build(1,id,1,n);
    int m;cin>>m;
    while(m--)
    {
        int op,l,r;cin>>op>>l>>r;
        if(op&1)
        {
            ll ans=0;
            rep(id,0,21) ans+=query(1,id,l,r)*(1LL<<id);
            cout<<ans<<endl;
        }
        else 
        {
            int x;cin>>x;
            rep(id,0,21) if((x&(1LL<<id))) modify(1,id,l,r);
        }
    }
}
```

## 线段树 保存 树 的 dfs 序
[Problem - E - Codeforces](https://codeforces.com/contest/620/problem/E)
大意：
给定一颗大小为 n 根为 1 的树，每个节点有对应的颜色$C_i$ ，有m次下面操作：
1. 选择一个节点 u 和 颜色 v，将 u 的子树全部 染色成 v 。
2. 选择一个节点 u，输出 u 子树上的不同 颜色的数量。
$n,m<4e5,C_i,v<60$

思路：
首先要了解 一颗树 如何转化为 线段树。
我们将 以 1 为树的根节点，然后 进行 将节点根据 dfs 的时间戳顺序 排序。
同时 统计子树的节点个数。
那么将这个顺序 展开，就得到了一个长度为 n 的线性数组，一个节点的子树，就是该节点在 数组中的位置 记为 `idx[u]` ，我们用 `[idx[u],idx[u]+siz[u]-1]` 来表示 这个子树的区间。

熟悉上面 过程后。
原问题就转化为了在 区间修改， 和区间查询。
用 $bitset<61> bt$  放入 `Node` ，进行维护，区间合并做 与操作， 最后输出 区间 `bt.count()`  就行

Code：

```cpp
#define rt tr[u]
#define ls tr[u<<1]
#define rs tr[u<<1|1]
struct Node{int l,r,add;bitset<61> bt;}tr[N<<2];
int a[N];
void pushup(int u)
{
    rt.bt=ls.bt|rs.bt;
}
void pushdown(int u)
{
    if(rt.add)
    {
        ls.add=rt.add,rs.add=rt.add;
        ls.bt.reset(),rs.bt.reset();
        ls.bt[rt.add]=1,rs.bt[rt.add]=1;
        rt.add=0;
    }
}
void build(int u,int l,int r)
{
    rt={l,r,0};
    rt.bt[a[l]]=1;
    if(l==r) return;
    int mid=l+r>>1;
    build(u<<1,l,mid);
    build(u<<1|1,mid+1,r);
    pushup(u);
}
bitset<61> query(int u,int l,int r)
{
    if(l<=rt.l&&rt.r<=r) return rt.bt;
    int mid=rt.l+rt.r>>1;
    pushdown(u);
    bitset<61> res;
    if(l<=mid) res|=query(u<<1,l,r);
    if(mid<r) res|=query(u<<1|1,l,r);
    return res;
}
void modify(int u,int l,int r,int v)
{
    if(l<=rt.l&&rt.r<=r)
    {
        rt.add=v;
        rt.bt.reset(),rt.bt[v]=1;
        return;
    }
    int mid=rt.l+rt.r>>1;
    pushdown(u);
    if(l<=mid) modify(u<<1,l,r,v);
    if(mid<r) modify(u<<1|1,l,r,v);
    pushup(u);
}

void solve() // ll
{
    int n,m;cin>>n>>m;
    vi b(n+1,0),idx(n+1,0),siz(n+1,1);
    rep(i,1,n) cin>>b[i];
    vii mp(n+1);
    rep(i,1,n-1)
    {
        int u,v;cin>>u>>v;
        mp[u].push_back(v),mp[v].push_back(u);
    }
    int id=1;
    function<void(int,int)> dfs=[&](int u,int fa)
    {
        idx[u]=id,a[id++]=b[u];
        for(auto v:mp[u])
        {
            if(v==fa) continue;
            dfs(v,u),siz[u]+=siz[v];
        }
    };
    dfs(1,0);
    build(1,1,n);
    while(m--)
    {
        int op;cin>>op;
        if(op&1)
        {
            int st,v;cin>>st>>v;
            int l=idx[st],r=l+siz[st]-1;
            modify(1,l,r,v);
        }
        else
        {
            int st;cin>>st;
            int l=idx[st],r=l+siz[st]-1;
            cout<<query(1,l,r).count()<<endl;
        }
    }
}
```

## 查询和插入连续01串：
[P2894 [USACO08FEB] Hotel G - 洛谷](https://www.luogu.com.cn/problem/P2894)
大意：

思路：

Code:

```cpp
// 线段树：
#define rt tr[u]
#define ls tr[u<<1]
#define rs tr[u<<1|1]
struct Node{int l,r,lv,rv,vv,add;}tr[N<<2];
// int a[N];
void pushup(int u)
{
    rt.lv=ls.lv,rt.rv=rs.rv;rt.vv=max(ls.vv,rs.vv);
    if(ls.rv&&rs.lv) 
    {
        if(ls.lv==(ls.r-ls.l+1)) rt.lv+=rs.lv;
        if(rs.rv==(rs.r-rs.l+1)) rt.rv+=ls.rv;
        rt.vv=max(rt.vv,ls.rv+rs.lv);
    }
}
void pushdown(int u)
{
    if(rt.add)
    {
        ls.add=rt.add,rs.add=rt.add;
        if(rt.add&1)
        {
            ls.lv=0,ls.rv=0,ls.vv=0;
            rs.lv=0,rs.rv=0,rs.vv=0;
        }
        else 
        {
            ls.lv=(ls.r-ls.l+1),ls.rv=ls.lv;
            rs.lv=(rs.r-rs.l+1),rs.rv=rs.lv;
            ls.vv=ls.lv,rs.vv=rs.lv;
        }
        rt.add=0;
    }
}
void build(int u,int l,int r)
{
    rt={l,r,r-l+1,r-l+1,r-l+1,0};
    if(l==r) return;
    int mid=l+r>>1;
    build(u<<1,l,mid),build(u<<1|1,mid+1,r);
    pushup(u);
}
int query(int u,int x)
{
    if(rt.vv<x)return 0;
    if(rt.lv>=x) return rt.l;
    pushdown(u);
    if(ls.vv>=x) return query(u<<1,x);
    else if(ls.rv&&rs.lv&&ls.rv+rs.lv>=x) return ls.r-ls.rv+1;
    else return query(u<<1|1,x);
    pushup(u);
}
void modify(int u,int l,int r,int v)
{
    if(l<=rt.l&&rt.r<=r) 
    {
        rt.add=v;
        rt.lv=(1-(v&1))*(rt.r-rt.l+1),rt.rv=rt.lv,rt.vv=rt.lv;
        return;
    }
    pushdown(u);
    int mid=rt.l+rt.r>>1;
    if(l<=mid) modify(u<<1,l,r,v);
    if(mid<r) modify(u<<1|1,l,r,v);
    pushup(u);
}

void solve() // ll
{
    int n,m;cin>>n>>m;
    build(1,1,n);
    while(m--)
    {
        int op;cin>>op;
        if(op&1)
        {
            int x;cin>>x;
            int id=query(1,x);
            cout<<id<<endl;
            if(id) modify(1,id,id+x-1,1);
        }
        else 
        {
            int l,r;cin>>l>>r;
            modify(1,l,l+r-1,2);
        }
    }
}
```

## 线段树上暴力优化
[Problem - 438D - Codeforces](https://codeforces.com/problemset/problem/438/D)
大意：
给定n大小数组，m次询问：
1. 求区间和
2. 区间所有数对 x 取模
3. 第 i 个数 变为 x。
$n,m<2e5,x<1e9$

思路：
主要难点在于 区间取模 如何实现：
首先我们记住一个trick:
如果 $x<p$，则 $x\bmod p=x$；如果 $x\ge p$，则 $x\bmod p<\dfrac{x}{2}$。

有了这个结论我们就可以知道，如果一个数被不同的 x 不断取模，那它改变的次数 不会超过 $log_2{n}$。
因此我们就可以维护区间最大值，然后取模的时候 暴力修改区间内 大于 x 的那些值，小于 x 的值则不变。
时间复杂度为 $mlognlogx$

Code:

```cpp
#define _CRT_SECURE_NO_WARNINGS // 忽略scanf的不安全性

#include <bits/stdc++.h>
#include <unordered_map>
#include <random>
using namespace std;                          // 存一下这个nb代码
const int N = 4e5+7;                          // 数组上限
const int inf = 0xc0c0c0c0,INF = 0x3f3f3f3f; // memset专用路径,//此int与ll后的int 有所不同 望知;
//             -1061109568        1061109567,  1e9以上；请注意数据范围!
const double eps = 1e-9; // 最小可忽略
int const mod = 998244353;//1e9 + 7;//1e18;//1e6+7;//mod运算
#define endl "\n"
#define ll long long
//#define ld long double
#define ld double
// #define cp complex
#define int ll
// #define int unsigned short
#define pii pair<int, int> // 此int 已经是 ll 了
#define vi vector<int>
#define vii vector<vi>
#define rep(i, l, r) for (int i = (l); i <= (r); ++i)
typedef long long LL;
int lowbit(int x) { return x & (-x); }
// cout<< fixed << setprecision(3) 
//cout.flush();
//(__int128)
// 上述
//
// 这个放全局
std::random_device rd;// 随机函数
std::mt19937 g(rd());
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
int gcd(int a,int b){return b?gcd(b,a%b):a;};
// 线段树
#define rt tr[u]
#define ls tr[u<<1]
#define rs tr[u<<1|1]
struct Node{int l,r,sum,mx;}tr[N<<2];
int a[N];
void pushup(int u)
{
    rt.sum=ls.sum+rs.sum;
    rt.mx=max(ls.mx,rs.mx);
}
void build(int u,int l,int r)
{
    rt={l,r,a[l],a[l]};
    if(l==r) return;
    int mid=l+r>>1;
    build(u<<1,l,mid),build(u<<1|1,mid+1,r);
    pushup(u);
}
int query(int u,int l,int r)// 区间查询
{
    if(l<=rt.l&&rt.r<=r) return rt.sum;
    int mid=rt.l+rt.r>>1,res=0;
    if(l<=mid) res+=query(u<<1,l,r);
    if(mid<r) res+=query(u<<1|1,l,r);
    return res;
}
void modify(int u,int l,int r,int x)// 区间取模
{
    if(l<=rt.l&&rt.r<=r&&rt.mx<x) return;
    if(rt.l==rt.r){rt={rt.l,rt.r,rt.sum%x,rt.mx%x};return;}
    int mid=rt.l+rt.r>>1;
    if(l<=mid)modify(u<<1,l,r,x);
    if(mid<r) modify(u<<1|1,l,r,x);
    pushup(u);
}
void change(int u,int id,int v)// 单点修改
{
    if(rt.l==rt.r){rt.sum=v,rt.mx=v;return;}
    int mid=rt.l+rt.r>>1;
    if(id<=mid) change(u<<1,id,v);
    else change(u<<1|1,id,v);
    pushup(u);
}


void solve() // ll
{
    int n,m;cin>>n>>m;
    rep(i,1,n) cin>>a[i];
    build(1,1,n);
    while(m--)
    {
        int op;cin>>op;
        if(op==1)
        {
            int l,r;cin>>l>>r;
            cout<<query(1,l,r)<<endl;
        }
        else if(op==2)
        {
            int l,r,x;cin>>l>>r>>x;
            modify(1,l,r,x);
        }
        else 
        {
            int id,v;cin>>id>>v;
            change(1,id,v);
        }
    }
}
```
