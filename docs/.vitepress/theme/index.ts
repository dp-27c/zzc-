import { useData, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import SidebarLinks from './SidebarLinks.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const { page, theme } = useData()

      return () => h(DefaultTheme.Layout, null, {
        'sidebar-nav-before': () => h(SidebarLinks, {
          class: 'route-sidebar',
          items: theme.value.sidebar,
          currentPath: '/' + page.value.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
        })
      })
    }
  }
} satisfies Theme
