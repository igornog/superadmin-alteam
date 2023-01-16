import {
  ClientListing,
  ClientProject,
  ClientTeam,
  ListingSearch,
} from '../listing'

export interface ListingService {
  createProject(project: Omit<ClientProject, 'id'>): Promise<ClientProject>
  createTeam(team: Omit<ClientTeam, 'id'>): Promise<ClientTeam>
  searchListing(listingSearch: ListingSearch): Promise<ClientListing[]>
}
