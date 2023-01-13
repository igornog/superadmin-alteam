import { ClientProject } from './listing'
import { Talent } from './talent'

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
  projects: ClientProject[]
  assignee?: Talent[]
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
  Request = 'request',
  Active = 'active',
  Inactive = 'inactive',
  Declined = 'declined',
}

export interface ClientSearch {
  status?: ClientStatus
  clientName?: string
  page?: number
}
