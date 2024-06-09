import { Injectable } from '@angular/core';

import { Invoice } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INVOICES_URL } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(INVOICES_URL);
  }
}
