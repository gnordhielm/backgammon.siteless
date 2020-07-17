import React from 'react'
import className from './Loader.style'
import { uniqueId } from 'lodash'

// DEV: if you add a message prop, just render it in a portal - don't risk setting inner html

let loaderElement = { style: {} }
if (document) {
  loaderElement = document.createElement('div')
  loaderElement.className = className
  loaderElement.innerHTML = '<div class="__line-spinner"></div>'
  loaderElement.style.zIndex = -1
  loaderElement.style.visibility = 'hidden'
  document.body.appendChild(loaderElement)
}

let timeout
const showLoader = () => {
  clearTimeout(timeout)
  loaderElement.style.zIndex = 10
  loaderElement.style.visibility = 'visible'
}

const hideLoader = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    loaderElement.style.zIndex = -1
    loaderElement.style.visibility = 'hidden'
  }, 200)
}

const HOLD = 'HOLD'
const mountMap = {}

const Loader = () => {
  React.useEffect(() => {
    const key = uniqueId()
    mountMap[key] = HOLD
    return () => {
      delete mountMap[key]
    }
  })

  React.useEffect(() => {
    const shouldShow = Object.values(mountMap).some(item => item === HOLD)
    if (shouldShow) showLoader()
    return () => {
      const shouldHide = Object.values(mountMap).every(item => item !== HOLD)
      if (shouldHide) hideLoader()
    }
  })

  return null
}

export default Loader
