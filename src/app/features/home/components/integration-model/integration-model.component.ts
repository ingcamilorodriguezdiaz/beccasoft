import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-integration-model',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './integration-model.component.html',
  styleUrl: './integration-model.component.scss',
})
export class IntegrationModelComponent {
  steps = [
    {
      number: '01',
      label: 'Empresa Cliente',
      description: 'Su ERP, sistema de facturación o proceso administrativo actual.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
      color: 'primary',
    },
    {
      number: '02',
      label: 'Beccasoft',
      sublabel: 'Capa de integración',
      description: 'Integramos, configuramos y automatizamos su proceso a través de BeccaFact.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      color: 'accent',
      highlight: true,
    },
    {
      number: '03',
      label: 'Proveedor Autorizado',
      sublabel: 'API DIAN certificada',
      description: 'Proveedor tecnológico autorizado que expone la API oficial de facturación electrónica.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      color: 'primary',
    },
    {
      number: '04',
      label: 'DIAN',
      description: 'Validación y aprobación oficial de todos los documentos electrónicos.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
      color: 'neutral',
    },
  ];
}
