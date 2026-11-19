import { createContentLoader } from 'vitepress'
import algorithms from './algorithms.json'
import { isPlatform, platformNames, type Platform } from './problem-platforms'

export interface Problem {
  title: string
  url: string
  platform: Platform
  problemId: string
  problemUrl: string
  algorithms: string[]
  contest?: string
  solutionStatus: 'collected' | 'written'
}

declare const data: Problem[]
export { data }

const algorithmIds = new Set(algorithms.map(({ id }) => id))
const indexUrls = new Set([
  '/algo/problems/',
  ...Object.keys(platformNames).map(platform => `/algo/problems/${platform}/`)
])

export default createContentLoader('algo/problems/**/*.md', {
  transform(pages): Problem[] {
    const seen = new Map<string, string>()
    const problems: Problem[] = []

    for (const { url, frontmatter } of pages) {
      if (indexUrls.has(url)) continue

      const fail = (message: string): never => {
        throw new Error(`题目页 ${url}：${message}`)
      }
      const requiredText = (field: string, value: unknown): string => {
        if (typeof value !== 'string' || !value.trim()) {
          return fail(`${field} 必须是非空字符串`)
        }
        return value.trim()
      }

      const {
        title,
        platform,
        problem_id,
        problem_url,
        algorithms: tags,
        contest,
        solution_status
      } = frontmatter
      if (!isPlatform(platform)) fail('platform 必须是 atcoder、codeforces 或 leetcode')
      if (!url.startsWith(`/algo/problems/${platform}/`)) {
        fail('题目页必须放在对应的来源目录下')
      }

      const officialId = Number.isSafeInteger(problem_id)
        ? String(problem_id)
        : requiredText('problem_id', problem_id)
      const originalUrl = requiredText('problem_url', problem_url)
      if (!URL.canParse(originalUrl) || new URL(originalUrl).protocol !== 'https:') {
        fail('problem_url 必须是绝对 HTTPS 链接')
      }
      if (!Array.isArray(tags) || tags.some(tag => !algorithmIds.has(tag))) {
        fail('algorithms 必须是共享词表中的算法 ID 列表，待标注请填写 []')
      }
      if (new Set(tags).size !== tags.length) fail('algorithms 中有重复的算法 ID')
      if (solution_status !== 'collected' && solution_status !== 'written') {
        fail('solution_status 必须是 collected 或 written')
      }

      const key = `${platform}/${officialId.normalize('NFKC').toLowerCase()}`
      const duplicate = seen.get(key)
      if (duplicate) fail(`${officialId} 已收录于 ${duplicate}`)
      seen.set(key, url)

      problems.push({
        title: requiredText('title', title),
        url,
        platform,
        problemId: officialId,
        problemUrl: originalUrl,
        algorithms: tags,
        contest: contest === undefined ? undefined : requiredText('contest', contest),
        solutionStatus: solution_status
      })
    }

    const order = new Intl.Collator('en', { numeric: true })
    return problems.sort((a, b) =>
      order.compare(a.platform, b.platform) || order.compare(a.problemId, b.problemId)
    )
  }
})
