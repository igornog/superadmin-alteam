import { postgresClient } from './postgresClient';
import {FreelancerEntity} from "./entities";
import {freelancerFromEntity, freelancerToEntity} from "./freelancerConverter";
import {Freelancer} from "@yjcapp/app";

async function createFreelancer(freelancer: Omit<Freelancer,"id">): Promise<Freelancer> {
  const freelancerRepository = (await postgresClient()).getRepository(FreelancerEntity);
  const entity = freelancerToEntity(freelancer);
  const result = await freelancerRepository.save(entity);
  return freelancerFromEntity(result);
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
