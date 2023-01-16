import { createAsyncThunk } from '@reduxjs/toolkit'
import { ListingSearch } from '@yjcapp/app'
import { listingService } from '../../services/listingService'
import { Project, Team } from '../types/listings.type'

export const handleListing = createAsyncThunk(
  'listing/initListing',
  async (clientSearch: ListingSearch, { rejectWithValue }) => {
    try {
      return await listingService.searchListing(clientSearch)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const handleCreateProject = createAsyncThunk(
  'listing/createProject',
  async (project: Omit<Project, 'id'>, { rejectWithValue }) => {
    try {
      return await listingService.createProject(project)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const handleCreateTeam = createAsyncThunk(
  'listing/createTeam',
  async (team: Omit<Team, 'id'>, { rejectWithValue }) => {
    try {
      return await listingService.createTeam(team)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
