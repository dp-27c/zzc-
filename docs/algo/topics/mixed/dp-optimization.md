---
title: DP 优化
sidebarOutline: true
---

# DP 优化

## 单调子序列问题

这是求最长 严格单调递增 问题的 $O(n\log n)$ 优化。
实际上就是贪心的求出 非严格单调递减子序列 的 最小划分。

```cpp
void solve() // ll
{
    int n;cin>>n;
    vi a(n+1,0),idx(n+1,INF);
    rep(i,1,n) cin>>a[i];
    rep(i,1,n) *lower_bound(idx.begin(),idx.end(),a[i])=a[i];
    cout<<(lower_bound(idx.begin(),idx.end(),INF)-idx.begin())<<endl;
}
```


### 总结：

对于 最小划分数 ，有：
最后的个数(cnt)都是 `lower_bound`
非严格递减子序列： `lower_bound`  转移。
严格递减子序列：`upper_bound` 转移。

非严格上升子序列：所有数取相反数后，`lower_bound` 转移。
严格上升子序列：所有数取相反数后，`upper_bound` 转移。

放入的位置可以理解为，以`a[i]`为结尾的最长合法序列，位置为其长度。

## 斜率优化（队列）

对已有的代码进行优化
[任务安排2](https://www.acwing.com/problem/content/303/)
对 下面代码中//注释的区域做斜率优化
这次优化因为考虑到斜率k变化的严格上升，因此采用单调队列维护

```cpp
int q[N],hh=0,tt=0;
void solve() // ll !
{
    int n,s;cin>>n>>s;
    vi t(n+1,0),c(n+1,0);
    rep(i,1,n)
    {
        cin>>t[i]>>c[i];
        t[i]+=t[i-1],c[i]+=c[i-1];
    }
    vi p,f(n+1,0);
    rep(i,1,n)
    {
        while(hh<tt&&f[q[hh+1]]-f[q[hh]]<=(t[i]+s)*(c[q[hh+1]]-c[q[hh]])) ++hh;
        f[i]=f[q[hh]]+s*(c[n]-c[q[hh]])+(c[i]-c[q[hh]])*t[i];
        while(hh<tt&&(f[q[tt]]-f[q[tt-1]])*(c[i]-c[q[tt]])>=(f[i]-f[q[tt]])*(c[q[tt]]-c[q[tt-1]])) --tt;
        q[++tt]=i;
    }
    cout<<f[n]<<endl;
}
```


## 子序列

## 背包

### 多重背包的二进制优化：


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



### 多重背包的单调队列优化：

记住这里是越远离自己的加权越大。

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


### 背包一维空间优化：

滚动数组，不需要代码。

### 树上背包板：


```cpp
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
```


### 容斥原理优化背包：

#### 求交集合并

题目：[P1450 [HAOI2008] 硬币购物 - 洛谷](https://www.luogu.com.cn/problem/P1450)
大意：

![硬币购物的例题题意](../../../assets/note-images/Pasted%20image%2020250817143653.png){width=1452 height=259}

![硬币购物的输入输出说明](../../../assets/note-images/Pasted%20image%2020250817143718.png){width=1109 height=89}

如果我们用多重背包去做
就算用了复杂的单调队列优化 $O(4sn)$ 4e8的时间很容易爆炸
思路：
如何做呢？考虑到硬币种类少，且n的数量超过一千的情况，且s的范围小于 1e5
我们先考虑数量无穷的情况下，做完全背包得到 `f[i]` 获得价值为 i 的方案总数
然后每次取买东西，单独计算不合法的情况，即减去选择第 $i$ 种物品的数量 $>d_i$ 的所有方案总数：
这个时候就要用到容斥原理了。
注意，假如第 $i$ 种硬币数量超过限制，容斥时就要减去 $f_{i-c_i\cdot(d_i+1)}$（因为是完全背包，所以包含了所有 $d_{i+2},d_{i+3},\ldots$）。
其他种的硬币不合法叠加到 $c_i\cdot(d_i+1)$ 上就好了
模版看容斥，这里仅仅提供思路。

## 状压dp：

## 二维状压dp：

[炮兵](https://www.acwing.com/problem/content/294/)

![炮兵阵地题的网格和放置限制](../../../assets/note-images/Pasted%20image%2020250725202316.png){width=1551 height=1104}

其实是三维，还有一维 i 作为第几行可以用滚动数组优化掉

本题的主要理解在于  为什么不能开一维的空间，判断前面两行和现在这行是否兼容
取`max(f[i-2][k2]+cnt[j]+cnt[k1])`?
为什么上个方法不行，因为你只考虑了i，i-1，i-2，的兼容性，但却没考虑到 i-1 和他上面的兼容性
所以要开二维dp

## 区间dp：

### 区间dp+平行四边形法则：


```cpp
int n, a[minn], dp[3007][3007],p[3007][3007];
void solve()
{
    cin >> n;
    for (int i = 1; i <= n; ++i) cin >> a[i],a[i]+=a[i-1];
    for (int len = 1; len <= n; ++len)
    {
        for (int l = 1, r; (r = l + len - 1) <= n; ++l)
        {
            if (l == r) { p[l][r] = l; continue; }
            dp[l][r] = INF;
            int sum = a[r] - a[l - 1];
            for (int k = p[l][r - 1]; k <= p[l + 1][r]; ++k)
            {
                if (dp[l][r] > dp[l][k] + dp[k + 1][r] + sum)
                {
                    dp[l][r] = dp[l][k] + dp[k + 1][r] + sum;
                    p[l][r] = k;
                }
            }
        }
    }
    cout << dp[1][n] << '\n';
}
```


## 树型dp：

### 基环树：

我们先来解释一下基环树，为什么这个基环树要断环
类似于热狗分析法，即环上相邻两点，一定不选这个点的所有情况的最优解和一定不选另一个与他相邻点的所有方案最优解

```cpp
	 rep(i,1,n)
    {
        int u,v;
        cin>>u>>v;
        u++,v++;
        if(findd(u)==findd(v)){s=u,t=v;continue;}
        add(u,v),add(v,u);
        father[findd(v)]=findd(u);
    }
```

这一串代码就是并查集找环，比深搜找环更快，因为此题是只有一个基环树，所以continue了，但是对于，基环树森林，每次找到环都要保存环节点，后面在一步步对每个基环树做基环dp

这串是朴素找环

```cpp
    function<void(int,int,int)> find=[&](int u,int fa,int rt)
    {
        vis[u]=1;
        for(auto v:mp[u])
        {
            if(v==rt){r1=u,r2=rt;return;}
            if(v==fa) continue;
            find(v,u,rt);
        }
    };
```

就是对于断环后点的dfs：

```cpp
    vii f(n+1,vi(2,0));
    function<int(int,int,int)> dfs=[&](int u,int fa,int rt) -> int
    {
        f[u][0]=0,f[u][1]=a[u];
        vis[u]=1;
        for(auto v:mp[u])
        {
            if(v==fa) continue;
            if(v==rt) continue;
            dfs(v,u,rt);
            f[u][0]+=max(f[v][0],f[v][1]);
            f[u][1]+=max(0LL,f[v][0]);
        }
        return f[u][0];
    };
```


## 降维dp

[# P2224 [HNOI2001] 产品加工](https://www.luogu.com.cn/problem/P2224)
题意：
给定两台机器，和n个任务，每个任务都有3种工作时间
1. 给A机器做的时间`t[0]`，给B机器的时间`t[1]`，两个机器同时工作的时间`t[2]`
2. 如何分配任务才能保证完成所有任务的时间最短
这题乍一看以为是一道状态机，但是做完后才发现状态机是做不了的
用背包的思想来看：
bool  `f[id][i][j]` 表示 考虑前id个任务，A机器的耗时 i 时间，B机器耗时 j 时间，是否存在
如果这样设置的话，那么就要三层循环，显然是会超时的
那么如何优化呢，首先我们可以知道，在A机器耗时的时间确定的情况下，我们要尽量使得，B的耗时最小，因为最后是求`所有方案 max(A耗时，B耗时)的最小值` ，所以我们将这个二维背包转换成一个一维背包，即`f[i][j]` 考虑前 i 个任务,A机器耗时 j 时间下,B机器耗时最短的时间；
超容怎么办，滚动数组就好了

```cpp
void solve() // ll !
{
    int n;cin>>n;
    vii dp(2,vi(3e4+7,INF));
    dp[0][0]=0;
    rep(i,1,n)
    {
        int t[3];
        cin>>t[0]>>t[1]>>t[2];
        int x1=INF,x2=INF,x3=INF;
        rep(j,0,3e4)
        {
            if(t[1]) x1=dp[(i-1)&1][j]+t[1];
            if(j>=t[0]&&t[0]) x2=dp[(i-1)&1][j-t[0]];
            if(j>=t[2]&&t[2]) x3=dp[(i-1)&1][j-t[2]]+t[2];
            dp[i&1][j]=min(x1,min(x2,x3));
        }

    }
    int ans=INF;
    rep(j,0,3e4)
    {
        ans=min(ans,max(dp[n&1][j],j));
    }
    cout<<ans<<endl;
}
```
