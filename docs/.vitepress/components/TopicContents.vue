<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as content } from '../topic-content.data'
import { data as problems } from '../problems.data'

const { page } = useData()

const sections = computed(() => {
  const algorithm = page.value.params?.algorithm

  return [
    { title: '学习笔记', entries: content.notes.filter(entry => entry.algorithms.includes(algorithm)) },
    { title: 'C++ 模板', entries: content.templates.filter(entry => entry.algorithms.includes(algorithm)) },
    { title: '练习题', entries: problems.filter(entry => entry.algorithms.includes(algorithm)) }
  ]
})
</script>

<template>
  <section v-for="{ title, entries } in sections" :key="title">
    <h2>{{ title }}</h2>
    <ul v-if="entries.length">
      <li v-for="entry in entries" :key="entry.url">
        <a :href="withBase(entry.url)">{{ entry.title }}</a>
      </li>
    </ul>
    <p v-else>暂无收录。</p>
  </section>
</template>
