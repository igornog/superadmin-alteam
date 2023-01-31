import { createSlice } from '@reduxjs/toolkit'
import {
  handleAddGroup,
  handleLoadGroups,
  handleSelectGroup,
} from '../actions/group.action'
import { StatusType } from '../types/status.type'
import { handleInitPage } from '../actions/app.action'
import { Group, GroupInterface, GroupState } from '../types/groups.type'
import { searchGroup } from '../selectors/group.selector'

const initialState: GroupState = {
  data: [],
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
        state.data = payload.map((item) =>
          Object.assign(new Group(item), { open: false }),
        )

        state.status = StatusType.Succeeded
      })
      .addCase(handleLoadGroups.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

      .addCase(handleAddGroup.pending, (state) => {
        state.status = StatusType.Loading
      })
      .addCase(handleAddGroup.fulfilled, (state, { payload }) => {
        const { data, targetId } = payload
        const currentNode = searchGroup(state.data, targetId)

        if (currentNode) {
          currentNode.subGroups.push(data as GroupInterface)
        } else {
          state.data.push(data as GroupInterface)
        }

        state.status = StatusType.Succeeded
      })

      .addCase(handleSelectGroup.pending, (state) => {
        state.status = StatusType.Loading
      })

      .addCase(handleSelectGroup.fulfilled, (state, { payload }) => {
        const { idFolder, goBack } = payload

        const currentNode = searchGroup(state.data, idFolder)

        state.status = StatusType.Succeeded
        state.selectedGroup = goBack ? currentNode?.parent?.id : idFolder
      })

      .addCase(handleInitPage.fulfilled, (state) => {
        state.selectedGroup = undefined
      })
  },
})

export default reducer
