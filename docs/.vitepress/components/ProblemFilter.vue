<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import algorithms from '../algorithms.json'
import { platformNames, type Platform } from '../problem-platforms'
import { sampleNotice } from '../problem-sample'
import { data as problems } from '../problems.data'
import SampleBadge from './SampleBadge.vue'

const props = defineProps<{ initialPlatform?: Platform }>()

const problemSearch = ref('')
const algorithmSearch = ref('')
const platform = ref<Platform | ''>(props.initialPlatform ?? '')
const selectedAlgorithms = ref<string[]>([])
const algorithmNames = new Map(algorithms.map(({ id, name }) => [id, name]))
const statusNames = { collected: '已收录', written: '已有题解' }

watch(() => props.initialPlatform, value => {
  platform.value = value ?? ''
})

function searchKey(value: string) {
  return value.normalize('NFKC').toLowerCase().replace(/[\s_-]+/g, '')
}

const matchingAlgorithms = computed(() => {
  const query = searchKey(algorithmSearch.value)
  return algorithms.filter(({ id, name, aliases }) =>
    [id, name, ...aliases].some(value => searchKey(value).includes(query))
  )
})

const algorithmOptions = computed(() =>
  algorithms.filter(algorithm =>
    matchingAlgorithms.value.includes(algorithm) || selectedAlgorithms.value.includes(algorithm.id)
  )
)

const results = computed(() => {
  const query = searchKey(problemSearch.value)
  return problems.filter(problem =>
    (!platform.value || problem.platform === platform.value) &&
    [problem.title, problem.problemId].some(value => searchKey(value).includes(query)) &&
    selectedAlgorithms.value.every(id => problem.algorithms.includes(id))
  )
})

const showsSampleProblems = computed(() => results.value.some(problem => problem.sample))
</script>

<template>
  <section class="problem-filter" aria-label="题库筛选">
    <div class="filters">
      <label>
        题名或题号
        <input id="problem-search" v-model="problemSearch" type="search" placeholder="例如 ABC177 D" />
      </label>
      <label>
        来源
        <select id="problem-platform" v-model="platform">
          <option value="">全部来源</option>
          <option v-for="(name, id) in platformNames" :key="id" :value="id">{{ name }}</option>
        </select>
      </label>
    </div>
    <fieldset class="algorithm-filter">
      <legend>算法</legend>
      <label for="algorithm-search">按名称或别名查找标签</label>
      <input id="algorithm-search" v-model="algorithmSearch" type="search" placeholder="例如 DSU 或 Union Find" />
      <div class="algorithm-options">
        <label v-for="algorithm in algorithmOptions" :key="algorithm.id" class="algorithm-option">
          <input v-model="selectedAlgorithms" type="checkbox" :value="algorithm.id" />
          {{ algorithm.name }}
        </label>
      </div>
      <p v-if="!matchingAlgorithms.length" class="algorithm-hint">没有匹配的算法名称。</p>
      <p class="algorithm-hint">题目须包含所有选中的算法标签。</p>
    </fieldset>

    <p v-if="showsSampleProblems" class="problem-sample-notice">{{ sampleNotice }}</p>
    <p class="result-count" role="status">共 {{ results.length }} 道题</p>
    <table v-if="results.length" class="problem-results">
      <thead>
        <tr>
          <th scope="col">题目</th>
          <th scope="col">来源</th>
          <th scope="col">算法</th>
          <th scope="col">题解状态</th>
          <th scope="col">原题</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="problem in results" :key="problem.url">
          <td>
            <a :href="withBase(problem.url)">{{ problem.title }}</a>
            <SampleBadge v-if="problem.sample" class="problem-title-badge" />
            <span class="problem-id">{{ problem.problemId }}</span>
          </td>
          <td>
            {{ platformNames[problem.platform] }}
            <small v-if="problem.contest">{{ problem.contest }}</small>
          </td>
          <td>{{ problem.algorithms.map(id => algorithmNames.get(id)).join('、') || '待标注' }}</td>
          <td>{{ statusNames[problem.solutionStatus] }}</td>
          <td><a :href="problem.problemUrl" :aria-label="`${problem.title}的原题`">原题</a></td>
        </tr>
      </tbody>
    </table>
    <p v-else>没有符合当前条件的题目。</p>
  </section>
</template>

<style scoped>
.problem-filter {
  margin: 24px 0;
}

.filters {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 16px;
}

.filters label,
.algorithm-filter > label {
  display: block;
  font-size: 14px;
  font-weight: 600;
}

.filters input,
.filters select,
.algorithm-filter input[type='search'] {
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.problem-filter :is(input, select):focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.algorithm-filter {
  margin: 20px 0;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.algorithm-filter legend {
  padding: 0 6px;
  font-weight: 600;
}

.algorithm-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.algorithm-option {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.algorithm-option input {
  appearance: auto;
  accent-color: var(--vp-c-brand-1);
}

.problem-filter .algorithm-hint,
.problem-filter .result-count {
  margin: 8px 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.problem-filter .problem-sample-notice {
  margin: 16px 0 8px;
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--vp-c-default-soft);
  font-size: 14px;
}

.problem-title-badge {
  margin-inline-start: 6px;
}

.problem-results {
  margin-top: 8px;
}

.problem-results td:first-child {
  min-width: 11rem;
}

.problem-results :is(td, th):last-child {
  white-space: nowrap;
}

.problem-id,
.problem-results small {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 12px;
}
</style>
