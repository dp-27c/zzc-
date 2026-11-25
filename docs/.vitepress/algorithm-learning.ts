import { stringNotesSidebar } from './string-notes'
import importedNotes from './learning-note-chapters.json'

type Chapter = {
  title: string
  path?: string
  featured?: string
  items?: Chapter[]
}

type LearningCategory = {
  slug: string
  title: string
  chapters: Chapter[]
}

export const learningCategories: LearningCategory[] = importedNotes

const learningPath = '/notes/algorithm/'

export function learningChapterHref(slug: string, path = '') {
  return `${learningPath}${slug}/${path}`
}

type NavigationLink = {
  text: string
  link: string
  items?: NavigationLink[]
}

function chapterNavigation(slug: string, chapters: Chapter[]): NavigationLink[] {
  return chapters.flatMap(chapter => chapter.path
    ? [{
      text: chapter.title,
      link: learningChapterHref(slug, chapter.path),
      items: chapter.items && chapterNavigation(slug, chapter.items)
    }]
    : [])
}

function featuredChapters(slug: string, chapters: Chapter[]): { title: string; href: string }[] {
  return chapters.flatMap(chapter => {
    const own = chapter.path && chapter.featured
      ? [{ title: chapter.featured, href: learningChapterHref(slug, chapter.path) }]
      : []
    return chapter.items ? [...own, ...featuredChapters(slug, chapter.items)] : own
  })
}

export const algorithmLearningSidebar = {
  text: '算法学习',
  link: learningPath,
  items: [
    stringNotesSidebar,
    ...learningCategories.map(category => ({
      text: category.title,
      link: learningChapterHref(category.slug),
      items: chapterNavigation(category.slug, category.chapters)
    }))
  ]
}

export const algorithmLearningCards = [
  {
    title: stringNotesSidebar.text,
    href: stringNotesSidebar.link,
    featured: stringNotesSidebar.items.map(({ text, link }) => ({ title: text, href: link }))
  },
  ...learningCategories.map(category => ({
    title: category.title,
    href: learningChapterHref(category.slug),
    featured: featuredChapters(category.slug, category.chapters)
  }))
]
