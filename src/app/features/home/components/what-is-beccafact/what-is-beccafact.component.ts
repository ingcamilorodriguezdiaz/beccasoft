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
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      title: 'Factura Electrónica',
      description: 'Emisión en formato UBL 2.1 con validación en tiempo real ante la DIAN. Envío automático al cliente y archivo digital.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 14l6-6m0 6l-6-6"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg>`,
      title: 'Notas Crédito / Débito',
      description: 'Gestione devoluciones, descuentos y ajustes con notas crédito y débito correctamente referenciadas.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
      title: 'Documento Soporte',
      description: 'Emita documentos soporte para adquisiciones con proveedores no obligados a facturar electrónicamente.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      title: 'Nómina Electrónica',
      description: 'Reporte electrónico de nómina ante la DIAN con soporte para múltiples empleados y todas las novedades.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      title: 'Dashboard Financiero',
      description: 'Panel con indicadores clave: facturación acumulada, documentos pendientes, cartera y reportes exportables.',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      title: 'API de Integración',
      description: 'API REST documentada para integrar BeccaFact con su ERP, CRM o cualquier sistema de gestión empresarial.',
    },
  ];
}
