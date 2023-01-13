import { ListingService } from '@yjcapp/app'
import { Project } from '../../redux/types/listings.type'
import atAxios from '../axios'

export default class RemoteListingService implements ListingService {
  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const { data } = await atAxios.post('/listing/project', project)
    return data
  }
}
