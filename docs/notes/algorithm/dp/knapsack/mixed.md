---
title: "混合背包问题"
algorithms: []
sidebarOutline: true
---

# 混合背包问题

[混合背包求解](https://www.acwing.com/activity/content/record/16/1/)
题目大意：
> 有n个物品，每个物品有对应体积v和价值w，每个物品都有不同的状态s：
> 1. s=-1： 数量为1
> 2. s=0：  数量为无穷
> 3. s>0：  数量为s
> 求容量为m 的背包能装满的最大价值

分析：
这是01背包，完全背包，多重背包的混合版
将多重背包用二进制转化为 01 背包（参考[多重背包问题II](./multiple-binary.md)）
在dp过程中，只需要判断是否为 01背包 和 完全背包 ，然后分别按各自方法dp
注意可能会超出容量限制，所以下面代码用了一维背包做空间优化；

$$
O(nm\log s)
$$

*当然，你可以用[多重背包问题III](./multiple-monotone-queue.md)的单调队列方法优化，使其达到 $O(nm)$*
*只要题目有这样的限制或者你愿意*

```cpp
#define _CRT_SECURE_NO_WARNINGS//忽略scanf的不安全性

#include<bits/stdc++.h>
#include<unordered_map>
using namespace std;//存一下这个nb代码
const int N = 1e6 + 7;//数组上限
const int inf = 0xc0c0c0c0, INF = 0x3f3f3f3f;//memset专用路径,//此int与ll后的int 有所不同 望知;
//             -1061109568        1061109567,  1e9以上；请注意数据范围！
const double eps = 1e-7;//最小可忽略
int const mod = 998244353;//1e6+7;//1e9+7;// //mod运算
#define endl "\n";
#define ll long long
#define ld long double
//#define int ll
#define pii pair<int,int>//此int 已经是 ll 了
#define vi vector<int>
#define vii vector<vi>
#define rep(i,l,r) for(int i=l;i<=r;++i)
//上述

void solve()// int !
{
    int n,m;cin>>n>>m;
    vi v,w;v.push_back(0),w.push_back(0);
    vi id(N);
    int len=0;
    rep(i,1,n)
    {
        int vv,ww,s;
        cin>>vv>>ww>>s;
        if(s<=0)
        {
            ++len;
            v.push_back(vv);
            w.push_back(ww);
            id[len]=s;
        }
        else 
        {
            vector<pii> k;
            int x=s,cn=0;
            while(x/2)
            {
                k.push_back({(1<<cn)*vv,(1<<cn)*ww});
                cn++;
                x>>=1;
            }
            k.push_back({(s-(1<<cn)+1)*vv,(s-(1<<cn)+1)*ww});
            rep(j,0,k.size()-1)
            {
                if(k.empty()) break;
                ++len;
                v.push_back(k[j].first);
                w.push_back(k[j].second);
                id[len]=-1;
            }
        }
    }
    vi dp(m+1,0);
    int ans=0;
    rep(i,1,len)
    {
        if(id[i]==-1)
        {
            for(int j=m;j>=v[i];--j)
            {
                dp[j]=max(dp[j],dp[j-v[i]]+w[i]);
                ans=max(ans,dp[j]);
            }
        }
        else 
        {
            for(int j=0;j<=m;++j)
            {
                if(j>=v[i]) dp[j]=max(dp[j],dp[j-v[i]]+w[i]);
                ans=max(ans,dp[j]);
            }
        }

    }
    cout<<ans<<endl;
}

signed main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t_=1;
    //cin>>t_;
    while(t_--){solve();}
    return 0;
}
//ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```
