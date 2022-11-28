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
  portfolioLink: string
  role: string
  about: string
  assets: string[]
  skills: string[]
}

export type Talent = GroupTalent | SoloTalent
