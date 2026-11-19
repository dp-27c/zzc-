import algorithms from '../../.vitepress/algorithms.json'

export default {
  paths() {
    return algorithms.map(({ id, name }) => ({
      params: { algorithm: id },
      content: `# ${name}`
    }))
  }
}
