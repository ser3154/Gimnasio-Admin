
import { HttpErrorResponse } from '@angular/common/http';

export function mensajeDeError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) return 'No se pudo conectar con la API. ¿Está encendido gimnasio-backend?';
        if (error.status === 401 && !error.error?.message) return 'Tu sesión expiró. Inicia sesión otra vez.';
    const m = error.error?.message;
    return Array.isArray(m) ? m.join(', ') : (m ?? `Error ${error.status}`);
  }
  return 'Ocurrió un error inesperado';
}