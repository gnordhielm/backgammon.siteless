import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import useLogOut from 'hooks/useLogOut'
import { makeClassName } from '@scriptless/util'
import Action from 'components/Action'
import { VERSION_HASH, AUTHOR_LINK } from 'config/constants'
import Curtain from 'components/Curtain/Curtain'
import className from './GlobalToolbar.style'
import useAppSafeBack from 'hooks/useAppSafeBack'

const FOOTER_ITEMS = [
  // <Link to="/terms-of-use" target="_blank" rel="noopener noreferrer">
  //   Terms of Use
  // </Link>,
  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
    Privacy Policy
  </Link>,
  <span>
    Built by{' '}
    <a href={AUTHOR_LINK} target="_blank" rel="noopener noreferrer">
      Gus
    </a>
  </span>,
  <span>Build {VERSION_HASH}</span>,
]

const GlobalToolbar = ({
  history,
  match,
  title,
  offerBack = false,
  contextActions = null,
}) => {
  const logOut = useLogOut()

  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (!menuIsOpen) return

    const handleKeyPress = event => {
      if (event.key === 'Escape') setMenuIsOpen(false)
    }

    if (document && document.addEventListener)
      document.addEventListener('keydown', handleKeyPress)

    return () => {
      if (document && document.removeEventListener)
        document.removeEventListener('keydown', handleKeyPress)
    }
  }, [menuIsOpen])

  const makeNavigateTo = React.useCallback(
    to => () => {
      setMenuIsOpen(false)
      history.push(to)
    },
    [history],
  )

  const appSafeBack = useAppSafeBack()

  return (
    <>
      <Curtain
        isOpen={menuIsOpen}
        onClose={() => {
          setMenuIsOpen(false)
        }}
      >
        {() => (
          <div
            className={makeClassName(className.curtain, menuIsOpen && '--open')}
          >
            <div className="__main">
              <Action
                className="__action"
                standalone
                onClick={logOut}
                text="Sign Out"
              />
              {(match || {}).path !== '/account-settings' && (
                <Action
                  className="__action"
                  standalone
                  onClick={makeNavigateTo('/account-settings')}
                  text="Settings"
                />
              )}
            </div>
            <div className="__footer">
              {/* DEV: ensures each element is separately selectable */}
              {FOOTER_ITEMS.map((content, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="__divider">•</span>}
                  <span>{content}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </Curtain>

      <div className={className.base}>
        {offerBack && (
          <div className="__left">
            <Action
              onClick={() => {
                appSafeBack()
              }}
              text="Back"
            />
          </div>
        )}
        <span className={makeClassName('__title', offerBack && '--centered')}>
          {title}
        </span>
        <div className="__right">
          {contextActions}
          <Action
            onClick={() => {
              setMenuIsOpen(old => !old)
            }}
          >
            Menu
          </Action>
        </div>
      </div>
    </>
  )
}

GlobalToolbar.propTypes = {}

export default withRouter(GlobalToolbar)
