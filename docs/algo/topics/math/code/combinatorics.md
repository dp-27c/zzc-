---
title: 组合计数
sidebarOutline: true
---

# 组合计数

## 线性阶乘逆元求组合数(mod 质数)：
```cpp
/* 简洁版
LL inv[N],fac[N],ifac[N];
void init_inv(int n,int M)
{
    fac[0]=1;
    for(int i=1;i<=n;++i) (fac[i]=i*fac[i-1]%M)%=M;
    ifac[n]=ksm(fac[n],M-2,M);
    for(int i=n-1;i>=0;--i) (ifac[i]=(i+1)*ifac[i+1]%M)%=M;
}
*/
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
// init_inv(N-1,mod);
```
## Lucas定理
求大数在去 mod 的情况下的 组合数，时间复杂度为$O(mod)$ 
待补图片（Pasted image 20250817103126.png）
```cpp
// 对于 1 e 9 的 mod 千万别用 lucas 直接 用  C 都比这个好
// 附上 取组合数的模版
LL lucas(LL a, LL b,LL M) {
	if (a < 0) return 0;
    if (a < M && b < M) return C(a, b,M);
    return (LL)C(a % M, b % M,M) * lucas(a / M, b / M,M) % M;
}
```
## exLucas定理：
这个是我看别人的，并且调成了自己代码能接受的模版

作为板子，它可以过luogu的模版题

对于任何模数都适合使用，时间复杂度$\large O(p + log_p n)$ 计算一次的
码量有点大，要用请慎重 ！！
这里快速幂没敲上去。
```cpp
// ksm 模版
ll fac(ll n,ll pi,ll pk)
{
    if(!n)return 1;
    ll res=1;
    for(register ll i=2;i<=pk;++i)
        if(i%pi)(res*=i)%=pk;
    res=ksm(res,n/pk,pk);
    for(register ll i=2;i<=n%pk;++i)
        if(i%pi)(res*=i)%=pk;
    return res*fac(n/pi,pi,pk)%pk;
}
int exgcd(int a,int b,int& x,int& y)
{
    if(b==0)
    {
        x=1,y=0;
        return a;
    }
    int x1,y1;
    int d=exgcd(b,a%b,x1,y1);
    x=y1,y=x1-a/b*y1;
    return d;
}
int inv(int a,int p)
{
	int x,y;
	exgcd(a,p,x,y);
	return (x%p+p)%p;
}
inline ll C(ll n,ll m,ll pi,ll pk)
{
    ll up=fac(n,pi,pk),d1=fac(m,pi,pk),d2=fac(n-m,pi,pk);
    ll k=0;
    for(register ll i=n;i;i/=pi)k+=i/pi;
    for(register ll i=m;i;i/=pi)k-=i/pi;
    for(register ll i=n-m;i;i/=pi)k-=i/pi;
    return up*inv(d1,pk)%pk*inv(d2,pk)%pk*ksm(pi,k,pk)%pk;
}
inline ll CRT(ll b,ll p,ll M){return b*inv(p/M,M)%p*(p/M)%p;}
inline ll exlucus(ll n,ll m,ll p)
{
    //if(m>n) return 0;
    ll res=0,tmp=p,pk;
	static int lim=sqrt(p)+5;
    for(register int i=2;i<=lim;++i)if(tmp%i==0)
    {
        pk=1;while(tmp%i==0)pk*=i,tmp/=i;
        (res+=CRT(C(n,m,i,pk),p,pk))%=p;
    }
	if(tmp>1)(res+=CRT(C(n,m,tmp,tmp),p,tmp))%=p;
    return res;
}
```
## 容斥原理：
用解决方案数的种类交集，并集的大小问题
复习请去acwing 数论讲解里找组合计数的容斥原理即可：
二进制分配：
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
## 二维数论分块：
用来优化通量计算，和式计算公式中
```cpp
// 对于这题s 为莫比乌斯函数的前缀和
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
```
## NTT求斯特林子集数：
利用NTT快速求以 n 为底数的斯特林子集数：
数学真是太神奇啦！！
 反斯特林反演求表达式：

$$
\Large S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n
$$

### 推导过程：
(待补)
根据斯特林反演：

$$
\Large x^n=\sum_{j=0}^{n}\ C_{x}^{j}\ S_{n}^{j}\ j!
$$

然后 设 $g(j)=S_{n}^{j}\ j!$ ，用二项式反演：

$$
\Large f(n)=\sum_{j=0}^{n}C_{n}^{j}\ g(j)\longleftrightarrow g(n)=\sum_{j=0}^{n}(-1)^{n-j}\ C_{n}^{j}\ f(j)
$$


所以代入可得

$$
\Large g(k)=k!\ S_{n}^{k}=\sum_{j=0}^{k}(-1)^{k-j}\ C_{k}^{j}\ j^n\
$$

最后将 $k!$ 移过去就可以得到了
### NTT卷积求值：
$\Large S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n =\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}\ j^n \frac{k!}{j!(k-j)!}=\sum_{j=0}^{k} \frac{j^n}{j!} \frac{(-1)^{k-j}}{(k-j)!}$  

设：$\displaystyle A_j=\frac{j^n}{j!},B_j=\frac{(-1)^{j}}{(j)!}$

那么：

$$
\Large S_{n}^{k}=\sum_{j=0}^{k}A_j\ B_{k-j}
$$

线性构造A 和 B 函数，然后 NTT 求出 $A \times B$ 的系数就是 $S_{n}^{k}$
