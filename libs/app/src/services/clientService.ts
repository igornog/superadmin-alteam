import { SoloClient } from '../client'

export interface ClientService {
  createClient(client: Omit<SoloClient, 'id'>): Promise<SoloClient>
}
