import React, { useState } from 'react'
import Logo from 'components/Logo'
import useUser from 'hooks/useUser'
import Button from 'components/Button'
import Loader from 'components/Loader'
import { reportError } from 'services/error'
import UserImage from 'components/UserImage'
import useUpdateUser from 'hooks/useUpdateUser'
import Page from 'components/Page'
import { makeClassName } from '@scriptless/util'
import rootClassName from './CompleteProfilePage.style'
import EditableText from 'components/EditableText/EditableText'

const CompleteProfilePage = () => {
  const user = useUser()
  const updateUser = useUpdateUser()

  const [enteredHandle, setEnteredHandle] = useState(undefined)
  const [isUpdating, setIsUpdating] = useState(false)

  const finalHandle = enteredHandle === undefined ? user.handle : enteredHandle

  const onAccept = () => {
    setIsUpdating(true)
    updateUser({
      ...user,
      handle: finalHandle,
    }).catch(error => {
      reportError(error)
      setIsUpdating(false)
    })
  }

  if (isUpdating || !user) return <Loader />

  return (
    <Page className={makeClassName('CompleteProfilePage', rootClassName)}>
      <Logo />
      <br />
      <UserImage src={user.photoUrl} />
      <br />
      <div>
        Handle&ensp;
        <EditableText
          minWidth={25}
          value={finalHandle}
          onChange={setEnteredHandle}
        />
      </div>
      <br />
      <div>
        <Button isDisabled={!finalHandle} onClick={onAccept} text="Continue" />
      </div>
    </Page>
  )
}

export default CompleteProfilePage
