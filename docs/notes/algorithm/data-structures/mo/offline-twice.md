---
title: "二次离线莫队"
algorithms: []
sidebarOutline: true
---

# 二次离线莫队

思路：
当莫队区间转移的过程，每一步都无法做到 $O(1)$ 的时候，其实可以判断，当只增和只删都不管用的时候，思考二次离线。

二次离线的思维在于，将莫队的区间转移过程记录为新的任务，新的任务同样具有 `l , r , id` 的参数，但是是否需要多一个参数来记录当前过程：

eg：下面的模版题，就是通过固定区间转移的 前缀 和 后缀 来达到区间转移的效果。

最后每个答案都保留了区间转移的总贡献，当然这还没有结束，因为区间转移还是在上一个区间的基础上贡献的计算，所以我们还要根据最开始莫队的 队列顺序进行前缀和。

因为前面已经莫队过了，所以后面的区间贡献计算直接枚举就好了。
优化时间复杂度从 $O(nk\sqrt{n}) \longrightarrow O(nk+n\sqrt{n})$

## 模版题代码：
卡了三天的bug 终于被我找出来了，呜呜呜呜。
原来bug 是在排序那一块。
前缀排序和后缀排序变成一样导致的，应该是相反的。
这个应该是后续修改代码的时候误改了！！
[P4887 【模板】莫队二次离线（第十四分块(前体)） - 洛谷](https://www.luogu.com.cn/problem/P4887)

```cpp
vi pos;
struct Q{int l,r,id;}; 
struct tastl{int cur,l,r,op,id;} ;
struct tastr{int cur,l,r,op,id;} ;
void solve() // ll
{   
    int n,m,k;cin>>n>>m>>k;
    vi kk;
    rep(i,0,16383) if(count_bit(i)==k) kk.push_back(i);
    vi a(n+2,0);
    int siz=sqrt(n);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    vi sum(n+2,0),mus(n+2,0);
    vi cn(16384,0);
    rep(i,1,n)
    {
        sum[i]+=cn[a[i]];
        for(auto x:kk)
        {
            cn[x^a[i]]++;
        }
    }
    fill(cn.begin(),cn.end(),0);
    for(int i=n;i>0;--i)
    {
        mus[i]+=cn[a[i]];
        for(auto x:kk)
        {
            cn[x^a[i]]++;
        }
    }
    fill(cn.begin(),cn.end(),0);
    vi ans(m);
    vector<Q> q;
    rep(i,0,m-1)
    {
        
        int l,r;cin>>l>>r;
        q.push_back({l,r,i});
    }
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?(pos[b.l]&1?a.r>b.r:a.r<b.r):pos[a.l]<pos[b.l];
        //return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    // 离线化 莫队区间扩张和缩小的任务
    int l=1,r=0;
    vector<tastl> tl;
    vector<tastr> tr;
    // 其实只要一个序列就好了，后续优化更近
    //vector<tast> t;
    for(auto x:q)
    {
        //tl.push_back({l-1,l,r,-1,x.id}); // 最追加的初始任务 这个后面直接用任务前缀和优化
        if(r<x.r) tl.push_back({l-1,r+1,x.r,-1,x.id}),r=x.r;// 定前缀，右边界扩张
        //while(r<x.r) ans[x.id]+=sum[++r];
        if(l>x.l) tr.push_back({r+1,x.l,l-1,-1,x.id}),l=x.l;// 定后缀，左边界扩张
        //while(l>x.l) ans[x.id]+=mus[--l];
        if(l<x.l) tr.push_back({r+1,l,x.l-1,1,x.id}),l=x.l;//  定后缀，左边界缩小
        //while(l<x.l) ans[x.id]-=mus[l++];
        if(r>x.r) tl.push_back({l-1,x.r+1,r,1,x.id}),r=x.r;//  定前缀，右边界缩小
        //while(r>x.r) ans[x.id]-=sum[r--];
    }
    //  离线任务的比较函数,直接按照 前缀点升序，后缀点降序排
    auto cmpl=[&](tastl a,tastl b)
    {
        return a.cur<b.cur;
    };
        // 后缀任务要 以靠后为优先
    auto cmpr=[&](tastr a,tastr b)
    {
        return a.cur>b.cur;
    };
    // 先对 左区间扩张 

    sort(tl.begin(),tl.end(),cmpl);
    int cur=0; // 前缀 任务 ,因为已经莫队过了，所以此时直接枚举就是最快的
    int res=0; // 计算贡献值
    fill(cn.begin(),cn.end(),0);
    // 传入前缀值或者后缀值来维护总体
    auto Add=[&](int id,vi &s) 
    {
        res+=cn[a[id]];
        res-=s[id];// 因为总前缀计算和固定前缀的计算方式是相反的。
    };
    for(auto x:tl)
    {
        while(cur<x.cur)
        {
            ++cur;
            for(auto p:kk)
            {
                cn[a[cur]^p]++;
            }
        }
        res=0;
        rep(i,x.l,x.r) Add(i,sum);
        ans[x.id]+=(x.op)*(res);
    }
    // 后缀 任务
    sort(tr.begin(),tr.end(),cmpr);
    cur=n+1;
    fill(cn.begin(),cn.end(),0);
    for(auto x:tr)
    {
        while(cur>x.cur)
        {
            --cur;
            for(auto p:kk)
            {
                cn[a[cur]^p]++;
            }
        }
        res=0;
        rep(i,x.l,x.r) Add(i,mus);
        ans[x.id]+=(x.op)*(res);
    }
    int ass=0;
    for(int i=0;i<q.size();++i)
    {
    // 莫队在前面的基础上进行的区间扩张和缩小，一个区间的答案是上一个区间扩张和缩小得来的 
        ass+=ans[q[i].id];
        ans[q[i].id]=ass;
    }
    for(auto x:ans) cout<<x<<endl;
}

```
