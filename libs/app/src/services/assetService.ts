export interface SoloTalentAsset {
  name: string
  asset: Blob
}

export interface AssetService {
  createTalentAsset(talentId: string, file: SoloTalentAsset): Promise<string>

}
