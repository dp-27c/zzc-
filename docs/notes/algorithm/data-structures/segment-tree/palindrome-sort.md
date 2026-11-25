---
title: "线段树排序回文子串"
algorithms: []
sidebarOutline: true
---

# 线段树排序回文子串

[CF240F TorCoder - 洛谷](https://www.luogu.com.cn/problem/CF240F)
大意：
给定长度为 n 的小写字母字符串 ，m 次询问：
1. 将区间 内的字符串重新排序，使得区间为 回文子串，如果有多种情况，选择使得字典序最小的那种方案。
2. 若不能变成回文子串，则不做任何操作。

输出最后的字符串。
n,m<1e5

思路：
区间修改回文：
1. 统计 区间内每个字母的出现次数。并判断合法性 （长度奇偶 等于 奇数字母个数，且奇数字母不超过1个）
2. 将 区间分成 左右两个 部分， 左边 要字母从小到大 依次填入（记任务1），右边部分则 从大到小 依次填入（记任务2）。

创建的线段树 多两个参量，`cn[i]` 第 i 个字母在区间出现次数 ，`add` 懒标记 任务
- 对于 上面的 1 来说，区间查询 ，最后返回 `cn[i]` 数组 得到区间字母频率。
- 对于 上面的 2 来说，分成两个任务，第一个是 从小到大 覆盖原区间的`cn[i]`数组，另一个则反正来。
注意 pushdown 操作 需要结合 左右子树的长度，按照任务1 或者 任务2 的规则覆盖其原来的 `cn` 数组。

最后查询每一个字符是什么来输出即可。

注意 ：修改操作是 覆盖还是原基础上修改
如果是 直接覆盖，那么一定要将 原数据清空（全部修改掉）
漏网之鱼的代价就是 6 发 罚时
Code:

```cpp
// 线段树
#define rt tr[u]
#define ls tr[u<<1]
#define rs tr[u<<1|1]
struct Node{int l,r,add;vi cn;}tr[N<<2];
int a[N];
void pushup(int u){rep(i,0,25) rt.cn[i]=ls.cn[i]+rs.cn[i];}
void pushdown(int u)
{
    if(rt.add)
    {
        int lenl=ls.r-ls.l+1,lenr=rs.r-rs.l+1;
        int s=0,id=0,ff=1;
        ls.add=rt.add,rs.add=rt.add;
        if(rt.add&1)
        {
            rep(i,0,25) 
            {
                s+=rt.cn[i];
                if(ff&&s<=lenl) ls.cn[i]=rt.cn[i],rs.cn[i]=0;
                else if(ff){
                    ls.cn[i]=(lenl-(s-rt.cn[i]));
                    rs.cn[i]=(rt.cn[i]-ls.cn[i]);
                    ff=0;
                }
                else rs.cn[i]=rt.cn[i],ls.cn[i]=0;
            }
        }
        else
        {
            for(int i=25;i>=0;--i)
            {
                s+=rt.cn[i];
                if(ff&&s<=lenl) ls.cn[i]=rt.cn[i],rs.cn[i]=0;
                else if(ff){
                    ls.cn[i]=(lenl-(s-rt.cn[i]));
                    rs.cn[i]=(rt.cn[i]-ls.cn[i]);
                    ff=0;
                }
                else rs.cn[i]=rt.cn[i],ls.cn[i]=0;
            }
        }
        rt.add=0;
    }
}
void build(int u,int l,int r)
{
    rt={l,r,0};
    rt.cn.assign(26,0);
    rt.cn[a[l]]=1;
    if(l==r) return;
    int mid=l+r>>1;
    build(u<<1,l,mid),build(u<<1|1,mid+1,r);
    pushup(u);
}
void query(int u,int l,int r,vi& res)
{
    if(l<=rt.l&&rt.r<=r) 
    {
        rep(i,0,25) res[i]+=rt.cn[i];
        return;
    }
    int mid=rt.l+rt.r>>1;
    pushdown(u);
    if(l<=mid) query(u<<1,l,r,res);
    if(mid<r) query(u<<1|1,l,r,res);
    pushup(u);
}
int get(int u,int id)
{
    if(tr[u].l==tr[u].r){rep(i,0,25) if(rt.cn[i]) return i;}
    int mid=rt.l+rt.r>>1; 
    pushdown(u);
    if(id<=mid) return get(u<<1,id);
    else return get(u<<1|1,id);
}
void modify(int u,int l,int r,int v,vi& res)
{
    if(l<=rt.l&&rt.r<=r)
    {
        int s=0,i=(v&1?0:25),len=rt.r-rt.l+1,ff=1;
        while((v&1?(i)<26:(i)>=0))
        {
            s+=res[i];
            if(s<=len&&ff) rt.cn[i]=res[i],res[i]=0;
            else if(ff){rt.cn[i]=(len-(s-res[i])),res[i]-=rt.cn[i];ff=0;}
            else rt.cn[i]=0;
            i+=(v&1?1:-1);
        }
        rt.add=v;
        return;
    }
    int mid=rt.l+rt.r>>1;
    pushdown(u);
    if(l<=mid) modify(u<<1,l,r,v,res);
    if(mid<r) modify(u<<1|1,l,r,v,res);
    pushup(u);
}
void caozuo(int l,int r)
{
    vi res(26,0);
    query(1,l,r,res);
    int ff=0,fid=0;
    rep(i,0,25)
    {
        if(res[i]&1) ff++,fid=i;
        res[i]>>=1;
    }
    if(((r-l+1)&1)!=(ff)||ff>1) return;
    vi res2=res;
    int mid=l+r>>1,ml=mid-ff,mr=mid+1;
    if(ff) 
    {
        vi midres(26,0);midres[fid]=1;
        modify(1,mid,mid,1,midres);
    }
    modify(1,l,ml,1,res);
    modify(1,mr,r,2,res2);
}

void solve() // ll
{
    int n,m;cin>>n>>m;
    string s;cin>>s;
    rep(i,1,n) a[i]=(s[i-1]-'a');
    build(1,1,n);
    while(m--)
    {
        int l,r;cin>>l>>r;
        caozuo(l,r);
    }
    rep(i,1,n) cout<<(char)(get(1,i)+'a');cout<<endl;
}
```
