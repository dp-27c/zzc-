---
title: "NTT(快速数论变换)"
algorithms: []
sidebarOutline: true
---

# NTT(快速数论变换)



## 背景：

前置：请务必参透FFT算法。
在FFT中，最神奇的莫过于那奇妙的复数，以及单位根。
正式因为单位根满足对应的周期性，  对称，  折半， 取幂等性质，我们才会选择这样一个数去代入计算。
但是如果数据很大，要到了对 998244353 取模的地步。
这个时候 单位根将不再适用，我们急需找到一种能够替代单位根的存在。

## 原根：


### 阶：

若 g 和 p 互质，使得$g^n=1(mod\ p)$ 的最小正整数 n ，称之为 g 模 p 的阶，记作：$\delta_p(g)$ 

### 定义：

若 $\delta_p(g)=\varphi(p) \longrightarrow g^{\varphi(p)}= 1 (mod \ p)$ 满足$\varphi(p)$为符合条件的最小正整数。称 g 为 p 的原根

### 性质：

如果 p 为质数 ， 那么$\varphi(p)=p-1$ 此时如果我们引入 p 的原根 g。
那么 $g^0,g^1,g^2,g^3……g^{\varphi(n)-1}$ 就是在 mod p 意义下的 n 个不同的数字，并且$g^n$开始进入下一层循环，以n为周期
例如：


$$
3^0,3^1,3^2,3^3,3^4,3^5,3^5,在mod\ 7下两两不同，进入周期
$$





### 算法：

选择一个数 p 为了使得他的原根能够代入更多的点，所以选择形如 $q*2^k+1$ 的质数 ,其中 q 是奇素数，k为整数。


![数论变换选择模数和原根的条件](../../../../assets/note-images/Pasted%20image%2020250831135449.png){width=1133 height=526}


【图片来自：董晓算法】
这样我们构造一些值：
此时 的 $n = \varphi(p)=p-1$ 


$$
g_{n}^{0}=1,g_{n}^{1}=g_{}^{\frac{p-1}{n}}……g_{n}^{k}=g^{\frac{p-1}{n}k},g_{n}^{n-1}
$$


这样 n  份不能超过分解的指数2次幂，比如998244353 不能分成超过$2^{23}$份


![数论变换使用原根构造各阶单位根](../../../../assets/note-images/Pasted%20image%2020250831140941.png){width=736 height=448}



然后我们来推导一下$g_n^k的性质$
1. 周期性：不用多说，$g_n^k=g_n^{k+n}$

2. 对称性：$\displaystyle g_{n}^{k+n/2}=g^{\frac {p-1}{n}(k+n/2)}=g^{\frac {p-1}{n}k}*g^{\frac {p-1}{2}}$,$g^{p-1}=1,g^{(p-1)/2}=-1,所以 g_{n}^{k+n/2}=-g_{n}^{k}$

3. 折半性：$g_{n}^{2k}=g^{\frac {p-1}{n} 2k}=g^{\frac {p-1}{n/2}}=g_{n/2}^{k}$

然后代入FFT就好了
注意每一步都是模运算。

IFFT 中取的$g_{n}^{-k}就是对 g_{n}^{k} 取逆元，这里直接对单位下的原根取逆元操作$


### 代码模版（迭代版）：

好处,可以做模运算，不用手敲复数，比FFT多了做逆元的时间复杂度
```cpp
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
//000000
const LL g=3;//119;//mod = 998244353 时
const LL gi=ksm(g,mod-2,mod);//332748118;;
void NTT(vector<LL> &A,int n,int op)
{
    // change(A,n);把change 函数打包放里面
    vi R(n);R[0]=0;
    //递推进行 1~n 的位逆序变换
    for(int i=0;i<n;++i) R[i]=R[i/2]/2+(i&1)*(n/2);
    //将原数组按索引位逆序后的顺序排序
    for(int i=0;i<n;++i)if(i<R[i]) swap(A[i],A[R[i]]);
    for(int m=2;m<=n;m<<=1)//枚举块数
    {
        LL g1=ksm((op==1?g:gi),(mod-1)/m,mod);
        for(int i=0;i<n;i+=m)//枚举块组
        {
            LL gk=1;
            for(int j=0;j<m/2;++j)//枚举半块
            {
                LL x=A[i+j],y=(A[i+j+m/2]*gk)%mod;
                A[i+j]=(x+y)%mod,A[i+j+m/2]=(x-y+mod)%mod,gk=(gk*g1)%mod;
            }
        }
    }
    // 不需要处理浮点数问题
    if(op==-1) 
    {
        LL invn=ksm(n,mod-2,mod);
        for(int i=0;i<n;++i) A[i]=(A[i]*invn)%mod;
        // for(int i=0;i<n;++i) A[i]=A[i]/n;
    }
}
void solve() // ll
{   
    int n,m;cin>>n>>m;
    vector<int> A,B;
    A.resize(N),B.resize(N);
    rep(i,0,n) cin>>A[i];
    rep(i,0,m) cin>>B[i];
    for(m=n+m,n=1;n<=m;n<<=1);
    NTT(A,n,1),NTT(B,n,1);
    rep(i,0,n-1){A[i]=(A[i]*B[i])%mod;}
    NTT(A,n,-1);
    for(int i=0;i<=m;++i)
    {
        cout<<A[i]<<" \n"[i==m];
    }
}
```

## 练习：

模版题：[P5488 差分与前缀和 - 洛谷](https://www.luogu.com.cn/problem/P5488)

## 利用NTT快速求以 n 为底数的斯特林子集数：

数学真是太神奇啦！！

### 反斯特林反演求表达式：



$$
S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n
$$



#### 推导过程：

(待补)
根据斯特林反演：


$$
x^n=\sum_{j=0}^{n}\ C_{x}^{j}\ S_{n}^{j}\ j!
$$


然后 设 $g(j)=S_{n}^{j}\ j!$ ，用二项式反演：


$$
f(n)=\sum_{j=0}^{n}C_{n}^{j}\ g(j)\longleftrightarrow g(n)=\sum_{j=0}^{n}(-1)^{n-j}\ C_{n}^{j}\ f(j)
$$



所以代入可得 

$$
g(k)=k!\ S_{n}^{k}=\sum_{j=0}^{k}(-1)^{k-j}\ C_{k}^{j}\ j^n\
$$


最后将 $k!$ 移过去就可以得到了

### NTT卷积求值：

$S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n =\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}\ j^n \frac{k!}{j!(k-j)!}=\sum_{j=0}^{k} \frac{j^n}{j!} \frac{(-1)^{k-j}}{(k-j)!}$  

设：$\displaystyle A_j=\frac{j^n}{j!},B_j=\frac{(-1)^{j}}{(j)!}$

那么： 

$$
S_{n}^{k}=\sum_{j=0}^{k}A_j\ B_{k-j}
$$


线性构造A 和 B 函数，然后 NTT 求出 $A \times B$ 的系数就是 $S_{n}^{k}$

题目：[P2791 幼儿园篮球题 - 洛谷](https://www.luogu.com.cn/problem/P2791)
注意在使用 int 整数时，所有乘法都应该要 $((1LL)* a * b)\% mod$ 否则会溢出

```cpp
int lowbit(int x){ return x&(-x); }
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    LL sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = ((1LL)*sum * x) % M;
        x = ((1LL)*x * x) % M, k >>= 1;
    }
    return sum%M;
}
//000000
const LL g=3;//119;//mod = 998244353 时
const LL gi=332748118;//ksm(g,mod-2,mod);//332748118;;
vi R;
void NTT(vector<int> &A,int n,int op)
{
    // change(A,n);把change 函数打包放里面
    // vi R(n);R[0]=0;
    //递推进行 1~n 的位逆序变换
    // for(int i=0;i<n;++i) R[i]=R[i/2]/2+(i&1)*(n/2);
    //将原数组按索引位逆序后的顺序排序
    for(int i=0;i<n;++i)if(i<R[i]) swap(A[i],A[R[i]]);
    for(int m=2;m<=n;m<<=1)//枚举块数
    {
        int g1=ksm((op==1?g:gi),(mod-1)/m,mod);
        for(int i=0;i<n;i+=m)//枚举块组
        {
            int gk=1;
            for(int j=0;j<m/2;++j)//枚举半块
            {
                int x=A[i+j],y=((1LL)*A[i+j+m/2]*gk)%mod;
                A[i+j]=(x+y)%mod,A[i+j+m/2]=(x-y+mod)%mod,gk=((1LL)*gk*g1)%mod;
            }
        }
    }
    // 不需要处理浮点数问题
    if(op==-1) 
    {
        int invn=ksm(n,mod-2,mod);
        for(int i=0;i<n;++i) A[i]=((1LL)*A[i]*invn)%mod;
        // for(int i=0;i<n;++i) A[i]=A[i]/n;
    }
}
int inv[N],fac[N],ifac[N];
void init_inv(int n,int M)
{
    inv[1]=1;
    ifac[0]=1;fac[0]=1;
    for(int i=1;i<=n;++i)
    {
        if(i==1) inv[i]=1;
        else inv[i]=(M-(1LL)*(M/i)*inv[M%i]%M)%M;
        fac[i]=((1LL)*i*fac[i-1])%M;
        ifac[i]=((1LL)*inv[i]*ifac[i-1])%M;
    }
}
LL C(int a,int b,LL M)
{
    if(b>a) return 0;
    return fac[a]*ifac[b]%M*ifac[a-b]%M;
}
void solve() // ll
{  
    // cout<<ksm(3,mod-2,mod)<<endl;
    int nn,mm,s,L;cin>>nn>>mm>>s>>L;
    int limit=1,up=L+L;
    for(limit=1;limit<=up;limit<<=1);    
    vi A(limit+1,0),B(limit+1,0);
    rep(j,0,L)
    {
        A[j]=Mod(((1LL)*ksm(j,L,mod)*ifac[j])%mod,mod);
        B[j]=Mod(((1LL)*(j&1?-1:1)*ifac[j])%mod,mod);
    }
    R.resize(limit+1,0);
    for(int i=0;i<limit;++i) R[i]=R[i/2]/2+(i&1)*(limit/2);
    NTT(A,limit,1),NTT(B,limit,1);
    for(int i=0;i<limit;++i) A[i]=((1LL)*A[i]*B[i])%mod;
    NTT(A,limit,-1);
    for(int t=1;t<=s;++t)
    {
        int n,m,k;cin>>n>>m>>k;
        int up=min(min(n,m),min(L,k));
        int fz=0;
        for(int j=0;j<=up;++j)
        {
            int val=0;  
            val=((1LL)*fac[n-j]%mod*ifac[m-j]%mod*ifac[k-j]%mod*A[j])%mod;
            fz=((1LL)*fz+val)%mod;
        }
        fz=((1LL)*fz%mod*fac[m]%mod*fac[k]%mod*ifac[n])%mod;
        cout<<fz<<endl;
    }
}
```


### NTT 求斯特林子集数

[P2791 幼儿园篮球题 - 洛谷](https://www.luogu.com.cn/problem/P2791)
没想到，人生第一个黑题是 坤坤 带的......
数学真是太神奇啦！！

#### 反斯特林反演求表达式：



$$
S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n
$$



##### 推导过程：

(待补)
根据斯特林反演：


$$
x^n=\sum_{j=0}^{n}\ C_{x}^{j}\ S_{n}^{j}\ j!
$$


然后 设 $g(j)=S_{n}^{j}\ j!$ ，用二项式反演：


$$
f(n)=\sum_{j=0}^{n}C_{n}^{j}\ g(j)\longleftrightarrow g(n)=\sum_{j=0}^{n}(-1)^{n-j}\ C_{n}^{j}\ f(j)
$$



所以代入可得 

$$
g(k)=k!\ S_{n}^{k}=\sum_{j=0}^{k}(-1)^{k-j}\ C_{k}^{j}\ j^n\
$$


最后将 $k!$ 移过去就可以得到了

#### NTT卷积求值：

$S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n =\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}\ j^n \frac{k!}{j!(k-j)!}=\sum_{j=0}^{k} \frac{j^n}{j!} \frac{(-1)^{k-j}}{(k-j)!}$  

设：$\displaystyle A_j=\frac{j^n}{j!},B_j=\frac{(-1)^{j}}{(j)!}$

那么： 

$$
S_{n}^{k}=\sum_{j=0}^{k}A_j\ B_{k-j}
$$


线性构造A 和 B 函数，然后 NTT 求出 $A \times B$ 的系数就是 $S_{n}^{k}$
题目：[P2791 幼儿园篮球题 - 洛谷](https://www.luogu.com.cn/problem/P2791)
注意在使用 int 整数时，所有乘法都应该要 $((1LL)* a * b)\% mod$ 否则会溢出

```cpp
int lowbit(int x){ return x&(-x); }
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    LL sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = ((1LL)*sum * x) % M;
        x = ((1LL)*x * x) % M, k >>= 1;
    }
    return sum%M;
}
//000000
const LL g=3;//119;//mod = 998244353 时
const LL gi=332748118;//ksm(g,mod-2,mod);//332748118;;
vi R;
void NTT(vector<int> &A,int n,int op)
{
    // change(A,n);把change 函数打包放里面
    // vi R(n);R[0]=0;
    //递推进行 1~n 的位逆序变换
    // for(int i=0;i<n;++i) R[i]=R[i/2]/2+(i&1)*(n/2);
    //将原数组按索引位逆序后的顺序排序
    for(int i=0;i<n;++i)if(i<R[i]) swap(A[i],A[R[i]]);
    for(int m=2;m<=n;m<<=1)//枚举块数
    {
        int g1=ksm((op==1?g:gi),(mod-1)/m,mod);
        for(int i=0;i<n;i+=m)//枚举块组
        {
            int gk=1;
            for(int j=0;j<m/2;++j)//枚举半块
            {
                int x=A[i+j],y=((1LL)*A[i+j+m/2]*gk)%mod;
                A[i+j]=(x+y)%mod,A[i+j+m/2]=(x-y+mod)%mod,gk=((1LL)*gk*g1)%mod;
            }
        }
    }
    // 不需要处理浮点数问题
    if(op==-1) 
    {
        int invn=ksm(n,mod-2,mod);
        for(int i=0;i<n;++i) A[i]=((1LL)*A[i]*invn)%mod;
        // for(int i=0;i<n;++i) A[i]=A[i]/n;
    }
}
int inv[N],fac[N],ifac[N];
void init_inv(int n,int M)
{
    inv[1]=1;
    ifac[0]=1;fac[0]=1;
    for(int i=1;i<=n;++i)
    {
        if(i==1) inv[i]=1;
        else inv[i]=(M-(1LL)*(M/i)*inv[M%i]%M)%M;
        fac[i]=((1LL)*i*fac[i-1])%M;
        ifac[i]=((1LL)*inv[i]*ifac[i-1])%M;
    }
}
LL C(int a,int b,LL M)
{
    if(b>a) return 0;
    return fac[a]*ifac[b]%M*ifac[a-b]%M;
}
void solve() // ll
{  
    // cout<<ksm(3,mod-2,mod)<<endl;
    int nn,mm,s,L;cin>>nn>>mm>>s>>L;
    int limit=1,up=L+L;
    for(limit=1;limit<=up;limit<<=1);    
    vi A(limit+1,0),B(limit+1,0);
    rep(j,0,L)
    {
        A[j]=Mod(((1LL)*ksm(j,L,mod)*ifac[j])%mod,mod);
        B[j]=Mod(((1LL)*(j&1?-1:1)*ifac[j])%mod,mod);
    }
    R.resize(limit+1,0);
    for(int i=0;i<limit;++i) R[i]=R[i/2]/2+(i&1)*(limit/2);
    NTT(A,limit,1),NTT(B,limit,1);
    for(int i=0;i<limit;++i) A[i]=((1LL)*A[i]*B[i])%mod;
    NTT(A,limit,-1);
    for(int t=1;t<=s;++t)
    {
        int n,m,k;cin>>n>>m>>k;
        int up=min(min(n,m),min(L,k));
        int fz=0;
        for(int j=0;j<=up;++j)
        {
            int val=0;  
            val=((1LL)*fac[n-j]%mod*ifac[m-j]%mod*ifac[k-j]%mod*A[j])%mod;
            fz=((1LL)*fz+val)%mod;
        }
        fz=((1LL)*fz%mod*fac[m]%mod*fac[k]%mod*ifac[n])%mod;
        cout<<fz<<endl;
    }
}

```
数学大板里有 [NTT 的高精度乘法](../../../../algo/topics/math/code/big-integers.md#高精度乘法-ntt手动挡)。
