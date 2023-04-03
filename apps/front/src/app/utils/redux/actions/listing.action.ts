import { createAsyncThunk } from '@reduxjs/toolkit'
import { ListingSearch } from '@yjcapp/app'
import { listingService } from '../../services'
import { Listing } from '../types/listings.type'

export const handleInitListing = createAsyncThunk(
  'listing/initListing',
  async (clientSearch: ListingSearch, { rejectWithValue }) => {
    try {
      return await listingService.searchListing(clientSearch)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

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
