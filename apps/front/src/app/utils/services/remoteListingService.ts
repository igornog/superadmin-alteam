import { ClientListing, ListingSearch, ListingService } from '@yjcapp/app'
import { Listing } from '../redux/types/listings.type'
import atAxios from './axios'

export default class RemoteListingService implements ListingService {
  async createListing(project: Omit<Listing, 'id'>): Promise<Listing> {
    const { data } = await atAxios.post('/listing', project)
    return data
  }

  async searchListing(listingSearch: ListingSearch): Promise<ClientListing[]> {
    const { data } = await atAxios.get('/listing/search', {
      params: listingSearch,
    })
    return data
  }
}
