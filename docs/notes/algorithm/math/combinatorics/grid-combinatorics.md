---
title: "二维组合"
algorithms: []
sidebarOutline: true
---

# 二维组合

## 找不同行不同列

很好的一道题：[1309. 车的放置]([1309. 车的放置 - AcWing题库](https://www.acwing.com/problem/content/1311/))^
大意：

![不同行不同列放车的例题题意](../../../../assets/note-images/Pasted%20image%2020250816165137.png){width=1425 height=737}


思路：
把这个图形看成是 上面一个小矩形和下面一个大矩形的组合。

那么我们就考虑
1. 车全放在下面矩形的方案数
2. 存在有车放在上面矩形的方案数

先算第一个:  $\huge C_{a+c}^{k}*A_{d}^{k}$

为什么是这个式子？
1.相当于x轴上拿 k 个点，这样保证了 选的点不会同 x 轴
2.右边相当于 y 轴上拿 k 个位置，再将这些位置按一定的顺序和 x选的位置搭配，所以内部的序考虑
3.你也可以看成是：

$\huge C_{a+c}^{k}*C_{d}^{k}*A_{k}^{k}$   这样就是 两个轴分别选k个位置 乘上搭配顺序。
然后就是考虑 第二条 即遍历 放 i 个在上面的矩形，剩下 k-i 个放下面矩形，且保证 上面矩形选取的 x 坐标不在 下面矩形选取的 x坐标范围内
即：
$\huge \sum (C_{a}^{i}*C_{b}^{i}*A_{i}^{i})*(C_{a+c-i}^{k-i}*C_{d}^{k-i}*A_{k-i}^{k-i})$
$i -> (1,k)$
注意 i 的取值要小于等于底数。
```cpp
vii C(2001,vi(2001,0));
vi A(2001,1);
int M=100003;
void init()
{
    C[0][0]=1;
    rep(n,1,2000)
    {
        A[n]=(A[n-1]*n)%M;
        rep(k,0,n)
        {
            if(k==n)
            {
                C[n][k]=1;break;
            }
            if(k==0)
            {
                C[n][k]=1;continue;
            }
            C[n][k]=(C[n-1][k]+C[n-1][k-1])%M;
        }
    }
}
void solve() // ll !
{
    init();
    int a,b,c,d,k;cin>>a>>b>>c>>d>>k;
    int ans=0,p=0;
    int n=a+c,m=b+d;
    ans=((k>n?0:C[n][k])*(k>d?0:(C[d][k]*A[k])%M))%M;
    rep(i,1,k)
    {
        p=(p+((C[a][i]*((C[b][i]*A[i])%M))%M*(C[n-i][k-i]*(C[d][k-i]*A[k-i]%M))%M)%M)%M;
    }
    ans=((ans+p)%M+M)%M;
    cout<<ans<<endl;
}
```

## 找共线

([1310. 数三角形 - AcWing题库](https://www.acwing.com/problem/content/1312/))
大意：
在 一个 n*m 的格子里找不同的三角形
思路：
找共线的三元点的数量，最后再减去即可：

步骤分成三部分：
1. 斜率为0的，即那些垂直与坐标轴的直线，$\huge m*(C_{n}^{3})+n*(C_{m}^{3})$
2. 斜率大于0的，遍历二维`i,j`为 直角三角形的长和高
(**和格点不同，n和m是各点的长度的话要还原到格子的长度:n-1,m-1**)
直角三角形的个数：$\huge (n-i+1)*(m-i+1)$
三角形斜边包含除端点以外的点的个数 : $\huge gcd(i,j) -1$ 即以三角形的两个端点为定的两点，三元找一
个数为 $\huge (n-i+1)*(m-i+1)*(gcd(i,j) -1)$
3. 斜率小于0的，因为对称，所以和上面一样
这样的找法保证不重不漏，且时间复杂度控制在 $O(m*n)$
```cpp
int gcd(int a,int b)
{
    return b?gcd(b,a%b):a;
}
void solve() // ll !
{
    int n,m;cin>>n>>m;
    n++,m++;
    int ans=(n*m)*(n*m-1)*(n*m-2)/6;
    int p=m*C[n][3]+n*C[m][3];
    n--,m--;
    rep(i,1,n)
    {
        rep(j,1,m)
        {
            p+=2*(n-i+1)*(m-j+1)*(gcd(i,j)-1);
        }   
    }
    ans-=p;
    cout<<ans<<endl;
}
```
