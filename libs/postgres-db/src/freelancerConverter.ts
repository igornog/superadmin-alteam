import {FreelancerEntity} from "./entities/Freelancer.entity";
import {Freelancer} from "./freelancer";
import {DeepPartial} from "typeorm";

export function freelancerFromEntity(entity: FreelancerEntity): Freelancer {
  return {
   name : entity.name,
    id : entity.id
  };
}

export function freelancerToEntity(freelancer: DeepPartial<Freelancer>): DeepPartial<FreelancerEntity> {
  return {
    name: freelancer.name,
    id: freelancer.id,
  };
}


