export interface SoloClient {
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
