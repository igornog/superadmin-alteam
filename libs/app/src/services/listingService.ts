import { ClientProject } from '../listing'

export interface ListingService {
  createProject(project: Omit<ClientProject, 'id'>): Promise<ClientProject>
}
