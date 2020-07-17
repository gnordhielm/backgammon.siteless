import 'style'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import correctDomain from 'config/correctDomain'
import checkBrowserFeatures from 'config/checkBrowserFeatures'

// setup

correctDomain()
checkBrowserFeatures()

const MOUNT_NODE = document.getElementById('root')

// startup

ReactDOM.render( < App / > , MOUNT_NODE)
