import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { interceptorSesionExpirada } from './interceptores/errores.interceptor';
import { interceptorToken } from './interceptores/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding: el :id de la URL llega al componente como input().
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([interceptorToken, interceptorSesionExpirada])),
  ],
};