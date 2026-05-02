import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../model/api-response.model';

interface PaymentIntentCheckoutSession {
  sessionId: string;
  type: 'onpage' | 'standard';
  test: boolean;
  paymentIntentId: string;
  paymentUrl?: string;
  quoteId?: string | null;
  quoteNumber: string;
  planName: string;
  currency: string;
  amount: number;
}

declare global {
  interface Window {
    ePayco?: {
      checkout: {
        configure(config: { sessionId: string; type: 'onpage' | 'standard'; test: boolean }): {
          open(): void;
        };
      };
    };
  }
}

@Component({
  selector: 'app-payment-chat-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="chat-checkout">
      <div class="chat-checkout__card">
        <span class="chat-checkout__eyebrow">Checkout comercial</span>
        <h1 class="chat-checkout__title">Estamos preparando tu pago</h1>
        <p class="chat-checkout__subtitle">
          Vamos a abrir el Smart Checkout de ePayco con la cotización asociada a tu conversación comercial.
        </p>

        <div class="chat-checkout__summary">
          <div>
            <span>Cotización</span>
            <strong>{{ quoteNumber() || 'Cargando...' }}</strong>
          </div>
          <div>
            <span>Plan</span>
            <strong>{{ planName() || 'Cargando...' }}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{{ amountLabel() }}</strong>
          </div>
        </div>

        @if (error()) {
          <p class="chat-checkout__error">{{ error() }}</p>
        }

        <div class="chat-checkout__actions">
          <button type="button" class="chat-checkout__btn chat-checkout__btn--primary" (click)="startCheckout()" [disabled]="loading()">
            {{ loading() ? 'Abriendo checkout...' : 'Abrir checkout' }}
          </button>
          <a routerLink="/" class="chat-checkout__btn">Volver al inicio</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .chat-checkout {
      min-height: 100vh;
      padding: 110px 18px 36px;
      display: grid;
      place-items: center;
      background:
        linear-gradient(180deg, #0f172a 0px, #102a56 146px, #f8fbff 146px, #eef4ff 100%);
    }

    .chat-checkout__card {
      width: min(100%, 720px);
      padding: 28px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.94);
      border: 1px solid rgba(148, 163, 184, 0.24);
      box-shadow: 0 24px 70px rgba(15, 23, 42, 0.14);
      color: #0f172a;
    }

    .chat-checkout__eyebrow {
      display: inline-flex;
      padding: 6px 12px;
      border-radius: 999px;
      background: #dbeafe;
      color: #1d4ed8;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .chat-checkout__title {
      margin: 18px 0 10px;
      font-size: clamp(32px, 4vw, 52px);
      line-height: 0.96;
      letter-spacing: -0.04em;
    }

    .chat-checkout__subtitle {
      margin: 0 0 22px;
      color: #475569;
      line-height: 1.7;
    }

    .chat-checkout__summary {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }

    .chat-checkout__summary div {
      padding: 16px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
    }

    .chat-checkout__summary span {
      display: block;
      margin-bottom: 8px;
      color: #64748b;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .chat-checkout__summary strong {
      font-size: 16px;
      line-height: 1.4;
    }

    .chat-checkout__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .chat-checkout__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      padding: 0 18px;
      border-radius: 16px;
      border: 1px solid #cbd5e1;
      background: #fff;
      color: #0f172a;
      text-decoration: none;
      font-weight: 700;
      cursor: pointer;
    }

    .chat-checkout__btn:disabled {
      opacity: 0.75;
      cursor: wait;
    }

    .chat-checkout__btn--primary {
      background: linear-gradient(135deg, #0f4da7, #3758c8);
      border-color: #0f4da7;
      color: #fff;
    }

    .chat-checkout__error {
      margin: 0 0 16px;
      color: #b91c1c;
      font-size: 14px;
    }

    @media (max-width: 720px) {
      .chat-checkout__summary {
        grid-template-columns: 1fr;
      }

      .chat-checkout__actions {
        display: grid;
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class PaymentChatCheckoutComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private checkoutScriptPromise: Promise<void> | null = null;

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly quoteNumber = signal<string>('');
  readonly planName = signal<string>('');
  readonly amountLabel = signal<string>('Cargando...');

  ngOnInit(): void {
    void this.startCheckout();
  }

  async startCheckout(): Promise<void> {
    const paymentIntentId = this.route.snapshot.paramMap.get('id');
    if (!paymentIntentId) {
      this.error.set('No se encontró el identificador del pago.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.get<ApiResponse<PaymentIntentCheckoutSession>>(
          `${environment.apiUrl}/payment-intents/public/${paymentIntentId}/epayco/session`,
        ),
      );

      const session = response.data;
      this.quoteNumber.set(session.quoteNumber);
      this.planName.set(session.planName);
      this.amountLabel.set(
        new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: session.currency,
          maximumFractionDigits: 0,
        }).format(session.amount),
      );

      await this.ensureEpaycoScriptLoaded();

      if (!window.ePayco?.checkout) {
        throw new Error('La librería de ePayco no quedó disponible');
      }

      const checkout = window.ePayco.checkout.configure({
        sessionId: session.sessionId,
        type: session.type,
        test: session.test,
      });

      checkout.open();
    } catch (error: any) {
      this.error.set(
        error?.error?.message
        ?? error?.message
        ?? 'No fue posible abrir el checkout comercial.',
      );
    } finally {
      this.loading.set(false);
    }
  }

  private ensureEpaycoScriptLoaded(): Promise<void> {
    if (window.ePayco?.checkout) {
      return Promise.resolve();
    }

    if (this.checkoutScriptPromise) {
      return this.checkoutScriptPromise;
    }

    this.checkoutScriptPromise = new Promise<void>((resolve, reject) => {
      const existing = this.document.querySelector<HTMLScriptElement>('script[data-epayco-checkout="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('No se pudo cargar ePayco')), { once: true });
        return;
      }

      const script = this.document.createElement('script');
      script.src = environment.epaycoCheckoutUrl;
      script.async = true;
      script.dataset['epaycoCheckout'] = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('No se pudo cargar ePayco'));
      this.document.body.appendChild(script);
    });

    return this.checkoutScriptPromise;
  }
}
