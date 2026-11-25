<script setup lang="ts">
import { withBase } from 'vitepress'
import { chapterLinks, featuredChapters, importedTopics } from '../topic-navigation'
import TopicCards from './TopicCards.vue'

const props = defineProps<{ topic: string }>()
const topic = importedTopics.find(entry => entry.slug === props.topic)
if (!topic) throw new Error(`Unknown topic: ${props.topic}`)

const chapters = chapterLinks(topic)
const featured = featuredChapters(topic)
</script>

<template>
  <a href="#完整目录">查看完整目录</a>
  <TopicCards :cards="featured" />
  <h2 id="完整目录">完整目录</h2>
  <ul>
    <li v-for="chapter in chapters" :key="chapter.href">
      <a :href="withBase(chapter.href)">{{ chapter.title }}</a>
    </li>
  </ul>
</template>
