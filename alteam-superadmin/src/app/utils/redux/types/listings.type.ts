import { StatusType } from './status.type'
import {
  Availability,
  ClientListing,
  Currency,
  Difficulty,
  ListingState,
  ListingType,
  Notification,
  Role,
  SoloClient,
  WorkType,
} from '@yjcapp/app'

export interface ListingsState {
  listListings: ClientListing[]
  selectedListing: number | null
  status?: StatusType
  error?: string | null
}

export class Listing implements ClientListing {
  id: number
  soloClient: SoloClient
  listingName: string
  role: string
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
  notifications?: Notification[]
  status: ListingState
  createdAt: Date

  constructor(data: any) {
    this.id = data.id
    this.soloClient = data.soloClient
    this.listingName = data.listingName
    this.role = data.Role
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
    this.notifications = data.notifications || []
    this.status = data.status
    this.createdAt = data.createdAt
  }
}
