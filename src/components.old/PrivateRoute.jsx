import React from 'react'
import { Route } from 'react-router-dom'
import AuthWrapper from 'components/AuthWrapper'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <AuthWrapper>{() => <Component {...props} />}</AuthWrapper>
      )}
    />
  )
}

export default PrivateRoute
