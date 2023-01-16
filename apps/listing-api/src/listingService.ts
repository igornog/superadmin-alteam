import {
  ClientListing,
  ClientProject,
  ClientTeam,
  ListingSearch,
  ListingService,
} from '@yjcapp/app'
import { listingPgRepository } from '@yjcapp/postgres-db'

export const listingService: ListingService = {
  createProject(
    clientProject: Omit<ClientProject, 'id'>,
  ): Promise<ClientProject> {
    return listingPgRepository.createClientProject(clientProject)
  },
  createTeam(clientTeam: Omit<ClientTeam, 'id'>): Promise<ClientTeam> {
    return listingPgRepository.createClientTeam(clientTeam)
  },
  searchListing(listingSearch: ListingSearch): Promise<ClientListing[]> {
    return listingPgRepository.findListing(listingSearch)
  },
}
