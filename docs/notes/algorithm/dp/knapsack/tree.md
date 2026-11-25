---
title: "树上背包（有依赖的背包）"
algorithms: []
sidebarOutline: true
---

# 树上背包（有依赖的背包）

[有依赖的背包](https://www.acwing.com/problem/content/10/)

$$
O(nm^2)
$$

题目：
> 有n个物品，有着对应的价值和体积。
> 物品关系组成一个树，装这个物品必须满足它的父亲节点已经装入背包
> 求m容量的包的最大可装价值

思路：
dfs，状态`dp[i][j]` 表示以i为根的子树，容量为j的最大价值。
对每一个子节点，把它的0~m的容量状态看成相当是 m 个不同的物品(比如：`dp[v][k]`表示体积为k，价值为`dp[v][k]` 的物品)，相当于套了个01背包；（分组背包思维，看代码注释）

```cpp
void solve()// ll !
{
    int n,m;cin>>n>>m;
    mp.resize(n+1);
    vi v(n+1),w(n+1);
    int st=0;
    rep(i,1,n)
    {
        int u;
        cin>>v[i]>>w[i]>>u;
        if(u>0) add(u,i);
        else st=i;
    }
    //上面是构造，下面是dp过程
    vii dp(n+1,vi(m+1,0));
    function<void(int)> dfs=[&](int u)
    {
        if(mp[u].size())
        {
            rep(i,0,mp[u].size()-1)
            {
                int vt=mp[u][i];
                dfs(vt);
                //下面两个循环倒着遍历：保证不是完全背包，保证dp[u][j-k]是属于上一个状态的，参考一维的01背包
                for(int j=m-v[u];j>=0;--j)//对于以u为根的子树,容量为m背包进行讨论
                {
                    for(int k=j;k>=0;--k)//关键步骤！！
                    {
                        //考虑给vt子树的k容量，把每个子树分成m+1份，选择其中一份
                        //参考到分组背包的做法
                        dp[u][j]=max(dp[u][j],dp[u][j-k]+dp[vt][k]);
                    }
                }
            }
        }
        //维护必须要拿u物品的规则
        for(int j=m;j>=v[u];--j) dp[u][j]=dp[u][j-v[u]]+w[u];
        rep(j,0,v[u]-1) dp[u][j]=0;
    };
    dfs(st);
    cout<<dp[st][m]<<endl;
}
```
