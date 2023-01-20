import { StatusType } from './status.type'
import {
  Availability,
  ClientListing,
  Currency,
  Difficulty,
  ListingState,
  ListingType,
  Role,
  WorkType,
} from '@yjcapp/app'
import { Client } from './clients.type'

export interface ListingsState {
  listListings: ClientListing[]
  selectedListing: number | null
  status?: StatusType
  error?: string | null
}

export class Listing implements ClientListing {
  id: number
  soloClient: Client
  listingName: string
  individuals: number
  workType?: WorkType
  timeZone: string
  availability: Availability
  projectLength: number
  startDate?: Date
  exactRate?: number
  currency?: Currency
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

  constructor(data: any) {
    this.id = data.id
    this.soloClient = data.soloClient
    this.listingName = data.listingName
    this.individuals = data.individuals
    this.workType = data.workType
    this.timeZone = data.timeZone
    this.availability = data.availability
    this.projectLength = data.projectLength
    this.startDate = data.startDate
    this.exactRate = data.exactRate
    this.rateFrom = data.rateFrom
    this.rateTo = data.rateTo
    this.difficulty = data.difficulty
    this.learningLink = data.learningLink
    this.roles = data.roles || []
    this.skills = data.skills || []
    this.questions = data.questions || []
    this.jobDescription = data.jobDescription
    this.listingType = data.listingType
    this.status = data.status
  }
}
