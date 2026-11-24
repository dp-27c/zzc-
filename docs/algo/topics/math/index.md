---
aside: false
---

<script setup lang="ts">
import { withBase } from 'vitepress'
import { mathChapterPath, mathSections, mathSectionPath } from '../../../.vitepress/math-topics'

const sections = mathSections.map(section => ({
  title: section.title,
  href: mathSectionPath(section.id),
  featured: section.chapters.flatMap(chapter => chapter.slug && chapter.featured
    ? [{ title: chapter.featured, href: mathChapterPath(section.id, chapter.slug) }]
    : [])
}))
</script>

# 数学

<div class="math-overview">
  <section v-for="section in sections" :key="section.href" class="math-card">
    <header class="math-card-header">
      <h2>{{ section.title }}</h2>
      <a class="math-all" :href="withBase(section.href)" :aria-label="'查看全部 · ' + section.title">查看全部</a>
    </header>
    <div class="math-featured">
      <a v-for="chapter in section.featured" :key="chapter.href" :href="withBase(chapter.href)">{{ chapter.title }}</a>
    </div>
  </section>
</div>

<style scoped>
.math-overview {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-block: 22px 32px;
}

.math-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.math-card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 12px;
}

.math-card-header h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 18px;
  line-height: 1.45;
}

.math-card .math-all {
  font-size: 13px;
  text-decoration: none;
}

.math-featured {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
}

.math-featured a {
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

.math-card a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .math-overview {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
