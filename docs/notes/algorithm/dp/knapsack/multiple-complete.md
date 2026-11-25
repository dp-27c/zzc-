---
title: "多重背包II+完全背包"
algorithms: []
sidebarOutline: true
---

# 多重背包II+完全背包

练习[# The Fewest Coins G](https://www.luogu.com.cn/problem/P2851)
题意：
> 一个人要买M价值的物品
> 但是他手上第`i`种货币只有`a[i]`个
> 而商店老板第`i`种货币有无限个用来找零
> 求 这个交易过程中使用最少的硬币数量？

注意码多重背包II的过程要 保证容量遍历为倒序（满足01背包）
其次面对二进制转换时，剩下的部分需要补1；

```cpp
#define _CRT_SECURE_NO_WARNINGS//忽略scanf的不安全性
 
#include<bits/stdc++.h>
#include<unordered_map>
using namespace std;//存一下这个nb代码
const int N = 5e6 + 7;//数组上限
const int inf = 0xc0c0c0c0, INF = 0x3f3f3f3f;//memset专用路径,//此int与ll后的int 有所不同 望知;
//             -1061109568        1061109567,  1e9以上；请注意数据范围！
const double eps = 1e-7;//最小可忽略
int const mod = 1e9+7;//998244353;//1e6+7;//mod运算
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
    int maxv=0;
    vi v(n+1);rep(i,1,n) cin>>v[i];
    vi c(n+1);rep(i,1,n) cin>>c[i],maxv+=c[i]*v[i];
    if(maxv<m){cout<<-1<<endl;return;}
    vi dpd(m+1,INF),dp(2*m+1,INF);
    dpd[0]=0,dp[0]=0;
    rep(i,1,n)
    {
        rep(j,0,m)
        {
            if(j>=v[i]) dpd[j]=min(dpd[j],dpd[j-v[i]]+1);
        }
    }
    int ans=INF;
    rep(i,1,n)
    {
        int x=c[i],cnt=0;
        while(x/2)
        {
            int vv=(1<<cnt)*v[i],ww=1<<cnt;
            for(int j=2*m;j>=vv;--j)
            {
                if(j>=vv) dp[j]=min(dp[j],dp[max(0,j-vv)]+ww);
                if(j>=m) ans=min(ans,dp[j]+dpd[j-m]);
            }
            x/=2;++cnt;
        }
        int vv=(c[i]-(1<<cnt)+1)*v[i],ww=vv/v[i];
        if(vv)
        {
            for(int j=2*m;j>=vv;--j)
            {
                if(j>=vv) dp[j]=min(dp[j],dp[max(0,j-vv)]+ww);
                if(j>=m) ans=min(ans,dp[j]+dpd[j-m]);
            }
        }
    }
    cout<<(ans==INF?-1:ans)<<endl;
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
