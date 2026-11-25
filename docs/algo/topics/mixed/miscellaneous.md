---
title: 杂项板
sidebarOutline: true
---

# 杂项板

## 自定义比较器：

给出例子：

```cpp
    function<bool(Point,Point)> cmp=[&](Point a,Point b) -> bool
    {// 用 两点分别于起始点连线，判断是否逆时针旋转，如果同一条直线则按照距离升序
        ld d=cross(a-pp[1],b-pp[1]);
        if(fabs(d)>eps) return d>0;
        else return P_d(pp[1],a)<P_d(pp[1],b);
    };
    sort(pp.begin()+1,pp.end(),cmp);
```
