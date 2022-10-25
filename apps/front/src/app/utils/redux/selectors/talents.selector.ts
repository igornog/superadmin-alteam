import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { Talent } from '../types/talents.type';

export const getActiveTalent = createDraftSafeSelector(
  [(state) => state.talents],
  ({ selectedTalent, listTalents }) =>
    listTalents.find((talent: Talent) => talent.id === selectedTalent)
);
