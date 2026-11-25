---
title: 直线模板
algorithms: []
sidebarOutline: true
---

# 直线模板

## line
```cpp
struct line{
    Point s,e;
}; 
ld angle(line a)// 极角序 (-PI,PI],斜率转角度
{
    return atan2(a.e.y-a.s.y,a.e.x-a.s.x);
}
bool cmp_angle(line a,line b)// 按照极角 + 左侧排序
{
    ld A=angle(a),B=angle(b);
    return fabs(A-B)>eps?A<B:cross_2(a.s,a.e,b.e)<0;
}
Point getNode(line a,line b)// 找到 a 和 b 的交点
{
    return getNode(a.s,a.e,b.s,b.e);
}
bool Right(line a,line b,line c)// 判断 b，c的交点是否在直线a的右侧(顺时针)
{
    Point p=getNode(b,c);
    return cross_2(a.s,a.e,p)<0;
}
Point norm_P(Point a)// 单位向量
{
    return a/P_len(a);
}
ld P_segment_d(Point u,Point st,Point ed)// 点 u 到线段 st-ed 的最小距离
{
    Point Vt=norm_P(rotate(ed-st,PI/2));
    Point v=u+Vt;
    Point H=getNode(u,v,st,ed);
    if(dot(st-H,ed-H)<=0) return P_d(u,H);
    else return min(P_d(u,st),P_d(u,ed));
}
```
