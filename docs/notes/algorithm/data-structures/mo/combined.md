---
title: "综合性莫队"
algorithms: []
sidebarOutline: true
---

# 综合性莫队

## 前缀差分+异或和
[P3604 美好的每一天 - 洛谷](https://www.luogu.com.cn/problem/P3604)
大意：
给定长度为n的由小写字母组成字符串，给出m次询问，求区间 l-r 中有多少子串可以通过排序内部元素来形成回文串？

n,m≤60000

思路：
首先思考判断一个子串是否可以通过排序来形成子串？

只要子串里 （a - z）的数量都为偶数，或者其中一个为奇数，其余都为偶数。

然后思考如何快速得到区间答案的值。
因为只有26个字母，所以对于26种奇偶性的维护可以用一个26位的二进制数就可以解决了。
我们对这个数组做一个前缀思路，那区间状态就是 `s[r]-s[l-1]`，但是因为考虑的是奇偶性转变问题，所以应该是前缀的异或差分

对第i个数做前缀异或操作，在上一个状态下，对该位置字母的位置上 异或1。

莫队维护数组 `cn[i]` 表示区间 状态为 i 的数量有多少，那么每次区间的增减就是找到区间所有使得 它的值异或后合法的 那些值的数量：即异或`1000,0100,0010,0001,0000` （例如）。

每次操作有26次，因为本题的数据范围没有2e5，所以$O(26n\sqrt{n})$ 是可以接受的。

```cpp
int cn[1<<26];//全局int 减少空间复杂度
vi pos; 
struct Q{int l,r,id;};
void solve() // ll
{
    int n,m;cin>>n>>m;
    pos.resize(n+1);
    vi a(n+1,0);
    int id=0,siz=pow(n,1.0/2.0);
    string s;cin>>s;
    rep(i,1,n)
    {
        a[i]=s[i-1]-'a';
        pos[i]=i/siz;
    }
    vector<Q> q;
    vi ans(m);
    rep(i,0,m-1)
    {
        int l,r;cin>>l>>r;
        q.push_back({--l,r,i});
    }
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    vector<bitset<26>> sum(n+1),mus(n+2);
    rep(i,1,n)
    {
        sum[i]=sum[i-1];sum[i].flip(a[i]);
    }
    for(int i=n;i>0;--i)
    {
        mus[i]=mus[i+1];mus[i].flip(a[i]);
    }
    int res=0,cn1=0;
    auto findd=[&](int v,int ff)[[#前缀差分+异或和]]
    {
        int x=1<<25;
        int s=0;
        while(x)
        {
            s+=cn[x^v];
            x>>=1;
        }
        s+=cn[v];
        return s;   
    };
    auto Add=[&](int id,int ff)
    {
        int v=(int)sum[id].to_ulong();
        res+=findd(v,ff);
        cn[v]++;
        if(v&&v==lowbit(v)) cn1++;
    };
    auto Sub=[&](int id,int ff)
    {
        int v=(int)sum[id].to_ulong();
        if(v&&v==lowbit(v)) cn1--;
        cn[v]--;
        res-=findd(v,ff);

    };
    int l=0,r=-1;
    for(auto x:q)
    {
        while(r<x.r) Add(++r,1);
        while(l>x.l) Add(--l,0);
        while(l<x.l) Sub(l++,1);
        while(r>x.r) Sub(r--,0);
        ans[x.id]=res;
    }
    for(auto x:ans) cout<<x<<endl;

}
```

## 区间分块+值域分块
[P4396 [AHOI2013] 作业 - 洛谷](https://www.luogu.com.cn/problem/P4396)
大意：
给定长度为 n 的数组 ，m次询问：
每次询问给出 区间 l 和 r，以及范围 a ，b。
求区间 中数值在 a 和 b 的范围内的数有多少个，并且求出有多少种。
n ,m < 1e5 , a , b < 1e5 .

思路：
在区间内莫队分块，在处理 a ， b 范围的数的信息用值域分块。

总的来说就是维护 `cn[i]` 值为 i 的数出现了多少次，`pn[i]` 区间是否有值为i的数。
做完区间维护后，对于 a 和 b ，枚举 $a,a+1,……，b$ 的信息算出a ， b 范围内的东西。
但是这样暴力枚举会超时。

我们优化暴力枚举的过程，将0 - 1e5 的值域根号分块，在维护 cn 和 pn 数组的同时，我们同时维护 `cnpos[i]` `pnpos[i]` 分别表示 cn 的 第i个块的总和，以及 pn 第i个块的总和。

判断 a 和 b 时，判断 a 和 b 之间是否有完整的块，有就将那些完整块的和统计入答案内，剩下的部分暴力枚举就好了。
如果没有完整的块，直接暴力。时间复杂度为 $O(m\sqrt{n})$

加上莫队的操作，总时间复杂度为 $O(n\sqrt{n}+m\sqrt{n})$

代码：

```cpp
vi pos; 
struct Q{int l,r,a,b,id;};
void solve() // ll
{
    int n,m;cin>>n>>m;
    pos.resize(n+1);
    vi a(n+1,0);
    int id=0,siz=pow(n,1.0/2.0);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    int sizN=sqrt(N);
    vector<Q> q;
    vector<pii> ans(m);
    rep(i,0,m-1)
    {
        int l,r,a,b;cin>>l>>r>>a>>b;
        q.push_back({l,r,a,b,i});
    }
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    int res=0;
    vi cn(N,0),pn(N,0);
    vi cnpos(N,0),pnpos(N,0);
    auto Add=[&](int id,int ff)
    {
        int v=a[id];
        int pid=v/sizN;
        if(cn[v]==0) pn[v]=1,pnpos[pid]++;
        cn[v]++;cnpos[pid]++;
    };
    auto Sub=[&](int id,int ff)
    {
        int v=a[id],pid=v/sizN;
        cn[v]--;cnpos[pid]--;
        if(cn[v]==0)pn[v]=0,pnpos[pid]--;
    };
    int l=0,r=-1;
    for(auto x:q)
    {
        while(r<x.r) Add(++r,1);
        while(l>x.l) Add(--l,0);
        while(l<x.l) Sub(l++,1);
        while(r>x.r) Sub(r--,0);
        int cnt=0,pnt=0;
        int Nl=(x.a/sizN),Nr=(x.b/sizN);
        if(Nl+1>=Nr)
        {
            rep(i,x.a,x.b)cnt+=cn[i],pnt+=pn[i];
        }
        else{
            rep(i,Nl+1,Nr-1) cnt+=cnpos[i],pnt+=pnpos[i];
            rep(i,x.a,(Nl+1)*sizN-1) cnt+=cn[i],pnt+=pn[i];
            rep(i,(Nr)*sizN,x.b) cnt+=cn[i],pnt+=pn[i];
        }
        ans[x.id]={cnt,pnt}; 
    }
    for(auto x:ans) cout<<x.first<<" "<<x.second<<endl;
}
```
