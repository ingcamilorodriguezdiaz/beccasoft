import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly router = inject(Router);

  async scrollToSection(fragment: string, offset = 80): Promise<void> {
    const currentPath = this.router.url.split('?')[0].split('#')[0];

    if (currentPath !== '' && currentPath !== '/') {
      await this.router.navigate(['/'], { fragment });
      window.setTimeout(() => this.performScroll(fragment, offset), 120);
      return;
    }

    this.performScroll(fragment, offset);
  }

  private performScroll(fragment: string, offset: number): void {
    if (!fragment) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(fragment);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
