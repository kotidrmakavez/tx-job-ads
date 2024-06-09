import { Component } from '@angular/core';

import { InvoicesStoreService } from './invoices.store.service';

@Component({
  selector: 'invoices',
  standalone: true,
  imports: [],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  constructor(readonly invoiceStore: InvoicesStoreService) {}
}
