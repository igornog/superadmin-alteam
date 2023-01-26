import { Group, GroupSearch, GroupService } from '@yjcapp/app'
import atAxios from './axios'

export default class RemoteGroupService implements GroupService {
  async createGroup(client: Omit<Group, 'id'>): Promise<Group> {
    const { data } = await atAxios.post('/group', client)
    return data
  }

  async searchGroup(groupSearch?: GroupSearch): Promise<Group[]> {
    const { data } = await atAxios.get('/client/search', {
      params: groupSearch,
    })
    return data
  }
}
