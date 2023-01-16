import { postgresClient } from './postgresClient'
import { ClientListing, ListingSearch } from '@yjcapp/app'
import { ListingEntity } from './entities'
import {
  clientListingFromEntity,
  clientListingToEntity,
} from './listingConverter'

async function createListing(
  clientTeam: Omit<ClientListing, 'id'>,
): Promise<ClientListing> {
  const soloClientRepository = (await postgresClient()).getRepository(
    ListingEntity,
  )

  const entity = clientListingToEntity(clientTeam)
  const result = await soloClientRepository.save(entity)
  return clientListingFromEntity(result)
}

async function findListing(
  listingSearch: ListingSearch,
): Promise<ClientListing[]> {
  const listingProjectRepository = (await postgresClient()).getRepository(
    ListingEntity,
  )

  const queryBuilderProject =
    await listingProjectRepository.createQueryBuilder()

  if (listingSearch.listingName) {
    queryBuilderProject.andWhere('listing_name LIKE :listingName', {
      listingName: '%' + listingSearch.listingName + '%',
    })
  }

  const resultProject = await await queryBuilderProject.getMany()

  return resultProject.map(clientListingFromEntity)
}

export const listingPgRepository = {
  createListing,
  findListing,
}
