export interface GroupTalent {
  id: string
  email: string
  phone: string
  speciality: string
  size: string
  website: string
  about: string
  assets: string[]
}

export interface SoloTalent {
  id: string
  firstName: string
  lastName: string
  experience: Experience
  availability: Availability
  links: string[]
  role: string
  email: string
  about: string
  assets?: string[]
  skills: string[]
  appliedDate?: Date
  phoneNumber?: string
  salaryExpectation?: string
  workExperience?: string
  listing?: Listing[]
  status?: ListingStatus
}

export enum Experience {
  Junior = 'Junior',
  MidSenior = 'Mid Senior',
  Senior = 'Senior',
  Lead = 'Lead',
}

export enum Availability {
  PartTime = 'Part Time',
  EveningsWe = 'Evenings and Week-ends',
  FullTime = 'Full Time',
}

export enum ListingStatus {
  Shortlisted = 'Shortlisted',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
  Inbound = 'Inbound',
  Applicable = 'Applicable',
}

export interface Listing {
  companyName: string
  duration: string
  jobType: string
  status: ListingStatus
}

export interface TalentSearch {
  skills?: string[]
  experience?: string
  availability?: string
  role?: string
  status?: ListingStatus
  page?: number
}

export type Talent = GroupTalent | SoloTalent
