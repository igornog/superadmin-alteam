import {
  Availability,
  Experience,
  Listing,
  TalentStatus,
  SoloTalent,
  Link,
  Asset,
  TalentNote,
} from '@yjcapp/app'
import { StatusType } from './status.type'

export interface TalentsState {
  listTalents: Talent[]
  selectedTalent: number | null
  status?: StatusType
  error?: string | null
}

export interface Skill {
  label: string
}

export class Talent implements SoloTalent {
  id: number
  firstName: string
  lastName: string
  experience: Experience
  availability: Availability
  portfolio: string
  links?: Link[]
  email: string
  role: string
  about: string
  assets?: Array<Asset | File>
  skills: string[]
  appliedDate?: Date
  phoneNumber?: string
  salaryExpectation?: string
  workExperience?: string
  listing?: Listing[]
  status?: TalentStatus
  notes?: TalentNote[]

  constructor(data: any) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.experience = data.experience
    this.availability = data.availability
    this.portfolio = data.portfolio
    this.links = data.links
    this.email = data.email
    this.role = data.role
    this.about = data.about
    this.assets = data.assets
    this.skills = data.skills
    this.appliedDate = data.appliedDate
    this.phoneNumber = data.phoneNumber
    this.salaryExpectation = data.salaryExpectation
    // this.listing = data.listing
    this.status = data.status
    this.notes = data.notes || []
  }
}
