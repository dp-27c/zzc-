---
title: "矩阵快速幂"
algorithms: []
sidebarOutline: true
---

# 矩阵快速幂

## 斐波那契数列快速幂



## 棋盘摆法(luogu蓝)

[# P5059 中国象棋]([P5059 中国象棋 - 洛谷](https://www.luogu.com.cn/problem/P5059))
```cpp
typedef long long LL;
LL qmul(LL a, LL b, LL c) {
    LL res = 0;
    while (b) {
        if (b & 1) res = (res + a) % c;
        a = (a + a) % c;
        b >>= 1;
    }
    return res;
}
//快速幂
LL qmi(LL a, LL b, LL c) {
    LL res = 1;
    while (b) {
        if (b & 1) res = qmul(res, a, c);
        a = qmul(a, a, c);
        b >>= 1;
    }
    return res;
}
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
int gcd(int a,int b)
{
    return b?gcd(b,a%b):a;
}
int Mod(int a,int b)
{
    if(b==0) return a;
    return (a%b+b)%b;
}
vii mul(vii a,vii b,int m)
{
    vii c(a.size(),vi(b[0].size(),0));
    for(int i=0;i<a.size();++i)
    {
        for(int j=0;j<b[0].size();++j)
        {
            for(int k=0;k<a[0].size();++k)
            {
                c[i][j]=(c[i][j]+qmul(a[i][k],b[k][j],m))%m;
            }
        }
    }
    return c;
}
vii jzksm(vii x,int k,int M)
{
    if(x.empty()) return {{-1}};
    if(x.size()!=x[0].size()) return {{-1}};
    vii c(x.size(),vi(x.size()));
    for(int i=0;i<x.size();++i) c[i][i]=1;
    while(k)
    {
        if(k&1) c=mul(c,x,M);
        x=mul(x,x,M),k>>=1;
    }
    return c;
}

void solve() // ll !
{
    int n,k,m;
    cin>>n>>m;
    n++;
    if(n<3){cout<<0<<endl;return;}
    n-=3;
    vii f(4,vi(1,0));
    vii tool(4,vi(4,0));
    f[0][0]=1,f[1][0]=0,f[2][0]=2,f[3][0]=1;
    tool[0][0]=1,tool[0][1]=1,tool[0][2]=1,tool[1][0]=1,tool[2][2]=1,tool[2][3]=1;
    tool[3][3]=1;
    tool=jzksm(tool,n,m);
    f=mul(tool,f,m);
    int ans=Mod(f[0][0],m);
    ans=qmi(ans,n+3,m);
    cout<<ans<<endl;

}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t_ = 1;
    //cin>>t_;
    //init();
    while (t_--){solve();}
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```
