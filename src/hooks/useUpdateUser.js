import { useContext } from 'react'
import AuthContext from 'contexts/Auth'

const useUpdateUser = () => {
  const { updateUser } = useContext(AuthContext)
  return updateUser
}

export default useUpdateUser
