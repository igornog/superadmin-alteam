import {
  ClientListing,
  ListingSearch,
  ListingService,
} from '@yjcapp/app'
import { listingPgRepository } from '@yjcapp/postgres-db'

export const listingService: ListingService = {
  createListing(
    clientProject: Omit<ClientListing, 'id'>,
  ): Promise<ClientListing> {
    return listingPgRepository.createListing(clientProject)
  },
  searchListing(listingSearch: ListingSearch): Promise<ClientListing[]> {
    return listingPgRepository.findListing(listingSearch)
  },
}
