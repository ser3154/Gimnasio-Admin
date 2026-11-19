import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../config';
import { Sesion } from '../servicios/sesion';

/** Agrega Authorization: Bearer <token> a toda petición hacia nuestra API. */
export const interceptorToken: HttpInterceptorFn = (req, next) => {
  const token = inject(Sesion).token();
  if (!token || !req.url.startsWith(API_URL)) return next(req);
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};