import { Component } from '@angular/core';
import { ScrollService } from '../../../../core/services/scroll.service';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  stats = [
    { value: '+1.200',  label: 'Facturas procesadas' },
    { value: '+80',     label: 'Empresas activas' },
    { value: '99.9%',   label: 'Disponibilidad' },
    { value: '<5 min',  label: 'Tiempo de soporte' },
  ];

  chartBars = [40, 65, 45, 80, 60, 90, 75, 95, 70, 88, 72, 100];

  constructor(private scrollService: ScrollService) {}

  scrollToContact(): void {
    this.scrollService.scrollToSection('contacto-footer');
  }
}
