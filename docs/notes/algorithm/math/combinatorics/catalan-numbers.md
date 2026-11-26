---
title: "卡特兰数（Cantalan数）（熟练度：3）"
algorithms: []
sidebarOutline: true
---

# 卡特兰数（Cantalan数）（熟练度：3）

## 卡特兰数的推导：

注意：
当 n 大于等于19 的时候，$\huge H_n$ 就会超过 long long
而对于开的 long long ，n 在 33 往后就要爆炸了 ！！BOOM！！

![卡特兰数的三种公式及前九项](../../../../assets/note-images/Pasted%20image%2020250817161610.png){width=1494 height=385}


### 公式一：


 $\huge H_n=C_{2*n}^{n}-C_{2*n}^{n-1}$
镜像映衬求非法路径数量，（太 神 奇 了）orz
在一个 `n*n` 的网格中 不能能走 `i*i`的这条直线往上的点，问有多少种方案数？

![卡特兰数推导中的网格路径反射](../../../../assets/note-images/Pasted%20image%2020250817155753.png){width=580 height=636}


也就是不能触碰这条红线。
对于所有非法路径，令它与红线做对称，都可以对应唯一一条从$(0,0)->(n-1,n+1)$的路径
所以我们得出 $\huge H_n=C_{n+n}^{n}-C_{n-1+n+1}^{n-1}$
这是我们推导出的卡特数的第一个式子。

### 公式二：

如果要求组合数，那么考虑Lucas（保证p为质数）和
$\huge H_n =$$\displaystyle\huge \frac{1}{n+1} *C_{2n}^{n}$
推导：
$\huge C_{2n}^{n} - C_{2n}^{n-1} =>

$$
\displaystyle \huge \frac{(2n)!}{n!n!} -\frac{(2n)!}{(n-1)!(n+1)!} =>
$$

\displaystyle \huge \frac{(2n)!}{n!(n-1)!} *(\frac{1}{n} -\frac{1}{n+1} )=>$

$\displaystyle\huge \frac{n!}{r!(n-r)!} *\frac{1}{n*(n+1)} =>$$\displaystyle\huge \frac{1}{n+1} *C_{2n}^{n}$

### 公式三：

上面两个公式结合，自己推吧，或者记住他
但是当n比较大的时候，有取mod 的要求
那么我们要保证 mod p 的这个 p为质数，否则不能这样递推
就只能用第二个式子结合计算了

$\displaystyle\huge H_n=\frac{4n-2}{n+1} *H_{n-1}$

$\huge H_0=1,H_1=1$

## 卡特兰数的特征：


![卡特兰数的判别特征](../../../../assets/note-images/Pasted%20image%2020250817161927.png){width=1599 height=351}



## 卡特兰数的运用(练习)：

对于每一个应用都要理解，这样才能拓展，建议来六道这样的题：

![卡特兰数的六种应用](../../../../assets/note-images/Pasted%20image%2020250817161957.png){width=1616 height=572}

1. 运用4证明：
这里的二叉树是不考虑节点之间的不同的，应该叫二叉树的不同的状态，形态更为恰当。
转化：
令二叉树固定一个 1~n 的前序遍历，作为入栈，中序遍历作为出栈，考虑不同的出栈顺序。


### 数列排序的方案

[P3200 [HNOI2009] 有趣的数列 - 洛谷](https://www.luogu.com.cn/problem/P3200)
这是一道很好的思维题：建议升蓝
大意：
 1.一个2n的排列 $\{a_i\}$
 2.奇数位上单调递增，偶数位上单调递增
 3.相邻两位满足 $\huge a_{2i-1}<a_{2i}$
求满足这样一个排列的方案数。

思路：
1.对于第二个条件来说，我们可以模拟一个选择过程
每次把1~2n的最前面的数进行一次操作：
c1：放到奇数位的 没放过的数的最前面
c2：放到偶数位的 没放过的数的最前面

![按奇偶位置构造数列的示例](../../../../assets/note-images/%E5%8D%A1%E7%89%B9%E5%85%B0%E6%95%B0%E8%BE%85%E5%8A%A91.png){width=2066 height=932}

这样的选择能够保证奇数位和偶数位的单调性；
2.我们考虑第三个条件，即推理使得 偶数位上的数要大于它前面的所有树

所以偶数位上的数要大于等于它的下标。

这个条件对上面图画的操作有什么影响呢？

我们发现 如果 c2 的次数大于 c1 的次数，那么就不符合$\huge a_{2i}>=2i$ 这个条件。

所以对于2n次操作，满足c2操作的次数一直保持小于等于c1的次数，这就是卡特兰数
$\huge H_n =$$\displaystyle\huge \frac{1}{n+1} *C_{2n}^{n}$   ,然后就是求 卡特兰数在对 非质数取模的运算，考虑质因数分解，约分来代替逆元步骤
下面是代码：
```cpp
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
    int n,p;cin>>n>>p;
    vi fz(N,0),fm(N,0);
    rep(i,1,2*n)
    {
        if(i<n+1)
        {
            int x=i;
            while(x!=vis[x])
            {
                fm[vis[x]]++;
                x/=vis[x];
            }
            fm[vis[x]]++;
        }
        if(i>n+1)
        {
            int x=i;
            while(x!=vis[x])
            {
                fz[vis[x]]++;
                x/=vis[x];
            }
            fz[vis[x]]++;
        }
    }
    int ans=1;
    for(auto &x:pri)
    {
        int cn=(fz[x]-fm[x]);
        ans=(ans*ksm(x,cn,p))%p;
    }
    cout<<ans<<endl;
}
```

## ex卡特兰数

如果是 n x m 的网格，那我们又该如何是好？
$\huge C_{2n}^{n}-C_{2n}^{m-1}$

依旧是用网格的对称性来映射，参考第一推理：
题目[AcWing 1315. 网格 - AcWing](https://www.acwing.com/solution/content/46130/)
