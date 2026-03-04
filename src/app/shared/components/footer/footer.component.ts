import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  readonly BECCAFACT_URL    = 'https://www.beccafact.com';
  readonly WHATSAPP_URL     = 'https://wa.me/573115907753?text=Hola%2C%20me%20interesa%20BeccaFact';
  readonly EMAIL_VENTAS     = 'ventas@beccasoft.com';
  readonly EMAIL_SOPORTE    = 'info@beccasoft.com';

  solutions = [
    { label: 'Facturación Electrónica', href: 'https://www.beccafact.com' },
    { label: 'Integración de Inventario', href: 'https://www.beccafact.com' },
    { label: 'Integración de Cartera', href: 'https://www.beccafact.com' },
    { label: 'Nómina Electrónica', href: 'https://www.beccafact.com' },
    { label: 'API de Integración', href: 'https://www.beccafact.com' },
    { label: 'Dashboard Financiero', href: 'https://www.beccafact.com' },
  ];

  company = [
    { label: 'Inicio',             fragment: 'inicio' },
    { label: '¿Qué es BeccaFact?', fragment: 'beccafact' },
    { label: 'Modelo de integración', fragment: 'integraciones' },
    { label: 'Beneficios',          fragment: 'beneficios' },
    { label: 'Cómo funciona',       fragment: 'como-funciona' },
    { label: 'Planes',              fragment: 'planes' },
  ];

  constructor(private scrollService: ScrollService) {}

  goTo(fragment: string): void {
    this.scrollService.scrollToSection(fragment);
  }
}
