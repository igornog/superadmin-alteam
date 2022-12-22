import { ClientService, SoloClient } from '@yjcapp/app'
import atAxios from '../axios'

export default class RemoteClientService implements ClientService {
  async createClient(client: Omit<SoloClient, 'id'>): Promise<SoloClient> {
    const { data } = await atAxios.post('/client', client)
    return data
  }
}
