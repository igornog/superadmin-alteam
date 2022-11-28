import { DeepPartial } from 'typeorm'
import { SoloTalent } from '@yjcapp/app'
import { SoloTalentEntity } from './entities'

export function soloTalentFromEntity(entity: SoloTalentEntity): SoloTalent {
  return {
    id: entity.id.toString(),
    firstName: entity.firstName,
    lastName: entity.lastName,
    experience: entity.experience,
    availability: entity.availability,
    portfolioLink: entity.portfolioLink,
    role: entity.role,
    about: entity.about,
    assets: entity.assets,
    skills: entity.skills,
  }
}

export function soloTalentToEntity(
  soloTalent: DeepPartial<SoloTalent>,
): DeepPartial<SoloTalentEntity> {
  return {
    id: soloTalent.id ? parseInt(soloTalent.id) : undefined,
    firstName: soloTalent.firstName,
    lastName: soloTalent.lastName,
    experience: soloTalent.experience,
    availability: soloTalent.availability,
    portfolioLink: soloTalent.portfolioLink,
    role: soloTalent.role,
    about: soloTalent.about,
    assets: soloTalent.assets,
    skills: soloTalent.skills,
  }
}
