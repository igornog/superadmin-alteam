import {
  ClientNote,
  ClientStatus,
  DeliveryType,
  EmailStatus,
  ProjectType,
  SoloClient,
  Talent,
} from '@yjcapp/app'
import { StatusType } from './status.type'

export interface ClientsState {
  listClients: Client[]
  selectedClient: number | null
  status?: StatusType
  error?: string | null
}

export class Client implements SoloClient {
  id?: number
  logo?: string
  companyName: string
  phoneNumber: string
  companyUrl: string
  linkedinUrl?: string
  industry?: string
  projectType?: ProjectType
  deliveryType?: DeliveryType
  teamRequest?: string
  emailStatus: EmailStatus
  request?: string
  email?: string
  fullName?: string
  position?: string
  received?: Date
  assignee?: Talent[]
  status?: ClientStatus
  notes?: ClientNote[]

  constructor(data: any) {
    this.id = data.id
    this.companyName = data.companyName
    this.phoneNumber = data.phoneNumber
    this.companyUrl = data.companyUrl
    this.linkedinUrl = data.linkedinUrl
    this.emailStatus = data.emailStatus
    this.industry = data.industry
    this.projectType = data.projectType
    this.deliveryType = data.deliveryType
    this.teamRequest = data.teamRequest
    this.request = data.request
    this.email = data.email
    this.fullName = data.fullName
    this.position = data.position
    this.received = data.received
    this.assignee = data.assignee || []
    this.status = data.status
    this.notes = data.notes || []
  }
}
