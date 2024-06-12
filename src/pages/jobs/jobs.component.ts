import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Invoice, JobAd, JobAdDto, JobAdStatus } from '../../models';
import { JobsService } from '../../services/jobs.service';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditJobComponent } from '../../components/create-edit-job/create-edit-job.component';
import { SnackBarService } from '../../services/snackbar.service';
import { JobsStoreService } from './jobs.store.service';
import { Router } from '@angular/router';
import {
  DATE_NOW_UTC,
  getRandomInt,
  calculateDueDate,
  JOB_STATUSES,
} from '../../utils';
import { InvoiceService } from '../../services/invoice.service';
import { InvoicesStoreService } from '../invoices/invoices.store.service';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { JobStatus, JobStatusChange } from '../../models/filtering';
import { combineLatest } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'jobs',
  standalone: true,
  imports: [
    AsyncPipe,
    JobCardComponent,
    MatButtonModule,
    MatMenuModule,
    MatInput,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent implements OnInit {
  jobStatuses: JobStatus[] = JOB_STATUSES;
  jobData$ = new Observable<JobAd[]>();
  status$ = new BehaviorSubject<JobAdStatus>('draft');
  name$ = new BehaviorSubject('');

  constructor(
    private _jobsService: JobsService,
    private _invoiceService: InvoiceService,
    private _snackBarService: SnackBarService,
    private _router: Router,
    readonly jobsStoreService: JobsStoreService,
    readonly invoiceStoreService: InvoicesStoreService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.jobData$ = combineLatest([
      this.status$,
      this.jobsStoreService.jobs$,
    ]).pipe(
      map(([status, jobs]) => jobs.filter((job) => job.status === status)),
    );
  }

  goToInvoices(): void {
    this._router.navigate(['invoices']);
  }

  createNewJob(): void {
    const dialogRef = this.dialog.open(CreateEditJobComponent, {
      width: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((createdJob) => {
        const jobToCreate: JobAdDto = {
          ...createdJob,
          id: this.jobsStoreService.jobs.length + 1,
          createdAt: DATE_NOW_UTC,
          updatedAt: DATE_NOW_UTC,
        };

        this._jobsService.createJob(jobToCreate).subscribe(() => {
          this._snackBarService.showMessage('Successfully created a job');
          this.jobsStoreService.init();

          if (jobToCreate.status === 'published') {
            const invoiceToCreate: Invoice = {
              id: this.invoiceStoreService.invoices.length + 1,
              jobAdId: jobToCreate.id,
              amount: getRandomInt(),
              dueDate: calculateDueDate(jobToCreate.createdAt),
            };

            this._invoiceService
              .createInvoice(invoiceToCreate)
              .subscribe(() => {
                this._snackBarService.showMessage(
                  'Successfully created an invoice',
                );
              });
          }
        });
      });
  }

  editJob(job: JobAd) {
    const dialogRef = this.dialog.open(CreateEditJobComponent, {
      data: job,
      width: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((editedJob) => {
        const jobToEdit: JobAdDto = {
          ...editedJob,
          id: job.id,
          updatedAt: DATE_NOW_UTC,
        };

        this._jobsService.updateJob(jobToEdit).subscribe(() => {
          this._snackBarService.showMessage('Job successfully updated');
          this.jobsStoreService.init();
        });
      });
  }

  deleteJob(job: JobAd): void {
    const invoice = this.invoiceStoreService.invoices.find(
      (invoice) => invoice.jobAdId === job.id,
    );

    this._jobsService.deleteJob(job.id).subscribe(() => {
      if (invoice) this._invoiceService.deleteInvoice(invoice.id);
      this._snackBarService.showMessage('Job successfully deleted');
      this.jobsStoreService.init();
    });
  }

  changeStatus(job: JobStatusChange): void {
    this.jobsStoreService.setStatus(job.id, job.status);
  }

  sortByStatus(status: JobAdStatus): void {
    this.status$.next(status);
  }

  searchByName(name: string): void {
    this.name$.next(name);
  }
}
