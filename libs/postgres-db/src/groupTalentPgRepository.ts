import { postgresClient } from './postgresClient'
import { GroupTalent } from '@yjcapp/app'
import { GroupTalentEntity } from './entities/GroupTalent.entity'
import {
  groupTalentFromEntity,
  groupTalentToEntity,
} from './groupTalentConverter'

async function createGroupTalent(
  groupTalent: Omit<GroupTalent, 'id'>,
): Promise<GroupTalent> {
  const groupTalentRepository = (await postgresClient()).getRepository(
    GroupTalentEntity,
  )
  const entity = groupTalentToEntity(groupTalent)
  const result = await groupTalentRepository.save(entity)
  return groupTalentFromEntity(result)
}

async function retrieveGroupTalent(
  id: string,
): Promise<GroupTalent | undefined> {
  const groupTalentRepository = (await postgresClient()).getRepository(
    GroupTalentEntity,
  )
  const result = await groupTalentRepository.findOneBy({ id: parseInt(id) })
  return result ? groupTalentFromEntity(result) : undefined
}

export const groupTalentPgRepository = {
  createGroupTalent,
  retrieveGroupTalent,
}
