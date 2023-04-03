import { postgresClient } from './postgresClient'
import { Group, GroupSearch } from '@yjcapp/app'
import { GroupEntity } from './entities'
import { groupFromEntity, groupToEntity } from './groupConverter'

async function createGroup(group: Omit<Group, 'id'>): Promise<Group> {
  const groupRepository = (await postgresClient()).getRepository(GroupEntity)
  const entity = groupToEntity(group)

  const result = await groupRepository.save(entity)

  return groupFromEntity(result)
}

async function findGroups(groupSearch: GroupSearch): Promise<Group[]> {
  const listingProjectRepository = (await postgresClient()).getRepository(
    GroupEntity,
  )

  const queryBuilderListing = await listingProjectRepository.createQueryBuilder(
    'group',
  )

  queryBuilderListing.leftJoinAndSelect('group.parent', 'parent')

  if (groupSearch.id) {
    queryBuilderListing.where('id = :id', {
      id: groupSearch.id,
    })
  }

  const resultProject = await queryBuilderListing.getMany()

  const groups: Group[] = []

  const searchGroup = (data: Group[], parentId: number) => {
    let result = data.find((group) => group.id === parentId)
    if (!result) {
      for (const group of data) {
        if (group.subGroups) {
          result = searchGroup(group.subGroups, parentId)
          if (result) {
            break
          }
        }
      }
    }
    if (!result) {
      result = groupFromEntity(resultProject.find((g) => g.id === parentId))
      data.push(result)
    }
    return result
  }

  resultProject.forEach((group) => {
    if (!group.parent) {
      groups.push(groupFromEntity(group))
    } else {
      const correctGroup = searchGroup(groups, group.parent.id)
      correctGroup?.subGroups?.push(groupFromEntity(group))
    }
  })

  return groups
}

export const groupPgRepository = {
  createGroup,
  findGroups,
}
