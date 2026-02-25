import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

interface Plan {
  name: string;
  subtitle: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent {
  plans: Plan[] = [
    {
      name: 'Plan Pyme',
      subtitle: 'Para pequeñas y medianas empresas que inician su proceso de facturación electrónica.',
      highlight: false,
      features: [
        'Hasta 300 facturas/mes',
        'Facturas electrónicas de venta',
        'Notas crédito y débito',
        'Portal web BeccaFact',
        'Soporte por ticket',
        'Dashboard básico',
        'Almacenamiento 12 meses',
      ],
      cta: 'Solicitar Cotización',
    },
    {
      name: 'Plan Empresarial',
      subtitle: 'Para empresas con alto volumen de documentos y necesidades avanzadas de integración.',
      highlight: true,
      badge: 'Más popular',
      features: [
        'Hasta 2.000 facturas/mes',
        'Todos los documentos DIAN',
        'Nómina electrónica',
        'Documento soporte',
        'API REST de integración',
        'Dashboard financiero avanzado',
        'Soporte prioritario 24/7',
        'Almacenamiento 5 años',
        'Multi-empresa',
      ],
      cta: 'Solicitar Cotización',
    },
    {
      name: 'Plan Personalizado',
      subtitle: 'Diseñamos una solución a la medida de su operación, volumen y requerimientos especiales.',
      highlight: false,
      features: [
        'Volumen ilimitado',
        'Integración ERP/CRM a medida',
        'Desarrollo de módulos especiales',
        'SLA garantizado',
        'Gerente de cuenta dedicado',
        'Capacitación presencial',
        'Auditorías periódicas DIAN',
        'Contratos enterprise',
      ],
      cta: 'Agendar Reunión',
    },
  ];
}
