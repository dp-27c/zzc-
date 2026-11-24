<script setup>
import { withBase } from 'vitepress'
import { algorithmTopicLinks } from '../../.vitepress/algorithm-topic-links'
</script>

# 专题

[数学](./math/index.md)

<ul v-if="algorithmTopicLinks.length">
  <li v-for="{ text, link } in algorithmTopicLinks" :key="link">
    <a :href="withBase(link)">{{ text }}</a>
  </li>
</ul>
