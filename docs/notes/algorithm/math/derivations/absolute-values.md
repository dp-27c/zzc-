---
title: "公式化简，双指针处理绝对值"
algorithms: []
sidebarOutline: true
---

# 公式化简，双指针处理绝对值

## [F. Unjust Binary Life](https://codeforces.com/contest/2131/problem/F)

这思路没谁了好吧

大意：
 尤里得到两个二进制字符串 a 和 b ，它们的长度都是 n 。这两个字符串动态地定义了一个 `n×n` 网格。让 (i,j) 表示 i \第一行和 j \第列中的单元格。单元格 (i,j) 的初始值为 $ai⊕bj$ ，其中 ⊕ 表示按位异或操作。
尤里的旅程总是从牢房 (1,1) 开始。从单元格 (i,j) ，她只能向下移动到 (i+1,j) 或向右移动到 (i,j+1) 。如果存在一条有效的路径，使得路径上的所有单元格(包括 (1,1) )的值都为0，那么她的旅程是可能的。
在她离开之前，她可以做任意次数的以下操作：
1. —选择一个索引 $1≤i≤n$ ，翻转 ai 或 bi 的值( 0 变为 1 ， 1 变为 0 )。网格也会相应改变。
2. 让 `f(x,y)` 表示所需的最小操作，以便Yuri能够前往单元格 `(x,y)` 。您必须确定 `f(x,y)` 对所有 1≤x,y≤n 的**和**。

思路：
1. 对于这样的01异或最短路，我们需要先知道，到达位置`(i,j)`的最短路其实是 `min(a 的前i 个数的 1(0)的数量 + b的前 j 个 1(0) 的数量)

2. 这样我们就得到了 $ans = \sum min(cn1_i[0]+cn2_j[0] , cn1_i[1]+cn2_j[1])$
二维枚举会爆炸 $O(n^2)$ 。

3. 所以我们要化简公式， 根据min 的转化公式 -> $min(u,v)==\displaystyle\frac{u+v-|u-v|}{2}$

4. 对于 $u + v$来说，我们是好求的 ，在本题 $\sum u+v = n*n*(n+1)$

5. 绝对值怎么办呢？

6. 化简 $\sum |cn1_i[0]+cn2_j[0] - cn1_i[1] - cn2_j[1]|$   --> $\sum |(cn1_i[0] - cn1_i[1]) - (cn2_j[1] - cn2_j[0])|$

7. 然后设新数组处理对应的 $cn1_i[0] - cn1_i[1]$  ,对两个排序后，双指针+加前缀和维护一下，具体看代码！！
```cpp
vii mp;
void add(int u,int v)
{
    mp[u].push_back(v);
}
void solve() // ll !
{
    int n;cin>>n;
    string s1,s2;
    cin>>s1>>s2;
    s1="*"+s1,s2="*"+s2;
    vii cn1(n+1,vi(2,0));
    vii cn2(n+1,vi(2,0));
    rep(i,1,n) 
    {
        if(i)
        {
            cn1[i][0]=cn1[i-1][0];
            cn1[i][1]=cn1[i-1][1];
            cn2[i][1]=cn2[i-1][1];
            cn2[i][0]=cn2[i-1][0];
        }
        if(s1[i]=='0') 
        {
            cn1[i][0]++;
        }
        else cn1[i][1]++;
        if(s2[i]=='0')
        {
            cn2[i][0]++;
        }
        else cn2[i][1]++;
    }
    vi p1(n+1,0),p2(n+1,0);
    int ans=0,cc=0;
    ans+=n*n*(n+1)/2;
    rep(i,1,n)
    {
        p1[i]=cn1[i][1]-cn1[i][0];
        p2[i]=cn2[i][0]-cn2[i][1];
    }
    sort(p1.begin()+1,p1.end());
    sort(p2.begin()+1,p2.end());
    vi sum2(n+1,0);
    rep(i,1,n) sum2[i]=p2[i]+sum2[i-1];
    int cur=1;
    rep(i,1,n)
    {
        while(p1[i]>p2[cur]&&cur<=n)
        {
            cur++;
        }
        cc+=(cur-1)*p1[i]-sum2[cur-1];
        cc+=(sum2[n]-sum2[cur-1])-(n-cur+1)*p1[i];
    }
    cout<<ans-cc/2<<endl;
}
```
