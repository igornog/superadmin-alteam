import RemoteAssetService from './remoteAssetService'
import RemoteAuthService from './remoteAuthService'
import RemoteClientService from './remoteClientService'
import RemoteGroupService from './remoteGroupService'
import RemoteListingService from './remoteListingService'
import RemoteTalentService from './remoteTalentService'

export const assetService = new RemoteAssetService()
export const authService = new RemoteAuthService()
export const clientService = new RemoteClientService()
export const listingService = new RemoteListingService()
export const talentService = new RemoteTalentService()
export const groupService = new RemoteGroupService()
