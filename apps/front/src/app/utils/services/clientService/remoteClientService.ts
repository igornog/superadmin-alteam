import { ClientSearch, ClientService, SoloClient } from '@yjcapp/app'
import atAxios from '../axios'

export default class RemoteClientService implements ClientService {
  async createClient(client: Omit<SoloClient, 'id'>): Promise<SoloClient> {
    const { data } = await atAxios.post('/client', client)
    return data
  }

  async searchClient(clientSearch: ClientSearch): Promise<SoloClient[]> {
    const { data } = await atAxios.get('/client/search', {
      params: clientSearch,
    })
    return data
  }
}
