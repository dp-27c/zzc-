import { fileURLToPath } from 'node:url'
import { createContentLoader, createMarkdownRenderer } from 'vitepress'
import config from './config'
import { templateSelection, type HeadingSelection } from './template-selection'

type PageLink = {
  title: string
  href: string
}

type HeadingLink = PageLink & { id: string }
type Category = HeadingLink & { entries: HeadingLink[] }
type Overview = {
  cards: (PageLink & { topics: (PageLink & { entries: PageLink[] })[] })[]
  rows: (PageLink & { highlights: PageLink[] })[]
}

export declare const data: Overview

const sourceRoot = new URL('../', import.meta.url)
const titleTokens = new Set(['text', 'code_inline', 'math_inline', 'emoji'])

function selectHeading<T extends HeadingLink>(headings: T[], selection: HeadingSelection, url: string): T {
  const heading = headings.find(candidate => candidate.id === selection.id)
  if (!heading) throw new Error(`Template selection not found: ${url}#${selection.id}`)
  return { ...heading, title: selection.label ?? heading.title }
}

export default createContentLoader('algo/templates/[a-e]-level.md', {
  includeSrc: true,
  async transform(pages): Promise<Overview> {
    const markdown = await createMarkdownRenderer(fileURLToPath(sourceRoot), config.markdown, config.base)
    const overview: Overview = { cards: [], rows: [] }

    for (const { src, url, frontmatter } of pages.sort((a, b) => a.url.localeCompare(b.url))) {
      if (!src) throw new Error(`Missing template source for ${url}`)

      const relativePath = url.slice(1).replace(/(?:\.html)?$/, '.md')
      const env = { relativePath, path: fileURLToPath(new URL(relativePath, sourceRoot)) }
      const tokens = markdown.parse(src.replace(/^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, ''), env)
      const categories: Category[] = []

      for (const [index, token] of tokens.entries()) {
        if (token.type !== 'heading_open' || (token.tag !== 'h2' && token.tag !== 'h3')) continue
        const id = token.attrGet('id')
        if (!id) continue

        const labelTokens = tokens[index + 1].children?.filter(child => titleTokens.has(child.type)) ?? []
        const heading = {
          id,
          title: labelTokens.map(child => child.content).join('').trim(),
          href: `${url}#${encodeURIComponent(id)}`
        }
        if (token.tag === 'h2') categories.push({ ...heading, entries: [] })
        else categories.at(-1)?.entries.push(heading)
      }

      const letter = relativePath.split('/').at(-1)!.charAt(0).toUpperCase()
      const selection = templateSelection[letter]
      const page = { title: frontmatter.title, href: url }

      if ('topics' in selection) {
        const topics = selection.topics.map(topic => {
          const { title, href, entries } = selectHeading(categories, topic, url)
          return {
            title,
            href,
            entries: topic.entries.map(entry => selectHeading(entries, entry, url))
          }
        })
        overview.cards.push({ ...page, topics })
      } else {
        const headings = categories.flatMap(category => [category, ...category.entries])
        const highlights = selection.highlights.map(item => selectHeading(headings, item, url))
        overview.rows.push({ ...page, highlights })
      }
    }

    return overview
  }
})
