import { createAsyncThunk } from '@reduxjs/toolkit'
import { listingService } from '../../services'
import { Listing } from '../types/listings.type'
import { ClientListing, ListingSearch } from '@yjcapp/app'

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

export const handleSelectListing = createAsyncThunk(
  'listings/selectListing',
  async (listingId: number) => {
    return listingId
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

export const handleUpdateListing = createAsyncThunk(
  'listing/updateListing',
  async (listing: Partial<ClientListing>, { rejectWithValue }) => {
    try {
      return await listingService.updateListing(listing)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
