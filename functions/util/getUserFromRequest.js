const admin = require('firebase-admin')

// https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.

const getUserFromRequest = async (req, res, next) => {
  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else if (req.cookies) {
    idToken = req.cookies.__session
  }

  if (!idToken) {
    console.log('> no authentication resolved from request')
    next()
    return
  }

  let user
  try {
    user = await admin.auth().verifyIdToken(idToken)
  } catch (error) {
    console.error('> could not verify Firebase ID token', error)
    next()
    return
  }

  req.user = user
  next()
  return
}

module.exports = getUserFromRequest
