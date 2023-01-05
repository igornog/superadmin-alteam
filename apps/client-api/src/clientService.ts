import { ClientSearch, ClientService, SoloClient } from '@yjcapp/app'
import { soloClientPgRepository } from '@yjcapp/postgres-db'

export const clientService: ClientService = {
  createClient(client: Omit<SoloClient, 'id'>): Promise<SoloClient> {
    return soloClientPgRepository.createSoloClient(client)
  },

  searchClient(talentSearch: ClientSearch): Promise<SoloClient[]> {
    return soloClientPgRepository.findClient(talentSearch)
  },

  updateSoloClient(client: SoloClient): Promise<SoloClient> {
    return soloClientPgRepository.updateSoloClient(client)
  },
}
