import { createAsyncThunk } from '@reduxjs/toolkit'
import { Client } from '../types/clients.type'
import { clientService } from '../../services'

export const handleSetClientName = createAsyncThunk(
  'clients/setClientName',
  async (clientName: string) => {
    return clientName
  },
)

export const handleCreateClient = createAsyncThunk(
  'clients/createClient',
  async (client: Client, { rejectWithValue }) => {
    try {
      return await clientService.createClient(client)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

