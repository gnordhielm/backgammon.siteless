import { useState, useEffect } from 'react'
import { database } from 'config/firebase'

const useQuery = ({ collection, query }) => {
  const [results, setResults] = useState(null)

  useEffect(() => {
    if (query === null) {
      setResults(null)
      return
    }

    const unsubscribe = database
      .collection(collection)
      .where(...query)
      .onSnapshot(querySnapshot => {
        const result = []
        querySnapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setResults(result)
      })

    return unsubscribe
  }, [query, collection, setResults])

  return results
}

export default useQuery
