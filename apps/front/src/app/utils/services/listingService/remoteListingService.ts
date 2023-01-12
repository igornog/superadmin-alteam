import { ClientProject, ListingService } from '@yjcapp/app'
import atAxios from '../axios'

export default class RemoteListingService implements ListingService {
  async createProject(
    project: Omit<ClientProject, 'id'>,
  ): Promise<ClientProject> {
    const { data } = await atAxios.post('/listing/project', project)
    return data
  }
}
