require('./firebase')

const functions = require('firebase-functions')
const link = require('./src/link')

exports.link = functions.https.onRequest(link)
