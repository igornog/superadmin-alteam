import { createSlice } from '@reduxjs/toolkit'
import {
  handleAddFolder,
  handleLoadTree,
  handleSelectFolder,
} from '../actions/tree.action'
import { StatusType } from '../types/status.type'
import { TreeState } from '../types/tree.type'
import { v4 as uuidv4 } from 'uuid'
import { searchFolder } from '../selectors/tree.selector'
import { handleInitPage } from '../actions/app.action'

const initialState: TreeState = {
  data: {
    id: '',
    name: '',
    children: [],
  },
  selectedFolder: undefined,
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'tree',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLoadTree.pending, (state) => {
        state.status = StatusType.Loading
      })
      .addCase(handleLoadTree.fulfilled, (state, { payload }) => {
        state.data = payload
        state.status = StatusType.Succeeded
      })
      .addCase(handleLoadTree.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

      .addCase(handleAddFolder.fulfilled, (state, { payload }) => {
        const currentNode = searchFolder(state.data, payload.targetId)

        if (!Object.prototype.hasOwnProperty.call(currentNode, 'children')) {
          currentNode.children = []
        }

        currentNode.children.push({
          id: uuidv4(),
          idParent: payload.targetId,
          name: payload.folderName,
        })
      })

      .addCase(handleSelectFolder.pending, (state) => {
        state.status = StatusType.Loading
      })

      .addCase(handleSelectFolder.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded
        state.selectedFolder = payload
      })

      .addCase(handleInitPage.fulfilled, (state) => {
        state.selectedFolder = undefined
      })
  },
})

export default reducer
