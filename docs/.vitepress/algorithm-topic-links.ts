import algorithms from './algorithms.json'

const hiddenTopicIds = new Set(['dsu', 'linear-dp', 'prefix-sum'])

export const algorithmTopicLinks = algorithms
  .filter(({ id }) => !hiddenTopicIds.has(id))
  .map(({ id, name }) => ({ text: name, link: `/algo/topics/${id}.html` }))
