const React = require('react')
const ReactDomServer = require('react-dom/server')
const { promises: fs } = require('fs')
const { INDEX_PATH } = require('./constants')
const ReactApp = require('../build/bundle.js').default

const renderAppAtLink = async ({ linkId, linkData }) => {
  const helmetContext = {}

  let renderedApp = await fs.readFile(INDEX_PATH, 'utf8')

  ReactDomServer.renderToString(
    React.createElement(ReactApp, {
      linkData,
      helmetContext,
      pathname: `/link/${linkId}`,
    }),
  )

  const { helmet } = helmetContext

  const head = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`

  const headBrace = '</head>'
  renderedApp = renderedApp.replace(headBrace, head + headBrace)

  return renderedApp
}

module.exports = renderAppAtLink
