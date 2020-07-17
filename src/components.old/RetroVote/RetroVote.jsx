import React from 'react'
import useConfig from 'hooks/useConfig'
import Loader from 'components/Loader'
import useUser from 'hooks/useUser'
import useCollection from 'hooks/useCollection'
import rootClassName from './RetroVote.style'
import { COLUMN_COLOR_MAP, COLUMN_CLASS_NAMES } from 'style'
import { COLUMN_MESSAGE_MAP, RETRO_PHASES } from 'config/constants'
import RetroCard from 'components/RetroCard'
import FadingScrollList from 'components/FadingScrollList'
import { makeClassName, pluralize } from '@scriptless/util'
import Page from '../Page/Page'
import RetroMembers from '../RetroMembers/RetroMembers'
import RetroInvite from '../RetroInvite/RetroInvite'
import Button from '../Button/Button'
import DoneIcon from '@material-ui/icons/Done'
import { setRetroPhase } from 'services/retro'

const RetroVote = ({ retro, isOwner }) => {
  const config = useConfig()

  // scrolling

  const [activeColumn, setActiveColumn] = React.useState()

  React.useEffect(() => {
    if (config && !activeColumn) setActiveColumn(config.columns[0].id)
  }, [config, activeColumn])

  // new card

  const user = useUser()

  const rawCards = useCollection(`retros/${retro.id}/cards`)
  const resolvedCards = React.useMemo(() => {
    const result = {}

    if (!user) return result

    for (let key in rawCards) {
      const card = {
        key,
        ...rawCards[key],
      }

      if (!result[card.columnId]) result[card.columnId] = []

      result[card.columnId].push(card)
    }
    for (let key in result)
      result[key].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
    return result
  }, [rawCards, user])

  // vote interaction state

  const { canAddVote = false, votesLeftCount = 0 } = React.useMemo(() => {
    if (!(user && config && rawCards)) return {}

    let total = 0
    for (let card of Object.values(rawCards))
      for (let [userId, votes] of Object.entries(card.votes || {}))
        if (userId === user.id) total += votes

    return {
      canAddVote: config.defaultVotesPer - total > 0,
      votesLeftCount: config.defaultVotesPer - total,
    }
  }, [rawCards, user, config])

  const finishedCount = React.useMemo(() => {
    if (!(retro && config && rawCards)) return 0

    const votesCount = {}
    for (let card of Object.values(rawCards))
      for (let [userId, votes] of Object.entries(card.votes || {}))
        votesCount[userId] = (votesCount[userId] || 0) + votes

    let finishedCount = 0
    for (let id of retro.memberUserIds)
      if (votesCount[id] === config.defaultVotesPer) finishedCount++

    return finishedCount
  }, [rawCards, retro, config])

  const membersCount = retro.memberUserIds.length

  const allMembersFinished =
    finishedCount !== undefined &&
    finishedCount === membersCount &&
    membersCount > 0

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
      {' '}
      <Page.Bar className={rootClassName.bar}>
        <div className="__stage">
          {isOwner ? (
            <>
              <span className="_bright-text">Vote</span>&emsp;
              <span className="_faded-text">
                {allMembersFinished ? (
                  <span className="_action-text">
                    All members are finished.
                  </span>
                ) : (
                  <span>
                    {finishedCount} of {membersCount} members{' '}
                    {finishedCount === 1 ? 'is' : 'are'} finished.
                  </span>
                )}
                &emsp;
                {isOwner &&
                  (canAddVote ? (
                    <>
                      {pluralize({
                        count: votesLeftCount,
                        noun: 'vote',
                      })}{' '}
                      left.
                    </>
                  ) : (
                    <span className="_action">
                      <span>All votes cast.</span>
                    </span>
                  ))}
                &emsp;
                <Button
                  faded={!allMembersFinished || canAddVote}
                  onClick={handleAdvance}
                >
                  Next
                </Button>
              </span>
            </>
          ) : (
            <div>
              <span className="_bright-text">Vote</span>{' '}
              <span>for discussion topics.</span>
            </div>
          )}
        </div>
        &emsp;
        <div className="_action">
          {!isOwner &&
            (canAddVote ? (
              <>
                {pluralize({
                  count: votesLeftCount,
                  noun: 'vote',
                })}{' '}
                left.
              </>
            ) : (
              <>
                <DoneIcon className="__icon" />
                <span>All votes cast.</span>
              </>
            ))}
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
                  disableScrollLock
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
                    <div className="_card-wrapper">
                      <RetroCard
                        className="_card"
                        retroId={retro.id}
                        id={item.key}
                        phase={RETRO_PHASES.vote.key}
                        votingUserId={user.id}
                        canAddVote={canAddVote}
                        {...item}
                      />
                    </div>
                  )}
                </FadingScrollList>
              ) : (
                <div className="_empty-message">
                  {COLUMN_MESSAGE_MAP[id] ||
                    `No ${COLUMN_MESSAGE_MAP[id]} cards.`}
                </div>
              )}
            </div>
          </div>
        ))}
      </Page.Fill>
    </>
  )
}

export default RetroVote
