import { createAsyncThunk } from '@reduxjs/toolkit'
import { talentService } from '../../services/talentService'
import { Talent } from '../types/talents.type'

export const handleTalents = createAsyncThunk(
  'talents/initTalents',
  async (_, { rejectWithValue }) => {
    try {
      return await talentService.searchSoloTalent({})
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const handleCreateTalent = createAsyncThunk(
  'talents/createTalent',
  async (talent: Omit<Talent, 'id'>, { rejectWithValue }) => {
    try {
      return await talentService.createSoloTalent(talent)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const handleSelectTalent = createAsyncThunk(
  'talents/selectTalent',
  async (idTalent: string | null) => {
    return idTalent
  },
)

export const handleShortlistTalent = createAsyncThunk(
  'talents/shortlistTalent',
  async () => {
    return true
  },
)
