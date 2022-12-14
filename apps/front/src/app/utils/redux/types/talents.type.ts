import {
  Availability,
  Experience,
  Listing,
  ListingStatus,
  SoloTalent,
} from '@yjcapp/app'
import { StatusType } from './status.type'

export interface TalentsState {
  listTalents: Talent[]
  selectedTalent: string | null
  status?: StatusType
  error?: string | null
}

export interface Skill {
  label: string
}

export interface Link {
  id: number
  link: string
}

export enum TalentStatus {
  Inbound = 'Inbound',
  Shortlisted = 'Shortlisted',
  Accepted = 'Accepted',
  Declined = 'Declined',
}

export class Talent implements SoloTalent {
  id: string
  firstName: string
  lastName: string
  experience: Experience
  availability: Availability
  links: string[]
  email: string
  role: string
  about: string
  assets?: string[]
  skills: string[]
  appliedDate?: Date
  phoneNumber?: string
  salaryExpectation?: string
  workExperience?: string
  listing?: Listing[]
  status?: ListingStatus

  constructor(data: any) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.experience = data.experience
    this.availability = data.availability
    this.links = data.links
    this.email = data.email
    this.role = data.role
    this.about = data.about
    this.assets = data.assets
    this.skills = data.skills
    this.appliedDate = data.appliedDate
    this.phoneNumber = data.phoneNumber
    this.salaryExpectation = data.salaryExpectation
    this.listing = data.listing
    this.status = data.status
  }
}
