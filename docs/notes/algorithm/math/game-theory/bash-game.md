---
title: "Bash博弈"
algorithms: []
sidebarOutline: true
---

# Bash博弈

取石子的经典题目：
一共有n个石子，两个人轮流拿，每次拿 1~ m个。
拿到最后一个石子的人获胜，根据n，m返回 先手必胜还是必败。

很显然，只有 m+1 的倍数才会先手必输

## 强化版：

[P4018 Roy&October之取石子 - 洛谷](https://www.luogu.com.cn/problem/P4018)
只能取质数次方的石子，问先手必胜？

思路：
模拟前 12 个，得出结论，只有 6 的倍数必输。
