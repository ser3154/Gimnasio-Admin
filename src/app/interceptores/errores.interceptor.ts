import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Sesion } from '../servicios/sesion';

/** Si la API responde 401 (token vencido o inválido), cierra la sesión. */
export const interceptorSesionExpirada: HttpInterceptorFn = (req, next) => {
  const sesion = inject(Sesion); // inject() aquí, no dentro del catchError
  return next(req).pipe(
    catchError((error) => {
      const esLogin = req.url.endsWith('/auth/login');
      if (error instanceof HttpErrorResponse && error.status === 401 && !esLogin) {
        sesion.salir();
      }
      return throwError(() => error);
    }),
  );
};