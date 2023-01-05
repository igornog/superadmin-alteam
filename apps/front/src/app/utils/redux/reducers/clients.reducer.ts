import { createSlice } from '@reduxjs/toolkit'
import { ClientStatus } from '@yjcapp/app'
import {
  handleClients,
  handleCreateClient,
  handlePatchClient,
  handleSelectClient,
  handlePathClientStatus,
} from '../actions/clients.action'
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

      .addCase(handleSelectClient.fulfilled, (state, { payload }) => {
        state.selectedClient = payload
      })

      .addCase(handleCreateClient.fulfilled, (state, { payload }) => {
        if (payload.status === ClientStatus.Request) {
          state.listClients.push(payload)
        }
      })

      .addCase(handlePathClientStatus.fulfilled, (state, { payload }) => {
        const { id } = payload
        state.selectedClient = null

        const clientIndex = state.listClients.findIndex(
          (client) => client.id === id,
        )

        if (clientIndex !== -1) {
          state.listClients.splice(clientIndex, 1)
        }
      })

      .addCase(handlePatchClient.fulfilled, (state, { payload }) => {
        const { id, ...rest } = payload

        const client = state.listClients.find((client) => client.id === id)

        const newObj = Object.entries(rest).reduce(
          (acc, [key, value]) =>
            value !== undefined ? { ...acc, [key]: value } : acc,
          {},
        )

        if (client) {
          const updatedTalent = { ...client, ...newObj } as any

          const talentIndex = state.listClients.indexOf(client)

          state.listClients.splice(talentIndex, 1, updatedTalent)
        }
      })
  },
})

export default reducer
