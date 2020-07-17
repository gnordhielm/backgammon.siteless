import React from 'react'
import useCollection from 'hooks/useCollection'
import useUser from 'hooks/useUser'
import Loader from 'components/Loader'

import rootClassName from './RetroMembers.style'
import UserImage from '../UserImage/UserImage'
import Tooltip from '../Tooltip/Tooltip'
import { makeClassName } from '@scriptless/util'

const RetroMembers = ({ className, memberUserIds, createdByUserId }) => {
  const user = useUser()
  const users = useCollection('users')
  const userList = React.useMemo(() => {
    if (!(user && users)) return null

    return [...memberUserIds, createdByUserId]
      .map(id => ({
        isOwner: id === createdByUserId,
        isCurrentUser: id === user.id,
        id,
        ...users[id],
      }))
      .sort((a, b) =>
        (a.handle || '').toLowerCase() > (b.handle || '').toLowerCase()
          ? 1
          : (a.handle || '').toLowerCase() < (b.handle || '').toLowerCase()
          ? -1
          : 0,
      )
  }, [user, users, memberUserIds, createdByUserId])

  if (!userList) return <Loader />

  return (
    <div className={makeClassName(rootClassName.base, className)}>
      {userList.map(({ id, handle, isOwner, photoUrl }) => (
        <Tooltip
          className="__tooltip"
          key={id}
          content={
            <div className={rootClassName.tooltip}>
              <div>{handle}</div>
              {isOwner && <div className="_faded">Retro owner</div>}
            </div>
          }
        >
          <UserImage size={24} src={photoUrl} />
        </Tooltip>
      ))}
    </div>
  )
}

export default RetroMembers
