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
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>`,
      title: 'Facturación Electrónica DIAN',
      description: 'Emite facturas de venta, notas crédito/débito y documentos soporte validados por la DIAN en segundos. Cumplimiento normativo garantizado y actualización automática.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
      title: 'Gestión de Inventario',
      description: 'Controla tu catálogo de productos, stock en tiempo real y movimientos de inventario sincronizados automáticamente con cada factura emitida.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
      title: 'Punto de Venta (POS)',
      description: 'Caja registradora integrada con facturación electrónica. Apertura y cierre de caja, ventas rápidas, múltiples métodos de pago y generación automática de facturas.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      title: 'Cartera y Cobranza',
      description: 'Gestión de cuentas por cobrar con análisis de envejecimiento, alertas de vencimiento y seguimiento detallado de pagos por cliente.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      title: 'Reportes y Analítica',
      description: 'Dashboard financiero en tiempo real con reportes de facturación, nómina, inventario y cartera. Exportación a PDF y Excel con un clic.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
      title: 'Nómina Electrónica',
      description: 'Liquidación de nómina conforme a la legislación colombiana con transmisión electrónica a la DIAN. Cálculo automático de prestaciones y seguridad social.',
    },
  ];
}
