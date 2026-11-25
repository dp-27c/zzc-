---
title: "公式推理+分解质因数"
algorithms: []
sidebarOutline: true
---

# 公式推理+分解质因数

## [1294. 樱花](https://www.acwing.com/problem/content/1296/)

大意：

$\displaystyle\large\frac{1}{x}+\displaystyle\frac{1}{y}=\displaystyle\frac{1}{n!}$

求出满足上面条件的正整数对`{x,y}`的数量

x  和 y 一定 大于 n！ ，因为要满足他们的倒数和等于 n！ 的倒数

所以我们令 $\rm y =  n！+ k$：

然后消分母等于  $\large\longrightarrow$ $n!*(n!+k)+x*n!=x*(n!+k)$

展开并且后 $\large\longrightarrow$ $(n!)^2+k*n!=k*x$

由此我们得到 $\large\longrightarrow$ $\displaystyle\frac{(n!)^2}{k}+n!=x$

为了满足 x 为正整数，所以 k 必须是$(n!)^2$的约数

问题也变转换成了有多少个不同的k，即 $(n!)^2$ 有多少个约数

**接下来就是分解阶乘的质因数，然后每个权的指数乘上2，计算数量就可以得出解了**

```cpp
vi vis(N,0),pri;
void init()
{
    vis[1]=1;
    rep(i,2,N-1)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
        }
        rep(j,0,pri.size()-1)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=pri[j];
            if(vis[i]<=pri[j]) break;
        }
    }
}
void solve() // ll !
{
    int n;cin>>n;
    vi p(N,0);
    rep(i,2,n)
    {
        int x=i;
        while(vis[x]!=x)
        {
            p[vis[x]]++;
            x/=vis[x];
        }
        p[vis[x]]++;
    }
    int cnt=1;
    for(auto &x:pri)
    {
        if(p[x]==0) break;
        cnt=(cnt*(2*p[x]+1))%mod;
    }
    cout<<cnt<<endl;
}
```
