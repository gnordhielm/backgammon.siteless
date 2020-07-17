import { META_INFO } from 'config/fallbacks'

const typeMapLookup = {
  RETRO_INVITATION: ({
    retroId,
    retroCreatedAt,
    createdByUserName,
    retroTitle,
  }) => ({
    title: 'Join',
    description: "You've been invited to join a new retro.",
    primaryData: {
      title: 'Retro',
      data: retroTitle,
    },
    secondaryData: {
      title: 'Created by',
      data: createdByUserName,
    },
  }),
}

const makeMetaPropsFromLink = ({ type, data = {} }) => ({
  ...META_INFO,
  ...(typeof typeMapLookup[type] === 'function'
    ? typeMapLookup[type](data)
    : data),
})

export default makeMetaPropsFromLink
