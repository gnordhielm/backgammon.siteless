const path = require('path')

const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase-admin')

require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
}

firebase.initializeApp(config)

module.exports = firebase
