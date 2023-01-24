import { ClientListing, ListingSearch, ListingService } from '@yjcapp/app'
import { listingPgRepository } from '@yjcapp/postgres-db'

export const listingService: ListingService = {
  createListing(
    clientListing: Omit<ClientListing, 'id'>,
  ): Promise<ClientListing> {
    return listingPgRepository.createListing(clientListing)
  },
  searchListing(listingSearch: ListingSearch): Promise<ClientListing[]> {
    return listingPgRepository.findListing(listingSearch)
  },
}
