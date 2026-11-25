---
title: "普通莫队"
algorithms: []
sidebarOutline: true
---

# 普通莫队

## 概念
解决大部分 离线询问 问题。
主要的思想是 分块 。
时间复杂度 为 $O(n\sqrt{n})$

好写

## 理解：
对于当前区间`[l,r]`,按照以下 四种情况 分类讨论。
1. `add(--l)`加上左边的贡献，并区间左向左拓展一格。
2. `add(++r)`加上 右边的贡献，并且区间右向右拓展一格。
3. `sub(l++)` 减去 当前左边的贡献，并且区间左 向右 缩小。
4. `sun(r--)`减去 当前右边的贡献，并且区间右 向左 缩小。

但是 询问的顺序不同 ，时间复杂度上 会相差很多,因此在 遍历区间顺序 上的优化考虑 分块。

莫队的核心在于，增删的部分的时间复杂度尽量维护在 $O(1)$

## 模版：

```cpp
// 以维护窗口的区间和为例子

vi pos;// 用于分块
struct Q{int l,r,id;};
void solve() // ll
{
    int n;cin>>n;
    // 根号分块
    int siz=sqrt(n);
    vi a(n+1,0);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    // 离线任务
    int m;cin>>m;
    vector<Q> q(m);
    vi ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });// 按照l所在的块
    // 构造 窗口变化函数
    int l=1,r=0,res=0;
    auto Add=[&](int id)
    {
        res+=a[id];
    };
    auto Sub=[&](int id)
    {
        res-=a[id];
    };
    // 主要运行代码
    for(auto &x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        ans[x.id]=res;
    }
    rep(i,0,m-1) cout<<ans[i]<<endl;
}
```

## 练习：
### 区间和（莫队版本）

```cpp
vi pos;
struct Q{int l,r,id;};
void solve() // ll
{
    int n;cin>>n;
    int siz=sqrt(n);
    vi a(n+1,0);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    int m;cin>>m;
    vector<Q> q(m);
    vi ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    int l=1,r=0,res=0;
    auto Add=[&](int id)
    {
        res+=a[id];
    };
    auto Sub=[&](int id)
    {
        res-=a[id];
    };
    for(auto &x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        ans[x.id]=res;
    }
    rep(i,0,m-1) cout<<ans[i]<<endl;
}
```

### 区间摸球概率：
[P1494 [国家集训队] 小 Z 的袜子 - 洛谷](https://www.luogu.com.cn/problem/P1494)
大意：
给定 n 个小球，第 i 个小球的颜色为Ai。
给 m 次询问，问有多少的概率使得取两个球颜色一样

100% 的数据中，N,M≤50000，1≤L≤R≤N，Ci​≤N。

思路：
首先是经典莫队的模版，计算追加一个 分子，分母 的贡献。

代码：

```cpp
void solve() // ll
{
    int n;cin>>n;
    int m;cin>>m;
    int siz=sqrt(n);
    vi a(n+1,0);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    vector<Q> q(m);
    vector<pii> ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    int l=1,r=0;
    int fz=0,fm=0,cnt=r-l+1;
    // map<int,int> mp; Add太费时间了
    vi mp(n+1,0);
    auto C=[&](int x){return (x>0?x*(x-1)/2:0);};
    auto Add=[&](int id)
    {
        // fm-=C(cnt++),fm+=C(cnt);
        fm+=2*(cnt++);// 直接计算贡献
        int d=mp[a[id]]++;
        fz+=2*d;
        // fz-=C(d),fz+=C(d+1);
    };
    auto Sub=[&](int id)
    {
        // fm-=C(cnt--),fm+=C(cnt);
        fm-=2*(--cnt);// 直接计算贡献
        int d=mp[a[id]]--;
        // fz-=C(d),fz+=C(d-1);
        fz-=2*(d-1);
    };
    for(auto &x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        int d=gcd(fz,fm);
        if(cnt==1) ans[x.id]={0,1};
        else ans[x.id].first=fz/d,ans[x.id].second=fm/d;
        // ans[x.id]=res;
    }
    rep(i,0,m-1) cout<<ans[i].first<<"/"<<ans[i].second<<endl;
}
```

### 区间内 子段异或和为定值数量
[Problem - 617E - Codeforces](https://codeforces.com/problemset/problem/617/E)
大意：
给定 n ，m ，k。
给长度为 n 的整数数组a，
m 次询问，每次询问：
- 给出 l ， r 区间。
- 求出区间内 有多少个子区间异或和为 k。
整数范围 < 1e6

思路：
莫队模版.
$a_i\oplus  ……\oplus a_j=he_j\oplus he_{i-1}$
$he_i$为 i 的 前缀异或和。
所以
用 mp 整数数组表 维护当前区间内 i 数的个数。
add：
- ` res += mp[he[id]^k];mp[he[id]]++;`
sub：
- `mp[he[id]]--;res -= mp[he[id]^k];` (因为要与add 函数反着来，因此顺序有变化)

代码：

```cpp
vi pos;
struct Q{int l,r,id;};
void solve() // ll
{
    int n;cin>>n;
    int m,k;cin>>m>>k;
    int siz=sqrt(n);
    vi a(n+1,0);
    pos.resize(n+1);
    vi he(n+1,0);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
        he[i]=a[i]^he[i-1];
    }
    vector<Q> q(m);
    vector<int> ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].l--,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    int l=1,r=0;
    int fz=0,fm=0,cnt=r-l+1;
    vi mp(2e6+1,0);// 不要map，会超时
    int res=0;
    
    auto Add=[&](int id)
    {
        res += mp[he[id]^k];
        mp[he[id]]++;
    };  

    auto Sub=[&](int id)
    {   
        mp[he[id]]--;
        res -= mp[he[id]^k];
    };

    for(auto &x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        ans[x.id]=res;
    }
    rep(i,0,m-1)
    {
        cout<<ans[i]<<endl;
    }
}
```

### 区间众数的数量
[P3709 大爷的字符串题 - 洛谷](https://www.luogu.com.cn/problem/P3709)
大意：
（题意没有明确说出是求区间众数，推导过程有点意思，复习可以查看）
给 长度为 n 的数组，m次询问。
求区间众数的出现的个数

思路：
求众数数量我们要维护两个数组（trick）
- 离散化后，数组 `cnt[i]` 表示 i 这个数出现的次数。
- 数组 `t[i]` 表示 当前区间 出现次数为 i 的数的个数。
每次 Add 和 Sub 的过程中维护这两个数组就可以求出区间众数了。

代码：

```cpp
vi pos;
struct Q{int l,r,id;};
void solve() // ll
{
    int n;cin>>n;
    int m,k;cin>>m;
    int siz=sqrt(n);
    vi a(n+1,0);
    pos.resize(n+1);
    unordered_map<int,int> mp;
    rep(i,1,n)
    {
        cin>>a[i];
        if(mp.find(a[i])==mp.end()) mp[a[i]]=i;
        pos[i]=i/siz;
    }
    rep(i,1,n) a[i]=mp[a[i]];
    vector<Q> q(m);
    vector<int> ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].l,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    int l=1,r=0;
    // vi mp(2e6+1,0);// 不要map，会超时
    int res=0;
    vi cn(n+1,0),t(n+1,0);
    auto Add=[&](int id)
    {
        int v=a[id];
        t[cn[v]]--;
        cn[v]++;
        t[cn[v]]++;
        if(cn[v]>res) res++;
    };  

    auto Sub=[&](int id)
    {   
        int v=a[id];
        t[cn[v]]--;
        cn[v]--;
        t[cn[v]]++;
        if(t[res]<=0) res--;
    };
    for(auto &x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        ans[x.id]=-res;
    }
    rep(i,0,m-1)
    {
        cout<<ans[i]<<endl;
    }
}
```

### 字符串区间模质p 倍数的子串个数
[P3245 [HNOI2016] 大数 - 洛谷](https://www.luogu.com.cn/problem/P3245)
大意：
以字符串的形式给出一个数字串。
给定 质数为 p。
m 次询问：
- 给出 l 和 r ，求出l 和 r 区间有多少子串形成的 数值 是 p 的倍数。
对于 100% 的数据，1≤n,m≤2×105，2≤p≤109，S 中只有数字字符，p 为素数。

思路：
不愧是洛谷的紫题，有份量的！！

首先是 莫队的模版。
然后这里有一个小trick：
`s[i]` 表示后缀到 i 为止的数值 对 p 取模的结果。
从后往前

$$
\displaystyle{a_i,a_{i+1},a_{i+2}……,a_{j}}=\frac{s_{i}-s_{j+1}}{10^{n-j}}
$$

假设 $\displaystyle \frac{s_i-s_{j+1}}{10^{n-j}} \% p=0$
那么（10 不是 p 的倍数）

$$
\displaystyle ({s_i-s_{j+1}}) \% p=0
$$

如果p =2，或 5，要特判！！！

那么我就只需要维护 `cn[i]` 数组表示 区间内 前缀模p 为 i 的数字出现的次数。
每次 区间的扩张和缩小进行 res 的加值 和 减值。

代码：

```cpp
vi pos;
struct Q{int l,r,id;};
void solve() // ll
{
    int p,n;cin>>p;
    string s;cin>>s;
    int m;cin>>m;
    n=s.size();
    s="*"+s;
    int siz=sqrt(n);
    vi a(n+2,0);
    pos.resize(n+1);
    vi f(n+2,0);
    f[n]=1;
    map<int,int> mp;
    mp[0]=0;
    if(p==2||p==5) // 特判（有意思）
    {
        vi cn(n+1,0),pp(n+1,0);
        rep(i,1,n)
        {
            int c=s[i]-'0';
            if(c%p==0) pp[i]+=i,cn[i]++;
            pp[i]+=pp[i-1];
            cn[i]+=cn[i-1];
        }
        while(m--)
        {
            int l,r;cin>>l>>r;
            cout<<pp[r]-pp[l-1]-(cn[r]-cn[l-1])*(l-1)<<endl;
        }
        return;
    }
    for(int i=n;i>0;--i)
    {
        if(p!=2&&p!=5) f[i-1]=10*f[i]%p;
        else f[i-1]=1;
        a[i]=(f[i]*(s[i]-'0')+a[i+1]*(p!=2&&p!=5))%p;
        if(mp.find(a[i])==mp.end()) mp[a[i]]=i;
        pos[i]=i/siz;
    }
    rep(i,1,n+1) a[i]=mp[a[i]];
    vector<Q> q(m);
    vector<int> ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].r++,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    int l=1,r=0,len=r-l+1;
    int res=0,tt=0;
    vi cn(n+2,0);
    auto Add=[&](int id,int ff)
    {
        res+=cn[a[id]];
        cn[a[id]]++;
    };  
    auto Sub=[&](int id,int ff)
    {   
        cn[a[id]]--;
        res-=cn[a[id]];
    };
    for(auto &x:q)
    {
        while(l>x.l) Add(--l,0);
        while(r<x.r) Add(++r,1);
        while(l<x.l) Sub(l++,0);
        while(r>x.r) Sub(r--,1);
        ans[x.id]=res;
    }
    rep(i,0,m-1)
    {
        cout<<ans[i]<<endl;
    }
}
```
