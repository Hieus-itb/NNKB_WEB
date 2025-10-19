import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { APP_INITIALIZER } from '@angular/core';
// import { KeycloakService } from 'keycloak-angular';

// import { routes } from './app.routes';
// import { environment } from './enviroments/enviroment';
// // Hàm init Keycloak
// function initializeKeycloak(keycloak: KeycloakService) {
//   return async () => {
//     await keycloak.init({
//       config: {
//         url: environment.authUrl,
//         realm: environment.realm,
//         clientId: environment.clientId,
//       },
//       initOptions: {
//         flow: 'standard',
//         onLoad: 'check-sso', // hoặc 'login-required' nếu bắt buộc login
//         checkLoginIframe: false,
//       },
//       enableBearerInterceptor: true,
//       bearerPrefix: 'Bearer',
//       bearerExcludedUrls: ['/assets', '/auth/login'], // các URL không cần token
//     });
//   };
// }

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),

//     // Khai báo Keycloak
//     KeycloakService,
//     {
//       provide: APP_INITIALIZER,
//       useFactory: initializeKeycloak,
//       multi: true,
//       deps: [KeycloakService],
//     },
//   ],
// };

