---
title: 凸包
algorithms: []
sidebarOutline: true
---

# 凸包

## Andrew 凸包模版：
```cpp
vector<Point> Andrew(vector<Point> &pp,int n,int &len)// len 表示最后凸包的顶点数，包括 第一个 和 最后一个
{
    // const bool operator<(const Point &other) const{
    //     return fabs(x-other.x)<eps?y<other.y:x<other.x;
    // } // 给 Point 结构体的比较器
    vector<Point> stk(n+1);
    sort(pp.begin()+1,pp.end());
    stk[1]=pp[1];
    int id=1;
    rep(i,2,n)
    {
        while(id>1&&cross(stk[id-1]-stk[id],pp[i]-stk[id])>=0) id--;
        stk[++id]=pp[i];
    }
    int up=id;
    for(int i=n-1;i>0;--i)
    {
        while(id>up&&cross(stk[id-1]-stk[id],pp[i]-stk[id])>=0) id--;
        stk[++id]=pp[i];
    }  
    len=id;
    return stk;// len 也是一个输出
}
// solve 函数内的使用说明
    int id;
    vector<Point> stk=Andrew(pp,n,id);//用法
```

## 概念
能包含所有给定点的最小凸多边形叫做凸包

![点集及其凸包边界](../../../assets/note-images/Pasted%20image%2020250928162241.png){width=1935 height=1038}


## 求凸包：
### 扫描线法：极角序（Graham）
思路：
找到最下的同时，最左的点，人然后从 所有点中， 按照于起始点连接逆时针扫描。

![从起点按极角扫描并维护凸包](../../../assets/note-images/Pasted%20image%2020250928163205.png){width=579 height=463}

就这样 保持每到一个新的点，都是在上一个编制的线上做顺时针旋转（可以用 叉积 判断）。
如果发现逆时针，则弹出 栈的顶部 ，换上上 一个点 判断，重复上一行操作。

![极角扫描遇到不合要求的转向时弹出栈顶点](../../../assets/note-images/Pasted%20image%2020250928163438.png){width=552 height=434}

时间复杂度在 $O(n\log n)$ 
#### 模版题：
[P2742 [USACO5.1] 圈奶牛Fencing the Cows /【模板】二维凸包 - 洛谷](https://www.luogu.com.cn/problem/P2742)
```cpp
void solve() // ll
{
    int n;cin>>n;
    vector<Point> pp(n+1);
    vector<Point> stk(n+2);
    ld mxy=INF,mxx=INF;
    rep(i,1,n)// 读入点，并且找到最下的同时最左的点
    {
        cin>>pp[i].x>>pp[i].y;
        if(pp[i].y<mxy||pp[i].y==mxy&&pp[i].x<mxx)
        {
            swap(pp[i],pp[1]);
            mxy=pp[1].y;
            mxx=pp[1].x;
        }
    }
    if(n==1) 
    {
        cout<<0<<endl;return ;
    }
    Point tool = Point(pp[1].x+1,pp[1].y) - pp[1];
    function<bool(Point,Point)> cmp=[&](Point a,Point b) -> bool
    {// 用 两点分别于起始点连线，判断是否逆时针旋转，如果同一条直线则按照距离升序
        ld d=cross(a-pp[1],b-pp[1]);
        if(fabs(d)>eps) return d>0;
        else return P_d(pp[1],a)<P_d(pp[1],b);
    };
    sort(pp.begin()+2,pp.end(),cmp);
    stk[1]=pp[1];
    int id=1;
    rep(i,2,n)
    {
        while(id>1&&cross(stk[id-1]-stk[id],pp[i]-stk[id])>=0) id--;
        ++id;stk[id]=pp[i];
    }
    stk[id+1]=pp[1];
    ld ans=0;
    rep(i,1,id)
    {
        ans+=P_d(stk[i],stk[i+1]);
    }
    // cout<<ans<<endl;
    printf("%.2lf\n",ans);
}
```
### 扫描线法：字典序（Andrew）
比扫描线算法码量上更简单，没那么多细节，速度快一点。

思路：
所有点按照 x 为第一关键字， y为第二关键字排序。
这样保证第一个点和最后一个点在 凸包 上
第一次枚举：
- 按照顺序枚举所有点，求下凸包，和上面的极角序一样，设立一个栈数组，保证形成凸包的两条线是按照顺时针旋转包围的，如果有逆时针则出栈。
第二次枚举：
- 倒序枚举所有点， 求上凸包，在维护 第 n 个点在 凸包上的前提下，保证形成凸包的两条线是按照顺时针旋转包围的，如果有逆时针则出栈。
这样就可以找到编号为 1 -> …… -> n ->  …… -> 1 这样的凸包顶点。

#### 代码：
[P3829 [SHOI2012] 信用卡凸包 - 洛谷](https://www.luogu.com.cn/problem/P3829)
扫码的，这题 a 是竖直方向！！
还有就是转一圈回来刚好一个圆的周长，这是一个小trick
```cpp
void solve() // ll
{
    int n;cin>>n;
    ld a,b,r;cin>>a>>b>>r;
    a=a/2-r,b=b/2-r;
    vector<Point> pp;
    vector<Point> stk(4*n+2);
    pp.push_back({0,0});    
    long ld ty[4]={a,-a,a,-a},tx[4]={b,b,-b,-b};
    rep(i,1,n)
    {
        ld x,y,theta;cin>>x>>y>>theta;
        Point pt(x,y);
        rep(j,0,3)
        {
            Point p(tx[j],ty[j]);
            p=rotate(p,theta);
            p=p + pt;
            pp.push_back(p);
        }
    }
    sort(pp.begin()+1,pp.end());
    stk[1]=pp[1];
    int id=1;
    n=pp.size()-1;
    rep(i,2,n)
    {
        while(id>1&&cross(stk[id-1]-stk[id],pp[i]-stk[id])>=-eps) id--;
        stk[++id]=pp[i];
    }
    int up=id;
    for(int i=n-1;i>0;--i)
    {
        while(id>up&&cross(stk[id-1]-stk[id],pp[i]-stk[id])>=-eps) id--;
        stk[++id]=pp[i];
    }
    ld ans=PI*r*2.0;
    rep(i,1,id-1)
    {
        ans+=P_d(stk[i],stk[i+1]);
    }
    // cout<<ans<<endl;
    printf("%.2lf\n",ans);
}
```
### 凸包练习：
#### 直线凸包
[P3194 [HNOI2008] 水平可见直线 - 洛谷](https://www.luogu.com.cn/problem/P3194)
大意：
给出 n 个直线 ，如果从最上面往下看，求出可以被观测的直线数量，并且从小到大输出他们的编号。

思路：

![水平可见直线及其交点示意](../../../assets/note-images/Pasted%20image%2020250929172409.png){width=1040 height=570}

按照斜率 从小到大升序 ，在斜率相同的情况下我们只要保留 截距最高的那个直线就好。
然后我们进行凸包下包围

考虑两条直线的交点，维护凸包的单调栈，对新的直线与栈顶的直线 求出交点，如果此交点在 栈顶的两条直线交点 的左边，则弹出栈顶，继续判断。

算法上 类似凸包，判断条件有所变化而已。

bug改出来是 `getNode` 的函数出了问题

代码：
```cpp
void solve() // ll
{
    int n;cin>>n;
    vector<pair<Point,int>> line(n+1);
    rep(i,1,n)
    {
        cin>>line[i].first.x>>line[i].first.y;
        line[i].second=i;
    }
    sort(line.begin()+1,line.end());
    vector<int> pp(n+1);
    int id=0;
    auto check=[&](Point a,Point b,Point c)
    {
        Point p1=getNode({0,a.y},{1,a.x+a.y},{0,b.y},{1,b.x+b.y});
        Point p2=getNode({0,a.y},{1,a.x+a.y},{0,c.y},{1,c.x+c.y});
        if(p1.x>=p2.x) return true;
        return false ;
    };
    rep(i,1,n)
    {
        if(i>1&&fabs(line[i].first.x-line[i-1].first.x)<eps) continue;
        while(id>1&&check(line[pp[id]].first,line[pp[id-1]].first,line[i].first)) id--;
        pp[++id]=i;
    }
    vi a;
    rep(i,1,id) a.push_back(line[pp[i]].second);
    sort(a.begin(),a.end());
    for(auto x:a) cout<<x<<" \n"[x==a.back()];
}
```
