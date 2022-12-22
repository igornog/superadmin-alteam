//eslint-disable @typescript-eslint/no-unused-vars
import { postgresClient } from './postgresClient'
import { SoloClient } from '@yjcapp/app'
import { clientFromEntity, clientToEntity } from './clientConverter'
import { SoloClientEntity } from './entities/SoloClient.entity'

async function createSoloClient(
  soloTalent: Omit<SoloClient, 'id'>,
): Promise<SoloClient> {
  const soloClientRepository = (await postgresClient()).getRepository(
    SoloClientEntity,
  )
  const entity = clientToEntity(soloTalent)
  const result = await soloClientRepository.save(entity)
  return clientFromEntity(result)
}

export const soloClientPgRepository = {
  createSoloClient,
}
