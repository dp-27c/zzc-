# 资料迁移

| 资料 | 原路径 | 网站路径 |
| --- | --- | --- |
| 自备模板 | A 至 E 级附件，其余待提供 | 说明放在 `docs/algo/templates/`，独立 C++ 源码放在 `docs/code/cpp/` |
| 算法学习笔记 | 附件 `数学大板：.md` 和本次四份讲解笔记 | 数学专题放在 `docs/algo/topics/math/`，其他学习笔记放在 `docs/notes/algorithm/<分类>/` |
| 优质题目与 VP 资料 | 待提供 | 单题放在 `docs/algo/problems/<来源>/`，整场复盘放在 `docs/notes/contests/` |

仅复制指定可公开的内容，保留原文件及其路径。同一旧笔记里的推导、适用条件和疑问保存在学习笔记中，代码整理到独立文件，并由模板说明页引用。笔记链接到模板页。笔记、模板和题目统一使用共享词表的 `algorithms` ID。题解引用的模板路径另外登记在 `templates`。

AtCoder、Codeforces、LeetCode 使用同级目录。AtCoder ABC 场次记录在 `contest`。新建题目页前查找相同的 `platform` 和官方 `problem_id`，确认属于同一原题的镜像链接补到已有页面。VP 复盘的补题清单链接到相同的站内题目页。

## 已导入资料

| 原文件 | 网站路径 | 说明 |
| --- | --- | --- |
| 附件 `已粘贴的文本.txt` | `docs/algo/templates/a-level.md` | 两份同名附件内容一致，合并为一页。原文件保留，正文按原字节复制，仅添加页面元数据。 |
| 附件 `B级模板.md` | `docs/algo/templates/b-level.md` | B-001 至 B-022，已补 1 张原图 |
| 附件 `C级公式.md` | `docs/algo/templates/c-level.md` | 公式排版，已补 8 张原图 |
| 附件 `D级模板.md` | `docs/algo/templates/d-level.md` | 公式排版 |
| 附件 `E级trick.md` | `docs/algo/templates/e-level.md` | 公式排版，已补 6 张原图 |
| 附件 `数学大板：.md` | `docs/algo/topics/math/` | 四个分区，31 个章节，2 个空章标为待补。已补全 12 处配图，2 处待补。 |
| 附件 `计算几何板.md` | `docs/algo/topics/geometry/` | 8 个章节，5 处配图已补齐 |
| 附件 `IC网络赛板：.md` | `docs/algo/topics/mixed/` | 专题名为「综合」，9 个章节，3 处配图已补齐 |
| 附件 `Tricks（需吸收日月精华）.md` | `docs/algo/topics/tricks/` | 专题名为「总trick」，8 个章节，6 处配图已恢复，5 处待补 |
| 附件 `字符串讲解：.md` | `docs/notes/algorithm/strings/` | 4 个章节，5 张图待补 |
| 附件 `数学讲解.md` | `docs/notes/algorithm/math/` | 37 个章节，53 处配图已补齐 |
| 附件 `计算几何讲解.md` | `docs/notes/algorithm/geometry/` | 13 个章节，18 处配图已补齐 |
| 附件 `dp讲解.md` | `docs/notes/algorithm/dp/` | 21 个章节，11 处配图已补齐 |
| 附件 `数据结构讲解：.md` | `docs/notes/algorithm/data-structures/` | 14 个章节，4 处配图已补齐 |
| 附件 `zzc-images-20261125-050952.zip` | `docs/assets/note-images/` | 保存 76 张原图，恢复 98 处配图 |

## 算法学习笔记缺图清单

本清单列出的 76 个文件均已补齐。以下保留原文件名，供核对。

### 数学

- `Pasted image 20250602193726.png`
- `Pasted image 20250813212904.png`
- `Pasted image 20250813213153.png`
- `Pasted image 20250814110900.png`
- `Pasted image 20250823141839.png`
- `Pasted image 20250817103159.png`
- `Pasted image 20250817172910.png`
- `Pasted image 20250817103414.png`
- `微信图片_20250819120511_71.jpg`
- `Pasted image 20250816151804.png`
- `Pasted image 20250817094117.png`
- `Pasted image 20250816152930.png`
- `Pasted image 20250816153042.png`
- `Pasted image 20250816165137.png`
- `Pasted image 20250817114418.png`
- `Pasted image 20250817120606.png`
- `Pasted image 20250817121543.png`
- `Pasted image 20250817143653.png`
- `Pasted image 20250817143718.png`
- `Pasted image 20250821153307.png`
- `Pasted image 20250817155753.png`
- `Pasted image 20250817161927.png`
- `Pasted image 20250817161957.png`
- `卡特兰数辅助1.png`
- `Pasted image 20250821144919.png`
- `Pasted image 20250821145000.png`
- `Pasted image 20250821160055.png`
- `Pasted image 20250821164945.png`
- `Pasted image 20250824141612.png`
- `Pasted image 20250822153650.png`
- `Pasted image 20250821195033.png`
- `Pasted image 20250821210922.png`
- `Pasted image 20250821212659.png`
- `Pasted image 20251202104717.png`
- `Pasted image 20250825162928.png`
- `Pasted image 20250825171035.png`
- `Pasted image 20250825185527.png`
- `Pasted image 20250826145132.png`
- `Pasted image 20250822152038.png`
- `Pasted image 20250828141553.png`
- `Pasted image 20250829163550.png`
- `Pasted image 20250829164215.png`
- `Pasted image 20250829172006.png`
- `Pasted image 20250830152557.png`
- `Pasted image 20250831135449.png`
- `Pasted image 20250831140941.png`

### 计算几何

- `Pasted image 20250922185150.png`
- `Pasted image 20250922185216.png`
- `Pasted image 20250922195646.png`
- `Pasted image 20250923162034.png`
- `Pasted image 20250924141735.png`
- `CB43B40A9CA8FFA5151D5E7E1D7826F2.jpg`
- `Pasted image 20250927083117.png`
- `Pasted image 20250927084103.png`
- `Pasted image 20250926202019.png`
- `Pasted image 20250927132942.png`
- `Pasted image 20250927163504.png`
- `Pasted image 20250927135730.png`
- `Pasted image 20250928162241.png`
- `Pasted image 20250928163205.png`
- `Pasted image 20250928163438.png`
- `Pasted image 20250929172409.png`
- `Pasted image 20250929200840.png`

### 动态规划

- `Pasted image 20250719205557.png`
- `Pasted image 20250720213343.png`
- `屏幕截图 2025-07-22 213206.png`
- `Pasted image 20250725104542.png`
- `Pasted image 20250725202316.png`
- `Pasted image 20250726212745.png`
- `Pasted image 20250728200118.png`
- `Pasted image 20250817143653.png`
- `Pasted image 20250817143718.png`
- `屏幕截图 2025-07-30 145542.png`
- `屏幕截图 2025-07-30 145550.png`

### 数据结构

- `Pasted image 20251017194347.png`
- `Pasted image 20260111210946.png`
- `Pasted image 20260111211110.png`
- `Pasted image 20260815200756.png`

## 示例映射

以下页面用于验证归档结构。其余资料按确认的公开范围导入，并逐条记录原路径和网站路径。

| 原路径 | 网站路径 | 说明 |
| --- | --- | --- |
| 新建示例 | `docs/code/cpp/dsu.hpp` | ABC177 D 题解引用的 C++17 并查集实现 |
| 新建示例 | `docs/notes/algorithm/data-structures/dsu.md` | 并查集原理 |
| AtCoder ABC177 D | `docs/algo/problems/atcoder/abc177-d.md` | 已有题解 |
| Codeforces 313B | `docs/algo/problems/codeforces/313b.md` | 前缀和 |
| Codeforces 1352A | `docs/algo/problems/codeforces/1352a.md` | 待标注 |
| LeetCode 629 | `docs/algo/problems/leetcode/629.md` | 线性 DP、前缀和 |
| 新建示例 | `docs/notes/contests/abc177-demo.md` | VP 补题清单示例 |

## 试迁移验收

1. 从获准公开的材料中选一篇模板、一篇笔记和几道不同平台的题，记录原路径、网站路径及待标注的题目。
2. 选一个同时收录笔记、模板和题目的专题，检查三类页面的链接。模板使用独立 C++ 源码时，确认页面渲染了对应的文件。
3. 验证题名和题号搜索、算法中文名和别名、多算法交集，以及三个平台页的默认来源。确认待标注题目可按题名、题号和来源查到。
4. 检查 VP 补题清单指向同一个题目页，执行构建，确认所有试迁移页面可访问。通过后按同一规则继续导入指定可公开的资料。
