---
title: 质数
sidebarOutline: true
---

# 质数

## 欧拉筛（筛质数）
### 普通版
时间复杂度：$O(n)$
```cpp
vi vis(N,0),pri;
void init()
{
    vis[1]=1;
    rep(i,2,N-1)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
        }
        rep(j,0,pri.size()-1)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=pri[j];
            if(vis[i]<=pri[j]) break;
            //if(i%(pri[j])==0) break; 优化1e8的空间复杂度，vis为bool型
        }
    }
}
```
### 欧拉筛+1e6的欧拉函数
**!待改进，因为不是自己手码的板子，建议改进成自己的版本，不然别用**
```cpp
int pri[N],phi[N],cnt;
bool vis[N];
void init(int n)
{
    phi[1]=1;
    for(int i=2;i<=n;i++)
    {
        if(!vis[i])
        {
            pri[cnt++]=i;
            phi[i] = i-1;
        }
        for(int j =0;pri[j]*i<=n;j++)
        {
            vis[pri[j]*i]=true;
            if(i%pri[j]==0)
            {
                phi[i*pri[j]] = phi[i]*pri[j];
                break;
            }
            phi[i*pri[j]] = phi[i]*(pri[j]-1);
        }
    }
}
```
### 欧拉筛结合莫比乌斯函数：
莫比乌斯函数：
分解质因数后 `u[i]` 表示
1. 质因数相乘的数量为奇数个 ==  -1;
2. 质因数相乘的数量为偶数个 ==   1;
3. 有大于 1 的平方因数           ==    0；
4. 1  就   是 1  ！！
可以放进求不互质的数对个数中，用容斥原理。
```cpp
vector<bool> vis(N,0);
vi pri;
vi s(N,0);
vi mu(N,0);
void init()
{
    vis[1]=1;
    mu[1]=1;
    for(int i=2;i<N;i++)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=1;
            mu[i]=-1;
        }
        for(int j=0;j<pri.size();++j)
        {
            if(i*pri[j]>=N) break;
            vis[i*pri[j]]=1;
            mu[i*pri[j]]=mu[i]*-1;
            if(i%pri[j]==0)
            {
                mu[i*pri[j]]=0;
                break;
            }
        }
    }
    //前缀和操作：
    // rep(i,1,N-1)
    // {
    //     s[i]=s[i-1]+mbws[i];
    // }
}
```
## Miller_rabin 素性检测：
时间复杂度：$O(klog^3n)$
注意用龟乘快速幂，不然可能会爆。
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
bool Miller_Rabin(int x)
{
	if(x==1) return false;
    auto panduan=[&](int a,int x)
    {
        int re=ksm(a,x-1,x);
        if(re!=1) return false;
        int mi=x-1;
        while(mi%2==0)
        {
            mi>>=1;
            re=ksm(a,mi,x);
            if(re==x-1) break;
            if(re!=1) return false;
        }
        return true;
    };
    //vi pa={2,7,61};//2^32以内
    vi pa={2,325,9375,28178,450775,9780504,1795265022};//2^78以内
    //vi pa={2, 3, 5, 7, 11, 13, 17, 19, 23,29,};
    for(auto it:pa)
    {
        if(it<x&&panduan(it,x)==false) return false;
    }
    return true;
}
```
## 欧拉函数
求前x个与 x 互质的数的个数，时间复杂度$O(\sqrt{x} )$  
```cpp
int ohla(int x)
{
    int res=x;
    for(int i=2;i*i<=x;++i)
    {
        if(x%i==0)
        {
            int s = 0;
            res=res/i*(i-1);
            while(x%i==0) ++ s,x/=i;
        }
    }
    if(x>1) res=res/x*(x-1);
    return res;
}
```
