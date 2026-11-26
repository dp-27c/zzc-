---
title: "FFT(快速傅里叶变换)"
algorithms: []
sidebarOutline: true
---

# FFT(快速傅里叶变换)

多项式的乘法运算，实现求点值和求系数均优化为 $O(nlogn)$ 的时间复杂度。
该算法适用于 计算多项式的乘法运算 。 
前置知识是 复数 ，希望你运用好这个工具，来帮助你完成多项式的题目，以及生成函数的题目。

## 深度理解：

首先你面对的是两个多项式我们叫它 ：



$$
A(n),B(m)
$$



我们要解决的问题是：求 $C=A(n)*B(m)$
其实也就是知道 $C$ 的系数。



$$
A(n)=a_0+a_1x+a_2x^2+a_3x^3+……+a_{n-1}x^{n-1}
$$




$$
B(m)=b_0+b_1x+b_2x^2+b_3x^3+……+b_{n-1}x^{m-1}
$$





$$
C(n+m-1)=c_0+c_1x+c_2x^2+c_3x^3+……+c_{n+m-2}x^{n+m-2}
$$




### 朴素算法：

C的第n项表示：
$\displaystyle C_n=x^n \sum_{i=0}^{n} a_i*b_{n-i}$
求一个项的时间复杂度 是 $O(n)$ 
如果要求出整个多项式 C ，就要求 n 项
时间复杂度就会来到 $O(n^2)$ ，那么我们该如何减小这一段的时间复杂度问题呢？


![多项式乘法中系数表示与点值表示的转换](../../../../assets/note-images/Pasted%20image%2020250829163550.png){width=824 height=558}

 【图片来自：董晓算法】
这里的求系数应该是 IFFT 

### FFT算法：

在接触之前，我们需要搞清楚这些概念;

#### 点值：

即：对于多项式 看成这样的一个函数$A_n(x)$ 表示有n项，且代入 其中的x为 $x$ ，最后求出来的 值，可以说$A_n(x_1)$ 就是一个值

我们知道，对于一个 2 项多项式，看成一个一次函数，也就是一条直线。因为两点确定一条直线，所以不难看出，我们只需要知道这个多项式代入 任何不同的两个 $x$ 得到 其对应的 $y=(A_n(x))$ ，那么我们就可以得到一个二维平面上的两个点。
同理：只要知道这两个点，那么我们就可以确定这个唯一的二项式了。

- $A(x):y0,y1,…,y2n−2B (x):y′0,y′1,…,y′2n−2$

推广到多项式时，即一个 n 项多项式，我们需要找到 n 个属于这个函数的点，我们就可以通过计算，确定出这唯一的一个多项式。
而我们在多项式的乘法过程中，就可以试着找到 C 的 n + m 个点值，来确定这个多项式。

既然这个点只要满足在 C 上，那么我取在哪里，全都由我自己决定。那我就可以去 n + m 个特殊的点，来方便我的计算了。

我们发现，在 A 上取 (n + m)个点，同时在 B 上取相同横坐标的 （n + m） 个点，然后因为C = A * B ，相同坐标的点相乘就是我在 C 上点的值了。基于这一目的，达到 C 的目标有了方向性。

但是通过计算，发现取 A上(n + m)个点，每个点还需要 计算，每次计算又要花费 n 次，一共需要 $O(n^2)$ 的时间复杂度，怎么又回去了？还不如直接算是吧。
但是FFT 就是优化了这一步过程。取一个点每次花费的次数降低为 $O(logn)$ 的时间复杂度。


#### 复数：

在正式接触 FFT 之前 还要了解复数已经相关的前置知识。
定义： $z=a+i*b$  其中 $i^2=-1$

复数的加减乘 自己去理解吧。
我们这里引入单位圆和单位根的概念：

- 单位圆：复平面上圆心在原点，且半径为1的圆
圆上的点：$z=\cos(\theta)+i*\sin(\theta)$  ,把圆分成 n 等分，可以得到 $Z^n=1$ 的n个根

- 单位根：$\omega_{n}^{k}=\cos(\frac{2\pi k}{n})+i*\sin(\frac{2\pi k}{n})$
单位根的一些性质： $\omega_{n}^{k}*\omega_{n}^{m}=\omega_{n}^{k+m},{\omega_{n}^{k}}^{m}=\omega_{n}^{mk}$

以上均可以通过三角函数转化来证明。



![复平面上的单位根示意](../../../../assets/note-images/Pasted%20image%2020250829164215.png){width=377 height=370}

【图片来自：董晓算法】

单位根的一些性质：
1. 周期性：$\omega_{n}^{k+n}=\omega_{n}^{k}$

2. 对称性：$\omega_{n}^{k+\frac{n}{2}}=-\omega_{n}^{k}$ 

3. 折半性：$\omega_{n}^{2k}=\omega_{\frac{n}{2}}^{k}$

为什么FFT 要运用到复数，就是要利用单位根的性质。


#### 系数求点值：

前面提到，我们可以去任何点。
假设我们要取 n 个点，取 n 个不同的单位根，然后代入到 A，B 的函数上求值。
先对 A 进行分解：



$$
A(x)=a_0+a_1x+a_2x^2+a_3x^3+……+a_{n-1}x^{n-1} \longrightarrow
$$




$$
(a_0+a_2x^2+……+a_{n-2}x^{n-2})+(a_1+a_3x^2+……+a_{n-1}x^{n-2})*x
$$


设：


$$
A_1(x)=a_0+a_2x+……+a_{n-2}x^{\frac{n}{2}-1},A_2(x)=a_1+a_3x+……+a_{n-1}x^{\frac{n}{2}-1}
$$


所以：


$$
A(x)=A_1(x^2)+A_2(x^2)x
$$



然后我们代入$\omega_{n}^{k} 和 \omega_{n}^{k+n/2} (k<n/2)$ ,这一步的目的是代入x求点值,并且保证单位圆上分成 n 份,可以理解为上半圆和下半圆.
代入$\omega_{n}^{k}$ 


$$
A(\omega_{n}^{k})=A_1(\omega_{n}^{2k})+A_2(\omega_{n}^{2k})\omega_{n}^{k}=A_1(\omega_{n/2}^{k})+A_2(\omega_{n/2}^{k})\omega_{n}^{k}
$$


代入$\omega_{n}^{k+n/2}$,先周期性消去 n ，再折半，最后对称性。但是如果先折半再对称，会导致不一样，原因就是先折半会让下半圆跑到上面去。


$$
A(\omega_{n}^{k+n/2})=A_1(\omega_{n}^{2k+n})+A_2(\omega_{n}^{2k+n})\omega_{n}^{k+n/2}=A_1(\omega_{n/2}^{k})-A_2(\omega_{n/2}^{k})\omega_{n}^{k}
$$



接下来就可以利用递归:


![FFT 递归计算单位根处点值的过程](../../../../assets/note-images/Pasted%20image%2020250829172006.png){width=1044 height=642}

【图片来自：董晓算法】

就可以求出每个单位根的点值了。当然还有一些代码小细节可以参考：


#### 点值求系数：(逆变换)

设多项式 $C(x)=a_0+a_1x+a_2x^2+……+a_{n-1}x^{n-1}$  代入$\omega_{n}^{0}，\omega_{n}^{1}……\omega_{n}^{n-1}$ 得到$(y_{1},y_{2},y_{3},……y_{n-1})$
其中 $y_i=\sum_{j=0}^{n-1}a_{j}(\omega_{n}^{i})^j$ .
此时如果我们构造多项式 $B(y)=y_0+y_1x+……y_{n-1}x^{n-1}$ 
代入单位根的倒数($\omega_{n}^{0},\omega_{n}^{-1},\omega_{n}^{-2},\omega_{n}^{-3}……\omega_{n}^{-(n-1)}$)就可以得到: 新的点值$(z_0,z_1,z_2……z_{n-1})$


$$
z_k=\sum_{i=0}^{n-1}y_i(\omega_{n}^{-(k)i})=\sum_{j=0}^{n-1}a_j\sum_{i=0}^{n-1}(\omega_{n}^{(j-k)})^i
$$


讨论：
1. $[j==k]$ 时 $z_k=n*a_k$
2. $[j\ne k]$ 时 $\sum_{i=0}^{n-1}(\omega_{n}^{(j-k)})^i$ 内部是一个等比数列 $\longrightarrow$ $\displaystyle \frac{\omega_{n}^{n(j-k)}-1}{1-\omega_{n}^{j-k}}\longrightarrow\frac{(\omega_{n}^{n})^{(j-k)}-1}{1-\omega_{n}^{j-k}}=0$
因此满足$z_k=n*a_k$ 
所以最后 的系数就是 $a_k=\displaystyle \frac {n}{z_k}$

#### 代码模版（递归版）：


[P3803 【模板】多项式乘法（FFT） - 洛谷](https://www.luogu.com.cn/problem/P3803)

```cpp
const double PI=acos(-1);
struct cp//(complex)不如自己写
{
    double r,v;
    cp operator+(const cp &other)const
    {
        return {r + other.r,v + other.v};
    }
    cp operator-(const cp &other)const
    {
        return {r - other.r,v - other.v};
    }
    cp operator*(const cp &other)const
    {
        return {r * other.r - v * other.v,r * other.v + v * other.r};
    }
};
vector<cp> A,B;
void FFT(vector<cp> &A,int n,int op)
{
    if(n==1) return ;
    vector<cp> A1(n/2),A2(n/2);
    for(int i=0;i<n/2;++i) A1[i]=A[i*2],A2[i]=A[i*2+1];//分离
    FFT(A1,n/2,op),FFT(A2,n/2,op);
    cp w1={cos(2*PI/n),sin(2*PI/n)*op};//旋转因子
    cp wk={1,0};//代入的点
    for(int i=0;i<n/2;++i)//归并
    {
        A[i]=A1[i]+A2[i]*wk;
        A[i+n/2]=A1[i]-A2[i]*wk,wk=wk*w1;

    }
    //这一步要放外面的，这里只是为了方便打包
    // if(op==-1)//逆FFT取系数
    // {
    //     for(int i=0;i<n;++i)
    //     {
    //         A[i].r=A[i].r/n+0.5;
    //         A[i].v=A[i].v/n+0.5;
    //     }
    // }
}
void solve() // ll
{   
    int n,m;cin>>n>>m;
    A.resize(N),B.resize(N);
    for(int i=0;i<=n;++i) cin>>A[i].r;
    for(int i=0;i<=m;++i) cin>>B[i].r;
    for(m=n+m,n=1;n<=m;n<<=1);
    FFT(A,n,1),FFT(B,n,1);//求A，B点值
    for(int i=0;i<n;++i) A[i]=A[i]*B[i];//此时的A就是C的点值
    FFT(A,n,-1);//IFFT求系数
    for(int i=0;i<=m;++i){cout<<(int)(A[i].r/n+0.5)<<" \n"[i==m];}//考虑浮点数，以及对IFFT后的数处理。
}   
```

#### 迭代版FFT

先解释一下迭代版是如何实现的（蝴蝶变换）
码量小，速度快个2/3；
将 每次递归成两份的操作 寻找规律，发现最后得到的数据排列是 位的逆序变换 （蝴蝶变换），然后根据这个规律，我们可以实现按层遍历，自底向上。


![迭代 FFT 的位逆序排列与蝶形变换](../../../../assets/note-images/Pasted%20image%2020250830152557.png){width=684 height=558}

【图片来自：董晓算法】
在FFT前先做位的逆序变换。
这个变换也有一个递推式：


$$
R[x]=\frac{R[x/2]}{2}+[x\&1]*(n/2)
$$



#### 代码模版(迭代版):

```cpp
const double PI=acos(-1);
struct cp//(complex)
{
    double r,v;
    cp operator+(const cp &other)const
    {
        return {r + other.r,v + other.v};
    }
    cp operator-(const cp &other)const
    {
        return {r - other.r,v - other.v};
    }
    cp operator*(const cp &other)const
    {
        return {r * other.r - v * other.v,r * other.v + v * other.r};
    }
};
void FFT(vector<cp> &A,int n,int op)
{
    // change(A,n);把change 函数打包放里面
    vi R(n);R[0]=0;
    //递推进行 1~n 的位逆序变换
    for(int i=0;i<n;++i) R[i]=R[i/2]/2+(i&1)*(n/2);
    //将原数组按索引位逆序后的顺序排序
    for(int i=0;i<n;++i)if(i<R[i]) swap(A[i],A[R[i]]);
    for(int m=2;m<=n;m<<=1)//枚举块数
    {
        cp w1={cos(2*PI/m),sin(2*PI/m)*op};
        for(int i=0;i<n;i+=m)//枚举块组
        {
            cp wk={1,0};
            for(int j=0;j<m/2;++j)//枚举半块
            {
                cp x=A[i+j],y=A[i+j+m/2]*wk;
                A[i+j]=x+y,A[i+j+m/2]=x-y,wk=wk*w1;
            }
        }
    }
    //这一步在这个函数里面可以放里面的
    if(op==-1)//逆FFT取系数
    {
        for(int i=0;i<n;++i)
        {
            A[i].r=A[i].r/n+0.5;
            A[i].v=A[i].v/n+0.5;
        }
    }
}
void solve() // ll
{   
    int n,m;cin>>n>>m;
    vector<cp> A,B;
    A.resize(N),B.resize(N);
    for(int i=0;i<=n;++i) cin>>A[i].r;
    for(int i=0;i<=m;++i) cin>>B[i].r;
    for(m=n+m,n=1;n<=m;n<<=1);//找到对应的最大二进制数
    FFT(A,n,1),FFT(B,n,1);//求A，B点值
    for(int i=0;i<n;++i) A[i]=A[i]*B[i];//此时的A就是C的点值
    FFT(A,n,-1);//IFFT求系数
    for(int i=0;i<=m;++i){cout<<(int)A[i].r<<" \n"[i==m];}//考虑浮点数，以及对IFFT后的数处理。
}   
```

### 高精度乘(fft)：

```cpp
const double PI=acos(-1);
struct cp//(complex)
{
    double r,v=0;
    cp operator+(const cp &other)const
    {
        return {r + other.r,v + other.v};
    }
    cp operator-(const cp &other)const
    {
        return {r - other.r,v - other.v};
    }
    cp operator*(const cp &other)const
    {
        return {r * other.r - v * other.v,r * other.v + v * other.r};
    }
};
void FFT(vector<cp> &A,int n,int op)
{
    // change(A,n);把change 函数打包放里面
    vi R(n);R[0]=0;
    //递推进行 1~n 的位逆序变换
    for(int i=0;i<n;++i) R[i]=R[i/2]/2+(i&1)*(n/2);
    //将原数组按索引位逆序后的顺序排序
    for(int i=0;i<n;++i)if(i<R[i]) swap(A[i],A[R[i]]);
    for(int m=2;m<=n;m<<=1)//枚举块数
    {
        cp w1={cos(2*PI/m),sin(2*PI/m)*op};
        // 未知领域 上面的这个为什么是 m ?
        for(int i=0;i<n;i+=m)//枚举块组
        {
            cp wk={1,0};
            for(int j=0;j<m/2;++j)//枚举半块
            {
                cp x=A[i+j],y=A[i+j+m/2]*wk;
                A[i+j]=x+y,A[i+j+m/2]=x-y,wk=wk*w1;
            }
        }
    }
    //这一步在这个函数里面可以放里面的
    if(op==-1)//逆FFT取系数
    {
        for(int i=0;i<n;++i)
        {
            A[i].r=A[i].r/n+0.5;
            A[i].v=A[i].v/n+0.5;
        }
    }
}
string gjd_mul(string a,string b)
{
    vector<cp> A,B;
    A.resize(N),B.resize(N);
    int n=a.size(),m=b.size();
    rep(i,0,n-1) A[i].r=a[n-1-i]-'0';//存逆序
    rep(i,0,m-1) B[i].r=b[m-1-i]-'0';
    for(m=n+m-2,n=1;n<=m;n<<=1);//找最大二进制位
    FFT(A,n,1),FFT(B,n,1);
    rep(i,0,n-1){A[i]=A[i]*B[i];}
    FFT(A,n,-1);
    int t=0;
    stack<int> stk;//存倒序，输出正序
    rep(i,0,n-1)
    {
        int d=(int)(A[i].r)+t;//不能忘记要取 int
        A[i].r=(d)%10;
        t=d/10;
        stk.push(A[i].r);
    }
    string c;
    if(t) stk.push(t);
    while(stk.size()&&stk.top()==0) stk.pop();
    while(stk.size())
    {
        c+='0'+stk.top();stk.pop();
    }
    return c;
}
```
