<script setup lang="ts">
import { withBase } from 'vitepress'
import { learningCategories, learningChapterHref } from '../algorithm-learning'

const props = defineProps<{ category: string; section?: string }>()
const category = learningCategories.find(entry => entry.slug === props.category)
if (!category) throw new Error(`Unknown learning notes category: ${props.category}`)

const chapters = props.section
  ? category.chapters.find(entry => entry.path === props.section)?.items
  : category.chapters

if (!chapters) throw new Error(`Unknown learning notes section: ${props.category}/${props.section}`)
</script>

<template>
  <ul class="learning-chapters">
    <li v-for="chapter in chapters" :key="chapter.path ?? chapter.title">
      <a v-if="chapter.path" :href="withBase(learningChapterHref(category.slug, chapter.path))">{{ chapter.title }}</a>
      <span v-else>{{ chapter.title }}（待补）</span>
      <ul v-if="chapter.items?.length">
        <li v-for="child in chapter.items" :key="child.path ?? child.title">
          <a v-if="child.path" :href="withBase(learningChapterHref(category.slug, child.path))">{{ child.title }}</a>
          <span v-else>{{ child.title }}（待补）</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
