---
title: B级模板
algorithms: []
sidebarOutline: true
---

# B级模板
## 字符串

### B-001 字典树

**模型：** 将 `n` 个仅包含小写英文字母的字符串插入字典树，并记录每个字符串结尾对应的节点。

**时间复杂度：** `O(L)`，其中 `L` 为所有字符串的长度之和。

**空间复杂度：** `O(26 * tot + n)`，其中 `tot` 为字典树节点数。

**返回值：**

- 代码片段没有函数返回值。
- `tr[u][c]` 保存节点 `u` 经过字符 `c` 到达的节点。
- `pos[i]` 保存第 `i` 个字符串结尾对应的节点。
- `tot` 保存字典树节点总数。

```cpp
// int tr[N][26],pos[N];
// tr 为字典树，根为 0 ，pos 表示 第 i 个关键字结尾在字典树那个节点上。 
for(int i=1;i<=n;++i)
{
	string s;cin>>s;
	int u=0;
	for(auto c:s)
	{
		int v=c-'a';
		if(!tr[u][v]) tr[u][v] = ++tot;
		u=tr[u][v];
	}
	pos[i]=u;
}
```

### B-002 AC自动机

**模型：** 给定 `n` 个模式串和一个文本串，统计每个模式串在文本串中的出现次数。

**时间复杂度：**

- 插入模式串：`O(L)`
- 构建 AC 自动机：`O(26 * tot)`
- 匹配文本串：`O(T)`
- 统计答案：`O(tot)`
- 总复杂度：`O(L + 26 * tot + T)`

其中：

- `L` 为所有模式串的长度之和。
- `T` 为文本串长度。
- `tot` 为自动机节点数。

**空间复杂度：** `O(26 * MAXN)`

**返回值：**

- `init()`、`insert()`、`build()`、`query()` 和 `get_result()` 均没有返回值。
- `cnt[pos[i]]` 保存第 `i` 个模式串在文本串中的出现次数。
- `solve()` 按照模式串输入顺序输出对应出现次数。

```cpp
// 注释为了复习用
const int MAXN = 1000005; 
struct AC_Automaton {
    int tr[MAXN][26]; //字典树，节点 u 通过字符 c 转移到的子节点编号
    int fail[MAXN];   //fail[u] 指向节点 u 的失配指针
    int cnt[MAXN];  //记录节点 u 在文本串中被遍历到的总次数
    int pos[MAXN];   //第 i 个插入的模式串的末尾字符，在字典树中对应的节点编号
    int tot; //构建字典树时动态分配新节点的编号（0 号代表根节点）
    
    // q 数组模拟队列，用于 BFS 构建 fail 指针；
    // 构建完成后，q 数组恰好记录了按深度大小排列的节点顺序（即 Fail 树的拓扑排序）
    int q[MAXN];      

    // 1. 初始化自动机，清空根节点状态
    void init() {
        tot = 0; // 根节点编号初始化为 0
        for (int i = 0; i < 26; ++i) {
            tr[0][i] = 0; // 根节点的所有字符指针均指向根节点自己
        }
        fail[0] = 0; // 根节点的 fail 指针也指向自己
        cnt[0] = 0;  // 清空访问次数
    }

    // 2. 将模式串 s 插入到字典树中，id 表示这是第几个模式串
    void insert(const string& s, int id) {
        int u = 0; // 从根节点（0号节点）开始向下走
        for (char c : s) { // 遍历当前单词的每一个字符
            int v = c - 'a'; // 将小写字母转换为 0-25 的整数下标
            // 如果在当前节点 u，没有分支连向字符 v，则创建一个新节点
            if (!tr[u][v]) { 
                tr[u][v] = ++tot; // 分配全新的节点编号
                
                // 初始化新节点的数据：清空该新节点的所有子节点指针和状态
                for (int i = 0; i < 26; ++i) tr[tot][i] = 0;
                fail[tot] = 0; 
                cnt[tot] = 0;
            }
            // 走到下一个节点
            u = tr[u][v]; 
        }
        // 单词全部插入完毕后，记录第 id 个单词的末尾所在的节点编号 u
        pos[id] = u; 
    }

    // 3. 构建 fail 指针，并将普通的字典树补全为 Trie 图（字典树图）
    void build() {
        int head = 0, tail = 0; // 初始化队列 q 的头尾指针
        
        // 步骤一：先把根节点（0）所有实际存在的第一层子节点入队
        for (int i = 0; i < 26; ++i) {
            if (tr[0][i]) {
                fail[tr[0][i]] = 0; // 第一层节点的失配指针必然指向根节点
                q[tail++] = tr[0][i]; // 存入队列
            }
        }

        // 步骤二：BFS 广度优先搜索整个字典树，构建 fail 指针
        while (head < tail) {
            int u = q[head++]; // 取出当前队首节点 u
            
            // 遍历节点 u 后面可能连接的 26 个字符分支
            for (int i = 0; i < 26; ++i) {
                if (tr[u][i]) { 
                    // 如果节点 u 真实存在字符 i 这个分支
                    // 那么该子节点的 fail 指针，应该指向 "u 的 fail 节点" 的 字符 i 分支
                    fail[tr[u][i]] = tr[fail[u]][i];
                    // 将该真实存在的子节点入队
                    q[tail++] = tr[u][i]; 
                } else {
                    // 如果节点 u 不存在字符 i 这个分支（这是构建 Trie 图优化的关键环节）
                    // 虚拟地将 u 的字符 i 分支 连向 "u 的 fail 节点" 的 字符 i 分支
                    // 这样在以后匹配时，遇到不匹配的情况就不需要用 while 循环向上回跳，可以直接顺着这个伪造的边走过去。
                    tr[u][i] = tr[fail[u]][i]; 
                }
            }
        }
    }

    // 4. 让文章（长文本串 t）在 AC 自动机上跑一遍，进行词频统计
    void query(const string& t) {
        int u = 0; // 匹配也是从根节点（0号节点）开始
        for (char c : t) {
            int v = c - 'a'; // 取出当前文章字符
            
            // 由于我们在 build() 阶段构建了 Trie 图，这里的状态转移不管匹配成功与否，都可以用 $O(1)$ 的代价直接转移，绝不回头
            u = tr[u][v]; 
            
            // 给途径的节点打上标记，说明自动机经过了这个状态。
            // 注意：这里并不立刻向 fail 指针暴力跳跃以累加子串（防止 aaaaa..a 这种极端数据导致超时）
            cnt[u]++; 
        }
    }

    // 5. 根据 Fail 树进行拓扑排序累加答案，并输出最终每个单词的出现频率
    void get_result(int n) {
        // q 数组本身就是在 BFS 阶段留下的历史轨迹，它恰好是字典树从浅入深的层序遍历
        // 倒序遍历 q 数组（从深到浅），就等价于在 Fail 树上进行从叶子到根的拓扑排序。
        // tot 为建树生成的总节点个数，也就是队列 tail 的最终位置。
        for (int i = tot - 1; i >= 0; --i) {
            int u = q[i];
            
            // 核心推导：如果在文章中匹配到了状态 u，那么状态 u 的最长后缀状态 fail[u] 也一定被匹配到了！
            // 所以，将 u 被访问到的次数，累加给它的 fail 节点。
            cnt[fail[u]] += cnt[u]; 
        }
        // 最终,结果在每个字符串对应结尾位置的cnt上
        
    }
}ac;
void solve() // ll
{
    int n;cin>>n;
    ac.init();
    for(int i=1;i<=n;++i)
    {
        string s;cin>>s;
        ac.insert(s,i);
    }
    string s;cin>>s;
    ac.build();
    ac.query(s);
    ac.get_result(n);
    for(int i=1;i<=n;++i) cout<<ac.cnt[ac.pos[i]]<<endl;
};
```

## 数据结构
### B-003 笛卡尔树

### B-004 线段树上二分
```cpp
// 111111100000000
// 找第一个0
// imx 表示不合法
int erf(int u,int l,int r,int k)
{
    if(l>rt.r||r<rt.l) return imx;//排除非区间范围 
    if((rt.g>>k)&1) return imx;//if后面跟不合法条件，如果整体都1,则找不到第一个0
    if(rt.l==rt.r) return rt.g;// 单独则直接返回需要的值（可以是这个位置，也可以是对应的值）
    pushdown(u);// 很重要，不要漏掉
    int ans = erf(u<<1,l,r,k);// 先找左边
    if(ans!=imx) return ans;//左边找到了就直接返回
    else return erf(u<<1|1,l,r,k);// 左边没找到就找右边
}
```

### B-005 莫队

**模型：** 离线处理静态数组的区间询问。代码以查询每个区间的元素和为例。

**时间复杂度：**

- 询问排序：`O(m log m)`
- 窗口移动：`O((n + m) * sqrt(n))`

要求单次 `Add` 和 `Sub` 的复杂度为 `O(1)`。

**空间复杂度：** `O(n + m)`

**返回值：**

`solve()` 没有返回值，按照询问的原始顺序输出每个区间的元素和。

```cpp
// 以维护窗口的区间和为例子

vi pos;// 用于分块
struct Q{int l,r,id;};
void solve() // ll
{
    int n;cin>>n;
    // 根号分块
    int siz=sqrt(n);
    vi a(n+1,0);
    pos.resize(n+1);
    rep(i,1,n)
    {
        cin>>a[i];
        pos[i]=i/siz;
    }
    // 离线任务
    int m;cin>>m;
    vector<Q> q(m);
    vi ans(m+1);
    rep(i,0,m-1) cin>>q[i].l>>q[i].r,q[i].id=i;
    sort(q.begin(),q.end(),[](Q a,Q b){
        return pos[a.l]==pos[b.l]?a.r<b.r:pos[a.l]<pos[b.l];
    });// 按照l所在的块
    // 构造 窗口变化函数
    int l=1,r=0,res=0;
    auto Add=[&](int id)
    {
        res+=a[id];
    };
    auto Sub=[&](int id)
    {
        res-=a[id];
    };
    // 主要运行代码
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

### B-006 带修莫队

**模型：** 离线处理包含单点修改和区间询问的问题。代码以查询区间内不同数字的数量为例。

**时间复杂度：**

- 离散化：`O((n + m) log(n + m))`
- 莫队窗口和时间轴移动：`O((n + m) * n^(2/3))`

要求单次增加、删除和修改操作的复杂度为 `O(1)`。

**空间复杂度：** `O(N + n + m)`

**返回值：**

`solve()` 没有返回值，按照询问的原始顺序输出对应区间内不同数字的数量。

```cpp
//以求区间不同数字的个数为例 
vi pos;
struct Q{int id,l,r,ti;};
void solve() //ll
{
    int n,m;cin>>n>>m;
    vi a(n+1,0);
    map<int,int> mp;
	// 分块 + 离散化
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
    
    // 离散化时间轴
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
    // 构造窗口变化函数
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
    // 主程序：先窗口扩张，再在时间扩展，同时维护窗口内数字种类
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

### B-007 回滚莫队

**模型：** 离线处理静态区间询问。当窗口向某个方向修改容易、反向删除或恢复困难时，对一个方向单调维护，对另一个方向临时修改并回滚。

核心：

只增 和 只减 在于另一个窗口维护操作复杂，不合算，于是选择只向一边维护窗口（增或者减），另一边进行 暴力维护

**时间复杂度：** 通常为 `O((n + m) * sqrt(n))`

要求单次增加和回滚操作的复杂度为 `O(1)`。

**空间复杂度：** `O(n + m)`

**返回值：** 根据具体维护的信息，保存或输出每个区间询问的答案。
### B-008 欧拉序求LCA:
模型：
求树上 LCA(u,v)

核心：利用欧拉序，将lca，转化为用st表求区间最小值的问题

复杂度分析：
时间：预处理`O(nlogn)` ， 单次查询：`O(1)`
空间：st表`O(nlogn)`

返回：
lca(u,v)
```cpp
	int tot=0,toula=0;// 前者记录dfs序，后者记录欧拉序
    const int LOG = 19;// 设置上限（1<<19)
    vi L(n+1,0),p(n+1,0);// L 表示i节点dfs序编号,p 表示dfs序
    vi Loula(n+1,0),poula(2*n,0);//Loula 表示i节点欧拉序编号, poula 表示欧拉序
    vii f(2*n,vi(LOG,0)); // oula序的st表
    function<void(int,int)> dfs=[&](int u,int fa)
    {
        L[u]=++tot,p[tot]=u;
        Loula[u]=++toula,poula[toula]=u;
        for(auto v:mp[u])
        {
            if(v==fa) continue;
            dfs(v,u);
            poula[++toula]=u;
        }
    };dfs(1,0);
    function<void(int)> build_st=[&](int siz)
    {
        for(int i=1;i<=siz;++i) f[i][0]=L[poula[i]]; //！！！一定是 dfs序 ！！！
        for(int k=1;k<LOG;++k) // 注意LOG 的范围大小看 2*n-1
        {
            for(int i=1;i<=siz;++i) 
            {
                //这里是求区间最小dfs序值;
                f[i][k]=min(f[i][k-1],f[min(i+(1<<(k-1)),siz)][k-1]);
            }
        }
    };build_st(2*n-1);// 点数 + 边数
    function<int(int,int)> lca=[&](int u,int v) ->int
    {   
        int l=min(Loula[u],Loula[v]),r=max(Loula[u],Loula[v]);
        int lg=log2(r-l+1),l2=r-(1<<lg)+1;
        return p[min(f[l][lg],f[l2][lg])];
    };
```
### B-009 虚树

**模型：** 给定原树中的关键点集合 `S`，保留关键点及必要的 LCA，将原树压缩成规模与关键点数量同阶的虚树。

**时间复杂度：**

- `S` 已按 DFS 序排序：`O(k)`
- 包含排序过程：`O(k log k)`

其中 `k` 为关键点数量，并假设单次 LCA 查询复杂度为 `O(1)`。

**空间复杂度：** `O(k)`

**返回值：**

- 当 `S` 为空时返回 `0`。
- 否则返回构建完成的虚树根节点编号。
- 虚树中的边通过 `add_edge(u, v)` 保存。

详情见代码

```cpp
const int N = 200005;

// 假设这些在外部已经预处理好
extern int dfn[N];               // 节点的 DFS 序
extern std::vector<int> vG[N];   // 虚树的邻接表 (记得在 DFS 后序清空)

// 原生数组模拟单调栈，常数极小
int stk[N], top_idx; 

// 求原树两个节点 LCA 的函数，这里假设你已经用 ST表+欧拉序 实现了 O(1) 查询
extern int get_lca(int u, int v); 
extern void add_edge(int u, int v); // vG[u].push_back(v);

/**
 * @brief 构建虚树
 * @param S 传入的关键点集合，要求必须已经按照 dfn 序升序排列
 * @return int 返回构建好的虚树的根节点编号
 */
int build_virtual_tree(const std::vector<int>& S) {
    if (S.empty()) return 0;

    top_idx = 0;
    // 强制将第一个关键点压入栈底，作为初始的右链起步
    stk[++top_idx] = S[0]; 

    for (size_t i = 1; i < S.size(); ++i) {
        int u = S[i];
        int lca = get_lca(u, stk[top_idx]);

        // 如果 lca 就是栈顶，说明 u 直接在栈顶的子树里，按 dfn 序顺延，直接跳过退栈逻辑
        if (lca != stk[top_idx]) {
            // 当栈顶第二个元素的 dfn 大于等于 lca 的 dfn 时，说明栈顶所在的子树已经闭合
            // 不断退栈，并将栈顶第二元素向栈顶连边
            while (top_idx > 1 && dfn[stk[top_idx - 1]] >= dfn[lca]) {
                add_edge(stk[top_idx - 1], stk[top_idx]);
                top_idx--;
            }

            // 退栈结束后，如果当前的栈顶依然不是 lca 
            // 说明 lca 是一个全新的“分支点”，需要被插入到当前的右链中
            if (stk[top_idx] != lca) {
                // lca 应该作为当前栈顶的父亲，连边
                add_edge(lca, stk[top_idx]);
                // 此时原来的栈顶已经完全处理完毕，出栈。同时将 lca 压入该位置
                stk[top_idx] = lca; 
            }
        }
        // 新的关键点一定在最右侧，压入栈顶延伸右链
        stk[++top_idx] = u;
    }

    // 所有的关键点都处理完毕，此时栈中保留的是从根到最右下角的右链
    // 将它们依次连边闭合
    while (top_idx > 1) {
        add_edge(stk[top_idx - 1], stk[top_idx]);
        top_idx--;
    }

    // 栈底留下的最后一个元素，就是整棵虚树全局的根节点
    return stk[1];
}
```

## 数学

### B-010 多功能质数筛

#### 欧拉筛与欧拉函数

**模型：** 给定整数 `n`，使用欧拉筛求出 `[1, n]` 内的全部质数，并计算每个整数 `i` 的欧拉函数 `phi[i]`。

`phi[i]` 表示 `[1, i]` 中与 `i` 互质的整数数量。

**时间复杂度：** `O(n)`

**空间复杂度：** `O(n)`

**返回值：**

- `init(n)` 没有返回值。
- `pri[0...cnt-1]` 保存 `[2, n]` 内的全部质数。
- `cnt` 保存质数数量。
- `phi[i]` 保存整数 `i` 的欧拉函数值。
- `vis[i]` 表示整数 `i` 是否为合数。

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

#### 欧拉筛与莫比乌斯函数

**模型：** 使用欧拉筛求出 `[1, N-1]` 内的全部质数，并计算每个整数 `i` 的莫比乌斯函数 `mu[i]`。

**时间复杂度：** `O(N)`

如果额外计算莫比乌斯函数前缀和，复杂度仍为 `O(N)`。

**空间复杂度：** `O(N)`

**返回值：**

- `init()` 没有返回值。
- `pri` 保存 `[2, N-1]` 内的全部质数。
- `mu[i]` 保存整数 `i` 的莫比乌斯函数值。
- `s[i]` 可以用于保存莫比乌斯函数的前缀和。

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

### B-011 矩阵乘法与矩阵快速幂

**模型：** 计算两个 `N × N` 方阵在模 `mod` 意义下的乘积，并使用快速幂计算矩阵 `A` 的 `k` 次幂。

**时间复杂度：**

- 单次矩阵乘法：`O(N^3)`
- 矩阵快速幂：`O(N^3 log k)`

**空间复杂度：** `O(N^2)`

**返回值：**

- `operator*(x, y)` 返回矩阵 `x * y mod mod`。
- `expow(A, k)` 返回矩阵 `A^k mod mod`。
- 当 `k = 0` 时，返回单位矩阵。

```cpp
const int N = 200, mod = 1e9 + 7;

struct mat{
    int a[N][N];
    mat(){memset(a, 0, sizeof a);} // 默认初始化为0 (外层加法单位元)
    friend mat operator*(const mat &x, const mat &y){
        mat ans;
        rep(i, 0, N - 1)
            rep(k, 0, N - 1)
                rep(j, 0, N - 1)
                    ans.a[i][j] = (ans.a[i][j] + x.a[i][k] * y.a[k][j]) % mod;
        return ans;
    }
};

mat expow(mat A, int k){
	mat ans;
	rep(i, 0, N - 1) ans.a[i][i] = 1; // 构造标准乘法的单位矩阵：对角线为 1
	while(k){
		if(k & 1) ans = ans * A;
		A = A * A;
		k >>= 1;
	}
	return ans;
}
```

### B-012 NTT

**模型：** 在支持 NTT 的质数模数下，对两个多项式进行卷积，计算它们的乘积多项式。

设两个多项式的次数分别为 `n` 和 `m`，变换长度 `len` 为第一个严格大于 `n + m` 的二次幂。

**时间复杂度：**

- 单次 NTT：`O(len log len)`
- 多项式卷积：`O(len log len)`

**空间复杂度：** `O(len)`

**返回值：**

- `NTT(A, n, 1)` 没有返回值，将系数表示的多项式原地转换成点值表示。
- `NTT(A, n, -1)` 没有返回值，将点值表示原地转换成系数表示。
- `solve()` 没有返回值，输出两个输入多项式卷积后的全部系数。

```cpp
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

### B-013 Lucas 定理

**模型：** 给定非负整数 `a`、`b` 和质数模数 `M`，计算大组合数 `C(a, b) mod M`。

要求已经能够计算：

```text
C(x, y) mod M
```

其中 `0 <= x, y < M`。

**时间复杂度：** `O(log_M(a))`

如果单次 `C(x, y, M)` 不是 `O(1)`，还需要乘上组合数函数的复杂度。

**空间复杂度：** `O(log_M(a))`

空间复杂度来自递归调用栈。

**返回值：**

- 返回 `C(a, b) mod M`。
- 当 `a < 0` 时返回 `0`。
- 当 `b > a` 时，结果由组合数函数 `C` 返回 `0`。

```cpp
// 对于 1 e 9 的 mod 千万别用 lucas 直接 用  C 都比这个好
// 附上 取组合数的模版
LL lucas(LL a, LL b,LL M) {
	if (a < 0) return 0;
    if (a < M && b < M) return C(a, b,M);
    return (LL)C(a % M, b % M,M) * lucas(a / M, b / M,M) % M;
}
```

### B-014 扩展中国剩余定理（exCRT）

**模型：** 给定 `k` 个同余方程：

```text
x = r[i] mod m[i]
```

合并这些同余方程。模数之间不要求两两互质。

数组 `m` 和 `r` 从下标 `1` 开始保存数据。

**时间复杂度：** `O(k log V)`

其中 `V` 表示合并过程中模数的数量级，单次合并通过 exGCD 完成。

**空间复杂度：** `O(k + log V)`

数组按值传入会产生 `O(k)` 的副本，exGCD 递归栈占用 `O(log V)` 空间。

**返回值：**

- 有解时，返回满足全部同余方程的最小非负整数解。
- 无解时返回 `-1`。

```cpp
// 给定多个同余方程，其中 m为模数数组，r为余数数组，从1开始。
// 返回满足所有同余式的最小非负解。
// X  = r (mod m)
ll exCRT(vi m,vi r)
{
    ll m1,m2,r1,r2,p,q;
    m1=m[1],r1=r[1];
    rep(i,2,m.size()-1)
    {
        m2=m[i],r2=r[i];
        ll d=exgcd(m1,m2,p,q);
        if((r2-r1)%d) return -1;
        p=(p*((r2-r1)/d));//特解
        p=(p%(m2/d)+(m2/d))%(m2/d);
        r1=(m1*p)+r1;
        m1=(m1/d*m2);
    }
    return (r1%m1+m1)%m1;
}
```

### B-015 Miller–Rabin 素性检测

**模型：** 给定整数 `x >= 2`，使用固定底数的 Miller–Rabin 算法判断 `x` 是否为质数。

`qmul` 使用二进制倍增计算模乘，避免直接计算 `a * b`。

**时间复杂度：**

- `qmul(a, b, c)`：`O(log b)`
- `ksm(a, b, c)`：`O(log^2 b)`
- `Miller_Rabin(x)`：最坏 `O(log^3 x)`

底数数量为常数。

**空间复杂度：** `O(1)`

**返回值：**

- `qmul(a, b, c)` 返回 `a * b mod c`。
- `ksm(a, b, c)` 返回 `a^b mod c`。
- `Miller_Rabin(x)` 判断 `x` 是否为质数。
- 当 `x` 是质数时返回 `true`。
- 当 `x` 是合数时返回 `false`。

```cpp
typedef long long LL;
LL qmul(LL a, LL b, LL c) { // 龟乘
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
### B-016 类欧几里得算法

**模型：** 给定整数 `n、m、a、b`，计算：

$$
\sum_{i=0}^{n-1}\left\lfloor\frac{ai+b}{m}\right\rfloor
$$

其中：

- `n >= 0`
- `m > 0`
- `a、b` 可以为负数
- `floor_div()` 用于实现真正的向下取整除法，修正 C++ 对负数除法向 `0` 截断的问题

算法先提取 `a、b` 中能够被 `m` 整除的部分，再对剩余部分使用类似欧几里得算法的递归变换。

**时间复杂度：** `O(log m)`

递归过程中参数按照欧几里得算法不断缩小。

**空间复杂度：** `O(log m)`

空间消耗来自递归调用栈。

**返回值：**

- `floor_div(x, m)` 返回：

  $$
  \left\lfloor\frac{x}{m}\right\rfloor
  $$

- `floor_sum(n, m, a, b)` 返回：

  $$
  \sum_{i=0}^{n-1}\left\lfloor\frac{ai+b}{m}\right\rfloor
  $$

- 当 `n = 0` 时，空和为 `0`。

**注意：**

结果以及 `a * n`、`qa * n * (n - 1)` 等中间运算可能溢出。模板中的 `int` 应当保证实际为 `long long`；数据范围更大时需要使用 `__int128`。

```cpp
// 
int floor_div(int x, int m) { // 作用整除
    // 要求m>0
    int q = x / m;
    int r = x % m;
    // C++ 的负数除法向 0 截断，需要修正
    if (r < 0) {
        --q;
    }
    return q;
}
int floor_sum(int n, int m, int a, int b) {
    if (n == 0) {
        return 0;
    }
    // a = qa*m + ra，保证 0 <= ra < m
    int qa = floor_div(a, m);
    int ra = a - qa * m;
    // b = qb*m + rb，保证 0 <= rb < m
    int qb = floor_div(b, m);
    int rb = b - qb * m;
    // 提取整倍数部分的贡献
    int ans = 0;
    ans += qa * n * (n - 1) / 2;
    ans += qb * n;
    // 此时 0 <= ra,rb < m
    int y = ra * n + rb;
    if (y < m) { // 小于m则直接出
        return ans;
    }
    return ans + floor_sum((y / m),ra,m,(y % m));
}
```

### B-017 高斯消元（解增广矩阵）
普通高斯消元模板：
处理多解，无解的时候存在局限
```cpp
// ksm
vector<ll> gauss(vector<vector<ll>> a) {//解 n * (n+1) 的增广矩阵，直接返回解
// 有 n 个未知数
    int n = a.size();// a从0开始
    for (int i = 0; i < n; i++) {
        // 寻找非零主元
        int p = i;
        while (p < n && a[p][i] == 0) p++;
        if (p == n) return {}; // 矩阵不可逆
        swap(a[i], a[p]);
        // 将主元变为 1
        ll inv = ksm(a[i][i], mod - 2);
        for (int j = i; j <= n; j++)
            a[i][j] = a[i][j] * inv % mod;
        // 消去主元所在列的其他元素
        for (int k = 0; k < n; k++) {
            if (k == i || a[k][i] == 0) continue;
            ll t = a[k][i];
            for (int j = i; j <= n; j++) {
                a[k][j] = (a[k][j] -
                          t * a[i][j] % mod + mod) % mod;
            }
        }
    }
    vector<ll> ans(n);
    for (int i = 0; i < n; i++)
        ans[i] = a[i][n];
    return ans;
}
```

## 计算几何
### B-018 计算几何通用

**模型：** 提供计算几何常用的高精度浮点类型、数学函数和随机化工具。

**时间复杂度：** 单次随机数生成 `O(1)`；随机打乱长度为 `n` 的数组为 `O(n)`。

**空间复杂度：** `O(1)`。

**返回值：** 代码片段没有函数返回值；`id1`、`id2` 保存随机整数，`shuffle` 会原地打乱数组 `pp`。

```cpp
// 全局头 包括后续可能用到的所有宏定义
// 这个放全局
std::random_device rd;// 随机函数
std::mt19937 g(rd());
// 这个可以放局部
std::uniform_int_distribution<int> uni_int(l, r); // l 和 r 是参数
int id1=uni_int(g),id2=uni_int(g);// g 就是第二行 你设定的种子
// 随机排序
shuffle(pp.begin()+1,pp.end(),g);


#define ld long double
#define sqrt sqrtl
#define fabs fabsl
#define cos cosl
#define acos acosl
#define sin sinl
#define atan2 atan2l
#define abs fabs

```

#### 点线关系：

**模型：** 维护二维点和向量，支持加减、数乘、点积、叉积、距离、夹角、直线交点和旋转等基础运算。

**时间复杂度：** 每次操作均为 `O(1)`。

**空间复杂度：** `O(1)`。

**返回值：** 根据调用函数返回 `Point` 或 `ld`；`getNode` 返回两条直线的交点，`rotate` 返回旋转后的点。

```cpp
const double PI=acos(-1);
// const double PI = 3.141592653589793;
struct Point
{
    ld x,y;
    Point(ld tx=0,ld ty=0):x(tx),y(ty){};
    // const bool operator<(const Point &other) const{
    //     return fabs(x-other.x)<eps?y<other.y:x<other.x;
    // }
};
Point operator+(Point a,Point b)
{
    return Point(a.x+b.x,a.y+b.y);
}
Point operator-(Point a,Point b)
{
    return Point(a.x-b.x,a.y-b.y);
}
Point operator*(Point a,ld c)
{
    return Point(a.x*c,a.y*c);
}
Point operator/(Point a,ld c)
{
    return Point(a.x/c,a.y/c);
}
ld dot(Point a,Point b)//点积 dot = a . b
{
    return a.x*b.x+a.y*b.y;
}
ld P_len(Point a)// 求模长
{
    return sqrt(a.x*a.x+a.y*a.y);
}
ld angle(Point a,Point b)// 从向量 a 旋转到向量 b 的有向夹角
{
    return atan2(a.x*b.y-a.y*b.x,dot(a,b));
    // 返回范围 (-PI, PI]，单位：弧度
    // 正数：从 a 到 b 逆时针旋转
    // 负数：从 a 到 b 顺时针旋转
    // 0：同向（非零向量）
    // PI：反向（atan2 对负零可能返回 -PI）
}
ld cross(Point a,Point b)//叉积 求有向平行四边形面积，b 在 a 的逆时针方向为 正
{
    return a.x*b.y-a.y*b.x;
}
ld cross_2(Point a,Point b,Point c)// 以 a 为起点，ab 与 ac 之间进行叉积运算
{
    Point x=b-a;
    Point y=c-a;
    return cross(x,y);
}
ld P_d(Point a,Point b)// 
{
    return sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}
Point getNode(Point a,Point b,Point c,Point d) // 返回 直线与直线的交点
{
    ld fm=cross((b-a),(d-c));// 小心等于 0
    if(fabs(fm)<eps)// 如果为0，平行或者重合的情况
    {
        ld mx=0;
        Point p1,p2;
        if(P_d(a,c)>mx) mx=P_d(a,c),p1=a,p2=c;
        if(P_d(a,d)>mx) mx=P_d(a,d),p1=a,p2=d;
        if(P_d(b,c)>mx) mx=P_d(b,c),p1=b,p2=c;
        if(P_d(b,d)>mx) mx=P_d(b,d),p1=b,p2=d;
        return {(p1.x+p2.x)/2,(p1.y+p2.y)/2};// 重合取最大距离的中点
    }
    ld t=(cross(c-a,d-c)/fm);
    return a+(b-a)*t;
}
Point rotate(Point A,ld theta) // 返回 逆转角度 theta 后的点
{ // 顺时针旋转只要 将 theta 变成 - theta 即可
    return Point(A.x*cos(theta)-A.y*sin(theta),A.x*sin(theta)+A.y*cos(theta));
}

```

#### 圆关系

**模型：** 求经过两点或三点的圆，并使用随机增量法求给定点集的最小覆盖圆。

**时间复杂度：** 构造两点圆、三点圆均为 `O(1)`；随机增量法期望 `O(n)`，最坏 `O(n^3)`。

**空间复杂度：** 辅助空间 `O(1)`；由于 `increment` 按值接收点集，实际复制点集需要 `O(n)` 空间。

**返回值：** `circle_cover_p` 返回覆盖指定点的圆；`increment` 返回覆盖全部输入点的最小圆。

```cpp
struct circle{Point ox;ld r;};

circle circle_cover_p(Point a,Point b)//两点覆盖圆
{return {Point((a.x+b.x)/2,(a.y+b.y)/2),P_d(a,b)/2};}

circle circle_cover_p(const Point &a, const Point &b, const Point &c) {// 求出 三个点在圆上的 圆
    // 这一步是利用 三点在圆上的线性方程组
    ld ax = a.x, ay = a.y;
    ld bx = b.x, by = b.y;
    ld cx = c.x, cy = c.y;
    ld d = 2.0 * (ax*(by - cy) + bx*(cy - ay) + cx*(ay - by));
    // 处理 三点共线的情况
    if (fabsl(d) < eps) {
        ld dab = P_d(a,b), dbc = P_d(b,c), dac = P_d(a,c);
        if (dab >= dbc && dab >= dac) return circle_cover_p(a,b);
        if (dbc >= dab && dbc >= dac) return circle_cover_p(b,c);
        return circle_cover_p(a,c);
    }
    // 反向求出 变量 ux 和 uy 
    ld aa = ax*ax + ay*ay;
    ld bb = bx*bx + by*by;
    ld cc = cx*cx + cy*cy;
    ld ux = (aa*(by - cy) + bb*(cy - ay) + cc*(ay - by)) / d;
    ld uy = (aa*(cx - bx) + bb*(ax - cx) + cc*(bx - ax)) / d;
    Point o(ux, uy);
    return {o, P_d(o, a)};
}

circle increment(vector<Point> pp,int n)// 最小圆覆盖，找到包含数组 pp 的最小覆盖圆，时间接近O(n)
{// 随机增量法，用前记得随机排序 pp 数组
    circle C={pp[1],0};
    rep(i,2,n)
    {
        if(C.r<P_d(pp[i],C.ox))// 单点判断 并 开启第二层循环判断
        {
            C={pp[i],0};
            rep(j,1,i-1)
            {
                if(C.r<P_d(pp[j],C.ox)) // 双点判断 并 开启 第三层循环
                {
                    C=circle_cover_p(pp[i],pp[j]);
                    for(int k=1;k<j;++k)
                    {
                        if(C.r<P_d(pp[k],C.ox))
                        {
                            C=circle_cover_p(pp[i],pp[j],pp[k]);
                        }
                    }
                }
            }
        }
    }
    return C;
}

```

### B-019 多边形求面积（三角剖分）

**模型：** 计算一条有向线段与圆形成的有向相交面积；对多边形的每条边累加贡献，可以求多边形与圆的相交面积。

**时间复杂度：** 单条边 `O(1)`；包含 `n` 条边的多边形为 `O(n)`。

**空间复杂度：** `O(1)`。

**返回值：** `getArea` 返回有向线段 `a -> b` 对圆的有向面积贡献；其余函数返回单位向量、扇形面积、位置判断或交点信息。

```cpp
Point norm_P(Point a)// 单位向量
{
    return a/P_len(a);
}

ld sector_s(Point ox,Point a,Point b,ld R) //求一个扇形的面积
{//一个圆心和两个扇形边直线上的点.
    ld theta=angle(a-ox,b-ox);
    if(cross(a-ox,b-ox)<0) theta=-theta;
    return R*R*theta/2;
}

bool on_segment(Point p,Point a,Point b)
{
    return fabs(cross(a-p,b-p))<eps&&dot(a-p,b-p)<=0;
}

ld get_d_p2(Point ox,ld R,Point a,Point b,Point &pa,Point &pb)//求圆心到线段的距离和线段与圆心相交的点。
{
    Point e = getNode(a,b-a,ox,rotate(b-a,PI/2));
    ld ox_e=P_d(ox,e);
    ld d=ox_e;
    if(!on_segment(e,a,b)) d=min(P_d(ox,a),P_d(ox,b));//当垂足不在线上时，取最近的圆心到端点的距离。
    if(R<=d) return d;
    ld len=sqrt(R*R-ox_e*ox_e);
    pa=e+norm_P(a-b)*len;
    pb=e+norm_P(b-a)*len;
    return d;
}

ld getArea(Point ox,Point a,Point b,ld R)// 求一个线段与圆所截的有向面积
{
    a=a-ox,b=b-ox;
    if(fabs(cross(a,b))<eps) return 0;// 共线
    ld da=P_len(a),db=P_len(b);
    if(R>=da&&R>=db) return cross(a,b)/2;// 线在圆内
    Point pa,pb;
    ld d=get_d_p2({0,0},R,a,b,pa,pb);
    if(d>=R) return sector_s({0,0},a,b,R);// 线在圆外
    if(R>=da) return  cross(a,pb)/2+sector_s({0,0},pb,b,R); // a 在 圆内
    if(R>=db) return  sector_s({0,0},a,pa,R)+cross(pa,b)/2;// b 在 园内
    return sector_s({0,0},a,pa,R)+cross(pa,pb)/2+sector_s({0,0},pb,b,R);// ab 是割线
}

```

### B-020 求凸包

**模型：** 给定已经按照横坐标、纵坐标排序的点集，使用 Andrew 算法构造凸包。

**时间复杂度：** 点集已经排序时为 `O(n)`；包含排序时为 `O(n log n)`。

**空间复杂度：** `O(n)`。

**返回值：** `Andrew` 返回按照顺时针顺序排列的凸包点数组，并通过引用参数 `len` 返回有效长度；数组最后一个点与起点相同。

#### 求凸包，Andrew算法：
思路：
所有点按照 x 为第一关键字， y为第二关键字排序。
这样保证第一个点和最后一个点在 凸包 上
第一次枚举：
- 按照顺序枚举所有点，求下凸包，和上面的极角序一样，设立一个栈数组，保证形成凸包的两条线是按照顺时针旋转包围的，如果有逆时针则出栈。
第二次枚举：
- 倒序枚举所有点， 求上凸包，在维护 第 n 个点在 凸包上的前提下，保证形成凸包的两条线是按照顺时针旋转包围的，如果有逆时针则出栈。
这样就可以找到编号为 1 -> …… -> n ->  …… -> 1 这样的凸包顶点。

时间复杂度为 `O(n log n)`。
```cpp
// 使用之前要按照 x 为第一关键字，y 为第二关键字排序
vector<Point> Andrew(vector<Point> &pp,int n,int &len) // 返回一个点数组 顺时针的凸包上的点，最后一个点是起点
{// len 表示最后凸包的顶点数，包括 第一个 和 最后一个
    // const bool operator<(const Point &other) const{
    //     return fabs(x-other.x)<eps?y<other.y:x<other.x;
    // } // 给 Point 结构体的比较器
    vector<Point> stk(n+2);// 多开一个，加上初始点可能有n+1个点
    //sort(pp.begin()+1,pp.end());//(这是内部排序，如果外面已经排序就不用)
    stk[1]=pp[1];
    int id=1;
    rep(i,2,n)
    {
        while(id>1&&cross(stk[id-1]-stk[id],pp[i]-stk[id])>=0) id--;
        stk[++id]=pp[i];
    }
    int up=id;
    for(int i=n-1;i>0;--i)
    {
        while(id>up&&cross(stk[id-1]-stk[id],pp[i]-stk[id])>=0) id--;
        stk[++id]=pp[i];
    }  
    len=id;
    return stk;// len 也是一个输出
}
// solve 函数内的使用说明
    int id;
    vector<Point> stk=Andrew(pp,n,id);//用法 id 为凸包len长

```

### B-021 旋转卡壳

#### 求凸包直径

**模型：** 给定首尾重复的凸包点数组，使用旋转卡壳求凸包上任意两点之间的最大欧氏距离。

**时间复杂度：** `O(n)`。

**空间复杂度：** `O(1)`。

**返回值：** 返回凸包直径，即凸包上最远点对之间的距离。

```cpp

// 注意还要搭配 Andrew 算法求 凸包s
ld rotating_calipers(vector<Point> &s,int n) // 旋转卡壳,求凸包直径
{   //s 为凸包上的点，n 表示其有效长度
    n--;// 这一步是为了 双指针循环找 对踵点 
    ld res=0;
    for(int i=1,j=2;i<=n;++i)
    {// 注意下面取模进1的过程，这个模数应该是 减去 1 后的 n（有效长度）
        // 这个叉积太妙了，将距离比较转化为三角形的面积比较
        while(cross_2(s[i],s[i+1],s[j])<cross_2(s[i],s[i+1],s[j+1])) j=j%n+1;
        res=max(res,max(P_d(s[i],s[j]),P_d(s[i+1],s[j])));
    }
    return res;
}

```

#### 求凸包内的最大四边形

**时间复杂度：** `O(n^2)`。

**空间复杂度：** 辅助空间 `O(1)`；点数组按值传入会产生 `O(n)` 的复制空间。

**返回值：** 返回凸包顶点能够组成的最大四边形面积。

##### 模型：

给出 n 个点，求出由 这 n 个点中组成的面积最大的四边形

##### 思路：

1. 这四个顶点都在凸包上
2. 四边形的对角线一定在凸包的对角线上
3. 枚举对角线 i ，j 两个顶点，分别找到这个对角线上下对应的两个对踵点a 和 b 。
    时间复杂度为 O(n^2)

    ![凸包内最大四边形的候选对角线](../../assets/note-images/Pasted%20image%2020250929204647.png){width=296 height=262}

##### 代码：

里面还有很多细节！！

```cpp
ld rotating_calipers(vector<Point> s,int n) // 旋转卡壳,找最大四边形
{   //s 为凸包上的点，n 表示其有效长度
    n--;// 这一步是为了 双指针循环找 对踵点 
    ld res=0;
    rep(i,1,n)
    {
        int a=i,b=i+1;// a 找 i 到 j 的对踵点 ， b 找 j 到 i 上的对踵点
        // b 是从 j 开始
        rep(j,i+1,n)
        {
	        // 前面a+1没取模是因为和取模后点是同一个
            while(cross_2(s[i],s[j],s[a])>cross_2(s[i],s[j],s[a+1])) a=a%n+1;
            //这边不能取等，不然a就会和b一样枚举到 j - i 的范围的点了
            while(cross_2(s[i],s[j],s[b])<cross_2(s[i],s[j],s[b+1])) b=b%n+1;
            // a 在顺时针方向，所以叉积算出来是负数,判断时要反着来
            res=max(res,-cross_2(s[i],s[j],s[a])+cross_2(s[i],s[j],s[b]));
        }
    }
    return res/2;
}

```

#### 旋转卡壳求最小覆盖矩形：

**时间复杂度：** `O(n)`。

**空间复杂度：** 辅助空间 `O(1)`；点数组按值传入会产生 `O(n)` 的复制空间。

**返回值：** 返回最小覆盖矩形的面积，同时输出面积和四个顶点坐标。

##### 模型：旋转卡壳求最小覆盖矩形

##### 思路：

1. 最小覆盖矩形一定有边在 凸包上
2. 枚举凸包的边，找到 上 对踵点 a ，利用点积 求出 左右边界点 b ，c；
3. 计算矩形的 边长，以及 矩形的四个顶点位置。更新答案。
    时间复杂度为O(n)

代码上还有很多细节！！

##### 代码：

```cpp
ld rotating_calipers(vector<Point> s,int n) // 旋转卡壳,找最小覆盖矩形
{   //s 为凸包上的点，n 表示其有效长度
    n--;// 这一步是为了 双指针循环找 对踵点 
    ld res=1e18;int a,b,c;a=2,b=2;//上a ，右 b ，左 c
    vector<Point> p(4);// 保存四个顶点,有需要可以自取
    rep(i,1,n)
    {
        while(cross_2(s[i],s[i+1],s[a])<cross_2(s[i],s[i+1],s[a+1])) a=a%n+1;
        // 寻找左右两端的点用 点积 真是太妙了！！
        while(dot(s[i]-s[i+1],s[b]-s[i+1])>dot(s[i]-s[i+1],s[b+1]-s[i+1])) b=b%n+1;
        // 一个是 i -> i+1 ，一个是 i+1 -> i 
        if(i==1) c=a; // 这一步是为了保证 c 在 a的另一端。
        while(dot(s[i+1]-s[i],s[c]-s[i])>dot(s[i+1]-s[i],s[c+1]-s[i])) c=c%n+1;
        ld d=P_d(s[i],s[i+1]);
        // 计算其面积
        ld H=cross_2(s[i],s[i+1],s[a])/d;// 高
        ld R=-dot(s[i]-s[i+1],s[b]-s[i+1])/d;// 最右端到线段右端
        ld L=-dot(s[i+1]-s[i],s[c]-s[i])/d;// 最左端到线段左端
        if((R+d+L)*H<res)
        {
            res=(R+d+L)*H;
            // 从 按照 p[0] 逆时针编号 保存点的坐标
            p[0]=s[i]+(s[i]-s[i+1])*(L/d);
            p[1]=s[i+1]+(s[i+1]-s[i])*(R/d);
            p[2]=p[1]+rotate(s[i]-s[i+1],-PI/2)*(H/d);// 顺时针
            p[3]=p[0]+rotate(s[i+1]-s[i],PI/2)*(H/d);// 逆时针
        }
    }
    printf("%.5lf\n",res);
    int k=0;// 找到 凸包顺序下 的最小点，然后逆时针输出。
    ld miy=INF,mix=INF;
    rep(i,0,3) 
    {
        if(p[i].y<miy||p[i].y==miy&&p[i].x<mix)
        {
            k=i;
            miy=p[i].y,mix=p[i].x;
        }
    }
    rep(i,0,3)
    {
        printf("%.5lf %.5lf\n",p[k].x,p[k].y);
        k=(k+1)%4;
    }
    return res;
}
ld zero(ld x)
{
    if(fabs(x)<eps) return x;
    return x;
}

```

### B-022 最近点对

**模型：** 给定平面上的 `n` 个点，使用分治求任意两个不同点之间的最小欧氏距离。

**时间复杂度：** 当前代码在每层递归中重新排序，最坏为 `O(n log^2 n)`。

**空间复杂度：** `O(n)`。

**返回值：** `merge(l, r, a)` 返回区间 `[l, r]` 内的最近点对距离；`solve()` 输出保留四位小数的答案。

#### 思路：

1. 按照 x 为第一关键字，y为第二关键字 排序。 
2. 分治求出中线两边的最小距离 d1 ， d2 ，d= min (d1,d2)。
3. 找中线两边点之间的最小距离，注意用 d 规范点的选择。
4. 按照上述操作做 类似 归并 的方法。
    因为内部还有一层排序，所以时间复杂度最高可达 O(nlognlogn)

#### 代码：（sort 版）

```cpp
ld merge(int l,int r,vector<Point> &a)// 给定 排好序的点数组 a ，l和r 表示涉及的点的范围 
{
    if(l==r) return 1e18;// 两点重合,不计入
    if(l+1==r) return P_d(a[l],a[r]);// 只有两个点
    int mid= l+r>>1;
    ld d=min(merge(l,mid,a),merge(mid+1,r,a));// 直接递归分治
    // 接下来寻找在l - mid ， mid - r 两边形成点对的最近值
    vector<Point> b;
    rep(i,l,r) if(fabs(a[i].x-a[mid].x)<d) b.push_back(a[i]);// 把有效点放入
    function<bool(Point,Point)> cmp2=[&](Point p1,Point p2) -> bool
    {
        return fabs(p1.y-p2.y)<eps?p1.x<p2.x:p1.y<p2.y;
    };
    
    sort(b.begin(),b.end(),cmp2);
    int up=b.size()-1;
    rep(i,0,up-1)
    {
        for(int j=i+1;j<=up&&(b[j].y-b[i].y)<d;++j)
        {// 再加上一层 y 距离的限制
            d=min(d,P_d(b[i],b[j]));// 枚举点对
        }
    }
    return d;
}
void solve() // ll
{
    int n;cin>>n;
    vector<Point> pp(n+1); // 按 {x,y} 排序
    rep(i,1,n)
    {
        cin>>pp[i].x>>pp[i].y;
    }
    sort(pp.begin()+1,pp.end());
    ld ans=merge(1,n,pp);
    printf("%.4lf\n",ans);
}

```

