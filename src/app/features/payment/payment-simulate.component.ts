import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment-simulate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-page">
      <div class="payment-card">
        <div class="payment-icon">&#128179;</div>
        <h1 class="payment-title">Simulaci&oacute;n de Pago</h1>
        <p class="payment-subtitle">Cotizaci&oacute;n ID: <strong>{{ quoteId() }}</strong></p>

        <div *ngIf="success()" class="payment-success">
          <div class="success-icon">&#10003;</div>
          <p>&#161;Pago confirmado exitosamente!</p>
          <p class="success-sub">El equipo de BeccaSoft se pondr&aacute; en contacto contigo pronto.</p>
        </div>

        <div *ngIf="error()" class="payment-error">
          <p>{{ error() }}</p>
        </div>

        <button
          *ngIf="!success()"
          class="confirm-btn"
          (click)="confirmPayment()"
          [disabled]="loading()"
        >
          <span *ngIf="loading()">Procesando...</span>
          <span *ngIf="!loading()">Confirmar Pago</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .payment-page {
      min-height: 100vh;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', system-ui, sans-serif;
      padding: 24px;
    }

    .payment-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      padding: 48px 40px;
      max-width: 440px;
      width: 100%;
      text-align: center;
    }

    .payment-icon { font-size: 56px; margin-bottom: 16px; }

    .payment-title {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px;
    }

    .payment-subtitle {
      color: #64748b;
      font-size: 14px;
      margin: 0 0 32px;
    }

    .confirm-btn {
      width: 100%;
      padding: 14px;
      background: #1a407e;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }

    .confirm-btn:hover:not(:disabled) {
      background: #1e3a6e;
      transform: translateY(-1px);
    }

    .confirm-btn:disabled {
      background: #94a3b8;
      cursor: not-allowed;
    }

    .payment-success {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      color: #16a34a;
    }

    .success-icon {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .success-sub {
      color: #15803d;
      font-size: 13px;
      margin: 8px 0 0;
    }

    .payment-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
      color: #dc2626;
      font-size: 14px;
    }
  `],
})
export class PaymentSimulateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  quoteId = signal<string>('');
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.quoteId.set(id);
  }

  confirmPayment() {
    const id = this.quoteId();
    if (!id) return;

    this.loading.set(true);
    this.error.set(null);

    this.http
      .post(`${environment.apiUrl}/payment-intents/webhook`, {
        paymentIntentId: id,
        status: 'PAID',
        secret: '',
      })
      .subscribe({
        next: () => {
          this.success.set(true);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.error?.message ?? 'Error al procesar el pago. Intenta de nuevo.');
          this.loading.set(false);
        },
      });
  }
}
