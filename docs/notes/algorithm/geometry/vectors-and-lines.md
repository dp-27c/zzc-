---
title: 向量运算和点线关系
algorithms: []
sidebarOutline: true
---

# 向量运算和点线关系

## 重要概念和模版：
模版：
```cpp
const double PI=acos(-1);
// const double PI = 3.141592653589793;
struct Point
{
    ld x,y;
    Point(ld tx=0,ld ty=0):x(tx),y(ty){};
    const bool operator<(const Point &other) const{
        return fabs(x-other.x)<eps?y>other.y:x<other.x;
    }
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
ld cross(Point a,Point b)//叉积，b 在 a 的逆时针方向则大于 0 
{
    return a.x*b.y-a.y*b.x;
}
ld cross_2(Point a,Point b,Point c)// 以 a 为起点，ab 与 ac 之间进行叉积运算
{
    Point x=b-a;
    Point y=c-a;
    return cross(x,y);
}
ld P_d(Point a,Point b)
{
    return sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}
Point getNode(Point a,Point b,Point c,Point d) // 直线与直线的交点
{
    ld fm=cross((b-a),(d-c));// 小心等于 0
    ld t=(cross(c-a,d-c)/fm);
    return a+(b-a)*t;
}
Point rotate(Point A,ld theta)// 逆转角
{ // 顺时针旋转只要 将 theta 变成 - theta 即可
    return Point(A.x*cos(theta)-A.y*sin(theta),A.x*sin(theta)+A.y*cos(theta));
}
```
### 点积：
$\Large dot = a \cdot b=|a|\cdot |b| \cdot \cos\theta$
几何意义： 一个向量到另一个向量的投影乘上相邻长度。
可以解决：$dot = a \cdot b=|a|\cdot |b| \cdot \cos\theta$
1. 判断向量垂直：$dot = 0$
2. 判断向量平行： $dot = |a||b|$
3. 求夹角： $\cos = \frac{dot}{(|a||b|)}$
### 叉积：
$\Large a\times b=|a|\cdot|b|\sin\theta$
几何意义：向量a 与向量 b 张成的平行四边形的有向面积，b 在 a的逆时针为正，顺时针为 负
坐标运算：$a\times b=x_1y_2-y_1x_2$
可以解决 点线的位置关系
1. $(b-a)\times (c-a) > 0 \rightarrow c \text{点在直线ab的左侧}$
2. $(b-a) \times (c-a) < 0 \rightarrow c \text{点在直线ab的右侧}$
3. $(b-a)\times(c-a)=0\rightarrow \text{三点共线}$


![叉积符号区分点在有向直线的左侧和右侧](../../../assets/note-images/Pasted%20image%2020250922195646.png){width=1021 height=333}

可以解决 线线关系：
（直线 ab 与 线段 cd 之间的关系）
找到向量 ac, ad;
判断 ac ，ad 与 ab 直线的关系：
1. $cross(ac,ab) * cross(ad,ab) >0$ (直线ab与线段cd无交点)
2. $cross(ac,ab)*cross(ad,ab) \le 0$ (直线ab与线段cd有交点)

![用端点叉积判断直线与线段是否相交](../../../assets/note-images/Pasted%20image%2020250923162034.png){width=714 height=424}

3. 求两直线的交点：
利用叉积的比值


![利用叉积比值求两条直线交点](../../../assets/note-images/Pasted%20image%2020250924141735.png){width=595 height=294}


4. 线段与线段之间的交点（未完成）
