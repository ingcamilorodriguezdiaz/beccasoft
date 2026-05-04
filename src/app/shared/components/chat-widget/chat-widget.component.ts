import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, SalesMessage } from './chat.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-shell" [class.chat-shell--open]="isOpen()">
      <button
        *ngIf="isOpen()"
        class="chat-backdrop"
        type="button"
        (click)="closeChat()"
        aria-label="Cerrar chat"
      ></button>

      <section class="chat-window" [class.visible]="isOpen()" [attr.aria-hidden]="!isOpen()">
        <div class="chat-window__glow chat-window__glow--top"></div>
        <div class="chat-window__glow chat-window__glow--bottom"></div>

        <header class="chat-header">
          <div class="chat-header__identity">
            <div class="chat-avatar">
              <span class="chat-avatar__core">B</span>
            </div>

            <div class="chat-header__copy">
              <span class="chat-badge">Asesoria guiada</span>
              <h3 class="chat-title">Asistente BeccaSoft</h3>
              <p class="chat-subtitle">
                {{ isTyping() ? 'Preparando una respuesta para ti...' : 'Respuestas rapidas sobre planes, pagos y acompanamiento' }}
              </p>
            </div>
          </div>

          <div class="chat-header__actions">
            <div class="chat-presence">
              <span class="chat-presence__dot" [class.chat-presence__dot--busy]="isTyping()"></span>
              <span>{{ isTyping() ? 'Escribiendo' : 'En linea' }}</span>
            </div>

            <button
              class="chat-close"
              type="button"
              (click)="closeChat()"
              aria-label="Cerrar ventana del chat"
            >
              &#10005;
            </button>
          </div>
        </header>

        <div class="chat-body">
          <section class="chat-intro" *ngIf="messages().length === 0">
            <div class="chat-intro__card">
              <p class="chat-intro__eyebrow">Experiencia conversacional</p>
              <h4>Conversemos sobre la mejor opcion para tu negocio</h4>
              <p>
                Resuelve dudas sobre implementacion, planes y facturacion electronica en pocos mensajes.
              </p>
            </div>

            <div class="chat-quick-prompts">
              <button
                *ngFor="let prompt of quickPrompts"
                class="chat-quick-prompts__item"
                type="button"
                (click)="useQuickPrompt(prompt)"
                [disabled]="isTyping()"
              >
                <span class="chat-quick-prompts__icon">&#10022;</span>
                <span>{{ prompt }}</span>
              </button>
            </div>
          </section>

          <div class="chat-messages" #messagesContainer>
            <div
              *ngFor="let msg of messages()"
              class="chat-message"
              [class.visitor]="msg.sender === 'VISITOR'"
              [class.agent]="msg.sender !== 'VISITOR'"
            >
              <div class="message-meta">
                <span class="message-author">{{ msg.sender === 'VISITOR' ? 'Tu' : 'BeccaSoft' }}</span>
                <span class="message-time">{{ formatTime(msg.createdAt) }}</span>
              </div>

              <div class="message-bubble">
                <p class="message-text" [innerHTML]="formatMessage(msg.content)"></p>
                <div *ngIf="msg.metadata?.['paymentUrl']" class="payment-link">
                  <div class="payment-card">
                    <div class="payment-card__eyebrow">Cierre comercial</div>
                    <div class="payment-card__title">
                      {{ msg.metadata?.['quoteNumber'] ? 'Cotización ' + msg.metadata?.['quoteNumber'] : 'Propuesta lista para pagar' }}
                    </div>
                    <p class="payment-card__summary">
                      {{ msg.metadata?.['paymentSummary'] || 'Tu propuesta quedó lista con enlace de pago integrado.' }}
                    </p>
                  </div>
                  <a
                    [href]="msg.metadata?.['paymentUrl']"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="payment-btn"
                  >
                    <span>&#128179;</span>
                    <span>{{ msg.metadata?.['paymentCtaLabel'] || 'Continuar al pago' }}</span>
                  </a>
                </div>
              </div>
            </div>

            <div *ngIf="isTyping()" class="chat-message agent chat-message--typing">
              <div class="message-meta">
                <span class="message-author">BeccaSoft</span>
                <span class="message-time">ahora</span>
              </div>

              <div class="message-bubble typing-bubble">
                <span class="typing-bubble__label">Pensando</span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input-area">
          <p *ngIf="errorMessage()" class="chat-error">{{ errorMessage() }}</p>

          <div class="chat-composer" [class.chat-composer--disabled]="isTyping()">
            <textarea
              class="chat-input"
              rows="1"
              placeholder="Escribe tu mensaje. Enter envia y Shift+Enter crea una nueva linea."
              [(ngModel)]="inputText"
              (keydown.enter)="handleComposerEnter($event)"
              [disabled]="isTyping()"
              maxlength="500"
            ></textarea>

            <button
              class="chat-send-btn"
              type="button"
              (click)="sendMessage()"
              [disabled]="!inputText.trim() || isTyping()"
              aria-label="Enviar mensaje"
            >
              <span class="chat-send-btn__icon">&#10148;</span>
            </button>
          </div>

          <div class="chat-input-footer">
            <span class="chat-input-hint">Atencion comercial guiada en tiempo real</span>
            <span class="chat-input-count">{{ inputText.trim().length }}/500</span>
          </div>
        </div>
      </section>
    </div>

    <button
      class="chat-fab"
      type="button"
      (click)="toggleChat()"
      [class.open]="isOpen()"
      [attr.aria-label]="isOpen() ? 'Cerrar chat de ventas' : 'Abrir chat de ventas'"
    >
      <span class="chat-fab__ring"></span>
      <span class="chat-fab__pulse"></span>
      <span class="chat-fab__content">
        <span class="chat-fab__icon" *ngIf="!isOpen()">&#128172;</span>
        <span class="chat-fab__icon" *ngIf="isOpen()">&#10005;</span>
        <span class="chat-fab__text">{{ isOpen() ? 'Cerrar' : 'Habla con ventas' }}</span>
      </span>
    </button>
  `,
  styles: [`
    :host {
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 9999;
      font-family: 'DM Sans', sans-serif;
      pointer-events: none;
    }

    .chat-shell,
    .chat-fab {
      pointer-events: auto;
    }

    .chat-shell {
      position: absolute;
      inset: auto 0 92px auto;
    }

    .chat-backdrop {
      display: none;
    }

    .chat-window {
      position: relative;
      width: min(420px, calc(100vw - 32px));
      height: min(760px, calc(100vh - 128px));
      min-height: 620px;
      border-radius: 30px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(242, 248, 255, 0.96)),
        radial-gradient(circle at top right, rgba(0, 198, 160, 0.12), transparent 36%);
      border: 1px solid rgba(148, 163, 184, 0.22);
      box-shadow:
        0 32px 90px rgba(10, 22, 40, 0.24),
        0 12px 32px rgba(26, 64, 126, 0.16);
      backdrop-filter: blur(20px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(24px) scale(0.94);
      transform-origin: bottom right;
      pointer-events: none;
      transition:
        opacity 0.28s ease,
        transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .chat-window.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    .chat-window__glow {
      position: absolute;
      border-radius: 999px;
      filter: blur(64px);
      pointer-events: none;
      opacity: 0.7;
    }

    .chat-window__glow--top {
      width: 220px;
      height: 220px;
      top: -100px;
      right: -60px;
      background: rgba(0, 198, 160, 0.12);
    }

    .chat-window__glow--bottom {
      width: 260px;
      height: 260px;
      left: -120px;
      bottom: -140px;
      background: rgba(36, 87, 168, 0.12);
    }

    .chat-header {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 22px 22px 18px;
      color: white;
      background: linear-gradient(135deg, #0d1f3c 0%, #153568 56%, #2457a8 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .chat-header::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.32), transparent);
    }

    .chat-header__identity {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
    }

    .chat-avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background:
        radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.18) 42%, rgba(255, 255, 255, 0.08) 100%),
        linear-gradient(135deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08));
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: inset 0 1px 6px rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .chat-avatar__core {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: 'Sora', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #0d1f3c;
      background: linear-gradient(135deg, #b3f5eb, #ffffff);
      box-shadow: 0 6px 18px rgba(0, 198, 160, 0.28);
    }

    .chat-header__copy {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .chat-badge {
      width: fit-content;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #b3f5eb;
      background: rgba(179, 245, 235, 0.12);
      border: 1px solid rgba(179, 245, 235, 0.18);
    }

    .chat-title {
      margin: 0;
      font-family: 'Sora', sans-serif;
      font-size: 19px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #ffffff;
    }

    .chat-subtitle {
      margin: 0;
      font-size: 13px;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.76);
      max-width: 260px;
    }

    .chat-header__actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      flex-shrink: 0;
    }

    .chat-presence {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.88);
    }

    .chat-presence__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4de8ca;
      box-shadow: 0 0 0 6px rgba(77, 232, 202, 0.16);
    }

    .chat-presence__dot--busy {
      background: #ffd166;
      box-shadow: 0 0 0 6px rgba(255, 209, 102, 0.14);
    }

    .chat-close {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      transition: transform 0.2s ease, background 0.2s ease;
    }

    .chat-close:hover {
      transform: rotate(90deg);
      background: rgba(255, 255, 255, 0.16);
    }

    .chat-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      position: relative;
      z-index: 1;
    }

    .chat-intro {
      padding: 18px 18px 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex-shrink: 0;
    }

    .chat-intro__card {
      position: relative;
      overflow: hidden;
      padding: 18px;
      border-radius: 22px;
      color: #102a52;
      background: linear-gradient(135deg, rgba(232, 240, 251, 0.96), rgba(230, 253, 249, 0.92));
      border: 1px solid rgba(36, 87, 168, 0.1);
      box-shadow: 0 14px 34px rgba(26, 64, 126, 0.08);
    }

    .chat-intro__card::before {
      content: '';
      position: absolute;
      width: 160px;
      height: 160px;
      top: -70px;
      right: -60px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 198, 160, 0.18), transparent 70%);
    }

    .chat-intro__eyebrow {
      margin: 0 0 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #00a88a;
    }

    .chat-intro__card h4 {
      margin: 0 0 8px;
      font-family: 'Sora', sans-serif;
      font-size: 18px;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: #102a52;
    }

    .chat-intro__card p:last-child {
      margin: 0;
      font-size: 13px;
      line-height: 1.55;
      color: #4b5563;
    }

    .chat-quick-prompts {
      display: grid;
      gap: 10px;
    }

    .chat-quick-prompts__item {
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
      padding: 14px 16px;
      border-radius: 18px;
      color: #102a52;
      background: rgba(255, 255, 255, 0.78);
      border: 1px solid rgba(209, 213, 219, 0.8);
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
      transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    .chat-quick-prompts__item:hover:not(:disabled) {
      transform: translateY(-2px);
      border-color: rgba(36, 87, 168, 0.22);
      box-shadow: 0 14px 28px rgba(26, 64, 126, 0.08);
    }

    .chat-quick-prompts__item:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .chat-quick-prompts__icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #00a88a;
      background: rgba(0, 198, 160, 0.12);
    }

    .chat-messages {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scroll-behavior: smooth;
    }

    .chat-messages::-webkit-scrollbar {
      width: 8px;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.45);
      border-radius: 999px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }

    .chat-message {
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-width: 84%;
    }

    .chat-message.visitor {
      align-self: flex-end;
      align-items: flex-end;
    }

    .chat-message.agent {
      align-self: flex-start;
      align-items: flex-start;
    }

    .message-meta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 4px;
      font-size: 11px;
      color: #64748b;
    }

    .message-author {
      font-weight: 700;
      color: #334155;
    }

    .message-bubble {
      padding: 14px 16px;
      border-radius: 22px;
      font-size: 14px;
      line-height: 1.6;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
    }

    .visitor .message-bubble {
      color: white;
      background: linear-gradient(135deg, #153568 0%, #2457a8 100%);
      border-bottom-right-radius: 6px;
      box-shadow: 0 18px 30px rgba(26, 64, 126, 0.2);
    }

    .visitor .message-author,
    .visitor .message-meta {
      color: white;
      opacity: 0.92;
    }

    .agent .message-bubble {
      color: #1e293b;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(226, 232, 240, 0.95);
      border-bottom-left-radius: 6px;
    }

    .message-text {
      margin: 0;
      white-space: pre-wrap;
    }

    .payment-link {
      margin-top: 14px;
    }

    .payment-card {
      padding: 14px 14px 12px;
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(15, 77, 167, 0.08), rgba(0, 198, 160, 0.08));
      border: 1px solid rgba(77, 232, 202, 0.28);
      margin-bottom: 10px;
    }

    .payment-card__eyebrow {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0f4da7;
      margin-bottom: 8px;
    }

    .payment-card__title {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }

    .payment-card__summary {
      margin: 0;
      font-size: 12.5px;
      line-height: 1.55;
      color: #334155;
    }

    .payment-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      color: #0d1f3c;
      background: linear-gradient(135deg, #4de8ca, #b3f5eb);
      box-shadow: 0 12px 24px rgba(0, 198, 160, 0.18);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .payment-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 16px 28px rgba(0, 198, 160, 0.22);
    }

    .chat-message--typing {
      max-width: fit-content;
    }

    .typing-bubble {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 13px 16px;
    }

    .typing-bubble__label {
      margin-right: 4px;
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
    }

    .dot {
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #2457a8, #4de8ca);
      border-radius: 50%;
      animation: bounce 1.2s infinite;
    }

    .dot:nth-child(2) {
      animation-delay: 0.15s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.3s;
    }

    .dot:nth-child(4) {
      animation-delay: 0.45s;
    }

    @keyframes bounce {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.55;
      }

      30% {
        transform: translateY(-6px);
        opacity: 1;
      }
    }

    .chat-input-area {
      position: relative;
      z-index: 1;
      padding: 16px 18px 18px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(249, 250, 251, 0.94));
      border-top: 1px solid rgba(226, 232, 240, 0.9);
      backdrop-filter: blur(12px);
      flex-shrink: 0;
    }

    .chat-error {
      margin: 0 0 10px;
      padding: 10px 12px;
      border-radius: 14px;
      color: #b91c1c;
      font-size: 12px;
      line-height: 1.45;
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.14);
    }

    .chat-composer {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: end;
      padding: 10px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(203, 213, 225, 0.95);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .chat-composer:focus-within {
      border-color: rgba(36, 87, 168, 0.45);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.75),
        0 0 0 4px rgba(36, 87, 168, 0.08);
    }

    .chat-composer--disabled {
      opacity: 0.82;
    }

    .chat-input {
      width: 100%;
      min-height: 46px;
      max-height: 110px;
      resize: none;
      border: none;
      outline: none;
      background: transparent;
      padding: 4px 6px 4px 8px;
      font-size: 14px;
      line-height: 1.5;
      color: #111827;
      font-family: inherit;
    }

    .chat-input::placeholder {
      color: #94a3b8;
    }

    .chat-send-btn {
      width: 48px;
      height: 48px;
      border-radius: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      background: linear-gradient(135deg, #153568 0%, #2457a8 70%, #00c6a0 100%);
      box-shadow: 0 16px 24px rgba(26, 64, 126, 0.22);
      transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    }

    .chat-send-btn__icon {
      transform: translateX(1px);
    }

    .chat-send-btn:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 30px rgba(26, 64, 126, 0.26);
    }

    .chat-send-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: none;
    }

    .chat-input-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 10px;
      padding: 0 4px;
      font-size: 11px;
      color: #64748b;
    }

    .chat-input-hint {
      max-width: 70%;
    }

    .chat-input-count {
      font-weight: 700;
      color: #475569;
    }

    .chat-fab {
      position: absolute;
      right: 0;
      bottom: 0;
      min-width: 72px;
      height: 72px;
      padding: 0 22px;
      border-radius: 999px;
      overflow: hidden;
      color: white;
      background: linear-gradient(135deg, #0d1f3c 0%, #153568 60%, #00c6a0 100%);
      box-shadow:
        0 22px 42px rgba(10, 22, 40, 0.24),
        0 10px 24px rgba(0, 198, 160, 0.2);
      transition:
        transform 0.24s ease,
        box-shadow 0.24s ease,
        width 0.24s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      isolation: isolate;
    }

    .chat-fab:hover {
      transform: translateY(-3px);
      box-shadow:
        0 28px 50px rgba(10, 22, 40, 0.28),
        0 14px 26px rgba(0, 198, 160, 0.24);
    }

    .chat-fab.open {
      background: linear-gradient(135deg, #334155 0%, #475569 100%);
    }

    .chat-fab__ring,
    .chat-fab__pulse {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
    }

    .chat-fab__ring {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .chat-fab__pulse {
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.18), transparent);
      transform: translateX(-130%);
      animation: shimmer 3.2s linear infinite;
      opacity: 0.9;
    }

    .chat-fab__content {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .chat-fab__icon {
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    @keyframes shimmer {
      100% {
        transform: translateX(130%);
      }
    }

    @media (max-width: 767px) {
      :host {
        right: 12px;
        bottom: 12px;
      }

      .chat-shell {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        pointer-events: none;
      }

      .chat-shell--open {
        pointer-events: auto;
      }

      .chat-backdrop {
        display: block;
        position: absolute;
        inset: 0;
        background: rgba(15, 23, 42, 0.32);
        backdrop-filter: blur(4px);
      }

      .chat-window {
        width: min(100vw - 16px, 420px);
        height: min(82vh, 760px);
        min-height: 560px;
        margin: 0 0 88px auto;
        border-radius: 28px;
      }

      .chat-header {
        padding: 20px 18px 16px;
      }

      .chat-subtitle {
        max-width: 220px;
      }

      .chat-intro,
      .chat-messages,
      .chat-input-area {
        padding-left: 14px;
        padding-right: 14px;
      }

      .chat-fab {
        height: 64px;
        padding: 0 18px;
      }

      .chat-fab__text {
        font-size: 13px;
      }
    }

    @media (max-width: 480px) {
      .chat-window {
        width: calc(100vw - 8px);
        height: calc(100vh - 92px);
        min-height: 0;
        margin-bottom: 76px;
        border-radius: 26px;
      }

      .chat-header {
        gap: 12px;
      }

      .chat-header__actions {
        gap: 8px;
      }

      .chat-title {
        font-size: 18px;
      }

      .chat-message {
        max-width: 90%;
      }

      .chat-input-footer {
        font-size: 10px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .chat-window,
      .chat-fab,
      .chat-close,
      .chat-quick-prompts__item,
      .chat-send-btn,
      .chat-fab__pulse,
      .dot {
        animation: none !important;
        transition: none !important;
      }
    }
  `],
})
export class ChatWidgetComponent implements OnInit, AfterViewChecked {
  private chatService = inject(ChatService);

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

  readonly quickPrompts = [
    'Quiero conocer los planes disponibles',
    'Necesito una demo para mi empresa',
    'Tengo preguntas sobre facturacion electronica',
  ];

  isOpen = signal(false);
  isTyping = signal(false);
  messages = signal<SalesMessage[]>([]);
  errorMessage = signal<string | null>(null);
  inputText = '';

  private conversationId = signal<string | null>(null);
  private shouldScrollToBottom = false;
  private pendingMessageAfterInit: string | null = null;

  ngOnInit() {
    const saved = localStorage.getItem('becca_chat_conv_id');
    if (saved) {
      this.conversationId.set(saved);
      this.chatService.getMessages(saved).subscribe({
        next: (msgs) => this.messages.set(msgs),
        error: () => {
          localStorage.removeItem('becca_chat_conv_id');
          this.conversationId.set(null);
        },
      });
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat() {
    this.isOpen.update((value) => !value);
    if (this.isOpen() && !this.conversationId()) {
      this.initConversation();
    }
    if (this.isOpen()) {
      this.shouldScrollToBottom = true;
    }
  }

  closeChat() {
    this.isOpen.set(false);
  }

  sendMessage() {
    const content = this.inputText.trim();
    if (!content || this.isTyping()) return;

    if (!this.conversationId()) {
      this.pendingMessageAfterInit = content;
      this.inputText = '';
      this.initConversation(true);
      return;
    }

    this.dispatchMessage(content);
  }

  private dispatchMessage(content: string) {
    if (!content || this.isTyping() || !this.conversationId()) return;

    this.inputText = '';
    this.isTyping.set(true);
    this.errorMessage.set(null);

    const tempId = `temp-${Date.now()}`;
    const tempMsg: SalesMessage = {
      id: tempId,
      conversationId: this.conversationId()!,
      sender: 'VISITOR',
      content,
      metadata: {},
      createdAt: new Date().toISOString(),
    };

    this.messages.update((msgs) => [...msgs, tempMsg]);
    this.shouldScrollToBottom = true;

    this.chatService.sendMessage(this.conversationId()!, content).subscribe({
      next: (res) => {
        this.messages.update((msgs) => [
          ...msgs.filter((msg) => msg.id !== tempId),
          res.visitorMessage,
          res.agentMessage,
        ]);
        this.isTyping.set(false);
        this.shouldScrollToBottom = true;
      },
      error: (error) => {
        this.messages.update((msgs) => [
          ...msgs.filter((msg) => msg.id !== tempId),
          this.buildLocalAgentMessage(this.extractErrorMessage(error)),
        ]);
        this.isTyping.set(false);
        this.errorMessage.set(this.extractErrorMessage(error));
        this.shouldScrollToBottom = true;
      },
    });
  }

  useQuickPrompt(prompt: string) {
    if (this.isTyping()) return;
    this.inputText = prompt;
    this.sendMessage();
  }

  handleComposerEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.shiftKey) return;
    keyboardEvent.preventDefault();
    this.sendMessage();
  }

  formatMessage(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  formatTime(isoDate: string): string {
    return new Date(isoDate).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private initConversation(sendPendingMessage = false) {
    this.isTyping.set(true);
    this.errorMessage.set(null);
    this.chatService.createConversation({ source: 'WEB_CHAT' }).subscribe({
      next: (conv) => {
        this.conversationId.set(conv.id);
        localStorage.setItem('becca_chat_conv_id', conv.id);
        this.isTyping.set(false);
        if (sendPendingMessage && this.pendingMessageAfterInit) {
          const queuedMessage = this.pendingMessageAfterInit;
          this.pendingMessageAfterInit = null;
          this.dispatchMessage(queuedMessage);
        }
      },
      error: (error) => {
        this.isTyping.set(false);
        this.errorMessage.set(this.extractErrorMessage(error));
        if (this.pendingMessageAfterInit) {
          this.inputText = this.pendingMessageAfterInit;
          this.pendingMessageAfterInit = null;
        }
      },
    });
  }

  private scrollToBottom() {
    if (this.messagesContainer?.nativeElement) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  private buildLocalAgentMessage(content: string): SalesMessage {
    return {
      id: `local-agent-${Date.now()}`,
      conversationId: this.conversationId() ?? 'local',
      sender: 'AGENT',
      content,
      metadata: { localOnly: true },
      createdAt: new Date().toISOString(),
    };
  }

  private extractErrorMessage(error: any): string {
    const backendMessage = error?.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }

    return 'No pude responder en este momento. Intenta de nuevo en unos segundos o dejame tus datos para que un asesor te contacte.';
  }
}
