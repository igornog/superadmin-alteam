import {Freelancer} from "@yjcapp/app";
import {freelancerPgRepository} from "@yjcapp/postgres-db";
import {logger} from "@yjcapp/api-utils";
import {HttpError} from "../../../libs/api-utils/src/errorHandler";

export function createFreelancer(freelancer : Omit<Freelancer,"id">){
  logger.info("Creating freelancer", freelancer)
  return Promise.resolve();
  //return freelancerPgRepository.createFreelancer(freelancer)
}
export async function retrieve(id: number) {
  logger.info("Retrieving freelancer", {id})
  const freelancer = await freelancerPgRepository.retrieveFreelancer(id)
  if(freelancer === undefined){
    throw new HttpError(404,"Freelancer not found")
  }
  return freelancer
}

