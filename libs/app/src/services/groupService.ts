import { Group, GroupSearch } from '../group'

export interface GroupService {
  createGroup(group: Omit<Group, 'id'>): Promise<Group>
  searchGroup(groupSearch: GroupSearch): Promise<Group[]>
}
