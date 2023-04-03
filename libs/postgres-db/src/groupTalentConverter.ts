import { DeepPartial } from 'typeorm'
import { GroupTalent } from '@yjcapp/app'
import { GroupTalentEntity } from './entities'

export function groupTalentFromEntity(entity: GroupTalentEntity): GroupTalent {
  return {
    id: entity.id,
    email: entity.email,
    phone: entity.phone,
    speciality: entity.speciality,
    size: entity.size,
    website: entity.website,
    about: entity.about,
    assets: entity.assets,
  }
}

export function groupTalentToEntity(
  groupTalent: DeepPartial<GroupTalent>,
): DeepPartial<GroupTalentEntity> {
  return {
    id: groupTalent.id,
    email: groupTalent.email,
    phone: groupTalent.phone,
    speciality: groupTalent.speciality,
    size: groupTalent.size,
    website: groupTalent.website,
    about: groupTalent.about,
    assets: groupTalent.assets,
  }
}
