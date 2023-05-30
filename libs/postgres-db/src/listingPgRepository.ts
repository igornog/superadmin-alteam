import { postgresClient } from './postgresClient'
import { ClientListing, ListingSearch, ListingState } from '@yjcapp/app'
import { ListingEntity, SoloClientEntity } from './entities'
import {
  clientListingFromEntity,
  clientListingToEntity,
} from './listingConverter'

async function createListing(
  clientListing: Omit<ClientListing, 'id'>,
): Promise<ClientListing> {
  const soloClientRepository = (await postgresClient()).getRepository(
    ListingEntity,
  )
  const entity = clientListingToEntity(clientListing)

  const result = await soloClientRepository.save(entity)
  return clientListingFromEntity(result)
}

async function findListing(
  listingSearch: ListingSearch,
): Promise<ClientListing[]> {
  const listingProjectRepository = (await postgresClient()).getRepository(
    ListingEntity,
  )

  const queryBuilderListing = await listingProjectRepository.createQueryBuilder(
    'listing',
  )

  if (listingSearch.listingId) {
    queryBuilderListing.andWhere('listing.id = :listingId', {
      listingId: listingSearch.listingId,
    })
  }

  if (listingSearch.clientId) {
    queryBuilderListing.andWhere('listing.soloClientId = :clientId', {
      clientId: listingSearch.clientId,
    })
  }

  if (listingSearch.listingName) {
    queryBuilderListing.andWhere('listing.listing_name = :listingName', {
      listingName: listingSearch.listingName,
    })
  }

  if (listingSearch.listingType) {
    queryBuilderListing.andWhere('listing.status = :status', {
      status: listingSearch.listingType,
    })
  }

  queryBuilderListing
    .leftJoinAndMapOne(
      'listing.soloClient',
      SoloClientEntity,
      'soloClient',
      'soloClient.id = listing.soloClientId',
    )
    .select(['listing'])
    .addSelect([
      'soloClient.companyName',
      'soloClient.fullName',
      'soloClient.position',
      'soloClient.email',
    ])

  if (listingSearch.clientEmail) {
    queryBuilderListing.andWhere('soloClient.email = :clientEmail', {
      clientEmail: listingSearch.clientEmail,
    })
  }

  const resultProject = await queryBuilderListing.getMany()

  return resultProject.map(clientListingFromEntity)
}

async function endingListing(id: string): Promise<string> {
  const listingProjectRepository = (await postgresClient()).getRepository(
    ListingEntity,
  )

  const dbResponse = await listingProjectRepository.update(id, {
    status: ListingState.Ended,
  })

  if (dbResponse.affected === 1) {
    return 'Listing ended successfully'
  } else {
    return 'Listing not found'
  }
}

async function updateListing(
  clientListing: Partial<ClientListing>,
): Promise<ClientListing | string> {
  const listingProjectRepository = (await postgresClient()).getRepository(
    ListingEntity,
  )

  const dbUpdateResponse = await listingProjectRepository.update(
    clientListing.id,
    clientListing,
  )

  if (dbUpdateResponse.affected === 0) return 'Listing not found'

  const dbResponse = await listingProjectRepository.findOne({
    where: { id: Number(clientListing.id) },
  })

  return dbResponse
}

export const listingPgRepository = {
  createListing,
  findListing,
  endingListing,
  updateListing,
}
