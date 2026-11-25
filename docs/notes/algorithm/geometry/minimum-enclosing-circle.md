---
title: 最小圆覆盖
algorithms: []
sidebarOutline: true
---

# 最小圆覆盖

解决问题：
给出 n 个点 ，求一个半径最小的圆来包含住所有点。

## 随机增量法：
 这个算法的本质是将 上一个状态 可以解决的 问题加入当前对象判断是否可以解决问题。

递归方程：$T(n)=T(n-1)+g(n)$

这种算法通常要结合随机化 ，这样可以避免最坏的情况发生 。
算法的时间复杂度 接近 $O(n)$

### 算法流程：
1. 假设圆 O 是前 i - 1 个点的最小覆盖圆，加入第 i 个点，如果在 圆内 则不动。
否则则 以第 i 个点 为基础去找满足前 i 个的 最小覆盖圆。
2. 以 第 i 个点为基础，找到 第 j 个点形成的圆。
3. 以 第 i j 形成的圆为基础，加入 第 k 个点 。不在 i j 的圆内则要以 i j k 为基础的三个圆作为圆。
4. 这里的 k j 都是 前 i 个点的判断， 2 , 3 步骤都是在1步骤的结尾进行。
### 代码：
[P1742 最小圆覆盖 - 洛谷](https://www.luogu.com.cn/problem/P1742)
```cpp
struct circle{Point ox;ld r;};
circle circle_cover_p(Point a,Point b)//两点覆盖圆
{return {Point((a.x+b.x)/2,(a.y+b.y)/2),P_d(a,b)/2};}
circle circle_cover_p(const Point &a, const Point &b, const Point &c) {
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
circle increment(vector<Point> pp,int n)// 随机增量法，用前记得随机排序 pp 数组
{
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
void solve() // ll ld
{
    int n;cin>>n;
    vector<Point> pp(n+1);
    rep(i,1,n)
    {
        cin>>pp[i].x>>pp[i].y;
    }
    std::random_device rd;
    std::mt19937 g(rd());
    shuffle(pp.begin()+1,pp.end(),g);
    circle C=increment(pp,n);
    cout<<fixed<<setprecision(10)<< (double) C.r<<endl;
    cout<<fixed<<setprecision(10)<< (double) C.ox.x<<" ";
    cout<<fixed<<setprecision(10)<< (double) C.ox.y<<endl;
}
```