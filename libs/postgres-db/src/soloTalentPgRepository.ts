//eslint-disable @typescript-eslint/no-unused-vars
import { postgresClient } from './postgresClient'
import { SoloTalent, TalentSearch } from '@yjcapp/app'
import { SoloTalentEntity } from './entities'
import { soloTalentFromEntity, soloTalentToEntity } from './soloTalentConverter'

async function createSoloTalent(
  soloTalent: Omit<SoloTalent, 'id' | 'appliedDate'>,
): Promise<SoloTalent> {
  const soloTalentRepository = (await postgresClient()).getRepository(
    SoloTalentEntity,
  )
  const entity = soloTalentToEntity(soloTalent)
  const result = await soloTalentRepository.save(entity)
  return soloTalentFromEntity(result)
}

async function retrieveSoloTalent(id: string): Promise<SoloTalent | undefined> {
  const soloTalentRepository = (await postgresClient()).getRepository(
    SoloTalentEntity,
  )
  const result = await soloTalentRepository.findOneBy({ id: parseInt(id) })
  return result ? soloTalentFromEntity(result) : undefined
}

async function findSoloTalentBySearch(
  talentSearch: TalentSearch,
): Promise<SoloTalent[]> {
  const soloTalentRepository = (await postgresClient()).getRepository(
    SoloTalentEntity,
  )

  const result = await soloTalentRepository
    .createQueryBuilder()
    .take(20)
    .getMany()
  return result.map(soloTalentFromEntity)
}
async function updateSoloTalent(
  talent: SoloTalent,
): Promise<SoloTalent> {
  const soloTalentRepository = (await postgresClient()).getRepository(
    SoloTalentEntity,
  )
  const entity = soloTalentToEntity(talent)
  const result = await soloTalentRepository.save(entity)
  return soloTalentFromEntity(result)
}
export const soloTalentPgRepository = {
  createSoloTalent,
  retrieveSoloTalent,
  findSoloTalentBySearch,
  updateSoloTalent,
}
