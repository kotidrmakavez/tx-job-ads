import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { JobAd, JobAdDto } from '../../models';
import { JobsService } from '../../services/jobs.service';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditJobComponent } from '../../components/create-edit-job/create-edit-job.component';
import { SnackBarService } from '../../services/snackbar.service';
import { JobsStoreService } from './jobs.store.service';
import { Router } from '@angular/router';
import { DATE_NOW } from '../../utils';

@Component({
  selector: 'jobs',
  standalone: true,
  imports: [AsyncPipe, JobCardComponent, MatButtonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  constructor(
    private _jobsService: JobsService,
    private _snackBarService: SnackBarService,
    private _router: Router,
    readonly jobsStoreService: JobsStoreService,
    public dialog: MatDialog,
  ) {}

  goToInvoices(): void {
    this._router.navigate(['invoices']);
  }

  createNewJob(): void {
    const dialogRef = this.dialog.open(CreateEditJobComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((createdJob) => {
      const jobToCreate: JobAdDto = {
        ...createdJob,
        id: this.jobsStoreService.jobs.length + 1,
        createdAt: DATE_NOW,
        updatedAt: DATE_NOW,
      };

      this._jobsService.createJob(jobToCreate).subscribe(() => {
        this._snackBarService.showMessage('Successfully created a job');
        this.jobsStoreService.init();
      });
    });
  }

  editJob(job: JobAd) {
    const dialogRef = this.dialog.open(CreateEditJobComponent, {
      data: job,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((editedJob) => {
      const jobToEdit: JobAdDto = {
        ...editedJob,
        id: job.id,
        updatedAt: DATE_NOW,
      };

      this._jobsService.updateJob(jobToEdit).subscribe(() => {
        this._snackBarService.showMessage('Job successfully updated');
      });
    });
  }

  deleteJob(job: JobAd): void {
    this._jobsService.deleteJob(job.id).subscribe(() => {
      this._snackBarService.showMessage('Job successfully deleted');
      this.jobsStoreService.init();
    });
  }
}
