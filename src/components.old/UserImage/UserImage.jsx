import React from 'react'
import { makeClassName } from '@scriptless/util'
import cssClassName from './UserImage.style'
import theme from 'style/theme'

const FallbackImage = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    height="100%"
    width="100%"
  >
    <path
      d="M12,2c-1.81,0-3.51,0.48-4.98,1.33l2.71,2.71C10.28,5.4,11.09,5,12,5c1.66,0,3,1.34,3,3c0,0.91-0.4,1.72-1.04,2.27
	l6.71,6.71C21.52,15.51,22,13.81,22,12C22,6.48,17.52,2,12,2z"
    />
    <path
      d="M19.6,18.5l-1.99-1.99l-3.27-3.27L9.01,7.91L5.5,4.4L4.1,3L2.83,4.27l1.42,1.42C2.84,7.41,2,9.61,2,12c0,5.52,4.48,10,10,10
	c2.39,0,4.59-0.84,6.31-2.25L19.56,21l1.27-1.27L19.6,18.5z M12,19.2c-2.5,0-4.71-1.28-6-3.22c0.03-1.83,3.38-2.9,5.48-3.06
	l4.83,4.83C15.11,18.67,13.61,19.2,12,19.2z"
    />
  </svg>
)

const UserImage = React.forwardRef(({ src, size = 40, className }, ref) => (
  <div
    ref={ref}
    className={makeClassName(cssClassName, className, !src && '--empty')}
    style={{
      width: size,
      height: size,
    }}
    title={src ? undefined : 'This user no longer exists.'}
  >
    {src ? (
      <div
        style={{
          width: size,
          height: size,
          background: `${theme.actionColor}`,
          filter: 'brightness(1.3)',
        }}
      >
        <div
          style={{
            background: `url(${src})`,
            backgroundSize: 'cover',
            filter: 'grayscale(80%)',
            mixBlendMode: 'soft-light',
            width: size,
            height: size,
          }}
        />
      </div>
    ) : (
      <FallbackImage />
    )}
  </div>
))

UserImage.displayName = 'UserImage'

export default UserImage
