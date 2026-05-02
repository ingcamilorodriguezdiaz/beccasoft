import { Routes } from '@angular/router';
import { homeGuard } from './core/guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [homeGuard],
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(m => m.HomeComponent),
    title: 'Beccasoft | Integración de Facturación Electrónica para Empresas Colombianas',
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto | Beccasoft',
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./features/payment/payment.routes').then((m) => m.PAYMENT_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
