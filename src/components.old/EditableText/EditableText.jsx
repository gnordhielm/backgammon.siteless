import React from 'react'
import { makeClassName } from '@scriptless/util'
import rootClassName from './EditableText.style'
import Input from '@scriptless/input'

const EditableText = ({ value = '', onChange, className, autoFocus }) => {
  const measurementInputRef = React.useRef(null)

  const [inputWidth, setInputWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    if (!measurementInputRef.current) return
    setInputWidth(measurementInputRef.current.getBoundingClientRect().width + 3)
  }, [value])

  return (
    <div
      className={makeClassName(rootClassName, className)}
      style={{ width: Math.max(50, inputWidth) }}
    >
      <Input.String autoFocus={autoFocus} value={value} onChange={onChange} />
      {/* reference for measuring text width */}
      <span
        tabIndex={-1}
        readOnly
        ref={measurementInputRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 'auto',
          width: 'auto',
          minWidth: 0,
          whiteSpace: 'nowrap',
          fontSize: 'inherit',
          fontFamily: 'inherit',
        }}
      >
        {/* TODO: . is an approximation of how wide a space is, real spaces will get cut off */}
        {value.split(' ').join('.')}
      </span>
    </div>
  )
}

EditableText.displayName = 'EditableText'

export default EditableText
