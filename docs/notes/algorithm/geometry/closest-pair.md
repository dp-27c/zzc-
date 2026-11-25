---
title: 计算几何分治
algorithms: []
sidebarOutline: true
---

# 计算几何分治

## 求平面最近点对：
### 思路：
1. 按照 x 为第一关键字，y为第二关键字 排序。 
2. 分治求出中线两边的最小距离 d1 ， d2 ，$d= \min(d1,d2)$。
3. 找中线两边点之间的最小距离，注意用 d 规范点的选择。
4. 按照上述操作做 类似 归并 的方法。
因为内部还有一层排序，所以时间复杂度最高可达 $O(n\log n\log n)$

### 代码：（sort 版）
[P1429 平面最近点对（加强版） - 洛谷](https://www.luogu.com.cn/problem/P1429)
```cpp
ld merge(int l,int r,vector<Point> &a)
{
    if(l==r) return 1e18;
    if(l+1==r) return P_d(a[l],a[r]);
    int mid= l+r>>1;
    ld d=min(merge(l,mid,a),merge(mid+1,r,a));
    vector<Point> b;
    rep(i,l,r) if(fabs(a[i].x-a[mid].x)<d) b.push_back(a[i]);
    function<bool(Point,Point)> cmp2=[&](Point p1,Point p2) -> bool
    {
        return fabs(p1.y-p2.y)<eps?p1.x<p2.x:p1.y<p2.y;
    };
    sort(b.begin(),b.end(),cmp2);
    int up=b.size()-1;
    rep(i,0,up-1)
    {
        for(int j=i+1;j<=up&&(b[j].y-b[i].y)<d;++j)
        {// 再加上一层 y 距离的限制
            d=min(d,P_d(b[i],b[j]));
        }
    }
    return d;
}
void solve() // ll
{
    int n;cin>>n;
    vector<Point> pp(n+1);
    rep(i,1,n)
    {
        cin>>pp[i].x>>pp[i].y;
    }
    sort(pp.begin()+1,pp.end());
    ld ans=merge(1,n,pp);
    printf("%.4lf\n",ans);
}
```
