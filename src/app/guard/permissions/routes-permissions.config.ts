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
  ROLE_CREATE,
  ROLE_READ,
  ROLE_EDIT,
  ROLE_DELETE
} from './permissions.const';

export const RoutePermissions: {path: string, claims: string[]}[] = [
  { path: 'payment-plans', claims: [PAYMENT_PLAN_READ] },
  { path: 'payment-plans/create', claims: [PAYMENT_PLAN_CREATE] },
  { path: 'payment-plans/edit',  claims: [PAYMENT_PLAN_EDIT] },
];
