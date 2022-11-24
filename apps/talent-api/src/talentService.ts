import { GroupTalent, SoloTalent, TalentService } from '@yjcapp/app'
import {
  groupTalentPgRepository,
  soloTalentPgRepository,
} from '@yjcapp/postgres-db'

export const talentService: TalentService = {
  createGroupTalent(
    groupTalent: Omit<GroupTalent, 'id'>,
  ): Promise<GroupTalent> {
    return groupTalentPgRepository.createGroupTalent(groupTalent)
  },
  retrieveGroupTalent(id: string): Promise<GroupTalent | undefined> {
    return groupTalentPgRepository.retrieveGroupTalent(id)
  },
  createSoloTalent(talent: Omit<SoloTalent, 'id'>): Promise<SoloTalent> {
    return soloTalentPgRepository.createSoloTalent(talent)
  },
  retrieveSoloTalent(id: string): Promise<SoloTalent | undefined> {
    return soloTalentPgRepository.retrieveSoloTalent(id)
  },
}
