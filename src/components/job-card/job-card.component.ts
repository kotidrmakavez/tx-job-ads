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
import { JobAd } from '../../models';

@Component({
  selector: 'job-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  @Input() job: JobAd | undefined;
  @Output() goToEvent = new EventEmitter<JobAd>();
  @Output() deleteJobEvent = new EventEmitter<JobAd>();

  constructor() {}

  goTo(job: JobAd): void {
    this.goToEvent.emit(job);
  }

  // handle hydration
  deleteJob(job: JobAd): void {
    if (confirm('Are you sure you want to delete this job')) {
      this.deleteJobEvent.emit(job);
    }
  }
}
