import { postgresClient } from './postgresClient'
import { Group } from '@yjcapp/app'
import { GroupEntity } from './entities'
import { groupFromEntity, groupToEntity } from './groupConverter'

async function createGroup(group: Omit<Group, 'id'>): Promise<Group> {
  const groupRepository = (await postgresClient()).getRepository(GroupEntity)
  const entity = groupToEntity(group)
  const result = await groupRepository.save(entity)

  return groupFromEntity(result)
}

export const groupPgRepository = {
  createGroup,
}
