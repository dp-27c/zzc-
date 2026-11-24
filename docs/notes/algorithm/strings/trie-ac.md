---
title: 字典树与 AC 自动机
algorithms: []
sidebarOutline: true
---

# 字典树与 AC 自动机

## 构建字典树（模板）



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

## AC 自动机

模型：经典自动机，用于解决 一个长串中，给出几个关键词，搜索长串中 这些关键词的出现次数

### 模板（统计词频数）
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
优化：
1.  fail 指针路径压缩
2. 