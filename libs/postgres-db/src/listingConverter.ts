import { DeepPartial } from 'typeorm'
import { ClientListing } from '@yjcapp/app'
import { ListingEntity } from './entities'

export function clientListingFromEntity(entity: ListingEntity): ClientListing {
  return {
    id: entity.id,
    listingName: entity.listingName,
    individuals: entity.individuals,
    workType: entity.workType,
    timeZone: entity.timeZone,
    availability: entity.availability,
    projectLength: entity.projectLength,
    startDate: entity.startDate,
    exactRate: entity.exactRate,
    rateFrom: entity.rateFrom,
    rateTo: entity.rateTo,
    difficulty: entity.difficulty,
    learningLink: entity.learningLink,
    roles: entity.roles,
    skills: entity.skills,
    questions: entity.questions,
    jobDescription: entity.jobDescription,
    status: entity.status,
  }
}

export function clientListingToEntity(
  clientProject: DeepPartial<ClientListing>,
): DeepPartial<ListingEntity> {
  return {
    id: clientProject.id,
    listingName: clientProject.listingName,
    individuals: clientProject.individuals,
    workType: clientProject.workType,
    timeZone: clientProject.timeZone,
    availability: clientProject.availability,
    projectLength: clientProject.projectLength,
    exactRate: clientProject.exactRate,
    rateFrom: clientProject.rateFrom,
    rateTo: clientProject.rateTo,
    difficulty: clientProject.difficulty,
    learningLink: clientProject.learningLink,
    roles: clientProject.roles,
    skills: clientProject.skills,
    questions: clientProject.questions,
    jobDescription: clientProject.jobDescription,
    status: clientProject.status,
  }
}
