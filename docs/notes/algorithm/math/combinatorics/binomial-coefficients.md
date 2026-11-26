---
title: "组合数的计算方法"
algorithms: []
sidebarOutline: true
---

# 组合数的计算方法：

## Lucas：

注意 要保证 p 为质数

![Lucas 定理计算大组合数的公式](../../../../assets/note-images/Pasted%20image%2020250817103159.png){width=1220 height=390}


用于求 大组合数的值
```cpp
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
int C(int a, int b){
    int res = 1, inv = 1;
    for (int i = 1, j = a; i <= b; i++, j--) {
        res = (LL)res * j % M;
        inv = (LL)inv * i % M;
    }
    res = (LL)res * ksm(inv, M - 2,M) % M;
    return res;
}
LL lucas(LL a, LL b,LL M) {
    if (a < M && b < M) return C(a, b);
    return (LL)C(a % M, b % M) * lucas(a / M, b / M,M) % M;
}
```

## 模数不为质数时求解组合数：


![复合模数下计算组合数的方法](../../../../assets/note-images/Pasted%20image%2020250817172910.png){width=1464 height=260}

用质数筛 将阶乘进行质因数分解，然后约分，因为保证了最后一定约的掉
当然也只能适用于n的1e6的范围，时间复杂度为$O(2n)$


结论是很好记的，但是你想看证明吗？

![组合数计算结论的证明](../../../../assets/note-images/Pasted%20image%2020250817103414.png){width=945 height=1231}

看完了记得教一下我
我还不会

## 拓展Lucas定理：

其实和lucas定理没什么关系，但是他是靠拓展中国剩余定理为基础，求出mod非质数模数的组合数
时间复杂度$\large O(p + log_p n)$ 计算一次的
这可以说是版本的终极答案了！！
返回 mod  p 情况下的组合数。
```cpp
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

## 线性求逆+模意义下+公式递推：

结论：
`inv[i]=(mod-(mod/i)*inv[mod%i]%mod) (mod mod)`

公式证明：
设： $mod \equiv r(mod\ i)$
=>：$mod = q*i+r$
若 数组： $r*inv[r] \equiv 1(mod)$
则 替换一下就是：
$(mod - q*i)*inv[r] \equiv 1(mod)$
=>: $i(-q*inv[r]) \equiv 1(mod)$
所以 $(-q*inv[r]) = inv[i]$ 作为 i 的逆元。
我们就可以得到公式 ：
`inv[i]=(mod-(mod/i)*inv[mod%i]%mod) (mod mod)`
重点在于 对于这类数据能找比 i 小的进行递推（如果比i 大也可以递推，在一侧可以）
然后线性递推即可：

然而事情并没有这么简单：
我们知道求组合数的过程少不了对 阶乘的逆元 ， 有了这个公式，我们自然而然可以 利用线性递推求出 ifac 数据组
`ifac[i]=ifac[i-1]*(inv[i])
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
````
