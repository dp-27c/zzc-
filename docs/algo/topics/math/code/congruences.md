---
title: 同余
sidebarOutline: true
---

# 同余

## 手算逆元：
$a*x =1 (mod p) => x=\displaystyle  \frac {(k*p+1)}{a},(k\in \text{整数})=inv(a)$
x 为 a的逆元，这类通常适合a比较 小并且用逆元的地方只有 一次两次，此时直接计算的也可以。
没说不让你用 费马小定理+快速幂。
适合模数不为质数且小模数运算。
## 快速阶乘逆元：
```cpp
    vector<ll> inv(n + 5);
    inv[1] = 1;
    for (int i = 2; i <= n; ++i)
        inv[i] = (mod - (mod / i) * inv[mod % i] % mod) % mod;// 计算 前 n 个数的逆元
```
## 中国剩余定理和拓欧定理：
用来合并同余式
```cpp
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
// 给定多个同余方程，其中 m为模数数组，r为余数数组，从1开始。
// 返回满足所有同余式的最小非负解。
// X  = r (mod m)
ll exCRT(vi m,vi r)
{
    ll m1,m2,r1,r2,p,q;
    m1=m[1],r1=r[1];
    rep(i,2,m.size()-1)
    {
        m2=m[i],r2=r[i];
        ll d=exgcd(m1,m2,p,q);
        if((r2-r1)%d) return -1;
        p=(p*((r2-r1)/d));//特解
        p=(p%(m2/d)+(m2/d))%(m2/d);
        r1=(m1*p)+r1;
        m1=(m1/d*m2);
    }
    return (r1%m1+m1)%m1;
}
```
