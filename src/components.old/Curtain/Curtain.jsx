import React from 'react'
import { makeClassName } from '@scriptless/util'
import rootClassName from './Curtain.style'
import Modal from 'react-modal'
import Page from 'components/Page'
import Action from 'components/Action'

const Curtain = ({ onClose, isOpen = false, children, className }) => {
  // TODO: it's possible to animate close and lazy load by returning null after the animate timeout
  // const renderedChildren = isOpen ? children() : null

  return (
    <Modal
      overlayClassName={rootClassName.overlay}
      className={rootClassName.content}
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={400}
    >
      <Page className="__page">
        <Page.Bar className="__bar">
          <Action onClick={onClose}>Close</Action>
        </Page.Bar>
        <Page.Fill className={makeClassName('__fill', className)}>
          {children()}
        </Page.Fill>
      </Page>
    </Modal>
  )
}

Curtain.displayName = 'Curtain'

export default Curtain
