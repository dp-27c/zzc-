---
title: Friends
platform: atcoder
problem_id: abc177_d
problem_url: https://atcoder.jp/contests/abc177/tasks/abc177_d
contest: ABC177
algorithms: [dsu]
templates: [/algo/templates/data-structures/dsu]
solution_status: written
sample: true
---

<script setup>
import SampleProblemNotice from '../../../.vitepress/components/SampleProblemNotice.vue'
</script>

# ABC177 D — Friends

<SampleProblemNotice />

[打开 AtCoder 原题](https://atcoder.jp/contests/abc177/tasks/abc177_d)

这道题可以练习把无向关系转换成集合合并，再从集合大小得到答案。

## 思路

把输入中的朋友关系连成无向边。题目规定朋友的朋友也是朋友，所以同一个连通分量中的任意两人都互为朋友，必须分到不同组。设最大连通分量大小为 `k`，至少需要 `k` 个组。每个较小分量可以独立把成员分配到这 `k` 个组中，任意两个分量之间没有限制，因此 `k` 个组也一定足够。

读到一条边就用并查集合并两个端点，最后枚举每个顶点并查询它所在集合的大小，取最大值。题目编号从 `1` 开始，传给模板前减 `1`。

时间复杂度为 `O((N + M) α(N))`，额外空间复杂度为 `O(N)`。

## C++17

在本地编译时将 `dsu.hpp` 放在主文件同一目录。提交到 AtCoder 时可以把模板代码粘贴到同一文件中。

```cpp
#include <algorithm>
#include <iostream>
#include "dsu.hpp"

int main() {
    int n, m;
    std::cin >> n >> m;

    DisjointSetUnion dsu(n);
    for (int i = 0; i < m; ++i) {
        int a, b;
        std::cin >> a >> b;
        dsu.merge(a - 1, b - 1);
    }

    int largest = 0;
    for (int i = 0; i < n; ++i) {
        largest = std::max(largest, dsu.component_size(i));
    }
    std::cout << largest << '\n';
}
```

[查看使用的并查集模板](../../templates/data-structures/dsu.md)
