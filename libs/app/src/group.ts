import { SoloClient } from './client'
import { GroupTalent, SoloTalent } from './talent'

export interface Group {
  id?: number
  name: string
  client?: SoloClient
  talents?: SoloTalent[]
  groupTalents?: GroupTalent[]
  subGroups?: Group[]
  parent: Group
}

export interface GroupSearch {
  id?: number
}
