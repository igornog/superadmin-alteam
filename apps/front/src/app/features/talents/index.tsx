export { default } from './components/TalentsView';

export const talentsTabs = [
  {
    label: 'All Talents',
    badge: 150,
    active: false,
  },
  {
    label: 'Inbound Talents',
    badge: 5,
    active: true,
  },
  {
    label: 'Shortlist Talents',
    badge: 40,
    active: false,
  },
  {
    label: 'Accepted Talents',
    badge: 20,
    active: false,
  },
  {
    label: 'Declined Talents',
    active: false,
  },
  {
    label: 'Applicants',
    active: false,
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
  },
  {
    id: 2,
    fullName: 'Tom Black',
    jobName: 'React Native Developer',
    jobType: 'Part-Time',
    applied: '23.07.2022',
    skills: [],
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
  },
];
