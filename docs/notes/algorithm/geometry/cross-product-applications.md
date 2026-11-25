---
title: 叉积应用
algorithms: []
sidebarOutline: true
---

# 叉积应用

## 最大覆盖半圆：
因为是 poj 的，导致代码很多识别不了， fw poj fw！
[Transmitters - POJ 1106 - Virtual Judge](https://vjudge.net/problem/POJ-1106)
大意：
给定 n 个点和 一个圆心 以及一个半径，求最大覆盖半圆的点的数量。

思路：
先把圆内的点保留下来，其他的舍去，然后我们枚举圆上的点，与圆心连接形成的一条直线，然后枚举圆上的点，统计在直线的左侧和右侧的点，最后取最大的一边。
判断点与线的位置关系可以用 叉积 来判断。
时间复杂度$O(n^2)$
代码：
```cpp
void solve() // ll
{
    ld sx,sy,r;
    while(cin>>sx>>sy>>r)
    {
        if(r<0) break;
        Point yuanx(sx,sy);
        int n;
        cin>>n;
        vector<Point> p;
        rep(i,1,n)
        {
            int x,y;cin>>x>>y;
            Point vp(x,y);
            ld d=P_d(vp,yuanx);
            if(d<=r) p.push_back(vp);
        }
        int ans=0;
        for(auto pp:p)
        {
            int cn1=0,cn2=0;
            Point tool=pp-yuanx;
            for(auto p2:p)
            {
                Point vp=p2-yuanx;
                ld x=cross(tool,vp);
                if(x>=0) cn1++;
                if(x<=0) cn2++;
            }
            ans=max(ans,cn1);
            ans=max(ans,cn2);
        }
        cout<<ans<<endl;
    }
}
```
## 点与平面三角形的关系
[P1355 神秘大三角 - 洛谷](https://www.luogu.com.cn/problem/P1355)
大意：
给定一个点和一个三角形的三个顶点的坐标，求出点与三角形的关系：
1. 点在三角形内 输出 1
2. 点在三角形外 输出 2
3. 点在边上       输出 3
4. 点在顶点上    输出 4
思路：

待补图片（CB43B40A9CA8FFA5151D5E7E1D7826F2.jpg）

如图所示：
- 如果在三角形内部，则点和其他三条边的关系和边对应的顶点都在同侧。
`cross(A,B,1) * cross(A,B,c) > 0`
- 如果在外面得分情况，复杂，之后考虑。
- 在边上，就会出现 有一条边的叉积为 0 ，但也会存在一个边 叉积关系 > 0,表示同侧，此时我们做叉积：
`s1=cross(A,B,C),s2=cross(A,B,3)` ,满足 s1>s2 则在边上
- 在顶点上 ，和上面一条一样，s1=s2 时，满足
- 沿着三角形边所在的直线上，不在边上的点也会触发第三条的前置条件，s1 < s2，满足在三角形外
- 剩下的`else`都是三角形外的点了。
代码：
```cpp
void solve() // ll
{
    Point a,b,c,p;
    char ch;
    auto inpt=[&](Point &x)
    {
        cin>>ch;cin>>x.x;cin>>ch;cin>>x.y;cin>>ch;
    };
    inpt(a);inpt(b);inpt(c);inpt(p);
    ld d[3];
    d[0]=cross(b-a,p-a)*cross(b-a,c-a);
    d[1]=cross(c-a,p-a)*cross(c-a,b-a);
    d[2]=cross(c-b,p-b)*cross(c-b,a-b);
    if(d[0]>0&&d[1]>0&&d[2]>0) 
    {
        cout<<1<<endl;
    }
    else if(d[0]*d[1]*d[2]==0)
    {
        rep(i,0,2)
        {
            if(d[i]>0)
            {
                Point dp;
                ld s1,s2;
                if(i==0)
                {
                    s1=cross(b-a,c-a);
                    s2=cross(b-a,p-a);
                }
                else if(i==1)
                {
                    s1=cross(c-a,b-a);
                    s2=cross(c-a,p-a);                    
                }
                else
                {
                    s1=cross(b-c,a-c);
                    s2=cross(b-c,p-c);                    
                }
                if(abs(s1)>abs(s2))
                {
                    cout<<3<<endl;
                }
                else if(abs(s1)==abs(s2)) cout<<4<<"\n";
                else cout<<2<<endl;
                return;
            }
        }
        cout<<2<<endl;
    }
    else cout<<2<<endl;
}
```
## 判断直线穿过所有线段
poj 3304
大意：
给出 n 个线段，判断是否有一条直线穿过 这 n 条线段。
思路：

待补图片（Pasted image 20250927083117.png）

如果存在这么一条直线，那么以这条直线作垂线，所有线段在这条垂线的投影都保证有交集。
我们试着将这条直线旋转，它会存在一个恰好经过两个不同线段的端点，此时若继续旋转，则不会满足交所有线段。
所以我们直接暴力枚举这些直线，任取两条线段，以线段 的端点形成的 四个不同的直线，枚举这四个直线。
对于一条直线，我们遍历所有线段，判断直线与线段是否有交点：
 $cross(ac,ab)*cross(ad,ab) \le 0$ (直线ab与线段cd有交点)

待补图片（Pasted image 20250927084103.png）

 这样的暴力搜索 时间复杂度为 $O(n^3)$
 
## 障碍物覆盖区间
poj 2074
大意：
平面上两个平行于 x轴的线段，给出 这 4个点和他们到x轴的距离
有 n 个线段为障碍物，求如果只能站在上线段的两个端点处观察，求能观察到的区域长度。
思路：

待补图片（Pasted image 20250926202019.png）

对于一个障碍物来说，用观察点分别作障碍物的直线，交下线段的直线有两个交点，形成了一个区间。两个观察点的对应区间取交集就是看不见的区间。
将这些区间按照左端点排序，枚举区间的覆盖范围，最后用下线段总长减去就好了
## 直线穿一半点
[AT_abc422_e [ABC422E] Colinear - 洛谷](https://www.luogu.com.cn/problem/AT_abc422_e)
大意：
有n个点，判断是否存在一条直线使得这条直线穿过了超过一半的点，n为奇数。
n<2e5.

思路：
我们将所有直线按照点对的形式表示，如果存在这么一条直线，那么一定有一半的点对 表示这条直线，另一半的点对直线可能不是这条直线。
假设恰好有一半的点能被穿过，一共有 2n - 1个点。
已知： 
2n - 1个点能形成大约 $4 n^2$ 个直线
n 个点能同时穿过，则内部形成的点对相同，大约 $n^2$ 个相同直线
在合法的前提下，如果任取一条直线，这条直线不合法的概率为 $\frac{3}{4}$

判断这个直线是否合法只需要对所有点枚举判断是否在直线上。
- 是则存在.
- 如果不是那么接着换一个点对进行判断。重复操作
若执行 90 次仍没有合法的直线，那么存在合法直线但却30次没有一次成功的概率为 $\frac{3^{100}}{4^{100}}$
已知：$\frac{3^3}{4^3} \longrightarrow \frac{1}{2}$
那么 $\frac{3^{90}}{4^{90}}\longrightarrow \frac{1}{2^{30}}$
太小了，因此 时间复杂度上 只有 $O(nm)$  ,  m为最大操作次数：90.
## 三线穿所有点
GCPC (ICPC German) 2023 B
### 大意：
给出 n （n < 1e4）个点，判断是否存在 三条直线 把所有点穿过。
### 思路1：(随机化)
随机挑选第一条直线，然后排除他已经穿过的点，然后随机找剩下的第二条直线，最后判断剩下的点是否在同一条直线上：
如果存在 三条直线 穿过所有点 
那么 考虑这样做概率最小的时候：（三线平分 n 个点）
此时 第一条线是一条合法线的 概率为 $\frac{1}{9}$
第二条线 是合法线的 概率为 $\frac{1}{4}$
第三条线 只有一种判断 为$1$
所以判断一次 需要 用 $O(3n)$ 成功的概率为 $\frac{1}{36}$ ，那么合法但不成功的概率为$\frac{35}{36}$
$\displaystyle \frac{35^{10}}{36^{10}}=\frac{3}{4} \longrightarrow \frac{3^{90}}{4^{90}}=\frac{1}{2^{30}}$

如果我们随机化做最多 900 次，合法但却没有一次成功的概率 非常小。
时间复杂度为 $O(900\times 3\times n)$  可以实现
### 思路2：（枚举）（X）
暂时还不会呢

