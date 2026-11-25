---
title: "单调子序列问题"
algorithms: []
sidebarOutline: true
---

# 单调子序列问题


## LIS 最小划分：

一个由 n 个数组成的数组，将他们分成多个上升子序列，求最小能划分成多少位。
思路：
（贪心法） 记录第i个子序列的末尾值为 `d[i]` ，然后 对于 第 i + 1 的数，枚举每个前面已经存在的子序列的末尾值，找到小于它自己并且满足最大的子序列末尾，插入到这个子序列上，并更新这个子序列的末尾最大值。
如果没找到，则新建一个子序列以 `a[i+1]` 为末尾的子序列。
时间复杂度最大为 $O(n^2)$ 


## Dilworth 定理


### 概要：

*原链的最长长度 = 反链划分数的最小值*

反链：
 单调递增的子序列  $\longleftrightarrow$  非严格单调减子序列（单调不增）
 单调递减的子序列  $\longleftrightarrow$  非严格单调增子序列（单调不减）

这是求最长 LIS 问题的$O(nlogn)$ 优化。
实际上就是贪心的求出 非严格单调递减子序列 的 最小划分。
```cpp
void solve() // ll
{
    int n;cin>>n;
    vi a(n+1,0),idx(n+1,INF);
    rep(i,1,n) cin>>a[i];
    rep(i,1,n) *lower_bound(idx.begin(),idx.end(),a[i])=a[i];
    cout<<(lower_bound(idx.begin(),idx.end(),INF)-idx.begin())<<endl;
}
```


### 总结：

对于 最小划分数 ，有：
最后的个数(cnt)都是 `lower_bound`
非严格递减子序列： `lower_bound`  转移。
严格递减子序列：`upper_bound` 转移。

非严格上升子序列：所有数取相反数后，`lower_bound` 转移。
严格上升子序列：所有数取相反数后，`upper_bound` 转移。

放入的位置可以理解为，以`a[i]`为结尾的最长合法序列，位置为其长度。

### 练习：


#### 严格递增的子序列最小划分

[P1020 [NOIP 1999 提高组] 导弹拦截 - 洛谷](https://www.luogu.com.cn/problem/P1020)
大意：
求最长非严格递减子序列和非严格递减子序列的最小划分

思路：
Dilworth 定理转成：
严格递增子序列和非严格递减子序列的最小划分。
$O(nlogn)$

Code:
```cpp
void solve() // ll
{
    vi a;
    int h;
    while(cin>>h) a.push_back(h);
    int n=a.size();
    vi idup(n,INF),idlow(n,INF);
    rep(i,0,n-1)
    {
        *upper_bound(idup.begin(),idup.end(),-a[i])=-a[i];
        *lower_bound(idlow.begin(),idlow.end(),a[i])=a[i];
    }
    cout<<(lower_bound(idup.begin(),idup.end(),INF)-idup.begin())<<endl;
    cout<<(lower_bound(idlow.begin(),idlow.end(),INF)-idlow.begin())<<endl;

}
```


#### 滑动窗口+后缀最小划分+长度合并

[P8776 [蓝桥杯 2022 省 A] 最长不下降子序列 - 洛谷](https://www.luogu.com.cn/problem/P8776)
大意：
给定一个长度为 N 的整数序列：$A1​,A2​,⋯,AN$​。现在你有一次机会，将其中连续的 K 个数修改成任意一个相同值。请你计算如何修改可以使修改后的数列的最长不下降子序列最长，请输出这个最长的长度。
n<1e5

思路：
如果转换成最小划分问题，求数组 递减子序列的最小划分。
发现可以对那k个连续的位置贪心为最大，这样就可以贪心最大的最小划分，贡献拉满。
所以我们需要枚举每一种窗口的位置，判断此时最小划分为多少。

如果n<2000，那么这个$O(lognn^2)$ 的时间复杂度是要爆炸的。

发现前缀的递减最小划分，可以通过保留每个位置的放入子序列数组的路径来用滑动窗口做逆操作。
此时我们考虑后缀，发现对于从后往前，相当于统计最长不上升子序列的值。于是维护最小严格上升的后缀数组。

每次保留原来的基础上，思考如何做拼接：
因为每次窗口移动，相当于只考虑窗口边界的两个元素。窗口边界l，r，窗口向左移动。
前缀子序列数组直接逆操作（l-1）后，对`a[r]`元素处理。
试着将`a[r]`放入前缀和后缀的两个数组，然后对改变的两个位置就是`a[r]`影响的最优子序列，长度拼接后减去 `a[r]`多的这个1
就是含`a[r]`的最优子序列。
（因为划分数组`idx[i]`放入 v ，可以看成以v结尾的最长子序列的长度为i）

时间复杂度：$O(nlogn)$

Code：
```cpp
void solve() // ll
{
    int n,k;cin>>n>>k;
    vi a(n+1,0);
    rep(i,1,n)cin>>a[i];
    vi idlow(n+2,INF),idup(n+2,INF);
    vector<pii> idx(n+1);
    rep(i,1,n-k)
    {
        int uid=upper_bound(idlow.begin(),idlow.end(),a[i])-idlow.begin();
        idx[i]={uid,idlow[uid]};
        idlow[uid]=a[i];
    }
    int ans=lower_bound(idlow.begin(),idlow.end(),INF)-idlow.begin();
    for(int i=n-k,j=n;i>0;i--,j--)
    {
        int pid=upper_bound(idup.begin(),idup.end(),-a[j])-idup.begin();
        idup[pid]=-a[j];
        idlow[idx[i].first]=idx[i].second;
        int uid=upper_bound(idlow.begin(),idlow.end(),a[j])-idlow.begin();
        ans=max(ans,uid+pid+1);
    }
    cout<<ans+k<<endl;
}
```
