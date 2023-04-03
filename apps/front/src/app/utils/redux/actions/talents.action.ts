import { createAsyncThunk } from '@reduxjs/toolkit'
import { Talent } from '../types/talents.type'
import { TalentSearch } from '@yjcapp/app'
import { talentService } from '../../services'

export const handleTalents = createAsyncThunk(
  'talents/initTalents',
  async (searchName: TalentSearch, { rejectWithValue }) => {
    try {
      return await talentService.searchSoloTalent(searchName)
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

export const handleUpdateTalent = createAsyncThunk(
  'talents/updateTalent',
  async (talent: Talent, { rejectWithValue }) => {
    try {
      return await talentService.updateSoloTalent(talent)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const handlePatchTalent = createAsyncThunk(
  'talents/updateTalent',
  async (talent: Partial<Talent>, { rejectWithValue }) => {
    try {
      await talentService.patchSoloTalent(talent)
      return talent
    } catch (err) {
      return rejectWithValue(err)
    }
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
