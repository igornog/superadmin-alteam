import { Group, GroupService } from '@yjcapp/app'
import { groupPgRepository } from '@yjcapp/postgres-db'

export const groupService: GroupService = {
  createGroup(group: Omit<Group, 'id'>): Promise<Group> {
    return groupPgRepository.createGroup(group)
  },
}
