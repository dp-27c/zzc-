---
title: "区间dp"
algorithms: []
sidebarOutline: true
---

# 区间dp

## 二叉树的区间dp（dfs，记忆化，区间dp）

[加分二叉树](https://www.acwing.com/problem/content/481/)
主要练习如何把一个二叉树的中序遍历看成是一个区间dp的问题；
题意：
> 一个n个节点，第`i`个节点的分数为`a[i]`，且满足中序遍历 123456...n
> 对于一个根节点的分数=左子树的分数 * 右子树的分数 + 根节点自己的分数
> 若一个根节点不是叶子节点且有一边子树为空，那么空子树分数按1来算
> 求可以形成的最大分数，且输出满足这个条件的树的前序遍历，且满足字典序最小

```cpp
void solve() // ll !
{
    int n;cin>>n;
    vi a(n+2);
    rep(i,1,n) cin>>a[i];
    vii dp(n+2,vi(n+2,1));
    vii p(n+2,vi(n+2,0));
    //p保存最优根节点的位置；
    rep(len,1,n)
    {
        for(int l=1,r=1;r<n;++l)
        {
            r=l+len-1;
            if(l==r){dp[l][r]=a[l],p[l][r]=l;continue;}
            rep(k,l,r)
            {
                int w;
                if(k-1<l) w=dp[k+1][r]+a[k];
                else if(k+1>r) w=dp[l][k-1]+a[k];
                else w=dp[l][k-1]*dp[k+1][r]+a[k];
                if(w>dp[l][r])
                {
                    dp[l][r]=w;
                    p[l][r]=k;
                }
            }
        }
    }
    cout<<dp[1][n]<<endl;
    vi ans;
    //dfs为找到前序遍历；
    function<void(int,int)> dfs=[&](int l,int r)
    {
        if(l>r) return;
        ans.push_back(p[l][r]);
        dfs(l,p[l][r]-1);
        dfs(p[l][r]+1,r);
    };
    dfs(1,n);
    rep(i,0,ans.size()-1) cout<<ans[i]<<" \n"[i==ans.size()-1];
}
signed main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int t_ = 1;
    //cin>>t_;
    while (t_--)
    {
        solve();
    }
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```

## 高精度区间dp

[凸多边形的划分](https://www.acwing.com/problem/content/1071/)
题意：
> 给定一个具有 N个顶点的凸多边形，将顶点从 1至 𝑁标号，每个顶点的权值都是一个正整数。将这个凸多边形划分成 N−2个互不相交的三角形，对于每个三角形，其三个顶点的权值相乘都可得到一个权值乘积，试求所有三角形的顶点权值乘积之和至少为多少。

***你再用高精度来ex我 我就  dkjahsgkjfdhaskjfdjasgfdKSDJgsaudhkoasdhgsafhdhjfoKFGHUIJSDFIusg 懂吗？***
***自己的提交结果在提交记录里面，我直接copy去了，谁爱写谁写高精度；***

当然还有一个需要注意点，本题看似是环形区间dp，但是实际上可以线性区间dp
因为对于任何最终解来说，第一个点和第N个点最后都是连接的
即因为在任何完整方案中，边 1-n 一定会被包含在一个三角形中

## 二维区间dp

[棋盘分割](https://www.acwing.com/problem/content/323/)
