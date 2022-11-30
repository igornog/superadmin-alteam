import { StatusType } from './status.type'

export interface ClientsState {
  listClients: Client[]
  selectedClient: number | null
  status?: StatusType
  error?: string | null
}

export class Client {
  id: number
  name: string
  logo: string
  received: string
  industry: string
  listings: number
  assignee: number
  email: string
  phoneNumber: string
  companyUrl: string

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.logo = data.logo
    this.received = data.received
    this.industry = data.industry
    this.listings = data.listings
    this.assignee = data.assignee
    this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.companyUrl = data.companyUrl
  }
}
