import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { InvoicesStoreService } from './invoices.store.service';
import { AsyncPipe } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'invoices',
  standalone: true,
  imports: [AsyncPipe, MatListModule, TableComponent, MatButtonModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  constructor(
    private _router: Router,
    readonly invoiceStoreService: InvoicesStoreService,
  ) {}

  goToJobs(): void {
    this._router.navigate(['jobs']);
  }
}
