import React from 'react'
import { RightClick } from '../../types'
import { StatusType } from './status.type'
import { ClientStatus, ListingStatus } from '@yjcapp/app'

export interface SettingsState {
  tabs: Page[]
  filters: FilterInterface
  sort: string | null
  header: Settings
  displayMode: DisplayMode
  status?: StatusType
  error?: string | null
}

export interface FilterInterface {
  skills?: Filter[]
  jobTypes?: Filter[]
  searchName?: string
}

export interface Page {
  title: string
  status: ListingStatus | ClientStatus | null
  node?: React.ReactNode
  badge?: number
  action?: string
  active?: boolean
  settings: Settings
  talentRightClick: RightClick[]
  clientRightClick: RightClick[]
}

export interface Settings {
  search?: boolean
  downloadCSV?: boolean
  inviteTalent?: boolean
  displayMode?: boolean
  displayStatus?: boolean
  sortBy?: boolean
  shareFolder?: boolean
  verifyClient?: boolean
  createClient?: boolean
  createFolder?: boolean
  tabsTalentColumn?: any
}

export interface Filter {
  label: string
  active?: boolean
}

export interface Sort {
  value: string
}

export enum SortTypes {
  Alphabetical = 'alphabetical',
  MostRecent = 'mostRecent',
  Status = 'status',
}

export enum DisplayMode {
  List = 'list',
  Grid = 'grid',
}

export enum SideDrawerVariant {
  Talent = 'Talent',
  Client = 'Client',
  ClientListings = 'ClientListings',
  CreateClient = 'CreateClient',
}

export class SideDrawer {
  content: React.ReactNode
  size: string
  backgroundColor: string
  withBackdrop: boolean

  constructor(data: any) {
    this.content = data.content
    this.size = data.size
    this.backgroundColor = data.backgroundColor
    this.withBackdrop = data.withBackdrop
  }
}

export enum ModalSize {
  ExtraSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export interface HandlesettingsProps {
  tabs: Page[]
  filters?: Filter[]
  sort?: Sort
  jobTypes?: Filter[]
}

export enum Column {
  Talent = 'Talent',
  Applied = 'Applied',
  Availability = 'Availability',
  Skills = 'Skills',
  Status = 'Status',
  AssignedTo = 'AssignedTo',

  Client = 'Client',
  Received = 'Received',
  Listings = 'Listings',
  Assignees = 'Assignees',
  Email = 'Email',
  Phone = 'Phone',
  CompanyUrl = 'CompanyUrl',
}
