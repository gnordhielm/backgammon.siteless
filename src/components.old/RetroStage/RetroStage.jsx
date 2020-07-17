import React from 'react'
import useDocument from 'hooks/useDocument'
import Loader from 'components/Loader'
import rootClassName from './RetroStage.style'
import Page from '../Page'
import Button from '../Button'
import RetroMembers from '../RetroMembers/RetroMembers'
import RetroInvite from '../RetroInvite/RetroInvite'
import { RETRO_PHASES } from 'config/constants'
import { setRetroPhase } from 'services/retro'

const RetroStage = ({ retro, isOwner }) => {
  const createdByUserPath = React.useMemo(() => {
    if (!retro) return null
    return 'users/' + retro.createdByUserId
  }, [retro])

  const handleOpen = React.useCallback(() => {
    setRetroPhase({
      retroId: retro.id,
      phase: RETRO_PHASES.collect.key,
    })
  }, [retro.id])

  const createdByUser = useDocument(createdByUserPath)

  const renderedBody = React.useMemo(() => {
    if (!(createdByUser && retro)) return <Loader />

    if (isOwner)
      return (
        <>
          <Button onClick={handleOpen}>Open retro</Button>
          <br />
          <p className="_instructions">
            Opening the retro will allow members to start adding cards.
          </p>
        </>
      )

    return <div>Waiting for {createdByUser.handle} to begin the retro.</div>
  }, [isOwner, createdByUser, retro, handleOpen])

  return (
    <>
      <Page.Bar className={rootClassName.bar}>
        <RetroMembers
          isOwner={isOwner}
          memberUserIds={retro.memberUserIds}
          createdByUserId={retro.createdByUserId}
        />
        {isOwner && <RetroInvite retro={retro} className="__invite" />}
      </Page.Bar>
      <Page.Fill className={rootClassName.fill}>{renderedBody}</Page.Fill>
    </>
  )
}

export default RetroStage
