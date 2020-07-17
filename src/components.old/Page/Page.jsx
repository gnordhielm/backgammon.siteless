import React from 'react'
import styleClassName from './Page.style'
import { makeClassName } from '@scriptless/util'

const Page = ({ children, className, ...rest }) => (
  <div className={makeClassName(styleClassName.root, className)} {...rest}>
    {children}
  </div>
)

Page.displayName = 'Page'

Page.Bar = ({ children, className, nudge = false, ...rest }) => (
  <div
    className={makeClassName(
      styleClassName.bar,

      nudge && '--nudge',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)

Page.Fill = ({
  children,
  className,
  nudge = false,
  centerVertical = false,
  centerHorizontal = false,
  ...rest
}) => (
  <div
    className={makeClassName(
      styleClassName.fill,
      nudge && '--nudge',
      centerVertical && '--center-vertical',
      centerHorizontal && '--center-horizontal',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)

export default Page
