import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SalesConversation {
  id: string;
  status: string;
  visitorName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  recommendedPlanName?: string;
  quoteId?: string;
}

export interface SalesMessage {
  id: string;
  conversationId: string;
  sender: 'VISITOR' | 'AGENT' | 'SYSTEM' | 'HUMAN';
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface SalesPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  billingPeriod: 'MONTHLY' | 'YEARLY';
  maxUsers?: number;
  features: string[];
  isActive: boolean;
}

export interface SendMessageResponse {
  visitorMessage: SalesMessage;
  agentMessage: SalesMessage;
}

interface ApiResponse<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/public/sales-chat`;

  createConversation(data: { source?: string }): Observable<SalesConversation> {
    return this.http
      .post<ApiResponse<SalesConversation>>(`${this.base}/conversations`, {
        source: data.source ?? 'WEB_CHAT',
      })
      .pipe(map((r) => r.data));
  }

  getMessages(conversationId: string): Observable<SalesMessage[]> {
    return this.http
      .get<ApiResponse<SalesMessage[]>>(`${this.base}/conversations/${conversationId}/messages`)
      .pipe(map((r) => r.data));
  }

  sendMessage(conversationId: string, content: string): Observable<SendMessageResponse> {
    return this.http
      .post<ApiResponse<SendMessageResponse>>(
        `${this.base}/conversations/${conversationId}/messages`,
        { content },
      )
      .pipe(map((r) => r.data));
  }

  getPlans(): Observable<SalesPlan[]> {
    return this.http
      .get<ApiResponse<SalesPlan[]>>(`${this.base}/plans`)
      .pipe(map((r) => r.data));
  }
}
