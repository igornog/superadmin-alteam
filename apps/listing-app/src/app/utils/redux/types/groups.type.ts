import { StatusType } from './status.type'
import { Group as AtGroup, GroupTalent } from '@yjcapp/app'
import { Client } from './clients.type'
import { Talent } from './talents.type'

export interface GroupState {
  data: GroupInterface[]
  selectedGroup: number | undefined
  status?: StatusType
  error?: string | null
}

export class Group implements AtGroup {
  id: number
  name: string
  client?: Client
  talents?: Talent[]
  groupTalents?: GroupTalent[]
  subGroups: Group[]
  parent: Group

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.client = data.client
    this.talents = data.talents
    this.groupTalents = data.groupTalents
    this.subGroups = data.subGroups
    this.parent = data.parent
  }

  isParent(): boolean {
    return this.parent === undefined
  }

  hasChildren(): boolean | undefined {
    return this.subGroups && this.subGroups.length > 0
  }
}

export interface GroupInterface extends Group {
  open?: boolean
  isParent(): boolean
  hasChildren(): boolean | undefined
}
