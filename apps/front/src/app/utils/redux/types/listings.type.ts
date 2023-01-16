import { StatusType } from './status.type'
import {
  Availability,
  ClientListing,
  ClientProject,
  ClientTeam,
  Difficulty,
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

// export enum ListingStatus {
//   Active = 'Active',
//   Inactive = 'Inactive',
//   Draft = 'Draft',
//   Ended = 'Ended',
// }

export class Project implements ClientProject {
  id: number
  soloClient: Client
  projectName: string
  individuals: number
  workType: WorkType
  timeZone: string
  availability: Availability
  hours?: number
  projectLength: number
  startDate: Date
  rateFrom: number
  rateTo: number
  difficulty: Difficulty
  learningLink: string
  jobDescription: string
  skills: string[]
  questions: string[]
  // status: ListingStatus

  constructor(data: any) {
    this.id = data.id
    this.soloClient = data.soloClient
    this.projectName = data.projectName
    this.individuals = data.individuals
    this.workType = data.workType
    this.timeZone = data.timeZone
    this.availability = data.availability
    this.projectLength = data.projectLength
    this.startDate = data.startDate
    this.rateFrom = data.rateFrom
    this.rateTo = data.rateTo
    this.difficulty = data.difficulty
    this.learningLink = data.learning
    this.jobDescription = data.jobDescription
    this.skills = data.skills || []
    this.questions = data.questions || []
    // this.status = data.status
    // this.received = data.received
    // this.talent = data.talent
  }
}

export class Team implements ClientTeam {
  id: number
  soloClient: Client
  teamName: string
  teamSize: number
  workType?: WorkType
  timeZone: string
  availability: Availability
  projectLength: number
  startDate?: Date
  exactRate?: number
  difficulty: Difficulty
  learningLink: string
  roles: Role[]
  skills: string[]
  questions: string[]
  jobDescription?: string

  constructor(data: any) {
    this.id = data.id
    this.soloClient = data.soloClient
    this.teamName = data.teamName
    this.teamSize = data.teamSize
    this.workType = data.workType
    this.timeZone = data.timeZone
    this.availability = data.availability
    this.projectLength = data.projectLength
    this.startDate = data.startDate
    this.exactRate = data.exactRate
    this.difficulty = data.difficulty
    this.learningLink = data.learning
    this.roles = data.roles || []
    this.skills = data.skills || []
    this.questions = data.questions || []
    this.jobDescription = data.jobDescription
    // this.status = data.status
    // this.received = data.received
    // this.talent = data.talent
  }
}
