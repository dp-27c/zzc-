---
aside: false
---

<script setup lang="ts">
import TopicCards from '../../../.vitepress/components/TopicCards.vue'
import { mathChapterPath, mathSections, mathSectionPath } from '../../../.vitepress/math-topics'

const sections = mathSections.map(section => ({
  title: section.title,
  href: mathSectionPath(section.id),
  action: '查看全部',
  featured: section.chapters.flatMap(chapter => chapter.slug && chapter.featured
    ? [{ title: chapter.featured, href: mathChapterPath(section.id, chapter.slug) }]
    : [])
}))
</script>

# 数学

<TopicCards :cards="sections" />
