type Chapter = {
  title: string
  slug?: string
  featured?: string
}

type Section = {
  id: string
  title: string
  chapters: Chapter[]
}

export const mathPath = '/algo/topics/math/'

export const mathSections: Section[] = [
  {
    id: 'code',
    title: '代码模板',
    chapters: [
      { title: '基础代码模板', slug: 'basic' },
      { title: '矩阵快速幂入门（叶版）', slug: 'matrix-power', featured: '矩阵快速幂' },
      { title: '质数', slug: 'primes' },
      { title: '同余', slug: 'congruences' },
      { title: '组合计数', slug: 'combinatorics', featured: '组合计数' },
      { title: '多项式', slug: 'polynomials' },
      { title: '高精度', slug: 'big-integers' },
      { title: '高斯消元', slug: 'gaussian-elimination', featured: '高斯消元' },
      { title: '博弈论', slug: 'game-theory' }
    ]
  },
  {
    id: 'methods',
    title: '思维模板',
    chapters: [
      { title: '二维组合', slug: 'grid-combinatorics' },
      { title: '生成函数的tricks' },
      { title: 'GCD 与质因数', slug: 'gcd-prime-factors', featured: 'GCD 与质因数' },
      { title: '莫比乌斯反演', slug: 'mobius-inversion', featured: '莫比乌斯反演' },
      { title: '缝合怪', slug: 'combined-techniques' },
      { title: '计算几何', slug: 'computational-geometry' },
      { title: '公式化简，双指针处理绝对值', slug: 'absolute-value-two-pointers' },
      { title: '最值贪心法', slug: 'extremal-greedy' },
      { title: 'SG 定理以及函数博弈魅力', slug: 'sg-theorem', featured: 'SG 定理' }
    ]
  },
  {
    id: 'concepts',
    title: '重要概念',
    chapters: [
      { title: '质数' },
      { title: '同余', slug: 'congruence' },
      { title: '组合数学', slug: 'combinatorics', featured: '组合数学' },
      { title: '生成函数', slug: 'generating-functions', featured: '生成函数' },
      { title: '博弈论', slug: 'game-theory', featured: '博弈论' }
    ]
  },
  {
    id: 'formulas',
    title: '重要公式',
    chapters: [
      { title: '基础求和', slug: 'basic-sums' },
      { title: '整数除法', slug: 'integer-division' },
      { title: '质数', slug: 'primes' },
      { title: '和式变换：（核武器）', slug: 'sum-transformations', featured: '和式变换' },
      { title: '反演公式', slug: 'inversion', featured: '反演公式' },
      { title: '范德蒙德卷积公式', slug: 'vandermonde' },
      { title: '狄利克雷卷积（开卷！！）', slug: 'dirichlet-convolution', featured: '狄利克雷卷积' },
      { title: '组合计数公式', slug: 'combination-formulas' },
      { title: '已知可以解决的公式化简问题：(需整理)', slug: 'simplification-problems' },
      { title: '二项式类', slug: 'binomial' }
    ]
  }
]

export function mathSectionPath(id: string) {
  return `${mathPath}${id}/`
}

export function mathChapterPath(id: string, slug: string) {
  return `${mathSectionPath(id)}${slug}.html`
}

export const mathSidebar = {
  text: '数学',
  link: mathPath,
  items: mathSections.map(section => ({
    text: section.title,
    link: mathSectionPath(section.id),
    items: section.chapters.flatMap(chapter => chapter.slug
      ? [{ text: chapter.title, link: mathChapterPath(section.id, chapter.slug) }]
      : [])
  }))
}
