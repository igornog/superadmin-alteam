import { createAsyncThunk } from '@reduxjs/toolkit'

export const handleClients = createAsyncThunk(
  'clients/initClients',
  async (clients: any) => {
    return clients
  },
)
