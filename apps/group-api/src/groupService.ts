import { Group, GroupSearch, GroupService } from '@yjcapp/app'
import { groupPgRepository } from '@yjcapp/postgres-db'

export const groupService: GroupService = {
  createGroup(group: Omit<Group, 'id'>): Promise<Group> {
    return groupPgRepository.createGroup(group)
  },
  searchGroup(groupsearch: GroupSearch): Promise<Group[]> {
    return groupPgRepository.findGroups(groupsearch)
  },
}
