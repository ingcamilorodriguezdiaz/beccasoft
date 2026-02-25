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
      title: 'Diagnóstico',
      description: 'Analizamos su estructura empresarial, volumen de documentos y sistemas actuales para diseñar la mejor estrategia de integración.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      duration: '1–2 días',
    },
    {
      number: '02',
      title: 'Implementación',
      description: 'Configuramos BeccaFact según su operación: tipos de documentos, resoluciones DIAN, numeración y parametrización contable.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      duration: '2–5 días',
    },
    {
      number: '03',
      title: 'Activación',
      description: 'Habilitamos su empresa como facturador electrónico ante la DIAN. Pruebas en ambiente de habilitación hasta obtener el aval definitivo.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      duration: '1–3 días',
    },
    {
      number: '04',
      title: 'Soporte Continuo',
      description: 'Acompañamiento permanente de nuestro equipo técnico. Actualizaciones normativas automáticas y canal directo de soporte especializado.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>`,
      duration: 'Permanente',
    },
  ];
}
