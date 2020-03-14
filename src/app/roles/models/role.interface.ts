export interface IRole {
  id?: number;
  title: string;
  permissions: string[];
  parent: IRole
}
export class Role implements IRole {
  title: string;
  permissions: string[];
  parent: IRole
}
