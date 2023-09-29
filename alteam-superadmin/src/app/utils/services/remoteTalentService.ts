import {
  GroupTalent,
  SoloTalent,
  TalentNote,
  TalentSearch,
  TalentService,
} from '@yjcapp/app'
import atAxios from './axios'
import axios from 'axios'

export default class RemoteTalentService implements TalentService {
  uploadAssetsOnSoloTalent(
    soloTalentId: string,
    fileName: string,
    filePath: string,
  ): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }
  addNoteToGroupTalent(
    id: string,
    note: Partial<TalentNote>,
  ): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }
  updateNoteOnGroupTalent(
    soloTalentId: string,
    noteId: string,
    note: TalentNote,
  ): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }
  deleteNoteOnGroupTalent(
    soloTalentId: string,
    noteId: string,
  ): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }
  addNoteToSoloTalent(
    id: string,
    note: Partial<TalentNote>,
  ): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }
  updateNoteOnSoloTalent(
    soloTalentId: string,
    noteId: string,
    note: TalentNote,
  ): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }
  deleteNoteOnSoloTalent(
    soloTalentId: string,
    noteId: string,
  ): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }
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

    if (talent.assets) {
      // saving asset on AWS S3
      axios.postForm(`http://localhost:8080/talent/solo/${data.id}/assets`, {
        file: talent.assets[0] as unknown as File,
      })
    }

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

  async putSoloTalent(talent: Partial<SoloTalent>): Promise<SoloTalent> {
    const { data } = await atAxios.put(`/talent/solo`, talent)

    return data
  }

  uploadWeebflowAssetsOnSoloTalent(
    soloTalentId: string,
    s3FileUrl: string,
  ): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }

  async deleteAssetOnSoloTalent(): Promise<SoloTalent> {
    throw new Error('Method not implemented.')
  }

  uploadAssetsOnGroupTalent(
    groupTalentId: string,
    fileName: string,
    filePath: string,
  ): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }

  uploadWeebflowAssetsOnGroupTalent(
    groupTalentId: string,
    s3FileUrl: string,
  ): Promise<GroupTalent> {
    throw new Error('Method not implemented.')
  }
}
