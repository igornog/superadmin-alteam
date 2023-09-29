import { Group, GroupService } from '@yjcapp/app'
import atAxios from './axios'

export default class RemoteGroupService implements GroupService {
  async createGroup(group: Omit<Group, 'id'>): Promise<Group> {
    const { data } = await atAxios.post('/group', group)
    return data
  }
  deleteGroup(groupId: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
  addSoloTalentToGroup(groupId: string, talentId: string): Promise<Group> {
    throw new Error('Method not implemented.')
  }
  removeSoloTalentToGroup(groupId: string, talentId: string): Promise<Group> {
    throw new Error('Method not implemented.')
  }
  addGroupTalentToGroup(groupId: string, grouptTalentId: string): Promise<Group> {
    throw new Error('Method not implemented.')
  }
  removeGroupTalentToGroup(groupId: string, grouptTalentId: string): Promise<Group> {
    throw new Error('Method not implemented.')
  }
  findAllGroups(): Promise<Group[]> {
    throw new Error('Method not implemented.')
  }
  findGroup(groupId: string): Promise<Group> {
    throw new Error('Method not implemented.')
  }
}
