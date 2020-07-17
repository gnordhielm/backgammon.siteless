import React from 'react'
import { withRouter } from 'react-router-dom'
import AppSafeBack from 'contexts/AppSafeBack'

const AppSafeBackProvider = ({ children, history }) => {
  const historyLengthAtStart = React.useRef(history.length)

  const hasControlledNavigation =
    historyLengthAtStart.current !== history.length

  const appSafeBack = React.useCallback(() => {
    if (hasControlledNavigation) history.goBack()
    else history.push('/')
  }, [hasControlledNavigation, history])

  return (
    <AppSafeBack.Provider value={appSafeBack}>{children}</AppSafeBack.Provider>
  )
}

export default withRouter(AppSafeBackProvider)
