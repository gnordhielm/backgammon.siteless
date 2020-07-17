const MAX_CARDS = 7

const getVotesTotal = ({ votes = {} }) => {
  let total = 0
  for (let voteCount of Object.values(votes)) total += voteCount
  return total
}

const sortByVoteTotal = (a, b) => {
  return getVotesTotal(b) - getVotesTotal(a)
}

const sortByUniqueUsers = (a, b) => {
  const getUniqueUsers = ({ votes = {} }) => Object.keys(votes).length

  return getUniqueUsers(b) - getUniqueUsers(a)
}

const sortByCreatedAt = (a, b) => a.createdAt.seconds - b.createdAt.seconds

const ORDERED_SORTERS = [sortByVoteTotal, sortByUniqueUsers, sortByCreatedAt]

const getCardsInScope = cards => {
  let result = Object.entries(cards)
    .slice()
    .sort((a, b) => {
      for (const sorter of ORDERED_SORTERS) {
        const result = sorter(a[1], b[1])
        if (result !== 0) return result
      }
      return 0
    })

  result = result.filter(([key, card]) => !!getVotesTotal(card))

  result = result.slice(0, MAX_CARDS)

  result = result.map(([key]) => key)

  return result
}

export default getCardsInScope
