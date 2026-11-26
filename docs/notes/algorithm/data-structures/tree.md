---
title: "树"
algorithms: []
sidebarOutline: true
---

# 树

## 倍增LCA (模板)
预处理：O(nlogn)
查询：O(logn)

```cpp
	const int LOG = 18 ;// 这里取决 n 的范围， 2的 LOG - 1 次方大于等于 n 
	// 二维数组 f[n][LOG-1] ,d[u] 距离数组 
	vii f(n+1,vi(LOG,0));
	vi d(n+1,0);
	auto dfs = [&](auto self, int u, int fa) -> void{
		f[u][0] = fa;
		// 注释的代码是为了建立dfs序
		// p[++tot]=u,idx[u]=tot; 
		// L[u]=tot;
		rep(i, 1, LOG - 1) f[u][i] = f[f[u][i - 1]][i - 1];
		for(auto v : mp[u]){
			if(v == fa) continue;
			d[v] = d[u] + 1;
			self(self, v, u);
		}
		// R[u]=tot;
	};dfs(dfs,1,1);
	auto lca = [&](int u, int v) -> int{
		if(d[u] < d[v]) swap(u, v);
		per(i, LOG - 1, 0)
			if(d[u] - (1 << i) >= d[v]) u = f[u][i];
		if(u == v) return u;
		per(i, LOG - 1, 0)
			if(f[u][i] != f[v][i]) u = f[u][i], v = f[v][i];
		return f[u][0];
	};
```

## 欧拉序RMQ LCA(模板)
预处理：O(nlogn)
查询： O(1)
但不支持在线修改

其本质 是利用 欧拉序 模拟为 在 st表求 区间最小值的问题
因为 区间最小值可以区间覆盖，因此只需要（如图）
![稀疏表用两个重叠区间查询最大值的示例](../../../assets/note-images/Pasted%20image%2020260815200756.png){width=993 height=306}

```cpp
	int tot=0,toula=0;
    const int LOG = 19;
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

## 虚树(模板)
目的：对于给出的树上几个关键节点提取出来，重新构造为一个棵满足原树祖先关系的 虚拟树 ，在这颗树上可以方便做一系列操作，如进行树上dp 等等。

优点是减小对其他点的枚举，降低时间复杂度

单调栈构建虚树
构造的时间复杂度为 O(n)
！！！ 注意 做完虚树 要清空所有可能的值（ 虚树的图，树上dp维护的数组，……）！！！
（以下模板仅为实现 单调栈构建虚树 过程，实际运用转化为自己码风）

```cpp
#include <vector>

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