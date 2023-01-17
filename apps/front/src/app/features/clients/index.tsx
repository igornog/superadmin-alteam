import { Page } from '../../utils/redux/types/settings.type'
import { RightClick, Tabs } from '../../utils/types'
import ClientRequestsView from './components/ClientRequests/ClientRequestsView'
import { ClientStatus } from '@yjcapp/app'

export { default } from './components/ClientsView'

export const clientsTabs: Page[] = [
  {
    title: Tabs.ClientRequests,
    status: ClientStatus.Request,
    node: <ClientRequestsView />,
    badge: 5,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
      createClient: true,
    },
    talentRightClick: [],
    clientRightClick: [
      RightClick.MoveToActive,
      RightClick.MoveToInactive,
      RightClick.ShareRequest,
      RightClick.MoveToDeclined,
    ],
  },
  {
    title: Tabs.ActiveClients,
    status: ClientStatus.Active,
    node: <ClientRequestsView />,
    badge: 150,
    active: true,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
    },
    talentRightClick: [],
    clientRightClick: [
      RightClick.MoveToInactive,
      RightClick.ShareRequest,
      RightClick.MoveToDeclined,
    ],
  },
  {
    title: Tabs.InactiveClients,
    status: ClientStatus.Inactive,
    node: <ClientRequestsView />,
    badge: 20,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
    },
    talentRightClick: [],
    clientRightClick: [
      RightClick.MoveToActive,
      RightClick.MoveToDeclined,
      RightClick.ShareClient,
    ],
  },
  {
    title: Tabs.DeclinedRequests,
    status: ClientStatus.Declined,
    node: <ClientRequestsView />,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      displayMode: true,
      sortBy: true,
    },
    talentRightClick: [],
    clientRightClick: [
      RightClick.MoveToActive,
      RightClick.MoveToInactive,
      RightClick.ShareRequest,
      RightClick.DeleteRequest,
    ],
  },
]
