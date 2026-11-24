---
title: A级模板
algorithms: []
sidebarOutline: true
---

# A级模板
## 数学

### A-001 快速幂

**模型：** 给定整数 `x`、`k`、`M`，计算 `x^k mod M`。

**时间复杂度：** `O(log k)`

**空间复杂度：** `O(1)`

**返回值：** 返回 `[0, M-1]` 范围内的模幂结果。

```cpp
using i64 = long long;

// 计算 x^k mod M，要求 k >= 0，M > 0
i64 ksm(i64 x, i64 k, i64 M)
{
    x = (x % M + M) % M;
    i64 sum = 1 % M;
    while (k)
    {
        if (k & 1)
            sum = (__int128)sum * x % M;
        x = (__int128)x * x % M;
        k >>= 1;
    }
    return sum;
}
```

### A-002 GCD 与 exGCD（欧几里得算法）

**模型：**

给定整数 `a`、`b`，完成以下计算：

1. 求出最大公约数 `gcd(a, b)`。
2. 求出整数 `x`、`y`，满足 `a * x + b * y = gcd(a, b)`。

**时间复杂度：**

- 当 `a`、`b` 均不为 `0` 时：`O(log min(|a|, |b|))`
- 当其中一个数为 `0` 时：`O(1)`

**空间复杂度：** `O(log min(|a|, |b|))`

**返回值：**

- `gcd_rec(a, b)` 返回非负整数 `gcd(a, b)`。
- `exgcd(a, b, x, y)` 返回非负整数 `gcd(a, b)`。
- `exgcd` 同时修改 `x`、`y`，使其满足 `a * x + b * y = gcd(a, b)`。

```cpp
using i64 = long long;

// 只求最大公约数
i64 gcd_rec(i64 a, i64 b){return b ? gcd_rec(b, a % b) : (a >= 0 ? a : -a);}// 返回非负数

// 求最大公约数和贝祖系数 x、y
i64 exgcd(i64 a, i64 b, i64 &x, i64 &y)
{
    if (b == 0)
    {
        x = (a >= 0 ? 1 : -1);
        y = 0;
        return (a >= 0 ? a : -a);
    }
    i64 x1, y1;
    i64 g = exgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}
// 求x的最小正解 
// int t = b/g , k = g 与 原解的倍数关系;
// x = (x*k%t+t)%t
```

### A-003 O(1) gcd
**模型：**
通过预处理 O(V)  的方式来（V为值域）实现O(1) 计算gcd的过程

**时间复杂度：**

预处理：$O(V)$
查询gcd：$O(1)$

关键是:
将$gcd(a,b)$ , a 转化为 三个因子相乘 x y z :
满足：
$x,y,z <= \sqrt{a} 或者 z是质数$
至少有两个小于根号a

根据：$g_1=\gcd(x,b)$  $,$  $g_2=\gcd\left(y,\frac{b}{g_1}\right)$ ，$g_3=\gcd\left(z,\frac{b}{g_1g_2}\right)$
$$gcd(a,b) = g_1 g_2 g_3$$

```cpp
const int N=1e6+10,B=1000;
vi vis(N,0),pri;
array<int,3> fac[N];
int g[B+1][B+1];

// 欧拉筛 + 三因子分解 + GCD 打表
void init()
{
	// 欧拉筛分解三因子
    vis[1]=1;
    fac[1]={1,1,1};
    rep(i,2,N-1)
    {
        if(!vis[i])
        {
            pri.push_back(i);
            vis[i]=i;
            fac[i]={1,1,i};
        }
        rep(j,0,(int)pri.size()-1)
        {
            int p=pri[j];
            if(i*p>=N) break;
            int x=i*p;
            vis[x]=p;
            fac[x]=fac[i];
            fac[x][0]*=p;
            sort(fac[x].begin(),fac[x].end());
            if(vis[i]<=p) break;
        }
    }
    // 打gcd表
    // 预处理 [0,B] 内所有数对的 GCD
    rep(i,0,B) g[i][0]=g[0][i]=i;
    rep(i,1,B)
    {
        rep(j,1,i)
        {
            g[i][j]=g[j][i%j];
            g[j][i]=g[i][j];
        }
    }
}

// O(1) 求 GCD，要求 1<=a,b<N
int fast_gcd(int a,int b) // 快速gcd的重构
{
    int ans=1;
    for(int x:fac[a])
    {
        int t;
        if(x<=B) t=g[x][b%x];
        else t=(b%x==0?x:1);
        ans*=t;
        b/=t;
    }
    return ans;
}

```
### A-004 线性逆元、阶乘与组合数

**模型：**

给定质数模数 `M` 和预处理上限 `n`，在线性时间内预处理：

- `inv[i]`：整数 `i` 在模 `M` 意义下的逆元。
- `fac[i]`：`i! mod M`。
- `ifac[i]`：`i!` 在模 `M` 意义下的逆元。

预处理后，可以快速计算 `C(a, b) mod M`。

**时间复杂度：**

- 预处理：`O(n)`
- 单次组合数查询：`O(1)`

**空间复杂度：** `O(n)`

**返回值：**

- `init_inv(n, M)` 没有返回值，负责初始化 `inv`、`fac` 和 `ifac`。
- `C(a, b, M)` 返回 `C(a, b) mod M`。
- 当 `b > a` 时返回 `0`。

```cpp
typedef long long LL;
LL inv[N+1],fac[N+1],ifac[N+1];
void init_inv(int n,int M)
{
    inv[1]=1;
    ifac[0]=1;fac[0]=1;
    for(int i=1;i<=n;++i)
    {
        if(i==1) inv[i]=1;
        else inv[i]=(M-(M/i)*inv[M%i]%M)%M;
        fac[i]=i*fac[i-1]%M;
        ifac[i]=inv[i]*ifac[i-1]%M;
    }
}
LL C(int a,int b,LL M=mod)
{
    if(b>a||a<0||b<0) return 0;
    return fac[a]*ifac[b]%M*ifac[a-b]%M;
}
```

### A-005 欧拉筛（线性筛）

**模型：**

给定上界 `N`，筛出范围 `[2, N-1]` 内的全部质数，并记录每个整数的最小质因子。

初始化完成后：

- `pri` 按照从小到大的顺序保存全部质数。
- 当 `i` 是质数时，`vis[i] = i`。
- 当 `i` 是合数时，`vis[i]` 等于 `i` 的最小质因子。

**时间复杂度：** `O(N)`

**空间复杂度：** `O(N)`

**返回值：**

`init()` 没有返回值。

初始化完成后：

- `pri` 保存 `[2, N-1]` 内的全部质数。
- `vis[i]` 保存整数 `i` 的最小质因子。

```cpp
#define int long long
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


## 数据结构

### A-006 树状数组

**模型：**

维护长度为 `n` 的数组，支持：

- 单点增加一个值。
- 查询前缀 `[1, x]` 的元素和。
- 根据前缀和查找第 `k` 个元素所在的下标。
- 当数组只包含 `0` 和 `1` 时，查找第 `k` 个 `0` 的位置。

**时间复杂度：**

- 初始化：`O(n)`
- 单点修改：`O(log n)`
- 前缀查询：`O(log n)`
- 第 `k` 个元素查询：`O(log n)`

**空间复杂度：** `O(n)`

**返回值：**

- `init(x)` 初始化大小为 `x` 的树状数组，没有返回值。
- `add(x, k)` 将下标 `x` 的值增加 `k`，没有返回值。
- `sum(x)` 返回区间 `[1, x]` 的元素和。
- `kth(k)` 返回前缀和第一次达到 `k` 的最小下标。
- `kth0(k)` 返回第 `k` 个 `0` 所在的下标。

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

### A-007bitset
创建：
```cpp
bitset<10> bt(123);
bitset<10> bt2("111011")
```
创建了一个 bitset ，由长度为 10 的 01 串构成，内存占用为 4
同时将 123 十进制 转 二进制，如果超过 10 位二进制的数将不会显示。

下面则是字符串赋值，变成 $0000111011$

总结：
```cpp
void solve() // ll
{                  
    bitset<15> bt(114514);
    cout<<bt<<endl;// 01 串输出，第 i 个就是 倒数第 i 个输出
    bt[3]=1; // 直接给第 i 个位置上赋值
    bt.set(4);// 有参：将第 i 个位置设为 1，无参：将所有位置设为 1
    bt.reset(3);// 有参：将第 i 个位置设为 0，无参将所有位置设为 0
    bt.flip(3);// 有参：翻转第 i 个位置，无参，翻转所有位置。

    cout<<sizeof(bt)<<endl;// 专用内存
    cout<<bt.count()<<endl;// 数 1 的个数
    cout<<bt.none()<<endl;// 判断是否有1，有则0，无则1
    cout<<bt.any()<<endl;// 判断是否有1，有则1，无则0
    cout<<bt.test(3)<<endl;// 测试第 i 位上是 1 还是 0，是1 则1.
    cout<<bt.to_ulong()<<endl;// 将bt的二进制转成十进制
    cout<<bt.to_string()<<endl;// 将二进制数转成 01 字符串输出

	bitset<15> bt2("111011")
    cout<<(bt1==bt)<<endl;// 比较相等（前提是两个bt的大小一样，否则报错）
    // bitset 无法进行大小比较。
    cout<<(bt1^bt)<<endl; // 位运算（前提是大小相等）
    cout<< (bt>>2) <<endl; // 同时也可以进行左移右移的操作
}
```
## 字符串
### A-008 KMP

**模型：**

给定字符串 `s`，求出它的前缀函数数组 `pi`。

`pi[i]` 表示字符串 `s[0...i]` 中，最长的相等真前缀和真后缀的长度。

将模式串、分隔符和主串拼接后，可以利用前缀函数完成字符串匹配。

**时间复杂度：** `O(|s|)`

**空间复杂度：** `O(|s|)`

**返回值：**

代码片段没有函数返回值。

计算完成后，`pi[i]` 保存字符串 `s[0...i]` 的最长相等真前缀和真后缀长度。

KMP 使用方法：

理解前缀数组后，只需将 模式串（s1) 在前，主串（s2) 放后，中间隔开：

S= S\_1 + \\# +S\_2返回 S的前缀数组

```cpp
// 此为前缀数组的模板
vi pi(s.size()),ans;
for(int i=1;i<s.size();++i)
{
	int len=pi[i-1];
	while(len&&s[i]!=s[len]) len=pi[len-1];
	pi[i]=len+(s[i]==s[len]);
}
// 时间复杂度 接近O(n)


```

### A-009 回文数组

模型 ：manacher

给定字符串 `ss`，使用 Manacher 算法求出字符串中的最长回文子串长度。

处理后的 `p[i]` 表示以位置 `i` 为中心的回文半径。

**时间复杂度：** `O(|ss|)`

**空间复杂度：** `O(|ss|)`

**返回值：**

`solve()` 没有返回值。

程序输出字符串 `ss` 的最长回文子串长度。

```cpp
void solve() // ll
{
    string ss,s;cin>>ss;
    // 预处理原串
    for(int i=0;i<ss.size();++i) s.push_back('#'),s.push_back(ss[i]);
    s.push_back('#');
    // r 是扩的范围的最右边，c则是最新一次扩边的回文中心
    int r=1,c=0,ans=0;
    vi p(s.size(),0);// p数组 表示以i为中心的回文半径
    // 实际上就 不断往右边扩点：
    // i 在范围内，则可以确定已知范围，然后继续外扩
    // i 在外围外，则暴力
    for(int i=0;i<s.size();++i)
    {
        int len=r>i?min(p[2*c-i],r-i):1;
        while(i-len>=0&&i+len<s.size()&&s[i-len]==s[i+len]) ++len;
        if(i+len>r) r=i+len,c=i;
        p[i]=len;
        ans=max(ans,p[i]-1);// p[i] - 1 是处理后的数组的回文半径 与 原数组的回文长度转换
    }
    cout<<ans<<endl;
};

```

### A-010 Z函数

**模型：**
a 的后缀 i 个字符和 a匹配 为 Z函数问题核心

给定字符串 `a`、`b`：

- 求出字符串 `b` 的 Z 函数数组 `z`。
- 求出扩展数组 `e`。
- `z[i]` 表示 `b[i...]` 与 `b` 的最长公共前缀长度。
- `e[i]` 表示 `a[i...]` 与 `b` 的最长公共前缀长度。

**时间复杂度：** `O(|a| + |b|)`

**空间复杂度：** `O(|a| + |b|)`

**返回值：**

`solve()` 没有返回值，也没有直接输出结果。

计算完成后：

- `z` 保存字符串 `b` 的 Z 函数。
- `e` 保存字符串 `a` 的每个后缀与字符串 `b` 的最长公共前缀长度。

```cpp
void solve() // ll
{
    string a,b;cin>>a>>b;
    auto Z=[&](string &s)// 用于求出字符串 s 的Z函数
    {
        vi z(s.size(),0);z[0]=s.size();
        int c=0,r=0;
        for(int i=1;i<s.size();++i) 
        {
            int len=i<r?min(z[i-c],r-i):0;
            while(i+len<s.size()&&len<s.size()&&s[i+len]==s[len]) ++len;
            if(r<i+len) r=i+len,c=i;
            z[i]=len;
        }
        return z;
    };
    vi z=Z(b);
    // 下面用于演示 b 为主串，a 为匹配串
    // 又叫 e 数组
    vi e(a.size(),0);
    int c=0,r=0;
    for(int i=0;i<a.size();++i)
    {
        int len = i<r ? min(z[i-c],r-i):0;
        while(i+len<a.size()&&len<b.size()&&a[i+len]==b[len]) ++len;// 注意len大小不要超限
        if(r<i+len) r=i+len,c=i;
        e[i]=len;
    }
};

```
###  A-011字符串读入和内置函数：


#### 字符串输入：
```cpp
char s[100];
scanf(“%s”, s); // 遇到空格、换行符结束；忽略前导空格、换行符
// 正则表达式读取法
scanf(“%*c”); // 读取 输入文件 中的第一个待读字符并抛弃，俗称：吸收一个字符。
scanf(“%[^\n]”, s); // 读字符，直到遇到’\n’终止；’\n’成为待读的第一个字符。功能：读一行。
scanf(“%[^\n]%*c”, s); // 读字符，直到遇到’\n’终止；并吸收’\n’。可以避免遗留的’\n’对后续产生影响
scanf(“%[^ab\nc]”, s); // 读字符，遇到集合{‘a’，’b’，’c’，’\n’}中的任一字符终止；^表示否定含义
```

#### 字符串相关函数：
```cpp
//string中,sort(),next_permutation(),reverse()都适用
string s;
cin>>s; //直接读入,有空格或换行符时停止
getline(cin,s);//取一行,遇到换行停止,注意如果前面有读取数字，需要先cin.ignore()清除缓冲区的'\n'
getline(cin,s,'e');//读一行,读到字符'e'停止,且抛弃字符'e'

//截取
s.substr(n,len);//从下标为n的位置(下标从0开始)开始取,取长度为len的字符串
s.substr(n);//从下标为n的位置(下标从0开始)开始取,取完整个字符串

//插入
s.insert(n,"abc");//在下标为n的位置之前插入"abc"串
s.insert(n,cnt,'X');//在下标为n的位置之前插入cnt个'X'字符
string s=s1+s2; // 使用 + 拼接字符串

//删除
s.erase(s.begin()+1,s.begin()+4);//删除索引1到3的字符(不含索引4)
s.erase(pos,len);//从下标为pos的位置开始删除长度为len的字符串
s.erase(pos);//从下标为pos的位置及后面的所有字符

//查找子串
s.find(str);//查找字符串str在当前字符串s中第一次出现的位置,如果未找到则返回std::string::npos
s.find(str,pos);//查找字符串str在当前字符串s的[pos,end]中第一次出现的位置

//替换
s.replace(7, 5, "banana");  // 从位置7开始，替换5个字符为"banana" 搭配find()食用更佳

//类型转换
string str=to_string(number);//整数转换成字符串(可用stringstream ss;ss<<number;string str;ss>>str;)
int number=stoi(str);//字符串转换成整数
const char* str = "123";//字符串转换成整数（C风格）
int number=atoi(str);;//字符串转换成整数（C风格）
isdigit(char);//检查字符是否为数字（0-9）。如果是数字，则返回 true；否则返回false。
isalpha(char);//检查字符是否为字母（a-z 或 A-Z）。如果是字母，则返回 true；否则返回false。
```

## 动态规划
### A-012 最长上升子序列（LIS)

**模型：**

给定长度为 `n` 的序列，求出最长严格单调递增子序列的长度。

这是求最长 严格单调递增 问题的O(nlogn) 优化。

实际上就是贪心的求出 非严格单调递减子序列 的 最小划分。

**时间复杂度：** `O(n log n)`

**空间复杂度：** `O(n)`

**返回值：**

`solve()` 没有返回值。

程序输出最长严格单调递增子序列的长度。

```cpp
void solve() // ll
{
    int n;cin>>n;
    vi a(n+1,0),idx(n+1,INF);
    rep(i,1,n) cin>>a[i];
    rep(i,1,n) *lower_bound(idx.begin(),idx.end(),a[i])=a[i];
    cout<<(lower_bound(idx.begin(),idx.end(),INF)-idx.begin())<<endl;
}

```

#### 总结：

对于 最小划分数 ，有：

最后的个数(cnt)都是 `lower_bound`

非严格递减子序列： `lower_bound`  转移。

严格递减子序列：`upper_bound` 转移。

非严格上升子序列：所有数取相反数后，`lower_bound` 转移。

严格上升子序列：所有数取相反数后，`upper_bound` 转移。

放入的位置可以理解为，以`a[i]`为结尾的最长合法序列，位置为其长度。

## 通用
### A-013 随机数与对拍

**模型：**

给定整数区间 `[l, r]`，等概率随机生成一个位于该闭区间内的整数。

**时间复杂度：** 平均 `O(1)`

**空间复杂度：** `O(1)`

**返回值：** 返回一个位于闭区间 `[l, r]` 内的随机整数。

```cpp
// 随机生成 l 到 r 的整数
int rnd(int l, int r) {
    static mt19937 eng(random_device{}());
    return uniform_int_distribution<int>(l, r)(eng);
}

```

