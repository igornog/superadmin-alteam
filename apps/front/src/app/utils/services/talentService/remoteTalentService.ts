import {
  GroupTalent,
  SoloTalent,
  TalentSearch,
  TalentService,
} from '@yjcapp/app'
import atAxios from '../axios'

export default class RemoteTalentService implements TalentService {
  retrieveGroupTalent(id: string): Promise<GroupTalent | undefined> {
    throw new Error('Method not implemented.')
  }

  createGroupTalent(talent: Omit<GroupTalent, 'id'>): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }

  retrieveSoloTalent(id: string): Promise<SoloTalent | undefined> {
    return atAxios.get(`/talent/solo/${id}`)
  }

  async createSoloTalent(talent: Omit<SoloTalent, 'id'>): Promise<SoloTalent> {
    const { data } = await atAxios.post('/talent/solo', talent)

    return data
  }

  async searchSoloTalent(talentSearch: TalentSearch): Promise<SoloTalent[]> {
    const { data } = await atAxios.get('/talent/search', {
      params: talentSearch,
    })
    return data
  }

  updateSoloTalent(talent: SoloTalent): Promise<SoloTalent> {
    return atAxios.put(`/talent/solo`, talent)
  }
}
