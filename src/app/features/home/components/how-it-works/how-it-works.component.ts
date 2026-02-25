import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
  steps = [
    {
      number: '01',
      title: 'Diagnóstico Tecnológico',
      description: 'Analizamos su operación actual: sistemas existentes, volumen de documentos, requerimientos de integración y puntos de mejora.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      duration: '1–2 días',
    },
    {
      number: '02',
      title: 'Integración API',
      description: 'Conectamos BeccaFact con el proveedor autorizado DIAN y con sus sistemas internos (ERP, CRM, e-commerce) mediante API seguras.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      duration: '3–7 días',
    },
    {
      number: '03',
      title: 'Configuración Personalizada',
      description: 'Parametrizamos BeccaFact según su operación: tipos de documentos, regímenes tributarios, resoluciones y flujos de aprobación.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 19.07l-1.41-1.41M20 12h2M2 12H0M19.07 19.07l-1.41-1.41M4.93 4.93l-1.41 1.41M12 20v2M12 2v2"/></svg>`,
      duration: '2–5 días',
    },
    {
      number: '04',
      title: 'Soporte y Evolución',
      description: 'Acompañamiento continuo de nuestro equipo técnico. Actualizaciones normativas automáticas, monitoreo y mejoras constantes.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>`,
      duration: 'Permanente',
    },
  ];
}
