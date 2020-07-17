import React from 'react'
import Page from 'components/Page'
import rootClassName from './ErrorPage.style'
import ErrorIcon from '@material-ui/icons/Error'

const ErrorPage = ({ message, error = {} }) => {
  return (
    <Page className={rootClassName}>
      <ErrorIcon />
      <div className="__message">{message}</div>
      <p className="__error">
        {error.code || 'ERROR'}: {error.message || 'unknown.'}
      </p>
    </Page>
  )
}

ErrorPage.displayName = 'ErrorPage'

export default ErrorPage
