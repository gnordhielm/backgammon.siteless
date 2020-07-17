import React from 'react'
import useConfig from 'hooks/useConfig'
import Loader from 'components/Loader'
import useUser from 'hooks/useUser'
import useCollection from 'hooks/useCollection'
import rootClassName from './RetroComplete.style'
import { RETRO_PHASES } from 'config/constants'
import RetroCard from 'components/RetroCard'
import FadingScrollList from 'components/FadingScrollList'
import RetroActionItem from 'components/RetroActionItem'
import { pluralize } from '@scriptless/util'
import Page from '../Page/Page'
import RetroMembers from '../RetroMembers/RetroMembers'
import moment from 'moment'

const RetroReview = ({ retro, isOwner }) => {
  const config = useConfig()

  const user = useUser()

  const rawCards = useCollection(`retros/${retro.id}/cards`)
  const { resolvedCards, totalOutOfScope } = React.useMemo(() => {
    if (!(user && rawCards)) return {}

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

    return { resolvedCards: scope, totalOutOfScope: rest.length }
  }, [rawCards, user, retro])

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

  // loading

  const hasNotLoaded = !config || !user || !rawCards || !actionItems

  if (hasNotLoaded) return <Loader />

  return (
    <>
      <Page.Bar className={rootClassName.bar}>
        <div className="__stage">
          <div>
            <span className="_bright">Completed</span>{' '}
            <span>
              on{' '}
              {moment(retro.completedAt.seconds * 1000).format(
                'M.D.YYYY [at] hh:mm A',
              )}
              .
            </span>
          </div>
        </div>
        <div className="__spacer"></div>
        <RetroMembers
          isOwner={isOwner}
          memberUserIds={retro.memberUserIds}
          createdByUserId={retro.createdByUserId}
        />
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
              {({ item }) => (
                <RetroCard
                  className="_card"
                  retroId={retro.id}
                  id={item.key}
                  phase={RETRO_PHASES.complete.key}
                  isOwner={isOwner}
                  votingUserId={user.id}
                  {...item}
                />
              )}
            </FadingScrollList>
          </div>
          <div className="_bottom-message">
            {pluralize({ count: totalOutOfScope, noun: 'card' })} out of scope.
          </div>
        </div>
        <div className="__column">
          <div className="__cards --action-items">
            <FadingScrollList
              className="__list-container"
              padding={25}
              items={actionItems}
              indicator={
                <div className="_card-scroll-indicator --action-items" />
              }
            >
              {({ item }) => (
                <RetroActionItem
                  className="_card"
                  retroId={retro.id}
                  id={item.key}
                  isOwner={isOwner}
                  {...item}
                />
              )}
            </FadingScrollList>
          </div>
          <div className="_bottom-message" />
        </div>
      </Page.Fill>
    </>
  )
}

export default RetroReview
