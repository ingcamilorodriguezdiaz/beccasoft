import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ScrollService } from '../../../core/services/scroll.service';
import { filter } from 'rxjs/operators';

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
  isSolidRoute      = signal(false);
  private readonly router = inject(Router);

  navLinks = [
    { label: 'Inicio',          fragment: 'inicio' },
    { label: 'BeccaFact',       fragment: 'beccafact' },
    { label: 'Integraciones',   fragment: 'integraciones' },
    { label: 'Beneficios',      fragment: 'beneficios' },
    { label: 'Planes',          fragment: 'planes' },
    { label: 'Contacto',        fragment: 'contacto-footer' },
  ];

  constructor(private scrollService: ScrollService) {
    this.updateRouteState(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateRouteState((event as NavigationEnd).urlAfterRedirects);
      });
  }

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

  get shouldUseSolidNavbar(): boolean {
    return this.isSolidRoute() || this.isScrolled();
  }

  private updateRouteState(url: string): void {
    const pathname = (url ?? '').split('?')[0].split('#')[0];
    this.isSolidRoute.set(pathname !== '' && pathname !== '/');
  }
}
