import { createSlice } from '@reduxjs/toolkit'
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
    // builder.addCase(handleListing.fulfilled, (state, { payload }) => {
    //   console.log(payload[0]?.skills)
    // })
  },
})

export default reducer
