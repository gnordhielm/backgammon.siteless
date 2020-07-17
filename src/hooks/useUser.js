import { useContext } from 'react'
import AuthContext from 'contexts/Auth'

const useUser = () => {
  const { user } = useContext(AuthContext)
  return user
}

export default useUser
