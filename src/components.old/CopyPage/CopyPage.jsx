import React from 'react'
import ReactMarkdown from 'react-markdown'
import Page from 'components/Page'
import Loader from 'components/Loader'
import Logo from 'components/Logo'
import rootClassName from './CopyPage.style'

const CopyPage = ({ copy }) => {
  const [source, setSource] = React.useState()

  React.useEffect(() => {
    let canceled = false

    fetch(copy)
      .then(response => response.text())
      .then(text => {
        if (!canceled) setSource(text)
      })

    return () => {
      canceled = true
    }
  }, [copy])

  if (!source) return <Loader />

  return (
    <Page className={rootClassName}>
      <Logo className="__logo" />
      <ReactMarkdown className="__copy" source={source} />
    </Page>
  )
}

CopyPage.displayName = 'CopyPage'

export default CopyPage
