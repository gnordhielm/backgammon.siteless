import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import rootClassName, { TRANSITION_DURATION } from './style'
import { withRouter, Route, Switch } from 'react-router-dom'
import routes from 'config/routes'

import NotFoundPage from 'components/NotFoundPage'
import PrivateRoute from 'components/PrivateRoute'

const AppRoutes = ({ location }) => {
  const renderedRoutes = React.useMemo(
    () =>
      routes.map(({ isPrivate, path, exact, Component }, index) => {
        const RouteComponent = isPrivate ? PrivateRoute : Route
        return (
          <RouteComponent
            key={index}
            path={path}
            exact={exact}
            component={Component}
          />
        )
      }),
    [],
  )

  return (
    <div className={rootClassName}>
      <TransitionGroup className="__transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: TRANSITION_DURATION, exit: TRANSITION_DURATION }}
          classNames="--fade"
        >
          <div className="__route-switch">
            <Switch location={location}>
              {renderedRoutes}
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default withRouter(AppRoutes)
