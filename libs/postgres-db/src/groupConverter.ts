import { DeepPartial } from 'typeorm'
import { Group } from '@yjcapp/app'
import { GroupEntity } from './entities'

export function groupFromEntity(entity: GroupEntity): Group {
  return {
    id: entity.id,
    name: entity.name,
    client: entity.client || null,
    talents: entity.talents || [],
    groupTalents: entity.groupTalents || [],
    subGroups: Array.isArray(entity.subGroups)
      ? entity.subGroups.map(groupFromEntity)
      : [],
    parent: entity.parent ? groupFromEntity(entity.parent) : null,
  }
}

export function groupToEntity(
  group: DeepPartial<Group>,
): DeepPartial<GroupEntity> {
  return {
    id: group.id,
    name: group.name,
    client: group.client,
    talents: group.talents,
    groupTalents: group.groupTalents,
    subGroups: group.subGroups,
    parent: group.parent,
  }
}
