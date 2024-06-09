import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../../models';
import { JobsService } from '../../services/jobs.service';
import { InvoiceService } from '../../services/invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesStoreService {
  private _invoices = new BehaviorSubject<Invoice[]>([]);

  constructor(private _invoiceService: InvoiceService) {
    this.init();
  }

  init(): void {
    this._invoiceService.getInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }

  invoices$ = this._invoices.asObservable();

  get invoices(): Invoice[] {
    return this._invoices.getValue();
  }

  private set invoices(val: Invoice[]) {
    this._invoices.next(val);
  }
}
