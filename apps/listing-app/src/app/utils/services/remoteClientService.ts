import { ClientSearch, ClientService, SoloClient } from '@yjcapp/app'
import { Client } from '../redux/types/clients.type'
import atAxios from './axios'

export default class RemoteClientService implements ClientService {
  async createClient(client: Omit<SoloClient, 'id'>): Promise<Client> {
    const { data } = await atAxios.post('/client', client)
    return data
  }

  async searchClient(clientSearch: ClientSearch): Promise<Client[]> {
    const { data } = await atAxios.get('/client/search', {
      params: clientSearch,
    })
    return data
  }

  async updateSoloClient(talent: SoloClient): Promise<Client> {
    const { data } = await atAxios.put('/client', talent)

    return data
  }

  async patchSoloClient(client: Partial<SoloClient>): Promise<Client> {
    const { data } = await atAxios.patch('/client/', client)

    return data
  }
}
