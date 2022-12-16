import { createSlice } from '@reduxjs/toolkit'
import { handleInitPage } from '../actions/app.action'
import {
  handleCreateTalent,
  handlePatchTalent,
  handleSelectTalent,
  handleTalents,
} from '../actions/talents.action'
import { StatusType } from '../types/status.type'
import { TalentsState } from '../types/talents.type'

const initialState: TalentsState = {
  listTalents: [],
  selectedTalent: null,
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'talents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleTalents.pending, (state) => {
        state.status = StatusType.Loading
      })
      .addCase(handleTalents.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded
        state.listTalents = payload
      })
      .addCase(handleTalents.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

      .addCase(handleCreateTalent.fulfilled, (state, { payload }) => {
        state.listTalents.push(payload)
      })

      .addCase(handlePatchTalent.fulfilled, (state, { payload }) => {
        const index = state.listTalents.findIndex(
          (talent) => talent.id === payload.id,
        )

        if (payload.skills) {
          state.listTalents[index].skills = payload.skills
        }
      })

      .addCase(handleSelectTalent.fulfilled, (state, { payload }) => {
        state.selectedTalent = payload
      })

      .addCase(handleInitPage.fulfilled, (state) => {
        state.selectedTalent = null
      })
  },
})

export default reducer
