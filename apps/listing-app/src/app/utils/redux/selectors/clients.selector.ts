import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const getActiveClient = createDraftSafeSelector(
  [(state) => state.clients],
  ({ listClients }) => {
    return listClients[0]
  },
)
