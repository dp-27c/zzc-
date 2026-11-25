---
title: "多重背包问题II（二进制+多重背包）"
algorithms: []
sidebarOutline: true
---

# 多重背包问题II（二进制+多重背包）

$$
O(mn\log s)
$$

[多重背包2](https://www.acwing.com/problem/content/description/5/)

```cpp
void solve()// ll !
{
    int n,m;cin>>n>>m;
    vi a,c;a.push_back(0),c.push_back(0);
    // 将s[i]的物品数组合看成 一个二进制数
    // 10 -> 1 2 4 3 拆成 这样的4个物品，然后当成01背包做
    rep(i,1,n)
    {
        int v,w,s;
        cin>>v>>w>>s;
        int p=v,q=w,cur=s,cn=0;
        while(s/2)
        {
            a.push_back(p),c.push_back(q);
            p<<=1,q<<=1;s>>=1;cn++;
        }
        int cnt=cur-(1<<cn)+1;//补齐
        a.push_back(v*cnt),c.push_back(w*cnt);
    }
    //上面是拆成新的背包的过程，下面01模版;
    n=a.size()-1;
    vi dp(m+1,0);
    rep(i,1,n)
    {
        for(int j=m;j>=a[i];--j)
        {
            dp[j]=max(dp[j],dp[j-a[i]]+c[i]);
        }
    }
    cout<<dp[m]<<endl;

}
```
