import { createAsyncThunk } from '@reduxjs/toolkit'
import { Client } from '../types/clients.type'
import { ClientSearch, SoloClient } from '@yjcapp/app'
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

export const handlePatchClientStatus = createAsyncThunk(
  'clients/updateClientStatus',
  async (client: SoloClient, { rejectWithValue }) => {
    try {
      await clientService.updateSoloClient(client)
      return client
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const handlePatchClient = createAsyncThunk(
  'clients/updateClient',
  async (client: Partial<SoloClient>, { rejectWithValue }) => {
    try {
      await clientService.updateSoloClient(client)
      return client
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const handleDeleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id: number, { rejectWithValue }) => {
    try {
      await clientService.deleteClient(id)
      return id
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
