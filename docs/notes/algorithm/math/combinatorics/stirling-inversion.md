---
title: "斯特林反演"
algorithms: []
sidebarOutline: true
---

# 斯特林反演：

## 变换一的推导：


![用第二类斯特林数将幂展开为下降阶乘](../../../../assets/note-images/Pasted%20image%2020250821193647.png){width=689 height=141}


$$
\Large x^n=\sum_{k=0}^{n}C_{x}^{k}\ S_{n}^{k}\ k!
$$


变换的理解
组合思想：
最左边的式子 $X^{n}$ 可以看成是  将 n 个小球放到 x 个盒子的所有的方案数。
最右边的式子$\huge \sum_{k=0}^{n} C_{x}^{k}*S_{n}^{k}*A_{k}^{k}$   可以理解为，枚举非空盒子的情况（k） ，从n 个盒子中选的这k个盒子里，用n个元素放入这k个盒子（已经保证非空），最后在乘上这k个盒子的全排列。

这一步转换，是普通幂和下降幂的转换


## 变换公式：

这里不一一推导。
斯特林反演在于对普通幂，上升幂，下降幂之间的转换。

$\Huge \left [ _{k}^{n} \right ]$ 表示 斯特林轮转数

$\Huge \left \{ _{k}^{n} \right \}$ 表示 斯特林子集数


待补图片（Pasted image 20250821195033.png）


## 练习：

[P6620 [省选联考 2020 A 卷] 组合数问题 - 洛谷](https://www.luogu.com.cn/problem/P6620)
大意：

待补图片（Pasted image 20250821210922.png）

对于所有测试数据：$1≤n,x,p≤1e9,0≤ai​≤1e9,0≤m≤min(n,1000)$
f(k) 为给定的一个 m 次多项式 f(k)=a_0​+a_1 ​k + a_ 2 ​k2+⋯+ a_m​ km。
思路：

如果我们直接枚举的话，就是 $O(nm)$ 的时间复杂度
n 能开到 1e9 ，直接爆炸了
思考一下，如何将 对 n 的循环消去或者替换成别的可以循环的次数。
假如你不知道其实是 化成 m^2

首先将 $f(x)$ 打开. =>
然后这样，再这样，接着这样这样，最后这样一下就好了：
此时我们注意，在：
倒数第三行 => 倒数第二行中，
我们发现当 k - j 小于 0 时，我们的组合数为0，因此可以去掉不看这部分。
所以项数就从原来的  0 - > n  变成了  0 -  > n - j
利用换元的思想更好理解组合数转二项式。

待补图片（Pasted image 20250821212659.png）


```cpp

int M;
void solve() // ll !
{
    int n,x,p,m;cin>>n>>x>>p>>m;
    vi a(m+1,0);
    rep(i,0,m)
    {
        cin>>a[i];
    }
    vii S(m+1,vi(m+1,0));
    S[0][0]=1;
    rep(i,1,m)
    {
        rep(j,1,m)
        {
            if(j>i)break;
            S[i][j]=(S[i-1][j-1]+((j)*S[i-1][j])%p)%p;
        }
    }
    vi J(m+1,0);
    J[0]=1;
    rep(i,1,m)
    {
        J[i]=Mod((n-i+1)*J[i-1],p);
    }
    int ans=0;
    rep(i,0,m)
    {
        rep(j,0,i)
        {
            int xj=ksm(x,j,p);
            int xnj=ksm(x+1,n-j,p);
            int d=a[i]%p*S[i][j]%p*J[j]%p*xj%p*xnj%p;
            ans=Mod(ans+d,p);
        }
    }
    cout<<ans<<endl;
}
```
