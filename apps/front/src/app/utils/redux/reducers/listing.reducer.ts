import { createSlice } from '@reduxjs/toolkit'
import {
  handleCreateListing,
  handleInitListing,
} from '../actions/listing.action'
import { ListingsState } from '../types/listings.type'
import { StatusType } from '../types/status.type'

const initialState: ListingsState = {
  listListings: [],
  selectedListing: null,
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleInitListing.pending, (state) => {
        state.status = StatusType.Loading
      })
      .addCase(handleInitListing.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded
        state.listListings = payload
      })
      .addCase(handleInitListing.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

      .addCase(handleCreateListing.fulfilled, (state, { payload }) => {
        state.listListings.push(payload)
      })
  },
})

export default reducer
