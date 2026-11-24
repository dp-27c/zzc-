import { fileURLToPath } from 'node:url'
import { createContentLoader, createMarkdownRenderer } from 'vitepress'
import config from './config'

type HeadingLink = {
  html: string
  href: string
}

type Grade = {
  title: string
  href: string
  letter: string
  categories: (HeadingLink & { entries: HeadingLink[] })[]
}

export declare const data: Grade[]

const sourceRoot = new URL('../', import.meta.url)
const titleTokens = new Set(['text', 'code_inline', 'math_inline', 'emoji', 'softbreak'])

export default createContentLoader('algo/templates/[a-e]-level.md', {
  includeSrc: true,
  async transform(pages): Promise<Grade[]> {
    const markdown = await createMarkdownRenderer(fileURLToPath(sourceRoot), config.markdown, config.base)

    return pages.sort((a, b) => a.url.localeCompare(b.url)).map(({ src, url, frontmatter }) => {
      if (!src) throw new Error(`Missing template source for ${url}`)

      const relativePath = url.slice(1).replace(/(?:\.html)?$/, '.md')
      const env = { relativePath, path: fileURLToPath(new URL(relativePath, sourceRoot)) }
      const tokens = markdown.parse(src.replace(/^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, ''), env)
      const categories: Grade['categories'] = []

      for (const [index, token] of tokens.entries()) {
        if (token.type !== 'heading_open' || (token.tag !== 'h2' && token.tag !== 'h3')) continue
        const id = token.attrGet('id')
        if (!id) continue

        const labelTokens = tokens[index + 1].children?.filter(child => titleTokens.has(child.type)) ?? []
        const heading = {
          html: markdown.renderer.renderInline(labelTokens, markdown.options, env).trim(),
          href: `${url}#${encodeURIComponent(id)}`
        }
        if (token.tag === 'h2') categories.push({ ...heading, entries: [] })
        else categories.at(-1)?.entries.push(heading)
      }

      return {
        title: frontmatter.title,
        href: url,
        letter: relativePath.split('/').at(-1)!.charAt(0).toUpperCase(),
        categories
      }
    })
  }
})
