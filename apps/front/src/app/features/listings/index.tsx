import { Page } from '../../utils/redux/types/settings.type'
import { RightClick } from '../../utils/types'
import ProjectsView from './components/Projects/ProjectsView'
import { ListingType, Clients, PriceRanges, ListingStatus } from '@yjcapp/app'
import TeamsView from './components/Teams/TeamsView'

export { default } from './components/ListingsView'

export const listingTabs: Page[] = [
  {
    title: 'Project',
    status: ListingType.Project,
    node: <ProjectsView />,
    badge: 1,
    active: true,
    settings: {
      search: true,
      downloadCSV: false,
      inviteTalent: true,
      displayMode: true,
      sortBy: true,
    },
    talentRightClick: [
      RightClick.MoveToShortlisted,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDeclined,
    ],
    clientRightClick: [],
  },
  {
    title: 'Team',
    status: ListingType.Team,
    node: <TeamsView />,
    badge: 0,
    active: false,
    settings: {
      search: true,
      downloadCSV: false,
      inviteTalent: true,
      displayMode: true,
      sortBy: true,
    },
    talentRightClick: [
      RightClick.MoveToShortlisted,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDeclined,
    ],
    clientRightClick: [],
  }
]

export const clientsFilters = Object.keys(Clients).map((key) => ({
  label: Clients[key as keyof typeof Clients],
  active: false,
}))

export const statusFilters = Object.keys(ListingStatus).map((key) => ({
  label: ListingStatus[key as keyof typeof ListingStatus],
  active: false,
}))

export const priceRangeFilters = Object.keys(PriceRanges).map((key) => ({
  label: PriceRanges[key as keyof typeof PriceRanges],
  active: false,
}))