import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Input,
  Renderer2,
} from '@angular/core';

/**
 * Directiva que aplica animación fadeInUp al elemento
 * cuando entra en el viewport (IntersectionObserver).
 *
 * Uso: <div appScrollAnimation [animDelay]="'0.2s'">...</div>
 */
@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animDelay = '0s';
  @Input() animDuration = '0.7s';

  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;

    // Estado inicial: oculto
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(28px)');
    this.renderer.setStyle(element, 'transition', `opacity ${this.animDuration} ease ${this.animDelay}, transform ${this.animDuration} ease ${this.animDelay}`);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(element, 'opacity', '1');
            this.renderer.setStyle(element, 'transform', 'translateY(0)');
            this.observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
