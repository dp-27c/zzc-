import { useData, type PageData, type Theme } from 'vitepress'
import DefaultTheme, { type DefaultTheme as ThemeConfig } from 'vitepress/theme'
import { computed, h, onMounted, ref } from 'vue'
import SidebarLinks from './SidebarLinks.vue'
import './style.css'

type SidebarItem = ThemeConfig.SidebarItem
type Heading = PageData['headers'][number]

function headingLinks(headings: Heading[], path: string): SidebarItem[] {
  return headings.map(heading => ({
    text: heading.title,
    link: path + heading.link,
    items: headingLinks(heading.children, path)
  }))
}

function withPageHeadings(items: SidebarItem[], path: string, headings: Heading[]): SidebarItem[] {
  return items.map(item => {
    if (item.link === path) {
      return { ...item, items: headingLinks(headings, path) }
    }
    return item.items ? { ...item, items: withPageHeadings(item.items, path, headings) } : item
  })
}

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const { page, theme, hash } = useData()
      const currentPath = computed(() => '/' + page.value.relativePath
        .replace(/(^|\/)index\.md$/, '$1')
        .replace(/\.md$/, '.html'))
      const sidebar = computed(() => {
        const items: SidebarItem[] = theme.value.sidebar
        return page.value.frontmatter.sidebarOutline
          ? withPageHeadings(items, currentPath.value, page.value.headers)
          : items
      })

      // URL fragments are available only in the browser.
      const mounted = ref(false)
      onMounted(() => { mounted.value = true })
      const currentHash = computed(() => {
        if (!mounted.value) return ''
        try {
          return decodeURIComponent(hash.value)
        } catch {
          return ''
        }
      })

      return () => h(DefaultTheme.Layout, null, {
        'sidebar-nav-before': () => h(SidebarLinks, {
          class: 'route-sidebar',
          items: sidebar.value,
          currentPath: currentPath.value,
          currentHash: currentHash.value
        })
      })
    }
  }
} satisfies Theme
