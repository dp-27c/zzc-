<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as directory } from '../../.vitepress/template-directory.data'
</script>

# 模板

<ul class="template-directory">
  <li v-for="grade in directory" :key="grade.href">
    <a class="template-grade" :href="withBase(grade.href)">{{ grade.title }}</a>
    <ul v-if="grade.categories.length">
      <li v-for="category in grade.categories" :key="category.href">
        <a class="template-category" :href="withBase(category.href)"><span v-html="category.html"></span>（{{ grade.letter }}）</a>
        <ul v-if="category.entries.length">
          <li v-for="entry in category.entries" :key="entry.href">
            <a :href="withBase(entry.href)" v-html="entry.html"></a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<style scoped>
.template-directory > li + li {
  margin-top: 24px;
}

.template-grade {
  font-size: 1.125rem;
  font-weight: 700;
}

.template-category {
  font-weight: 600;
}
</style>
