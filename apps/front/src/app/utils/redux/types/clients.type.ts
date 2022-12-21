import { DeliveryType, ProjectType, SoloClient, TeamRequest } from '@yjcapp/app'
import { StatusType } from './status.type'

export interface ClientsState {
  listClients: Client[]
  selectedClient: string | null
  status?: StatusType
  error?: string | null
}

export class Client implements SoloClient {
  id?: string
  logo?: string
  companyName: string
  phoneNumber: string
  companyUrl: string
  linkedinUrl?: string
  industry?: string
  projectType?: ProjectType
  deliveryType?: DeliveryType
  teamRequest?: TeamRequest
  request?: string
  email?: string
  fullName?: string
  position?: string

  constructor(data: any) {
    this.id = data.id
    this.companyName = data.name
    this.linkedinUrl = data.logo
    this.request = data.received
    this.industry = data.industry
    this.projectType = data.projectType
    this.deliveryType = data.deliveryType
    this.teamRequest = data.teamRequest
    this.fullName = data.listings
    this.position = data.assignee
    this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.companyUrl = data.companyUrl
  }
}
