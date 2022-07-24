import { postgresClient } from './postgresClient';
import {FreelancerEntity} from "./entities/Freelancer.entity";
import {Freelancer} from "./freelancer";
import {freelancerFromEntity, freelancerToEntity} from "./freelancerConverter";

async function createFreelancer(freelancer: Freelancer): Promise<number> {
  const freelancerRepository = (await postgresClient()).getRepository(FreelancerEntity);
  const entity = freelancerToEntity(freelancer);
  const result = await freelancerRepository.save(entity);
  return result.id;
}

async function retrieveFreelancer(id: number): Promise<Freelancer | undefined> {
  const freelancerRepository = (await postgresClient()).getRepository(FreelancerEntity);
  const freelancerEntity = await freelancerRepository.findOneBy({ id });
  if (freelancerEntity) {
    return freelancerFromEntity(freelancerEntity);
  }
}

async function updateFreelancer(freelancer: Freelancer): Promise<void> {
  const freelancerRepository = (await postgresClient()).getRepository(FreelancerEntity);
  const entity = freelancerToEntity(freelancer);
  await freelancerRepository.save(entity);
}

async function deleteFreelancer(id: string): Promise<void> {
  const freelancerRepository = (await postgresClient()).getRepository(FreelancerEntity);
  await freelancerRepository.delete(id);
}

export const freelancerPgRepository = {
  createFreelancer,
  retrieveFreelancer,
  deleteFreelancer,
  updateFreelancer
};
