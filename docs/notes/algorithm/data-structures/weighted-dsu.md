---
title: "带权并查集"
algorithms: [dsu]
sidebarOutline: true
---

# 带权并查集

作用：
可以求出相同集合内，点与点的关系。

模板：（求距离）

```cpp
int b[N],d[N];
void init(int n){rep(i,1,n) b[i]=i;}
int find(int u)
{
    if(u==b[u]) return u;
    find(b[u]),d[u]+=d[b[u]];
    return b[u]=b[b[u]];
};
void link(int u,int v,int w)
{
    int fu=find(u),fv=find(v);
    b[fu]=fv,d[fu]=d[v]+w-d[u];
}
int query(int u,int v) // u -> v
{
    if(find(u)!=find(v)) return INF;
    return d[u] - d[v];
}
```
