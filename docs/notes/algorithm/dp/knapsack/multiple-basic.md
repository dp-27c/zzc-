---
title: "多重背包问题I （朴素算法）"
algorithms: []
sidebarOutline: true
---

# 多重背包问题I （朴素算法）

$$
O(nms)
$$

[庆功会](https://www.acwing.com/problem/content/1021/)

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
#define int ll
#define pii pair<int,int>//此int 已经是 ll 了
#define vi vector<int>
#define vii vector<vi>
#define rep(i,l,r) for(int i=l;i<=r;++i)
//上述 
void solve()// ll !
{
    int n,m;
    cin>>n>>m;
    vii dp(n+1,vi(m+1,0));
    rep(i,1,n)
    {
        int v,w,s;cin>>v>>w>>s;
        rep(j,1,m)
        {
            int maxv=0;
            for(int k=j;k>=max(0LL,j-s*v);k-=v)
            {
                maxv=max(maxv,dp[i-1][k]+(j-k)/v*w);
            }
            dp[i][j]=max(dp[i][j],maxv);
        }
    }
    cout<<dp[n][m]<<endl;
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
