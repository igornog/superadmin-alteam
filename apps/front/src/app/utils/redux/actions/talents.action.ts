import { createAsyncThunk } from '@reduxjs/toolkit';
import { Talent } from '../types/talents.type';

export const handleTalents = createAsyncThunk(
  'talents/initTalents',
  async (talents: Talent[]) => {
    return talents;
  }
);

export const handleSelectTalent = createAsyncThunk(
  'talents/selectTalent',
  async (idTalent: number | null) => {
    return idTalent;
  }
);
