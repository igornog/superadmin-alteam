import { StatusType } from './status.type'

export interface AppState {
  sidePanel: {
    isFixed: boolean
    isVisible: boolean
  }
  status?: StatusType
  error?: string | null
}
