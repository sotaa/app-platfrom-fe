// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const IDENTITY_SERVER_URL = 'http://localhost:3000';

export const environment = {
  production: false,
  identityUrls: {
    login: IDENTITY_SERVER_URL.concat('/auth/login'),
    register: IDENTITY_SERVER_URL.concat('/auth/register'),
    resetPassword: IDENTITY_SERVER_URL.concat( '/auth/reset-password' ),
    createApplication:IDENTITY_SERVER_URL.concat('/applications'),
    readApplications:IDENTITY_SERVER_URL.concat('/applications'),
    readApplication:IDENTITY_SERVER_URL.concat('/applications/'),
    deleteApplication:IDENTITY_SERVER_URL.concat('/applications/'),
  },
  authenticationPageUrl: '/auth',
  permissionDeniedPageUrl: '/auth'
};
