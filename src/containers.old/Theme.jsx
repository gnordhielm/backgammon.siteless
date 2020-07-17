import React from 'react'
import useUser from 'hooks/useUser'
import setTheme from 'util/setTheme'
import { noop } from 'lodash'

const injectStyles = cssTemplateString => {
  const styleTag = document.createElement('style')
  styleTag.innerHTML = cssTemplateString
  document.body.appendChild(styleTag)
  return () => {
    try {
      document.body.removeChild(styleTag)
    } catch (error) {}
  }
}

const Theme = () => {
  const user = useUser() || {}

  const isInitialRenderRef = React.useRef(true)

  React.useLayoutEffect(() => {
    const extractStyles = isInitialRenderRef.current
      ? noop
      : injectStyles(`
      html,
      html *,
      html *:before,
      html *:after {
        transition: all 500ms !important;
        transition-delay: 0ms !important;
      }
    `)
    // transition delay must contain units

    let didExtract = false

    const timeout = setTimeout(() => {
      extractStyles()
      didExtract = true
    }, 500)

    setTheme(user.prefersLightMode)

    isInitialRenderRef.current = false

    return () => {
      clearTimeout(timeout)

      if (!didExtract) extractStyles()
    }
  }, [user.prefersLightMode])

  return null
}

export default Theme
