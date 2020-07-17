import React from 'react'
import useConfig from 'hooks/useConfig'
import Loader from 'components/Loader'
import useUser from 'hooks/useUser'
import useCollection from 'hooks/useCollection'
import rootClassName from './RetroResolve.style'
import Input from '@scriptless/input'
import { RETRO_PHASES } from 'config/constants'
import RetroCard from 'components/RetroCard'
import FadingScrollList from 'components/FadingScrollList'
import { createActionItem, removeActionItem } from 'services/retro'
import RetroActionItem from 'components/RetroActionItem'
import Page from '../Page/Page'
import RetroMembers from '../RetroMembers/RetroMembers'
import RetroInvite from '../RetroInvite/RetroInvite'
import Button from '../Button/Button'
import { setRetroPhase } from 'services/retro'

const DIVIDER = 'DIVIDER'

const RetroReview = ({ retro, isOwner }) => {
  const config = useConfig()
  const user = useUser()

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

  // cards

  const rawCards = useCollection(`retros/${retro.id}/cards`)
  const resolvedCards = React.useMemo(() => {
    if (!(user && rawCards)) return null

    const cardsInScope = retro.cardsInScope || []

    const scope = []
    const rest = []

    for (const [key, card] of Object.entries(rawCards)) {
      const fullCard = {
        key,
        ...card,
      }

      if (cardsInScope.includes(key))
        scope.push({ ...fullCard, isInScope: true })
      else rest.push(fullCard)
    }

    scope.sort(
      (a, b) =>
        cardsInScope.findIndex(id => id === a.key) -
        cardsInScope.findIndex(id => id === b.key),
    )

    rest.sort(
      (a, b) =>
        a.columnId - b.columnId || a.createdAt.seconds - b.createdAt.seconds,
    )

    return [...scope, { key: DIVIDER }, ...rest]
  }, [rawCards, user, retro])

  // new action item

  const [newActionItemText, setNewActionItemText] = React.useState('')

  const handleCreateActionItem = React.useCallback(() => {
    if (!newActionItemText) return
    setNewActionItemText('')
    createActionItem({ retroId: retro.id, body: newActionItemText })
  }, [newActionItemText, setNewActionItemText, retro.id])

  // existing action items

  const rawActionItems = useCollection(`retros/${retro.id}/actionItems`)

  const actionItems = React.useMemo(() => {
    if (!rawActionItems) return null

    const result = []

    for (const [key, item] of Object.entries(rawActionItems)) {
      const fullItem = {
        key,
        ...item,
      }
      result.push(fullItem)
    }

    result.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)

    return result
  }, [rawActionItems])

  const hasActionItems = Boolean((actionItems || []).length)

  // edit action item

  const inputRef = React.useRef(null)

  const handleStartEditText = React.useCallback(
    id => {
      if (!rawActionItems) return
      const card = rawActionItems[id]
      if (!card) return

      setNewActionItemText(card.body)

      if ((inputRef.current || {}).focus) (inputRef.current || {}).focus()

      removeActionItem({
        retroId: retro.id,
        itemId: id,
      })
    },
    [rawActionItems, setNewActionItemText, retro.id],
  )

  // action item scrolling

  const actionListScrollRef = React.useRef(null)
  const scrollActionListToBottom = React.useCallback(() => {
    const element = actionListScrollRef.current
    if (!element) return
    element.requestLockScrollToBottom()
  }, [])

  // loading

  const hasNotLoaded = !config || !user || !rawCards || !actionItems

  if (hasNotLoaded) return <Loader />

  return (
    <>
      <Page.Bar className={rootClassName.bar}>
        <div className="__stage">
          <span className="_bright">Resolve</span>{' '}
          <span>cards to action items.</span>
          {isOwner && (
            <>
              &emsp;
              <Button faded={!hasActionItems} onClick={handleAdvance}>
                Finish
              </Button>
            </>
          )}
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
        <div className="__column">
          <div className="__cards">
            <FadingScrollList
              className="__list-container"
              padding={25}
              items={resolvedCards}
              indicator={<div className="_card-scroll-indicator" />}
            >
              {({ item }) =>
                item.key === DIVIDER ? (
                  <div className="_item-divider">Cards out of scope</div>
                ) : (
                  <RetroCard
                    className="_card"
                    retroId={retro.id}
                    id={item.key}
                    phase={RETRO_PHASES.resolve.key}
                    isOwner={isOwner}
                    votingUserId={user.id}
                    {...item}
                  />
                )
              }
            </FadingScrollList>
          </div>
        </div>
        <div className="__column">
          <div className="__cards --action-items">
            {actionItems.length ? (
              <FadingScrollList
                className="__list-container"
                padding={25}
                items={actionItems}
                indicator={
                  <div className="_card-scroll-indicator --action-items" />
                }
                ref={actionListScrollRef}
              >
                {({ item }) => (
                  <RetroActionItem
                    className="_card"
                    retroId={retro.id}
                    id={item.key}
                    isOwner={isOwner}
                    phase={retro.phase}
                    onStartEditText={handleStartEditText}
                    {...item}
                  />
                )}
              </FadingScrollList>
            ) : (
              <div className="_empty-message"> No action items.</div>
            )}
          </div>
          <div className="__input">
            <Input.Text
              ref={inputRef}
              onFocus={scrollActionListToBottom}
              placeholder={`Add an action item...`}
              className={'_text-input --action-input'}
              value={newActionItemText}
              onChange={setNewActionItemText}
              onEnter={handleCreateActionItem}
            />
          </div>
        </div>
      </Page.Fill>
    </>
  )
}

export default RetroReview
