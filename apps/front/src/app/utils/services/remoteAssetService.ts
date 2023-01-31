import { AssetService, SoloTalentAsset } from '@yjcapp/app'
import atAxios from './axios'

export default class RemoteAssetService implements AssetService {
  createTalentAsset(talentId: string, file: SoloTalentAsset): Promise<string> {
    const formData = new FormData()
    formData.append('file', file.asset)
    return atAxios.post(`/assets/solo/${talentId}/${file.name}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
