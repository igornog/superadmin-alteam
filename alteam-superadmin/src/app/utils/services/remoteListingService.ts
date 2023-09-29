import {
  type ClientListing,
  type EMAIL_TYPES,
  type ListingSearch,
  type ListingService,
  type Notification,
} from '@yjcapp/app'
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

  async endingListing(id: string): Promise<string> {
    const { data } = await atAxios.delete(`/listing/${id}`)
    return data
  }

  async updateListing(listing: Partial<ClientListing>): Promise<ClientListing> {
    const { data } = await atAxios.put(`/listing`, listing)
    return data
  }

  sendNotification(
    id: string,
    emailType: EMAIL_TYPES,
    notification: Partial<Notification>,
  ): Promise<string> {
    return Promise.resolve('')
  }
}
