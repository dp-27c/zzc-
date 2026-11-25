<script setup lang="ts">
import { withBase } from 'vitepress'
import { mathChapterPath, mathSections } from '../math-topics'

const props = defineProps<{ section: string }>()
const chapters = mathSections.find(section => section.id === props.section)?.chapters ?? []
</script>

<template>
  <ul>
    <li v-for="chapter in chapters" :key="chapter.title">
      <a v-if="chapter.slug" :href="withBase(mathChapterPath(section, chapter.slug))">{{ chapter.title }}</a>
      <span v-else>{{ chapter.title }}（待补）</span>
    </li>
  </ul>
</template>
