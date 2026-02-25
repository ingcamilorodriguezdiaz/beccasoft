import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard de ejemplo para proteger rutas futuras que requieran autenticación.
 * Actualmente permite el acceso libre a todas las rutas públicas.
 */
export const homeGuard: CanActivateFn = (_route, _state) => {
  // En el futuro puede verificar sesión, permisos, etc.
  return true;
};
