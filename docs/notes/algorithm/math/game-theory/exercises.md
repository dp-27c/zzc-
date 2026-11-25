---
title: "博弈刷题"
algorithms: []
sidebarOutline: true
---

# 博弈刷题


## 对抗nim + 分类 + 组合计数

[1001 博弈](https://acm.hdu.edu.cn/contest/problem?cid=1172&pid=1001)
杭电暑期多校的一道银牌+

大意：
给定 n 个房间，第 i 个房间有 $K_i$ 堆石子，每堆石子也给出。
规则：两个人轮流拿，有一个排列，使得每次只能按照排列拿，只有前面房间的石子全部拿完的情况下，才能开始下一轮房间的拿石子，并且谁拿根据上一轮不是谁拿。
问有多少种排列使得 先手必胜。

思路：
根据 anti - nim 博弈。把每个房间的石头分成 4 种类型。
1. 所有堆的石头都是 1，且为奇数堆，数量记录在 `cnt1` 中
2. 所有堆的石头都是 1，且为偶数堆，数量记录在 `cnt0` 中
3. 存在 大于1 的石头堆，且每堆异或和大于0，数量记录在 `cn1` 中
4. 存在 大于1 的石头堆，且每堆异或和等于0，数量记录在 `cn0` 中

如果开头为 cn1 的话，那么先手就可以占据主导权，最后一堆的先手和后手都可以有 先手决定，因此先手必胜。
如果开头为 cn0 的话，那么后手就可以占据主导权，最后一堆的先手和后手都可以有 后手决定，因此先手必输。
如果是 cnt1 的话，相当与先后手的角色交换，此时题目要求变成后手必胜，所以要想原来的先手必胜，前面必须得是偶数个 cnt1 才行。
对于 cnt0 ，因为不改变先后手的顺序，可以看成是无关变量，可以先排除，最后插入计算组合就好了


Code：
```cpp
LL inv[N],fac[N],ifac[N];
void init_inv(int n,int M)
{
    inv[1]=1;
    ifac[0]=1;fac[0]=1;
    for(int i=1;i<=n;++i)
    {
        if(i==1) inv[i]=1;
        else inv[i]=(M-(M/i)*inv[M%i]%M)%M;
        fac[i]=i*fac[i-1]%M;
        ifac[i]=inv[i]*ifac[i-1]%M;
    }
}
LL C(int a,int b,LL M)
{
    if(b>a) return 0;
    return fac[a]*ifac[b]%M*ifac[a-b]%M;
}
void solve() // ll
{
    int n;cin>>n;
    int cn0=0,cn1=0,cnt1=0,cnt0=0;
    rep(i,1,n)
    {
        int k;cin>>k;
        int s=0,cn=0;
        rep(j,1,k)
        {
            int x;cin>>x;
            s^=x;cn+=(x==1);
        }
        if(cn==k&&(k&1)) cnt1++;
        else if(cn==k&&(k%2==0)) cnt0++;
        else if(s) cn1++;
        else cn0++;
    }
    if(cn0==0&&cn1==0)
    {
        if(cnt1%2==0)
        {
            cout<<0<<endl;
        }
        else cout<<fac[n]<<endl;
        return ;
    }
    n-=cnt0;
    int tool=fac[n];
    int zt0=(fac[n+cnt0]*ifac[n])%mod;
    int ans=((tool)%mod+mod)%mod;
    rep(i,0,cnt1)
    {
        if(i&1)
        {
            ans=((ans-fac[i]*C(cnt1,i,mod)%mod*cn1%mod*fac[n-i-1]%mod)%mod+mod)%mod;
        }
        else ans=((ans-fac[i]*C(cnt1,i,mod)%mod*cn0%mod*fac[n-i-1]%mod)%mod+mod)%mod;
    }
    ans=(ans*zt0)%mod;
    cout<<ans<<endl;
}
```


## SG 函数 + SG 定理

[P3185 [HNOI2007] 分裂游戏 - 洛谷](https://www.luogu.com.cn/problem/P3185)
luogu 紫 
大意：
给你 n 个糖果瓶。
每次操作 选择三个整数 i j k，满足 i < j <= k.
表示为 从第 i 个瓶子里 取出 一个糖果，分裂成两个糖果后分别放入 第 j 个 和 第 k 个糖果瓶。
两个人轮流操作，最后无法操作的人输，问：
是否先手必胜，如果先手必胜，第一步有多少种取法，并输出字典树最小的取法。

i < n, n < 21 , $a_i < 1e4$
 
思路：
我们从简单的思考一下，将 第 i 个瓶子里取出一个糖果往后放 一 个。
那么就相当于 $sg(i)=mex\{ sg(j)| i<j<=n \}$

如果分裂成两堆，我们可以看成 分成两个独立的ICG 游戏，那么 sg 函数就变成了$sg(i)=mex\{ sg(j)\oplus sg(k)|i<j<=k<=n\}$

那么对于一个瓶子的多个糖果，都可以是独立的，且他们的sg函数都一样，因此只要对他们的奇偶性判断，奇数算入 s 的贡献中就好了。

因为体面给的范围比较小，所以直接暴力求出有多少种就好了。
Code:
```cpp
vi f(30,0),vis(N,0);
void init()
{
    f[0]=0;
    rep(i,1,21)
    {
        rep(j,0,i-1)
        {
            rep(k,0,j)
            {
                vis[f[j]^f[k]]=i;
                for(f[i]=0;vis[f[i]]==i;f[i]++);
            }
        }
    }
}
void solve() // ll
{
    int n;cin>>n;
    vi a(n+1,0);
    int s=0;
    for(int i=n-1;i>=0;--i)
    {
        cin>>a[i];
        if(a[i]&1) s^=f[i];
    }
    if(s==0) 
    {
        cout<<"-1 -1 -1\n0\n";return;
    }
    int cnt=0,ani=-1,anj=-1,ank=-1;
    for(int i=n-1;i>=1;--i)
    {
        for(int j=i-1;j>=0;--j)
        {
            for(int k=j;k>=0;--k)
            {
                if((s^f[i]^f[j]^f[k])==0) 
                {
                    cnt++;
                    if(ani==-1) ani=i,anj=j,ank=k;
                }
            }
        }
    }
    cout<<n-ani-1<<" "<<n-anj-1<<" "<<n-ank-1<<endl;
    cout<<cnt<<endl;
}
```


## SG 定理 + SG 函数

[1006 支配游戏](https://acm.hdu.edu.cn/contest/problem?cid=1176&pid=1006)

大意：
给定 n 个图连通块，每个连通快要么是 一条长链 或者是 一个简单环。
给出第 i 个连通块的 节点个数。初始时，所有节点都是未染色状态。
两名玩家轮流进行操作：
选择一个节点，确保存在一个未被染色的节点与这个点进行连通，然后将这个节点以及与这个节点联通的所有节点都染色。
最后无法操作的人输。
问：是否存在策略先手必胜？

思路：
很明显，对于不同连通块，我们根据 SG 定理做 异或和操作。
对于每个不同的 子 ICG 问题思考如下：

1. 如果是 链，我们选择链上的一个节点染色，到达的状态有 {染第1个，染第2个，染第3个，……}，如果染色前2个，则会形成一个一端已经被染色的一条长链。
如果我们把一端已经染色的长链看成是一个这个状态下的 子 ICG 问题，那么我们尝试先解决它，然后进行异或操作。
已经染色一端的长度为 n 链的sg 函数为 $f(n)=mex\{f(n-1),f(n-2),f(n-3)\oplus f(0),f(n-4)\oplus f(1)，…… \}$ ，发现规律正好符合 取 3 个石子以内的 巴什博弈，即sg函数为对 4 取模
由此，我们就可以枚举策略得到总的 sg 函数 $sg(n)=\{f(n-2),f(n-3)\oplus f(0),……\}$ ，因为 f 函数有周期性，所以取前 5 个数求 mex 就好了。

2. 如果是一个环，那就更好求了，因为无论开始先染那个，都会变成 $sg(n)=mex\{f(n-3)\}$ ,结果也显而易见，要么是 1 要么 是 0.

最后每个连通块的 sg 函数进行 异或和，大于0 则存在必胜策略，等于 0 则不存在必胜的策略。
Code:
```cpp
void solve() // ll
{
    int n;cin>>n;
    vi vis(100,0);
    int s=0;
    rep(i,1,n)
    {
        int num,op;cin>>num>>op;
        if(op==1) 
        {
            vis[(num-2)%4]=i;
            rep(j,0,3)
            {
                if(num-3-j<0)break;
                vis[j^((num-3-j)%4)]=i;
            }
            int x=0;
            for(x=0;vis[x]==i;++x);
            s^=x;
        }
        else
        {
            s^=((num-3)%4==0?1:0);
        }
    }
    // cout<<s<<endl;
    cout<<(s?"Yes\n":"No\n");
}
```
