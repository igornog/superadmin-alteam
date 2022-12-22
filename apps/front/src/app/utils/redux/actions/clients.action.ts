import { createAsyncThunk } from '@reduxjs/toolkit'
import { clientService } from '../../services/clientService'
import { Client } from '../types/clients.type'

export const handleClients = createAsyncThunk(
  'clients/initClients',
  async (clients: any) => {
    return clients
  },
)

export const handleSelectClient = createAsyncThunk(
  'talents/selectClient',
  async (idClient: string | null) => {
    return idClient
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
