import { createSlice } from '@reduxjs/toolkit'
import { ClientStatus } from '@yjcapp/app'
import { handleCreateClient, handleSetClientName } from '../actions/clients.action'
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
