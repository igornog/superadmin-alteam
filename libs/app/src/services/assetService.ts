export interface SoloTalentAsset {
  name: string
  asset: Buffer
}

export interface AssetService {
  createTalentAsset(talentId: string, file: SoloTalentAsset): Promise<string>

}
