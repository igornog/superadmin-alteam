import { SoloClient } from './client'
import { Availability } from './talent'

export enum Clients {
  Glide = 'Glide',
  Chaptr = 'Chaptr',
  Cerculla = 'Cerculla',
  Ticknovate = 'Ticknovate',
  Barbr = 'Barbr',
}

export enum PriceRanges {
  From0to1k = '0 to 1K',
  From1to5k = '1K to 5K',
  From5to10k = '5K to 10K',
  From10to20k = '10K to 20K',
  From20to50k = '20K to 50K',
  From50to100k = '50K to 100K',
  From100k = '100K+',
}

export interface ClientListing {
  id?: number
  soloClient: SoloClient
  listingName: string
  individuals: number
  workType?: WorkType
  timeZone: string
  availability: Availability
  projectLength: number
  startDate?: Date
  currency?: Currency
  exactRate?: number
  rateFrom?: number
  rateTo?: number
  difficulty: Difficulty
  learningLink: string
  roles: Role[]
  skills: string[]
  questions: string[]
  jobDescription?: string
  listingType: ListingType
  status: ListingState
  createdAt: Date
}

export interface Role {
  roleName: string
  description?: string
  price?: number
  percentage?: number
}

export enum WorkType {
  OnSite = 'On Site',
  Hybrid = 'Hybrid',
  Remote = 'Remote',
}

export enum RateType {
  Fixed = 'Fixed',
  Variable = 'Variable',
}

export enum ProjectLengthType {
  Hourly = 'Hourly',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

export enum Difficulty {
  Junior = 'Junior',
  MidSenior = 'MidSenior',
  Senior = 'Senior',
  Lead = 'Lead',
}

export enum ListingType {
  Project = 'Project',
  Team = 'Team',
}

export enum ListingStatus {
  Draft = 'Draft',
  Active = 'Active',
  Running = 'Running',
  Disabled = 'Disabled',
  Ended = 'Ended',
}

export enum ListingState {
  Draft = 'Draft',
  Active = 'Active',
  Deactivate = 'Deactivate',
  Ended = 'Ended',
}

export enum Currency {
  Dollars = 'Dollars',
  Euros = 'Euros',
  Pounds = 'Pounds',
}

export interface ListingSearch {
  listingId?: number
  listingName?: string
  skills?: string[]
  sort?: string | null
  status?: ListingStatus
  listingType?: ListingType
  clientId?: number
  clientEmail?: string
}
