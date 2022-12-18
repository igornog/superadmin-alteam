import { createAsyncThunk } from '@reduxjs/toolkit'

export const selectTeamSize = createAsyncThunk(
  'createListing/selectTeamSize',
  async (teamSize: number | null) => {
    return teamSize
  },
)
