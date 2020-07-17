// https://firebase.google.com/docs/web/setup?authuser=1#config-web-app

import 'firebase/firestore'
import 'firebase/auth'
import firebase from 'firebase/app'

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
}

firebase.initializeApp(config)

firebase.auth().useDeviceLanguage()

// https://firebase.google.com/docs/firestore/manage-data/enable-offline

const database = firebase.firestore()
const TYPES = {
  timestamp: firebase.firestore.Timestamp,
}
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database, TYPES }
