import { postgresClient } from './postgresClient'
import { ClientProject } from '@yjcapp/app'
import {
  clientProjectToEntity,
  clientProjectFromEntity,
} from './clientProjectConverter'
import { ClientProjectEntity } from './entities/ClientProjet.entity'

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

export const clientProjectPgRepository = {
  createClientProject,
}
