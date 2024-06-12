import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { JobAd } from '../../models';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { JOB_STATUSES } from '../../utils';
import { JobStatus } from '../../models/filtering';
import { JobsStoreService } from '../../pages/jobs/jobs.store.service';

@Component({
  selector: 'status',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent implements OnInit {
  @Input() job: JobAd | undefined;
  jobStatuses: JobStatus[] = JOB_STATUSES;
  selectedJobStatus: JobStatus | undefined;

  constructor(private jobStore: JobsStoreService) {}

  ngOnInit(): void {
    if (this.job) {
      this.selectedJobStatus = this.jobStatuses.find(
        (status) => status.key === this.job?.status,
      );

      if (this.selectedJobStatus?.key === 'draft') {
        this.jobStatuses = this.jobStatuses.map((job) => {
          if (job.key === 'archived' || job.key === 'draft') {
            return { ...job, disabled: true };
          } else {
            return job;
          }
        });
      } else if (this.selectedJobStatus?.key === 'published') {
        this.jobStatuses = this.jobStatuses.map((job) => {
          if (job.key === 'draft' || job.key === 'published') {
            return { ...job, disabled: true };
          } else {
            return job;
          }
        });
      }
    }
  }

  saveStatus(status: JobStatus): void {
    if (this.job) this.jobStore.setStatus(this.job.id, status.key);
  }
}
