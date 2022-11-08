import { StatusType } from './status.type';

export interface TreeState {
  data: TreeInterface;
  status?: StatusType;
  error?: string | null;
}

export interface TreeInterface {
  id: string;
  name: string;
  children?: TreeInterface[];
}
