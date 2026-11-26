---
title: "妙妙线段树或者树状数组"
algorithms: []
sidebarOutline: true
---

# 妙妙线段树或者树状数组

## 求范围内 不同区间的个数
[P2184 贪婪大陆 - 洛谷](https://www.luogu.com.cn/problem/P2184)
大意：
有一个长度为 n 区域，m次操作：
1. 操作1：将区间 l 到 r 上都埋下一个不同于之前埋过的雷
2. 操作2：输出区间 l 到 r 上不同雷的数量
$n<1e5$
思路：
转化为 一个范围内 有多少个不同的 区间。

我们可以发现，以区间作为 操作1 的`[l,r]` ,以 范围作为 操作2 的`[l,r]`
将区间看成是 左右两个端点，如果一个区间在 范围内， 那么 区间的左端点 一定 小于范围的右端点，区间的右端点 不能小于 范围的左端点

这是不在范围的区间：
![位于查询区间两侧且与之不相交的区间](../../../../assets/note-images/Pasted%20image%2020260111210946.png){width=1355 height=517}

这是在范围的区间：
![与查询区间相交的四种区间位置](../../../../assets/note-images/Pasted%20image%2020260111211110.png){width=1304 height=413}

因此我们发现
范围的右端点 内 找前缀区间左端点。
范围的左端点 内 找前缀区间右端点。
树状数组三行代码秒了啊！！！

Code：

```cpp
// BIT 模版
void solve() // ll
{
    int n,m;cin>>n>>m;
    BIT L(n+1),R(n+1);
    while(m--)
    {
        int op,l,r;cin>>op>>l>>r;
        if(op&1) L.add(l,1),R.add(r+1,1);
        else cout<<L.sum(r)-R.sum(l)<<endl;
    }
}
```

## 区间最小的修改：
[P15259 [USACO26JAN2] Farmer John Loves Rotations S - 洛谷](https://www.luogu.com.cn/problem/P15259)
题目：
一个整数数组 a，对于 id 从 1 到 n，你要回答问题，你可以执行下面操作：
初始集合自带 `a[id]`
选择 向左或者向右 移动一格，并将此时的格上数字加入集合中。
当 集合大小 与 整个 a数组数字集合 大小一样时，至少需要几步？
n<5e5
思路：

方法一 ：线段树 + 双指针

左走 和 右走 区分，枚举 L 左端点区间，R 往右走 作为右区间。区间内的点，最少步骤为 `(R-L) + min(id-L , R-id)`
此时公式区分，为 $min(min(R_i-2*L_i)+id,min(2*R-L)-id)$ 。
此外 ，别忘了区间外的点 为区间在左时用 $id-L_i$，区间在右时用 $R_i-id$

区间使用 线段树修改，维护区间最小值，注意：lazy 标记的使用，和初始化

方法二：dp + 双指针

预处理每一个位置单向走时的最短步骤为多少。
那么剩下的就 先左再单向，以及 先右再单向，的步骤。
从前往后遍历，可以维护 先左 的操作：
`f[i]=min(f[i],f[i-1]+1)`
同理 从后往前遍历，维护 先右 的操作：
`f[i]=min(f[i],f[i+1]+1)`

Code:
此为线段树：

```cpp
#define rt tr[u]
#define ls tr[u<<1]
#define rs tr[u<<1|1]
struct Node{int l,r,mi,add;}tr[N<<2];
void pushup(int u){rt.mi=min(ls.mi,rs.mi);}
void pushdown(int u)
{
    if(rt.add!=INF)
    {
        ls.mi=min(ls.mi,rt.add);
        ls.add=min(ls.add,rt.add);
        rs.mi=min(rs.mi,rt.add);
        rs.add=min(rs.add,rt.add);
        rt.add=INF;
    }
}
void build(int u,int l,int r)
{
    rt={l,r,INF,INF};
    if(l==r) return;
    int mid=l+r>>1;
    build(u<<1,l,mid),build(u<<1|1,mid+1,r);
}
int query(int u,int id)
{
    if(rt.l==rt.r&&rt.l==id)
    {
        return rt.mi;
    }
    int mid=rt.l+rt.r>>1;
    pushdown(u);
    if(id<=mid) return query(u<<1,id);
    else return query(u<<1|1,id);
}
void modify(int u,int l,int r,int v)
{
    if(l<=rt.l&&rt.r<=r)
    {
        if(rt.mi>v) rt.mi=v;
        rt.add=min(rt.add,v);
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
    int n;cin>>n;
    vi a(2*n+1,0),mp(n+1,0),s(n+1,0);rep(i,1,n) cin>>a[i],a[n+i]=a[i];
    build(1,1,2*n);
    int num=0,cnt=0;
    rep(i,1,n){mp[a[i]]++;if(mp[a[i]]==1) num++;}
    int l=1,r=0;
    rep(i,1,n)
    {
        while((r<l||cnt<num)){if((s[a[++r]]++)==0){cnt++;};}
        int d=r-2*l;modify(1,l,r,d);
        if(r<2*n) modify(1,r+1,2*n,-l); // 后面节点一直往前走
        if((--s[a[l++]])==0) cnt--;
    }
    vi ans(n+1,INF);rep(i,1,n) ans[i]=min({ans[i],query(1,i)+i,query(1,n+i)+(n+i)});
    build(1,1,2*n);
    l=1,r=0,cnt=0;
    rep(i,1,n) s[a[i]]=0;
    rep(i,1,n)
    {
        while((r<l||cnt<num)){if((s[a[++r]]++)==0){cnt++;};}
        int d=2*r-l;modify(1,l,r,d);
        if(l>1) modify(1,1,l-1,r); // 前面的节点一直往后走
        if((--s[a[l++]])==0) cnt--;
    }
    // cout<<query(1,9)-9<<endl;
    rep(i,1,n) ans[i]=min({ans[i],query(1,i)-i,query(1,n+i)-(n+i)});
    rep(i,1,n) cout<<ans[i]<<" \n"[i==n];
}
```
