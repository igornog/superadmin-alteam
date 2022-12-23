import { createAsyncThunk } from '@reduxjs/toolkit'
import { clientService } from '../../services/clientService'
import { Client } from '../types/clients.type'
import { ClientSearch } from '@yjcapp/app'

export const handleClients = createAsyncThunk(
  'clients/initClients',
  async (clientSearch: ClientSearch, { rejectWithValue }) => {
    try {
      return await clientService.searchClient(clientSearch)
    } catch (error) {
      return rejectWithValue(error)
    }
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
