import { Page } from '../../utils/redux/types/settings.type';
import { RightClick, Tabs } from '../../utils/types';
import AcceptedTatentsView from './components/AcceptedTalents/AcceptedTatentsView';
import DeclinedTalentsView from './components/DeclinedTalents/DeclinedTalentsView';
import InboundTalentsView from './components/InboundTalents/InboundTalentsView';
import ShortlistLatentsView from './components/ShortlistTalents/ShortlistTatentsView';

export { default } from './components/TalentsView';

export const tabsContent = {
  [Tabs.InboundTalent]: {
    node: <InboundTalentsView />,
    talentRightClick: [
      RightClick.MoveToShortlisted,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
  [Tabs.ShortlistTalent]: {
    node: <ShortlistLatentsView />,
    talentRightClick: [
      RightClick.MoveToAccepted,
      RightClick.EditTalentFolders,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
      RightClick.MoveToDesclined,
    ],
  },
  [Tabs.DeclinedTalent]: {
    node: <DeclinedTalentsView />,
    talentRightClick: [
      RightClick.MoveToAccepted,
      RightClick.MoveToShortlisted,
      RightClick.SendEmailToTalent,
      RightClick.ShareTalent,
    ],
  },
  [Tabs.AcceptedTalent]: {
    node: <AcceptedTatentsView />,
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
    title: Tabs.AllTalent,
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
    title: Tabs.InboundTalent,
    badge: 5,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      inviteTalent: true,
      displayMode: true,
      sortBy: true,
    },
  },
  {
    title: Tabs.ShortlistTalent,
    badge: 40,
    active: true,
    settings: {
      downloadCSV: true,
      createFolder: true,
    },
  },
  {
    title: Tabs.AcceptedTalent,
    badge: 20,
    active: false,
    settings: {
      downloadCSV: true,
      createFolder: true,
    },
  },
  {
    title: Tabs.DeclinedTalent,
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      sortBy: true,
      displayMode: true,
    },
  },
  {
    title: Tabs.Applicants,
    active: false,
    settings: {},
  },
];

export const talentsFilters = [
  {
    label: 'Figma',
    active: false,
  },
  {
    label: 'UI/UX Design',
    active: true,
  },
  {
    label: 'Web Development',
    active: false,
  },
  {
    label: 'React Native',
    active: false,
  },
  {
    label: 'Wireframing',
    active: false,
  },
];

export const talentsJobType = [
  {
    label: 'Full-Time',
    active: false,
  },
  {
    label: 'Part-Time',
    active: false,
  },
  {
    label: 'Evenings & Weekends',
    active: false,
  },
];

export const talents = [
  {
    id: 1,
    fullName: 'Bob Snailson',
    jobName: 'UI/UX Designer',
    jobType: 'Full Time',
    applied: '23.07.2022',
    skills: [
      { label: 'UI/UX Design' },
      { label: 'Figma' },
      { label: 'Sketch' },
      { label: 'Wireframe' },
      { label: 'Prototyping' },
      { label: 'Prototyping' },
      { label: 'Wireframe' },
    ],
    links: [
      {
        id: 1,
        link: 'https://github.com/superuser',
      },
      {
        id: 2,
        link: 'https://behance.com/superuser',
      },
      {
        id: 3,
        link: 'https://monportfolio.com',
      },
      {
        id: 4,
        link: 'https://stackoverflow.com/superuser',
      },
      {
        id: 5,
        link: 'https://linkedin.com/superuser',
      },
    ],
  },
  {
    id: 2,
    fullName: 'Tom Black',
    jobName: 'React Native Developer',
    jobType: 'Part-Time',
    applied: '23.07.2022',
    skills: [],
    links: [],
  },
  {
    id: 3,
    fullName: 'Abu Junjun',
    jobName: 'Graphic Designer',
    jobType: 'Evenings & Weekends',
    applied: '23.07.2022',
    skills: [
      { label: 'Logo Design' },
      { label: 'Illustrator' },
      { label: 'Photoshop' },
      { label: 'InDesign' },
      { label: 'Print Design' },
    ],
    links: [],
  },
  {
    id: 4,
    fullName: 'Chaps D',
    jobName: 'UI/UX Design',
    jobType: 'Part-Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'UI/UX Design' },
      { label: 'Figma' },
      { label: 'User Testing' },
      { label: 'Wireframe' },
      { label: 'UX Research' },
    ],
    links: [],
  },
  {
    id: 5,
    fullName: 'Mega Devs',
    jobName: 'Full Stack Development',
    jobType: 'Full Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'React Native' },
      { label: 'Java Script' },
      { label: 'Cyber Security' },
      { label: 'C++' },
      { label: 'HTML/CSS' },
    ],
    links: [],
  },
  {
    id: 6,
    fullName: 'Chaps D',
    jobName: 'UI/UX Design',
    jobType: 'Part-Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'UI/UX Design' },
      { label: 'Figma' },
      { label: 'User Testing' },
      { label: 'Wireframe' },
      { label: 'UX Research' },
    ],
    links: [],
  },
  {
    id: 7,
    fullName: 'Mega Devs',
    jobName: 'Full Stack Development',
    jobType: 'Full Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'React Native' },
      { label: 'Java Script' },
      { label: 'Cyber Security' },
      { label: 'C++' },
      { label: 'HTML/CSS' },
    ],
    links: [],
  },
  {
    id: 8,
    fullName: 'Chaps D',
    jobName: 'UI/UX Design',
    jobType: 'Part-Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'UI/UX Design' },
      { label: 'Figma' },
      { label: 'User Testing' },
      { label: 'Wireframe' },
      { label: 'UX Research' },
    ],
    links: [],
  },
  {
    id: 9,
    fullName: 'Mega Devs',
    jobName: 'Full Stack Development',
    jobType: 'Full Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'React Native' },
      { label: 'Java Script' },
      { label: 'Cyber Security' },
      { label: 'C++' },
      { label: 'HTML/CSS' },
    ],
    links: [],
  },
  {
    id: 10,
    fullName: 'Chaps D',
    jobName: 'UI/UX Design',
    jobType: 'Part-Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'UI/UX Design' },
      { label: 'Figma' },
      { label: 'User Testing' },
      { label: 'Wireframe' },
      { label: 'UX Research' },
    ],
    links: [],
  },
  {
    id: 11,
    fullName: 'Mega Devs',
    jobName: 'Full Stack Development',
    jobType: 'Full Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'React Native' },
      { label: 'Java Script' },
      { label: 'Cyber Security' },
      { label: 'C++' },
      { label: 'HTML/CSS' },
    ],
    links: [],
  },
  {
    id: 12,
    fullName: 'Chaps D',
    jobName: 'UI/UX Design',
    jobType: 'Part-Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'UI/UX Design' },
      { label: 'Figma' },
      { label: 'User Testing' },
      { label: 'Wireframe' },
      { label: 'UX Research' },
    ],
    links: [],
  },
  {
    id: 13,
    fullName: 'Mega Devs',
    jobName: 'Full Stack Development',
    jobType: 'Full Time',
    applied: '23.07.2022',
    group: 'Group',
    skills: [
      { label: 'React Native' },
      { label: 'Java Script' },
      { label: 'Cyber Security' },
      { label: 'C++' },
      { label: 'HTML/CSS' },
    ],
    links: [],
  },
];
