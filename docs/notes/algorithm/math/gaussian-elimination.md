---
title: "代数（袋鼠）"
algorithms: []
sidebarOutline: true
---

# 代数（袋鼠）



## 高斯消元


用于解决 n 个 n 维等式  的解
需要构造一个 n * n+1 的矩阵 带入公式即可
当然，如何转化到可以使用高斯消元的形式还得看你自己了
[207. 球形空间产生器 - AcWing题库](https://www.acwing.com/problem/content/209/)
模版题空降一手：
这是一个将 n+1 个等式转换成 n 个等式的做法
即：

```cpp
void Gauss(vector<vector<ld>>& b) {// b应该是一个 n * （n + 1） 的矩阵
    // 从1开始，而非从0开始

    //化成上三角矩阵
    int n= b.size()-1;
    for (int r = 1, c = 1; r <= n; ++ r, ++ c) {
        //找到主元
        int t = r;
        for (int i = r + 1; i <= n; ++ i)
            if (fabs(b[i][c]) > fabs(b[t][c]))
                t = i;
        //交换第r行和第t行的元素
        for (int i = c; i <= n + 1; ++ i) swap(b[r][i], b[t][i]);
        //主元归一（第r行除以主元系数）
        for (int i = n + 1; i >= c; -- i) b[r][i] /= b[r][c];
        //消元（用该行把下面所有行的第c列消为0）
        for (int i = r + 1; i <= n; ++ i) {
            for (int j = n + 1; j >= c; -- j) {
                b[i][j] -= b[r][j] * b[i][c];
            }
        }
    }
    //化成行最简阶梯型矩阵（本题唯一解，故同样也是对角矩阵）
    for (int i = n; i > 1; -- i) {
        for (int j = i - 1; j >= 1; -- j) {
            b[j][n + 1] -= b[i][n + 1] * b[j][i];
            b[j][i] = 0;
        }
    }
    // 把解出来的答案全存在 b[i][n+1] 里面
}
```
