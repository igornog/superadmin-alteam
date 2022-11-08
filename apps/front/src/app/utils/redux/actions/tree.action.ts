import { createAsyncThunk } from '@reduxjs/toolkit';
import { TreeInterface } from '../types/tree.type';

export const handleLoadTree = createAsyncThunk(
  'tree/loadTree',
  async (tree: TreeInterface) => {
    return tree;
  }
);

export const handleAddFolder = createAsyncThunk(
  'tree/addFolder',
  async (props: { folderName: string; targetId: string }) => {
    return props;
  }
);
