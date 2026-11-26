---
title: "二项式"
algorithms: []
sidebarOutline: true
---

# 二项式：

## 二项式定理：


$\Huge (a+b)^n=\sum_{i=0}^{n}C_{n}^{i} \times a^{n-i}\times  b^i$
定理的运用：
1.用于将 求和的遍历 加速成 一个式子直接求。
2.用于将 方程转换 例如 $\large (x+1)^n=\sum_{i=0}^{n}C_{n}^{i} \times x^{i}$

## 推论式1：


$\Huge \sum_{i=0}^{n}(-1)^i \times C_{n}^{i} = [n==0]$
证明：二项式定理，或者组合数递推分解。


## 二相式定理变形公式:

[F - Range Power Sum](https://atcoder.jp/contests/abc399/tasks/abc399_f)
大意：

![区间幂次和例题的题意](../../../../assets/note-images/Pasted%20image%2020250824141612.png){width=1631 height=291}

- 1 ≤ N ≤ 2e5
- 1 ≤ K ≤ 10
- 0 ≤ Ai​ < 998244353
- All input values are integers.
思路：
首先这个 求和符号 看着很 jb 难受 转换成这样：
$\huge \sum_{l=1}^{n} \sum_{r=l}^{n} (\sum_{i=l}^{r} A_i)^k$
这样直接求会爆炸 时间复杂度为 $O(kn^2)$
我们考虑能否优化一个 n 。

首先我们发现，这个式子的括号内部是一个区间和，如果我们提前处理好 这个前缀和为数组 `S[i]`.
那么原式变成了 $\large \sum_{l=1}^{n} \sum_{r=l}^{n} (S[r]-S[l-1])^k$
但是 式子的复杂度还是 $n^2$  依旧爆炸。

对于$(S[r]-S[l-1])^k$ 可以进行二项式分解：
$\sum_{i=0}^{k} C_{k}^{i}*(S[r])^{k-i}*(-S[l-1])^{i}$
（因为k的大小最高到 10 ，我们可以很完美的拆成 k 而不计时间后果）
此时我们再代入回原来的式子，发现 此时的 i 与 l和r 没有关系，所以可以吧 和 i 有关但是和l跟r无关的项提出来：
$\large\sum_{i=0}^{k} (-1)^i*C_{k}^{i} \sum_{l=1}^{n} \sum_{r=l}^{n} (S[r])^{k-i}*(S[l-1])^{i}$

 利用求和下三角的转换（这一步是为了将 里面的后缀和变成前缀和）
$\large\sum_{i=0}^{k} (-1)^i*C_{k}^{i} \sum_{r=1}^{n} (S[r])^{k-i}\sum_{l=1}^{r}(S[l-1])^{i}$
此时我们可以 发现 最后的求和可以通过计算过程中前缀的 $(S[r-1])^{i}$  求和来优化。
为了处理 $(S[r])^{k-i}$ 的问题，我们还需要对原本的前缀和进行预处理，存在二维的$ss[k][n]$的数组中。

这个时候你就得到了 一个 $O(kn)$的时间复杂度的计算问题了，快动动你的小手吧！！

思考 ：本题不光是对二项式公式转换的熟练度，还有对求和符号之间的提出和交换，转换的选择。
```cpp
int lowbit(int x){ return x&(-x); }
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    int sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % M;
        x = (x * x) % M, k >>= 1;
    }
    return sum;
}
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
const int M=998244353;
void solve() // ll !
{
    int n,k;cin>>n>>k;
    int ans=0;
    init_inv(k,mod);
    vi s(n+1,0);
    vii ss(k+1,vi(n+1,0));
    rep(i,1,n)
    {
        cin>>s[i];
        s[i]=(s[i]+s[i-1])%mod;
    }
    ss[0][0]=1;// 这一步很重要，因为后面有涉及到这个位置的计算。
    rep(i,0,k)
    {
        rep(j,1,n)
        {
            if(i) ss[i][j]=(ss[i-1][j]*s[j])%mod;
            else ss[i][j]=1;
        }
    }
    rep(i,0,k)
    {
        int ci=C(k,i,mod),sum=0,ac=0;
        rep(r,1,n)
        {
            sum=(sum+ss[i][r-1])%mod;
            // 别忘了在这里取模，呜呜呜找到 bug 了
            if(i&1) ac=Mod((ac-ss[k-i][r]%mod*sum%mod)%mod,mod);
            else ac=(ac+ss[k-i][r]%mod*sum%mod)%mod;
        }
        ans=(ans+ac*ci)%mod;
    }
    cout<<Mod(ans,mod)<<endl;
}

```


## 二项式反演：


$\Huge f(n)=\sum_{i=0}^{n}C_{n}^{i}\times g(i) \Longleftrightarrow  g(n)=\sum_{i=0}^{n}(-1)^{n-i} \times C_{n}^{i} \times f(i)$

二项式反演 很多时候其实就是一个容斥原理的 题目

### 证明：

这里需要自己去推理
这里的倒数第二行 => 倒数第一行 的变化：
可以将组合数$\large C_{n-j}^{i} => C_{n}^{n-j-i}$
这样更符合 推论式1，更好理解这一步的变换。

![二项式反演证明中的求和换元](../../../../assets/note-images/Pasted%20image%2020250822153650.png){width=717 height=758}



### 运用场景：


#### 1.恰好 --> 至多型

$g(m)$ 表示**恰好**满足条件(=m)的方案数（答案）
$f(m)$ 表示**至多**满足条件(<=m)的方案数 (方便求的)
先求出 f(m) , 再反演求 g(m)
![二项式反演至多型求和范围](../../../../assets/note-images/Pasted%20image%2020250822160047.png){width=330 height=93}


$\Huge f(m)=\sum_{i=0}^{m}C_{m}^{i}\times g(i) \Longrightarrow  g(m)=\sum_{i=0}^{m}(-1)^{m-i} \times C_{m}^{i} \times f(i)$


##### 练习：

[P1595 信封问题 - 洛谷](https://www.luogu.com.cn/problem/P1595)
板题：错位排列，但是可以用二项式反演来做
思路：
f(i) 表示最多有 i 个信封装错， 答案为 $(i)!$
g(i) 表示恰好有 i 个信封装错，求 g(n)
运用上面的公式，反演推出 g(n) 的表达式，遍历一遍就好了
注意:
$\huge C_{n}^{i}=\displaystyle \frac{(n-i)C_{n}^{i-1}}{i}$

```cpp
void solve() // ll !
{
    int n;cin>>n;
    int ans=(n&1?-1:1),t1=1,t2=1;
    rep(i,1,n)
    {
        t1=t1*(n-i+1)/i;
        if(i==n) t1=1;
        t2*=i;
        ans+=t1*t2*((n-i)&1?-1:1);
    }
    cout<<ans<<endl;
}
```


#### 2.恰好 --> 至少型

$g(m)$ 表示**恰好**满足条件(=m)的方案数（答案）
$f(m)$ 表示**至少**满足条件(>=m)的方案数 (方便求的)
先求出 f(m) , 再反演求 g(m)
![二项式反演至少型求和范围](../../../../assets/note-images/Pasted%20image%2020250822160404.png){width=318 height=98}




$$
\Huge f(m)=\sum_{i=m}^{n}C_{i}^{m}\times g(i) \Longrightarrow  g(m)=\sum_{i=m}^{n}(-1)^{i-m} \times C_{i}^{m} \times f(i)
$$




##### 练习1：

[P4859 已经没有什么好害怕的了 - 洛谷](https://www.luogu.com.cn/problem/P4859)
大意：
给你两个数组A和B，这两个数组每个都有 n 个元素，每个A数组的元素都可以和B数组的元素组成一个数组对。
且保证两个数组中的任何数组的任何元素都不会相同。
求组合中 A数组的数比B数组的数大的数对 多于 B数组的数比A数组的数大的数对 k 个的方案数有多少？
n<1000,k<=n

思路：
这道题首先有一个小trick：
trick：
在计算若A比B大的数对数量为 ca ，B比A大的数对数量为 cb ，
ca + cb = n
ca - cb  = k
那么ca =（ n + k ) / 2;

那么我们令 k = （ n + k ) / 2.
问题就变成，找A数组比B数组的数大的数对 恰好有 k 个的问题。
直接求 恰好 k 个要考虑很多因素，我们不妨尝试求 一个好求的数 ，至少 k 个。
为什么从至少 k 个下手 ？ 我们在求 恰好 k 个的时候，做dp要考虑后面的未考虑的数对对前面的影响，导致状态太多了，空间要爆。
而至少 k 个，我们就可以从找考虑前 i 个元素，后面的元素不管怎么组合，怎么搭配，我已经将 k 个算进去了，所以保证了一定有 k 个。

然后我们做 dp ，记录 前 i 个元素中，至少有 j 个的状态。
为了方便我们 dp ，同时考虑遍历的简单性，先对A，B数组升序一下，用数组`cn[i]` 记录在 A数组第 i 个元素来说，B中有多少个比它小的数。
这样我们就可做状态转移：
`dp[i][j] = dp[i-1][j] + (cn[i] - (j - 1))*dp[i-1][j-1]`
// 考虑 前面已经有 j 个合法的，和让 `a[i]` 作为合法的有多少种方案。
但是这样的 dp 并非所有元素的组合，我们只考虑了 `dp[n][j]`中 j 个元素的组合，所以还有剩下 $(n-j)!$ 的组合方案数。(考虑剩下组合，自己推一下就出来了)

设 `f[i]`表示 至少为 i 的组合方案数 ：$\Large f_i=(n-i)!*dp_{n,i}$

最后 用：
二项式反演，转换成恰好 k 个。
$\huge g(m)=\sum_{i=m}^{n}(-1)^{i-m} \times C_{i}^{m} \times f(i)$
时间复杂度最多的在 dp 上。但是这题最难的还是去发现 可以从至少 k 个这样的方向 这一步，走对了方向，很多东西就是水到渠成了。
```cpp
int lowbit(int x){ return x&(-x); }
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    int sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % M;
        x = (x * x) % M, k >>= 1;
    }
    return sum;
}
vii C(2001,vi(2001,0));
vi A(2001,1);
const int M=1e9+9;
void init()
{
    C[0][0]=1;
    rep(n,1,2000)
    {
        A[n]=(A[n-1]*n)%M;
        rep(k,0,n)
        {
            if(k==n)
            {
                C[n][k]=1;break;
            }
            if(k==0)
            {
                C[n][k]=1;continue;
            }
            C[n][k]=(C[n-1][k]+C[n-1][k-1])%M;
        }
    }
}
void solve() // ll !
{
    int n,k;cin>>n>>k;
    vi a(n+1,0),b(n+1,0);
    rep(i,1,n){cin>>a[i];}
    rep(i,1,n)cin>>b[i];
    sort(a.begin()+1,a.end());
    sort(b.begin()+1,b.end());
    vi cn(n+1,0);
    int cur=1,cb=1;
    while(cur<=n)//找到比a[i]小的b的个数
    {
        if(cb<=n&&a[cur]>b[cb])
        {
            cb++;
            cn[cur]++;
        }
        else 
        {
            cur++;
            if(cur<=n) cn[cur]=cn[cur-1];
        }
    }
    int fff=1;
    if((n-k)&1) fff=0;
    k=(n-k)/2+k;
    if(k>cn[n]||fff==0)
    {
        cout<<0<<endl;return;
    }
    vii dp(n+1,vi(n+1,0));
    dp[0][0]=1;
    rep(i,1,n)//表示考虑 a 的前 i 项有至少 j 个 a_i>b_j 的数组
    {
        rep(j,0,cn[i])
        {
            dp[i][j]=dp[i-1][j];
            if(j) dp[i][j]=(dp[i][j]+(cn[i]-(j-1))*dp[i-1][j-1]%mod)%mod;
        }
    }
    vi f(n+1,0);
    for(int i=cn[n];i>=0;--i)
    {
        f[i]=A[n-i]*dp[n][i]%mod;
    }
    int ans=0;

    rep(i,k,cn[n])
    {
        if((i-k)&1) ans=(ans-C[i][k]*f[i]%mod)%mod;
        else ans=(ans+C[i][k]*f[i]%mod)%mod;
    }
    cout<<Mod(ans,mod)<<endl;
}
```

##### 练习2：

[P10596 BZOJ2839 集合计数 - 洛谷](https://www.luogu.com.cn/problem/P10596)
思维上要比上一个要简单一点：
大意：
一个有 N 个元素的集合有 $2^N$ 个不同子集（包含空集），现在要在这 $2^N$ 个集合中取出若干集合（至少一个），使得它们的交集的元素个数为 K，求取法的方案数，答案模 1e9+7。
思路：
将恰好 k 个 转成 至少 i 个。

$\huge f_i=C_{n}^{i}(2^{2^{n-i}}-1)$
为什么要减一？ 因为题目中要保证至少有 1 个集合，但题目说了空集也算啊。
我们要理解，第一个2的指数是什么意思，表示在 n 个元素里先选出去 i 个元素，剩下的元素按照二进制组合方式，一共有 $2^{n-i}$ 种集合（这里包括了空集） ，而为什么它作为指数，是因为它表示对于这不同的  $2^{n-i}$ 种集合,同样用二进制的组合方式，此时的 二进制 0 表示没有任何集合参与组合，所以就是没有集合的意思，题目保证至少一个，所以这个一减去的是这里。

然后就是用二项式反演求出恰好为 k 个的方案数。
注意：设计到n循环的ksm逆元，所以容易被卡
我们这里采用了针对阶乘的逆元运算，保存在数组 inv 中，下次再面对同样问题的时候也可以拿来套用。
```cpp

int lowbit(int x){ return x&(-x); }
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    int sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % M;
        x = (x * x) % M, k >>= 1;
    }
    return sum;
}
const int M=mod-2;
void solve() // ll !
{
    int n,k;cin>>n>>k;
    vi cni(n+1,0),cik(n+1,0),c(n+1,0);
    cni[0]=1;
    cik[k]=1;
    c[0]=1;
    vector<ll> inv(n + 5);
    inv[1] = 1;
    for (int i = 2; i <= n; ++i)
        inv[i] = (mod - (mod / i) * inv[mod % i] % mod) % mod;
    rep(i,1,n)
    {
        cni[i]=cni[i-1]*(n-i+1)%mod*inv[i]%mod;
        if(i>k) cik[i]=Mod((cik[i-1]*i)%mod*inv[i-k],mod);
        c[i]=c[i-1]*2%(mod-1);
    }
    int ans=0;
    rep(i,k,n)
    {
        if((i-k)&1) ans=Mod(ans-cni[i]*cik[i]%mod*Mod(ksm(2,c[n-i],mod)-1,mod),mod);
        else ans=Mod(ans+cni[i]*cik[i]%mod*Mod(ksm(2,c[n-i],mod)-1,mod),mod);
    }
    cout<<Mod(ans,mod)<<endl;
}
```
