import { DeepPartial } from 'typeorm'
import { Group } from '@yjcapp/app'
import { GroupEntity } from './entities'

export function groupFromEntity(entity: GroupEntity): Group {
  return {
    id: entity.id,
    name: entity.name,
    client: entity.client,
    talents: entity.talents,
    groupTalents: entity.groupTalents,
    subGroups: entity.subGroups,
    parent: entity.parent,
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
