import React from 'react'
import { withRouter } from 'react-router-dom'
import Page from 'components/Page'
import className from './LinkPage.style'
import GlobalToolbar from 'components/GlobalToolbar/GlobalToolbar'
import Loader from 'components/Loader/Loader'
import useDocument from 'hooks/useDocument'
import HelmetMeta from 'components/HelmetMeta'
import makeMetaPropsFromLink from 'util/makeMetaPropsFromLink'
import Button from 'components/Button/Button'
import useUser from 'hooks/useUser'
import { addUserToRetro } from 'services/retro'
import { RETRO_PATH } from 'config/constants'

const titleMap = {
  RETRO_INVITATION: () => 'Join a new retro',
  fallback: () => 'Invalid link',
}

const bodyMap = {
  RETRO_INVITATION: ({ link, user, history }) => {
    const [isJoining, setIsJoining] = React.useState(false)

    const handleJoin = React.useCallback(async () => {
      setIsJoining(true)
      await addUserToRetro({ retroId: link.retroId, userId: user.id })
      history.push(RETRO_PATH + '/' + link.retroId)
    }, [user.id, link.retroId, history])

    const retro = useDocument('retros/' + link.retroId)

    React.useLayoutEffect(() => {
      if (((retro || {}).memberUserIds || []).includes(user.id))
        history.push(RETRO_PATH + '/' + link.retroId)
    }, [retro, user.id, link.retroId, history])

    if (isJoining || !retro) return <Loader />

    return (
      <>
        <p>
          <span className="_bright">{link.createdByUserName}</span> has invited
          you to join <span className="_bright">"{link.retroTitle}"</span>.
        </p>
        <Button onClick={handleJoin}>Join</Button>
      </>
    )
  },
  fallback: () =>
    "Hm, that link doesn't appear to be valid. Check with whoever sent it to you to make sure it's correct and recent.",
}

const LinkPage = ({ match, history }) => {
  const { linkId } = match.params

  const user = useUser()
  const path = 'links/' + linkId
  const link = useDocument(path)

  const metaProps = React.useMemo(
    () => ({
      ...(link ? makeMetaPropsFromLink(link) : {}),
      pathname: match.url,
    }),
    [link, match.url],
  )

  const { BodyComponent = Loader, title } = React.useMemo(() => {
    if (!link) return {}

    return {
      BodyComponent: bodyMap[link.type] || bodyMap.fallback,
      title: (titleMap[link.type] || titleMap.fallback)(link),
    }
  }, [link])

  return (
    <>
      <HelmetMeta {...metaProps} />
      <Page className={className}>
        <Page.Bar>
          <GlobalToolbar title={title} />
        </Page.Bar>
        <Page.Fill className="__fill">
          <BodyComponent link={link} user={user} history={history} />
        </Page.Fill>
      </Page>
    </>
  )
}

export default withRouter(LinkPage)
