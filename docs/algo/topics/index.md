<script setup>
import { withBase } from 'vitepress'
import algorithms from '../../.vitepress/algorithms.json'
</script>

# 专题

[数学](./math/index.md)

<ul>
  <li v-for="{ id, name } in algorithms" :key="id">
    <a :href="withBase('/algo/topics/' + id + '.html')">{{ name }}</a>
  </li>
</ul>
