import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { Group, GroupInterface } from '../types/groups.type'

export const mapRecursive = <T>(
  oldArray: Array<T & { children?: T[] }>,
  callback: (item: T) => T,
  newArray: T[] = [],
): T[] => {
  if (oldArray.length <= 0) {
    return newArray
  } else {
    // eslint-disable-next-line prefer-const
    let [item, ...theRest] = oldArray

    if (item.children) {
      item = {
        ...item,
        children: mapRecursive<any>(item.children, callback),
      }
    }

    const interimArray = [...newArray, callback(item)]
    return mapRecursive<T>(theRest, callback, interimArray)
  }
}

export const searchGroup: any = (group: GroupInterface, targetId: number) => {
  if (group.id === targetId || !targetId) {
    return group
  }

  if (group.subGroups) {
    for (const child of group.subGroups) {
      const found = searchGroup(child, targetId)

      if (found) {
        return found
      }
    }
  }
}

export const getActiveGroup = createDraftSafeSelector(
  [(state) => state.groups],
  ({ data, selectedGroup }) => {
    return new Group(searchGroup(data, selectedGroup))
  },
)
