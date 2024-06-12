import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { JobAd, JobAdStatus } from '../../models';
import { StatusComponent } from '../status/status.component';
import { JOB_STATUSES } from '../../utils';
import { JobStatus, JobStatusChange } from '../../models/filtering';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'job-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    StatusComponent,
    MatMenuModule,
  ],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCardComponent implements OnInit {
  @Input() job: JobAd | undefined;

  @Output() goToEvent = new EventEmitter<JobAd>();
  @Output() deleteJobEvent = new EventEmitter<JobAd>();
  @Output() changeStatusEvent = new EventEmitter<JobStatusChange>();

  jobStatuses: JobStatus[] = JOB_STATUSES;
  selectedJobStatus: JobStatus | undefined;

  constructor() {}

  ngOnInit(): void {
    this.selectedJobStatus = this.jobStatuses.find(
      (status) => status.key === this.job?.status,
    );
    this.handleStatus();
  }

  goTo(job: JobAd): void {
    this.goToEvent.emit(job);
  }

  deleteJob(job: JobAd): void {
    if (confirm('Are you sure you want to delete this job')) {
      this.deleteJobEvent.emit(job);
    }
  }

  handleStatus(): void {
    switch (this.selectedJobStatus?.key) {
      case 'draft':
        this.jobStatuses = this.jobStatuses.map((job) => {
          if (job.key === 'archived' || job.key === 'draft') {
            return { ...job, disabled: true };
          } else {
            return job;
          }
        });
        break;
      case 'published':
        this.jobStatuses = this.jobStatuses.map((job) => {
          if (job.key === 'draft' || job.key === 'published') {
            return { ...job, disabled: true };
          } else {
            return job;
          }
        });
        break;
      case 'archived':
        this.jobStatuses = this.jobStatuses.map((job) => {
          if (job.key === 'draft' || job.key === 'published') {
            return { ...job, disabled: true };
          } else {
            return job;
          }
        });
        break;
    }
  }

  saveStatus(jobId: number, status: JobAdStatus): void {
    const statusChange: JobStatusChange = {
      id: jobId,
      status: status,
    };
    this.changeStatusEvent.emit(statusChange);
  }
}
