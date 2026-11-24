---
title: 求凸包，Andrew 算法
sidebarOutline: true
---

# 求凸包，Andrew 算法

思路：
所有点按照 x 为第一关键字， y为第二关键字排序。
这样保证第一个点和最后一个点在 凸包 上
第一次枚举：
- 按照顺序枚举所有点，求下凸包，和上面的极角序一样，设立一个栈数组，保证形成凸包的两条线是按照顺时针旋转包围的，如果有逆时针则出栈。
第二次枚举：
- 倒序枚举所有点， 求上凸包，在维护 第 n 个点在 凸包上的前提下，保证形成凸包的两条线是按照顺时针旋转包围的，如果有逆时针则出栈。
这样就可以找到编号为 1 -> …… -> n ->  …… -> 1 这样的凸包顶点。

时间 $O(n\log n)$
```cpp
// 使用之前要按照 x 为第一关键字，y 为第二关键字排序
vector<Point> Andrew(vector<Point> &pp,int n,int &len) // 返回一个点数组 顺时针的凸包上的点，最后一个点是起点
{// len 表示最后凸包的顶点数，包括 第一个 和 最后一个
    // const bool operator<(const Point &other) const{
    //     return fabs(x-other.x)<eps?y<other.y:x<other.x;
    // } // 给 Point 结构体的比较器
    vector<Point> stk(n+2);// 多开一个，加上初始点可能有n+1个点
    //sort(pp.begin()+1,pp.end());//(这是内部排序，如果外面已经排序就不用)
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
    vector<Point> stk=Andrew(pp,n,id);//用法 id 为凸包len长
```
