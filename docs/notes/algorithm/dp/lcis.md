---
title: "最长公共上升子序列"
algorithms: []
sidebarOutline: true
---

# 最长公共上升子序列

参考 [最长公共子序列](https://www.acwing.com/problem/content/6020/)和[最长上升子序列](https://www.acwing.com/activity/content/problem/content/1259/)

[题目](https://www.acwing.com/problem/content/274/)
如何将公共子序列和上升子序列的结合

```cpp
#define _CRT_SECURE_NO_WARNINGS//忽略scanf的不安全性

#include<bits/stdc++.h>
#include<unordered_map>
using namespace std;//存一下这个nb代码
const int N = 5e5 + 7;//数组上限
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
int a[3007],b[3007];
int dp[3007][3007];
void solve()// int !
{
    int n;cin>>n;
    rep(i,1,n) cin>>a[i];
    rep(i,1,n) cin>>b[i];
    int ans=0;
    rep(i,1,n)
    {
        int maxv=0;
        rep(j,1,n)
        {
            dp[i][j]=dp[i-1][j];
            if(a[i]>b[j]) maxv=max(dp[i-1][j],maxv);
            if(a[i]==b[j]){dp[i][j]=max(dp[i][j],maxv+1);}
            ans=max(dp[i][j],ans);
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
