import { DeepPartial } from 'typeorm'
import { ClientListing } from '@yjcapp/app'
import { ListingEntity } from './entities'

export function clientListingFromEntity(entity: ListingEntity): ClientListing {
  return {
    id: entity.id,
    soloClient: entity.soloClient,
    listingName: entity.listingName,
    individuals: entity.individuals,
    workType: entity.workType,
    timeZone: entity.timeZone,
    availability: entity.availability,
    projectLength: entity.projectLength,
    startDate: entity.startDate,
    currency: entity.currency,
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
  clientListing: DeepPartial<ClientListing>,
): DeepPartial<ListingEntity> {
  return {
    id: clientListing.id,
    soloClient: clientListing.soloClient,
    listingName: clientListing.listingName,
    individuals: clientListing.individuals,
    workType: clientListing.workType,
    timeZone: clientListing.timeZone,
    availability: clientListing.availability,
    projectLength: clientListing.projectLength,
    currency: clientListing.currency,
    exactRate: clientListing.exactRate,
    rateFrom: clientListing.rateFrom,
    rateTo: clientListing.rateTo,
    difficulty: clientListing.difficulty,
    learningLink: clientListing.learningLink,
    roles: clientListing.roles,
    skills: clientListing.skills,
    questions: clientListing.questions,
    jobDescription: clientListing.jobDescription,
    status: clientListing.status,
  }
}
