import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./payment-chat-checkout.component').then((m) => m.PaymentChatCheckoutComponent),
    title: 'Continuar pago | Beccasoft',
  },
  {
    path: 'epayco/response',
    loadComponent: () =>
      import('./payment-epayco-response.component').then((m) => m.PaymentEpaycoResponseComponent),
    title: 'Resultado del pago | Beccasoft',
  },
  {
    path: 'simulate/:id',
    loadComponent: () =>
      import('./payment-simulate.component').then((m) => m.PaymentSimulateComponent),
    title: 'Confirmar Pago | BeccaSoft',
  },
];
