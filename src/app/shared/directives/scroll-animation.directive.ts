import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animDelay    = '0s';
  @Input() animDuration = '0.7s';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'transform', 'translateY(28px)');
    this.renderer.setStyle(
      el, 'transition',
      `opacity ${this.animDuration} ease ${this.animDelay}, transform ${this.animDuration} ease ${this.animDelay}`
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(el, 'opacity', '1');
            this.renderer.setStyle(el, 'transform', 'translateY(0)');
            this.observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
