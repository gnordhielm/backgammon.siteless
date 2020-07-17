import { database, TYPES } from 'config/firebase'
import { RETRO_PHASES, LINK_TYPES } from 'config/constants'
import getCardsInScope from 'util/getCardsInScope'
import _uniq from 'lodash/uniq'

export const createRetro = async ({ user, title = 'Untitled retro' }) => {
  const newRetro = {
    title,
    memberUserIds: [],
    createdByUserId: user.id,
    createdAt: TYPES.timestamp.fromDate(new Date()),
    phase: RETRO_PHASES.stage.key,
  }

  const newRetroRef = await database.collection('retros').add(newRetro)

  const joinLink = {
    createdByUserName: user.handle,
    retroCreatedAt: newRetro.createdAt,
    retroId: newRetroRef.id,
    retroTitle: newRetro.title,
    type: LINK_TYPES.invitation,
  }

  const joinLinkRef = await database.collection('links').add(joinLink)

  await newRetroRef.set(
    {
      joinLinkId: joinLinkRef.id,
    },
    { merge: true },
  )

  return newRetroRef
}

export const setRetroMemberUserIds = async ({ memberUserIds, retroId }) => {
  const updatedRetroRef = await database
    .collection('retros')
    .doc(retroId)
    .set({ memberUserIds }, { merge: true })

  return updatedRetroRef
}

export const addUserToRetro = async ({ retroId, userId }) => {
  const retroRef = await database.collection('retros').doc(retroId)

  const existingMembers = (await retroRef.get()).data().memberUserIds

  const newMembers = _uniq([...existingMembers, userId])

  await retroRef.set({ memberUserIds: newMembers }, { merge: true })
}

export const setRetroTitle = async ({ title, retroId }) => {
  const updatedRetroRef = await database.collection('retros').doc(retroId)

  await updatedRetroRef.set({ title }, { merge: true })

  const joinLinkId = (await updatedRetroRef.get()).data().joinLinkId

  const joinLinkRef = await database.collection('links').doc(joinLinkId)

  await joinLinkRef.set({ retroTitle: title }, { merge: true })

  return updatedRetroRef
}

export const setRetroPhase = async ({ phase, retroId }) => {
  const updates = { phase }

  const updatedRetroRef = await database.collection('retros').doc(retroId)

  switch (phase) {
    case RETRO_PHASES.resolve.key: {
      const retro = await updatedRetroRef.get()
      const retroData = retro.data()

      if (retroData.phase === RETRO_PHASES.vote.key) {
        const cards = await updatedRetroRef
          .collection('cards')
          .get()
          .then(collectionSnapshot => {
            const result = {}
            collectionSnapshot.forEach(doc => {
              result[doc.id] = doc.data()
            })
            return result
          })
        updates.cardsInScope = getCardsInScope(cards)
      }
      break
    }
    case RETRO_PHASES.complete.key: {
      updates.completedAt = TYPES.timestamp.fromDate(new Date())
      break
    }
    default:
      break
  }

  updatedRetroRef.set(updates, { merge: true })

  return updatedRetroRef
}

export const createCard = async ({ userId, retroId, body, columnId }) => {
  const newCard = {
    columnId,
    body,
    createdByUserId: userId,
    createdAt: TYPES.timestamp.fromDate(new Date()),
  }

  const newCardRef = await database
    .collection('retros')
    .doc(retroId)
    .collection('cards')
    .add(newCard)

  return newCardRef
}

export const removeCard = async ({ retroId, cardId }) => {
  return await database
    .collection('retros')
    .doc(retroId)
    .collection('cards')
    .doc(cardId)
    .delete()
}

export const moveCard = async ({ retroId, cardId, moveToColumnId }) => {
  const movedCardRef = await database
    .collection('retros')
    .doc(retroId)
    .collection('cards')
    .doc(cardId)
    .set(
      {
        columnId: moveToColumnId,
        createdAt: TYPES.timestamp.fromDate(new Date()),
      },
      { merge: true },
    )

  return movedCardRef
}

export const deleteRetro = async retroId => {
  await database
    .collection('retros')
    .doc(retroId)
    .delete()
}

export const setUserVotes = async ({ retroId, userId, voteCount, cardId }) => {
  const cardRef = await database
    .collection('retros')
    .doc(retroId)
    .collection('cards')
    .doc(cardId)

  const card = await cardRef.get()

  const data = card.data()

  const existingVotes = data.votes || {}

  await cardRef.set(
    {
      votes: {
        ...existingVotes,
        [userId]: voteCount,
      },
    },
    { merge: true },
  )

  return cardRef
}

export const mergeCards = async ({
  mergeDestination,
  mergeOrigin,
  retroId,
}) => {
  const originCardRef = await database
    .collection('retros')
    .doc(retroId)
    .collection('cards')
    .doc(mergeOrigin)

  const originCard = await originCardRef.get()
  const { mergedCards: originMergedCards = [], ...originCardData } = {
    id: mergeOrigin,
    ...originCard.data(),
  }

  const destinationCardRef = await database
    .collection('retros')
    .doc(retroId)
    .collection('cards')
    .doc(mergeDestination)

  const destinationCard = await destinationCardRef.get()
  const destinationCardData = destinationCard.data()

  await destinationCardRef.set(
    {
      mergedCards: [
        ...(destinationCardData.mergedCards || []),
        originCardData,
        ...originMergedCards,
      ],
    },
    { merge: true },
  )

  await originCardRef.delete()

  return destinationCardRef
}

export const addCardToScope = async ({ retroId, cardId }) => {
  const retroRef = await database.collection('retros').doc(retroId)

  const retro = await retroRef.get()

  const { cardsInScope = [] } = retro.data()

  await retroRef.set(
    {
      cardsInScope: [...cardsInScope, cardId],
    },
    { merge: true },
  )
}

export const removeCardFromScope = async ({ retroId, cardId }) => {
  const retroRef = await database.collection('retros').doc(retroId)

  const retro = await retroRef.get()

  const { cardsInScope = [] } = retro.data()

  await retroRef.set(
    {
      cardsInScope: cardsInScope.filter(id => id !== cardId),
    },
    { merge: true },
  )
}

export const createActionItem = async ({ retroId, body }) => {
  const newActionItem = {
    body,
    createdAt: TYPES.timestamp.fromDate(new Date()),
  }

  const newActionItemRef = await database
    .collection('retros')
    .doc(retroId)
    .collection('actionItems')
    .add(newActionItem)

  return newActionItemRef
}

export const removeActionItem = async ({ retroId, itemId }) => {
  await database
    .collection('retros')
    .doc(retroId)
    .collection('actionItems')
    .doc(itemId)
    .delete()
}

// shape is
// didFinishShare

export const writeInteractionState = async ({ userId, retroId, changes }) => {
  const interactionRef = await database
    .collection('retros')
    .doc(retroId)
    .collection('userInteractionState')
    .doc(userId)

  await interactionRef.set(changes, { merge: true })
}
