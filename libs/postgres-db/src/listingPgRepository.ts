import { postgresClient } from './postgresClient'
import { ClientListing, ListingSearch } from '@yjcapp/app'
import { ListingEntity } from './entities'
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

  const queryBuilderListing =
    await listingProjectRepository.createQueryBuilder()

  if (listingSearch.listingName) {
    queryBuilderListing.andWhere('listing_name LIKE :listingName', {
      listingName: '%' + listingSearch.listingName + '%',
    })
  }

  if (listingSearch.listingType) {
    queryBuilderListing.andWhere('ListingEntity.status = :status', {
      status: listingSearch.listingType,
    })
  }

  queryBuilderListing
    .leftJoin('ListingEntity.soloClient', 'soloClient')
    .select(['ListingEntity', 'soloClient.id'])

  const resultProject = await queryBuilderListing.getMany()

  return resultProject.map(clientListingFromEntity)
}

export const listingPgRepository = {
  createListing,
  findListing,
}
