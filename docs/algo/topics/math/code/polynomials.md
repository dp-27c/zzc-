---
title: 多项式
sidebarOutline: true
---

# 多项式

## NTT（迭代版）：
将 多项式从系数转换为点值表示 （ 1）
将 多项式从点值转换为系数表示 （-1）
```cpp
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    int sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % M;
        x = (x * x) % M, k >>= 1;
    }
    return sum;
}
//000000
const LL g=3;//119;//mod = 998244353 时
const LL gi=ksm(g,mod-2,mod);//332748118;;
void NTT(vector<LL> &A,int n,int op)
{
    // change(A,n);把change 函数打包放里面
    vi R(n);R[0]=0;
    //递推进行 1~n 的位逆序变换
    for(int i=0;i<n;++i) R[i]=R[i/2]/2+(i&1)*(n/2);
    //将原数组按索引位逆序后的顺序排序
    for(int i=0;i<n;++i)if(i<R[i]) swap(A[i],A[R[i]]);
    for(int m=2;m<=n;m<<=1)//枚举块数
    {
        LL g1=ksm((op==1?g:gi),(mod-1)/m,mod);
        for(int i=0;i<n;i+=m)//枚举块组
        {
            LL gk=1;
            for(int j=0;j<m/2;++j)//枚举半块
            {
                LL x=A[i+j],y=(A[i+j+m/2]*gk)%mod;
                A[i+j]=(x+y)%mod,A[i+j+m/2]=(x-y+mod)%mod,gk=(gk*g1)%mod;
            }
        }
    }
    // 不需要处理浮点数问题
    if(op==-1) 
    {
        LL invn=ksm(n,mod-2,mod);
        for(int i=0;i<n;++i) A[i]=(A[i]*invn)%mod;
        // for(int i=0;i<n;++i) A[i]=A[i]/n;
    }
}
void solve() // ll
{   
    int n,m;cin>>n>>m;
    vector<int> A,B;
    A.resize(N),B.resize(N);
    rep(i,0,n) cin>>A[i];
    rep(i,0,m) cin>>B[i];
    for(m=n+m,n=1;n<=m;n<<=1);// 统一长度，长度为2的幂次
    NTT(A,n,1),NTT(B,n,1);// 两个多项式转换为 点值
    rep(i,0,n-1){A[i]=(A[i]*B[i])%mod;}// 点值做乘积运算
    NTT(A,n,-1);// 点值 转 系数的变换
    for(int i=0;i<=m;++i)
    {
        cout<<A[i]<<" \n"[i==m];
    }
}
```

## FFT(迭代版)
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
