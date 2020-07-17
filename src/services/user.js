import { database, firebase } from 'config/firebase'

export const getFullUser = async user => {
  const doc = await database
    .collection('users')
    .doc(user.uid)
    .get()

  const userData = doc.exists ? doc.data() : {}

  let handle

  if (userData.handle) {
    handle = userData.handle
  } else {
    handle = user.displayName.split(' ').shift()
  }

  const result = {
    email: user.email,
    fullName: user.displayName,
    id: user.uid,
    photoUrl: user.photoURL,
    handle,
    hasUpdatedProfileOnce: userData.hasUpdatedProfileOnce === true,
    prefersLightMode: userData.prefersLightMode === true,
  }

  return result
}

export const updateProfile = async ({ id, handle, ...user }) => {
  const updates = {
    ...user,
    hasUpdatedProfileOnce: true,
    handle,
  }
  await database
    .collection('users')
    .doc(id)
    .set(updates, { merge: true })

  return updates
}

export const updateHandle = async ({ id, handle }) => {
  const updates = {
    handle,
  }
  const userRef = await database
    .collection('users')
    .doc(id)
    .set(updates, { merge: true })

  return userRef
}

export const setPrefersLightMode = async ({ id, value }) => {
  const updates = {
    prefersLightMode: value,
  }
  const userRef = await database
    .collection('users')
    .doc(id)
    .set(updates, { merge: true })

  return userRef
}

export const deleteProfile = async () => {
  const { uid } = firebase.auth().currentUser || {}
  if (!uid) return

  await database
    .collection('users')
    .doc(uid)
    .delete()
}
