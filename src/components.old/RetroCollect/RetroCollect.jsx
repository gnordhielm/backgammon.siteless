import React from 'react'
import Input from '@scriptless/input'
import useConfig from 'hooks/useConfig'
import Loader from 'components/Loader'
import {
  createCard,
  writeInteractionState,
  setRetroPhase,
  moveCard,
  removeCard,
} from 'services/retro'
import useUser from 'hooks/useUser'
import useCollection from 'hooks/useCollection'
import rootClassName from './RetroCollect.style'
import { COLUMN_CLASS_NAMES, COLUMN_COLOR_MAP, COLUMN_NAME_MAP } from 'style'
import { COLUMN_MESSAGE_MAP, RETRO_PHASES } from 'config/constants'
import RetroCard from 'components/RetroCard'
import FadingScrollList from 'components/FadingScrollList'
import { makeClassName } from '@scriptless/util'
import Page from '../Page/Page'
import RetroMembers from '../RetroMembers/RetroMembers'
import RetroInvite from '../RetroInvite/RetroInvite'
import Action from '../Action/Action'
import DoneIcon from '@material-ui/icons/Done'
import Button from '../Button/Button'

const RetroCollect = ({ retro, isOwner }) => {
  const config = useConfig()
  const user = useUser()
  const inputRef = React.useRef({})

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

  // task interaction state

  const handleSetDidFinish = React.useCallback(
    value => {
      writeInteractionState({
        retroId: retro.id,
        userId: user.id,
        changes: {
          didFinishShare: value,
        },
      })
    },
    [retro.id, user.id],
  )

  const interactionState = useCollection(
    `retros/${retro.id}/userInteractionState`,
  )

  const didFinishShare = React.useMemo(
    () => Boolean(((interactionState || {})[user.id] || {}).didFinishShare),
    [interactionState, user.id],
  )

  const finishedCount = React.useMemo(() => {
    if (!interactionState) return undefined

    return Object.values(interactionState).reduce(
      (acc, item = {}) => (item.didFinishShare ? acc + 1 : acc),
      0,
    )
  }, [interactionState])

  const userHasNotCreatedCards = React.useMemo(() => {
    if (!rawCards) return
    for (const card of Object.values(rawCards))
      if (card.createdByUserId === user.id) return false

    return true
  }, [rawCards, user.id])

  const membersCount = retro.memberUserIds.length

  const highlightNext =
    finishedCount !== undefined &&
    finishedCount === membersCount &&
    membersCount > 0

  // scrolling

  const columnScrollRefs = React.useRef({})
  const scrollToBottom = React.useCallback(id => {
    const element = columnScrollRefs.current[id]
    if (!element) return
    element.requestLockScrollToBottom()
  }, [])

  const [activeColumn, setActiveColumn] = React.useState()

  React.useEffect(() => {
    if (config && !activeColumn) setActiveColumn(config.columns[0].id)
  }, [config, activeColumn])

  // new card

  const [newCardText, setNewCardText] = React.useState({})

  const handleCreateCard = React.useCallback(() => {
    if (!newCardText[activeColumn]) return
    createCard({
      retroId: retro.id,
      userId: user.id,
      columnId: activeColumn,
      body: newCardText[activeColumn],
    })
    scrollToBottom(activeColumn)
    setNewCardText(({ [activeColumn]: omit, ...rest }) => rest)
  }, [
    newCardText,
    activeColumn,
    setNewCardText,
    scrollToBottom,
    retro.id,
    user.id,
  ])

  // edit card text

  const handleStartEditText = React.useCallback(
    id => {
      if (!rawCards) return
      const card = rawCards[id]
      if (!card) return

      setNewCardText(last => ({
        ...last,
        [card.columnId]: card.body,
      }))

      setActiveColumn(card.columnId)
      if ((inputRef.current[card.columnId] || {}).focus)
        (inputRef.current[card.columnId] || {}).focus()

      removeCard({ cardId: id, retroId: retro.id })
    },
    [rawCards, retro.id],
  )

  // move card

  const [moveCardId, setMoveCardId] = React.useState()

  const isMovingCard = Boolean(moveCardId)

  const movingCardFromColumnId = React.useMemo(() => {
    if (!moveCardId || !rawCards) return
    return rawCards[moveCardId].columnId
  }, [moveCardId, rawCards])

  // loading

  const hasNotLoaded = !config || !user || !rawCards

  React.useEffect(() => {
    if (hasNotLoaded) return
    config.columns.forEach(({ id }) => {
      scrollToBottom(id)
    })
  }, [hasNotLoaded, scrollToBottom, config])

  if (hasNotLoaded) return <Loader />

  return (
    <>
      <Page.Bar className={rootClassName.bar}>
        <div className="__stage">
          {isOwner ? (
            <>
              <span className="_bright">Share</span>&emsp;
              <span className="_faded">
                {highlightNext ? (
                  <span className="_action">All members are finished.</span>
                ) : (
                  <span>
                    {finishedCount} of {membersCount} members{' '}
                    {finishedCount === 1 ? 'is' : 'are'} finished.
                  </span>
                )}
                &emsp;
                <Button faded={!highlightNext} onClick={handleAdvance}>
                  Next
                </Button>
              </span>
            </>
          ) : (
            <div>
              <span className="_bright">Share</span>{' '}
              <span>your observations.</span>
            </div>
          )}
        </div>
        &emsp;
        <div className="__action">
          {!isOwner &&
            (didFinishShare ? (
              <span
                className="__finished-toggle"
                onClick={() => {
                  handleSetDidFinish(false)
                }}
              >
                <DoneIcon className="__icon" />
                <span>Finished</span>
                &ensp;
                <Action
                  onClick={() => {
                    handleSetDidFinish(true)
                  }}
                >
                  undo
                </Action>
              </span>
            ) : (
              <Button
                onClick={() => {
                  handleSetDidFinish(true)
                }}
                faded={userHasNotCreatedCards}
              >
                Finish
              </Button>
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
        {config.columns.map(({ id, title }) => (
          <div
            key={id}
            className={makeClassName('__column', COLUMN_CLASS_NAMES[id])}
            onClick={() => {
              setActiveColumn(id)
            }}
          >
            <div className="__cards">
              {isMovingCard && movingCardFromColumnId !== id ? (
                <div
                  className="_move-message"
                  onClick={() => {
                    moveCard({
                      retroId: retro.id,
                      cardId: moveCardId,
                      moveToColumnId: id,
                    })
                    setMoveCardId()
                  }}
                >
                  Move to {title.toLowerCase()}
                </div>
              ) : resolvedCards[id] ? (
                <FadingScrollList
                  ref={element => {
                    columnScrollRefs.current[id] = element
                    if (element) element.requestLockScrollToBottom()
                  }}
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
                      isOwner={user.id === item.createdByUserId}
                      retroId={retro.id}
                      id={item.key}
                      phase={RETRO_PHASES.collect.key}
                      onSetMoveCardId={setMoveCardId}
                      isMoving={item.key === moveCardId}
                      onStartEditText={handleStartEditText}
                      {...item}
                    />
                  )}
                </FadingScrollList>
              ) : (
                <div className="_empty-message">
                  {COLUMN_MESSAGE_MAP[id] || `No ${COLUMN_NAME_MAP[id]} cards.`}
                </div>
              )}
            </div>
            <div className="__input">
              <Input.Text
                ref={element => {
                  inputRef.current[id] = element
                }}
                onFocus={() => {
                  scrollToBottom(id)
                }}
                placeholder={`Write a ${title.toLowerCase()} card...`}
                className={makeClassName('_text-input', COLUMN_CLASS_NAMES[id])}
                value={newCardText[id] || ''}
                onChange={value => {
                  setNewCardText(old => ({
                    ...old,
                    [id]: value,
                  }))
                }}
                onEnter={event => {
                  if (event.shiftKey) return
                  handleCreateCard()
                }}
              />
            </div>
          </div>
        ))}
      </Page.Fill>
    </>
  )
}

export default RetroCollect
