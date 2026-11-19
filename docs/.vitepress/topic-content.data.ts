import { createContentLoader } from 'vitepress'
import vocabulary from './algorithms.json'

type TopicEntry = {
  title: string
  url: string
  algorithms: string[]
}

export declare const data: {
  notes: TopicEntry[]
  templates: TopicEntry[]
}

const algorithmIds = new Set(vocabulary.map(({ id }) => id))

export default createContentLoader(
  ['notes/algorithm/**/*.md', 'algo/templates/**/*.md'],
  {
    transform(pages) {
      const notes: TopicEntry[] = []
      const templates: TopicEntry[] = []

      for (const { url, frontmatter } of pages) {
        if (url.endsWith('/')) continue

        const { title, algorithms } = frontmatter
        if (typeof title !== 'string' || !title.trim()) {
          throw new Error(`${url}：请填写 title。`)
        }
        if (!Array.isArray(algorithms) || algorithms.some(id => !algorithmIds.has(id))) {
          throw new Error(`${url}：algorithms 必须是共享词表中的算法 ID 列表。`)
        }

        const entries = url.startsWith('/notes/') ? notes : templates
        entries.push({ title, url, algorithms })
      }

      return { notes, templates }
    }
  }
)
