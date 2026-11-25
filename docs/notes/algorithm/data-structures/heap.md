---
title: "堆"
algorithms: []
sidebarOutline: true
---

# 堆

## 配对堆：

和普通堆的区别在于 可以使用 join 函数 达成 堆合并，时间复杂度为 log 级别

```cpp
// 使用说明：

#include <ext/pb_ds/priority_queue.hpp> // 引入 PBDS 的优先队列 // 这句话不能放在 #define int ll 后，会导致后续污染 

using namespace std;
using namespace __gnu_pbds;

// 默认底层实现是配对堆 (pairing_heap_tag)，合并的时间复杂度是 O(1)
typedef __gnu_pbds::priority_queue<int> pbds_pq;  // 可以把 int 变成 pair<int,int> ； 

int main() {
    pbds_pq pq1, pq2;

    pq1.push(1);
    pq1.push(5);

    pq2.push(2);
    pq2.push(9);

    // 将 pq2 合并进 pq1 中
    // 合并后，pq2 会被清空，所有元素转移到 pq1 中
    pq1.join(pq2);

    cout << "pq1 size: " << pq1.size() << endl; // 输出 4
    cout << "pq1 top: " << pq1.top() << endl;   // 输出 9
    cout << "pq2 size: " << pq2.size() << endl; // 输出 0

    return 0;
}

```

## 左偏树：
可以用于处理 堆的合并 以及 堆内定向删除等维护。

### 代码模板：

```cpp
int a[N],fa[N],ls[N],rs[N],d[N],up[N];
void init(int n)
{
    d[0]=-1;
    for(int i=1;i<=n;++i) fa[i]=i,up[i]=ls[i]=rs[i]=d[i]=0,cn[i]=1,sum[i]=0;
}
int find(int x){return x?fa[x]=(fa[x]==x?x:find(fa[x])):0;};
int merge(int i,int j)
{
    if(i==0||j==0) return i+j;// 和 空堆 合并

    if(a[i]>a[j]||(a[i]==a[j]&&i>j)) swap(i,j); 
    rs[i] = merge(rs[i],j);
    if(d[ls[i]]<d[rs[i]]) swap(ls[i],rs[i]);
    d[i]=d[rs[i]]+1;fa[ls[i]]=fa[rs[i]]=i;
    up[ls[i]]=i,up[rs[i]]=i;
    return i;
}
int pop(int i) // 
{
    fa[ls[i]]=ls[i],fa[rs[i]]=rs[i];
    fa[i]=merge(ls[i],rs[i]);
    up[fa[i]]=0;
    d[i]=-1,a[i]=up[i]=ls[i]=rs[i]=0;
    return fa[i];//返回的是 新头节点
}
void dmerge(int i)
{
    if(a[i] == 0) return; // 已经是 0 了就不用管
    int p = up[i];
    int st = merge(ls[i], rs[i]);
    if(st) up[st] = p;
    if(p) {
        // 1. 如果 i 不是它所在树的根节点
        if(ls[p] == i) ls[p] = st;
        else rs[p] = st;
        // 向上修复左偏树的 d 值属性
        int u = p;
        while(u) {
            if(d[ls[u]] < d[rs[u]]) swap(ls[u], rs[u]);
            if(d[u] == d[rs[u]] + 1) break; // 如果 d 值没变，可以提前 break 优化
            d[u] = d[rs[u]] + 1;
            u = up[u];
        }
        // 彻底清空 i 的状态，并重新塞回原来的集合
        a[i] = d[i] = ls[i] = rs[i] = up[i] = 0;
        // fa[i] = i; 
        // merge(find(p), i);// 重新塞回去的过程
    } else {
        // 2. 如果 i 本身就是根节点，其实就等价于 pop 之后再把 a[i]=0 塞回去
        if(st) fa[st] = st; // 让新根作为并查集代表
        a[i] = d[i] = ls[i] = rs[i] = up[i] = 0;
        // fa[i] = i;
        // merge(st, i); // 重新把变成 0 的 i 合并进去 (st为0也无妨，merge能处理)
    }
}
```
