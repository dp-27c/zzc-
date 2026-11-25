---
title: 三角剖分，计算多边形和圆的面积
algorithms: []
sidebarOutline: true
---

# 三角剖分，计算多边形和圆的面积

## 计算步骤：
1. 多边形的每条边都与圆心构成三角形。
2. 算出每个三角形与圆的相交面积。
3. 根据有向面积的正负累加到答案中。

待补图片（Pasted image 20250927132942.png）

根据上图我们可以理解有向面积：
我们从 1 开始逆时针旋转枚举线段 => 
`<1,2>`,`<2,3>`,`<3,4>`,`<4,1>`
前面三个因为是后面的点在前面点的逆时针方向上，所以取正
最后`<4,1>`因为1在顺时针方向上，因此取负数。
另外一个例子：参考下图：

待补图片（Pasted image 20250927163504.png）


每个三角形和圆相交的面积分为5种
-  线段与圆心共线：0
- 线段完全在圆内：1个三角形的有向面积
- 线段完全在圆外：1个扇形的有效面积
- 线段一端在圆内：1个三角形的有向面积 + 1个扇形的有向面积
- 线段是圆的割线：1个三角形的有向面积 + 1个扇形的有向面积

待补图片（Pasted image 20250927135730.png）


代码（模版）：
```cpp
Point norm_P(Point a)// 单位向量
{
    return a/P_len(a);
}
ld sector_s(Point ox,Point a,Point b,ld R) //求一个扇形的面积
{//一个圆心和两个扇形边直线上的点.
    ld theta=angle(a-ox,b-ox);
    if(cross(a-ox,b-ox)<0) theta=-theta;
    return R*R*theta/2;
}
bool on_segment(Point p,Point a,Point b)
{
    return fabs(cross(a-p,b-p))<eps&&dot(a-p,b-p)<=0;
}
ld get_d_p2(Point ox,ld R,Point a,Point b,Point &pa,Point &pb)//求圆心到线段的距离和线段与圆心相交的点。
{
    Point e = getNode(a,b-a,ox,rotate(b-a,PI/2));
    ld ox_e=P_d(ox,e);
    ld d=ox_e;
    if(!on_segment(e,a,b)) d=min(P_d(ox,a),P_d(ox,b));//当垂足不在线上时，取最近的圆心到端点的距离。
    if(R<=d) return d;
    ld len=sqrt(R*R-ox_e*ox_e);
    pa=e+norm_P(a-b)*len;
    pb=e+norm_P(b-a)*len;
    return d;
}
ld getArea(Point ox,Point a,Point b,ld R)// 求一个线段与圆所截的有向面积
{
    a=a-ox,b=b-ox;
    if(fabs(cross(a,b))<eps) return 0;// 共线
    ld da=P_len(a),db=P_len(b);
    if(R>=da&&R>=db) return cross(a,b)/2;// 线在圆内
    Point pa,pb;
    ld d=get_d_p2({0,0},R,a,b,pa,pb);
    if(d>=R) return sector_s({0,0},a,b,R);// 线在圆外
    if(R>=da) return  cross(a,pb)/2+sector_s({0,0},pb,b,R); // a 在 圆内
    if(R>=db) return  sector_s({0,0},a,pa,R)+cross(pa,b)/2;// b 在 园内
    return sector_s({0,0},a,pa,R)+cross(pa,pb)/2+sector_s({0,0},pb,b,R);// ab 是割线
}
```
