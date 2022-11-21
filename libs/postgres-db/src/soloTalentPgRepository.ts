import {postgresClient} from './postgresClient';
import {SoloTalent} from "@yjcapp/app";
import {SoloTalentEntity} from "./entities";
import {soloTalentFromEntity, soloTalentToEntity} from "./soloTalentConverter";

async function createSoloTalent(soloTalent: Omit<SoloTalent, "id">): Promise<SoloTalent> {
  const soloTalentRepository = (await postgresClient()).getRepository(SoloTalentEntity);
  const entity = soloTalentToEntity(soloTalent);
  const result = await soloTalentRepository.save(entity);
  return soloTalentFromEntity(result);
}

async function retrieveSoloTalent(id: string): Promise<SoloTalent | undefined> {
  const soloTalentRepository = (await postgresClient()).getRepository(SoloTalentEntity);
  const result = await soloTalentRepository.findOneBy({id: parseInt(id)});
  return result ? soloTalentFromEntity(result) : undefined;
}

export const soloTalentPgRepository = {
  createSoloTalent,
  retrieveSoloTalent,
}
