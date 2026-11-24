<script setup lang="ts">
import { withBase } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'

const props = defineProps<{
  items: DefaultTheme.SidebarItem[]
  currentPath: string
}>()

function isOnPath({ link }: DefaultTheme.SidebarItem) {
  return link === props.currentPath ||
    (link !== '/' && link?.endsWith('/') && props.currentPath.startsWith(link))
}

const links = computed(() => props.items.map(item => {
  const onPath = isOnPath(item)
  const children = onPath ? item.items : undefined
  const current = item.link === props.currentPath ? 'page'
    : onPath && !children?.some(isOnPath) ? 'location'
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
      <SidebarLinks v-if="item.children?.length" :items="item.children" :current-path="currentPath" />
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
}

.sidebar-links .sidebar-links {
  margin-inline-start: 10px;
  padding-inline-start: 10px;
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
