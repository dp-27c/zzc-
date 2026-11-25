---
title: "贪心背包"
algorithms: []
sidebarOutline: true
---

# 贪心背包

能量石
题目：
> 有n个石头，在第j秒吃掉第i个需要s时间，获得e-j * l  的能量，问最多能获得多少能量

思路：
贪心推导最优吃法路线：

待补图片（屏幕截图 2025-07-22 213206.png）

意思是 比较两个相邻的石头 i 和 i+1不同吃的顺序所获得的能量。
1. 先吃i，     `e[i]+e[i+1]-s[i]*l[i+1]`;
2. 先吃i+1，`e[i+1]+e[i] -s[i+1]*l[i]`;
所以比较相邻的最优顺序，排序即可贪心出最优路线！！
然后就是01背包问题。具体细节请看代码注释。

$$
a_i
$$

```cpp
#define _CRT_SECURE_NO_WARNINGS//忽略scanf的不安全性
 
#include<bits/stdc++.h>
#include<unordered_map>
using namespace std;//存一下这个nb代码
const int N = 5e6 + 7;//数组上限
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
struct st
{
    int s,e,l;
    //贪心，按照最优的方法去吃
    bool operator<(const st& x)const{
        return s*x.l<x.s*l;
    }
};
int cn=1;
void solve()// ll !
{
    int n;cin>>n;
    vector<st> a(n+1);
    int lent=0;
    a[0]={0,0,0};
    rep(i,1,n)
    {
        cin>>a[i].s>>a[i].e>>a[i].l;
        lent+=a[i].s;
    }
    sort(a.begin()+1,a.end());
    vii dp(n+1,vi(lent+1,0));
    int ans=0;
    rep(i,1,n)
    {
        rep(j,0,lent)
        {
            dp[i][j]=dp[i-1][j];
            //转换一下，相当于我只有吃完才能获得能量，但这个能量是属于我吃石头之前的状态
            if(j>=a[i].s) dp[i][j]=max(dp[i][j],dp[i-1][j-a[i].s]+a[i].e-(j-a[i].s)*a[i].l);
            ans=max(ans,dp[i][j]);
        }
    }
    cout<<"Case #"<<cn++<<": ";
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
