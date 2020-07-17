import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import useUser from 'hooks/useUser'
import useTimeOfDay from 'hooks/useTimeOfDay'
import useQuery from 'hooks/useQuery'
import { RETRO_PATH, RETRO_PHASES } from 'config/constants'
import Loader from 'components/Loader'
import { createRetro } from 'services/retro'
import { reportError } from 'services/error'
import Page from 'components/Page'
import RetroItem from 'components/RetroItem'
import className, { createCurtainStyle } from './HomePage.style'
import GlobalToolbar from 'components/GlobalToolbar/GlobalToolbar'
import Action from 'components/Action/Action'
import Curtain from 'components/Curtain/Curtain'
import EditableText from 'components/EditableText'
import { makeClassName } from '@scriptless/util'

const EMPTY_RETRO_TITLE = ''

const getPhaseIndex = phaseKey =>
  Object.keys(RETRO_PHASES).findIndex(key => phaseKey === key)

const Home = ({ history }) => {
  const user = useUser()

  const isOwnerQuery = React.useMemo(() => ['createdByUserId', '==', user.id], [
    user.id,
  ])
  const userIsOwnerRetros = useQuery({
    collection: 'retros',
    query: isOwnerQuery,
  })

  const isMemberQuery = React.useMemo(
    () => ['memberUserIds', 'array-contains', user.id],
    [user.id],
  )
  const userIsMemberRetros = useQuery({
    collection: 'retros',
    query: isMemberQuery,
  })

  const [activeRetros = [], completedRetros = []] =
    React.useMemo(() => {
      if (!(userIsOwnerRetros && userIsMemberRetros)) return

      const { active, completed } = [
        ...userIsOwnerRetros,
        ...userIsMemberRetros,
      ].reduce(
        (acc, retro) => {
          const key =
            retro.phase === RETRO_PHASES.complete.key ? 'completed' : 'active'
          return { ...acc, [key]: [...acc[key], retro] }
        },
        { active: [], completed: [] },
      )

      const sortedActive = active.sort((a, b) => {
        const createdDifference = b.createdAt.seconds - a.createdAt.seconds

        const phaseDifference = getPhaseIndex(a.phase) - getPhaseIndex(b.phase)

        return phaseDifference || createdDifference
      })

      const sortedCompleted = completed.sort(
        (a, b) => b.completedAt.seconds - a.completedAt.seconds,
      )

      return [sortedActive, sortedCompleted]
    }, [userIsOwnerRetros, userIsMemberRetros]) || []

  const timeOfDay = useTimeOfDay()

  // create retro

  const [showCreateCurtain, setShowCreateCurtain] = useState(false)

  const [isCreating, setIsCreating] = useState(false)

  const [newRetroTitle, setNewRetroTitle] = React.useState(EMPTY_RETRO_TITLE)

  React.useEffect(() => {
    if (showCreateCurtain) return
    // TODO: avoids flicker on close. There's a better way of doing this

    const timeout = setTimeout(() => {
      setNewRetroTitle(EMPTY_RETRO_TITLE)
    }, 400)
    return () => {
      clearTimeout(timeout)
    }
  }, [showCreateCurtain])

  const handleCreate = React.useCallback(() => {
    setIsCreating(true)
    createRetro({ user, title: newRetroTitle })
      .then(({ id: retroId }) => {
        history.push(RETRO_PATH + '/' + retroId)
      })
      .catch(error => {
        reportError(error)
        setIsCreating(false)
      })
  }, [user, newRetroTitle, history])

  // loading

  if (!(user && userIsOwnerRetros && userIsMemberRetros) || isCreating)
    return <Loader />

  const noActive = activeRetros.length === 0
  const noCompleted = completedRetros.length === 0

  const noRetros = noActive && noCompleted

  return (
    <>
      <Curtain
        isOpen={showCreateCurtain}
        onClose={() => {
          setShowCreateCurtain(false)
        }}
        className={createCurtainStyle}
      >
        {() => (
          <>
            <div className="__instructions">Enter a title for your retro</div>
            <div className="__input">
              <EditableText
                autoFocus
                value={newRetroTitle}
                onChange={setNewRetroTitle}
              />
            </div>
            <div
              className={makeClassName(
                '__action',
                newRetroTitle && '--visible',
              )}
            >
              <Action onClick={handleCreate}>Create</Action>
            </div>
          </>
        )}
      </Curtain>
      <Page className={className}>
        <Page.Bar>
          <GlobalToolbar title={`Good ${timeOfDay}, ${user.handle}.`} />
        </Page.Bar>
        {noRetros ? (
          <Page.Fill centerVertical nudge>
            <p>You don't have any retros yet.</p>
            <p>
              You can{' '}
              <Action
                onClick={() => {
                  setShowCreateCurtain(true)
                }}
              >
                create a retro
              </Action>{' '}
              or join one by invitation.
            </p>
          </Page.Fill>
        ) : (
          <Page.Fill className="__body">
            <div
              className="__item --create"
              onClick={() => {
                setShowCreateCurtain(true)
              }}
            >
              Create a new retro
            </div>
            {activeRetros.map(retro => (
              <RetroItem
                {...retro}
                key={retro.id}
                isActive
                isOwner={user.id === retro.createdByUserId}
                className="__item"
              />
            ))}
            {completedRetros.map(retro => (
              <div className="__item" key={retro.id}>
                <RetroItem
                  {...retro}
                  isOwner={user.id === retro.createdByUserId}
                />
              </div>
            ))}
          </Page.Fill>
        )}
      </Page>
    </>
  )
}

export default withRouter(Home)
