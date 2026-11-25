<script setup lang="ts">
import { withBase } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'

const props = defineProps<{
  items: DefaultTheme.SidebarItem[]
  currentPath: string
  currentHash: string
}>()

function isOnPath({ link, items }: DefaultTheme.SidebarItem): boolean {
  if (link?.includes('#')) {
    return link === props.currentPath + props.currentHash || !!items?.some(isOnPath)
  }
  return link === props.currentPath ||
    !!(link && link !== '/' && link.endsWith('/') && props.currentPath.startsWith(link))
}

const links = computed(() => props.items.map(item => {
  const onPath = isOnPath(item)
  const children = onPath ? item.items : undefined
  const current = onPath && !children?.some(isOnPath)
    ? (item.link === props.currentPath ? 'page' : 'location')
    : undefined

  return { ...item, children, current }
}))
</script>

<template>
  <ul class="sidebar-links">
    <li v-for="item in links" :key="item.link">
      <a
        v-if="item.link"
        :href="withBase(item.link)"
        :aria-current="item.current"
        class="sidebar-link"
        :class="{ 'sidebar-home': item.link === '/' }"
      >{{ item.text }}</a>
      <SidebarLinks
        v-if="item.children?.length"
        :items="item.children"
        :current-path="currentPath"
        :current-hash="currentHash"
      />
    </li>
  </ul>
</template>

<style scoped>
.sidebar-link {
  display: block;
  padding: 5px 10px;
  border-radius: 6px;
  color: var(--sidebar-link-color, var(--vp-c-text-2));
  font-size: 14px;
  line-height: 24px;
  overflow-wrap: anywhere;
}

.sidebar-links .sidebar-links {
  margin-inline-start: 4px;
  padding-inline-start: 7px;
  border-inline-start: 1px solid var(--vp-c-divider);
}

.route-sidebar > li + li {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
}

.route-sidebar > li > .sidebar-link {
  --sidebar-link-color: var(--vp-c-text-1);
  font-size: 17px;
  font-weight: 700;
}

.route-sidebar .sidebar-home {
  border: 1px solid var(--vp-c-divider);
  font-size: 14px;
}

.sidebar-link:hover,
.sidebar-link[aria-current] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

</style>
