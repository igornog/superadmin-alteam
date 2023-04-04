import { Group, GroupSearch, GroupService } from '@yjcapp/app'
import atAxios from './axios'

export default class RemoteGroupService implements GroupService {
  async createGroup(group: Omit<Group, 'id'>): Promise<Group> {
    const { data } = await atAxios.post('/group', group)
    return data
  }

  async searchGroup(groupSearch?: GroupSearch): Promise<Group[]> {
    const { data } = await atAxios.get('/group', {
      params: groupSearch,
    })
    return data
  }
}
