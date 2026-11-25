---
title: 基础代码模板
sidebarOutline: true
---

# 基础代码模板

## 快速幂 (A)
```cpp
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
```
### 更优质的快速幂（龟乘，抗爆流）B
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
LL ksm(LL a, LL b, LL c) {
    LL res = 1;
    while (b) {
        if (b & 1) res = qmul(res, a, c);
        a = qmul(a, a, c);
        b >>= 1;
    }
    return res;
}
```
## 矩阵快速幂
解析：
对于一个 $n*m$ 的矩阵 在 vii 数组中为 `a[n][m]`
图上表示便是：$3 \times 4$ 的矩阵
$\huge \begin{bmatrix}1&1  &1  \\0&1  &0  \\0&0  &1 \end{bmatrix}$

$\huge \begin{bmatrix}1\\1\\1\end{bmatrix}$    $3 \times 1$ 的矩阵
注意:
**矩阵乘法时要注意顺序**
只能   $3 \times 3$ 的矩阵  乘上  $3 \times 1$ 的矩阵   
得到一个   $3 \times 1$ 的矩阵   
而且 矩阵快速幂的对象只能是 $\huge n*n$ 的矩阵 

可以搭配王霸流（龟乘）来抗爆 
矩阵：
待补图片（矩阵.png）
```cpp
vii mul(vii a,vii b,int m)// a mul b .
{
    vii c(a.size(),vi(b[0].size(),0));
    //     n             m
    for(int i=0;i<a.size();++i)
    {
        for(int j=0;j<b[0].size();++j)
        {
            for(int k=0;k<a[0].size();++k)
            {
                c[i][j]=(c[i][j]+a[i][k]*b[k][j]%m+m)%m;
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
```
