import { createAsyncThunk } from '@reduxjs/toolkit'
import { listingService } from '../../services/listingService'
import { Project } from '../types/listings.type'

export const handleCreateProject = createAsyncThunk(
  'listing/createProject',
  async (talent: Omit<Project, 'id'>, { rejectWithValue }) => {
    try {
      return await listingService.createProject(talent)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
