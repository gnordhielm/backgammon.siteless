import React from 'react'
import { makeClassName } from '@scriptless/util'
import rootClassName from './Action.style'

const Action = ({
  text,
  onClick,
  isLoading,
  isDisabled,
  className,
  standalone,
  children,
  confirmMessage,
  faded = false,
  ...rest
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
    <span
      className={makeClassName(
        rootClassName,
        className,
        standalone && '--standalone',
        faded && '--faded',
      )}
      onClick={handleClick}
      {...rest}
    >
      {children || text}
    </span>
  )
}

Action.displayName = 'Action'

export default Action
