---
title: 半平面交
algorithms: []
sidebarOutline: true
---

# 半平面交

## 算法思路：
左半平面交：
1. 按照极角序排序
2. 逆时针旋转构建，双端队列维护边界。
## 代码模版：
[P3256 [JLOI2013] 赛车 - 洛谷](https://www.luogu.com.cn/problem/P3256)
```cpp
int q[N],tt=1;
void solve() // ll ld
{
    int n;cin>>n;
    vector<Point> pu(n+1);
    vector<Point> pv(n+1);
    vi pid(n+1,0);
    rep(i,1,n)
    {
        ld x;cin>>x;
        pu[i]={0,x};
        pid[i]=i;
    }
    rep(i,1,n)
    {
        ld x;cin>>x;
        pv[i]=pu[i]+Point(1,x);
    }
    function<bool(int,int)> cmp=[&](int a,int b) -> bool
    {
        ld ka=(pv[a]-pu[a]).y,kb=(pv[b]-pu[b]).y;
        return fabs(ka-kb)<eps?pu[a].y>pu[b].y:ka>kb;
    };
    sort(pid.begin()+1,pid.end(),cmp);
    q[1]=pid[1];
    rep(i,2,n)// 重合的直线也能看到，包括交于同一点和直线完全重合
    {
        if(getNode(pu[q[tt]],pv[q[tt]],pu[pid[i]],pv[pid[i]]).x<0&&(!((pu[q[tt]].y==pu[pid[i]].y)&&(pv[q[tt]].y==pv[pid[i]].y)))) continue;
        while(tt>1&&getNode(pu[q[tt]],pv[q[tt]],pu[pid[i]],pv[pid[i]]).x>getNode(pu[q[tt-1]],pv[q[tt-1]],pu[pid[i]],pv[pid[i]]).x) --tt;
        q[++tt]=pid[i];
    }
    vi a;
    rep(i,1,tt)
    {
        a.push_back(q[i]);
    }
    sort(a.begin(),a.end());
    cout<<a.size()<<endl;
    for(auto x:a) cout<<x<<" \n"[x==a.back()];
}
```


## 练习：
### 水平可见直线：
大意：

思路：
1. 可以看成是半平面交中暴露的直线。
2. 可以用单调栈维护


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
