import React from 'react'
import AuthContext from 'contexts/Auth'
import LogInPage from 'containers/LogInPage'
import CompleteProfilePage from 'containers/CompleteProfilePage'

const AuthWrapper = ({ children }) => {
  const { user, onStartLogIn } = React.useContext(AuthContext)

  const renderedChildren = React.useMemo(() => {
    if (!user) return null
    return children()
  }, [children, user])

  if (user === null) return <LogInPage onStartLogIn={onStartLogIn} />

  if (!user.hasUpdatedProfileOnce) return <CompleteProfilePage />

  return renderedChildren
}

export default AuthWrapper
