import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss',
})
export class BenefitsComponent {
  benefits = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
      title: 'Cumplimiento normativo garantizado',
      description: 'Su empresa emite documentos electrónicos válidos ante la DIAN a través de un proveedor tecnológico autorizado, gestionado por nosotros.',
      variant: 'accent',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      title: 'Integración API segura',
      description: 'Conectamos su sistema actual con la API del proveedor autorizado mediante protocolos seguros, sin interrumpir su operación diaria.',
      variant: 'primary',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      title: 'Automatización de procesos',
      description: 'Eliminamos la operación manual de facturación y gestión documental, reduciendo costos operativos y tiempos de proceso.',
      variant: 'accent',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      title: 'Reducción de errores tributarios',
      description: 'Validaciones automáticas antes del envío previenen rechazos ante la DIAN, evitando multas y reprocesos costosos.',
      variant: 'primary',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      title: 'Información financiera en tiempo real',
      description: 'Dashboard integrado con indicadores de facturación, cartera e inventario para decisiones empresariales informadas.',
      variant: 'accent',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      title: 'Escalabilidad empresarial',
      description: 'Arquitectura preparada para crecer con su empresa. Desde Pyme hasta corporación, sin cambiar de plataforma.',
      variant: 'primary',
    },
  ];
}
