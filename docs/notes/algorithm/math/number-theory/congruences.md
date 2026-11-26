---
title: "同余(天下大同,春风一吹忘了谁~)"
algorithms: []
sidebarOutline: true
---

# 同余(天下大同,春风一吹忘了谁~)

## Bezuot定理(裴蜀定理)

应用：
对于一个     $\huge ax + by = z$  如果 $\huge z$   是 $a和b$ 的最大公约数，那么一定存在整数解 $\huge {x,y}$
相反 如果 存在  $\huge x和y是这个式子的整数解，那么可以推出，z一定是gcd(a,b)的倍数$
忘掉了就给我空降[模版题](https://www.luogu.com.cn/problem/P4549)
对于这个定理的应用我们还可以拓展到 拓展欧几里得定理

## 威尔逊定理

**如果 p 是素数，那么 $\huge (p-1)! = -1 (mod p)$**

虽然我看不懂，但是我也不会用。

## 拓展欧几里得

解释去看上面的数论大师吧
空降模版题[203. 同余方程](https://www.acwing.com/problem/content/205/)

应用：
函数`exgcd()`用于求出 找 $\huge a*x+b*y=gcd(a,b)的特解$  整数解
可以根据题目要求，求你要的通解
这里求同解考虑的是构造：
即构造
${\Huge a \left ( x_0 + \frac{b}{gcd(a,b)} \right )+b\left ( y_0-\frac{a}{gcd(a,b)}  \right )   =k*gcd(a,b)}$
特解就是 k = 1 时的其中一对${x,y}$的值
这样展开保持等式不变，推出通解：
${\Huge x_1=x_0+\frac{b}{gcd(a,b)}}$
${\Huge y_1=y_0-\frac{a}{gcd(a,b)}}$
这样就都可以求了
当然对于求出 最小正解 $x1$  我们可以用$\huge x_0 * k 对\frac{b}{gcd(a,b)}取mod$
方式参考：`(x*k%t+t)%t`
注意：这里的 k 表示的是原来的方程等式右边的 k
```cpp
int gcd(int a,int b)
{
    return b==0?a:gcd(b,a%b);
}
int exgcd(int a,int b,int & x,int & y)//找 a*x+b*y=gcd(a,b)的特解
{
    if(b==0)
    {
        x=1;//不断递归直到 变成 gcd(a,b)*x + 0*y=gcd(a,b),所以x=1；
        y=0;
        return a;
    }
    int x1,y1,d;
    d=exgcd(b,a%b,x1,y1);
    x=y1,y=x1-a/b*y1;
    return d;
}
void solve() // ll !
{
    int a,b,x,y;cin>>a>>b;
    int d=exgcd(a,b,x,y);
    while(x>0)
    {
        x-=b/d;
    }
    x+=b/d;cout<<x<<endl;
}
```

### 强化拓展欧几里得定理


#### [青蛙约会](https://www.luogu.com.cn/problem/P1516)(luogu蓝)

先转换成 ：
$\huge a*x+b*y=k*gcd(a,b)$
然后用拓展欧几里得算特解，求最小正值
```cpp
int gcd(int a,int b)
{
    return b==0?a:gcd(b,a%b);
}
int exgcd(int a,int b,int & x,int & y)//找 a*x+b*y=gcd(a,b)的特解
{
    if(b==0)
    {
        x=1;//不断递归直到 变成 gcd(a,b)*x + 0*y=gcd(a,b),所以x=1；
        y=0;
        return a;
    }
    int x1,y1,d;
    d=exgcd(b,a%b,x1,y1);
    x=y1,y=x1-a/b*y1;
    return d;
}
void solve() // ll !
{
    int x0,y0,a,b,L,A,B,C;
    cin>>x0>>y0>>a>>b>>L;
    if(a<b) swap(a,b),swap(x0,y0);
    A=a-b,B=-L,C=y0-x0;
    int x,y;
    int d=exgcd(A,B,x,y);
    if(C%d)
    {
        cout<<"Impossible\n";return;
    }
    int p=C/d;
    int t=abs(L/d);
    cout<<(x*p%t+t)%t<<endl;
}
```

## 中国剩余定理

下面的代码事中国剩余定理的板子，这类问题通常为
 [中国剩余定理模版题]([P1495 【模板】中国剩余定理（CRT）/ 曹冲养猪 - 洛谷](https://www.luogu.com.cn/problem/P1495))

```cpp
int exgcd(int a,int b,int & x,int & y)//找 a*x+b*y=gcd(a,b)的特解
{
    if(b==0)
    {
        x=1;//不断递归直到 变成 gcd(a,b)*x + 0*y=gcd(a,b),所以x=1；
        y=0;
        return a;
    }
    int x1,y1,d;
    d=exgcd(b,a%b,x1,y1);
    x=y1,y=x1-a/b*y1;
    return d;
}
int CRT(vector<int> m,vector<int> r,int n)
{
    int M=1,ans=0;
    for(int i=1;i<=n;++i)
    {
        M=(M*m[i]);
    }
    for(int i=1;i<=n;++i)
    {
        int c=M/m[i],x,y;
        exgcd(c,m[i],x,y);
        ans=(ans+((r[i]*c)%M*x)%M)%M;
    }
    return (ans%M+M)%M;
}
```
当然如果有__int128级别的数据，那就使用下面的房卡CRT吧，其他不变

```cpp
int CRT(vector<int> m, vector<int> r, int n)
{
    __int128 M = 1;
    for (int i = 1; i <= n; ++i) M = M * m[i]; // 用 __int128 防溢
    long long ans = 0;
    for (int i = 1; i <= n; ++i)
    {
        long long mi = m[i];
        long long ri = r[i] % mi;
        long long ci = (long long)(M / mi); // M fits in __int128, ci in ll maybe large but used in __int128 ops

        int x, y;
        exgcd((int)(ci % mi), (int)mi, x, y); // 求 ci 模 mi 的逆，先把 ci 对 mi 取模以防超大
        long long inv = x % mi;
        if (inv < 0) inv += mi;

        __int128 term = (__int128)ri * (long long)ci % (long long)M;
        term = term * inv % (long long)M;
        ans = (ans + (long long)term) % (long long)M;
    }
    long long ret = (ans % (long long)M + (long long)M) % (long long)M;
    return (int)ret;
}
```

### 结论：


![中国剩余定理的结论](../../../../assets/note-images/Pasted%20image%2020250813212904.png){width=1165 height=468}

求一个数在mod 任意数的逆元 我们通常采用 拓展欧几里得定理去 求出 $\huge a\times a^{-1} \equiv 1 \pmod{m}$


### 证明 ：


1. 下面是我对这个定理证明的理解，首先我们判断，想要将这个同余计数器转完完整一圈的步数是多少，如果分计数器之间两两互质，那么他们的lcm便是他们的成积。这便是 M 。

2. 下面 `c[i]` 的含义是保证除第i个计数器以外不变的情况下，最少转多少下就是$\displaystyle\frac{M}{m_i}=C$ 乘上c的逆元表示，我在保持其他不变的情况下，让第 i 个计数器在原技术的数字下往前加1.

3. 最后在乘以这样的步数有几次$r_i$，即是这个计数器余出来的步数。

4. **别忘了最后要mod M 哦！！**


![中国剩余定理的构造证明](../../../../assets/note-images/Pasted%20image%2020250813213153.png){width=1118 height=1145}


### 拓展 中国剩余定理

通过合并同余式来求出非两两互质的中国剩余定理

洛谷没过完，因为这串代码不抗爆；
时间复杂度  $O(nlogm_1)$


#### 证明：



![扩展中国剩余定理的同余方程合并](../../../../assets/note-images/Pasted%20image%2020250814110900.png){width=1053 height=1095}


#### 代码：

依旧不抗爆
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
ll exCRT(vi m,vi r)// 返回的是什么
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
