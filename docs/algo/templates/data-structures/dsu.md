---
title: 并查集 C++17 模板
algorithms: [dsu]
---

# 并查集 C++17 模板

支持合并集合、判断两个元素是否同组，以及查询集合大小。构造时传入元素个数 `n`，下标范围为 `[0, n)`。初始化占用 `O(n)` 时间和空间，查询与合并的均摊时间为 `O(α(n))`。

| 接口 | 返回值 |
| --- | --- |
| `find(x)` | `x` 当前所在集合的代表元 |
| `merge(x, y)` | 发生合并时返回 `true`，原本同组时返回 `false` |
| `component_size(x)` | `x` 所在集合的元素数 |

::: code-group

<<< @/code/cpp/dsu.hpp{cpp} [dsu.hpp]

:::

[练习 AtCoder ABC177 D — Friends](../../problems/atcoder/abc177-d.md) · [并查集原理](../../../notes/algorithm/data-structures/dsu.md)
