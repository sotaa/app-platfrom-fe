import { Action } from '@ngrx/store';
import { IAuthResult } from '../../models';

export const CHANGE_USER = '[AUTH] CHANGE_USER';

export interface IUserActions extends Action {
  payload: any;
}

export class ChangeUser implements IUserActions {
  readonly type = CHANGE_USER;
  constructor(public payload: IAuthResult) {}
}
