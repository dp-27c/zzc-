const stringsPath = '/notes/algorithm/strings/'

const chapters = [
  {
    slug: 'prefix-kmp',
    title: '前缀数组与 KMP',
    featured: [
      { title: '前缀函数', anchor: '前缀函数' },
      { title: 'KMP 算法', anchor: 'kmp-算法' }
    ]
  },
  {
    slug: 'manacher',
    title: '回文半径与 Manacher',
    featured: [{ title: 'Manacher', anchor: 'manacher' }]
  },
  {
    slug: 'z-function',
    title: 'Z 数组（E 数组）',
    featured: [
      { title: 'Z 函数讲解', anchor: '讲解' },
      { title: 'Z 数组模板', anchor: 'code-模板' }
    ]
  },
  {
    slug: 'trie-ac',
    title: '字典树与 AC 自动机',
    featured: [
      { title: '构建字典树', anchor: '构建字典树-模板' },
      { title: '统计词频模板', anchor: '模板-统计词频数' }
    ]
  }
]

export const stringNoteCards = chapters.map(({ slug, title, featured }) => {
  const href = `${stringsPath}${slug}.html`
  return {
    title,
    href,
    featured: featured.map(link => ({
      title: link.title,
      href: `${href}#${encodeURIComponent(link.anchor)}`
    }))
  }
})

export const stringNotesSidebar = {
  text: '字符串',
  link: stringsPath,
  items: stringNoteCards.map(({ title, href }) => ({ text: title, link: href }))
}
