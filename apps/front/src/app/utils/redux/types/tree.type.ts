import { StatusType } from './status.type';

export interface TreeState {
  data: TreeInterface;
  selectedFolder: string | undefined;
  status?: StatusType;
  error?: string | null;
}

export interface TreeInterface {
  id: string;
  name: string;
  open?: boolean;
  children?: TreeInterface[];
}

export class Tree {
  id: string;
  name: string;
  idParent?: string | undefined;
  children?: TreeInterface[];

  constructor(data: any) {
    this.id = data.id;
    this.idParent = data.idParent;
    this.name = data.name;
    this.children = data.children;
  }

  isParent(): boolean {
    return this.id === 'Parent';
  }

  hasChildren(): boolean | undefined {
    return this.children && this.children.length > 0;
  }
}
