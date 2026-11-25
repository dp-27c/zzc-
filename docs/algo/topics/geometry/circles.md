---
title: 圆关系
sidebarOutline: true
---

# 圆关系

```cpp
struct circle{Point ox;ld r;};

circle circle_cover_p(Point a,Point b)//两点覆盖圆
{return {Point((a.x+b.x)/2,(a.y+b.y)/2),P_d(a,b)/2};}

circle circle_cover_p(const Point &a, const Point &b, const Point &c) {// 求出 三个点在圆上的 圆
    // 这一步是利用 三点在圆上的线性方程组
    ld ax = a.x, ay = a.y;
    ld bx = b.x, by = b.y;
    ld cx = c.x, cy = c.y;
    ld d = 2.0 * (ax*(by - cy) + bx*(cy - ay) + cx*(ay - by));
    // 处理 三点共线的情况
    if (fabsl(d) < eps) {
        ld dab = P_d(a,b), dbc = P_d(b,c), dac = P_d(a,c);
        if (dab >= dbc && dab >= dac) return circle_cover_p(a,b);
        if (dbc >= dab && dbc >= dac) return circle_cover_p(b,c);
        return circle_cover_p(a,c);
    }
    // 反向求出 变量 ux 和 uy 
    ld aa = ax*ax + ay*ay;
    ld bb = bx*bx + by*by;
    ld cc = cx*cx + cy*cy;
    ld ux = (aa*(by - cy) + bb*(cy - ay) + cc*(ay - by)) / d;
    ld uy = (aa*(cx - bx) + bb*(ax - cx) + cc*(bx - ax)) / d;
    Point o(ux, uy);
    return {o, P_d(o, a)};
}

circle increment(vector<Point> pp,int n)// 最小圆覆盖，找到包含数组 pp 的最小覆盖圆，时间接近O(n)
{// 随机增量法，用前记得随机排序 pp 数组
    circle C={pp[1],0};
    rep(i,2,n)
    {
        if(C.r<P_d(pp[i],C.ox))// 单点判断 并 开启第二层循环判断
        {
            C={pp[i],0};
            rep(j,1,i-1)
            {
                if(C.r<P_d(pp[j],C.ox)) // 双点判断 并 开启 第三层循环
                {
                    C=circle_cover_p(pp[i],pp[j]);
                    for(int k=1;k<j;++k)
                    {
                        if(C.r<P_d(pp[k],C.ox))
                        {
                            C=circle_cover_p(pp[i],pp[j],pp[k]);
                        }
                    }
                }
            }
        }
    }
    return C;
}
```
