---
title: "SG 函数"
algorithms: []
sidebarOutline: true
---

# SG 函数


## 概念解释：

首先，公平组合游戏都可以看成是一张图

SG 函数，其求解方式是 mex 的过程。
以经典的只取 1 和 2 的石子的游戏来举例。
$SG(0)=0$ 必败态为 0
假设 B 点事 必胜态， 则寻找 B 的后继结点。eg ： $3 -> 1 or 2$ 如果后继结点都是 必胜态，则B 为必败态，否则B 为必胜态。
必胜态的值 SG 值为 mex { 后继所有点 }

SG 定理：
如果一个总的 ICG 游戏 （公平组合游戏），由若干个独立的 ICG 子游戏组成，那么 

$$
SG(总)=SG(分1)\oplus SG(分2)\oplus SG(分3)\oplus ……
$$


正确性证明参考nim游戏。

当数据过大的时候，可以用对数器打表，然后发现规律。


## 练习：

[P2148 [SDOI2009] E&D - 洛谷](https://www.luogu.com.cn/problem/P2148)
大意：
给定 2n 个石子，第 2k - 1 个 与 第 2k 个 形成一组，第 i 堆石子有 $a_i$ 个
每次选择一组中的一堆，先将这一堆移出去，再将剩下一堆中打出 x (x>0) 个石子形成新的一堆放到选择的堆上。
显而易见，要分割的情况下，必须大于等于 2 才行，当所有石子为 1 的时候，玩家无法进行游戏，则判定为失败。
求先手必胜吗？

思路：
结论：每组石子作为一个 ICG 游戏，a ， b 两堆。$f(x)$ 表示为 x 二进制下 0 的最低位的位置，$SG_{a, b} = f((a-1)|(b-1) + 1 )$ .

为什么？



Code：
打表：
```cpp
vii f(107,vi(107,0));
void init()
{
    f[1][1]=0;
    rep(j,1,100)
    {
        rep(i,1,j)
        {
            set<int> pp;
            rep(k,1,i-1)pp.insert(f[min(k,i-k)][max(k,i-k)]);
            rep(k,1,j-1)pp.insert(f[min(k,j-k)][max(j-k,k)]);
            int id=0;
            for(auto x:pp)
            {
                if(id!=x)break;
                else ++id;
            }
            f[i][j]=id;
        }
    }
}
void solve() // ll
{
    cout<<"     ";
    rep(i,1,10) cout<<i-1<<" \n"[i==10];
    cout<<endl;
    rep(i,1,10)
    {
        cout<<i-1<<"    ";
        rep(j,1,10)
        {
            if(j<i) {cout<<"X ";continue;}
            cout<<f[i][j]<<" \n"[j==10];
        }
    }
}
```
answer：
```cpp
void solve() // ll
{
    int n;cin>>n;
    int s=0,t;
    rep(i,1,n/2)
    {
        int a,b;cin>>a>>b;
        a--,b--;
        int d=a|b;
        int cn=__lg(lowbit(d+1));
        s^=cn;
    }
    cout<<(s?"YES\n":"NO\n");
}
```
