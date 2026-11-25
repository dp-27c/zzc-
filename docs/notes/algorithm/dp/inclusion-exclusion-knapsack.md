---
title: "背包（容斥原理优化）"
algorithms: []
sidebarOutline: true
---

# 背包（容斥原理优化）

## 求交集合并

题目：[P1450 [HAOI2008] 硬币购物 - 洛谷](https://www.luogu.com.cn/problem/P1450)
大意：

待补图片（Pasted image 20250817143653.png）

待补图片（Pasted image 20250817143718.png）

如果我们用多重背包去做
就算用了复杂的单调队列优化 $O(4sn)$ 4e8的时间很容易爆炸
思路：
如何做呢？考虑到硬币种类少，且n的数量超过一千的情况，且s的范围小于 1e5
我们先考虑数量无穷的情况下，做完全背包得到 `f[i]` 获得价值为 i 的方案总数
然后每次取买东西，单独计算不合法的情况，即减去选择第 $i$ 种物品的数量 $>d_i$ 的所有方案总数：
这个时候就要用到容斥原理了。
注意，假如第 $i$ 种硬币数量超过限制，容斥时就要减去 $f_{i-c_i\cdot(d_i+1)}$（因为是完全背包，所以包含了所有 $d_{i+2},d_{i+3},\ldots$）。
其他种的硬币不合法叠加到 $c_i\cdot(d_i+1)$ 上就好了

```cpp
void solve() // ll !
{
    int c[4],d[4],s,n;cin>>c[0]>>c[1]>>c[2]>>c[3]>>n;
    vi f(1e5+7,0);
    f[0]=1;
    rep(i,0,3)
    {
        rep(j,c[i],1e5)
        {
            f[j]+=f[j-c[i]];
        }
    }
    rep(i,1,n)
    {
        cin>>d[0]>>d[1]>>d[2]>>d[3]>>s;
        LL res=0;
        for(int i=1;i<(1<<4);++i)
        {
            LL t=0,sign=-1;
            for(int j=0;j<4;++j)
            {
                if(i&(1<<j))
                {
                    t+=c[j]*(d[j]+1);
                    //t= …… 这是状态转移，对于并集的状态
                    sign=-sign;
                }
            }
            if(s>=t) res+=sign*f[s-t];
            // res的处理
        }
        cout<<f[s]-res<<endl;
    }

}
```
