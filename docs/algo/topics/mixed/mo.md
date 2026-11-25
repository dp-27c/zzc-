---
title: 莫队
sidebarOutline: true
---

# 莫队

## 综合莫队处理：

### 前缀差分+异或和

[P3604 美好的每一天 - 洛谷](https://www.luogu.com.cn/problem/P3604)
大意：
给定长度为n的由小写字母组成字符串，给出m次询问，求区间 l-r 中有多少子串可以通过排序内部元素来形成回文串？

n,m≤60000

思路：
首先思考判断一个子串是否可以通过排序来形成子串？

只要子串里 （a - z）的数量都为偶数，或者其中一个为奇数，其余都为偶数。

然后思考如何快速得到区间答案的值。
因为只有26个字母，所以对于26种奇偶性的维护可以用一个26位的二进制数就可以解决了。
我们对这个数组做一个前缀思路，那区间状态就是 `s[r]-s[l-1]`，但是因为考虑的是奇偶性转变问题，所以应该是前缀的异或差分

对第i个数做前缀异或操作，在上一个状态下，对该位置字母的位置上 异或1。

莫队维护数组 `cn[i]` 表示区间 状态为 i 的数量有多少，那么每次区间的增减就是找到区间所有使得 它的值异或后合法的 那些值的数量：即异或`1000,0100,0010,0001,0000` （例如）。

每次操作有26次，因为本题的数据范围没有2e5，所以$O(26n\sqrt{n})$ 是可以接受的。

### 区间分块+值域分块

[P4396 [AHOI2013] 作业 - 洛谷](https://www.luogu.com.cn/problem/P4396)
大意：
给定长度为 n 的数组 ，m次询问：
每次询问给出 区间 l 和 r，以及范围 a ，b。
求区间 中数值在 a 和 b 的范围内的数有多少个，并且求出有多少种。
n ,m < 1e5 , a , b < 1e5 .

思路：
在区间内莫队分块，在处理 a ， b 范围的数的信息用值域分块。

总的来说就是维护 `cn[i]` 值为 i 的数出现了多少次，`pn[i]` 区间是否有值为i的数。
做完区间维护后，对于 $a$ 和 $b$，枚举 $a,a+1,\ldots,b$ 的信息算出 $a$、$b$ 范围内的东西。
但是这样暴力枚举会超时。

我们优化暴力枚举的过程，将0 - 1e5 的值域根号分块，在维护 cn 和 pn 数组的同时，我们同时维护 `cnpos[i]` `pnpos[i]` 分别表示 cn 的 第i个块的总和，以及 pn 第i个块的总和。

判断 a 和 b 时，判断 a 和 b 之间是否有完整的块，有就将那些完整块的和统计入答案内，剩下的部分暴力枚举就好了。
如果没有完整的块，直接暴力。时间复杂度为 $O(m\sqrt{n})$

加上莫队的操作，总时间复杂度为 $O(n\sqrt{n}+m\sqrt{n})$

## 普通莫队

### 概念

解决大部分 离线询问 问题。
主要的思想是 分块 。
时间复杂度 为 $O(n\sqrt{n})$

好写


### 理解：

对于当前区间`[l,r]`,按照以下 四种情况 分类讨论。
1. `add(--l)`加上左边的贡献，并区间左向左拓展一格。
2. `add(++r)`加上 右边的贡献，并且区间右向右拓展一格。
3. `sub(l++)` 减去 当前左边的贡献，并且区间左 向右 缩小。
4. `sun(r--)`减去 当前右边的贡献，并且区间右 向左 缩小。

但是 询问的顺序不同 ，时间复杂度上 会相差很多,因此在 遍历区间顺序 上的优化考虑 分块。

莫队的核心在于，增删的部分的时间复杂度尽量维护在 $O(1)$


### 模版：


```cpp
vi pos;// 用于分块
struct Q{int l,r,id;};
void solve() // ll
{
    int n;cin>>n;
    int siz=sqrt(n);
    vi a(n+1,0);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    int m;cin>>m;
    vector<Q> q(m);
    vi ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });// 按照l所在的块
    int l=1,r=0,res=0;
    auto Add=[&](int id)
    {
        res+=a[id];
    };
    auto Sub=[&](int id)
    {
        res-=a[id];
    };
    for(auto &x:q)
    {
        while(l>x.l) Add(--l);
        while(r<x.r) Add(++r);
        while(l<x.l) Sub(l++);
        while(r>x.r) Sub(r--);
        ans[x.id]=res;
    }
    rep(i,0,m-1) cout<<ans[i]<<endl;
}
```


## 带修莫队

### 概念：

在 访问区间信息的过程中，穿插对某个位置的修改操作。


### 思路：

在普通莫队的基础上，引入修改的时间轴进Q里面。
按照关键字：
1. 左端点的块号，从小到大。
2. 右端点的快号，从小到大。
3. 修改时间的数值，从小到大。 这个不能忘！！
维护 时间窗口`[1……t]` 来表示 修改区间。
时间区间的维护只要 $(0->tim)$ 就好了
时间区间的维护只要 $0\to \mathrm{tim}$ 就好了
最优的块长设置为 $n^{2/3}$，查询任务依次处理的时间复杂度为 $O(n^{5/3})$



### 模版：

[P1903 [国家集训队] 数颜色 / 维护队列 /【模板】带修莫队 - 洛谷](https://www.luogu.com.cn/problem/P1903)
以求区间不同数字的个数为例

```cpp
vi pos;
struct Q{int id,l,r,ti;};
void solve() //ll
{
    int n,m;cin>>n>>m;
    vi a(n+1,0);
    map<int,int> mp;
    int pid=0,siz=pow(n,2.0/3.0);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
        if(mp.find(a[i])==mp.end()) mp[a[i]]=pid++;// 离散化
    }
    rep(i,1,n) a[i]=mp[a[i]];
    vector<Q> q;  
    vector<pii> change;change.push_back({0,0});// 补一个 0 号时间
    int time=0,cnid=0;
    rep(i,0,m-1)
    {
        char c;cin>>c;
        int l,r;cin>>l>>r;
        if(c=='Q')
        {
            q.push_back({cnid++,l,r,time});// 此时的任务编号不能是 i
        }
        else 
        {
            if(mp.find(r)==mp.end()) mp[r]=pid++;// 离散化
            change.push_back({l,mp[r]});time++;
        }
    }
    vector<int> ans(q.size());
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?pos[a.r]==pos[b.r]?a.ti<b.ti:pos[a.r]<pos[b.r]:pos[a.l]<pos[b.l];// 还要补上时间轴的排序
    });
    int l=1,r=0,tim=0,res=0;
    vi cn(N,0);
    auto Add=[&](int id)
    {
        int v=a[id];
        if(cn[v]==0) res++;
        cn[v]++;
    };
    auto Sub=[&](int id)
    {
        int v=a[id];
        cn[v]--;
        if(cn[v]==0) res--;
    };
    auto changetime=[&](int tim) 
    {
        int id=change[tim].first,w=change[tim].second;
        if(id>=l&&id<=r)// 如果在区间内，则维护cn
        {
            cn[a[id]]--;if(cn[a[id]]==0) res--;// 删掉 原区间数
            if(cn[w]==0) res++;// 增加 改数
            cn[w]++;
        }
        swap(a[id],change[tim].second);
    };
    for(auto &x:q)
    {
        while(r<x.r)Add(++r);
        while(l>x.l)Add(--l);
        while(r>x.r)Sub(r--);
        while(l<x.l)Sub(l++);
        while(tim>x.ti)changetime(tim--);// 注意维护 0 到 tim 的时间莫队窗口
        while(tim<x.ti)changetime(++tim);
        ans[x.id]=res;
    }
    for(auto x:ans) cout<<x<<endl;
}
```


## 回滚莫队：

### 只增回滚莫队：

在增加操作相对更加简单的时候我们考虑只增回滚莫队。
核心要点：
1. 询问排序和普通莫队一样。
2. 对与左右区间在同一个块的询问，我们直接暴力！！
3. 对于区间不在同一块的（因为我们是按照右端点降序的），左端点固定为 l 块的下一个块的第一个位置，先去右端点往右扩张，到达目的后，记录状态，左边向左延伸，完成后返回答案的同时还有回溯左端点的状态。
按照左端的块来枚举每一个状态。

有哪些适合只增回滚：
1. 区间相同值的最长距离
2. 区间数量严格大于总长的三分之一
3. 众数是哪个数？


#### Code（模版）：


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




### 只删回滚莫队：

显而言之，区间的增操作对于答案变化 很不方便的，减则比较方便的。
核心要点：
1. 像只增一样，我们先将区间排序：
- 以 左端点的块位置为第一关键字升序 。
- 以 右端点的块位置为第二关键字降序。（后续会讲）

2. 分类：
-  左右同块的暴力求出
-  左右不同块的考虑回滚
区别在于，因为我们按照第二关键字的降序，所以先处理的是左右不同块的。

每次块不同，初始化应当是归零所有维护的数据，统一成 此块的左端点 到 n （最右端）
从最开始的区间为 `pos[l]*siz - n` 开始先 减右端点。 然后再回滚左端点进行减少（思路和只增类似）

处理问题有： 区间 mex
这里对区间mex 做一步解释：
因为 mex 是区间最小未出现的自然数，所以当维护 `cn[i]` 数组的时候，删除的话直接比较是否归零和是否小于 res 就好了，而 增加的话，还要统筹兼顾后面的连续数量，非常不方便。
因而 考虑只删回滚莫队。



#### Code：（模版）


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



## 莫队二次离线：（巨阴）

当莫队转移的过程中出现 只增 和 只删 都不太好使的时候，考虑二次离线。

二次离线的思维在于，将莫队的区间转移过程记录为新的任务，新的任务同样具有 `l , r , id` 的参数，但是是否需要多一个参数来记录当前过程：

eg：下面的模版题，就是通过固定区间转移的 前缀 和 后缀 来达到区间转移的效果。

最后每个答案都保留了区间转移的总贡献，当然这还没有结束，因为区间转移还是在上一个区间的基础上贡献的计算，所以我们还要根据最开始莫队的 队列顺序进行前缀和。

因为前面已经莫队过了，所以后面的区间贡献计算直接枚举就好了。
优化时间复杂度从 $O(nk\sqrt{n}) \longrightarrow O(nk+n\sqrt{n})$


### Code:（模版）


```cpp
vi pos;
struct Q{int l,r,id;}; // 主任务
struct tastl{int cur,l,r,op,id;} ;// 表示左端点的 转移任务
struct tastr{int cur,l,r,op,id;} ;// 表示右端点的 转移任务
// cur 表示 固定的前缀点 或者 固定的后缀点
void solve() // ll
{   
	// 初始数据的处理
    int n,m,k;cin>>n>>m>>k;
    vi kk;
    rep(i,0,16383) if(count_bit(i)==k) kk.push_back(i);// 题目特定
    vi a(n+2,0);
    int siz=sqrt(n);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    
    // 初始化 前缀 和 后缀
    vi sum(n+2,0),mus(n+2,0);
    vi cn(16384,0);
    rep(i,1,n)
    {
        sum[i]+=cn[a[i]];
        for(auto x:kk)
        {
            cn[x^a[i]]++;
        }
    }
    fill(cn.begin(),cn.end(),0);
    for(int i=n;i>0;--i)
    {
        mus[i]+=cn[a[i]];
        for(auto x:kk)
        {
            cn[x^a[i]]++;
        }
    }
    fill(cn.begin(),cn.end(),0);
    
    // 询问数据的处理
    vi ans(m);
    vector<Q> q;
    rep(i,0,m-1)
    {
        
        int l,r;cin>>l>>r;
        q.push_back({l,r,i});
    }
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?(pos[b.l]&1?a.r>b.r:a.r<b.r):pos[a.l]<pos[b.l];
        //return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });
    
    
    // 离线化 莫队区间扩张和缩小的任务
    int l=1,r=0;
    vector<tastl> tl;
    vector<tastr> tr;
    // 其实只要一个序列就好了，后续优化更近
    //vector<tast> t;
    for(auto x:q)
    {
        //tl.push_back({l-1,l,r,-1,x.id}); // 最追加的初始任务 这个后面直接用任务前缀和优化
        if(r<x.r) tl.push_back({l-1,r+1,x.r,-1,x.id}),r=x.r;// 定前缀，右边界扩张
        //while(r<x.r) ans[x.id]+=sum[++r];
        if(l>x.l) tr.push_back({r+1,x.l,l-1,-1,x.id}),l=x.l;// 定后缀，左边界扩张
        //while(l>x.l) ans[x.id]+=mus[--l];
        if(l<x.l) tr.push_back({r+1,l,x.l-1,1,x.id}),l=x.l;//  定后缀，左边界缩小
        //while(l<x.l) ans[x.id]-=mus[l++];
        if(r>x.r) tl.push_back({l-1,x.r+1,r,1,x.id}),r=x.r;//  定前缀，右边界缩小
        //while(r>x.r) ans[x.id]-=sum[r--];
    }
    // 上面是第二次离线，即将莫队区间扩和缩小看成是任务
    
    
    //  离线任务的比较函数,直接按照 前缀点升序，后缀点降序排
    auto cmpl=[&](tastl a,tastl b)
    {
        return a.cur<b.cur;
    };
        // 后缀任务要 以靠后为优先
    auto cmpr=[&](tastr a,tastr b)
    {
        return a.cur>b.cur;
    };
    
    // 先对 左区间扩张 
    sort(tl.begin(),tl.end(),cmpl);
    int cur=0; // 前缀 任务 ,因为已经莫队过了，所以此时直接枚举就是最快的
    int res=0; // 计算贡献值
    fill(cn.begin(),cn.end(),0);
    // 传入前缀值或者后缀值来维护总体
    auto Add=[&](int id,vi &s) 
    {
        res+=cn[a[id]];
        res-=s[id];// 因为总前缀计算和固定前缀的计算方式是相反的。
    };
    for(auto x:tl)
    {
        while(cur<x.cur)
        {
            ++cur;
            for(auto p:kk)
            {
                cn[a[cur]^p]++;
            }
        }
        res=0;
        rep(i,x.l,x.r) Add(i,sum);
        ans[x.id]+=(x.op)*(res);
    }
    
    
    // 后缀 任务
    sort(tr.begin(),tr.end(),cmpr);
    cur=n+1;
    fill(cn.begin(),cn.end(),0);
    for(auto x:tr)
    {
        while(cur>x.cur)
        {
            --cur;
            for(auto p:kk)
            {
                cn[a[cur]^p]++;
            }
        }
        res=0;
        rep(i,x.l,x.r) Add(i,mus);
        ans[x.id]+=(x.op)*(res);
    }
    
    
    int ass=0;
    for(int i=0;i<q.size();++i)
    {
    // 莫队在前面的基础上进行的区间扩张和缩小，一个区间的答案是上一个区间扩张和缩小得来的 
        ass+=ans[q[i].id];
        ans[q[i].id]=ass;
    }
    for(auto x:ans) cout<<x<<endl;
}
```
