---
title: "bitset 综合运用"
algorithms: []
sidebarOutline: true
---

# bitset 综合运用

## 求共1三元组：
[G - Triangle](https://atcoder.jp/contests/abc258/tasks/abc258_g)
大意：
给定n x n 的矩阵.满足 无向图的 邻接矩阵 。
即：(i, i) 位置永远是 0 ，如果(i, j)为 1 ，那么(j, i) 一定为1，对于 i 和 j 小于等于 n 成立。
求三元组 (i, j, k) 的数量，满足 i < j < k ，(i, j) & (j, k) &(i, k) = 1 。

思路：
将n x n的图用 数组 `bitset bt` 存储，然后枚举 j ，k如果 (j, k) 为 1 ，那么贡献为 j 对应的bt 和 k 对应的 bt 前 j - 1 位进行与操作后，得到的 bt 的1 的个数。

每次加上权值就可以跑了，最大值为 $C_{3000}^{3}$ 会爆 int ，注意开 long long 。

代码：

```cpp
void solve() // ll
{
    int n;cin>>n;
    vector<bitset<N>> bt(n);n--;
    rep(i,0,n)
    {
        string s;cin>>s;
        rep(j,0,n) bt[i][j]=(s[j]-'0'?1:0);
    }
    int ans=0;
    rep(k,2,n)
    {
        rep(j,0,k-1)
        {
            if(bt[j][k])
            {
                ans+=((bt[j]<<(N-j))&(bt[k]<<(N-j))).count();
            }
        }
    }
    cout<<ans<<endl;
}
```

## bitset 或运算
[Problem - L - Codeforces](https://codeforces.com/gym/105129/problem/L)

大意：
给定长度为数组的 a，求一个最小的数 m 使得 对于所有 $a_i$ 来说 $gcd(a_i,m)>1$
n<1e6 , $2<a_i<50$

思路：
首先 $a_i<50$ ,对于这题来说可以直接看成是 2 到 50 这些数字。
为了寻找 m ，我们将每个数字进行质因数分解，从2 到 50 个数字里面寻找 质因子乘积的组合。
那是不是我们选择2 到 50 的质因子不同组合在一起就是 m 了。
因为满足最小，你可能在思考贪心，但是啊，我们还需要知道 质因子的分配，因为可能有很多数都共用了一个同样的质因子，选择这个质因子可以让更多的数 满足条件 所以贪心最小的方法是不对的。

我们考虑暴力，因为2 到 50 个质数一共有 15 个，如果我们暴力所有组合，也只要花费 $2^{15}$ 。
我们维护一个元素为 bitset 的数组给这个 15 个质数，对于每个数 $a_i$ ,分解的质因子会 多一个贡献，即选择这个质因子，这个位置会合法，所以我们在这个质因子的bitset 里面  i 这个位置设置为 1。

然后枚举所有组合，将他们的bitset 异或起来，只要最后 1 的个数 等于，a 的元素个数 就说明这个组合是合法的，然后比较最小就好了。

Code:

```cpp
// 插入一个分解质因数的板子
void solve() // ll
{
    int n;cin>>n;
    map<int,int> mp;
    rep(i,1,n) 
    {
        int x;cin>>x;mp[x]=1;
    }
    vi a;
    vector<bitset<51>> f(16);
    for(auto x:mp) a.push_back(x.first);
    for(int i=0;i<a.size();++i)
    {
        int x=a[i];
        set<int> st;
        while(x!=1)
        {
            st.insert(vis[x]);
            x/=vis[x];
        }
        for(auto v:st) f[pn[v]].set(i);
    }
    int ans=INT_FAST64_MAX;
    for(int i=0;i<(1LL<<15);++i)
    {
        bitset<51> tl;
        bitset<51> id(i);
        int tool=1;
        for(int j=0;j<15;++j) 
        {
            if(id[j])
            {
                tl|=f[j];
                tool*=pri[j];
            }
        }
        if(tl.count()==a.size()) ans=min(ans,tool);
    }
    cout<<ans<<endl;
}
```
