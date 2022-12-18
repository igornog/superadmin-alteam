import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const getTeamSize = createDraftSafeSelector(
  [(state) => state.listings],
  ( selectedClient ) => {
    return selectedClient
  },
)