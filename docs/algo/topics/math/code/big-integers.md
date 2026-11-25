---
title: 高精度
sidebarOutline: true
---

# 高精度

## 高精度加：
```cpp
vi int_to_vi(int x)
{
    vi a;
    while(x)
    {
        a.push_back(x%10);
        x/=10;
    }
    return a;
}
vi gjd_add(vi a,vi b)
{
    if(a.size()<b.size()) swap(a,b);
    int tf=0;
    for(int i=0;i<b.size();++i)
    {
        a[i]=(a[i]+b[i]+tf);
        if(a[i]/10) tf=1;
        else tf=0;
        a[i]%=10;
    }
    if(tf)
    {
        int id=b.size();
        while(tf)
        {
            if(id==a.size()) a.push_back(tf),tf=0;
            else 
            {
                a[id]+=tf;
                if(a[id]/10) tf=1;
                else tf=0;
                a[id]%=10;
            }
            id++;
        }
    }
    return a;
}
```
## 高精度减：(no)

## 高精度乘法(NTT手动挡)
不用码复数，可以做取模（但高精度用不上，无伤大雅），注意码 ksm
时间上比FFT多了 逆元的时间复杂度，慢一丢丢。
```cpp
const LL g=3;//119;//mod = 998244353 时
const LL gi=ksm(g,mod-2,mod);//332748118;
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
    }
}
string gjd_mul(string a,string b)// NTT版，将mod改为998244353,g=3,gi=332748118
{
    vector<int> A,B;
    A.resize(N),B.resize(N);
    int n=a.size(),m=b.size();
    rep(i,0,n-1) A[i]=a[n-1-i]-'0';
    rep(i,0,m-1) B[i]=b[m-1-i]-'0';
    for(m=n+m-2,n=1;n<=m;n<<=1);
    NTT(A,n,1),NTT(B,n,1);
    rep(i,0,n-1){A[i]=(A[i]*B[i])%mod;}
    NTT(A,n,-1);
    int t=0;
    stack<int> stk;
    rep(i,0,n-1)
    {
        int d=A[i]+t;
        A[i]=(d)%10;
        t=d/10;
        stk.push(A[i]);
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
