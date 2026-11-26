---
title: "容斥原理：（3）"
algorithms: []
sidebarOutline: true
---

# 容斥原理：（3）

## 证明：


![容斥原理证明示意](../../../../assets/note-images/Pasted%20image%2020250817114418.png){width=2270 height=838}


简单点就是 集合的并等于集合的交的交错和（奇正偶负）
可以看图理解
我之前都不知道这玩意，然后做出了这玩意的题，虽然想了很久
**我难道真是天才？**
板子：
```cpp
LL calc(LL s,int m)//容斥原理
{
    LL res=0;
    for(int i=1;i<(1<<m);++i)//转二进制
    {
        LL t=0,sign=-1;
        for(int j=0;j<m;++j)
        {
            if(i&(1<<j))
            {
                //t= …… 这是状态转移，对于并集的状态
                sign=-sign;
            }
        }
        // res的处理
    }
    return res;
}
```

## 模版题：

[C. Count Good Numbers]([Problem - C - Codeforces](https://codeforces.com/contest/2125/problem/C))
大意：
给定 范围  l ~ r 求出范围内质因子至少是两位数的数的个数
思路：
对 n 求 1 ~ n 的符合条件的数
即 n 减去 不符合条件的。
 减去 2 3 5 7的倍数。
 用容斥原理算出来就好了
```cpp
int answer(int l)
{
    return (l-l/2-l/3-l/5-l/7+l/(2*3)+l/(2*5)+l/(3*5)+l/(2*7)+l/(3*7)+l/(5*7)-l/(2*3*5)-l/(2*3*7)-l/(2*5*7)-l/(3*5*7)+l/(2*3*5*7));
}//l/(2*3*5),
void solve() // ll !
{
    int l,r;cin>>l>>r;
    if(r<=l){ cout<<0<<endl;return;}
    int cnr=answer(r),cnl=answer(l-1);
    cout<<cnr-cnl<<endl;
}
```

## 容斥原理优化：

对于上题，如果我们选择的质数是4个或者16个，该如何一步步计算呢？
这里优化可以采用**二进制优化**
这样也更方便我们计算时间复杂度 $O(m*2^m)$


![用二进制枚举优化容斥计数](../../../../assets/note-images/Pasted%20image%2020250817120606.png){width=1148 height=427}


## 容斥原理求交：


图示证明：


![用容斥原理计算集合交集](../../../../assets/note-images/Pasted%20image%2020250817121543.png){width=1051 height=1135}


### 背包+容斥原理

题目：[P1450 [HAOI2008] 硬币购物 - 洛谷](https://www.luogu.com.cn/problem/P1450)^
大意：

![硬币购物的例题题意](../../../../assets/note-images/Pasted%20image%2020250817143653.png){width=1452 height=259}


![硬币购物的输入输出说明](../../../../assets/note-images/Pasted%20image%2020250817143718.png){width=1109 height=89}

如果我们用多重背包去做
就算用了复杂的单调队列优化 $O(4sn)$ 4e8的时间很容易爆炸
思路：
如何做呢？考虑到硬币种类少，且n的数量超过一千的情况，且s的范围小于 1e5
我们先考虑数量无穷的情况下，做完全背包得到 `f[i]` 获得价值为 i 的方案总数
然后每次取买东西，单独计算不合法的情况，即减去 $选择i物品的数量>d_i$的所有方案总数：
这个时候就要用到容斥原理了。
注意;我们在做容斥原理中，假如第 i 种 硬币超过，那就要减去 $\huge f_{i-c_{i}*(d_{i}+1)}$ （因为是完全背包，所以包含了所有（$d_{i+2},d_{i+3}……$）。
其他种的硬币不合法叠加到 $c_{i}*(d_{i}+1)$上就好了
```cpp
void solve() // ll !
{
    int c[4],d[4],s,n;cin>>c[0]>>c[1]>>c[2]>>c[3]>>n;
    vi f(1e5+7,0);
    f[0]=1;
    rep(i,0,3)
    {
        rep(j,c[i],1e5)
        {
            f[j]+=f[j-c[i]];
        }
    }
    rep(i,1,n)
    {
        cin>>d[0]>>d[1]>>d[2]>>d[3]>>s;
        LL res=0;
        for(int i=1;i<(1<<4);++i)
        {
            LL t=0,sign=-1;
            for(int j=0;j<4;++j)
            {
                if(i&(1<<j))
                {
                    t+=c[j]*(d[j]+1);
                    //t= …… 这是状态转移，对于并集的状态
                    sign=-sign;
                }
            }
            if(s>=t) res+=sign*f[s-t];
            // res的处理
        }
        cout<<f[s]-res<<endl;
    }

}
```

### 容斥原理+隔板+状态合并


[214. Devu和鲜花 - AcWing题库](https://www.acwing.com/problem/content/description/216/)
题意略。
可以看成是 m 个 花分成 n 份，存在取 0 的情况。
先看成是 有无限个花,分成m份，按照隔板法算总分法 $\huge C_{m+n-1}^{n-1}$
因为每朵花都有其个数的限制 $a_i$  所以 我们要减去 存在多余的方案即：$C_{n-1}^{m+n-1}-|s_1\cup s_2\cup s_3,……|$
用 $0 -> 1<<(n)-1$  的遍历表示每种花的多选的可能性，参考上一题的做法，只不过把从背包中选改成从隔板原理里面选
```cpp
int tool;
void solve() // ll !
{
    int n,m;cin>>n>>m;
    int ans=0;
    int r=(1LL<<n)-1;
    vi a(n,0);
    rep(i,0,n-1) cin>>a[i];
    tool = 1;
    rep(i,1,n-1) tool=(tool*i)%mod;
    tool=ksm(tool,mod-2,mod);
    rep(i,0,r)
    {
        int t=0,cn=1;
        rep(j,0,n-1)
        {
            if((i>>j)&1) cn*=-1,t+=a[j]+1;
        }
        if(t>m+n-1) continue;
        int x=(cn*C(m+n-1-t,n-1,mod));
        Mod(x,mod);
        ans=((ans+x)%mod+mod)%mod;
    }
    cout<<ans<<endl;
}
```


### 容斥原理 + 莫比乌斯函数 + 二维数论分块

[215. 破译密码 - AcWing题库](https://www.acwing.com/problem/content/217/)

大意：
对于给定的整数 a ,b 和 d，有多少正整数对 x,y，满足 x≤a，y≤b，并且 gcd( x ,y)=d。
1≤n≤50000,
1≤d≤a,b≤50000
思路：
首先就是 a=a / d ,b=b / d.隐射嘛
然后就是对这样的  a  和  b  求范围内的互质的数对。

与其求互质的数对，不如求所有不互质的数对，即含有共同的质因子
利用容斥原理：
$\Large a*b-(a/2)*(b/2)-(a/3)*(b/3)……+(a/6)*(b/6)……$
但是这样的话，每次访问的过程就是$O(n)$的时间复杂度，加上50000 次访问，会爆炸。

考虑优化：
如何优化，我们发现在 a/x 时 和 a / (x +1) 时有时候会相等，对于 a中 $\large \sum a/i$  中， 不同的值大概只有 $\large 2\sqrt{a}$  个，所以我们每次计算将这些相同值的数合起来，就会大大降低我们的时间复杂度。
这就要考虑到 一个函数 $g(x)$ ，设它就是 $\large a/x==a/(g(x))$  根据数学推导： g ( x ) = =  a / ( a/ x )，所以我们每次只要对这一部分的值统一处理就好了。
因为每个值的系数不一样，用莫比乌斯函数求出系数后，因为值是相同的，所以用前缀和预处理一下，每次取值的系数就是区间和。
然后每次遍历不用++i了，直接加到 g ( x ) + 1 就好。
注意：考虑边界问题，不要小于 min ( a  ,  b );
```cpp
// s为莫比乌斯函数的前缀和
void solve() // ll !
{
    int a,b,d;cin>>a>>b>>d;
    a=a/d,b=b/d;
    int n=min(a,b);
    int ans=0;
    for(int l=1,r;l<=n;l=r+1)
    {
        r=min(n,min(a/(a/l),b/(b/l)));
        ans=(ans+(a/l)*(b/l)*(s[r]-s[l-1]));
    }
    cout<<ans<<endl;
}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t_ = 1;
    cin>>t_;
    init();
    while (t_--){solve();}
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
/*

*/
```
