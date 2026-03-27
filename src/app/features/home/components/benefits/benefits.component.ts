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
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
      title: 'Cumplimiento DIAN garantizado',
      description: 'Facturación electrónica conforme a la resolución 000042 de 2020 y todas las actualizaciones normativas. Nunca te preocupes por quedar fuera de norma.',
      variant: 'accent',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      title: 'Seguridad y privacidad',
      description: 'Datos cifrados en tránsito y en reposo con SSL 256-bit. Copias de seguridad automáticas diarias. Tu información nunca se comparte con terceros.',
      variant: '',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      title: 'Soporte en menos de 5 minutos',
      description: 'Equipo de soporte colombiano disponible por chat y WhatsApp. Tiempo de respuesta promedio menor a 5 minutos en horario hábil.',
      variant: '',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      title: 'Implementación en 24 horas',
      description: 'Comienza a facturar electrónicamente en menos de un día. Nuestro equipo te acompaña en la configuración inicial sin costo adicional.',
      variant: 'accent',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      title: 'Sin costos ocultos',
      description: 'Precio fijo mensual sin sorpresas. Incluye actualizaciones de software, mantenimiento y todas las funcionalidades del plan. Sin cargos por transacción.',
      variant: '',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      title: 'Acceso desde cualquier lugar',
      description: 'Plataforma 100% web, accesible desde computador, tablet o celular. Sin instalaciones, sin servidores propios, sin actualizaciones manuales.',
      variant: '',
    },
  ];
}
