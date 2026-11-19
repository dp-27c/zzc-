<script setup lang="ts">
import { useData } from 'vitepress'
import SampleBadge from './SampleBadge.vue'
import { sampleNotice } from '../problem-sample'

const { frontmatter } = useData()
</script>

<template>
  <p v-if="frontmatter.sample === true" class="sample-problem-notice">
    <SampleBadge />
    {{ sampleNotice }}
  </p>
</template>

<style scoped>
.sample-problem-notice {
  padding: 10px 14px;
  border-inline-start: 3px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
</style>
