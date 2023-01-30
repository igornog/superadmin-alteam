import { createAsyncThunk } from '@reduxjs/toolkit'
import { GroupSearch } from '@yjcapp/app'
import { groupService } from '../../services'
import { Group } from '../types/groups.type'

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
  async (props: { folderName: string; targetId?: number }) => {
    const data = await groupService.createGroup({
      name: props.folderName,
      parent: props.targetId ? new Group({ id: props.targetId }) : null,
    })

    return { data, targetId: props.targetId }
  },
)

export const handleSelectGroup = createAsyncThunk(
  'group/selectGroup',
  async (props: { idFolder: number | undefined; goBack?: boolean }) => {
    return props
  },
)
