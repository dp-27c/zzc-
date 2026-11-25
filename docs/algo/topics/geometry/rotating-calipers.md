---
title: 旋转卡壳
sidebarOutline: true
---

# 旋转卡壳

旋转卡壳可以解决的问题：
- 计算距离：凸多边形的直径，凸多边的最小间距。
- 外届矩形：最小覆盖矩形，最小周长覆盖矩形。
- 三角剖分：洋葱三角剖分，四边形剖分，螺旋三角剖分。
- 凸多边形：合并凸包，找共切线，凸多边形交，临界切线。
## 求凸包直径：
### 思路：
对于 一堆点来说，求出所有点中，最长的距离。
先用 [Andrew 算法求凸包](./convex-hull.md)。
（对踵点对：边-点对踵 表示使得这条边为底，取使得面积最大的点 为边点对踵）
1. 这个距离对应的点对一定在凸包上
2. 逆时针枚举 凸包上的顶点，找到对踵点
3. 取对踵点到边的最大距离
4. 枚举所有凸包上的边，重复过程

待补图片（Pasted image 20250929200840.png）

时间复杂度为$O(n)$
### 代码模版：
```cpp
// 注意还要搭配 Andrew 算法求 凸包s
ld rotating_calipers(vector<Point> &s,int n) // 旋转卡壳,求凸包直径
{   //s 为凸包上的点，n 表示其有效长度
    n--;// 这一步是为了 双指针循环找 对踵点 
    ld res=0;
    for(int i=1,j=2;i<=n;++i)
    {// 注意下面取模进1的过程，这个模数应该是 减去 1 后的 n（有效长度）
        // 这个叉积太妙了，将距离比较转化为三角形的面积比较
        while(cross_2(s[i],s[i+1],s[j])<cross_2(s[i],s[i+1],s[j+1])) j=j%n+1;
        res=max(res,max(P_d(s[i],s[j]),P_d(s[i+1],s[j])));
    }
    return res;
}
```
## 旋转卡壳求最大四边形：
大意：
给出 n 个点，求出由 这 n 个点中组成的面积最大的四边形

### 思路：
1. 这四个顶点都在凸包上
2. 四边形的对角线一定在凸包的对角线上
3. 枚举对角线 i ，j 两个顶点，分别找到这个对角线上下对应的两个对踵点a 和 b 。
时间复杂度为 $O(n^2)$

![凸包内最大四边形的候选对角线](../../../assets/note-images/Pasted%20image%2020250929204647.png){width=296 height=262}


### 代码：
里面还有很多细节！！
```cpp
ld rotating_calipers(vector<Point> s,int n) // 旋转卡壳,找最大四边形
{   //s 为凸包上的点，n 表示其有效长度
    n--;// 这一步是为了 双指针循环找 对踵点 
    ld res=0;
    rep(i,1,n)
    {
        int a=i,b=i+1;// a 找 i 到 j 的对踵点 ， b 找 j 到 i 上的对踵点
        // b 是从 j 开始
        rep(j,i+1,n)
        {
	        // 前面a+1没取模是因为和取模后点是同一个
            while(cross_2(s[i],s[j],s[a])>cross_2(s[i],s[j],s[a+1])) a=a%n+1;
            //这边不能取等，不然a就会和b一样枚举到 j - i 的范围的点了
            while(cross_2(s[i],s[j],s[b])<cross_2(s[i],s[j],s[b+1])) b=b%n+1;
            // a 在顺时针方向，所以叉积算出来是负数,判断时要反着来
            res=max(res,-cross_2(s[i],s[j],s[a])+cross_2(s[i],s[j],s[b]));
        }
    }
    return res/2;
}
```

## 旋转卡壳求最小覆盖矩形：
### 思路：
1. 最小覆盖矩形一定有边在 凸包上
2. 枚举凸包的边，找到 上 对踵点 a ，利用点积 求出 左右边界点 b ，c；
3. 计算矩形的 边长，以及 矩形的四个顶点位置。更新答案。
时间复杂度为$O(n)$


代码上还有很多细节！！
### 代码：
```cpp
ld rotating_calipers(vector<Point> s,int n) // 旋转卡壳,找最小覆盖矩形
{   //s 为凸包上的点，n 表示其有效长度
    n--;// 这一步是为了 双指针循环找 对踵点 
    ld res=1e18;int a,b,c;a=2,b=2;//上a ，右 b ，左 c
    vector<Point> p(4);// 保存四个顶点,有需要可以自取
    rep(i,1,n)
    {
        while(cross_2(s[i],s[i+1],s[a])<cross_2(s[i],s[i+1],s[a+1])) a=a%n+1;
        // 寻找左右两端的点用 点积 真是太妙了！！
        while(dot(s[i]-s[i+1],s[b]-s[i+1])>dot(s[i]-s[i+1],s[b+1]-s[i+1])) b=b%n+1;
        // 一个是 i -> i+1 ，一个是 i+1 -> i 
        if(i==1) c=a; // 这一步是为了保证 c 在 a的另一端。
        while(dot(s[i+1]-s[i],s[c]-s[i])>dot(s[i+1]-s[i],s[c+1]-s[i])) c=c%n+1;
        ld d=P_d(s[i],s[i+1]);
        // 计算其面积
        ld H=cross_2(s[i],s[i+1],s[a])/d;// 高
        ld R=-dot(s[i]-s[i+1],s[b]-s[i+1])/d;// 最右端到线段右端
        ld L=-dot(s[i+1]-s[i],s[c]-s[i])/d;// 最左端到线段左端
        if((R+d+L)*H<res)
        {
            res=(R+d+L)*H;
            // 从 按照 p[0] 逆时针编号 保存点的坐标
            p[0]=s[i]+(s[i]-s[i+1])*(L/d);
            p[1]=s[i+1]+(s[i+1]-s[i])*(R/d);
            p[2]=p[1]+rotate(s[i]-s[i+1],-PI/2)*(H/d);// 顺时针
            p[3]=p[0]+rotate(s[i+1]-s[i],PI/2)*(H/d);// 逆时针
        }
    }
    printf("%.5lf\n",res);
    int k=0;// 找到 凸包顺序下 的最小点，然后逆时针输出。
    ld miy=INF,mix=INF;
    rep(i,0,3) 
    {
        if(p[i].y<miy||p[i].y==miy&&p[i].x<mix)
        {
            k=i;
            miy=p[i].y,mix=p[i].x;
        }
    }
    rep(i,0,3)
    {
        printf("%.5lf %.5lf\n",p[k].x,p[k].y);
        k=(k+1)%4;
    }
    return res;
}
ld zero(ld x)
{
    if(fabs(x)<eps) return x;
    return x;
}
```

