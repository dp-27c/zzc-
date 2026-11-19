import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'zzc 的笔记',
  description: '算法笔记、C++ 模板、题库与生活记录',
  base: '/zzc-/',
  markdown: { math: true },
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '算法库', link: '/algo/', activeMatch: '^/algo/' },
      { text: '笔记', link: '/notes/', activeMatch: '^/notes/' },
      { text: '生活', link: '/life/' },
      { text: '简历', link: '/resume/' },
      { text: 'GitHub', link: 'https://github.com/dp-27c/zzc-' }
    ],
    sidebar: {
      '/algo/': [
        {
          text: '算法库',
          items: [
            { text: '专题', link: '/algo/topics/' },
            { text: '模板', link: '/algo/templates/' }
          ]
        },
        {
          text: '题库',
          link: '/algo/problems/',
          items: [
            { text: 'AtCoder', link: '/algo/problems/atcoder/' },
            { text: 'Codeforces', link: '/algo/problems/codeforces/' },
            { text: 'LeetCode', link: '/algo/problems/leetcode/' }
          ]
        }
      ],
      '/notes/': [
        {
          text: '笔记',
          items: [
            { text: '算法学习', link: '/notes/algorithm/' },
            { text: 'VP 复盘', link: '/notes/contests/' }
          ]
        }
      ]
    },
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
