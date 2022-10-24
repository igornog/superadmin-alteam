import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { Page } from '../types/settings.type';

export const getActiveTab = createDraftSafeSelector(
  [(state) => state.settings],
  ({ tabs }) => tabs.find((item: Page) => item.active)
);
