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
interface Asset {
  name : string
  link : string
}
export interface SoloTalent {
  id: string
  firstName: string
  lastName: string
  experience: Experience
  availability: Availability
  portfolio: string
  links?: Link[]
  role: string
  email: string
  about: string
  assets?: Asset[] // ["https://assets.alteam.io/users/2/065c5c49-c94a-4500-a407-390be61e2a4d"]
  skills: string[]
  appliedDate?: Date
  phoneNumber?: string
  salaryExpectation?: string
  workExperience?: string
  listing?: any
  status?: ListingStatus
}

export interface Link {
  id?: string
  name?: string
  link: string
}

export enum LinkDomain {
  Behance = 'Behance',
  Dribble = 'Dribble',
  Github = 'Github',
  Instagram = 'Instagram',
  Linkedin = 'Linkedin',
  Stackoverflow = 'Stackoverflow',
  Twitter = 'Twitter',
  Youtube = 'Youtube',
  Portfolio = 'Portfolio',
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
  Shortlisted = 'shortlisted',
  Declined = 'declined',
  Accepted = 'accepted',
  Inbound = 'inbound',
  Applicable = 'applicable',
  Marketplace = 'marketplace',
}

export interface TalentSearch {
  skills?: string[]
  experience?: string
  availability?: Availability[]
  role?: string
  status?: ListingStatus
  page?: number
  talentName?: string
}

export type Talent = GroupTalent | SoloTalent
