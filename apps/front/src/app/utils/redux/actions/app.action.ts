import { createAsyncThunk } from '@reduxjs/toolkit'

export const handleSidePanel = createAsyncThunk(
  'app/sidePanel',
  async (status: boolean) => {
    return status
  },
)

export const handleCollapsePanel = createAsyncThunk(
  'app/collapsePanel',
  async (status: boolean) => {
    return status
  },
)

export const handleInitPage = createAsyncThunk('app/initPage', async () => {
  return
})
