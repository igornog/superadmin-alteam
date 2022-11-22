import { StatusType } from './status.type';

export interface TalentsState {
  listTalents: Talent[];
  selectedTalent: number | null;
  status?: StatusType;
  error?: string | null;
}

export interface Skill {
  label: string;
}

export interface Link {
  id: number;
  link: string;
}

export enum TalentStatus {
  Inbound = 'Inbound',
  Shortlisted = 'Shortlisted',
  Accepted = 'Accepted',
  Declined = 'Declined',
}

export class Talent {
  id: number;
  fullName: string;
  jobName: string;
  jobType: string;
  applied?: string;
  group?: string;
  skills?: Skill[];
  salary?: string;
  experience?: string;
  portfolio?: string;
  email?: string;
  phone?: string;
  status: TalentStatus;
  links: Link[];

  constructor(data: any) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.jobName = data.jobName;
    this.jobType = data.jobType;
    this.applied = data.applied;
    this.group = data.group;
    this.skills = data.skills;
    this.salary = data.salary;
    this.experience = data.experience;
    this.portfolio = data.portfolio;
    this.email = data.email;
    this.phone = data.phone;
    this.status = data.status;
    this.links = data.links;
  }

  isEmpty(): boolean {
    return this.id !== undefined;
  }

  isInbound(): boolean {
    return this.status === TalentStatus.Inbound;
  }

  isShortlisted(): boolean {
    return this.status === TalentStatus.Shortlisted;
  }

  isAccepted(): boolean {
    return this.status === TalentStatus.Accepted;
  }

  isDeclined(): boolean {
    return this.status === TalentStatus.Declined;
  }
}
