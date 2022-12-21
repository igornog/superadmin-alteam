import { SoloClient } from '../client'

export interface TalentService {
  createClient(client: Omit<SoloClient, 'id'>): Promise<SoloClient>
}
