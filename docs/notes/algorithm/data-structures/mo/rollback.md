---
title: "回滚莫队"
algorithms: []
sidebarOutline: true
---

# 回滚莫队

## 只增回滚莫队：
以一个简单的例题为例
[AT_joisc2014_c 歴史の研究 - 洛谷](https://www.luogu.com.cn/problem/AT_joisc2014_c)
大意：
定义一个数的重要度为 $x\times cnt_x$
求区间 最大重要度的 值 和对应的 数字

思路：

用普通莫队而言，我们可以正确维护 $cnt_x$ 这个数组，但是对于 $x \times cnt_x$ 这个信息的最大值维护却比较困难，因为删除信息的时候，不能高效地得出答案。

这个时候用到只增回滚莫队：
区别在于，将区间按照 左区间 的块位置 升序，第二关键字为 r 的位置升序（这一点和 普通莫队一样）
然后处理按照左区间 处理每个块的问题：

待补图片（Pasted image 20251017194347.png）

可以看到 下面的 6 个区间 左端点都在 一个块。

此时我们再将这些区间分类：
1. 左右区间都在 块里，如 这 6 个区间的 前3个区间。
2. 右区间不属于这个 块，如 后面 3 个区间
对于第一种情况，每一个直接暴力算出区间的 最大重要度。时间复杂度为 $O(n\sqrt{n})$

第二种情况就要用只增回滚莫队

维护的区间 从 (6,5) 开始，区间内元素为0.
按照区间顺序，向右 扩张到 第一个值的 r  端（9）
此时区间有 (6,9) 的cnt信息 与 ans 信息（最大重要度）
然后我们 创建一个新的 cnt 数组 叫 back_cnt 以及 新的 ans 信息 back_ans。
back_cnt 的信息一开始为当时 (6,9) 的cnt 信息，back_ans 同理。
然后我们用新的这个信息 去往左扩张 到3位置，此时 就可以用 back_cnt,和 back_ans 去求出(3,9)的解了。

利用完 back_cnt 和 back_ans 后，就可以丢弃他们了，从 cnt 和 ans 目前维护的区间 (6,9) 去走下一个区间(2,15)
继续 重复 类似 (3,9)的操作就好了。

转到 下一个新的块时，我们重置 cnt 和 ans ，开始像 上面的操作一样完成每个块 的区间任务。

神奇的是，这么看似复杂的操作，时间复杂度上面却 仍然只有 $O(n\sqrt{n})$。这个建议自己想一想，为什么复杂度和普通莫队一样。

所以总共的时间复杂度为 $O(n\sqrt{n})$

细节：由于复制一份 cnt 数组的时间复杂度太高了，所以我们可以考虑只保存 ans 的答案，然后我们再 back 操作后，重新沿着原来的路返回，此次返回的过程维护 区间 cnt 数组，将原来数字增加的数原数减回去，达到回滚的效果！！

### 代码模版：
(因为吊毛 atcode 人机认不出来，我就先存在这里等提交好了，样例是全 ac 的)
（这个代码是已经提交并且 ac 的，时间上只有 770 ms）

```cpp
vi pos;
struct Q{int l,r,id;};
void solve() // ll
{   
	// 初始数据的创立
    int n,m;cin>>n>>m;
    vi a(n+1,0);
    pos.resize(n+1);
    map<int,int> mp;
    int siz=pow(n,1.0/2.0),tid=0;
    rep(i,1,n)
    {
        cin>>a[i];
        if(mp.find(a[i])==mp.end()) mp[a[i]]=tid++;
        pos[i]=i/siz;
    }
    vi b(n+1,0);
    rep(i,1,n) b[i]=a[i],a[i]=mp[a[i]];
    
    // 读入询问
    vector<Q> q(m);
    vector<pii> ans(m);
    rep(i,0,m-1)
    {
        int l,r;cin>>l>>r;
        q[i]={l,r,i};
    } 
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });

	// 设置莫队参量
    int prepos=-1;
    int l=1,r=0;
    vi cnt(mp.size(),0);
    pii res;
    
    auto Add=[&](int id)// 只增操作
    {
        cnt[a[id]]++;
        int d=b[id]*cnt[a[id]];
        if(d>res.first)
        {
            res={d,b[id]};
        }
    };
    
    auto init=[&]()// 进度到下一块的初始化
    {
        fill(cnt.begin(),cnt.end(),0);
        res={0,-1};
    };
    
    auto back=[&](int id) // 回溯操作：切记线性回溯
    {
        // vi back_cnt=cnt; 不要复制，使用原路返回
        pii back_res=res;
        int _l=l;
        while(_l>id) Add(--_l);
        pii d=res;// 保存答案
        res=back_res;// 回溯状态
        while(_l<l) cnt[a[_l++]]--;
        // cnt=back_cnt;
        return d;
    };
    int ff=1;
    for(auto x:q)
    {
        if(pos[x.l]!=prepos) // 到达下一块更新
        {
            prepos=pos[x.l];
            init();
            l=(pos[x.l]+1)*siz;
            r=l-1;
        }
        
        if(pos[x.r]==pos[x.l])// 同块暴力
        {
            int _l=x.l,_r=_l-1;//与 l 和 r 不干涉
            while(_r<x.r) Add(++_r);
            ans[x.id]=res;
            // while(_r>_l-1) cnt[a[_r--]]=0;
            init();
        }
        
        else 
        {
            while(r<x.r) Add(++r);
            pii d=back(x.l);
            ans[x.id]=d;
        }
    }
    for(auto x:ans) cout<<x.first<<endl;

}
```

### 区间相同值的最长距离
大意：
给定长度为 n 的数组，m次询问。
询问：
- 给出 l ，r 求出区间内相同值之间的最大距离。

思路：
为什么是回滚莫队。
因为删除一个值的时候，往往已经覆盖掉了上一个值的内容，从而不便于区间的收缩。

回滚莫队的话，需要维护数组 `pnl[i],pnr[i]` 表示 i 在区间的最左端和最右端。
区间扩张的时候先更新，再比较`pnr[v]-pnl[v]和res`,更新答案。

注意，回滚时，为了高效回滚，我们可以提前设立一个新数组 `bc[i]` 表示向左扩张时，维护扩张部分的区间每个值的最右端，（因为不能保证res的值不出现在左边扩张区间的距离）。然后和 `pnr[v]-_l和bc[v]-_l`，（_ l 表示左扩张时的区间左边界）

回滚的时候只要把 左扩张部分的 v 值在 `bc` 上归零。

代码：

```cpp
vi pos;
struct Q{int l,r,id;};
void solve() // ll
{   
    int n,m;cin>>n;
    vi a(n+1,0);
    pos.resize(n+1);
    map<int,int> mp;
    int siz=pow(n,1.0/2.0),tid=0;
    rep(i,1,n)
    {
        cin>>a[i];
        if(mp.find(a[i])==mp.end()) mp[a[i]]=tid++;
        pos[i]=i/siz;
    }
    cin>>m;
    rep(i,1,n) a[i]=mp[a[i]];
    vector<Q> q(m);
    vector<int> ans(m);
    rep(i,0,m-1)
    {
        int l,r;cin>>l>>r;
        q[i]={l,r,i};
    } 
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });

    int prepos=-1,res=0;
    int l=1,r=0;
    vi pnl(mp.size(),n+1);// 区间i 最左的位置
    vi pnr(mp.size(),0);// 区间i 最右的位置
    vi bc(mp.size(),0);// back 的区间最左位置
    auto Add=[&](int id)
    {
        pnl[a[id]]=min(id,pnl[a[id]]);
        pnr[a[id]]=max(id,pnr[a[id]]);
        res=max(res,pnr[a[id]]-pnl[a[id]]);
    };
    auto init=[&]()
    {
        fill(pnl.begin(),pnl.end(),n+1);
        fill(pnr.begin(),pnr.end(),0);
        res=0;
    };
    auto back=[&](int id)
    {
        int back_res=res;
        int _l=l;
        while(_l>id)
        {
            --_l;
            if(bc[a[_l]]==0) bc[a[_l]]=_l;
            res=max(res,max(pnr[a[_l]]-_l,bc[a[_l]]-_l));
        }
        int d=res;
        res=back_res;
        while(_l<l)
        {
            bc[a[_l]]=0;
            ++_l;
        }
        return d;
    };
    for(auto x:q)
    {
        if(pos[x.l]!=prepos)
        {
            init();
            res=0;
            l=(pos[x.l]+1)*siz;
            r=l-1;prepos=pos[x.l];
        }
        if(pos[x.r]==pos[x.l])
        {
            int _l=x.l,_r=_l-1;
            while(_r<x.r) Add(++_r);
            ans[x.id]=res;res=0;
            // rep(i,x.l,x.r) pnl[a[i]]=n+1,pnr[a[i]]=0;
            init();
        }
        else 
        {
            while(r<x.r)Add(++r);
            int d=back(x.l);
            ans[x.id]=d;
        }
    }
    for(auto x:ans) cout<<x<<endl;
    
}
```

### 区间数量严格大于总长的三分之一
大意：
给定数组 ，长度为 n，
m 次询问，给出 区间 l 和 r。
输出 每次询问区间中 数量大于 其区间长度的三分之一的数字。

思路：
莫队思路。
对于数字的数量大于三分之一，这意味着只有最多两个数字合法，因此，我们不妨去找到区间出现次数最多的两个值。
找到区间最多的数字，求众数在普通莫队里面已经得到方法。（这里也可以尝试一下众数的方法，当然这里提供的不是这个方法）

由于缩减的操作比较繁琐，考虑的情况复杂，故考虑只增回滚莫队。

维护区间的数字出现数量 cn 同时更新 出现次数最多的数字 和 出现次数第二多的数字 （要防止两者相同）

回滚完后，需要判断这两个数字是否合法，即 `cn[mx]>(r-l+1)/3` 才能被添加到 答案数组 中。

注意如果没有满足条件的要输出 -1 。
代码：

```cpp
vi pos;
struct Q{int l,r,id;};
void solve() // ll
{   
    int n,m;cin>>n>>m;
    vi a(n+1,0);
    pos.clear();
    pos.resize(n+1);
    map<int,int> mp;
    int siz=pow(n,1.0/2.0),tid=0;
    vi idx(n+1,0);
    rep(i,1,n)
    {
        cin>>a[i];
        if(mp.find(a[i])==mp.end()) idx[tid]=a[i],mp[a[i]]=tid++;
        pos[i]=i/siz;
    }
    rep(i,1,n) a[i]=mp[a[i]];
    vector<Q> q(m);
    vector<pii> ans(m);
    rep(i,0,m-1)
    {
        int l,r;cin>>l>>r;
        q[i]={l,r,i};
    } 
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    vi cn(n+2,0);
    int prepos=-1;
    int l=1,r=0;
    int mx=n+1,mx2=n+1;
    auto Add=[&](int id)
    {
        int v=a[id];
        cn[v]++;
        if(cn[v]>=cn[mx]&&v!=mx) mx2=mx,mx=v;
        else if(cn[v]>cn[mx2]&&v!=mx) mx2=v;
    };
    auto init=[&]()
    {
        fill(cn.begin(),cn.end(),0);
        mx=n+1,mx2=n+1;
    };
    auto panduan=[&](int len,int x)
    {
        return cn[x]>len/3;
    };
    auto back=[&](int id)
    {
        int back_mx=mx,back_mx2=mx2;
        int _l=l;
        while(_l>id) Add(--_l);
        pii d={0,0};
        if(panduan(r-id+1,mx)) d.first=idx[mx];
        if(panduan(r-id+1,mx2)) d.second=idx[mx2];
        while(_l<l) cn[a[_l++]]--;
        mx=back_mx,mx2=back_mx2;
        return d;
    };
    for(auto x:q)
    {
        if(pos[x.l]!=prepos)
        {
            prepos=pos[x.l];
            init();
            l=(pos[x.l]+1)*siz;
            r=l-1;
        }
        if(pos[x.r]==pos[x.l])
        {
            int _l=x.l,_r=_l-1;
            while(_r<x.r) Add(++_r);
            pii d={0,0};
            if(panduan(x.r-x.l+1,mx)) d.first=idx[mx];
            if(panduan(x.r-x.l+1,mx2)) d.second=idx[mx2];
            
            ans[x.id]=d;
            while(_r>_l-1) cn[a[_r--]]--;
            mx=n+1,mx2=n+1;
        }
        else 
        {
            while(r<x.r) Add(++r);
            pii res=back(x.l);
            ans[x.id]=res;
        }
    }
    for(auto x:ans)
    {
        if(x.first==0){cout<<-1<<endl;continue;}
        if(x.second==0) {cout<<x.first<<endl;continue;}
        if(x.first>x.second) swap(x.first,x.second);
        cout<<x.first<<" "<<x.second<<endl;
    }
}
```

## 只删回滚莫队
无师自通版本，首先注意到 普通莫队的情况下，对于维护加操作是 比较困难的，维护减操作则简单明了。
像只增一样，我们先将区间排序：
以 左端点的块位置为第一关键字升序 。
以 右端点的块位置为第二关键字降序。（后续会讲）

分类：
1. 左右同块的暴力求出
2. 左右不同块的考虑回滚

区别在于，因为我们按照第二关键字的降序，所以先处理的是左右不同块的。

每次块不同，初始化应当是归零所有维护的数据，统一成 此块的左端点 到 n （最右端）
从最开始的区间为 `pos[l]*siz - n` 开始先 减右端点。 然后再回滚左端点进行减少（思路和只增类似）

### 区间 mex
大意：
给定数组，求区间mex

思路：
考虑 莫队。
因为 mex 是区间最小未出现的自然数，所以当维护 `cn[i]` 数组的时候，删除的话直接比较是否归零和是否小于 res 就好了，而 增加的话，还要统筹兼顾后面的连续数量，非常不方便。
因而 考虑只删回滚莫队。

维护 cn 数组

代码：

```cpp
void solve() // ll
{   
	// 初始化数据操作：
    int n,m;cin>>n>>m;
    pos.resize(n+1);
    vi a(n+1,0);
    int siz=sqrt(n);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    
    // 询问读入操作：
    vector<Q> q;
    rep(i,0,m-1)
    {
        int l,r;cin>>l>>r;
        q.push_back({l,r,i});
    }
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r>b.r:pos[a.l]<pos[b.l];
    });
    vi ans(m);
    vi cn(2e5+1,0);
    int l=1,r=0,res=0;
    
    auto Sub=[&](int id)
    {
        int v=a[id];
        cn[v]--;
        if(cn[v]==0&&v<res) res=v;
    };
    
    auto back=[&](int id)
    {
        int back_res=res,_l=l;
        while(_l<id) Sub(_l++);
        int d=res;
        res=back_res;
        while(_l>l) cn[a[--_l]]++;
        return d;
    };
    
    auto init=[&]()// 初始化增加 l 到 n 的数据。
    {
        fill(cn.begin(),cn.end(),0);
        rep(i,l,n)
        {
            cn[a[i]]++;
        }
        rep(i,0,n)
        {
            if(cn[i]==0)
            {
                res=i;break;
            }
        }
    };
    
    int prepos=-1;
    for(auto x:q)
    {
        if(prepos!=pos[x.l])
        {
            prepos=pos[x.l];
            l=pos[x.l]*siz;// 左端块的第一个位置
            if(l==0) l=1;
            init();
            r=n;
        }
        
        while(r>x.r) Sub(r--);// 因为后往前 都不需要把暴力拎出来，顺手解决
        int d=back(x.l);
        ans[x.id]=d;
    }
    for(auto x:ans) cout<<x<<endl;
}
```
