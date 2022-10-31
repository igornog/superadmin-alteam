import { Talent } from '../../utils/redux/types/talents.type';

export { default } from './components/TalentsView';

export const talentsTabs = [
  {
    title: 'All Talents',
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
    title: 'Inbound Talents',
    badge: 5,
    active: true,
    settings: {
      search: true,
      downloadCSV: true,
      inviteTalent: true,
      displayMode: true,
      sortBy: true,
    },
  },
  {
    title: 'Shortlist Talents',
    badge: 40,
    active: false,
    settings: {
      downloadCSV: true,
      createFolder: true,
    },
  },
  {
    title: 'Accepted Talents',
    badge: 20,
    active: false,
    settings: {
      downloadCSV: true,
      createFolder: true,
    },
  },
  {
    title: 'Declined Talents',
    active: false,
    settings: {
      search: true,
      downloadCSV: true,
      sortBy: true,
    },
  },
  {
    title: 'Applicants',
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
];
