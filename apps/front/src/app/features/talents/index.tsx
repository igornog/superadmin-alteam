import { Page } from '../../utils/redux/types/settings.type'
import { RightClick, Tabs } from '../../utils/types'
import AcceptedTatentsView from './components/AcceptedTalents/AcceptedTatentsView'
import AllTalentsView from './components/AllTalents/AllTalentsView'
import DeclinedTalentsView from './components/DeclinedTalents/DeclinedTalentsView'
import InboundTalentsView from './components/InboundTalents/InboundTalentsView'
import ShortlistLatentsView from './components/ShortlistTalents/ShortlistTatentsView'
import { Availability, Skills, TalentStatus } from '@yjcapp/app'

export { default } from './components/TalentsView'

export const talentsTabs: Page[] = [
  {
    title: Tabs.AllTalent,
    status: null,
    node: <AllTalentsView />,
    badge: 150,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
    },
    talentRightClick: [],
    clientRightClick: [],
  },
  {
    title: Tabs.InboundTalent,
    status: TalentStatus.Inbound,
    node: <InboundTalentsView />,
    badge: 5,
    active: true,
    settings: {
      search: true,
      downloadCSV: true,
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
    title: Tabs.ShortlistTalent,
    status: TalentStatus.Shortlisted,
    node: <ShortlistLatentsView />,
    badge: 40,
    active: false,
    settings: {
      downloadCSV: true,
      createFolder: true,
      shareFolder: true,
    },
    talentRightClick: [
      RightClick.MoveToAccepted,
      RightClick.EditTalentFolders,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToInbound,
      RightClick.MoveToDeclined,
    ],
    clientRightClick: [],
  },
  {
    title: Tabs.AcceptedTalent,
    status: TalentStatus.Accepted,
    node: <AcceptedTatentsView />,
    badge: 20,
    active: false,
    settings: {
      downloadCSV: true,
      createFolder: true,
      shareFolder: true,
    },
    talentRightClick: [
      RightClick.MoveToShortlisted,
      RightClick.EditTalentFolders,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDeclined,
    ],
    clientRightClick: [],
  },
  {
    title: Tabs.DeclinedTalent,
    status: TalentStatus.Declined,
    node: <DeclinedTalentsView />,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      sortBy: true,
      displayMode: true,
    },
    talentRightClick: [
      RightClick.MoveToAccepted,
      RightClick.MoveToShortlisted,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
    ],
    clientRightClick: [],
  },
]

export const availabilityFilters = Object.keys(Availability).map((key) => ({
  label: Availability[key as keyof typeof Availability],
  active: false,
}))

export const skillsFilters = Object.keys(Skills).map((key) => ({
  label: Skills[key as keyof typeof Skills],
  active: false,
}))
