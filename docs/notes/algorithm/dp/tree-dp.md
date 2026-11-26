---
title: "树形dp"
algorithms: []
sidebarOutline: true
---

# 树形dp

## 求树的直径的方法：（树内的最长路径）

[树的最长路径](https://www.acwing.com/problem/content/1074/)
从任意u节点开始，到达距离它最远的节点v；
再从v节点开始，找到到达它距离最远的路径，就是直径
聪明的你一定会问，为什么这样就是最长的呢？
我们需要证明 v 为什么是直径的一个端点。

反证法： 假设存在一条直径端点不含 v 的
就会有两种情况，两条路线有交集，和无交集；
均可证明 距离最远的节点 u 到达直径端点的长度大于 原直径，因此方法成立

![用路径相交与否证明树的直径端点](../../../assets/note-images/Pasted%20image%2020250726212745.png){width=1037 height=572}

## 树形dp对边和点的考虑

边：[战略游戏](https://www.acwing.com/problem/content/325/)
点：[皇宫看守](https://www.acwing.com/activity/content/problem/content/1307/)

## 换根dp

[# P3478 [POI 2008] STA-Station](https://www.luogu.com.cn/problem/P3478)
板子题

```cpp
#define _CRT_SECURE_NO_WARNINGS // 忽略scanf的不安全性
 
#include <bits/stdc++.h>
#include <unordered_map>
using namespace std;                          // 存一下这个nb代码
const int N = 1e6 + 7;                        // 数组上限
const int inf = 0xc0c0c0c0, INF = 0x3f3f3f3f; // memset专用路径,//此int与ll后的int 有所不同 望知;
//             -1061109568        1061109567,  1e9以上；请注意数据范围！
const double eps = 1e-7; // 最小可忽略
int const mod = 998244353;//1e9 + 7;//1e6+7;//mod运算
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
int lowbit(int x){return x&(-x);}
struct vw
{
    int v,w;
};
vector<vector<int>> mp;
void add(int u,int v)
{
    mp[u].push_back(v);
}
void solve() // ll !
{
    int n;cin>>n;
    mp.resize(n+1);
    rep(i,1,n-1)
    {
        int u,v;cin>>u>>v;
        add(u,v),add(v,u);
    }
    vi f(n+1,0),cn(n+1,0),dep(n+1,0);
    dep[0]=-1;
    int ans=0,id=0;
    function<void(int,int)> dfs1=[&](int u,int fa)
    {
        cn[u]=1;
        dep[u]=dep[fa]+1;
        f[u]=dep[u];
        for(auto &v:mp[u])
        {
            if(v==fa) continue;
            dfs1(v,u);
            f[u]+=f[v];
            cn[u]+=cn[v];
        }
    };
    function<void(int,int)> dfs2=[&](int u,int fa)
    {
        if(fa) f[u]=f[fa]+n-2*cn[u];
        if(f[u]>ans)
        {
            ans=f[u];
            id=u;
        }
        for(auto &v:mp[u])
        {
            if(v==fa) continue;
            dfs2(v,u);
        }
    };
    dfs1(1,0);
    dfs2(1,0);
    cout<<id<<endl;
}
signed main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int t_ = 1;
    //cin>>t_;
    //init();
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
