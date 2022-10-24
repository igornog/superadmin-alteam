import { StatusType } from './status.type';

export interface SettingsState {
  tabs: Page[];
  filters: { skills: Filter[]; jobTypes: Filter[] };
  displayMode: DisplayMode;
  status?: StatusType;
  error?: string | null;
}

export interface Page {
  label: string;
  badge?: number;
  action?: string;
  active?: boolean;
}

export interface Filter {
  label?: string;
  active?: boolean;
}

export enum DisplayMode {
  List = 'list',
  Grid = 'grid',
}

export interface HandlesettingsProps {
  tabs: Page[];
  filters: Filter[];
  jobTypes: Filter[];
}
