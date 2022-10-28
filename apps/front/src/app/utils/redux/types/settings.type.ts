import { StatusType } from './status.type';

export interface SettingsState {
  tabs: Page[];
  filters: { skills: Filter[]; jobTypes: Filter[] };
  header: Settings;
  displayMode: DisplayMode;
  selectedModal: Modal | null;
  status?: StatusType;
  error?: string | null;
}

export interface Page {
  title: string;
  badge?: number;
  action?: string;
  active?: boolean;
  settings: Settings;
}

export interface Settings {
  search?: boolean;
  downloadCSV?: boolean;
  inviteTalent?: boolean;
  displayMode?: boolean;
  sortBy?: boolean;
  createFolder?: boolean;
}

export interface Filter {
  label?: string;
  active?: boolean;
}

export enum DisplayMode {
  List = 'list',
  Grid = 'grid',
}

export enum Modal {
  Skills = 'Skills',
  GeneralInformations = 'General Informations',
  About = 'About',
  Attachments = 'Attachments',
  Notes = 'Notes',
}

export interface HandlesettingsProps {
  tabs: Page[];
  filters: Filter[];
  jobTypes: Filter[];
}
