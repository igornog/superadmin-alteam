import { ClientService, SoloClient } from '@yjcapp/app'
import { soloClientPgRepository } from '@yjcapp/postgres-db'

export const clientService: ClientService = {
  createClient(client: Omit<SoloClient, 'id'>): Promise<SoloClient> {
    return soloClientPgRepository.createSoloClient(client)
  },
}
