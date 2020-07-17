import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import HelmetMeta from 'components/HelmetMeta'
import makeMetaPropsFromLink from 'util/makeMetaPropsFromLink'

const SsrApp = ({ linkData, helmetContext, pathname }) => {
  const metaProps = React.useMemo(
    () => ({
      ...makeMetaPropsFromLink(linkData),
      pathname,
    }),
    [linkData, pathname],
  )

  return (
    <HelmetProvider context={helmetContext}>
      <HelmetMeta {...metaProps} />
    </HelmetProvider>
  )
}

export default SsrApp
