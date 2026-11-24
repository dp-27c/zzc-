import { stringNotesSidebar } from './string-notes'

const categories = [stringNotesSidebar]

export const algorithmLearningSidebar = {
  text: '算法学习',
  link: '/notes/algorithm/',
  items: categories
}

export const algorithmLearningCards = categories.map(({ text, link, items }) => ({
  title: text,
  href: link,
  featured: items.map(chapter => ({ title: chapter.text, href: chapter.link }))
}))
