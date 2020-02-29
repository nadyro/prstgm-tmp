// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  auth: {
    clientID: 'uF6bx7ipLoeTyS4jg1GFiMEZjAA4nVcA',
    domain: 'prostagma.eu.auth0.com',
    audience: 'http://prostagma.fr',
    auth0RedirectUri: 'http://localhost:4200/callback',
    auth0ReturnTo: 'http://localhost:4200',
    scope: 'openid profile email'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
