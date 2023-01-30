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

export const searchGroup = (
  data: GroupInterface[],
  id: number | undefined,
): GroupInterface | undefined => {
  if (!id) {
    return undefined
  }
  let result = data.find((group) => group.id === id)
  if (!result) {
    for (const group of data) {
      if (group.subGroups) {
        result = searchGroup(group.subGroups, id)
        if (result) {
          break
        }
      }
    }
  }
  return result
}

export const getActiveGroup = createDraftSafeSelector(
  [(state) => state.groups],
  ({ data, selectedGroup }) => {
    if (selectedGroup) {
      return new Group(searchGroup(data, selectedGroup))
    } else {
      return new Group({})
    }
  },
)
