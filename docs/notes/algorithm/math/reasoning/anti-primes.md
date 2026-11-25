---
title: "198. 反素数（约数个数，排序）"
algorithms: []
sidebarOutline: true
---

# [198. 反素数](https://www.acwing.com/problem/content/200/)（约数个数，排序）

大一：
 对于任何正整数 x，其约数的个数记作 g(x)，如果某个正整数 x 满足：对于任意的小于 x 的正整数 i，都有 g(x)>g(i)，则称 x 为反素数。

现在给定一个数 N，请求出不超过 N 的最大的反素数。（n<2e9)


思路：
 这题的思路很关键，下面是条件分析：

 欧拉筛，分解只因数。

 1.一个数的约数个数是其分解质因数后，各个 质因子的指数+1后 相乘 如 6 = 2 x 3  个数为 （1+1）*（1+1） = 4；

 2.对于一个反素数来说，存在与其相同约数数量的数一定大于这个反素数，因为反素数满足严格单调递增

 3.对于固定的指数搭配，比如 1 1 2 ，1 1 3，其必应从最小的质因子 2 开始往后，指数不增，（这是为了符合条件2）

 所以我们可以遍历质因子的指数搭配，所有在 n 范围内的 可能的约数个数，以及对应的值（建议用dfs剪枝，代码如下）

 然后排序，根据条件2和3，对定义的结构体 v w 排序，找出最优即可；
```cpp
struct vw
{
	int v,w;
	bool operator<(const vw& other)const
	{
		if(v==other.v) return w>other.w;
		return v<other.v;
	}
};
int ksm(int x, int k)
{
    int sum = 1;
    x%=mod;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % mod;
        x = (x * x) % mod, k >>= 1;
    }
    return sum;
}
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
        }
    }
}
void solve() // ll !
{
    int n;cin>>n;
    vector<vw> a;
    function<void(int,int,int,int)> dfs=[&](int id,int s,int r,int cnt)
    {
        if(s>n) return;
        if(r==0) return;
        a.push_back({cnt,s});
        
        rep(j,0,r)
        {
            dfs(id+1,s*ksm(pri[id],j),j,cnt*(j+1));
        }
    };
    dfs(0,1,32,1);
    sort(a.begin(),a.end());
    vi c;
    cout<<a.back().w<<endl;
}
```
