import { useCallback } from 'react'
import { database } from 'config/firebase'

const useSetDocument = path => {
  const [collectionPath, documentPath] = path.split('/')
  const ref = database.collection(collectionPath).doc(documentPath)

  const setter = useCallback((...args) => ref.set(...args), [ref])

  return setter
}

export default useSetDocument
