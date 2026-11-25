---
title: "字符串哈希（数学色彩）"
algorithms: []
sidebarOutline: true
---

# 字符串哈希（数学色彩）


## 先来一道板题：

[E - Shift String](https://atcoder.jp/contests/abc430/tasks/abc430_e)
大意：
给定 两个  01 子串 s1 和 s2 。
每次操作可以将 s1 的首元素放到末尾。
问最少操作几次可以使得 s1 和 s2 相等？或告知不会相等

思路：
用字符串哈希的方法
选定 质数 p =  131
模数 mod = 1e9 + 7


$$
Hash(s1)=\sum_{i=0}^{n-1}s_i \times p^i
$$


求出 s1 和 s2 的哈希值，然后每次操作
相当与减去一个 $p^0$ 的权值
再整体 除以p
加上一个 $p^{n-1}$ 的权值。
时间复杂度为 $O(n + n)$ 第一次计算哈希值和n次转移。
判断相等的一个方法，或者特征相同
Code:
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
const int x=131;//
void solve() // ll
{
    string s1,s2;cin>>s1>>s2;

    int n=s1.size();
    int t1=0,t2=0;
    rep(i,0,n-1) 
    {
        if(s1[i]=='1')t1=(t1+ksm(x,n-1-i,mod))%mod;
        if(s2[i]=='1')t2=(t2+ksm(x,n-1-i,mod))%mod; 
    }
    int w=ksm(x,n-1,mod);
    if(t1==t2){cout<<0<<endl;return;}
    rep(i,0,n-1)
    {
        t1=((t1-(s1[i]=='1'?w:0))*x)+(s1[i]=='1'?1:0);
        t1=((t1%mod)+mod)%mod;
        if(t1==t2) 
        {
            cout<<i+1<<endl;return;
        }
    }
    cout<<-1<<endl;
}
```
