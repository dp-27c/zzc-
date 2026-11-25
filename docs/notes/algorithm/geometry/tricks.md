---
title: 实用技巧
algorithms: []
sidebarOutline: true
---

# 实用技巧

$$
\Huge \ge \bigtriangledown \le
$$


## 跳出边界找唯一：
[Problem - D - Codeforces](https://codeforces.com/contest/2136/problem/D)
大意：
	这一次，你的机器人被传送到一个具有笛卡尔坐标系的无限二维平面上。平面上有 n 个锚点，第 i 个锚点的坐标为 $(xi,yi)$ ( −1e9≤xi,yi≤1e9 )。当你的机器人被传送到飞机上时，陪审团就会给它这些东西。然而，你的机器人一开始并不知道它的初始坐标。

为了测试机器人的智商，RiOI团队设计了一个有趣的游戏。你的机器人需要通过以下动作找到初始坐标 (X,Y) ( −1e9≤X,Y≤1e9 )。
机器人每次可以往上下左右四个方向走 k 的距离，$0<k<1e9$  。每次走完告诉你距离最近的锚点的曼哈顿距离：$|x_1-x_2|+|y_1-y_2|$ 用不超过10次找到机器人的初始位置。

思路：
因为有很多个点，我们不知道走完后是距离那一个点的曼哈顿距离，但只要我们跳出整个锚点所处的位置，到达最右边最上边，那么在已知所有锚点坐标点的情况下，就可以知道距离最近一定最右上的点 :$\max(x+y)$  
设：距离为 $d_1$,此时的坐标为 x1,y1.

$$
x_1-x_{\text{右上}}+y_1-y_{\text{右上}}=d_1\longrightarrow x_1+y_1=\max(x+y) +d_1
$$

这样还能消去绝对值。
然后再往下走到最右下角，则面对的点是 $\max(x-y)$，设，右上走到右下，走了 h 距离。

$$
x_1-x_{\text{右下}}+(y_{\text{右下}}-(y_1-h))=d_2\longrightarrow x_1-y_1=\max(x-y)-h+d_2
$$

等式右边都是已知量，等式左边是未知量，所以就可以解出来 x1,y1.
然后算走回去的路就可以知道原来的位置了
```cpp
void solve() // ll
{   
    int n;cin>>n;
    vector<xy> p(n+1);
    int mx=0,mi=0,f=0;
    rep(i,1,n)
    {
        int x,y;
        cin>>x>>y;
        if(f==0)
        {
            mx=x+y,mi=x-y;
            f=1;
        }
        mx=max(mx,x+y);
        mi=max(mi,x-y);
    }
    auto move=[&](char c,int d)
    {
        cout<<"? "<<c<<" "<<d<<"\n";
        cout.flush();
        int m;cin>>m;
        return m;
    };
    int v=1e9;
    move('U',1e9);
    move('U',1e9);
    move('R',1e9);
    int d1=move('R',1e9);
    move('D',1e9);
    move('D',1e9);
    move('D',1e9);
    int d2= move('D',1e9);
    int r1=(mx+d1),r2=(mi+d2-4*v);
    int x1=(r1+r2)/2,y1=(r1-r2)/2;
    cout<<"! "<<x1-2*v<<" "<<y1-2*v<<endl;cout.flush();

}   
```
## 凸包与圆弧

如果沿着圆做凸包，求凸包的周长，可以看成是 沿着圆心做凸包 ，最后加上一个圆的周长，因为转一圈下来刚好是 一个圆的角度。

## double -> long double
注意事项：
1.  宏定义要变成 `#define ld long double`
2. 对应的所有实数内置函数 变成 long double 版：`fabs() -> fabsl()`(宏定义实现)
3. 做好对应输出 `cout << fixed << setprecision(10) << (double) val << endl;`

