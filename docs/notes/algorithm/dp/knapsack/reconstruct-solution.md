---
title: "背包求最优方案的路径"
algorithms: []
sidebarOutline: true
---

# 背包求最优方案的路径

导致递推一下就好了
[背包求最优](https://www.acwing.com/problem/content/description/11/)

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
    int n,m;cin>>n>>m;
    vi a(n+1),w(n+1);
    for(int i=n;i>=1;--i)
    {
        cin>>a[i]>>w[i];
    }
    vii dp(n+1,vi(m+1,0));
    rep(i,1,n)
    {
        rep(j,1,m)
        {
            dp[i][j]=dp[i-1][j];
            if(j>=a[i]) dp[i][j]=max(dp[i][j],dp[i-1][j-a[i]]+w[i]);
        }
    }
    int t=m;
    vi ans;
    for(int i=n;i>=1;--i)
    {
        if(dp[i][t]-w[i]==dp[i-1][t-a[i]]) t-=a[i],ans.push_back(n-i+1);
    }
    rep(i,0,ans.size()-1) cout<<ans[i]<<(i==ans.size()-1?"\n":" ");
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
