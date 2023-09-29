import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { Page } from '../types/settings.type'

export const getActiveTab: any = createDraftSafeSelector(
  [(state) => state.settings],
  ({ tabs }) => {
    return tabs.find((item: Page) => item.active)
  },
)
