import { ClientListing, ListingSearch, ListingService } from '@yjcapp/app'
import { Project, Team } from '../../redux/types/listings.type'
import atAxios from '../axios'

export default class RemoteListingService implements ListingService {
  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const { data } = await atAxios.post('/listing/project', project)
    return data
  }

  async createTeam(team: Omit<Team, 'id'>): Promise<Team> {
    const { data } = await atAxios.post('/listing/team', team)
    return data
  }

  async searchListing(listingSearch: ListingSearch): Promise<ClientListing[]> {
    const { data } = await atAxios.get('/listing/search', {
      params: listingSearch,
    })
    return data
  }
}
