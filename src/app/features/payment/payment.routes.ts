import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: 'simulate/:id',
    loadComponent: () =>
      import('./payment-simulate.component').then((m) => m.PaymentSimulateComponent),
    title: 'Confirmar Pago | BeccaSoft',
  },
];
