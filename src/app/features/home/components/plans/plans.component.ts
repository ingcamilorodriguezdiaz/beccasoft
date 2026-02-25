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
      name: 'Integración Básica',
      subtitle: 'Para Pymes que inician su proceso de facturación electrónica y necesitan una integración ágil.',
      highlight: false,
      features: [
        'Hasta 300 documentos/mes',
        'Facturación electrónica de venta',
        'Notas crédito y débito',
        'Dashboard BeccaFact',
        'Integración con 1 sistema externo',
        'Soporte por ticket',
        'Actualizaciones normativas incluidas',
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
        'Hasta 2.000 documentos/mes',
        'Todos los documentos DIAN',
        'Nómina electrónica',
        'Documento soporte',
        'Integración API personalizada',
        'Inventario y cartera integrados',
        'Dashboard financiero avanzado',
        'Soporte prioritario 24/7',
        'Multi-empresa',
        'Almacenamiento 5 años',
      ],
      cta: 'Solicitar Cotización',
    },
    {
      name: 'Plan Corporativo',
      subtitle: 'Solución a medida para grandes empresas con requerimientos complejos de integración.',
      highlight: false,
      features: [
        'Volumen ilimitado',
        'Integración ERP/CRM a medida',
        'Módulos de desarrollo exclusivo',
        'SLA garantizado por contrato',
        'Gerente de cuenta dedicado',
        'Capacitación presencial',
        'Auditorías técnicas periódicas',
        'Contratos enterprise',
      ],
      cta: 'Agendar Reunión',
    },
  ];
}
