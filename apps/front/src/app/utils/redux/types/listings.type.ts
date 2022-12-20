import { StatusType } from './status.type'
import { Availability, Experience } from '@yjcapp/app'

export interface ListingsState {
  listListings: Listing[]
  selectedListing: number | null
  status?: StatusType
  error?: string | null
}

export enum ListingStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Draft = 'Draft',
  Ended = 'Ended',
}

export enum ListingType {
  Project = 'Project',
  Team = 'Team',
}

export enum WorkType {
  Remote = 'Remote',
}

export enum RateType {
  Fixed = 'Fixed',
  Variable = 'Variable',
}

export enum Difficulty {
  Junior = 'Junior',
  MidSenior = 'MidSenior',
  Senior = 'Senior',
  Lead = 'Lead',
}

export class Listing {
  id: number
  name: string
  nbIndividual: number
  workType: WorkType
  timeZone?: string
  availability: Availability
  hours?: number
  projectLength: number
  startDate: string
  rateType: RateType
  rateFrom?: number
  rateTo?: number
  rateFixed?: number
  difficulty: Experience
  learning: string
  jobDescription: string
  screeningQuestion: string[]
  status: ListingStatus
  received: string
  talent?: number[]

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.nbIndividual = data.nbIndividual
    this.workType = data.workType
    this.timeZone = data.timeZone
    this.availability = data.availability
    this.projectLength = data.projectLength
    this.startDate = data.startDate
    this.rateType = data.rateType
    this.rateFrom = data.rateFrom
    this.rateTo = data.rateTo
    this.rateFixed = data.rateFixed
    this.difficulty = data.difficulty
    this.learning = data.learning
    this.jobDescription = data.jobDescription
    this.screeningQuestion = data.screeningQuestion
    this.status = data.status
    this.received = data.received
    this.talent = data.talent
  }
}
