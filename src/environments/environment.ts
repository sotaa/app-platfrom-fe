// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const IDENTITY_SERVER_URL = 'http://localhost:3000';

export const environment = {
  production: false,
  identityUrls: {
    login: IDENTITY_SERVER_URL.concat('/auth/login'),
    register: IDENTITY_SERVER_URL.concat('/auth/register'),
    updateUser: IDENTITY_SERVER_URL.concat('/auth/update-user'),
    resetPassword: IDENTITY_SERVER_URL.concat('/auth/reset-password'),

    createApplication: IDENTITY_SERVER_URL.concat('/applications'),
    readApplications: IDENTITY_SERVER_URL.concat('/applications'),
    readApplication: IDENTITY_SERVER_URL.concat('/applications/'),
    deleteApplication: IDENTITY_SERVER_URL.concat('/applications/'),

    createPaymentPlan: IDENTITY_SERVER_URL.concat('/payment-plans'),
    readPaymentPlans: IDENTITY_SERVER_URL.concat('/payment-plans'),
    readPaymentPlan: IDENTITY_SERVER_URL.concat('/payment-plans/'),
    deletePaymentPlan: IDENTITY_SERVER_URL.concat('/payment-plans/'),

    buyPlan: IDENTITY_SERVER_URL.concat('/payment/buy/'),

    createRole: IDENTITY_SERVER_URL.concat('/roles'),
    readRoles: IDENTITY_SERVER_URL.concat('/roles'),
    readRole: IDENTITY_SERVER_URL.concat('/roles/'),
    deleteRole: IDENTITY_SERVER_URL.concat('/roles/'),

    updateUserInfo: IDENTITY_SERVER_URL.concat('/users/'),
    readUsers: IDENTITY_SERVER_URL.concat('/users'),
    readUser: IDENTITY_SERVER_URL.concat('/users/'),
    deleteUser: IDENTITY_SERVER_URL.concat('/users/'),
  },
  authenticationPageUrl: '/auth',
  permissionDeniedPageUrl: '/auth'
};
