import {AuthService, GroupTalent, SoloTalent, TalentSearch, TalentService} from '@yjcapp/app'
import axios from '../axios'
import atAxios from "../axios";

export default class RemoteTalentService implements TalentService {

  retrieveGroupTalent(id: string): Promise<GroupTalent | undefined> {
    throw new Error("Method not implemented.");
  }

  createGroupTalent(talent: Omit<GroupTalent, "id">): Promise<GroupTalent> {
    throw new Error("Method not implemented.");
  }
  retrieveSoloTalent(id: string): Promise<SoloTalent | undefined> {
    return atAxios.get(`/talent/solo/${id}`)
  }

  createSoloTalent(talent: Omit<SoloTalent, "id">): Promise<SoloTalent> {
    return atAxios.post('/talent/solo', talent)
  }

  searchSoloTalent(talentSearch: TalentSearch): Promise<SoloTalent[]> {
   return atAxios.get('/talent/solo/search', {params: talentSearch})
  }

}
