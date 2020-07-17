import React from 'react'
import Logo from 'components/Logo'
import Button from 'components/Button'
import Page from 'components/Page'
import rootClassName from './LogInPage.style'

const LogInPage = ({ onStartLogIn }) => {
  return (
    <Page className={rootClassName}>
      <Logo />
      <br />
      <Button onClick={onStartLogIn} text="Sign in with Google" />
    </Page>
  )
}

LogInPage.displayName = 'LogInPage'

export default LogInPage
