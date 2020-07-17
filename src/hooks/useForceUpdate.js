import { useState, useCallback } from 'react'

const useForceUpdate = () => {
  const setState = useState(0)[1]
  const forceUpdate = useCallback(() => {
    setState(old => old + 1)
  }, [setState])

  return forceUpdate
}

export default useForceUpdate
