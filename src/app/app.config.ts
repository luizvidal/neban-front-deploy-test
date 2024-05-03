import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { redirectInterceptor } from '@common/interceptors/redirect.interceptor';
import { toastInterceptor } from '@common/interceptors/toast.interceptor';
import { translationInterceptor } from '@common/translation/translation.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APP_ROUTES } from './app.routes';
import { initializeKeycloak } from './utility/keycloack/keycloack.config';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([
        redirectInterceptor,
        toastInterceptor,
        translationInterceptor,
      ])
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideAnimations(),
    KeycloakService,
    MessageService,
    ConfirmationService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
  ],
};
