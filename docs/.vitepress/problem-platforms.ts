export const platformNames = {
  atcoder: 'AtCoder',
  codeforces: 'Codeforces',
  leetcode: 'LeetCode'
} as const

export type Platform = keyof typeof platformNames

export function isPlatform(value: unknown): value is Platform {
  return typeof value === 'string' && Object.hasOwn(platformNames, value)
}
