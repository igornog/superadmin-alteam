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
    links: entity.links,
    role: entity.role,
    about: entity.about,
    listing: entity.listings,
    status: entity.status,
    salaryExpectation: entity.salaryExpectation,
    appliedDate: entity.appliedDate,
    phoneNumber: entity.phoneNumber,
    workExperience: entity.workExperience,
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
    links: soloTalent.links,
    listings: soloTalent.listing,
    phoneNumber: soloTalent.phoneNumber,
    workExperience: soloTalent.workExperience,
    salaryExpectation: soloTalent.salaryExpectation,
    appliedDate: soloTalent.appliedDate,
    role: soloTalent.role,
    about: soloTalent.about,
    status: soloTalent.status,
    assets: soloTalent.assets,
    skills: soloTalent.skills,
  }
}
