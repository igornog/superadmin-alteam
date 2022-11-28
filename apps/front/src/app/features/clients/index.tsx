import { Page } from '../../utils/redux/types/settings.type';
import { RightClick, Tabs } from '../../utils/types';
import ClientRequestsView from './components/ClientRequests/ClientRequestsView';

export { default } from './components/ClientsView';

export const tabsContent = {
  [Tabs.ClientRequests]: {
    node: <ClientRequestsView />,
    talentRightClick: [],
  },
  [Tabs.ActiveClients]: {
    node: <ClientRequestsView />,
    talentRightClick: [
      RightClick.MoveToShortlisted,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
  [Tabs.InactiveClients]: {
    node: <ClientRequestsView />,
    talentRightClick: [
      RightClick.MoveToAccepted,
      RightClick.EditTalentFolders,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
  [Tabs.DeclinedRequests]: {
    node: <ClientRequestsView />,
    talentRightClick: [
      RightClick.MoveToShortlisted,
      RightClick.EditTalentFolders,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
};

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
];

export const clients = [
  {
    id: 1,
    name: 'Chaptr',
    received: '23.07.2022',
    sector: 'Web 3.0',
    listings: 1,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    website: 'chaptr.com',
  },
  {
    id: 2,
    name: 'Aviva',
    received: '23.07.2022',
    sector: 'Web 3.0',
    listings: 2,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    website: 'chaptr.com',
  },
  {
    id: 3,
    name: 'Heat',
    received: '23.07.2022',
    sector: 'Web 3.0',
    listings: 3,
    email: 'and@chaptr.com',
    phoneNumber: '+44 1234 123456',
    website: 'chaptr.com',
  },
];
