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

  readonly BECCAFACT_URL = 'https://beccafact.com';
  readonly WHATSAPP_URL  = 'https://wa.me/573000000000?text=Hola%2C%20me%20interesa%20BeccaFact';
  readonly EMAIL         = 'contacto@beccasoft.com';

  solutions = [
    { label: 'Factura Electrónica',  href: 'https://beccafact.com' },
    { label: 'Nómina Electrónica',   href: 'https://beccafact.com' },
    { label: 'Documento Soporte',    href: 'https://beccafact.com' },
    { label: 'API de Integración',   href: 'https://beccafact.com' },
    { label: 'Dashboard Financiero', href: 'https://beccafact.com' },
  ];

  company = [
    { label: 'Acerca de Beccasoft', fragment: 'inicio' },
    { label: 'BeccaFact',           fragment: 'beccafact' },
    { label: 'Beneficios',          fragment: 'beneficios' },
    { label: 'Cómo funciona',       fragment: 'como-funciona' },
    { label: 'Planes',              fragment: 'planes' },
  ];

  constructor(private scrollService: ScrollService) {}

  goTo(fragment: string): void {
    this.scrollService.scrollToSection(fragment);
  }
}
