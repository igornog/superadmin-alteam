import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { Tree, TreeInterface } from '../types/tree.type';

export const mapRecursive = <T>(
  oldArray: Array<T & { children?: T[] }>,
  callback: (item: T) => T,
  newArray: T[] = []
): T[] => {
  if (oldArray.length <= 0) {
    return newArray;
  } else {
    // eslint-disable-next-line prefer-const
    let [item, ...theRest] = oldArray;

    if (item.children) {
      item = {
        ...item,
        children: mapRecursive<any>(item.children, callback),
      };
    }

    const interimArray = [...newArray, callback(item)];
    return mapRecursive<T>(theRest, callback, interimArray);
  }
};

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
