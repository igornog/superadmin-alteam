export interface GroupTalent {
  id: number
  email: string
  phone: string
  speciality: string
  size: string
  website: string
  about: string
  assets: string[]
  notes?: TalentNote[]
}

export interface SoloTalent {
  id: number
  firstName: string
  lastName: string
  experience: Experience
  availability: Availability
  portfolio: string
  links?: Link[]
  role: string
  email: string
  about: string
  assets?: Asset[]
  skills: string[]
  appliedDate?: Date
  phoneNumber?: string
  salaryExpectation?: string
  workExperience?: string
  listing?: Listing[]
  status?: TalentStatus
  notes?: TalentNote[]
}

export interface Asset {
  name: string
  link: string
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

export enum Skills {
  Figma = 'Figma',
  UIUXDesign = 'UI/UX Design',
  WebDevelopment = 'Web Development',
  ReactNative = 'React Native',
  Wireframing = 'Wireframing',
}

export enum TalentStatus {
  Shortlisted = 'shortlisted',
  Declined = 'declined',
  Accepted = 'accepted',
  Inbound = 'inbound',
  Marketplace = 'marketplace',
}

export interface Listing {
  companyName: string
  duration: string
  jobType: string
  status: TalentStatus
}

export interface TalentSearch {
  skills?: string[]
  sort?: string | null
  experience?: string
  availability?: Availability[]
  role?: string
  status?: TalentStatus
  page?: number
  talentName?: string
}

export interface TalentNote {
  id: number
  author: string
  text: string
  createdAt: Date
  upatedAt?: Date
}

export type Talent = GroupTalent | SoloTalent
