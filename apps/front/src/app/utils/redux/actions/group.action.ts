import { createAsyncThunk } from '@reduxjs/toolkit'
import { GroupSearch } from '@yjcapp/app'
import { groupService } from '../../services'

export const handleLoadGroups = createAsyncThunk(
  'group/loadGroup',
  async (groupSearch: GroupSearch, { rejectWithValue }) => {
    try {
      return await groupService.searchGroup(groupSearch)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const handleAddGroup = createAsyncThunk(
  'group/addGroup',
  async (props: { folderName: string; targetId: number }) => {
    return props
  },
)

export const handleSelectGroup = createAsyncThunk(
  'group/selectGroup',
  async (idFolder: number | undefined) => {
    return idFolder
  },
)
