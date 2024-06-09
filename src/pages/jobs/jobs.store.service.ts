import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobAd, JobAdStatus } from '../../models';
import { JobsService } from '../../services/jobs.service';

@Injectable({
  providedIn: 'root',
})
export class JobsStoreService {
  private _jobs = new BehaviorSubject<JobAd[]>([]);

  constructor(private _jobsService: JobsService) {
    this.init();
  }

  init(): void {
    this._jobsService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  jobs$ = this._jobs.asObservable();

  get jobs(): JobAd[] {
    return this._jobs.getValue();
  }

  private set jobs(val: JobAd[]) {
    this._jobs.next(val);
  }

  addJob(title: string, description: string, skills: [], status: JobAdStatus) {
    this.jobs = [
      ...this.jobs,
      {
        id: this.jobs.length + 1,
        title: title,
        description: description,
        skills: skills,
        status: status,
      },
    ];
  }

  removeJob(id: number) {
    this.jobs = this.jobs.filter((job) => job.id !== id);
  }

  setStatus(id: number, status: JobAdStatus) {
    let job = this.jobs.find((job) => job.id === id);

    if (job) {
      const index = this.jobs.indexOf(job);

      this.jobs[index] = {
        ...job,
        status,
      };
      this.jobs = [...this.jobs];
    }
  }
}
