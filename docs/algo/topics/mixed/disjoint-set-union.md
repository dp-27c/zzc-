---
title: 并查集
sidebarOutline: true
---

# 并查集


```cpp
int b[N];//,cn[N];
int findd(int id)
{
    return b[id]=(b[id]==id?id:findd(b[id]));
}
void add(int x,int y)
{
    x=findd(x),y=findd(y);
    if(x==y) return;
    b[y]=x;
    //cn[x]+=cn[y];
}
```


## 并查集+转接桥：


```cpp
ge[i]表示第i个鸽子送去的box编号，box[i]表示第第i个box归属者的编号，man[i]表示第i个人拥有的box编号
将问题看成鸽子送信，鸽子只需要送到固定的box里，人去取对应的box拿信 
```
