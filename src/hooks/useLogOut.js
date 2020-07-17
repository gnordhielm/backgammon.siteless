import { useContext } from 'react'
import AuthContext from 'contexts/Auth'

const useLogOut = () => {
  const { logOut } = useContext(AuthContext)
  return logOut
}

export default useLogOut
