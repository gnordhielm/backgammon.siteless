import React from 'react'
// https://github.com/bsidelinger912/react-tooltip-lite
import LibraryTooltip from 'react-tooltip-lite'

import rootClassName from './Tooltip.style'

const Tooltip = ({ className, children, content, direction = 'down' }) => {
  return (
    <LibraryTooltip
      content={<div className={rootClassName}>{content}</div>}
      direction={direction}
      tagName="div"
      hoverDelay={50}
      className={className}
      arrowSize={2}
      padding="0px"
    >
      {children}
    </LibraryTooltip>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
