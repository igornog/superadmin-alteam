import { freelancerPgRepository } from '@yjcapp/postgres-db';
import { logger } from '@yjcapp/api-utils';
import { HttpError } from '../../../libs/api-utils/src/errorHandler';
import {
  transformGroupWebFlowRequest,
  transformSoloWebFlowRequest,
} from './webFlowRequest';

export function createFreelancer(freelancer: any) {
  console.log('Creating freelancer', freelancer);
  if (freelancer.email !== undefined) {
    return freelancerPgRepository.createGroup(
      transformGroupWebFlowRequest(freelancer)
    );
  }
  return freelancerPgRepository.createFreelancer(
    transformSoloWebFlowRequest(freelancer)
  );
}

export async function retrieve(id: number) {
  logger.info('Retrieving freelancer', { id });
  const freelancer = await freelancerPgRepository.retrieveFreelancer(id);
  if (freelancer === undefined) {
    throw new HttpError(404, 'Freelancer not found');
  }
  return freelancer;
}
