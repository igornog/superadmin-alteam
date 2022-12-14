import { createAsyncThunk } from '@reduxjs/toolkit'
import { talentService } from '../../services/talentService'
import { Talent } from '../types/talents.type'
import { TalentSearch } from '@yjcapp/app'

export const handleTalents = createAsyncThunk(
  'talents/initTalents',
  async (talentSearch: TalentSearch, { rejectWithValue }) => {
    try {
      return await talentService.searchSoloTalent(talentSearch)
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
