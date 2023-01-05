import { ClientSearch, SoloClient } from '../client'

export interface ClientService {
  createClient(client: Omit<SoloClient, 'id'>): Promise<SoloClient>

  searchClient(talentSearch: ClientSearch): Promise<SoloClient[]>

  updateSoloClient(client: SoloClient): Promise<SoloClient>
}
