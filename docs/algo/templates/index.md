---
aside: false
---

<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as overview } from '../../.vitepress/template-directory.data'
</script>

# 模板

<div class="template-overview">
  <div class="grade-cards">
    <section v-for="grade in overview.cards" :key="grade.href" class="grade-card">
      <header class="grade-header">
        <h2 class="grade-title">{{ grade.title }}</h2>
        <a :href="withBase(grade.href)" :aria-label="'查看全部 · ' + grade.title" class="grade-all">查看全部</a>
      </header>
      <div v-for="topic in grade.topics" :key="topic.href" class="grade-topic">
        <h3 class="topic-title"><a :href="withBase(topic.href)">{{ topic.title }}</a></h3>
        <div class="topic-links">
          <a v-for="entry in topic.entries" :key="entry.href" :href="withBase(entry.href)" class="template-tag">{{ entry.title }}</a>
        </div>
      </div>
    </section>
  </div>
  <div class="grade-rows">
    <section v-for="grade in overview.rows" :key="grade.href" class="grade-row">
      <h2 class="grade-title">{{ grade.title }}</h2>
      <div class="topic-links">
        <a v-for="entry in grade.highlights" :key="entry.href" :href="withBase(entry.href)" class="template-tag">{{ entry.title }}</a>
      </div>
      <a :href="withBase(grade.href)" :aria-label="'查看全部 · ' + grade.title" class="grade-all">查看全部</a>
    </section>
  </div>
</div>

<style scoped>
.template-overview {
  margin-block: 22px 32px;
  container-type: inline-size;
}

.grade-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: 14px;
}

.grade-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.grade-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 12px;
}

.template-overview .grade-title {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.45;
}

.template-overview .grade-all {
  justify-self: end;
  font-size: 13px;
  text-decoration: none;
  white-space: nowrap;
}

.grade-topic {
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
}

.template-overview .topic-title {
  margin: 0 0 6px;
  font-size: 14px;
  line-height: 1.5;
}

.template-overview .topic-title a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: none;
}

.topic-links {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
}

.template-overview .template-tag {
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

.template-overview a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.grade-rows {
  margin-top: 22px;
}

.grade-row {
  display: grid;
  grid-template-columns: 6.25rem minmax(0, 1fr) auto;
  grid-template-areas: 'title links all';
  gap: 8px 16px;
  align-items: center;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 0;
}

.grade-row .grade-title { grid-area: title; }
.grade-row .topic-links { grid-area: links; }
.grade-row .grade-all { grid-area: all; }

@container (max-width: 29rem) {
  .grade-row {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      'title all'
      'links links';
  }
}
</style>
