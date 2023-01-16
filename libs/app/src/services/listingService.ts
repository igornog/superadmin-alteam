import { ClientListing, ListingSearch } from '../listing'

export interface ListingService {
  createListing(team: Omit<ClientListing, 'id'>): Promise<ClientListing>
  searchListing(listingSearch: ListingSearch): Promise<ClientListing[]>
}
