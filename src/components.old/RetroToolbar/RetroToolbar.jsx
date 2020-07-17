import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import className from './RetroToolbar.style'
import useCollection from 'hooks/useCollection'
import useUser from 'hooks/useUser'
import UserImage from '../UserImage'
import { makeClassName } from '@scriptless/util'
import { RETRO_PHASES } from 'config/constants'
import Button from 'components/Button'
import { setRetroPhase } from 'services/retro'
import useConfig from 'hooks/useConfig'
import { pluralize } from '@scriptless/util'
import moment from 'moment'
import Action from '../Action/Action'

const RetroToolbar = ({
  phase,
  memberUserIds,
  createdByUserId,
  id,
  completedAt,
  className: propsClassName,
}) => {
  const user = useUser()
  const users = useCollection('users')

  const isOwner = createdByUserId === user.id

  const config = useConfig()

  // votes

  const cards = useCollection(`retros/${id}/cards`)

  const totalRemainingVotes = React.useMemo(() => {
    let total = 0
    if (!(user && config && cards)) return total

    for (let card of Object.values(cards))
      for (let [userId, votes] of Object.entries(card.votes || {}))
        if (userId === user.id) total += votes

    return config.defaultVotesPer - total
  }, [cards, user, config])

  const nextPhase = React.useMemo(() => {
    const phaseIndex = Object.keys(RETRO_PHASES).findIndex(key => key === phase)
    if (!~phaseIndex) return null

    const nextPhase = Object.values(RETRO_PHASES)[phaseIndex + 1]
    if (!nextPhase) return null

    return nextPhase
  }, [phase])

  const handleAdvance = React.useCallback(() => {
    if (!nextPhase) return
    setRetroPhase({
      retroId: id,
      phase: nextPhase.key,
    })
  }, [nextPhase, id])

  return (
    <div className={makeClassName(className, propsClassName)}>
      <div className="__left">
        <div className="_tracker">
          {/* {phase === RETRO_PHASES.complete.key ? (
            <div className="_toolbar-message">
              Completed{' '}
              {moment(completedAt.seconds * 1000).format('M.D.YY [at] h:mm A')}
            </div>
          ) : (
            Object.values(RETRO_PHASES)
              .filter(({ isVisibleToTracker }) => isVisibleToTracker)
              .map(({ key, displayName }, index) => (
                <React.Fragment key={key}>
                  {index > 0 && <div className="__divider" />}
                  <div
                    className={makeClassName(
                      '__step',
                      key === phase && '--active',
                    )}
                  >
                    {displayName}
                  </div>
                </React.Fragment>
              ))
          )} */}
        </div>
        {/* {phase === RETRO_PHASES.vote.key && (
          <div className="_votes">
            {totalRemainingVotes > 0 ? (
              `${pluralize({
                noun: 'vote',
                count: totalRemainingVotes,
              })} remaining.`
            ) : (
              <>All votes cast.&ensp;👍</>
            )}
          </div>
        )}
        {isOwner && nextPhase && (
          <Button
            text={
              nextPhase.advanceToMessage || `Start ${nextPhase.displayName}`
            }
            onClick={handleAdvance}
          />
        )} */}
      </div>
    </div>
  )
}

RetroToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  createdByUserId: PropTypes.string.isRequired,
  memberUserIds: PropTypes.array.isRequired,
}

export default withRouter(RetroToolbar)
