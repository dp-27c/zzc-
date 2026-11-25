---
title: "带修莫队"
algorithms: []
sidebarOutline: true
---

# 带修莫队

## 概念：
在 访问区间信息的过程中，穿插对某个位置的修改操作。

## 思路：
在普通莫队的基础上，引入修改的时间轴进Q里面。
按照关键字：
1. 左端点的块号，从小到大。
2. 右端点的快号，从小到大。
3. 修改时间的数值，从小到大。 这个不能忘！！
维护 时间窗口`[1……t]` 来表示 修改区间。
时间区间的维护只要 $(0->tim)$ 就好了

最优的块长设置为$n^{\frac{2}{3}}$,查询任务依次处理的时间复杂度为 $O(n^{\frac{5}{3}})$

## 模版：
[P1903 [国家集训队] 数颜色 / 维护队列 /【模板】带修莫队 - 洛谷](https://www.luogu.com.cn/problem/P1903)

```cpp
//以求区间不同数字的个数为例 
vi pos;
struct Q{int id,l,r,ti;};
void solve() //ll
{
    int n,m;cin>>n>>m;
    vi a(n+1,0);
    map<int,int> mp;
	// 分块 + 离散化
    int pid=0,siz=pow(n,2.0/3.0);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
        if(mp.find(a[i])==mp.end()) mp[a[i]]=pid++;// 离散化
    }
    
    rep(i,1,n) a[i]=mp[a[i]];
    vector<Q> q;  
    
    // 离散化时间轴
    vector<pii> change;change.push_back({0,0});// 补一个 0 号时间
    int time=0,cnid=0;
    rep(i,0,m-1)
    {
        char c;cin>>c;
        int l,r;cin>>l>>r;
        if(c=='Q')
        {
            q.push_back({cnid++,l,r,time});// 此时的任务编号不能是 i
        }
        else 
        {
            if(mp.find(r)==mp.end()) mp[r]=pid++;// 离散化
            change.push_back({l,mp[r]});time++;
        }
    }
    vector<int> ans(q.size());
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?pos[a.r]==pos[b.r]?a.ti<b.ti:pos[a.r]<pos[b.r]:pos[a.l]<pos[b.l];// 还要补上时间轴的排序
    });
    // 构造窗口变化函数
    int l=1,r=0,tim=0,res=0;
    vi cn(N,0);
    auto Add=[&](int id)
    {
        int v=a[id];
        if(cn[v]==0) res++;
        cn[v]++;
    };
    auto Sub=[&](int id)
    {
        int v=a[id];
        cn[v]--;
        if(cn[v]==0) res--;
    };
    auto changetime=[&](int tim) 
    {
        int id=change[tim].first,w=change[tim].second;
        if(id>=l&&id<=r)// 如果在区间内，则维护cn
        {
            cn[a[id]]--;if(cn[a[id]]==0) res--;// 删掉 原区间数
            if(cn[w]==0) res++;// 增加 改数
            cn[w]++;
        }
        swap(a[id],change[tim].second);
    };
    // 主程序：先窗口扩张，再在时间扩展，同时维护窗口内数字种类
    for(auto &x:q)
    {
        while(r<x.r)Add(++r);
        while(l>x.l)Add(--l);
        while(r>x.r)Sub(r--);
        while(l<x.l)Sub(l++);
        while(tim>x.ti)changetime(tim--);// 注意维护 0 到 tim 的时间莫队窗口
        while(tim<x.ti)changetime(++tim);
        ans[x.id]=res;
    }
    for(auto x:ans) cout<<x<<endl;
}
```

## 练习：
### mex+区间数字出现次数
[Problem - 940F - Codeforces](https://codeforces.com/problemset/problem/940/F)
大意：
给定长度为 n 的数组 和 m 次询问。
1. 每次长度给定 区间 l 和 r ：
- 求区间 l - r 中，数字 x 的出现次数 作为 $c_i$
- 将区间所有的 $\{ c_0,c_1,c_2,……,c_{1e9}\}$ 数组求其mex，输出这个 mex 的值。
2. 给出 id 和 v ,将 第 id 个位子上的数字 变为 v。

思路：
带修改的莫队模版。
首先 离散化数字 。

怎么快速的求 mex 是一个有趣的 问题。（trick）
我们维护一个数组 `cn[i]` 表示区间 i 数字出现的次数。
我们再维护一个数组 `pn[i]` 表示区间中，出现次数为 i 次的数字种数。
通过维护这两个数组，再暴力从1枚举`pn[i]` 中第一个为 0 的位置，就是mex。
为什么这里可以通过暴力来算 mex 而不超时？

当取最极端的情况下，要达到 mex 为 x，那么我至少需要 $x(x-1)/2$ 个数字，来填补`pn[i]`.
最大的枚举次数为 $\sqrt{n}$   。

所以 有 m 次询问区间，每次 $\sqrt{n}$  次，在 $O(n^{\frac{5}{3}}+m\times\sqrt{n})$
时间复杂度是完全够的，在 n 和 m 同阶情况下。

代码：

```cpp
vi pos;
struct Q{int l,r,ti,id;};
void solve() // ll
{
    int n,m;cin>>n>>m;
    pos.resize(n+1);
    int siz=pow(n,2.0/3.0),mid=1;
    vi a(n+1,0);
    map<int,int> mp;
    rep(i,1,n)
    {
        cin>>a[i];
        if(mp.find(a[i])==mp.end()) mp[a[i]]=mid++;
        pos[i]=i/siz;
    }
    rep(i,1,n) a[i]=mp[a[i]];
    vector<Q> q;
    vector<pii> tt;tt.push_back({0,0});
    int time=0,cnq=0;
    rep(i,0,m-1)
    {
        char c;int l,r;
        cin>>c>>l>>r;
        if(c=='2'&&mp.find(r)==mp.end()) mp[r]=mid++;
        if(c=='2') tt.push_back({l,mp[r]}),time++;
        else q.push_back({l,r,time,cnq}),cnq++;
    }
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?(pos[a.r]==pos[b.r]?a.ti<b.ti:pos[a.r]<pos[b.r]):pos[a.l]<pos[b.l];
    });
    vi ans(cnq);
    int l=1,r=0,t=0;
    vi cn(1e6+1,0);
    vi pn(1e6+1,0);
    auto Add=[&](int id)
    {
        int v=a[id];
        pn[cn[v]]--;
        cn[v]++;
        pn[cn[v]]++;
    };

    auto Sub=[&](int id)
    {
        int v=a[id];
        pn[cn[v]]--;
        cn[v]--;
        pn[cn[v]]++;
    };

    auto change=[&](int id)
    {
        int aid=tt[id].first;
        if(aid>=l&&aid<=r){Sub(aid);}
        swap(a[aid],tt[id].second);
        if(aid>=l&&aid<=r){Add(aid);}
    };

    for(auto x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        while(t<x.ti) change(++t);
        while(t>x.ti) change(t--);
        int j=1;
        while(pn[j]) j++;
        ans[x.id]=j;
    }
    rep(i,0,cnq-1) cout<<ans[i]<<endl;
}
```

### 区间k个数的出现次数极差最小（紫）
[Problem - G - Codeforces](https://codeforces.com/contest/1476/problem/G)
大意：
给长度为 n 的数组和m次询问 。
令 区间 l - r 的dir 为 从中选 k 个数，使得，k个数中每个数的出现次数的 极差是所有方案的最小值。
每次询问给以下选择：
1. 给 l ，r ，k。输出区间 dir。
2. 给 id ，v 。将 数组第 id 上的位置值改为 v。

思路：
带修的莫队模版。
离散化

维护数组`cn[i]`  表示 i 数字出现的次数。
维护数组 `pn[i]` 表示出现次数为 i 的数字种数。

对于求极差最小，我们可以等到前面的区间伸缩完成后，访问`pn[i]`，双指针计算区间和最多大于k（使得两者最接近）。
这样的线性暴力枚举 是可行的，但是会出现一些极端数据，1e5个数里有 1e5 个数一样。
这会导致一次线性枚举的时间复杂度 增大到 1e5.
为了避免这种一步一步移动但是做的是无用功。

这个时候就可以用分块来优化爆搜枚举了。
我们可以在莫队过程中维护 `kuan[i]` 表示第 i 块 `pn` 数组的和。
如果为 0 ，那么就可以直接从下一块开始，这样的过程可以被证明是根号的复杂度，因为越到后面，需要的总数字数就越多。

这个 分块 优化太屌了，平时习惯了树状数组，但是碰到树状数组不能用的时候，分块反而独占优势！！！

进一步优化：要将所有`pn[j]`不为 0 的位置保存到新的数组里，在这个数组里枚举。

代码：

```cpp
vi pos;
struct Q{int l,r,ti,id,k;};
vi kuan(1e6+7,0);// 维护 pn 分块的和，块长为 根号 n
void add(int id, int v)
{
    if(id==0) return;
    kuan[pos[id]]+=v;
}
void solve() // ll
{
    int n,m;cin>>n>>m;
    pos.resize(n+1);
    // int siz=pow(n,2.0/3.0),mid=1;
    int siz=pow(n,2.0/3.0),mid=1;
    vi a(n+1,0);
    map<int,int> mp;
    rep(i,1,n)
    {
        cin>>a[i];
        if(mp.find(a[i])==mp.end()) mp[a[i]]=mid++;
        pos[i]=i/siz;
    }
    rep(i,1,n) a[i]=mp[a[i]];
    vector<Q> q;
    vector<pii> tt;tt.push_back({0,0});
    int time=0,cnq=0;
    rep(i,0,m-1)
    {
        char c;int l,r;
        cin>>c>>l>>r;
        if(c=='2'&&mp.find(r)==mp.end()) mp[r]=mid++;
        if(c=='2') tt.push_back({l,mp[r]}),time++;
        else 
        {
            int x;cin>>x;
            q.push_back({l,r,time,cnq,x}),cnq++;
        }
    }
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?(pos[a.r]==pos[b.r]?a.ti<b.ti:pos[a.r]<pos[b.r]):pos[a.l]<pos[b.l];
    });

    // auto low_bund=[&](int x) 想要二分优化 爆搜，失败！！

    vi ans(cnq);
    int l=1,r=0,t=0,cnt=0,mx=0;
    vi cn(1e6+1,0);
    vi pn(1e6+1,0);
    
    auto Add=[&](int id)
    {
        int v=a[id];
        pn[cn[v]]--,add(cn[v],-1);// 因为尝试过 树状数组，为了删除树状数组，我们直接将add变成分块加
        if(cn[v]==0) cnt++;
        cn[v]++;
        if(cn[v]>mx) mx++;
        pn[cn[v]]++,add(cn[v],1);
    };

    auto Sub=[&](int id)
    {
        int v=a[id];
        pn[cn[v]]--,add(cn[v],-1);
        if(cn[v]==mx&&pn[cn[v]]==0) mx--;
        cn[v]--;
        pn[cn[v]]++,add(cn[v],1);
        if(cn[v]==0) cnt--;
    };

    auto change=[&](int id)
    {
        int aid=tt[id].first;
        if(aid>=l&&aid<=r){Sub(aid);}
        swap(a[aid],tt[id].second);
        if(aid>=l&&aid<=r){Add(aid);}
    };

    for(auto x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        while(t<x.ti) change(++t);
        while(t>x.ti) change(t--);
        if(cnt<x.k){ ans[x.id]=-1;continue;}
        // pn[0]=0; 树状数组维护失败
        
        // 接下来登场的是 自己的分块爆搜 被卡常了

        int res=INF,wi=0,wj=0;//暴力分块优化！！
        pn[0]=0;
        vector<pii> v;
        rep(i,0,pos[mx])//要将所有pn[j]不为0的位置保存到新的数组里，在这个数组里枚举。
        {
            if(kuan[i])
            {
                rep(j,i*siz,min(mx,(i+1)*siz-1))
                {
                    if(pn[j])
                    {
                        if(v.size()==0) 
                        {
                            v.push_back({j-1,0});
                        }
                        v.push_back({j,pn[j]});
                    }
                }
            }
        }
        int vlen=v.size()-1,j=0;
        for(int i=0;i<=vlen;++i)
        {
            wi+=v[i].second;
            while(wi-wj>=x.k) ++j,wj+=v[j].second;
            if(wi>=x.k) res=min(res,v[i].first-v[j].first);
        }
        ans[x.id]=res;
    }
    rep(i,0,cnq-1) cout<<ans[i]<<endl;
}
```
