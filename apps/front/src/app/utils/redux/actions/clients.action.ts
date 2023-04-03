import { createAsyncThunk } from '@reduxjs/toolkit'
import { Client } from '../types/clients.type'
import { ClientSearch } from '@yjcapp/app'
import { clientService } from '../../services'

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
  async (idClient: number | null) => {
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

export const handlePathClientStatus = createAsyncThunk(
  'clients/updateClientStatus',
  async (client: Partial<Client>, { rejectWithValue }) => {
    try {
      await clientService.patchSoloClient(client)
      return client
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const handlePatchClient = createAsyncThunk(
  'clients/updateClient',
  async (client: Partial<Client>, { rejectWithValue }) => {
    try {
      await clientService.patchSoloClient(client)
      return client
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
