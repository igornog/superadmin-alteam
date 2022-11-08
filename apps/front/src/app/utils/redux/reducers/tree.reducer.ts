import { createSlice, current } from '@reduxjs/toolkit';
import { handleAddFolder, handleLoadTree } from '../actions/tree.action';
import { StatusType } from '../types/status.type';
import { TreeInterface, TreeState } from '../types/tree.type';

const initialState: TreeState = {
  data: {
    id: '',
    name: '',
    children: [],
  },
  status: StatusType.Idle,
  error: null,
};

const { reducer } = createSlice({
  name: 'tree',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLoadTree.pending, (state) => {
        state.status = StatusType.Loading;
      })
      .addCase(handleLoadTree.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = StatusType.Succeeded;
      })
      .addCase(handleLoadTree.rejected, (state, action) => {
        state.status = StatusType.Failed;
        state.error = action.error.message;
      })

      .addCase(handleAddFolder.fulfilled, (state, { payload }) => {
        const search: any = (tree: TreeInterface, targetId: string) => {
          if (tree.id === targetId) {
            return tree;
          }

          if (tree.children) {
            for (const child of tree.children) {
              const found = search(child, targetId);

              if (found) {
                return found;
              }
            }
          }
        };

        const currentNode = search(state.data, payload.targetId);

        if (!Object.prototype.hasOwnProperty.call(currentNode, 'children')) {
          currentNode.children = [];
        }

        currentNode.children.push({ id: '888', name: payload.folderName });
      });
  },
});

export default reducer;
