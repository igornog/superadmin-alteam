import { createSlice } from '@reduxjs/toolkit'
import { ClientStatus } from '@yjcapp/app'
import {
  handleClients,
  handleCreateClient,
  handleSetClientName,
} from '../actions/clients.action'
import { ClientsState } from '../types/clients.type'
import { StatusType } from '../types/status.type'

const initialState: ClientsState = {
  listClients: [],
  currentClient: '',
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
      .addCase(handleCreateClient.fulfilled, (state, { payload }) => {
        if (payload.status === ClientStatus.Request) {
          state.listClients.push(payload)
        }
      })
      .addCase(handleSetClientName.fulfilled, (state, { payload }) => {
        state.currentClient = payload
      })
  },
})

export default reducer
