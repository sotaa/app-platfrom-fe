import { CHANGE_USER, IUserActions } from './actions';
import { IAuthState } from './auth-state.interface';

const INITIAL_STATE: IAuthState = {authResult: undefined};


export const authReducer = (state: IAuthState = INITIAL_STATE, action: IUserActions): IAuthState => {
  switch (action.type) {
    case CHANGE_USER: {
      return {...state, authResult: action.payload};
    }
    default:
      return state;
  }
};


