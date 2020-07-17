import React from 'react'
import { withRouter } from 'react-router-dom'
import useUser from 'hooks/useUser'
import Loader from 'components/Loader'
import Page from 'components/Page'
import className from './AccountPage.style'
import EditableText from 'components/EditableText/EditableText'
import { updateHandle, deleteProfile } from 'services/user'
import { firebase } from 'config/firebase'
import Action from 'components/Action'
import useUpdateUser from 'hooks/useUpdateUser'
import GlobalToolbar from 'components/GlobalToolbar/GlobalToolbar'

const AccountPage = ({ history }) => {
  const user = useUser()
  const updateUser = useUpdateUser()

  const togglePrefersLightMode = React.useCallback(
    () =>
      updateUser({
        prefersLightMode: !user.prefersLightMode,
      }),
    [updateUser, user.prefersLightMode],
  )

  const [showLoader, setShowLoader] = React.useState(false)

  const [localUserHandle, setLocalUserHandle] = React.useState(
    () => user.handle,
  )
  const handleUserHandleChange = React.useCallback(
    newHandle => {
      if (!newHandle) return
      setLocalUserHandle(newHandle)
      updateHandle({ id: user.id, handle: newHandle })
    },
    [user.id],
  )

  if (user === null || showLoader) return <Loader />

  return (
    <Page className={className}>
      <Page.Bar>
        <GlobalToolbar title="Settings" offerBack />
      </Page.Bar>

      <Page.Fill className="__fill">
        <div className="__items">
          <div className="__item-wrapper">
            <div className="__content">
              <div className="__title">Preferences</div>
              <div className="__bar">
                <div className="__description">Light theme interface</div>
                <div className="__actions">
                  <Action onClick={togglePrefersLightMode}>
                    {user.prefersLightMode ? 'Disable' : 'Enable'}
                  </Action>
                </div>
              </div>
            </div>
          </div>
          <div className="__item-wrapper">
            <div className="__content">
              <div className="__title">Change handle</div>
              <div className="__description">
                Your handle does not need to be unique. Be sure to use a handle
                your teammates will be able to recognize you by.
              </div>
              <div className="__actions">
                <EditableText
                  value={localUserHandle}
                  onChange={handleUserHandleChange}
                />
              </div>
            </div>
          </div>
          <div className="__item-wrapper">
            <div className="__content">
              <div className="__title">Delete account</div>
              <div className="__description">
                Deleting your account will remove information we have associated
                with you. It will not remove content from retros you've
                contributed to in the past.
              </div>
              <div className="__actions">
                <Action
                  text="Delete"
                  confirmMessage="Are you sure you want to delete your account?"
                  onClick={async () => {
                    setShowLoader(true)
                    await deleteProfile()
                    firebase.auth().signOut()
                    history.push('/')
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Page.Fill>
    </Page>
  )
}

export default withRouter(AccountPage)
