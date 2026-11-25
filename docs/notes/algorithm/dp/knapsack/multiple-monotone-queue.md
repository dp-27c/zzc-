---
title: "多重背包问题III（单调队列+多重背包）"
algorithms: []
sidebarOutline: true
---

# 多重背包问题III（单调队列+多重背包）

时间复杂度：O(nm)
[多重背包](https://www.acwing.com/activity/content/problem/content/1274/)

待补图片（Pasted image 20250720213343.png）

```cpp
int q[N];//单调队列 注：要开大一点
int f[N],g[N];//这是滚动数组，f[j]表示dp[i][j],g[j]表示dp[i-1][j];
void solve()// int !
{
    int n,m;cin>>n>>m;
    rep(i,1,n)
    {
        int v,w,s;// 第i个物品的体积，价值，可用数量
        cin>>v>>w>>s;
        memcpy(g,f,sizeof f);//保存，维护dp[i-1]
        rep(j,0,v-1) //(j%v 的取值们，？为什么从0开始,f[0]+权值 表示全部装一个物品的策略)
        {
            int hh=0,tt=-1;
            for(int k=j;k<=m;k+=v)
            {
                //去掉超出 s 的数据
                if(hh<=tt&&k-s*v>q[hh]) ++hh;
                //越是远离原点，比较条件时就要减掉越大的权值来保证比较的公平性
                while(hh<=tt&&g[k]-(k)/v*w>=g[q[tt]]-(q[tt])/v*w) --tt;
                q[++tt]=k;//将dp[i-1][j]塞入单调队列中
                if(g[q[hh]]+(k-q[hh])/v*w>f[k]) f[k]=g[q[hh]]+(k-q[hh])/v*w;//取最大
            }
        }
    }
    cout<<f[m]<<endl;
}
```
