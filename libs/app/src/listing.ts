import { SoloClient } from './client'
import { Availability } from './talent'

export interface ClientTeam {
  id?: number
  soloClient: SoloClient
  teamName: string
  teamSize: number
  workType?: WorkType
  timeZone: string
  availability: Availability
  projectLength: number
  exactRate?: number
  startDate?: Date
  difficulty: Difficulty
  learningLink: string
  roles: Role[]
  skills: string[]
  questions: string[]
  jobDescription?: string
}

export interface ClientProject {
  id: number
  soloClient: SoloClient
  projectName: string
  individuals: number
  workType?: WorkType
  timeZone: string
  availability?: Availability
  projectLength: number
  startDate?: Date
  rateFrom?: number
  rateTo?: number
  difficulty?: Difficulty
  learningLink: string
  jobDescription: string
  skills: string[]
  questions: string[]
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

export interface ListingSearch {
  listingType?: ListingType
  listingName?: string
  clientId?: number
}

export type ClientListing = ClientProject | ClientTeam
