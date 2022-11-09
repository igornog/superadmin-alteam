import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { Tree, TreeInterface } from '../types/tree.type';

export const searchFolder: any = (tree: TreeInterface, targetId: string) => {
  if (tree.id === targetId || !targetId) {
    return tree;
  }

  if (tree.children) {
    for (const child of tree.children) {
      const found = searchFolder(child, targetId);

      if (found) {
        return found;
      }
    }
  }
};

export const getActiveFolder = createDraftSafeSelector(
  [(state) => state.tree],
  ({ data, selectedFolder }) => {
    return new Tree(searchFolder(data, selectedFolder));
  }
);
