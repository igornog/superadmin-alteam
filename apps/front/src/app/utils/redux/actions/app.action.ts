import { createAsyncThunk } from '@reduxjs/toolkit'
import { RightClick } from '../../types'

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
  return true
})

export const handleTalentRightClick = createAsyncThunk(
  'app/talentRightClicks',
  async (rightClicks: RightClick[]) => {
    return rightClicks
  },
)

export const handleClientRightClick = createAsyncThunk(
  'app/clientRightClicks',
  async (rightClicks: RightClick[]) => {
    return rightClicks
  },
)
