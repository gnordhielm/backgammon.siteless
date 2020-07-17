import React, { useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import useUser from 'hooks/useUser'
import useDocument from 'hooks/useDocument'
import Loader from 'components/Loader'
import EditableText from 'components/EditableText'
import { RETRO_PHASES } from 'config/constants'
import { setRetroTitle } from 'services/retro'

import RetroStage from 'components/RetroStage'
import RetroCollect from 'components/RetroCollect'
import Page from 'components/Page'
import RetroReview from 'components/RetroReview'
import RetroVote from 'components/RetroVote'
import RetroResolve from 'components/RetroResolve'
import RetroComplete from 'components/RetroComplete'

import className from './RetroPage.style'
import HelmetMeta from 'components/HelmetMeta'
import GlobalToolbar from 'components/GlobalToolbar/GlobalToolbar'

const RetroPage = ({ match }) => {
  const { retroId } = match.params
  const user = useUser()
  const path = 'retros/' + retroId
  const retro = useDocument(path)
  const createdByUserPath = useMemo(() => {
    if (!retro) return null
    return 'users/' + retro.createdByUserId
  }, [retro])

  const createdByUser = useDocument(createdByUserPath)

  const handleTitleChange = React.useCallback(
    newTitle => {
      setRetroTitle({ retroId, title: newTitle })
    },
    [retroId],
  )

  if (retro === undefined) return 'Not found.'
  if (retro === null || createdByUser === null) return <Loader />

  const isOwner = user.id === retro.createdByUserId

  const body = (() => {
    switch (retro.phase) {
      case RETRO_PHASES.stage.key:
        return <RetroStage retro={retro} isOwner={isOwner} />
      case RETRO_PHASES.collect.key:
        return <RetroCollect retro={retro} isOwner={isOwner} />
      case RETRO_PHASES.review.key:
        return <RetroReview retro={retro} isOwner={isOwner} />
      case RETRO_PHASES.vote.key:
        return <RetroVote retro={retro} isOwner={isOwner} />
      case RETRO_PHASES.resolve.key:
        return <RetroResolve retro={retro} isOwner={isOwner} />
      case RETRO_PHASES.complete.key:
        return <RetroComplete retro={retro} isOwner={isOwner} />
      default:
        return null
    }
  })()

  const obscureRetro = !isOwner && !retro.memberUserIds.includes(user.id)

  if (obscureRetro)
    return (
      <>
        <Page className={className}>
          <Page.Bar>
            <GlobalToolbar offerBack title="Unknown retro" />
          </Page.Bar>
          <Page.Fill className="_message">
            <p>You aren't a member of this retro.</p>
            <p>Ask the retro owner for a join link to become one.</p>
          </Page.Fill>
        </Page>
      </>
    )

  return (
    <>
      <HelmetMeta title={retro.title} />
      <Page className={className}>
        <Page.Bar>
          <GlobalToolbar
            offerBack
            title={
              isOwner ? (
                <EditableText
                  value={retro.title}
                  onChange={handleTitleChange}
                />
              ) : (
                retro.title
              )
            }
          />
        </Page.Bar>
        {body}
      </Page>
    </>
  )
}

export default withRouter(RetroPage)
