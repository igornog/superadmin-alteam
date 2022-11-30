import { Page } from '../../utils/redux/types/settings.type'
import { RightClick, Tabs } from '../../utils/types'
import ClientRequestsView from './components/ClientRequests/ClientRequestsView'
import LinkedinLogo from '../../assets/images/icons/Linkedin.svg'

export { default } from './components/ClientsView'

export const tabsClientsContent = {
  [Tabs.ClientRequests]: {
    node: <ClientRequestsView />,
    rightClick: [],
  },
  [Tabs.ActiveClients]: {
    node: <ClientRequestsView />,
    rightClick: [
      RightClick.MoveToShortlisted,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
  [Tabs.InactiveClients]: {
    node: <ClientRequestsView />,
    rightClick: [
      RightClick.MoveToAccepted,
      RightClick.EditTalentFolders,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
  [Tabs.DeclinedRequests]: {
    node: <ClientRequestsView />,
    rightClick: [
      RightClick.MoveToShortlisted,
      RightClick.EditTalentFolders,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
}

export const talentsTabs: Page[] = [
  {
    title: Tabs.ClientRequests,
    badge: 5,
    active: true,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
      // verifyClient: true,
      createClient: true,
    },
  },
  {
    title: Tabs.ActiveClients,
    badge: 150,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
    },
  },
  {
    title: Tabs.InactiveClients,
    badge: 20,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
    },
  },
  {
    title: Tabs.DeclinedRequests,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
    },
  },
]

export const clients = [
  {
    id: 1,
    name: 'Chaptr',
    logo: LinkedinLogo,
    received: '23.07.2022',
    industry: 'Web 3.0',
    listings: 1,
    assignee: null,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    companyUrl: 'chaptr.com',
  },
  {
    id: 2,
    name: 'Aviva',
    logo: null,
    received: '23.07.2022',
    industry: 'Web 3.0',
    listings: 2,
    assignee: null,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    companyUrl: 'chaptr.com',
  },
  {
    id: 3,
    name: 'Heat',
    logo: LinkedinLogo,
    received: '23.07.2022',
    industry: 'Web 3.0',
    listings: 3,
    assignee: null,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    companyUrl: 'chaptr.com',
  },
  {
    id: 4,
    name: 'Heat',
    logo: null,
    received: '23.07.2022',
    industry: 'Web 3.0',
    listings: 3,
    assignee: null,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    companyUrl: 'chaptr.com',
  },
  {
    id: 5,
    name: 'Heat',
    logo: LinkedinLogo,
    received: '23.07.2022',
    industry: 'Web 3.0',
    listings: 3,
    assignee: null,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    companyUrl: 'chaptr.com',
  },
  {
    id: 6,
    name: 'Heat',
    logo: LinkedinLogo,
    received: '23.07.2022',
    industry: 'Web 3.0',
    listings: 3,
    assignee: null,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    companyUrl: 'chaptr.com',
  },
]
