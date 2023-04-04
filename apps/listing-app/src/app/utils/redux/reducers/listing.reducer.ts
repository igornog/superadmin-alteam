import { createSlice } from '@reduxjs/toolkit'
import {
  handleCreateListing,
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
      .addCase(handleCreateListing.fulfilled, (state, { payload }) => {
        state.listListings.push(payload)
      })
  },
})

export default reducer
