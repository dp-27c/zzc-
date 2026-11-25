---
title: "树状数组上倍增求第 k 大的值"
algorithms: []
sidebarOutline: true
---

# 树状数组上倍增求第 k 大的值

[P3369 【模板】普通平衡树 - 洛谷](https://www.luogu.com.cn/problem/P3369)
大意不需要知道，你只要知道，你要做到求出 用树状数组维护 的数据 内 找到第 k 大的值是多少？

```cpp
    int kth(int k)
    {
        int sum=0,x=0;
        for(int i=log2(n);~i;--i)
        {
            x+=1LL<<i;
            if(x>=n||sum+tr[x]>=k) x-=1LL<<i;
            else sum+=tr[x];
        }
        return x+1;
    }
```

[树状数组 - OI Wiki](https://oi-wiki.org/ds/fenwick/#%E5%8D%95%E7%82%B9%E4%BF%AE%E6%94%B9%E6%9F%A5%E8%AF%A2%E5%85%A8%E5%B1%80%E7%AC%AC-k-%E5%B0%8F)
查看 oi wiki 里的解释。
