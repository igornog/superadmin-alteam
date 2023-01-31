export interface SoloClient {
  id?: number
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
  received?: Date
  status: ClientStatus
}

export enum ProjectType {
  AppDevelopment = 'App development',
}

export enum DeliveryType {
  OneOffProject = 'One-off project',
}

export enum TeamRequest {
  SoloFreelancer = 'Solo freelancer',
}

export enum ClientStatus {
  Request = 'Request',
  Active = 'Active',
  Inactive = 'Inactive',
  Declined = 'Declined',
}

export const CreateClientStatus = [
  {
    id: 0,
    label: 'Client Request',
    value: ClientStatus.Request,
  },
  {
    id: 1,
    label: 'Active clients',
    value: ClientStatus.Active,
  },
  {
    id: 2,
    label: 'Inactive clients',
    value: ClientStatus.Inactive,
  },
]

export interface ClientSearch {
  status?: ClientStatus
  clientName?: string
  page?: number
}
