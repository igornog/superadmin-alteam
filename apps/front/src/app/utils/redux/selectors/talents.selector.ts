import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { Talent } from '../types/talents.type';

export const getActiveTalent = createDraftSafeSelector(
  [(state) => state.talents],
  ({ selectedTalent, talents }) =>
    talents.find((talent: Talent) => talent.id === selectedTalent)
);
