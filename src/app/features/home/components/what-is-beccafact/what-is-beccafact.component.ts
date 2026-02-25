import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-what-is-beccafact',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './what-is-beccafact.component.html',
  styleUrl: './what-is-beccafact.component.scss',
})
export class WhatIsBeccafactComponent {
  features = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      title: 'Integración Facturación Electrónica',
      description: 'Transmisión automática de facturas, notas crédito/débito y documentos soporte vía API con proveedor autorizado DIAN.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
      title: 'Integración de Inventario',
      description: 'Gestión de productos y existencias sincronizada con la facturación, eliminando la duplicación de datos.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      title: 'Integración de Cartera',
      description: 'Control de cuentas por cobrar y pagar integrado con los documentos electrónicos emitidos.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      title: 'Reportes Inteligentes',
      description: 'Informes de facturación, inventario y cartera exportables en tiempo real para la toma de decisiones.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      title: 'Dashboard Financiero',
      description: 'Panel centralizado con indicadores clave: facturación, cartera, inventario y flujo de caja.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      title: 'Automatización Contable',
      description: 'Generación automática de registros contables a partir de los documentos electrónicos integrados.',
    },
  ];
}
