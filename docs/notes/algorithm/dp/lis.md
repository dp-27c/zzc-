---
title: "最长上升子序列（时间优化）"
algorithms: []
sidebarOutline: true
---

# 最长上升子序列（时间优化）

$$
\frac{2^{13}}{2}\sum
$$

[acwing视频讲解](https://www.acwing.com/video/2942/)
[题目](https://www.acwing.com/problem/content/3513/)

首先 将 最长公共子序列问题  -> 最长上升子序列问题
（必须保持两个序列有一个是元素不重复的序列）
对于 $O(n^2)$ 的问题就自己去找吧，我们考虑如何优化到 $O(n\log n)$

![公共子序列映射为上升下标序列的示意图](../../../assets/note-images/Pasted%20image%2020250719205557.png){width=1822 height=1103}

我们来看，在原来的dp中，对于所有以i结尾的公共序列中最长的寻找过程（`%% for(j,1,i)  dp[i]=max((条件?dp[j]+1:0)) %%`）转换为 在数组 P  （`P[k]` ： 长度为k的所有公共序列中末尾元素最靠后的位置） 中二分出` dp[i]`，同时更新数组P；
**证明： 数组 P 在遍历过程中满足单调递增！**
求最长上升子序列优化 $O(n\log n)$

```cpp
void solve()
{
    int n;cin>>n;
    vi idx(1e6+7,0);rep(i,1,n){int x;cin>>x;idx[x]=i;}
    vi c(n+1);rep(i,1,n){int x;cin>>x;c[i]=idx[x];}
    vi p;
    int ans=0;
    rep(i,1,n)
    {
        if(c[i])
        {
            if(p.empty()||c[i]>p.back()){p.push_back(c[i]);continue;}
            int id=lower_bound(p.begin(),p.end(),c[i])-p.begin();
            p[id]=c[i];
        }
    }
    cout<<p.size()<<endl;
}
```
