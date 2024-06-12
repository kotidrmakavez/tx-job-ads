import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Invoice } from '../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tx-table',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() invoices: Invoice[] = [];

  displayedColumns: string[] = ['id', 'jobAdId', 'amount', 'dueDate'];
}
