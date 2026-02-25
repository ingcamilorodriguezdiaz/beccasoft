import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isScrolled        = signal(false);
  isMobileMenuOpen  = signal(false);

  navLinks = [
    { label: 'Inicio',          fragment: 'inicio' },
    { label: 'BeccaFact',       fragment: 'beccafact' },
    { label: 'Integraciones',   fragment: 'integraciones' },
    { label: 'Beneficios',      fragment: 'beneficios' },
    { label: 'Planes',          fragment: 'planes' },
    { label: 'Contacto',        fragment: 'contacto-footer' },
  ];

  constructor(private scrollService: ScrollService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu(): void { this.isMobileMenuOpen.update(v => !v); }
  closeMobileMenu(): void  { this.isMobileMenuOpen.set(false); }

  goTo(fragment: string): void {
    this.scrollService.scrollToSection(fragment);
    this.closeMobileMenu();
  }
}
