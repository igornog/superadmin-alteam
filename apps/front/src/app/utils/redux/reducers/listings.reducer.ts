import { createSlice } from '@reduxjs/toolkit'
import { selectTeamSize } from '../actions/listing.action'
import { CreateListingState } from '../types/createListing.type'

const initialState: CreateListingState = {
  teamSize: 0,
}

const { reducer } = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectTeamSize.fulfilled, (state, { payload }) => {
        state.teamSize = payload
      })
  },
})

export default reducer
