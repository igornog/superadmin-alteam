//eslint-disable @typescript-eslint/no-unused-vars
import { postgresClient } from './postgresClient'
import { ClientSearch, SoloClient } from '@yjcapp/app'
import { clientFromEntity, clientToEntity } from './clientConverter'
import { SoloClientEntity } from './entities/SoloClient.entity'

const PAGE_SIZE = 24

function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit
}

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

async function findClient(talentSearch: ClientSearch): Promise<SoloClient[]> {
  const soloTalentRepository = (await postgresClient()).getRepository(
    SoloClientEntity,
  )

  const queryBuilder = await soloTalentRepository.createQueryBuilder()

  if (talentSearch.status) {
    queryBuilder.andWhere('status = :status', { status: talentSearch.status })
  }

  queryBuilder.andWhere('company_name LIKE :clientName', {
    clientName: '%' + talentSearch.clientName + '%',
  })

  queryBuilder.limit(PAGE_SIZE)
  queryBuilder.offset(calculateOffset(talentSearch.page ?? 1, PAGE_SIZE))

  const result = await queryBuilder.getMany()

  return result.map(clientFromEntity)
}

async function updateSoloClient(client: SoloClient): Promise<SoloClient> {
  const soloTalentRepository = (await postgresClient()).getRepository(
    SoloClientEntity,
  )
  const entity = clientToEntity(client)
  const result = await soloTalentRepository.save(entity)
  return clientFromEntity(result)
}

export const soloClientPgRepository = {
  createSoloClient,
  findClient,
  updateSoloClient,
}
