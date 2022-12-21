import { Page } from '../../utils/redux/types/settings.type'
import { RightClick, Tabs } from '../../utils/types'
import ClientRequestsView from './components/ClientRequests/ClientRequestsView'

export { default } from './components/ClientsView'

export const clientsTabs: Page[] = [
  {
    title: Tabs.ClientRequests,
    status: null,
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
    clientRightClick: [],
  },
  {
    title: Tabs.ActiveClients,
    status: null,
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
    clientRightClick: [],
  },
  {
    title: Tabs.InactiveClients,
    status: null,
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
    status: null,
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
