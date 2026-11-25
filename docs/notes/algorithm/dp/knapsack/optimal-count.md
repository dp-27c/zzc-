---
title: "背包求最优方案数"
algorithms: []
sidebarOutline: true
---

# 背包求最优方案数

[背包求方案数](https://www.acwing.com/problem/content/description/11/)
二维cn数组跟踪就好了
遇到相同的相加。

```cpp
#define _CRT_SECURE_NO_WARNINGS//忽略scanf的不安全性

#include<bits/stdc++.h>
#include<unordered_map>
using namespace std;//存一下这个nb代码
const int N = 1e6 + 7;//数组上限
const int inf = 0xc0c0c0c0, INF = 0x3f3f3f3f;//memset专用路径,//此int与ll后的int 有所不同 望知;
//             -1061109568        1061109567,  1e9以上；请注意数据范围！
const double eps = 1e-7;//最小可忽略
int const mod = 1e9+7;//998244353;//1e6+7;// //mod运算
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
    int n,m;cin>>n>>m;
    vi v(n+1),w(n+1);
    for(int i=n;i>=1;--i)
    {
        cin>>v[i]>>w[i];
    }
    vii dp(n+1,vi(m+1,0));
    vii cn(n+1,vi(m+1,0));
    cn[0][0]=1;
    // dp过程，用cn的二维数组来维护，（可以优化成一维）
    rep(i,1,n)
    {
        rep(j,0,m)
        {
            dp[i][j]=dp[i-1][j];
            cn[i][j]=cn[i-1][j];
            if(j>=v[i]&&dp[i][j]<dp[i-1][j-v[i]]+w[i])
            {
                dp[i][j]=dp[i-1][j-v[i]]+w[i];
                cn[i][j]=cn[i-1][j-v[i]];
            }
            else if(j>=v[i]&&dp[i][j]==dp[i-1][j-v[i]]+w[i])
            {
                cn[i][j]=(cn[i][j]+cn[i-1][j-v[i]])%mod;
            }
        }
    }
    int ans=cn[n][m];
    // 将背包方案中恰好为j 但是价值相同的 路径加上；（注意:这和直接到达m的路径是不会完全重合的,所以要加）
    rep(j,1,m-1)
    {
        if(dp[n][j]==dp[n][m]) ans=(ans+cn[n][j])%mod;
    }
    cout<<(ans?ans:1)<<endl;
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
