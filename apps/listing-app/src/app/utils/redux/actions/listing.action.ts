import { createAsyncThunk } from '@reduxjs/toolkit'
import { listingService } from '../../services'
import { Listing } from '../types/listings.type'

export const handleCreateListing = createAsyncThunk(
  'listing/createListing',
  async (listing: Omit<Listing, 'id'>, { rejectWithValue }) => {
    try {
      return await listingService.createListing(listing)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
