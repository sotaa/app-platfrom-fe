export interface IUser {
  id?: string;
  email?: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  mobile: string;
  isActive: boolean;
  role: string;
}
export class User implements IUser {
  id?: string;
  email?:string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  mobile: string;
  isActive: boolean;
  role: string;
}

