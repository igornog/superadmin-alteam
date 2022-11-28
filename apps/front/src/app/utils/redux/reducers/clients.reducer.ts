import { createSlice } from '@reduxjs/toolkit'
import { handleClients } from '../actions/clients.action'
import { ClientsState } from '../types/clients.type'
import { StatusType } from '../types/status.type'

const initialState: ClientsState = {
  listClients: [],
  selectedClient: null,
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleClients.pending, (state) => {
        state.status = StatusType.Loading
      })
      .addCase(handleClients.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded
        state.listClients = payload
      })
      .addCase(handleClients.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

    //   .addCase(handleSelectTalent.fulfilled, (state, { payload }) => {
    //     state.selectedTalent = payload;
    //   })
  },
})

export default reducer
