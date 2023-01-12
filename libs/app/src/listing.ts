import { Availability } from './talent'

export interface ClientTeam {
  id?: string
}

export interface ClientProject {
  id?: string
  projectName: string
  individuals: number
  workType?: WorkType
  timeZone: string
  availability?: Availability
  projectLength: string
  startDate?: Date
  rateFrom?: number
  rateTo?: number
  difficulty?: Difficulty
  learningLink: string
  jobDescription: string
  skills: string[]
  questions: string[]
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

export enum Difficulty {
  Junior = 'Junior',
  MidSenior = 'MidSenior',
  Senior = 'Senior',
  Lead = 'Lead',
}

export type ClientListing = ClientProject | ClientTeam
