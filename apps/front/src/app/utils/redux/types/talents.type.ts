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

export class Talent {
  id: number;
  fullName: string;
  jobName: string;
  jobType: string;
  applied?: string;
  group?: string;
  skills?: Skill[];

  constructor(data: any) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.jobName = data.jobName;
    this.jobType = data.jobType;
    this.applied = data.applied;
    this.group = data.group;
    this.skills = data.skills;
  }
}
