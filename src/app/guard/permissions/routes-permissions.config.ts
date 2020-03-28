import {
  PAYMENT_PLAN_READ,
  PAYMENT_PLAN_CREATE,
  PAYMENT_PLAN_EDIT,
  PAYMENT_PLAN_DELETE,
  APPLICATION_READ,
  APPLICATION_CREATE,
  APPLICATION_EDIT,
  APPLICATION_DELETE,
  USER_CREATE,
  USER_READ,
  USER_DELETE,
  USER_EDIT,
  ROLE_CREATE,
  ROLE_READ,
  ROLE_EDIT,
  ROLE_DELETE
} from './permissions.const';

export const RoutePermissions: {path: string, claims: string[]}[] = [
  { path: 'payment-plans', claims: [PAYMENT_PLAN_READ] },
  { path: 'roles', claims: [ROLE_READ] },
  { path: 'users', claims: [USER_READ] },


];
