import {
  GroupTalent,
  SoloTalent,
  TalentNote,
  TalentSearch,
  TalentService,
} from '@yjcapp/app'
import atAxios from './axios'

export default class RemoteTalentService implements TalentService {
  addNoteToGroupTalent(id: string, note: Partial<TalentNote>): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }
  updateNoteOnGroupTalent(soloTalentId: string, noteId: string, note: TalentNote): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }
  deleteNoteOnGroupTalent(soloTalentId: string, noteId: string): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }
  addNoteToSoloTalent(id: string, note: Partial<TalentNote>): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }
  updateNoteOnSoloTalent(soloTalentId: string, noteId: string, note: TalentNote): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }
  deleteNoteOnSoloTalent(soloTalentId: string, noteId: string): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }
  retrieveGroupTalent(): Promise<GroupTalent | undefined> {
    throw new Error('Method not implemented.')
  }

  createGroupTalent(): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }

  retrieveSoloTalent(id: string): Promise<SoloTalent | undefined> {
    return atAxios.get(`/talent/solo/${id}`)
  }

  async createSoloTalent(talent: Omit<SoloTalent, 'id'>): Promise<SoloTalent> {
    const { data } = await atAxios.post('/talent/solo', talent)

    return data
  }

  async searchSoloTalent(searchName: TalentSearch): Promise<SoloTalent[]> {
    const { data } = await atAxios.get('/talent/search', {
      params: searchName,
    })
    return data
  }

  async updateSoloTalent(talent: SoloTalent): Promise<SoloTalent> {
    const { data } = await atAxios.put(`/talent/solo`, talent)

    return data
  }

  async patchSoloTalent(talent: Partial<SoloTalent>): Promise<SoloTalent> {
    const { data } = await atAxios.patch(`/talent/solo`, talent)

    return data
  }
}
