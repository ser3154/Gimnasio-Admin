import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesion } from '../servicios/sesion';

/** Sólo deja pasar al administrador; a los demás los manda al login. */
export const guardiaAdmin: CanActivateFn = () => {
  const sesion = inject(Sesion);
  return sesion.esAdmin() ? true : inject(Router).createUrlTree(['/login']);
};