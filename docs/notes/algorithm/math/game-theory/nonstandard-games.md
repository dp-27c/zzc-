---
title: "非典型博弈类问题"
algorithms: []
sidebarOutline: true
---

# 非典型博弈类问题


## 贪心博弈（cf 2000）

[Problem - 388C - Codeforces](https://codeforces.com/problemset/problem/388/C)
大意：
给定 n 堆牌，每堆牌有 $S_i$ 张牌，每个牌都有对应的权值。
小 A 和小 B 轮流操作，小 A 先手。
轮到 小 A 的时候，从牌堆顶部摸一张。
轮到 小 B 的时候，从牌堆底部模一张。
问：双方都想让自己的摸到的牌的权值最大，问最后 小A 和小B 总分 分别是多少？

思路：
这道题其实和 SG 没关系，是一个纯策略性 博弈问题。
首先我们考虑所有堆都是偶数的情况。

这种情况，最终的结局一定是小A 拿每堆牌的前一半，小 B 拿每堆牌的后一半。
为什么？
因为如果小A 有比这种策略更高的比分，因为所有牌的总分是一样的，如果小A 的比分变多了，那么小 B 的比分最后一定会减少的。
小 A 想通过策略拿到 后一半的牌，小B 就会相应的拿走那一堆底部的牌，使得小A 想要的牌最后一定会被小 B 拿走。
小B 的对应策略同理。

那么假如存在奇数牌 堆。
那么就中间的牌归谁而言，如果只有一堆奇数堆，那么一定是归小A 所属，因为先手。但是两堆奇数牌堆，会因为小A 拿过一次奇数牌堆的牌，而让小 B 最后优先拿到中间的牌。
所以 将中间的牌按照权值排序，从大到小，小 A  和 小 B 轮流 拿走中间牌就行了。

Code：
```cpp
void solve() // ll
{
    int n;cin>>n;
    vi a;
    int s1=0,s2=0;
    rep(i,1,n)
    {
        int m;cin>>m;
        if(m&1)
        {
            rep(j,1,m)
            {
                int x;cin>>x;
                if(j<(m+1)/2) s1+=x;
                else if(j>(m+1)/2) s2+=x;
                else a.push_back(x);
            }
        }
        else 
        {
            rep(j,1,m)
            {
                int x;cin>>x;
                if(j<=m/2) s1+=x;
                else s2+=x;
            }
        }
    }
    sort(a.begin(),a.end(),greater<int>());
    if(a.size()) 
    {
        rep(i,0,a.size()-1)
        {
            if(i&1) s2+=a[i];
            else s1+=a[i];
        }
    }
    cout<<s1<<" "<<s2<<endl;
}
```
