//eslint-disable @typescript-eslint/no-unused-vars
import { postgresClient } from './postgresClient'
import { ClientSearch, EmailStatus, SoloClient } from '@yjcapp/app'
import { clientFromEntity, clientToEntity } from './clientConverter'
import { SoloClientEntity } from './entities/SoloClient.entity'

const PAGE_SIZE = 24

function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit
}

async function createSoloClient(
  soloClient: Omit<SoloClient, 'id'>,
): Promise<SoloClient | string> {
  const soloClientRepository = (await postgresClient()).getRepository(
    SoloClientEntity,
  )

  const clientExists = await soloClientRepository.find({
    where: [
      { companyName: soloClient.companyName },
      { email: soloClient.email },
    ],
  })

  if (clientExists.length > 0) {
    return 'Client already exists'
  }

  const entity = clientToEntity({
    ...soloClient,
    emailStatus: EmailStatus.Unconfirmed,
  })
  const result = await soloClientRepository.save(entity)
  return clientFromEntity(result)
}

async function findClient(clientSearch: ClientSearch): Promise<SoloClient[]> {
  const soloClientRepository = (await postgresClient()).getRepository(
    SoloClientEntity,
  )

  const queryBuilder = await soloClientRepository.createQueryBuilder(
    'solo_client',
  )

  if (clientSearch.id) {
    queryBuilder.andWhere('solo_client.id = :id', {
      id: clientSearch.id,
    })
  }

  if (clientSearch.status) {
    queryBuilder.andWhere('solo_client.status = :status', {
      status: clientSearch.status,
    })
  }

  queryBuilder.limit(PAGE_SIZE)
  queryBuilder.offset(calculateOffset(clientSearch.page ?? 1, PAGE_SIZE))

  const result = await queryBuilder.getMany()

  return result.map(clientFromEntity)
}

async function updateSoloClient(client: SoloClient): Promise<SoloClient> {
  const soloClientRepository = (await postgresClient()).getRepository(
    SoloClientEntity,
  )
  const entity = clientToEntity(client)
  const result = await soloClientRepository.save(entity)
  return clientFromEntity(result)
}

export const soloClientPgRepository = {
  createSoloClient,
  findClient,
  updateSoloClient,
}
