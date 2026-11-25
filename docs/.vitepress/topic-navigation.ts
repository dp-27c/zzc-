import { algorithmTopicLinks } from './algorithm-topic-links'
import { mathSidebar } from './math-topics'

type Chapter = {
  slug: string
  title: string
  featured?: string
}

type Topic = {
  slug: string
  title: string
  chapters: Chapter[]
}

export const importedTopics: Topic[] = [
  {
    slug: 'geometry',
    title: '计算几何',
    chapters: [
      { slug: 'basics', title: '基础工具' },
      { slug: 'distances', title: '距离', featured: '距离' },
      { slug: 'points-lines', title: '点线关系' },
      { slug: 'circles', title: '圆关系' },
      { slug: 'polygon-circle-area', title: '三角剖分，计算多边形和圆的面积' },
      { slug: 'convex-hull', title: '求凸包，Andrew 算法', featured: '凸包与 Andrew 算法' },
      { slug: 'rotating-calipers', title: '旋转卡壳', featured: '旋转卡壳' },
      { slug: 'closest-pair', title: '计算几何分治求平面最近点对', featured: '平面最近点对' }
    ]
  },
  {
    slug: 'mixed',
    title: '综合',
    chapters: [
      { slug: 'code-board', title: '代码板' },
      { slug: 'miscellaneous', title: '杂项板' },
      { slug: 'strings', title: '字符串', featured: '字符串' },
      { slug: 'disjoint-set-union', title: '并查集' },
      { slug: 'fenwick-tree', title: '树状数组', featured: '树状数组' },
      { slug: 'bitset', title: 'bitset' },
      { slug: 'dp-optimization', title: 'DP 优化', featured: 'DP 优化' },
      { slug: 'dynamic-programming', title: 'DP' },
      { slug: 'mo', title: '莫队', featured: '莫队' }
    ]
  },
  {
    slug: 'tricks',
    title: '总trick',
    chapters: [
      { slug: 'mathematics', title: '数学', featured: '数论与组合技巧' },
      { slug: 'computational-geometry', title: '计算几何' },
      { slug: 'construction', title: '构造', featured: '构造' },
      { slug: 'binary-techniques', title: '二进制常用技巧总结', featured: '二进制常用技巧' },
      { slug: 'miscellany', title: '杂论' },
      { slug: 'interval-maintenance', title: '区间维护', featured: '区间维护' },
      { slug: 'binary-operation-identities', title: '二进制加减与异或关系' },
      { slug: 'number-relationships', title: '数与数的关系' }
    ]
  }
]

function topicPath(topic: Topic) {
  return `/algo/topics/${topic.slug}/`
}

export function chapterLinks(topic: Topic) {
  return topic.chapters.map(chapter => ({
    title: chapter.title,
    href: `${topicPath(topic)}${chapter.slug}.html`,
    featured: chapter.featured
  }))
}

export function featuredChapters(topic: Topic) {
  return chapterLinks(topic).flatMap(chapter => chapter.featured
    ? [{ title: chapter.featured, href: chapter.href }]
    : [])
}

export const topicSidebar = [
  mathSidebar,
  ...importedTopics.map(topic => ({
    text: topic.title,
    link: topicPath(topic),
    items: chapterLinks(topic).map(chapter => ({ text: chapter.title, link: chapter.href }))
  })),
  ...algorithmTopicLinks
]

export const topicCards = [
  {
    title: mathSidebar.text,
    href: mathSidebar.link,
    featured: mathSidebar.items.map(section => ({ title: section.text, href: section.link }))
  },
  ...importedTopics.map(topic => ({
    title: topic.title,
    href: topicPath(topic),
    featured: featuredChapters(topic)
  })),
  ...algorithmTopicLinks.map(({ text, link }) => ({ title: text, href: link }))
]
