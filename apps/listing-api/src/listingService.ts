import { ClientProject, ListingService } from '@yjcapp/app'
import { clientProjectPgRepository } from '@yjcapp/postgres-db'

export const listingService: ListingService = {
  createProject(client: Omit<ClientProject, 'id'>): Promise<ClientProject> {
    return clientProjectPgRepository.createClientProject(client)
  },
}
