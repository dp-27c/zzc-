---
title: 树状数组
sidebarOutline: true
---

# 树状数组

## BIT 封装


```cpp
struct BIT{
    int n;vi tr;
    BIT(int x = 0){init(x);}
    void init(int x){
        n = x;
        tr.assign(n+1,0);
        //rep(i,1,n) tr[i]=0;
    }
    void add(int x, int k){
        for(int i = x; i <= n; i += lowbit(i)) tr[i] += k;
    }
    int sum(int x){
        int ans = 0;
        for(int i = x; i; i -= lowbit(i)) ans += tr[i];
        return ans;
    }
    int kth(int k)// 从小到大排序，求第 k 大的值是多少？log复杂度
    {// 注意 k = 0 的时候 需要外部特判，不能在里面做查找。

        int sum=0,x=0;
        for(int i=log2(n);~i;--i)
        {
            x+=1LL<<i;
            if(x>=n||sum+tr[x]>=k) x-=1LL<<i;
            else sum+=tr[x];
        }
        return x+1;
    }
    int kth0(int k)
    {
        int sum=0,x=0;
        for(int i=log2(n);~i;--i)
        {
            x+=1LL<<i;
            if(x>=n||sum+(1LL<<i)-tr[x]>=k) x-=1LL<<i;
            else sum+=(1LL<<i)-tr[x];
        }
        return x+1;
    }
};
```


## 朴素纯净


```cpp
int tri[N];
void add(int id, int v)
{
    for(int i=id;i<N;i+=lowbit(i))
    {
        tri[i]+=v;
    }
}
int sum(int id)
{
    int s=0;
    for(int i=id;i;i-=lowbit(i)) s+=tri[i];
    return s;
}
```
