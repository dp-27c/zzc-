import { defineConfig } from 'vitepress'
import { algorithmLearningSidebar } from './algorithm-learning'
import { topicSidebar } from './topic-navigation'

export default defineConfig({
  lang: 'zh-CN',
  title: 'zzc 的笔记',
  description: '算法笔记、C++ 模板、题库与生活记录',
  base: '/zzc-/',
  markdown: { math: true, headers: { level: [2, 3, 4, 5] } },
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'zzc',
    nav: [
      { text: 'GitHub', link: 'https://github.com/dp-27c/zzc-' }
    ],
    sidebar: [
      { text: '首页', link: '/' },
      {
        text: '算法库',
        link: '/algo/',
        items: [
          {
            text: '专题',
            link: '/algo/topics/',
            items: topicSidebar
          },
          {
            text: '模板',
            link: '/algo/templates/',
            items: [
              { text: 'A级模板', link: '/algo/templates/a-level.html' },
              { text: 'B级模板', link: '/algo/templates/b-level.html' },
              { text: 'C级公式', link: '/algo/templates/c-level.html' },
              { text: 'D级模板', link: '/algo/templates/d-level.html' },
              { text: 'E级trick', link: '/algo/templates/e-level.html' }
            ]
          },
          {
            text: '筛选题目',
            link: '/algo/problems/',
            items: [
              { text: 'AtCoder', link: '/algo/problems/atcoder/' },
              { text: 'Codeforces', link: '/algo/problems/codeforces/' },
              { text: 'LeetCode', link: '/algo/problems/leetcode/' }
            ]
          }
        ]
      },
      {
        text: '笔记',
        link: '/notes/',
        items: [
          algorithmLearningSidebar,
          { text: 'VP 复盘', link: '/notes/contests/' }
        ]
      },
      { text: '生活', link: '/life/' },
      { text: '简历', link: '/resume/' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '全站搜索', buttonAriaLabel: '全站搜索' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '打开',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    outline: { label: '本页目录' },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '更新于' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换浅色模式',
    darkModeSwitchTitle: '切换深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  }
})
