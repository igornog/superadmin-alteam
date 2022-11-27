import { createAsyncThunk } from '@reduxjs/toolkit'

export const handleTalents = createAsyncThunk(
  'talents/initTalents',
  async (talents: any) => {
    return talents
  },
)

export const handleSelectTalent = createAsyncThunk(
  'talents/selectTalent',
  async (idTalent: number | null) => {
    return idTalent
  },
)

export const handleShortlistTalent = createAsyncThunk(
  'talents/shortlistTalent',
  async () => {
    return true
  },
)
