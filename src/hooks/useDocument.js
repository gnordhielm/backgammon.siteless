import { useState, useEffect } from 'react'
import { database } from 'config/firebase'

const useDocument = path => {
  const [document, setDocument] = useState(null)

  useEffect(() => {
    if (path === null) {
      setDocument(null)
      return
    }

    const unsubscribe = database.doc(path).onSnapshot(doc => {
      setDocument({ id: doc.id, ...doc.data() })
    })

    return unsubscribe
  }, [path, setDocument])

  return document
}

export default useDocument
