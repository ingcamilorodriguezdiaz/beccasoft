import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly WHATSAPP_URL  = 'https://wa.me/573115907753?text=Hola%2C%20me%20interesa%20BeccaFact';
  readonly EMAIL_VENTAS  = 'ventas@beccasoft.com';
  readonly EMAIL_SOPORTE = 'info@beccasoft.com';
}
