import { StatusType } from './status.type';

export interface ClientsState {
  listClients: Client[];
  selectedClient: number | null;
  status?: StatusType;
  error?: string | null;
}

export class Client {
  id: number;
  fullName: string;
  jobName: string;
  jobType: string;
  applied?: string;
  group?: string;

  constructor(data: any) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.jobName = data.jobName;
    this.jobType = data.jobType;
    this.applied = data.applied;
    this.group = data.group;
  }
}
