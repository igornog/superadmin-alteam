import { createSlice } from '@reduxjs/toolkit'
import { handleCollapsePanel, handleSidePanel } from '../actions/app.action'
import { AppState } from '../types/app.type'
import { StatusType } from '../types/status.type'

const initialState: AppState = {
  sidePanel: {
    isFixed: true,
    isVisible: false,
  },
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSidePanel.pending, (state) => {
        state.status = StatusType.Loading
      })
      .addCase(handleSidePanel.fulfilled, (state, { payload }) => {
        state.sidePanel.isFixed = payload
        state.status = StatusType.Succeeded
      })
      .addCase(handleSidePanel.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

      .addCase(handleCollapsePanel.fulfilled, (state, { payload }) => {
        state.sidePanel.isVisible = payload
      })
  },
})

export default reducer
