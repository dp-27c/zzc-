---
title: 点线关系
sidebarOutline: true
---

# 点线关系

```cpp
const double PI=acos(-1);
// const double PI = 3.141592653589793;
struct Point
{
    ld x,y;
    Point(ld tx=0,ld ty=0):x(tx),y(ty){};
    // const bool operator<(const Point &other) const{
    //     return fabs(x-other.x)<eps?y<other.y:x<other.x;
    // }
};
Point operator+(Point a,Point b)
{
    return Point(a.x+b.x,a.y+b.y);
}
Point operator-(Point a,Point b)
{
    return Point(a.x-b.x,a.y-b.y);
}
Point operator*(Point a,ld c)
{
    return Point(a.x*c,a.y*c);
}
Point operator/(Point a,ld c)
{
    return Point(a.x/c,a.y/c);
}
ld dot(Point a,Point b)//点积 dot = a . b
{
    return a.x*b.x+a.y*b.y;
}
ld P_len(Point a)// 求模长
{
    return sqrt(a.x*a.x+a.y*a.y);
}
ld  angle(Point a,Point b)// 求夹角
{
    return acos(dot(a,b)/(P_len(a)*P_len(b)));
}
ld cross(Point a,Point b)//叉积 求有向平行四边形面积，b 在 a 的逆时针方向为 正
{
    return a.x*b.y-a.y*b.x;
}
ld cross_2(Point a,Point b,Point c)// 以 a 为起点，ab 与 ac 之间进行叉积运算
{
    Point x=b-a;
    Point y=c-a;
    return cross(x,y);
}
ld P_d(Point a,Point b)// 
{
    return sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}
Point getNode(Point a,Point b,Point c,Point d) // 返回 直线与直线的交点
{
    ld fm=cross((b-a),(d-c));// 小心等于 0
    if(fabs(fm)<eps)// 如果为0，平行或者重合的情况
    {
        ld mx=0;
        Point p1,p2;
        if(P_d(a,c)>mx) mx=P_d(a,c),p1=a,p2=c;
        if(P_d(a,d)>mx) mx=P_d(a,d),p1=a,p2=d;
        if(P_d(b,c)>mx) mx=P_d(b,c),p1=b,p2=c;
        if(P_d(b,d)>mx) mx=P_d(b,d),p1=b,p2=d;
        return {(p1.x+p2.x)/2,(p1.y+p2.y)/2};// 重合取最大距离的中点
    }
    ld t=(cross(c-a,d-c)/fm);
    return a+(b-a)*t;
}
Point rotate(Point A,ld theta) // 返回 逆转角度 theta 后的点
{ // 顺时针旋转只要 将 theta 变成 - theta 即可
    return Point(A.x*cos(theta)-A.y*sin(theta),A.x*sin(theta)+A.y*cos(theta));
}
```
