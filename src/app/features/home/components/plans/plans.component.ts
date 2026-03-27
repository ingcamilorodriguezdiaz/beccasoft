import { ApiResponse } from './../../../../../../../frontend/src/app/model/api-response.model';
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';
import { environment } from '../../../../../environments/environment';

// ── Backend types ─────────────────────────────────────────────────────────────

interface PlanFeatureApi {
  key: string;
  value: string;
  label: string;
  type: 'bool' | 'number' | 'months';
  group: 'limits' | 'modules' | 'support';
  icon: string;
}

interface BackendPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: string;
  features: PlanFeatureApi[];
}

// ── Display types ─────────────────────────────────────────────────────────────

export interface DisplayFeature {
  key: string;
  label: string;
  displayValue: string;
  included: boolean;
  type: 'bool' | 'number' | 'months';
  icon: string;
  group: 'limits' | 'modules' | 'support';
  isFirstInGroup: boolean;
}

export interface DisplayPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: string;
  isHighlight: boolean;
  badge?: string;
  features: DisplayFeature[];
}

// ── Features visibles en la landing (orden definido) ─────────────────────────

const VISIBLE_FEATURES = [
  'max_documents_per_month',
  'max_users',
  'max_products',
  'max_customers',
  'has_invoices',
  'dian_enabled',
  'has_inventory',
  'has_cartera',
  'has_reports',
  'has_payroll',
  'has_pos',
  'has_multicompany',
  'bulk_import',
  'priority_support',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatValue(f: PlanFeatureApi): { display: string; included: boolean } {
  const raw = f.value?.trim().toLowerCase();

  // ---------------------------
  // 1. Booleanos por valor
  // ---------------------------
  if (raw === 'true') {
    return { display: 'Incluido', included: true };
  }
  if (raw === 'false') {
    return { display: 'No incluido', included: false };
  }

  // ---------------------------
  // 2. Números por valor
  // ---------------------------
  const num = Number(raw);

  if (!isNaN(num)) {
    if (num === -1) {
      return { display: 'Ilimitado', included: true };
    }
    if (num === 0) {
      return { display: 'No incluido', included: false };
    }
    if (num > 0) {
      // meses, usuarios, productos, etc — se muestra el número
      return { display: `${num}`, included: true };
    }
  }

  // ---------------------------
  // 3. Fallback: texto literal (soporte, descripción, etc.)
  // ---------------------------
  return { display: f.value, included: true };
}

function planToDisplay(plan: BackendPlan, index: number): DisplayPlan {
  const featureMap = new Map(plan.features.map(f => [f.key, f]));

  const mapped = VISIBLE_FEATURES
    .map(key => featureMap.get(key))
    .filter((f): f is PlanFeatureApi => !!f);

  const features: DisplayFeature[] = mapped.map((f, idx) => {
    const { display, included } = formatValue(f);
    const isFirstInGroup = idx === 0 || mapped[idx - 1].group !== f.group;
    return {
      key: f.key,
      label: f.label,
      displayValue: display,
      included,
      type: f.type,
      icon: f.icon,
      group: f.group,
      isFirstInGroup,
    };
  }) .sort((a, b) => {
    if (a.included === b.included) return 0;
    return a.included ? -1 : 1; // incluidos primero
  });;

  return {
    id: plan.id,
    name: plan.name,
    description: plan.description || '',
    price: plan.price,
    currency: plan.currency || 'COP',
    billingPeriod: plan.billingPeriod,
    isHighlight: index === 1,
    badge: index === 1 ? 'Más popular' : undefined,
    features,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent implements OnInit {
  private readonly http = inject(HttpClient);

  plans = signal<DisplayPlan[]>([]);
  loading = signal(true);
  error = signal(false);
  billingAnnual = signal(false);

  ngOnInit(): void {
    this.http.get<ApiResponse<BackendPlan[]>>(`${environment.apiUrl}/plans/public`).subscribe({
      next: ({ data }) => {
        this.plans.set(data.map((p: any, i: any) => planToDisplay(p, i)));
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  displayPrice(plan: DisplayPlan): string {
    if (!plan.price || plan.price === 0) return 'Consultar precio';
    const price = this.billingAnnual()
      ? Math.round(plan.price * 0.85)
      : plan.price;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: plan.currency ?? 'COP',
      maximumFractionDigits: 0,
    }).format(price);
  }

  groupLabel(group: string): string {
    const labels: Record<string, string> = {
      limits: 'Límites',
      modules: 'Módulos',
      support: 'Soporte',
    };
    return labels[group] ?? group;
  }
}
