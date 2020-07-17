const fs = require('fs').promises
const express = require('express')
const cookieParser = require('cookie-parser')()
const renderAppAtLink = require('../util/renderAppAtLink')
const firebase = require('../firebase')
const { INDEX_PATH } = require('../util/constants')

const cors = require('cors')({ origin: true })
const app = express()

// middleware

app.use(cors)
app.use(cookieParser)

// firebase will handle static assets in build automatically, no need for express static

app.use('/link/:linkId', async (req, res, next) => {
  const { linkId } = req.params

  if (!linkId) return next()

  let linkData
  try {
    const linkRef = await firebase
      .firestore()
      .collection('links')
      .doc(linkId)

    linkData = (await linkRef.get()).data()
  } catch (error) {
    console.error('> failed to retrieve link', error)
  }

  if (!linkData) return next()

  let renderedApp

  try {
    renderedApp = await renderAppAtLink({ linkId, linkData })
  } catch (error) {
    console.error('> failed to render app at link', error)
  }

  if (!renderedApp) return next()
  return res.send(renderedApp)
})

app.use('**', async (req, res) => {
  try {
    const clientApp = await fs.readFile(INDEX_PATH, 'utf8')
    return res.send(clientApp)
  } catch (error) {
    console.error('> failed to send app files', error)
    return res.status(500).end()
  }
})

module.exports = app
