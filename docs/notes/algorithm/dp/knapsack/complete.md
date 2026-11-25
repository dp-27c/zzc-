---
title: "完全背包的思考"
algorithms: []
sidebarOutline: true
---

# 完全背包的思考

[货币系统](https://www.acwing.com/problem/content/description/534/)
题目：
> *对于一个货币数组a，里面有n种整数货币，求一个长度最小的数组b满足：*
> 1. *b能表示a能表示的所有整数*
> 2. *b不能表示a不能表示的所有整数*

如何思考这是一个完全背包的题目呢？
首先 需要证明，最优的方案中，b一定是a的子集；
然后 找到a的元素中被表示的方案 不只自己1种 的 元素可以被删掉；

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
    int n;cin>>n;
    int len=0;
    vi a(n+1);rep(i,1,n) cin>>a[i],len=max(len,a[i]);
    vii dp(n+1,vi(len+1,0));
    dp[0][0]=1;
    rep(i,1,n)
    {
        rep(j,0,len)
        {
            dp[i][j]=dp[i-1][j];
            if(j>=a[i]) dp[i][j]+=dp[i][j-a[i]];
        }
    }
    int ans=n;
    rep(i,1,n)
    {
        if(dp[n][a[i]]>1) ans--;
    }
    cout<<ans<<endl;
    
}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t_=1;
    cin>>t_;
    while(t_--){solve();}
    return 0;
}
//ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```
