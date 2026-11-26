<script setup lang="ts">
import TopicCards from './TopicCards.vue'
import { learningCategories, learningChapterHref } from '../algorithm-learning'

const props = defineProps<{ category: string; section?: string }>()
const category = learningCategories.find(entry => entry.slug === props.category)
if (!category) throw new Error(`Unknown learning notes category: ${props.category}`)

const chapters = props.section
  ? category.chapters.find(entry => entry.path === props.section)?.items
  : category.chapters

if (!chapters) throw new Error(`Unknown learning notes section: ${props.category}/${props.section}`)

const cards = chapters.map(chapter => ({
  title: chapter.path ? chapter.title : `${chapter.title}（待补）`,
  href: chapter.path ? learningChapterHref(category.slug, chapter.path) : undefined,
  featured: (chapter.items ?? []).flatMap(child => child.path
    ? [{
      title: child.featured ?? child.title,
      href: learningChapterHref(category.slug, child.path)
    }]
    : []).slice(0, 4)
}))
</script>

<template>
  <TopicCards :cards="cards" />
</template>
