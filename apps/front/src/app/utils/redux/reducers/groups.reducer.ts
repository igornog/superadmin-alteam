import { createSlice } from '@reduxjs/toolkit'
import {
  handleAddGroup,
  handleLoadGroups,
  handleSelectGroup,
} from '../actions/group.action'
import { StatusType } from '../types/status.type'
import { v4 as uuidv4 } from 'uuid'
import { handleInitPage } from '../actions/app.action'
import { GroupState } from '../types/groups.type'
import { searchGroup } from '../selectors/group.selector'

const initialState: GroupState = {
  data: {
    id: '',
    name: '',
    children: [],
  },
  selectedGroup: undefined,
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLoadGroups.pending, (state) => {
        state.status = StatusType.Loading
      })
      .addCase(handleLoadGroups.fulfilled, (state, { payload }) => {
        state.data = payload
        state.status = StatusType.Succeeded
      })
      .addCase(handleLoadGroups.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

      .addCase(handleAddGroup.fulfilled, (state, { payload }) => {
        const currentNode = searchGroup(state.data, payload.targetId)

        if (!Object.prototype.hasOwnProperty.call(currentNode, 'children')) {
          currentNode.children = []
        }

        currentNode.children.push({
          id: uuidv4(),
          idParent: payload.targetId,
          name: payload.folderName,
        })
      })

      .addCase(handleSelectGroup.pending, (state) => {
        state.status = StatusType.Loading
      })

      .addCase(handleSelectGroup.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded
        state.selectedGroup = payload
      })

      .addCase(handleInitPage.fulfilled, (state) => {
        state.selectedGroup = undefined
      })
  },
})

export default reducer
