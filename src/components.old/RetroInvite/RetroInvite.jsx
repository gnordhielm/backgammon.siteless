import React from 'react'
import Tooltip from '../Tooltip/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { makeLink } from 'services/link'
import Button from '../Button/Button'
import { makeClassName } from '@scriptless/util'
import copy from 'copy-to-clipboard'
import Action from '../Action/Action'
import rootClassName from './RetroInvite.style'

const RetroInvite = ({ className, retro }) => {
  const joinLink = makeLink(retro.joinLinkId)
  return (
    <Tooltip
      className={makeClassName(rootClassName.base, className)}
      content={
        <div className={rootClassName.tooltip}>
          <div className="__instructions">
            New members can join by visiting this link.
          </div>
          <div className="__link">
            {joinLink}{' '}
            <Action
              onClick={() => {
                copy(joinLink)
              }}
            >
              Copy
            </Action>
          </div>
        </div>
      }
    >
      <Button>
        <AddIcon className="_icon" />
        {retro.memberUserIds.length <= 0 && <>&ensp;Invite members</>}
      </Button>
    </Tooltip>
  )
}

RetroInvite.displayName = 'RetroInvite'

export default RetroInvite
