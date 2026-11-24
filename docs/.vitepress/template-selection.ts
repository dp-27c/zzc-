export type HeadingSelection = {
  id: string
  label?: string
}

type TopicSelection = HeadingSelection & { entries: HeadingSelection[] }

type GradeSelection =
  | { topics: TopicSelection[] }
  | { highlights: HeadingSelection[] }

// IDs come from the anchors in the corresponding grade page.
export const templateSelection: Record<string, GradeSelection> = {
  A: {
    topics: [
      {
        id: '数学',
        entries: [
          { id: 'a-001-快速幂', label: '快速幂' },
          { id: 'a-002-gcd-与-exgcd-欧几里得算法', label: 'GCD / exGCD' }
        ]
      },
      {
        id: '数据结构',
        entries: [
          { id: 'a-006-树状数组', label: '树状数组' },
          { id: 'a-007bitset', label: 'bitset' }
        ]
      },
      {
        id: '字符串',
        entries: [
          { id: 'a-008-kmp', label: 'KMP' },
          { id: 'a-010-z函数', label: 'Z 函数' }
        ]
      }
    ]
  },
  B: {
    topics: [
      {
        id: '数据结构',
        entries: [
          { id: 'b-004-线段树上二分', label: '线段树上二分' },
          { id: 'b-005-莫队', label: '莫队' }
        ]
      },
      {
        id: '数学',
        entries: [
          { id: 'b-011-矩阵乘法与矩阵快速幂', label: '矩阵快速幂' },
          { id: 'b-013-lucas-定理', label: 'Lucas 定理' }
        ]
      },
      {
        id: '计算几何',
        entries: [
          { id: 'b-020-求凸包', label: '凸包' },
          { id: 'b-021-旋转卡壳', label: '旋转卡壳' }
        ]
      }
    ]
  },
  C: {
    topics: [
      {
        id: '组合数学',
        entries: [
          { id: '卡特兰数', label: '卡特兰数' },
          { id: '斯特林数', label: '斯特林数' }
        ]
      },
      {
        id: '多项式',
        label: '多项式',
        entries: [
          { id: '二项式反演', label: '二项式反演' },
          { id: '莫比乌斯反演', label: '莫比乌斯反演' }
        ]
      },
      {
        id: '概率-dp-trick-期望、方差与矩递推',
        label: '概率 DP',
        entries: [
          { id: '_1-期望与方差的常用公式', label: '期望与方差' },
          { id: '_2-全期望公式', label: '全期望公式' }
        ]
      }
    ]
  },
  D: {
    highlights: [
      { id: '维护区间数字种类个数', label: '区间种类计数' },
      { id: '不定长区间任务调度', label: '区间任务调度' },
      { id: '相邻异色构造' }
    ]
  },
  E: {
    highlights: [
      { id: 'gcd-trick', label: 'GCD 技巧' },
      { id: '组合数常用公式', label: '组合数公式' },
      { id: '期望尾和公式-trick', label: '期望尾和公式' }
    ]
  }
}
