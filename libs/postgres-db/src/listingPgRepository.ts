import { postgresClient } from './postgresClient'
import {
  ClientListing,
  ClientProject,
  ClientTeam,
  ListingSearch,
  ListingType,
} from '@yjcapp/app'

import { ClientProjectEntity } from './entities/ClientProjet.entity'
import { ClientTeamEntity } from './entities/ClientTeam.entity'
import {
  clientProjectToEntity,
  clientProjectFromEntity,
} from './listingProjectConverter'
import {
  clientTeamToEntity,
  clientTeamFromEntity,
} from './listingTeamConverter'

async function createClientProject(
  clientProject: Omit<ClientProject, 'id'>,
): Promise<ClientProject> {
  const soloClientRepository = (await postgresClient()).getRepository(
    ClientProjectEntity,
  )
  const entity = clientProjectToEntity(clientProject)
  const result = await soloClientRepository.save(entity)
  return clientProjectFromEntity(result)
}

async function createClientTeam(
  clientTeam: Omit<ClientTeam, 'id'>,
): Promise<ClientTeam> {
  const soloClientRepository = (await postgresClient()).getRepository(
    ClientTeamEntity,
  )
  const entity = clientTeamToEntity(clientTeam)
  const result = await soloClientRepository.save(entity)
  return clientTeamFromEntity(result)
}

async function findListing(
  listingSearch: ListingSearch,
): Promise<ClientListing[]> {
  let queryBuilder

  if (listingSearch.listingType === ListingType.Project) {
    const listingProjectRepository = (await postgresClient()).getRepository(
      ClientProjectEntity,
    )

    queryBuilder = await listingProjectRepository.createQueryBuilder()

    queryBuilder.andWhere('project_name LIKE :projectName', {
      projectName: '%' + listingSearch.listingName + '%',
    })

    const result = await queryBuilder.getMany()

    return result.map(clientProjectFromEntity)
  } else if (listingSearch.listingType === ListingType.Team) {
    const listingTeamRepository = (await postgresClient()).getRepository(
      ClientTeamEntity,
    )

    queryBuilder = await listingTeamRepository.createQueryBuilder()

    queryBuilder.andWhere('team_name LIKE :teamName', {
      teamName: '%' + listingSearch.listingName + '%',
    })

    const result = await queryBuilder.getMany()

    return result.map(clientTeamFromEntity)
  }
}

export const listingPgRepository = {
  createClientProject,
  createClientTeam,
  findListing,
}
