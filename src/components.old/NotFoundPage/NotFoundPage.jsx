import React from 'react'
import { withRouter } from 'react-router-dom'
import Action from 'components/Action'
import Logo from 'components/Logo'
import HelmetMeta from 'components/HelmetMeta'
import Page from 'components/Page'
import className from './NotFoundPage.style'

const NotFoundPage = ({ history }) => {
  const handleNavigateHome = React.useCallback(() => {
    history.push('/')
  }, [history])

  return (
    <>
      <HelmetMeta title="Page not found" />
      <Page className={className}>
        <Logo className="__logo" />
        <br />
        <p>
          Dang. There isn't a page here.
          <br />
          <br />
          Double-check the url or head back to the{' '}
          <Action onClick={handleNavigateHome}>home page</Action>.
        </p>
      </Page>
    </>
  )
}

export default withRouter(NotFoundPage)
