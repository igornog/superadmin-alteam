import { createAsyncThunk } from '@reduxjs/toolkit'
import { ClientProject } from '@yjcapp/app'
import { listingService } from '../../services/listingService'

export const handleCreateProject = createAsyncThunk(
  'listing/createProject',
  async (talent: Omit<ClientProject, 'id'>, { rejectWithValue }) => {
    try {
      return await listingService.createProject(talent)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
