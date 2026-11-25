---
title: 矩阵快速幂入门（叶版）
sidebarOutline: true
---

# 矩阵快速幂入门（叶版）

矩阵快速幂的核心思想是：将线性时间复杂度 $\large \mathcal{O}(n)$ 压缩到对数时间复杂度 $\large \mathcal{O}(\log n)$。

- 完整时间复杂度：$\large \mathcal{O}(M^3 \log n)$，其中 $\large M$ 是矩阵的边长（状态数），$\large n$ 是步数/项数。
- 适用场景：当题目中的“状态转移”是线性的，且“步数/天数/项数”极大（如 $\large 10^9$ 到 $\large 10^{18}$）时，必须使用它。

## 单位元

对于某个集合和一种二元运算 $\large \circ$，如果存在一个元素 $\large E$，使得对于集合中的任何元素 $\large A$，都满足：

$$
\large A \circ E = E \circ A = A
$$

那么这个 $\large E$ 就是该运算的单位元。

- 加法 ($\large +$)： 单位元是 $\large 0$ ($\large 5 + 0 = 5$)。
- 乘法 ($\large \times$)： 单位元是 $\large 1$ ($\large 5 \times 1 = 5$)。

## 广义矩阵乘法

**广义矩阵乘法的通用公式**：

$$
\large C_{i,j} = \text{运算1}_k (\, \text{运算2}(A_{i,k}, B_{k,j}) \,)
$$

- 运算$\large 2$ (内层运算，求路径)： 比如普通的乘法 $\large \times$，或者图论中的 $\large +$、$\large \max$。
- 运算$\large 1$ (外层运算，求聚合)： 比如普通的加法 $\large \sum$，或者图论中的 $\large \min$、$\large \max$。

**快速构造矩阵单位元**：

- **主对角线 $\large E_{i,i}$ 的值**： 等于 **内层运算$\large 2$** 的单位元。
- **非对角线 $\large E_{i,j}$ 的值**： 等于 **外层运算$\large 1$** 的单位元（通常是代表“无效”的最值，也是内层运算的零元）。

**广义矩阵乘法成立的数学前提**：

- 结合律： 广义矩阵乘法必须满足 $\large (A \times B) \times C = A \times (B \times C)$，否则快速幂的拆分是完全错误的。
- 分配律： 内层运算必须对外层运算满足分配律。即 $\large a \times (b + c) = (a \times b) + (a \times c)$。
  以 $\large \text{Min-Plus}$ 为例，加法 对 取最小值是满足分配律的：$\large a + \min(b, c) = \min(a+b, a+c)$，所以它能用快速幂。

## 应用场景总结

|   模型名称   |        应用场景        |  外层运算1 (聚合)  | 内层运算2 (路径) |          单位矩阵形态           |
| :------: | :----------------: | :----------: | :--------: | :-----------------------: |
|   标准乘法   |   走 $K$ 步的方案数/期望   | $\sum$ ($+$) |  $\times$  |      对角线 $1$，其余 $0$       |
| Min-Plus |   走恰好 $K$ 步的最短路    |    $\min$    |    $+$     |    对角线 $0$，其余 $\infty$    |
| Max-Plus |   走恰好 $K$ 步的最长路    |    $\max$    |    $+$     |   对角线 $0$，其余 $-\infty$    |
| Min-Max  | 走 $K$ 步路径中最大边权的最小值 |    $\min$    |   $\max$   |    对角线 $0$，其余 $\infty$    |
| Max-Min  | 走 $K$ 步路径中最小边权的最大值 |    $\max$    |   $\min$   | 对角线 $\infty$，其余 $-\infty$ |

## 转移矩阵构造（列向量视角）

当递推式不仅依赖历史状态，还带有常数项或多项式时，需要在状态向量中引入“常数生成器”。
以 $\large f[i] = f[i - 1] + 2f[i - 2] + 3$ 为例，我们习惯将状态写为列向量。

1. **确定状态向量的维度**
   为了生成 $\large f[i]$，需要 $\large f[i-1]$ 和 $\large f[i-2]$；为了凭空生成常数 $\large 3$，向量中必须携带一个永远为 $\large 1$ 的常数项。
   状态列向量定义为：$\large \begin{bmatrix} f[i-1] \\ f[i-2] \\ 1 \end{bmatrix}$
2. **逐行推导转移矩阵**
	- 第一行 (生成 $\large f[i]$)：$\large f[i] = 1 \cdot f[i-1] + 2 \cdot f[i-2] + 3 \cdot 1 \implies \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}$
	- 第二行 (保留 $\large f[i-1]$)：$\large f[i-1] = 1 \cdot f[i-1] + 0 \cdot f[i-2] + 0 \cdot 1 \implies \begin{bmatrix} 1 & 0 & 0 \end{bmatrix}$
	- 第三行 (维持常数 $\large 1$)：$\large 1 = 0 \cdot f[i-1] + 0 \cdot f[i-2] + 1 \cdot 1 \implies \begin{bmatrix} 0 & 0 & 1 \end{bmatrix}$
3. **最终矩阵乘法形式**：

   $$
   \large \begin{bmatrix} f[i] \\ f[i-1] \\ 1 \end{bmatrix} = \begin{bmatrix} 1 & 2 & 3 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix} \times \begin{bmatrix} f[i-1] \\ f[i-2] \\ 1 \end{bmatrix}
   $$

## 线段树维护矩阵的乘法顺序

在线段树上合并区间矩阵时，必须严格遵守矩阵乘法的结合律。如果状态定义为**列向量**（即 $\large V_{new} = M \times V_{old}$），状态的演进过程如下：

- 第 $\large 1$ 步：$\large V_1 = M_1 \times V_0$
- 第 $\large 2$ 步：$\large V_2 = M_2 \times V_1 = M_2 \times M_1 \times V_0$
- 第 $\large 3$ 步：$\large V_3 = M_3 \times V_2 = M_3 \times M_2 \times M_1 \times V_0$

核心结论：**时间越靠后的转移矩阵，在乘法表达式中越靠左**。

在线段树中，右子树代表时间上较晚的转移，左子树代表较早的转移。因此，父节点的矩阵合并公式必须是：

$$
\large \text{Matrix}_{parent} = \text{Matrix}_{right\_child} \times \text{Matrix}_{left\_child}
$$

注：如果采用行向量 $\large V_{new} = V_{old} \times M$，则顺序相反，为 左子树 $\times$ 右子树

## 矩阵快速幂模板

### 模板一：标准矩阵乘法（求方案数/斐波那契数列等）


$$
\large C_{i, j} = \sum_{k = 1}^{n} \big(a_{i, k} \times b_{k, j}\big) \mod(1e9 + 7)
$$


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

### 模板二：Min-Plus 广义矩阵乘法 (求定步数最短路)


$$
\large C_{i, j} = \min_{k=1}^{n} \big\{a_{i, k} + b_{k, j}\big\}
$$


```cpp
struct mat{
    int a[N][N];
    mat(){memset(a, 0x3f, sizeof a);}
    friend mat operator*(const mat &x, const mat &y){
        mat ans;
        rep(i, 0, N - 1)
            rep(k, 0, N - 1)
                rep(j, 0, N - 1)
                    ans.a[i][j] = min(ans.a[i][j], x.a[i][k] + y.a[k][j]);
        return ans;
    }
};

mat expow(mat A, int k){
	mat ans;
	rep(i, 0, N - 1) ans.a[i][i] = 0;
	// 构造 Min-Plus 的单位矩阵：对角线为 0，其余无穷大
	while(k){
		if(k & 1) ans = ans * A;
		A = A * A;
		k >>= 1;
	}
	return ans;
}
```
