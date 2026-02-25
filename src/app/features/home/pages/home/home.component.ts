import { Component } from '@angular/core';
import { HeroComponent }              from '../../components/hero/hero.component';
import { WhatIsBeccafactComponent }   from '../../components/what-is-beccafact/what-is-beccafact.component';
import { IntegrationModelComponent }  from '../../components/integration-model/integration-model.component';
import { BenefitsComponent }          from '../../components/benefits/benefits.component';
import { HowItWorksComponent }        from '../../components/how-it-works/how-it-works.component';
import { PlansComponent }             from '../../components/plans/plans.component';
import { CtaComponent }               from '../../components/cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    WhatIsBeccafactComponent,
    IntegrationModelComponent,
    BenefitsComponent,
    HowItWorksComponent,
    PlansComponent,
    CtaComponent,
  ],
  template: `
    <app-hero />
    <app-what-is-beccafact />
    <app-integration-model />
    <app-benefits />
    <app-how-it-works />
    <app-plans />
    <app-cta />
  `,
})
export class HomeComponent {}
