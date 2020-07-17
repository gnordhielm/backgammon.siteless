import React from 'react'
import { makeClassName } from '@scriptless/util'
import rootClassName from './RetroCard.style'
import { COLUMN_CLASS_NAMES } from 'style'
import {
  RETRO_PHASES,
  MERGE_ACTION,
  MOVE_ACTION,
  EDIT_ACTION,
} from 'config/constants'
import {
  removeCard,
  setUserVotes,
  mergeCards,
  addCardToScope,
  removeCardFromScope,
} from 'services/retro'
import { noop } from 'lodash'

const repeat = (Component, times) => {
  const result = []

  let i = times
  while (i > 0) {
    result.push(<Component key={i} />)
    i--
  }

  return result
}

const RetroCard = ({
  className,
  columnId,
  body,
  isOwner,
  retroId,
  id,
  phase,
  votes,
  votingUserId,
  canAddVote,
  onSetMergeCardId,
  onSetMoveCardId,
  onStartEditText,
  isMoving,
  mergeCardId,
  mergedCards,
  isInScope,
}) => {
  // generalized action hover response

  const [focusedAction, setFocusedAction] = React.useState()
  const handleActionMouseEnter = React.useCallback(
    columnIdOrNull => {
      setFocusedAction(columnIdOrNull)
    },
    [setFocusedAction],
  )
  const handleActionMouseLeave = React.useCallback(() => {
    setFocusedAction()
  }, [setFocusedAction])

  // voting

  const { votingUserVotes, otherUserVotes } = React.useMemo(() => {
    const result = { votingUserVotes: 0, otherUserVotes: 0 }

    for (let [key, value] of Object.entries(votes || {}))
      if (key === votingUserId) result.votingUserVotes = value
      else result.otherUserVotes += value

    return result
  }, [votes, votingUserId])

  const handleAddVote = React.useCallback(() => {
    setUserVotes({
      cardId: id,
      userId: votingUserId,
      retroId,
      voteCount: votingUserVotes + 1,
    })
  }, [votingUserId, votingUserVotes, id, retroId])

  const handleRemoveVote = React.useCallback(() => {
    setUserVotes({
      cardId: id,
      userId: votingUserId,
      retroId,
      voteCount: votingUserVotes - 1,
    })
  }, [votingUserId, votingUserVotes, id, retroId])

  // merging

  const isMerging = Boolean(mergeCardId)
  const isMergeOriginCard = mergeCardId === id

  // scope

  const toggleIsInScope = React.useCallback(() => {
    if (isInScope) removeCardFromScope({ retroId, cardId: id })
    else addCardToScope({ retroId, cardId: id })
  }, [isInScope, retroId, id])

  // action options

  const canVote = phase === RETRO_PHASES.vote.key
  const canRemove =
    [RETRO_PHASES.collect.key, RETRO_PHASES.review.key].includes(phase) &&
    isOwner
  const canMove = RETRO_PHASES.collect.key === phase && isOwner
  const canEditText = RETRO_PHASES.collect.key === phase && isOwner
  const canMerge = RETRO_PHASES.review.key === phase && isOwner
  const canToggleScope = isOwner && phase === RETRO_PHASES.resolve.key

  const renderedActions = React.useMemo(() => {
    if (isMoving)
      return (
        <span
          className="__action"
          onClick={() => {
            onSetMoveCardId()
          }}
        >
          Cancel move
        </span>
      )

    if (isMergeOriginCard)
      return (
        <span
          className="__action"
          onClick={() => {
            onSetMergeCardId()
          }}
        >
          Cancel merge
        </span>
      )

    if (isMerging) return null

    return (
      <>
        {canToggleScope && (
          <span className="__action" onClick={toggleIsInScope}>
            {isInScope ? 'Remove from scope' : 'Add to scope'}
          </span>
        )}
        {canEditText && (
          <span
            className="__action"
            onClick={() => {
              onStartEditText(id)
            }}
            onMouseEnter={() => {
              handleActionMouseEnter(EDIT_ACTION)
            }}
            onMouseLeave={() => {
              handleActionMouseLeave(EDIT_ACTION)
            }}
          >
            Edit
          </span>
        )}
        {canMove && (
          <span
            className="__action"
            onClick={() => {
              onSetMoveCardId(id)
            }}
            onMouseEnter={() => {
              handleActionMouseEnter(MOVE_ACTION)
            }}
            onMouseLeave={() => {
              handleActionMouseLeave(MOVE_ACTION)
            }}
          >
            Move
          </span>
        )}
        {canMerge && (
          <span
            className="__action"
            onClick={() => {
              onSetMergeCardId(id)
            }}
            onMouseEnter={() => {
              handleActionMouseEnter(MERGE_ACTION)
            }}
            onMouseLeave={() => {
              handleActionMouseLeave(MERGE_ACTION)
            }}
          >
            Merge
          </span>
        )}
        {canRemove && (
          <span
            className="__action"
            onClick={() => {
              if (
                !window.confirm(
                  'Are you sure you want to remove this card? This action cannot be undone.',
                )
              )
                return
              removeCard({
                cardId: id,
                retroId,
              })
            }}
            onMouseEnter={() => {
              handleActionMouseEnter(null)
            }}
            onMouseLeave={() => {
              handleActionMouseLeave(null)
            }}
          >
            Remove
          </span>
        )}
        {canVote && (
          <>
            <span
              className={makeClassName('__action', !canAddVote && '--disabled')}
              onClick={handleAddVote}
            >
              Add vote
            </span>

            {Boolean(votingUserVotes) && (
              <span className="__action" onClick={handleRemoveVote}>
                Remove vote
              </span>
            )}
          </>
        )}
      </>
    )
  }, [
    isMergeOriginCard,
    onSetMergeCardId,
    isMoving,
    isMerging,
    onSetMoveCardId,
    canToggleScope,
    canMerge,
    canMove,
    canRemove,
    handleActionMouseEnter,
    handleActionMouseLeave,
    isInScope,
    id,
    retroId,
    toggleIsInScope,
    canEditText,
    onStartEditText,
    canVote,
    canAddVote,
    votingUserVotes,
    handleAddVote,
    handleRemoveVote,
  ])

  return (
    <div
      className={makeClassName(
        rootClassName,
        className,
        COLUMN_CLASS_NAMES[columnId],
        isOwner && '--owner',
        isMerging && (isMergeOriginCard ? '--merging' : '--merge-target'),
        focusedAction === null
          ? '--remove-hover'
          : focusedAction === MOVE_ACTION
          ? '--move-hover'
          : focusedAction === MERGE_ACTION
          ? '--merge-hover'
          : focusedAction === EDIT_ACTION
          ? '--edit-hover'
          : undefined,
        phase === RETRO_PHASES.resolve.key &&
          (isInScope ? '--in-scope' : '--out-of-scope'),
      )}
      onClick={() => {
        if (isMerging && !isMergeOriginCard) {
          onSetMergeCardId()
          mergeCards({
            mergeDestination: id,
            mergeOrigin: mergeCardId,
            retroId,
          })
        }
      }}
    >
      <p className="__body">{body}</p>
      {mergedCards.map(({ body, id }) => (
        <div key={id} className="__child-card">
          {body}
        </div>
      ))}
      {renderedActions && <p className="__actions">{renderedActions}</p>}
      {[RETRO_PHASES.vote.key, RETRO_PHASES.resolve.key].includes(phase) &&
        Boolean(votes) && (
          <div className="__votes">
            {repeat(
              () => (
                <div className="__vote --voting-user" />
              ),
              votingUserVotes,
            )}
            {repeat(
              () => (
                <div className="__vote" />
              ),
              otherUserVotes,
            )}
          </div>
        )}
    </div>
  )
}

RetroCard.displayName = 'RetroCard'

RetroCard.defaultProps = {
  onSetMergeCardId: noop,
  onSetMoveCardId: noop,
  mergedCards: [],
}

export default RetroCard
