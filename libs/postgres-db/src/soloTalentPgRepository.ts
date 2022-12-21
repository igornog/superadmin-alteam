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

const PAGE_SIZE = 24

function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit
}

async function findSoloTalentBySearch(
  talentSearch: TalentSearch,
): Promise<SoloTalent[]> {
  const soloTalentRepository = (await postgresClient()).getRepository(
    SoloTalentEntity,
  )

  const queryBuilder = await soloTalentRepository.createQueryBuilder()

  if (talentSearch.skills) {
    queryBuilder.andWhere('skills @> ARRAY[:...skills]', {
      skills: talentSearch.skills,
    })
  }

  if (talentSearch.experience) {
    queryBuilder.andWhere('experience = :experience', {
      experience: talentSearch.experience,
    })
  }

  if (talentSearch.availability) {
    queryBuilder.andWhere('availability @> ARRAY[:...availability]', {
      availability: talentSearch.availability,
    })
  }
  if (talentSearch.role) {
    queryBuilder.andWhere('role = :role', { role: talentSearch.role })
  }

  if (talentSearch.status) {
    queryBuilder.andWhere('status = :status', { status: talentSearch.status })
  }

  queryBuilder.andWhere("(first_name || ' ' || last_name LIKE :talentName)", {
    talentName: '%' + talentSearch.talentName + '%',
  })

  queryBuilder.limit(PAGE_SIZE)
  queryBuilder.offset(calculateOffset(talentSearch.page ?? 1, PAGE_SIZE))

  const result = await queryBuilder.getMany()

  return result.map(soloTalentFromEntity)
}

async function updateSoloTalent(talent: SoloTalent): Promise<SoloTalent> {
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
  updateSoloTalent,
  findSoloTalentBySearch,
}
