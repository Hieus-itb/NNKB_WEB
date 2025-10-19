// import { KeycloakService } from 'keycloak-angular';
// import { environment } from './enviroments/enviroment';

// export function initializeKeycloak(keycloak: KeycloakService) {
//   return async () => {
//     await keycloak.init({
//       config: {
//         url: environment.authUrl,
//         realm: environment.realm,
//         clientId: environment.clientId,
//       },
//       initOptions: {
//         flow: 'standard',
//         onLoad: 'check-sso',      // hoặc 'login-required' nếu muốn bắt login ngay
//         checkLoginIframe: false,
//       },
//       enableBearerInterceptor: true,
//       bearerPrefix: 'Bearer',
//       bearerExcludedUrls: ['assets', '/public'] // tuỳ chỉnh để không thêm token cho các URL này
//     });
//   };
// }
