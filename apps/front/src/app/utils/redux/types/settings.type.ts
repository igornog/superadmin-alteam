import React from 'react';
import { StatusType } from './status.type';

export interface SettingsState {
  tabs: Page[];
  filters: { skills: Filter[]; jobTypes: Filter[] };
  header: Settings;
  displayMode: DisplayMode;
  selectedDrawer: SideDrawerVariant | null;
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

export enum SideDrawerVariant {
  Talent = 'Talent',
}

export class SideDrawer {
  content: React.ReactNode;
  size: string;

  constructor(data: any) {
    this.content = data.content;
    this.size = data.size;
  }
}

export enum ModalVariant {
  Skills = 'Skills',
  GeneralInformations = 'General Informations',
  About = 'About',
  Attachments = 'Attachments',
  DeclineTalent = 'DeclineTalent',
  Link = 'Link',
  AddNote = 'AddNote',
  EditNote = 'EditNote',
  Shortlist = 'Shortlist',
  AddFolder = 'AddFolder',
}

export enum ModalSize {
  ExtraSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export class Modal {
  content: React.ReactNode;
  size: ModalSize;

  constructor(data: any) {
    this.content = data.content;
    this.size = data.size;
  }
}

export interface HandlesettingsProps {
  tabs: Page[];
  filters: Filter[];
  jobTypes: Filter[];
}
