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

const cards = chapters.flatMap(chapter => {
  if (!chapter.path) return []

  const childLinks = (chapter.items ?? []).flatMap(child => child.path
    ? [{
      title: child.featured ?? child.title,
      href: learningChapterHref(category.slug, child.path)
    }]
    : [])

  return [{
    title: chapter.title,
    href: learningChapterHref(category.slug, chapter.path),
    featured: childLinks.slice(0, 4)
  }]
})

const pendingChapters = chapters.filter(chapter => !chapter.path)
</script>

<template>
  <TopicCards :cards="cards" />
  <p v-for="chapter in pendingChapters" :key="chapter.title">{{ chapter.title }}（待补）</p>
</template>
