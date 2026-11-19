# 资料迁移

| 资料 | 原路径 | 网站路径 |
| --- | --- | --- |
| 自备模板 | 待提供 | 说明放在 `docs/algo/templates/<分类>/`，独立 C++ 源码放在 `docs/code/cpp/` |
| 算法学习笔记 | 待提供 | `docs/notes/algorithm/<分类>/` |
| 优质题目与 VP 资料 | 待提供 | 单题放在 `docs/algo/problems/<来源>/`，整场复盘放在 `docs/notes/contests/` |

仅复制指定可公开的内容，保留原文件及其路径。同一旧笔记里的推导、适用条件和疑问保存在学习笔记中，代码整理到独立文件，并由模板说明页引用。笔记链接到模板页。笔记、模板和题目统一使用共享词表的 `algorithms` ID。题解引用的模板路径另外登记在 `templates`。

AtCoder、Codeforces、LeetCode 使用同级目录。AtCoder ABC 场次记录在 `contest`。新建题目页前查找相同的 `platform` 和官方 `problem_id`，确认属于同一原题的镜像链接补到已有页面。VP 复盘的补题清单链接到相同的站内题目页。

## 示例映射

示例由本次实现创建。原资料路径和公开范围确认后才能试迁移，届时逐条记录实际原路径与网站路径。

| 原路径 | 网站路径 | 说明 |
| --- | --- | --- |
| 新建示例 | `docs/algo/templates/data-structures/dsu.md`、`docs/code/cpp/dsu.hpp` | C++17 并查集模板 |
| 新建示例 | `docs/notes/algorithm/data-structures/dsu.md` | 并查集原理 |
| AtCoder ABC177 D | `docs/algo/problems/atcoder/abc177-d.md` | 已有题解 |
| Codeforces 313B | `docs/algo/problems/codeforces/313b.md` | 前缀和 |
| Codeforces 1352A | `docs/algo/problems/codeforces/1352a.md` | 待标注 |
| LeetCode 629 | `docs/algo/problems/leetcode/629.md` | 线性 DP、前缀和 |
| 新建示例 | `docs/notes/contests/abc177-demo.md` | VP 补题清单示例 |

## 试迁移验收

1. 从获准公开的材料中选一篇模板、一篇笔记和几道不同平台的题，记录原路径、网站路径及待标注的题目。
2. 选一个已有专题，确认能进入笔记、从笔记跳到模板，再跳到对应题目。确认模板渲染的是独立 C++ 源码。
3. 验证题名和题号搜索、算法中文名和别名、多算法交集，以及三个平台页的默认来源。确认待标注题目可按题名、题号和来源查到。
4. 检查 VP 补题清单指向同一个题目页，执行构建，确认所有试迁移页面可访问。通过后按同一规则继续导入指定可公开的资料。
