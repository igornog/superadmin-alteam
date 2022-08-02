import {FreelancerEntity} from "./entities";
import {DeepPartial} from "typeorm";
import {Freelancer} from "@yjcapp/app";

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


