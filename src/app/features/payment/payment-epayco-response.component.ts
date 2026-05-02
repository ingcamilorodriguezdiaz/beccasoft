import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../model/api-response.model';

type PaymentTone = 'success' | 'pending' | 'error' | 'neutral';
type PaymentStatus = 'accepted' | 'pending' | 'rejected' | 'failed' | 'unknown';

interface EpaycoReferenceStatus {
  refPayco: string;
  status: PaymentStatus;
  response: string;
  reason: string | null;
  transactionId: string | null;
  invoice: string | null;
  amount: string | number | null;
  currency: string | null;
  franchise: string | null;
  description: string | null;
  customerName: string | null;
  customerEmail: string | null;
  test: string | boolean | null;
}

@Component({
  selector: 'app-payment-epayco-response',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="payment-response">
      <div class="payment-response__shell">
        <div class="payment-response__card">
          <div class="payment-response__topbar">
            <span class="payment-response__eyebrow">Sandbox ePayco</span>
            @if (reference()) {
              <span class="payment-response__ref">Ref: {{ reference() }}</span>
            }
          </div>

          <div class="payment-response__hero">
            <div class="payment-response__hero-copy">
              <p class="payment-response__kicker">Resultado del pago</p>
              <h1 class="payment-response__title">{{ title() }}</h1>
              <p class="payment-response__subtitle">{{ subtitle() }}</p>

              <div class="payment-response__meta">
                <div class="payment-response__meta-pill">
                  <span class="payment-response__meta-label">Plan</span>
                  <strong>{{ displayPlanName() }}</strong>
                </div>
                <div class="payment-response__meta-pill">
                  <span class="payment-response__meta-label">Total</span>
                  <strong>{{ displayAmount() }}</strong>
                </div>
              </div>
            </div>

            <div class="payment-response__badge" [class]="statusClass()">
              <span class="payment-response__badge-label">Estado actual</span>
              <strong>{{ statusLabel() }}</strong>
              <small>{{ statusSourceLabel() }}</small>
            </div>
          </div>

          <div class="payment-response__notice" [class]="noticeClass()">
            <strong>{{ primaryMessage() }}</strong>
            <span>{{ secondaryMessage() }}</span>
          </div>

          <div class="payment-response__toolbar">
            <div class="payment-response__toolbar-main">
              <button
                type="button"
                class="payment-response__btn payment-response__btn--primary"
                (click)="refreshStatus()"
                [disabled]="checkingStatus() || !reference()">
                <span class="payment-response__btn-text">{{ checkingStatus() ? 'Consultando...' : 'Consultar estado' }}</span>
                <small>Validar el estado actual con ePayco</small>
              </button>
              @if (status() === 'accepted') {
                <button
                  type="button"
                  class="payment-response__btn payment-response__btn--accent"
                  (click)="downloadReceipt()">
                  <span class="payment-response__btn-text">Descargar comprobante</span>
                  <small>Versión lista para imprimir o guardar en PDF</small>
                </button>
              }
            </div>

            <div class="payment-response__toolbar-secondary">
              <a routerLink="/" fragment="planes" class="payment-response__btn payment-response__btn--ghost">Volver a planes</a>
              <a routerLink="/contacto" class="payment-response__btn payment-response__btn--ghost">Hablar con un asesor</a>
            </div>
          </div>

          @if (statusError()) {
            <p class="payment-response__error">{{ statusError() }}</p>
          }

          <div class="payment-response__details-grid">
            <article class="payment-response__panel payment-response__panel--spotlight">
              <h2>Resumen</h2>
              <dl class="payment-response__stack">
                <div>
                  <dt>Plan</dt>
                  <dd>{{ displayPlanName() }}</dd>
                </div>
                <div>
                  <dt>Valor</dt>
                  <dd>{{ displayAmount() }}</dd>
                </div>
                <div>
                  <dt>Factura</dt>
                  <dd>{{ displayInvoice() }}</dd>
                </div>
                <div>
                  <dt>Medio</dt>
                  <dd>{{ displayFranchise() }}</dd>
                </div>
              </dl>
            </article>

            <article class="payment-response__panel">
              <h2>Seguimiento</h2>
              <dl class="payment-response__stack">
                <div>
                  <dt>Respuesta visible</dt>
                  <dd>{{ responseText() }}</dd>
                </div>
                <div>
                  <dt>Motivo</dt>
                  <dd>{{ displayReason() }}</dd>
                </div>
                <div>
                  <dt>ID transacción</dt>
                  <dd>{{ displayTransactionId() }}</dd>
                </div>
                <div>
                  <dt>Origen</dt>
                  <dd>{{ statusSourceLabel() }}</dd>
                </div>
              </dl>
            </article>

            <article class="payment-response__panel">
              <h2>Cliente</h2>
              <dl class="payment-response__stack">
                <div>
                  <dt>Nombre</dt>
                  <dd>{{ displayCustomerName() }}</dd>
                </div>
                <div>
                  <dt>Correo</dt>
                  <dd>{{ displayCustomerEmail() }}</dd>
                </div>
                <div>
                  <dt>Moneda</dt>
                  <dd>{{ displayCurrency() }}</dd>
                </div>
                <div>
                  <dt>Modo</dt>
                  <dd>{{ isTestTransaction() ? 'Pruebas' : 'Producción o no informado' }}</dd>
                </div>
              </dl>
            </article>
          </div>

          <div class="payment-response__timeline">
            <div class="payment-response__timeline-item" [class.payment-response__timeline-item--done]="hasReference()">
              <span></span>
              <div>
                <strong>Referencia recibida</strong>
                <p>Se capturó el parámetro <code>ref_payco</code> enviado por ePayco al volver al sitio.</p>
              </div>
            </div>
            <div class="payment-response__timeline-item" [class.payment-response__timeline-item--done]="hasFetchedStatus()">
              <span></span>
              <div>
                <strong>Consulta al estado oficial</strong>
                <p>La página consulta el endpoint de validación por referencia recomendado por ePayco.</p>
              </div>
            </div>
            <div class="payment-response__timeline-item" [class.payment-response__timeline-item--done]="status() === 'accepted'">
              <span></span>
              <div>
                <strong>Confirmación del pago</strong>
                <p>Después de la aprobación, Beccasoft completa una validación interna para dejar la compra registrada correctamente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .payment-response {
      min-height: 100vh;
      padding: 104px 18px 48px;
      background:
        linear-gradient(180deg, #0f172a 0px, #102a56 136px, #f9fbff 136px, #eef4ff 100%);
    }

    .payment-response__shell {
      width: min(100%, 1040px);
      margin: 0 auto;
    }

    .payment-response__card {
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(148, 163, 184, 0.24);
      border-radius: 32px;
      box-shadow: 0 28px 90px rgba(15, 23, 42, 0.12);
      padding: 28px;
      color: #0f172a;
    }

    .payment-response__topbar,
    .payment-response__toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
    }

    .payment-response__eyebrow,
    .payment-response__ref {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 0 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .payment-response__eyebrow {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .payment-response__ref {
      background: #eff6ff;
      color: #334155;
    }

    .payment-response__hero {
      display: grid;
      grid-template-columns: 1.6fr 0.9fr;
      gap: 18px;
      margin: 24px 0;
    }

    .payment-response__hero-copy {
      padding: 10px 0;
    }

    .payment-response__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 22px;
    }

    .payment-response__meta-pill {
      display: grid;
      gap: 4px;
      min-width: min(180px, calc(50% - 8px));
      flex: 1 1 180px;
      padding: 14px 16px;
      border-radius: 18px;
      border: 1px solid rgba(148, 163, 184, 0.22);
      background: rgba(255, 255, 255, 0.82);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
    }

    .payment-response__meta-pill strong {
      font-size: 16px;
      line-height: 1.3;
      letter-spacing: -0.02em;
    }

    .payment-response__meta-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
    }

    .payment-response__kicker {
      margin: 0 0 10px;
      color: #0f4da7;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .payment-response__title {
      margin: 0 0 12px;
      font-size: clamp(32px, 5vw, 58px);
      line-height: 0.96;
      letter-spacing: -0.04em;
    }

    .payment-response__subtitle {
      margin: 0;
      max-width: 56ch;
      color: #475569;
      font-size: 15px;
      line-height: 1.7;
    }

    .payment-response__badge {
      display: grid;
      align-content: start;
      gap: 8px;
      min-height: 176px;
      padding: 22px;
      border-radius: 24px;
      color: #0f172a;
      background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
      border: 1px solid #bfdbfe;
    }

    .payment-response__badge--success {
      background: linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%);
      border-color: #86efac;
      color: #166534;
    }

    .payment-response__badge--pending {
      background: linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%);
      border-color: #fdba74;
      color: #9a3412;
    }

    .payment-response__badge--error {
      background: linear-gradient(180deg, #fef2f2 0%, #fee2e2 100%);
      border-color: #fca5a5;
      color: #b91c1c;
    }

    .payment-response__badge-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.8;
    }

    .payment-response__badge strong {
      font-size: 32px;
      line-height: 1;
      letter-spacing: -0.04em;
    }

    .payment-response__badge small {
      font-size: 13px;
      line-height: 1.5;
      opacity: 0.9;
    }

    .payment-response__notice {
      display: grid;
      gap: 6px;
      margin-bottom: 20px;
      padding: 18px 20px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
    }

    .payment-response__notice--success {
      background: #f0fdf4;
      border-color: #bbf7d0;
      color: #166534;
    }

    .payment-response__notice--pending {
      background: #fff7ed;
      border-color: #fed7aa;
      color: #9a3412;
    }

    .payment-response__notice--error {
      background: #fef2f2;
      border-color: #fecaca;
      color: #b91c1c;
    }

    .payment-response__toolbar {
      align-items: stretch;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 12px;
    }

    .payment-response__toolbar-main,
    .payment-response__toolbar-secondary {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .payment-response__toolbar-main {
      flex: 1 1 560px;
    }

    .payment-response__toolbar-secondary {
      flex: 0 1 auto;
    }

    .payment-response__btn {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 4px;
      min-height: 62px;
      padding: 14px 18px;
      border-radius: 18px;
      border: 1px solid #cbd5e1;
      text-decoration: none;
      color: #0f172a;
      font-weight: 700;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      cursor: pointer;
      box-shadow:
        0 8px 18px rgba(15, 23, 42, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.84);
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    }

    .payment-response__btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow:
        0 14px 28px rgba(15, 23, 42, 0.10),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    }

    .payment-response__btn-text {
      display: block;
      font-size: 15px;
      line-height: 1.2;
    }

    .payment-response__btn small {
      display: block;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.45;
      color: inherit;
      opacity: 0.82;
    }

    .payment-response__btn:disabled {
      opacity: 0.72;
      cursor: wait;
    }

    .payment-response__btn--primary {
      background: linear-gradient(135deg, #0f4da7, #3758c8);
      border-color: #0f4da7;
      color: #fff;
      min-width: 250px;
    }

    .payment-response__btn--accent {
      background: linear-gradient(135deg, #00a884, #00c6a0);
      border-color: #00a884;
      color: #062b24;
      min-width: 280px;
    }

    .payment-response__btn--ghost {
      min-width: 180px;
      align-items: center;
      text-align: center;
    }

    .payment-response__error {
      margin: 0 0 18px;
      color: #b91c1c;
      font-size: 14px;
    }

    .payment-response__details-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-top: 14px;
    }

    .payment-response__panel {
      padding: 18px;
      border-radius: 24px;
      background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
      border: 1px solid #e2e8f0;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
    }

    .payment-response__panel--spotlight {
      background:
        radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 35%),
        #fff;
    }

    .payment-response__panel h2 {
      margin: 0 0 14px;
      font-size: 18px;
      letter-spacing: -0.02em;
    }

    .payment-response__stack {
      display: grid;
      gap: 12px;
      margin: 0;
    }

    .payment-response__stack div {
      padding: 12px 14px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
    }

    .payment-response__stack dt {
      margin-bottom: 6px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
    }

    .payment-response__stack dd {
      margin: 0;
      font-weight: 700;
      line-height: 1.45;
      word-break: break-word;
    }

    .payment-response__timeline {
      display: grid;
      gap: 14px;
      margin-top: 18px;
      padding: 18px;
      border-radius: 24px;
      background:
        radial-gradient(circle at top right, rgba(59, 130, 246, 0.06), transparent 26%),
        #f8fafc;
      border: 1px solid #e2e8f0;
    }

    .payment-response__timeline-item {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 12px;
      align-items: start;
      color: #64748b;
    }

    .payment-response__timeline-item span {
      width: 16px;
      height: 16px;
      margin-top: 4px;
      border-radius: 999px;
      border: 2px solid #cbd5e1;
      background: #fff;
    }

    .payment-response__timeline-item--done {
      color: #0f172a;
    }

    .payment-response__timeline-item--done span {
      border-color: #16a34a;
      background: #16a34a;
      box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12);
    }

    .payment-response__timeline-item strong {
      display: block;
      margin-bottom: 3px;
    }

    .payment-response__timeline-item p {
      margin: 0;
      line-height: 1.6;
    }

    @media (max-width: 920px) {
      .payment-response__hero,
      .payment-response__details-grid {
        grid-template-columns: 1fr;
      }

      .payment-response__badge {
        /* en stack vertical el badge no necesita min-height alto */
        min-height: auto;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
      }

      .payment-response__badge strong {
        font-size: 22px;
      }
    }

    @media (max-width: 640px) {
      .payment-response {
        padding-top: 88px;
        background:
          linear-gradient(180deg, #0f172a 0px, #102a56 112px, #f9fbff 112px, #eef4ff 100%);
      }

      .payment-response__card {
        padding: 20px;
        border-radius: 24px;
      }

      .payment-response__title {
        font-size: 42px;
      }

      .payment-response__toolbar {
        display: grid;
        gap: 14px;
      }

      .payment-response__toolbar-main,
      .payment-response__toolbar-secondary {
        display: grid;
        grid-template-columns: 1fr;
      }

      .payment-response__btn {
        width: 100%;
        min-width: 0;
        align-items: flex-start;
      }

      .payment-response__btn--ghost {
        align-items: center;
      }
    }
  `],
})
export class PaymentEpaycoResponseComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  private readonly params = computed(() => this.route.snapshot.queryParamMap);

  readonly epaycoData = signal<EpaycoReferenceStatus | null>(null);
  readonly checkingStatus = signal(false);
  readonly statusError = signal<string | null>(null);
  readonly fetchedAtLeastOnce = signal(false);

  readonly responseText = computed(() =>
    this.params().get('x_response')
    ?? this.params().get('x_response_reason_text')
    ?? 'Transacción recibida',
  );
  readonly reference = computed(() => this.params().get('ref_payco') ?? this.params().get('x_transaction_id'));
  readonly fallbackPlanName = computed(() => this.params().get('x_extra4') ?? this.params().get('x_extra1'));
  readonly fallbackAmount = computed(() => this.params().get('x_amount'));
  readonly fallbackCurrency = computed(() => this.params().get('x_currency_code'));
  readonly fallbackInvoice = computed(() => this.params().get('x_id_invoice'));
  readonly fallbackFranchise = computed(() => this.params().get('x_franchise'));
  readonly fallbackReason = computed(() => this.params().get('x_response_reason_text'));
  readonly fallbackTransactionId = computed(() => this.params().get('x_transaction_id'));

  readonly status = computed<PaymentStatus>(() => {
    const fetched = this.epaycoData()?.status;
    if (fetched) return fetched;

    const value = this.responseText().toLowerCase();
    if (value.includes('acept') || value.includes('aprob')) return 'accepted';
    if (value.includes('pend')) return 'pending';
    if (value.includes('rechaz')) return 'rejected';
    if (value.includes('fall')) return 'failed';
    return 'unknown';
  });

  readonly tone = computed<PaymentTone>(() => {
    switch (this.status()) {
      case 'accepted':
        return 'success';
      case 'pending':
        return 'pending';
      case 'rejected':
      case 'failed':
        return 'error';
      default:
        return 'neutral';
    }
  });

  readonly title = computed(() => {
    switch (this.status()) {
      case 'accepted':
        return 'Pago confirmado y registrado';
      case 'pending':
        return 'La transacción sigue en revisión';
      case 'rejected':
        return 'El pago fue rechazado';
      case 'failed':
        return 'La transacción no pudo completarse';
      default:
        return 'Estamos verificando tu transacción';
    }
  });

  readonly subtitle = computed(() => {
    switch (this.status()) {
      case 'accepted':
        return 'Tu pago fue aprobado y ya recibimos la confirmación inicial de ePayco. Estamos terminando la validación para dejar tu compra completamente registrada.';
      case 'pending':
        return 'Algunos medios de pago tardan unos minutos en confirmar. Puedes volver a consultar el estado desde esta misma pantalla.';
      case 'rejected':
        return 'ePayco informó que la transacción fue rechazada. Puedes revisar el motivo, validar los datos de prueba o intentar nuevamente.';
      case 'failed':
        return 'La pasarela reportó una falla al procesar la transacción. Revisa los datos de prueba o intenta iniciar el pago de nuevo.';
      default:
        return 'La URL de respuesta no es suficiente por sí sola. Esta página consulta el estado recomendado por ePayco usando ref_payco.';
    }
  });

  ngOnInit(): void {
    if (this.reference()) {
      void this.refreshStatus();
    }
  }

  async refreshStatus(): Promise<void> {
    const refPayco = this.reference();
    if (!refPayco) {
      this.statusError.set('No llegó la referencia ref_payco, por lo que no es posible consultar el estado oficial.');
      return;
    }

    this.checkingStatus.set(true);
    this.statusError.set(null);

    try {
      const response = await firstValueFrom(
        this.http.get<ApiResponse<EpaycoReferenceStatus>>(
          `${environment.apiUrl}/payment-intents/epayco/reference/${encodeURIComponent(refPayco)}`,
        ),
      );

      this.epaycoData.set(response.data);
      this.fetchedAtLeastOnce.set(true);
    } catch (error: any) {
      this.statusError.set(
        error?.error?.message
        ?? error?.message
        ?? 'No fue posible consultar el estado actual con ePayco.',
      );
    } finally {
      this.checkingStatus.set(false);
    }
  }

  hasReference(): boolean {
    return !!this.reference();
  }

  hasFetchedStatus(): boolean {
    return this.fetchedAtLeastOnce();
  }

  statusLabel(): string {
    switch (this.status()) {
      case 'accepted':
        return 'Aceptada';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazada';
      case 'failed':
        return 'Fallida';
      default:
        return 'Sin confirmar';
    }
  }

  statusSourceLabel(): string {
    return this.epaycoData()
      ? 'Consultado por referencia en ePayco'
      : 'Leído desde la URL de respuesta';
  }

  statusClass(): string {
    return `payment-response__badge--${this.tone()}`;
  }

  noticeClass(): string {
    return `payment-response__notice--${this.tone()}`;
  }

  primaryMessage(): string {
    return this.epaycoData()?.response ?? this.responseText();
  }

  secondaryMessage(): string {
    return this.epaycoData()?.reason
      ?? this.fallbackReason()
      ?? 'Si el estado cambia, puedes volver a consultar manualmente desde esta pantalla.';
  }

  displayPlanName(): string {
    return this.fallbackPlanName() ?? 'No informado por ePayco';
  }

  displayAmount(): string {
    const amount = this.epaycoData()?.amount ?? this.fallbackAmount();
    const currency = this.epaycoData()?.currency ?? this.fallbackCurrency() ?? 'COP';
    if (!amount) return 'Pendiente';

    const numeric = Number(String(amount).replace(',', '.'));
    if (Number.isFinite(numeric)) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(numeric);
    }

    return `${amount} ${currency}`;
  }

  displayInvoice(): string {
    return this.epaycoData()?.invoice ?? this.fallbackInvoice() ?? 'Sin referencia';
  }

  displayFranchise(): string {
    return this.epaycoData()?.franchise ?? this.fallbackFranchise() ?? 'No informado';
  }

  displayReason(): string {
    return this.epaycoData()?.reason ?? this.fallbackReason() ?? 'Sin detalle adicional';
  }

  displayTransactionId(): string {
    return this.epaycoData()?.transactionId ?? this.fallbackTransactionId() ?? 'Pendiente';
  }

  displayCustomerName(): string {
    return this.epaycoData()?.customerName ?? 'No informado';
  }

  displayCustomerEmail(): string {
    return this.epaycoData()?.customerEmail ?? 'No informado';
  }

  displayCurrency(): string {
    return this.epaycoData()?.currency ?? this.fallbackCurrency() ?? 'COP';
  }

  isTestTransaction(): boolean {
    const value = this.epaycoData()?.test;
    return String(value).toLowerCase() === 'true';
  }

  downloadReceipt(): void {
    if (this.status() !== 'accepted') {
      return;
    }

    const issuedAt = new Date().toLocaleString('es-CO', {
      dateStyle: 'long',
      timeStyle: 'short',
    });

    const html = this.buildReceiptHtml(issuedAt);
    const receiptWindow = window.open('', '_blank', 'width=900,height=720');

    if (!receiptWindow) {
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      window.location.assign(blobUrl);
      return;
    }

    receiptWindow.document.open();
    receiptWindow.document.write(html);
    receiptWindow.document.close();
  }

  private buildReceiptHtml(issuedAt: string): string {
    return `
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <title>Comprobante de pago - Beccasoft</title>
          <style>
            :root {
              color-scheme: light;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #eef4ff;
              color: #0f172a;
              padding: 32px;
            }

            .receipt {
              max-width: 820px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
              border: 1px solid #dbe5f3;
            }

            .receipt__header {
              padding: 28px 32px;
              background: linear-gradient(135deg, #0f4da7, #102a56);
              color: #ffffff;
            }

            .receipt__eyebrow {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.14);
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .receipt__title {
              margin: 16px 0 8px;
              font-size: 32px;
              line-height: 1;
            }

            .receipt__subtitle {
              margin: 0;
              max-width: 56ch;
              color: rgba(255, 255, 255, 0.86);
              line-height: 1.6;
            }

            .receipt__body {
              padding: 28px 32px 32px;
            }

            .receipt__status {
              padding: 16px 18px;
              border-radius: 18px;
              background: #ecfdf5;
              border: 1px solid #bbf7d0;
              color: #166534;
              margin-bottom: 22px;
            }

            .receipt__grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 14px;
            }

            .receipt__card {
              padding: 16px 18px;
              border-radius: 18px;
              border: 1px solid #dbe5f3;
              background: #f8fbff;
            }

            .receipt__label {
              display: block;
              margin-bottom: 8px;
              color: #64748b;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .receipt__value {
              margin: 0;
              font-size: 18px;
              font-weight: 700;
              line-height: 1.45;
              word-break: break-word;
            }

            .receipt__footer {
              margin-top: 24px;
              padding-top: 18px;
              border-top: 1px dashed #cbd5e1;
              color: #475569;
              font-size: 14px;
              line-height: 1.7;
            }

            .receipt__note {
              margin: 14px 0 0;
              font-size: 13px;
              color: #64748b;
            }

            @media print {
              body {
                background: #ffffff;
                padding: 0;
              }

              .receipt {
                box-shadow: none;
                border: none;
                border-radius: 0;
              }
            }
          </style>
        </head>
        <body>
          <section class="receipt">
            <header class="receipt__header">
              <span class="receipt__eyebrow">Comprobante de pago</span>
              <h1 class="receipt__title">Beccasoft</h1>
              <p class="receipt__subtitle">
                Confirmación de pago generada a partir de la transacción aprobada en ePayco.
              </p>
            </header>

            <div class="receipt__body">
              <div class="receipt__status">
                <strong>Pago aprobado</strong><br />
                La pasarela ePayco reportó esta transacción como aceptada.
              </div>

              <div class="receipt__grid">
                ${this.receiptField('Plan', this.displayPlanName())}
                ${this.receiptField('Valor pagado', this.displayAmount())}
                ${this.receiptField('Factura', this.displayInvoice())}
                ${this.receiptField('Medio de pago', this.displayFranchise())}
                ${this.receiptField('Referencia ePayco', this.reference() ?? 'No informada')}
                ${this.receiptField('ID transacción', this.displayTransactionId())}
                ${this.receiptField('Cliente', this.displayCustomerName())}
                ${this.receiptField('Correo', this.displayCustomerEmail())}
              </div>

              <div class="receipt__footer">
                <strong>Fecha de generación:</strong> ${issuedAt}<br />
                <strong>Estado consultado:</strong> ${this.statusLabel()}<br />
                <strong>Origen del estado:</strong> ${this.statusSourceLabel()}
                <p class="receipt__note">
                  Este comprobante fue generado desde la página de respuesta personalizada de Beccasoft. Puedes usar la opción “Guardar como PDF” del navegador para conservarlo.
                </p>
              </div>
            </div>
          </section>
          <script>
            window.addEventListener('load', () => {
              window.print();
            });
          </script>
        </body>
      </html>
    `;
  }

  private receiptField(label: string, value: string): string {
    return `
      <article class="receipt__card">
        <span class="receipt__label">${this.escapeHtml(label)}</span>
        <p class="receipt__value">${this.escapeHtml(value)}</p>
      </article>
    `;
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}
