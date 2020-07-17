import React from 'react'
import useConfig from 'hooks/useConfig'
import Loader from 'components/Loader'
import useUser from 'hooks/useUser'
import useCollection from 'hooks/useCollection'
import rootClassName from './RetroReview.style'
import { COLUMN_COLOR_MAP, COLUMN_NAME_MAP, COLUMN_CLASS_NAMES } from 'style'
import { RETRO_PHASES } from 'config/constants'
import RetroCard from 'components/RetroCard'
import FadingScrollList from 'components/FadingScrollList'
import { setRetroPhase } from 'services/retro'
import { makeClassName } from '@scriptless/util'
import Page from '../Page/Page'
import RetroMembers from '../RetroMembers/RetroMembers'
import RetroInvite from '../RetroInvite/RetroInvite'
import Button from '../Button/Button'

const RetroReview = ({ retro, isOwner }) => {
  const config = useConfig()
  const user = useUser()

  // all cards

  const rawCards = useCollection(`retros/${retro.id}/cards`)
  const resolvedCards = React.useMemo(() => {
    const result = {}
    for (let key in rawCards) {
      const card = rawCards[key]
      if (!result[card.columnId]) result[card.columnId] = []

      result[card.columnId].push({
        key,
        ...card,
      })
    }
    for (let key in result)
      result[key].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
    return result
  }, [rawCards])

  // merge cards

  const [mergeCardId, setMergeCardId] = React.useState()

  // scrolling

  const [activeColumn, setActiveColumn] = React.useState()

  React.useEffect(() => {
    if (config && !activeColumn) setActiveColumn(config.columns[0].id)
  }, [config, activeColumn])

  // next phase

  const nextPhase = React.useMemo(() => {
    const phaseIndex = Object.keys(RETRO_PHASES).findIndex(
      key => key === retro.phase,
    )
    if (!~phaseIndex) return null

    const nextPhase = Object.values(RETRO_PHASES)[phaseIndex + 1]
    if (!nextPhase) return null

    return nextPhase
  }, [retro.phase])

  const handleAdvance = React.useCallback(() => {
    if (!nextPhase) return
    setRetroPhase({
      retroId: retro.id,
      phase: nextPhase.key,
    })
  }, [nextPhase, retro.id])

  // loading

  const hasNotLoaded = !config || !user || !rawCards

  if (hasNotLoaded) return <Loader />

  return (
    <>
      <Page.Bar className={rootClassName.bar}>
        <div className="__stage">
          <div>
            <span className="_bright">Review</span>{' '}
            <span>and organize cards.</span>
            {isOwner && (
              <>
                &emsp;
                <Button onClick={handleAdvance}>Next</Button>
              </>
            )}
          </div>
        </div>
        <div className="__spacer"></div>
        <RetroMembers
          isOwner={isOwner}
          memberUserIds={retro.memberUserIds}
          createdByUserId={retro.createdByUserId}
        />
        {isOwner && <RetroInvite retro={retro} className="__invite" />}
      </Page.Bar>
      <Page.Fill className={rootClassName.fill}>
        {config.columns.map(({ id }) => (
          <div
            key={id}
            className={makeClassName('__column', COLUMN_CLASS_NAMES[id])}
            onClick={() => {
              setActiveColumn(id)
            }}
          >
            <div className="__cards">
              {resolvedCards[id] ? (
                <FadingScrollList
                  className="__list-container"
                  padding={25}
                  items={resolvedCards[id]}
                  indicator={
                    <div
                      className="_indicator"
                      style={{ background: COLUMN_COLOR_MAP[id] }}
                    />
                  }
                >
                  {({ item }) => (
                    <RetroCard
                      className="_card"
                      retroId={retro.id}
                      id={item.key}
                      phase={RETRO_PHASES.review.key}
                      isOwner={isOwner}
                      onSetMergeCardId={setMergeCardId}
                      mergeCardId={mergeCardId}
                      {...item}
                    />
                  )}
                </FadingScrollList>
              ) : (
                `No ${COLUMN_NAME_MAP[id]} cards.`
              )}
            </div>
          </div>
        ))}
      </Page.Fill>
    </>
  )
}

export default RetroReview
