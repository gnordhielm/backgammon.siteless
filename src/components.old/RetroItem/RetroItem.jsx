import React from 'react'
import { makeClassName, pluralize } from '@scriptless/util'
import rootClassName from './RetroItem.style'
import { withRouter } from 'react-router-dom'
import useCollection from 'hooks/useCollection'
import { RETRO_PATH } from 'config/constants'
import Loader from 'components/Loader'
import Action from 'components/Action'
import { deleteRetro, setRetroMemberUserIds } from 'services/retro'
import useUser from 'hooks/useUser'
import RelativeTime from '../RelativeTime'

const RetroItem = ({
  className,
  title,
  id,
  memberUserIds,
  createdByUserId,
  history,
  isActive = false,
  completedAt,
  isOwner,
  createdAt,
  phase,
}) => {
  const user = useUser()

  const handleDelete = React.useCallback(() => {
    if (
      !window.confirm(
        'Are you sure you want to delete this retro? This action cannot be undone.',
      )
    )
      return

    deleteRetro(id)
  }, [id])

  const handleLeave = React.useCallback(() => {
    if (
      !window.confirm(
        'Are you sure you want to leave this retro? This action cannot be undone.',
      )
    )
      return

    setRetroMemberUserIds({
      retroId: id,
      memberUserIds: memberUserIds.filter(id => id !== user.id),
    })
  }, [id, memberUserIds, user])

  const allUsers = useCollection('users')
  const handleGoToRetro = React.useCallback(() => {
    history.push(`${RETRO_PATH}/${id}`)
  }, [id, history])

  if (!allUsers) return <Loader />

  return (
    <div className={makeClassName(rootClassName, className)}>
      <div className="__body" onClick={handleGoToRetro}>
        <div className="__title">{title}</div>
        <div className="__details">
          <div className="__item">
            {pluralize({ count: memberUserIds.length + 1, noun: 'member' })},
            created by{' '}
            {isOwner ? 'you' : (allUsers[createdByUserId] || {}).handle}.
          </div>
          <div className="__item">
            {isActive ? (
              <span className="-action-color">In progress.</span>
            ) : (
              <>
                Completed <RelativeTime value={completedAt.seconds * 1000} />.
              </>
            )}
          </div>
        </div>
      </div>
      <div className="__footer">
        {isOwner ? (
          <Action faded className="__action" onClick={handleDelete}>
            Delete
          </Action>
        ) : (
          <Action faded className="__action" onClick={handleLeave}>
            Leave
          </Action>
        )}
      </div>
    </div>
  )
}

RetroItem.displayName = 'RetroItem'

export default withRouter(RetroItem)
