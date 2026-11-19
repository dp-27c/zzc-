# zzc-
网站用于存放zzc的算法笔记，算法模板，生活以及简历

## 本地开发

使用 Node.js 22 或更新版本。在仓库根目录运行：

```sh
npm ci
npm run dev
```

打开终端显示的地址，路径包含 `/zzc-/`。生产构建与本地预览分别使用 `npm run build` 和 `npm run preview`。构建产物在 `docs/.vitepress/dist/`。

## 新增题目

在 `docs/algo/problems/<平台>/` 中添加一个 Markdown 文件。三个平台目录为 `atcoder`、`codeforces`、`leetcode`。以 AtCoder ABC177 D 为例：

```yaml
---
title: Friends
platform: atcoder
problem_id: abc177_d
problem_url: https://atcoder.jp/contests/abc177/tasks/abc177_d
contest: ABC177
algorithms: [dsu]
solution_status: collected
---
```

先按平台和官方题号检查是否已有站内题目页。镜像链接补在同一页，VP 补题清单引用该页。题号按字符串处理，纯数字请在 YAML 中加引号，如 `problem_id: '629'`。有明确训练价值时，在正文写一句收录理由。

题解状态使用 `collected`（已收录）或 `written`（已有题解）。`algorithms: []` 显示为「待标注」，仍可按题名、题号和来源查找。题解使用的站内模板路径登记在可选的 `templates` 字段中。算法 ID、中文名和检索别名统一维护在 [算法词表](docs/.vitepress/algorithms.json)；题库和专题均从页面 frontmatter 读取标签。

## 归档与迁移

[资料迁移方案与记录](migration.md)列出分类规则、示例映射和试迁移验收步骤。模板说明页通过 VitePress 代码片段语法引用 `docs/code/cpp/` 下的独立源码。

## GitHub Pages

站点使用项目子路径 `/zzc-/`。首次部署前，在仓库 **Settings → Pages → Build and deployment** 将 Source 设为 **GitHub Actions**。PR 会运行构建，合并到 `main` 后的推送会构建并部署站点。
