import { createSlice } from '@reduxjs/toolkit'
import { handleCreateListing, handleInitListing, handleSelectListing, handleUpdateListing } from '../actions/listing.action'
import { ListingsState } from '../types/listings.type'
import { StatusType } from '../types/status.type'

const initialState: ListingsState = {
  listListings: [],
  selectedListing: null,
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'listings',
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

    .addCase(handleSelectListing.fulfilled, (state, { payload }) => {
      state.selectedListing = payload
    })

    .addCase(handleCreateListing.fulfilled, (state, { payload }) => {
      state.listListings.push(payload)
    })

    .addCase(handleUpdateListing.fulfilled, (state, { payload }) => {
      const { id, ...rest } = payload
      const listing = state.listListings.find((listing) => listing.id === id)
      const newObj = Object.entries(rest).reduce(
        (acc, [key, value]) =>
          value !== undefined ? { ...acc, [key]: value } : acc,
        {},
      )

      if (listing) {
        const updateListing = { ...listing, ...newObj } as any
        const talentIndex = state.listListings.indexOf(listing)
        state.listListings.splice(talentIndex, 1, updateListing)
      }
    })
    
  },
})

export default reducer
