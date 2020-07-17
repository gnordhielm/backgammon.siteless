import React from 'react'
import { makeClassName } from '@scriptless/util'
import rootClassName from './Button.style'

const Button = ({
  text,
  children,
  onClick,
  isLoading,
  isDisabled,
  confirmMessage,
  faded = false,
}) => {
  const allowClick = !(isLoading || isDisabled)

  const handleClick = event => {
    if (
      onClick &&
      allowClick &&
      (!confirmMessage || window.confirm(confirmMessage))
    )
      onClick(event)
  }

  return (
    <div
      className={makeClassName(
        rootClassName,
        isLoading && '--loading',
        isDisabled && '--disabled',
        faded && '--faded',
      )}
      tabIndex="0"
      onClick={handleClick}
    >
      {text || children}
    </div>
  )
}

Button.displayName = 'Button'

export default Button
