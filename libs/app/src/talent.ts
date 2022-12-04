export interface GroupTalent {
  id: string
  email: string
  phone: string
  speciality: string
  size: string
  website: string
  about: string
  assets: string[]
}

export interface SoloTalent {
  id: string
  firstName: string
  lastName: string
  experience: string
  availability: string
  links: string[]
  role: string
  about: string
  assets: string[]
  skills: string[]
  appliedDate: Date
  phoneNumber?: string
  salaryExpectation?: string
  workExperience?: string
  listing?: Listing[]
  status: ListingStatus

}

export type ListingStatus = "shortlisted" | "rejected" | "accepted" | "inbound" | "applicable"

export interface Listing {
  companyName: string
  duration: string
  jobType: string
  status: ListingStatus
}

export interface TalentSearch {
  skills?: string[]
  experience?: string
  availability?: string
  role?: string
  status?: ListingStatus
  page?: number
}

export type Talent = GroupTalent | SoloTalent
