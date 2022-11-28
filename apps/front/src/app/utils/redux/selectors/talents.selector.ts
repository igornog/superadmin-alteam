import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { Talent } from '../types/talents.type'

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
