import { useState, useEffect } from 'react'
import { database } from 'config/firebase'

const useCollection = collection => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (collection === null) {
      setResult(null)
      return
    }

    const unsubscribe = database
      .collection(collection)
      .onSnapshot(collectionSnapshot => {
        const result = {}
        collectionSnapshot.forEach(doc => {
          result[doc.id] = doc.data()
        })
        setResult(result)
      })

    return unsubscribe
  }, [collection, setResult])

  return result
}

export default useCollection
