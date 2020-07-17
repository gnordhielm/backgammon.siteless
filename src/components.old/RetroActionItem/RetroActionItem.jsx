import React from 'react'
import { makeClassName } from '@scriptless/util'
import rootClassName from './RetroActionItem.style'
import { removeActionItem } from 'services/retro'
import { RETRO_PHASES, EDIT_ACTION } from 'config/constants'

const RetroActionItem = ({
  className,
  body,
  isOwner,
  retroId,
  id,
  phase,
  onStartEditText,
}) => {
  // focused action
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

  return (
    <div
      className={makeClassName(
        rootClassName,
        className,
        focusedAction === null
          ? '--remove-hover'
          : focusedAction === EDIT_ACTION
          ? '--edit-hover'
          : undefined,
      )}
    >
      <p className="__body">{body}</p>
      {isOwner && phase === RETRO_PHASES.resolve.key && (
        <p className="__actions">
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
          <span
            className="__action"
            onClick={() => {
              if (
                !window.confirm(
                  'Are you sure you want to remove this action item?',
                )
              )
                removeActionItem({
                  itemId: id,
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
        </p>
      )}
    </div>
  )
}

RetroActionItem.displayName = 'RetroActionItem'

export default RetroActionItem
