import { createAsyncThunk } from '@reduxjs/toolkit'

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
