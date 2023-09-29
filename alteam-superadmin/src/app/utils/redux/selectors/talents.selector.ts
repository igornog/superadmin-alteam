import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { Talent } from '../types/talents.type'

export const getAllTalents = createDraftSafeSelector(
  [(state) => state.talents],
  ({ listTalents }) => {
    return listTalents
  }
)

export const getActiveTalent = createDraftSafeSelector(
  [(state) => state.talents],
  ({ selectedTalent, listTalents }) => {
    return selectedTalent !== null
      ? new Talent(
          listTalents.find((talent: Talent) => talent.id === selectedTalent),
        )
      : new Talent({})
  },
)

export const findTalent = createDraftSafeSelector(
  [(state) => state.talents, (_, idTalent) => idTalent],
  ({ listTalents }, idTalent) => {
    const talent = listTalents.filter(
      (talent: Talent) => talent.id === idTalent,
    )

    return new Talent(talent[0])
  },
)
