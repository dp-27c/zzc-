<script setup lang="ts">
import { withBase } from 'vitepress'

type CardLink = {
  title: string
  href: string
}

defineProps<{
  cards: (CardLink & { action?: string; featured?: CardLink[] })[]
}>()
</script>

<template>
  <div class="topic-cards">
    <section v-for="card in cards" :key="card.href" class="topic-card">
      <header class="topic-card-header">
        <h2>
          <template v-if="card.action">{{ card.title }}</template>
          <a v-else :href="withBase(card.href)">{{ card.title }}</a>
        </h2>
        <a
          v-if="card.action"
          class="topic-card-action"
          :href="withBase(card.href)"
          :aria-label="card.action + ' · ' + card.title"
        >{{ card.action }}</a>
      </header>
      <div v-if="card.featured?.length" class="topic-card-featured">
        <a v-for="link in card.featured" :key="link.href" :href="withBase(link.href)">{{ link.title }}</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.topic-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-block: 22px 32px;
}

.topic-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.topic-card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 12px;
}

.topic-card-header h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 18px;
  line-height: 1.45;
}

.topic-card-header h2 a {
  color: var(--vp-c-text-1);
  font-weight: inherit;
  text-decoration: none;
}

.topic-card .topic-card-action {
  font-size: 13px;
  text-decoration: none;
}

.topic-card-featured {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
}

.topic-card-featured a {
  max-width: 100%;
  padding: 3px 8px;
  border-radius: 5px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 13px;
  line-height: 1.5;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.topic-card a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .topic-cards {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
