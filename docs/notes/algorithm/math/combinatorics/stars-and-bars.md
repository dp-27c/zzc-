---
title: "隔板插空"
algorithms: []
sidebarOutline: true
---

# 隔板插空

## 正整数和的数目

[oi-Wiki](https://oi-wiki.org/math/combinatorics/combination/#%E6%AD%A3%E6%95%B4%E6%95%B0%E5%92%8C%E7%9A%84%E6%95%B0%E7%9B%AE "Permanent link")^

### 空降 模版题：[1308. 方程的解 - AcWing题库](https://www.acwing.com/problem/content/description/1310/)^

虽然这题还涉及到高精度 ，但是确实我第一次接触这个计数方法；
$\huge a_1+a_2+a_3+……+a_k = x，满足a_i是正整数，问有多少种不同的 a 数组解？$
我们可以将 x 拆成 x 个 1 线性排列，此时我们要将其分割成 k 个部分。
思考：
1.每个部分是否都是独一无二的，即这样的分法会不会重复？
2. 这样的分法是否可以包含所有的情况？
思考完这些之后，不难发现 ， 这个计数映射到隔板插空问题里面，分成k个部分，就是用 k-1 个板，将 一共 x-1 的空插入，有多少种插法：
$\huge C_{n-1}^{k-1}$

```cpp
void solve() // ll !
{
    int x,k,M;cin>>k>>x;M=1000;
    x=ksm(x,x,1000);
    vector<vii> f(x,vii(k,{1})); 
    if(x==0)
    {
        cout<<0<<endl;return;
    }
    rep(i,2,x-1)
    {
        rep(j,1,k-1)
        {
            if(j>=i){f[i][j]={1};break;}
            f[i][j]=gjd_add(f[i-1][j],f[i-1][j-1]);// 高精度加法模版
        }
    }
    stack<int> stk;
    for(auto &x:f[x-1][k-1])
    {
        stk.push(x);
    }
    while(stk.size())
    {
        cout<<stk.top();
        stk.pop();
        if(stk.empty()) cout<<"\n";
    }

}
```

## 非负整数和的数目

[OI-wiki](https://oi-wiki.org/math/combinatorics/combination/#%E9%9D%9E%E8%B4%9F%E6%95%B4%E6%95%B0%E5%92%8C%E7%9A%84%E6%95%B0%E7%9B%AE "Permanent link")^

![隔板法计算非负整数和的方案数](../../../../assets/note-images/Pasted%20image%2020250816151804.png){width=1135 height=716}




### 练习题，思维转换

练习题：([AcWing - 算法提高课](https://www.acwing.com/activity/content/record/16/1/))
快些题解啊

![单调不降数列计数练习的题意](../../../../assets/note-images/Pasted%20image%2020250817094117.png){width=1424 height=228}

因为满足单调不降的顺序，我们此时可以对相邻元素进行差分， 此时就可得到一个 $a_1+(a_2-a_1)+(a_3-a_2)……$
然后将他们求和，$sum_n<=(r-l)$   （把范围看成是 0 ~ r-l ）
我们相当于看成 r-l+1 个数， 将其分成 k 个部分，k 从 1 ~ n求和，但是因为要多一个盒子存放那些后面用不上的数，所以是 2~n+1 的部分求和
因为还满足 每个数 $x_{i} >= 0$ 所以 补足 k个空，即最后$\huge \sum C_{r-l+k}^{k},k(1,n)$
根据递推式子化简求和公式 得到最终答案 $\huge C_{r-l+n+1}^{n}-1$
然后用Lucas定理把他算出来就好了
```cpp
typedef long long LL;
int Mod(int a,int b)
{
    if(b==0) return a;
    return (a%b+b)%b;
}

const int M=1e6+3;//常数逆元更快
int ksm(int x, int k,int M)
{
    int sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % M;
        x = (x * x) % M, k >>= 1;
    }
    return sum;
}
int C(int a, int b){
    int res = 1, inv = 1;
    for (int i = 1, j = a; i <= b; i++, j--) {
        res = (LL)res * j % M;
        inv = (LL)inv * i % M;
    }
    res = (LL)res * ksm(inv, M - 2,M) % M;
    return res;
}
LL lucas(LL a, LL b,LL M) {
    if (a < M && b < M) return C(a, b);
    return (LL)C(a % M, b % M) * lucas(a / M, b / M,M) % M;
}
void solve() // ll !
{
    int n,l,r;cin>>n>>l>>r;
    int ans=lucas(r-l+n+1,r-l+1,M)-1;
    cout<<Mod(ans,M)<<endl;
}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t_ = 1;
    cin>>t_;
    //init();
    while (t_--){solve();}
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```



## 不同下界整数和的数目

[OI-wiki](https://oi-wiki.org/math/combinatorics/combination/#%E9%9D%9E%E8%B4%9F%E6%95%B4%E6%95%B0%E5%92%8C%E7%9A%84%E6%95%B0%E7%9B%AE "Permanent link")^

![带不同下界的整数和计数](../../../../assets/note-images/Pasted%20image%2020250816152930.png){width=1176 height=861}


## 不相邻的排列


![隔板法处理不相邻排列](../../../../assets/note-images/Pasted%20image%2020250816153042.png){width=1254 height=249}

这里我解释一下， 看完上面的方法也很好理解，为了是两个数不相邻，我们可以在选出来的 k 个部分中 在砍掉其中 k-1 个元素，放在这 k个部分的两两之间，这样我们就把他们隔开了。
