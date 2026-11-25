---
title: "斜率优化（队列）"
algorithms: []
sidebarOutline: true
---

# 斜率优化（队列）

对已有的代码进行优化
[任务安排2](https://www.acwing.com/problem/content/303/)
对 下面代码中//注释的区域做斜率优化
这次优化因为考虑到斜率k变化的严格上升，因此采用单调队列维护

待补图片（屏幕截图 2025-07-30 145542.png）

待补图片（屏幕截图 2025-07-30 145550.png）

```cpp
int q[N],hh=0,tt=0;
void solve() // ll !
{
    int n,s;cin>>n>>s;
    vi t(n+1,0),c(n+1,0);
    rep(i,1,n)
    {
        cin>>t[i]>>c[i];
        t[i]+=t[i-1],c[i]+=c[i-1];
    }
    vi p,f(n+1,0);
    rep(i,1,n)
    {
        while(hh<tt&&f[q[hh+1]]-f[q[hh]]<=(t[i]+s)*(c[q[hh+1]]-c[q[hh]])) ++hh;
        f[i]=f[q[hh]]+s*(c[n]-c[q[hh]])+(c[i]-c[q[hh]])*t[i];
        while(hh<tt&&(f[q[tt]]-f[q[tt-1]])*(c[i]-c[q[tt]])>=(f[i]-f[q[tt]])*(c[q[tt]]-c[q[tt-1]])) --tt;
        q[++tt]=i;
    }
    cout<<f[n]<<endl;
}
```
