export interface IApplication {
  id?: string | number;
  name: string;
  url: string;
  isActive: boolean;
  // picture: string;
  // description: string;
}

export class Application implements IApplication {
  id?: string | number;
  name: string;
  url: string;
  isActive: boolean;
}
