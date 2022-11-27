import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { tabsContent } from '../../../features/talents'
import { Page } from '../types/settings.type'

export const getActiveTab: any = createDraftSafeSelector(
  [(state) => state.settings],
  ({ tabs }) => {
    const findTab = tabs.find((item: Page) => item.active)

    return {
      config: findTab,
      content: tabsContent[findTab?.title as keyof typeof tabsContent],
    }
  },
)
