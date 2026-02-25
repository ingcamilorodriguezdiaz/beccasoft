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
      title: 'Cumplimiento normativo DIAN',
      description: 'Opere con la tranquilidad de cumplir al 100% la resolución 000042 y demás normativa de factura electrónica vigente en Colombia.',
      variant: 'accent',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      title: 'Automatización de procesos',
      description: 'Elimine la digitación manual. BeccaFact automatiza la generación, envío y archivo de documentos tributarios electrónicos.',
      variant: 'primary',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      title: 'Reducción de errores tributarios',
      description: 'Validaciones en tiempo real antes del envío a la DIAN evitan rechazos, multas y reprocesos que afectan su operación.',
      variant: 'accent',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      title: 'Seguridad de la información',
      description: 'Infraestructura con cifrado SSL 256-bit, backups automáticos y cumplimiento de la Ley 1581 de habeas data.',
      variant: 'primary',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      title: 'Reportes en tiempo real',
      description: 'Dashboard con indicadores clave: facturación acumulada, documentos rechazados, cartera y exportación a Excel/PDF.',
      variant: 'accent',
    },
  ];
}
