---
title: "SOS DP"
algorithms: []
sidebarOutline: true
---

# SOS DP

## SOS DP 入门（yxq版）

SOS DP 的本质是将 $N$ 个物品的集合视为一个 $N$ 维超立方体，求子集和/超集和本质上就是在这个高维空间做多维前缀和。

* **传统暴力枚举**：枚举所有状态的子集，时间复杂度为 $\mathcal O(3^N)$。
* **SOS DP 优化**：按维度（比特位）逐层转移，每一层只遍历 $2^N$ 个状态，共处理 $N$ 层。时间复杂度优化至 **$\mathcal O(N \cdot 2^N)$**，是解决集合与位运算高阶题目的利器。

设 $f$ 表示每一个点的值，$g$ 表示前缀和（子集和）的值。有：$g(S) = \sum_{T \subseteq S} f(T)$。

### 常用模板

#### 1. 子集和

求子集和：把子集贡献传递给超集。$g(S) = \sum_{T \subseteq S} f(T)$。
原理：

> 假设有 $N$ 个比特位，循环 $N$ 次。
> 在处理第 $i$ 个维度（第 $i$ 个比特位）时，如果当前状态 `s` 在第 $i$ 位是 $1$，那么它就需要把同维度下坐标为 $0$ 的那个点的值，累加到自己身上。
>
> 1. 第 $i$ 位是 $0$ 的状态：它的子集在这一位上也只能是 $0$，所以不需要从别人那里继承值。
> 2. 第 $i$ 位是 $1$ 的状态：它的子集在这一位上可以是 $1$，也可以是 $0$。它原本已经包含了第 $i$ 位是 $1$ 的所有情况，现在只需要加上所有其他位相同，但第 $i$ 位是 $0$ 的那个状态的值。
> 实现方式：`dp[s] += dp[s ^ (1 << i)]`

“如果当前位是 $1$，就加上当前位是 $0$ 的状态”（因为 $0$ 是 $1$ 的子集）。

```cpp
int mx = 1 << n;

for(int i = 0; i < n; i++) // 外层循环：枚举维度（即二进制的每一位）
    for(int s = 0; s < mx; s++) // 内层循环：顺序枚举所有状态
        if((s >> i) & 1) // 如果当前状态的第 i 位是 1
            dp[s] += dp[s ^ (1 << i)];
```

#### 2. 超集和

求超集和：把超集贡献传递给子集。$g(S) = \sum_{S \subseteq T} f(T)$。
“如果当前位是 $0$，就加上当前位是 $1$ 的状态”（因为 $1$ 是 $0$ 的超集）。

```cpp
int mx = 1 << n;

for(int i = 0; i < n; i++) // 外层循环：枚举维度（即二进制的每一位）
    for(int s = 0; s < mx; s++) // 内层循环：顺序枚举所有状态
        if(!((s >> i) & 1)) // 如果当前状态的第 i 位是 0
            dp[s] += dp[s ^ (1 << i)];
```

#### 3. 子集差分

已知子集和 $g$，求单个点的值 $f$。把加号变为减号即可 。

```cpp
for(int i = 0; i < n; i++)
    for(int s = 0; s < (1 << n); s++)
        if((s >> i) & 1) // if(s >> i & 1)
            dp[s] -= dp[s ^ (1 << i)];
```

#### 4. 超集差分

已知超集和 $g$，求单个点的值 $f$。

```cpp
for(int i = 0; i < n; i++)
    for(int s = 0; s < (1 << n); s++)
        if(!((s >> i) & 1)) // if(!(s >> i & 1))
            dp[s] -= dp[s ^ (1 << i)];
```

#### 总结

- **子集和/差分**：低位向高位转移。即 `0` 向 `1` 转移。(`if ((s >> i) & 1)` 去抓取 `0` 的值)。
- **超集和/差分**：高位向低位转移。即 `1` 向 `0` 转移。(`if (!((s >> i) & 1))` 去抓取 `1` 的值)。

练习：
1. [Problem - D - Codeforces](https://codeforces.com/contest/449/problem/D)
2. [AT_arc100_c [ARC100E] Or Plus Max - 洛谷](https://www.luogu.com.cn/problem/AT_arc100_c)
3. [Problem - 165E - Codeforces](https://codeforces.com/problemset/problem/165/E)
4. [P15255 [USACO26JAN2] Moo Hunt B - 洛谷](https://www.luogu.com.cn/problem/P15255)

## 模板题：

### 高维子集前缀和

[CF165E Compatible Numbers - 洛谷](https://www.luogu.com.cn/problem/CF165E)
大意：
思路：
Code:

```cpp
void solve() // ll 
{
    int n;cin>>n;
    int siz=1LL<<22;
    vi a(siz,INF),b(n+1,0);
    rep(i,1,n) 
    {
        cin>>b[i];
        a[b[i]]=b[i];
    }
    for(int k=21;k>=0;--k)
    {
        rep(i,0,siz-1) 
        {
            if((i>>k)&1) a[i]=min(a[i],a[i^(1LL<<k)]);
        }
    }
    rep(i,1,n) cout<<(a[b[i]^(siz-1)]==INF?-1:a[b[i]^(siz-1)])<<" \n"[i==n];
}
```

### 高维超集前缀和+高维差分

[CF449D Jzzhu and Numbers - 洛谷](https://www.luogu.com.cn/problem/CF449D)
大意：

思路：
其本质上 就是先找到 数量，求出方案，再减去 每一个维的其他前缀和
其实很像差分了，开做是 等于 X = 小于等于 X - 小于等于（X-1）

Code：

```cpp
void solve() // ll 
{
    int n;cin>>n;
    int siz=1LL<<20;
    vi f(siz,0);
    rep(i,1,n) 
    {
        int x;cin>>x;
        f[x]++;
    }
    for(int k=0;k<20;++k)
    {
        rep(i,0,siz-1) if(!((i>>k)&1)) (f[i]+=f[i^(1LL<<k)])%=mod;
    }
    rep(i,0,siz-1) f[i]=ksm(2,f[i],mod)-1,f[i]%=mod;
    rep(k,0,19)
    {
        rep(i,0,siz-1) if(!((i>>k)&1)) f[i]=Mod(f[i]-f[i^(1LL<<k)],mod);
    }
    cout<<f[0]<<endl;
}
```

### 高维公式转化：

[P15255 [USACO26JAN2] Moo Hunt B - 洛谷](https://www.luogu.com.cn/problem/P15255)
大意：
给定 n 和 m：
有 长度为 n 的01数组。
有 m 次跳转，每次跳转给出 三个位置，x ，y，z
如果这三个位置为 100 则该数组得分 + 1
如果你来构造这个01 数组，最多能得多少分，且有多少种不同的构造方法
n<20
m<2e5

思路：
原式
$$
\sum_i x_i(1-y_i)(1-z_i)
$$
因为 x 和 y ，z 的要求不同，我们高维前缀和的状态只能走相同的，比如 111 或者 000
那么我们该这么办呢？
考虑容斥转换：
原式变成：
$$
\begin{aligned}
&\sum_i \left(x_i-x_i y_i-x_i z_i+x_i y_i z_i\right)\\
&\qquad\longrightarrow \sum_i x_i-\sum_i x_i y_i-\sum_i x_i z_i+\sum_i x_i y_i z_i
\end{aligned}
$$
于是 就可以拆成 4个 满足不同条件，但是都是 要求都相同的 高为前缀和

Code:

```cpp
void solve() // ll 
{
    int n,m;cin>>n>>m;
    int siz=1LL<<n;
    vii f(siz,vi(4,0));
    while(m--)
    {
        int x,y,z;cin>>x>>y>>z;
        x--,y--,z--;
        x=1LL<<x,y=1LL<<y,z=1LL<<z;
        f[x][0]+=1,f[x+y][1]+=1,f[x+z][2]+=1,f[x+y+z][3]+=1;
    }
    for(int k=0;k<n;++k)
    {
        rep(op,0,3)
        {
            rep(i,0,siz-1) if((i>>k)&1) f[i][op]+=f[i^(1LL<<k)][op];
        }
    }
    int mx=0;
    vi g(siz,0);rep(i,0,siz-1) g[i]=f[i][0]-f[i][1]-f[i][2]+f[i][3],mx=max(g[i],mx);
    int cn=0;
    rep(i,0,siz-1) cn+=(g[i]==mx);
    cout<<mx<<" "<<cn<<endl;
}
```

### （进阶）高维前缀和

[1002 通行证（Easy Version）](https://acm.hdu.edu.cn/contest/problem?cid=1200&pid=1002)
大意：
(杭电钉耙春季四)
给定一个长度为 n + 2 的二维方阵 mp
其中 0 到 n + 1 行 以及 0 到 n+1 列
行列包含 0 或 n+ 1 的位置元素为 $10^{100}$
给出剩下元素的值。

其中 有q 次询问， 每次询问给出 card。
第 i 行，第 j 列的得分情况为：
1. 如果 $(mp_{i,j}\mathbin{\vert}\mathrm{card})\ne\mathrm{card}$，则这个位置是坏蛋位置，得分为 0
2. 否则就是 沿着 上下左右四个方向上，离自己最近的坏蛋位置的距离
每次询问回答这个方阵的得分总和为多少？

$$
n<300
$$

$$
mp_{i,j}<2^{15}
$$

$$
\mathrm{card}<10^9
$$

思路：
我们理解 对于一个点的得分来说：
如果得分为 2，则距离自己小于等于 1 的那 5个点的 或值为 v1，小于等于 2 的则为 v2
则 card 必须是 v1 的超集，且 card 是 v2 的子集

所以我们枚举每一个点，和对应的距离。$O(n^3)$
边界因为很大，所以一定是 坏蛋，所以其对应的 超集贡献相当于 0 ，直接跳过
然后统计 $mp_{i,j}$等于 card 的总得分，因为 或运算，所以做 高维子集前缀和就好了

因为 $\mathrm{card}<10^9$，和 $2^{15}$ 取模之后可以直接 $O(1)$ 算出答案

Code:

```cpp
int tx[4]={0,1,0,-1},ty[4]={1,0,-1,0};
const int M=(1LL<<15);
void solve() // ll 
{
    int n,m;cin>>n>>m;
    int siz=1LL<<(15);
    vii mp(n+2,vi(n+2,M));
    vi f(siz+1,0);
    rep(i,1,n) 
    {
        rep(j,1,n) cin>>mp[i][j];
    }
    rep(i,1,n)
    {
        rep(j,1,n)
        {
            int t=mp[i][j];
            pii v[4]={{i,j},{i,j},{i,j},{i,j}};
            rep(d,0,n)
            {
                if(t>=siz) break;
                f[t]+=1;
                rep(k,0,3)
                {
                    v[k].first+=tx[k],v[k].second+=ty[k];
                    t|=mp[v[k].first][v[k].second];
                }
            }
        }
    }
    for(int k=0;k<15;++k)
    {
        rep(i,0,siz-1) 
        {
            if(((i>>k)&1)) f[i]+=f[i^(1LL<<k)];
        }
    }
    while(m--)
    {
        int x;cin>>x;
        x%=siz;
        cout<<f[x]<<endl;
    }
}
```
