import { CanDeactivateFn } from '@angular/router';

export interface ConCambios {
  puedeSalir(): boolean;
}

/** canDeactivate: pregunta antes de abandonar un formulario con cambios. */
export const salirSinGuardar: CanDeactivateFn<ConCambios> = (componente) =>
  componente.puedeSalir();