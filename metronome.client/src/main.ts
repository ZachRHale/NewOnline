import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from './app/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn]),
      withInterceptorsFromDi(),
    ),
    provideAuth0({
      domain: 'dev-0twzpcb2uw1821th.us.auth0.com',
      clientId: 'ae6YM7rZgk62SOAsmANULnjGr1aqg7Qz',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://metronome.com/api',
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: environment.apiUrl + '/api/*',
          },
        ],
      },
    }),
  ],
}).catch((err) => console.error(err));
